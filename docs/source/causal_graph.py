"""Sphinx extension for causal graphs defined in YAML.

Provides two directives:

  .. causal-graph:: path/to/graph.yaml
     :group: pregnancy          # optional: restrict to one subtree
     :collapse: 1               # optional: aggregate to this hierarchy depth
     :height: 700px

  .. causal-graph-table:: pregnancy
     :file: path/to/graph.yaml

The graph is validated whenever it is loaded (acyclicity, dangling references,
unknown groups, duplicate names). Problems are reported as Sphinx warnings, which
fail the build under ``fail_on_warning``.

The rendered graph is interactive, using Cytoscape from a CDN, so it renders in
HTML builders only.

Each graph also gets a whole-window page of its own in ``_static``, which the
widget's "New tab" button links to.

The YAML schema
---------------

Two top-level lists, ``groups`` and ``nodes``, plus optional ``level_labels``,
``correlated`` and ``scenarios``.

``groups`` is FLAT. A group lists what it ``contains`` by name -- subgroups and
variables alike, defined further down in the same file -- so depth is unlimited
and uniform, nothing is nested in the file, and there is one way to define a
group. The roots are the groups nothing contains; a variable nothing contains is
cross-cutting and is never folded into a group. One name cannot serve as both a
group and a variable, since ``contains`` names both.

``contains`` order is not cosmetic. It orders a module table's outputs, and
walking it orders the inputs: the group's variables in ``contains`` order, each
one's ``caused_by`` in the order that list gives. A cross-module input therefore
sits where the module reading it puts it, which is the only place that knows what
belongs first -- one global order cannot, since the same variable is read by
several modules that each want it somewhere different.

Keys on a group or a variable:

``label``
    Optional. The default is the name with underscores as spaces and a capital at
    the front, so only acronyms and rewordings need to say anything.
``documentation_ref``
    The document specifying this group or variable: a ``:ref:`` target, or a
    ``{ref:, text:}`` mapping to override the link text, or a list
    of either. A module table's "Nested subcomponents" column is the union over
    its variables', in ``contains`` order, deduplicated. Several variables citing
    one document is the normal case, and one variable citing several is too -- a
    risk-effect document describes an edge, so it belongs on the variable the
    effect is applied to.

Keys on a variable only:

``caused_by``
    Its direct causes, defaulting to none. Named for the causal direction rather
    than ``parents``, which would read as containment next to ``contains``.
``deterministic``
    True when the variable is an exact function of its causes. Default False,
    meaning it consumes a random draw that is not represented as a cause. This is
    what lets d-separation account for determinism: fixing a deterministic
    variable's causes fixes the variable.
``observed``
    True when a simulation observer reports or stratifies by it. Default False.
    Never an edge -- observing a variable does not change it.
``values``
    Optional list of the values a categorical variable takes, shown in the tables.

``scenarios`` name what a scenario loses. ``constant`` lists variables with no
variation in it, which cannot confound anything and are cut from the graph;
``absent_edges`` lists edges that carry nothing in it.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

import yaml
from docutils import nodes
from docutils.parsers.rst import Directive, directives
from sphinx.util import logging

logger = logging.getLogger(__name__)

CDN_SCRIPTS = (
    "https://cdn.jsdelivr.net/npm/cytoscape@3.30.2/dist/cytoscape.min.js",
    # ELK rather than dagre: it is the only layout here that handles compound
    # (nested) nodes while still producing a layered, direction-respecting graph.
    "https://cdn.jsdelivr.net/npm/elkjs@0.9.3/lib/elk.bundled.js",
    "https://cdn.jsdelivr.net/npm/cytoscape-elk@2.2.0/dist/cytoscape-elk.js",
)

_CACHE: dict = {}

# Describes the visual encoding for both renderers. Colour is used only for the
# top-level group a variable belongs to, so it carries no other meaning; every
# other property is encoded with shape, border or fill.
LEGEND_HTML = """  <div class="causal-graph-legend">
    <span><i class="cg-key cg-key-stochastic"></i>own random draw</span>
    <span><i class="cg-key cg-key-deterministic"></i>determined by its causes</span>
    <span><i class="cg-key cg-key-observed"></i>reported by an observer</span>
    <span><i class="cg-key cg-key-collapsed"></i>closed group</span>
    <span><i class="cg-key cg-key-box"></i>open group</span>
    <span><i class="cg-key cg-key-causal"></i>causes</span>
    <span><i class="cg-key cg-key-correlated"></i>correlated propensities</span>
  </div>"""

# The whole-window copy of a graph, written into _static next to the assets it
# loads.
STANDALONE_HTML = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="causal_graph.css?v={fingerprint}">
</head>
<body class="cg-standalone">
<div class="causal-graph" data-collapse="{collapse}" data-scripts='{scripts}'>
  <script type="application/json" class="causal-graph-data">{payload}</script>
{legend}
</div>
<script src="causal_graph_query.js?v={fingerprint}"></script>
<script src="causal_graph.js?v={fingerprint}"></script>
</body>
</html>
"""


def standalone_name(source: Path, group: str | None) -> str:
    """The filename of a graph's whole-window page, inside ``_static``.

    Named after the graph rather than from ``hash()``, which is salted per
    process: an incremental build reuses cached HTML, so a page name that
    changed between builds would leave that HTML pointing at nothing. A graph
    file whose name matches something in ``html_static_path`` would shadow it,
    which is why the name follows the graph and nothing else.
    """
    def slug(text: str) -> str:
        return re.sub(r"[^a-z0-9_]+", "-", text.lower()).strip("-_")

    parts = [slug(source.stem)] + ([slug(group)] if group else [])
    return ".".join(p for p in parts if p) + ".html"


def _as_list(value) -> list:
    """A ``ref`` may name one document or several."""
    if value is None:
        return []
    return list(value) if isinstance(value, list) else [value]


def default_label(name: str) -> str:
    """The label a node gets when it does not state one.

    Underscores to spaces and a capital at the front, which is right for most
    names. It cannot produce an acronym, so anything with ANC, LBWSG, IFA/MMS,
    YLDs and the like still says what it wants.
    """
    spaced = name.replace("_", " ")
    return spaced[:1].upper() + spaced[1:]


class GraphError(Exception):
    """A causal graph that cannot be loaded at all."""


class CausalGraph:
    """A validated causal graph plus its group hierarchy."""

    def __init__(self, data: dict, source: Path):
        self.source = source
        self.level_labels = list(data.get("level_labels") or [])
        self.groups = {g["name"]: dict(g) for g in data.get("groups") or []}
        self.nodes = {n["name"]: dict(n) for n in data.get("nodes") or []}
        for holder in (self.groups, self.nodes):
            for name, item in holder.items():
                item.setdefault("label", default_label(name))
                item["documentation_ref"] = _as_list(item.get("documentation_ref"))
        for node in self.nodes.values():
            node["caused_by"] = list(node.get("caused_by") or [])
        self.correlated = [tuple(pair) for pair in data.get("correlated") or []]
        self.scenarios = [dict(sc) for sc in data.get("scenarios") or []]
        self.problems: list[str] = []
        self._link_groups(data)
        self._validate(data)

    # -- hierarchy ---------------------------------------------------------

    def _link_groups(self, data: dict) -> None:
        """Split each group's ``contains`` list into subgroups and variables.

        One list holds both, since from a reader's point of view a module
        contains whichever of the two it happens to contain. The order is kept:
        it is what orders a module table's rows and its outputs column.
        """
        self.parent_of: dict[str, str] = {}
        self.subgroups: dict[str, list[str]] = {}
        self.members: dict[str, list[str]] = {}
        self.group_of: dict[str, str] = {}
        for group in data.get("groups") or []:
            name = group["name"]
            self.subgroups[name], self.members[name] = [], []
            for child in group.get("contains") or []:
                if child in self.groups:
                    if child in self.parent_of:
                        self.problems.append(
                            f"group {child!r} is contained by both "
                            f"{self.parent_of[child]!r} and {name!r}"
                        )
                    else:
                        self.parent_of[child] = name
                        self.subgroups[name].append(child)
                elif child in self.nodes:
                    if child in self.group_of:
                        self.problems.append(
                            f"variable {child!r} is contained by both "
                            f"{self.group_of[child]!r} and {name!r}"
                        )
                    else:
                        self.group_of[child] = name
                        self.members[name].append(child)
                else:
                    self.problems.append(
                        f"group {name!r} contains unknown {child!r}"
                    )
        self.roots = [n for n in self.groups if n not in self.parent_of]

    def path_of(self, group: str | None) -> list[str]:
        """Root-first ancestry of ``group``, including itself.

        An empty path means the node is ungrouped -- a cross-cutting variable
        that is never folded into a group.
        """
        path, seen = [], set()
        while group and group not in seen:
            seen.add(group)
            path.append(group)
            group = self.parent_of.get(group)
        return list(reversed(path))

    def depth_of(self, group: str) -> int:
        return len(self.path_of(group)) - 1

    def descendant_groups(self, group: str) -> set[str]:
        out, stack = {group}, [group]
        while stack:
            current = stack.pop()
            for child in self.subgroups.get(current) or []:
                if child in self.groups and child not in out:
                    out.add(child)
                    stack.append(child)
        return out

    def nodes_in(self, group: str) -> list[str]:
        """This group's variables and its subgroups', depth first.

        In ``contains`` order throughout, which is what the module tables read.
        """
        out: list[str] = []
        stack = [group]
        while stack:
            current = stack.pop(0)
            out.extend(self.members.get(current) or [])
            stack = (self.subgroups.get(current) or []) + stack
        return out

    # -- validation --------------------------------------------------------

    def _validate(self, data: dict) -> None:
        raw_groups = [g["name"] for g in data.get("groups") or []]
        raw_nodes = [n["name"] for n in data.get("nodes") or []]
        for label, names in (("group", raw_groups), ("node", raw_nodes)):
            duplicates = {n for n in names if names.count(n) > 1}
            if duplicates:
                self.problems.append(
                    f"duplicate {label} names: {sorted(duplicates)}"
                )
        # `contains` names groups and variables in one list, so a name used for
        # both would be ambiguous there.
        clash = set(raw_groups) & set(raw_nodes)
        if clash:
            self.problems.append(
                f"names used for both a group and a variable: {sorted(clash)}"
            )

        for name in self.groups:
            if len(self.path_of(name)) - 1 < 0:  # pragma: no cover - defensive
                self.problems.append(f"group {name!r} has a cyclic parent chain")
        for name in self.groups:
            walker, seen = name, set()
            while walker in self.parent_of:
                if walker in seen:
                    self.problems.append(f"group cycle involving {name!r}")
                    break
                seen.add(walker)
                walker = self.parent_of[walker]

        for name, node in self.nodes.items():
            group = self.group_of.get(name)
            # `group` is optional: an ungrouped node is cross-cutting. But a group
            # that IS named has to exist.
            if group is not None and group not in self.groups:
                self.problems.append(f"node {name!r} has unknown group {group!r}")
            for parent in node["caused_by"]:
                if parent not in self.nodes:
                    self.problems.append(
                        f"node {name!r} lists unknown parent {parent!r}"
                    )
            for flag in ("deterministic", "observed"):
                if not isinstance(node.get(flag, False), bool):
                    self.problems.append(
                        f"node {name!r} has a non-boolean {flag}: "
                        f"{node.get(flag)!r}"
                    )
            values = node.get("values")
            if values is not None and not (
                isinstance(values, list)
                and all(isinstance(v, str) for v in values)
            ):
                self.problems.append(
                    f"node {name!r} has values {values!r}, which is not a "
                    f"list of strings"
                )

        edges = set(self.edges())
        for scenario in self.scenarios:
            label = repr(scenario.get("name"))
            for held in scenario.get("constant") or []:
                if held not in self.nodes:
                    self.problems.append(
                        f"scenario {label} holds unknown "
                        f"variable {held!r} constant"
                    )
            for absent in scenario.get("absent_edges") or []:
                if not (isinstance(absent, (list, tuple)) and len(absent) == 2):
                    self.problems.append(
                        f"scenario {label} has an absent_edges entry that is "
                        f"not a [source, target] pair: {absent!r}"
                    )
                    continue
                # An edge that is not in the graph makes the entry a typo or a
                # leftover, either way describing a graph this is not.
                if tuple(absent) not in edges:
                    self.problems.append(
                        f"scenario {label} removes edge "
                        f"{absent[0]!r} -> {absent[1]!r}, which does not exist"
                    )

        for name, item in list(self.groups.items()) + list(self.nodes.items()):
            for entry in item["documentation_ref"]:
                if isinstance(entry, dict) and "ref" not in entry:
                    self.problems.append(
                        f"{name!r} has a documentation_ref mapping with "
                        f"no 'ref' key"
                    )
                elif not isinstance(entry, (dict, str)):
                    self.problems.append(
                        f"{name!r} has a malformed documentation_ref: {entry!r}"
                    )

        cycle = self._first_cycle()
        if cycle:
            self.problems.append(f"causal graph is not acyclic: {' -> '.join(cycle)}")

    def _first_cycle(self) -> list[str] | None:
        colour: dict[str, int] = {}
        stack: list[str] = []

        def visit(name: str) -> list[str] | None:
            colour[name] = 1
            stack.append(name)
            for parent in self.nodes.get(name, {}).get("caused_by", ()):
                if parent not in self.nodes:
                    continue
                if colour.get(parent) == 1:
                    return stack[stack.index(parent):] + [parent]
                if colour.get(parent, 0) == 0:
                    found = visit(parent)
                    if found:
                        return found
            colour[name] = 2
            stack.pop()
            return None

        for name in self.nodes:
            if colour.get(name, 0) == 0:
                found = visit(name)
                if found:
                    return found
        return None

    # -- derived views -----------------------------------------------------

    def edges(self) -> list[tuple[str, str]]:
        return [
            (parent, name)
            for name, node in self.nodes.items()
            for parent in node["caused_by"]
            if parent in self.nodes
        ]

    def describe(self, name: str, with_values: bool = False) -> str:
        node = self.nodes[name]
        label = node["label"]
        if with_values and node.get("values"):
            return f"{label} ({' | '.join(node['values'])})"
        return label

    def io_for(self, group: str) -> tuple[list[str], list[str]]:
        """Variables entering and leaving ``group``.

        A variable is an output if anything outside the group consumes it --
        either a downstream variable or an observer. Without the observer half,
        a variable that exists only to be reported (it has no children at all)
        would silently vanish from the group's outputs.
        """
        order = self.nodes_in(group)
        rank = {name: i for i, name in enumerate(order)}
        inside = set(order)
        inputs, outputs = [], []
        for name in order:
            for parent in self.nodes[name]["caused_by"]:
                if parent in self.nodes and parent not in inside:
                    inputs.append(parent)
            if self.nodes[name].get("observed"):
                outputs.append(name)
        for parent, child in self.edges():
            if parent in inside and child not in inside:
                outputs.append(parent)
        # Inputs keep the order they were referenced in: the group's variables
        # in `contains` order, each one's `caused_by` in the order that list
        # gives. So a cross-module input sits where the module reading it puts
        # it, which is the only place that knows what belongs first. A single
        # global order cannot do this, since one variable is read by several
        # modules that each want it somewhere different.
        #
        # Outputs are the group's own variables, so `contains` order is both the
        # natural reading order and the editable one.
        return list(dict.fromkeys(inputs)), sorted(set(outputs), key=rank.__getitem__)

    def subcomponents_of(self, group: str) -> list:
        """The documents this group's variables cite, deduplicated.

        A variable names the document that specifies it, and a module's list is
        the union over its variables. Several variables citing one document is
        the normal case -- a cause model specifies its own mortality at both
        neonatal ages -- and one variable citing several is too.
        """
        out, seen = [], set()
        for name in self.nodes_in(group):
            for entry in self.nodes[name]["documentation_ref"]:
                key = entry["ref"] if isinstance(entry, dict) else entry
                if key not in seen:
                    seen.add(key)
                    out.append(entry)
        return out

    def to_json(self, group: str | None = None) -> dict:
        keep = set(self.nodes_in(group)) if group else set(self.nodes)
        return {
            "levelLabels": self.level_labels,
            "groups": {
                name: {
                    "label": g["label"],
                    "parent": self.parent_of.get(name),
                    "depth": self.depth_of(name),
                }
                for name, g in self.groups.items()
            },
            "nodes": [
                {
                    "id": name,
                    "label": n["label"],
                    "group": self.group_of.get(name),
                    "path": self.path_of(self.group_of.get(name)),
                    "deterministic": bool(n.get("deterministic")),
                    "values": n.get("values"),
                    "observed": bool(n.get("observed")),
                }
                for name, n in sorted(self.nodes.items())
                if name in keep
            ],
            "edges": [
                {"source": s, "target": t}
                for s, t in sorted(self.edges())
                if s in keep and t in keep
            ],
            "correlated": [list(p) for p in self.correlated],
            "scenarios": [
                {"name": sc.get("name"), "label": sc.get("label", sc.get("name")),
                 "constant": [c for c in (sc.get("constant") or []) if c in keep],
                 "absentEdges": [
                     list(e) for e in (sc.get("absent_edges") or [])
                     if len(e) == 2 and e[0] in keep and e[1] in keep
                 ]}
                for sc in self.scenarios
            ],
        }


def load_graph(path: Path) -> CausalGraph:
    key = (str(path), path.stat().st_mtime)
    cached = _CACHE.get(key)
    if cached is None:
        try:
            data = yaml.safe_load(path.read_text(encoding="utf-8"))
        except yaml.YAMLError as exc:
            raise GraphError(f"could not parse {path}: {exc}") from exc
        cached = CausalGraph(data, path)
        _CACHE.clear()
        _CACHE[key] = cached
    return cached


class _GraphDirective(Directive):
    """Shared file resolution for the directives below."""

    def resolve(self, argument: str | None):
        env = self.state.document.settings.env
        option = self.options.get("file") or argument
        if not option:
            option = env.config.causal_graph_default_file
        if not option:
            raise GraphError("no graph file given and causal_graph_default_file is unset")
        _, filename = env.relfn2path(option)
        path = Path(filename)
        if not path.is_file():
            raise GraphError(f"graph file not found: {option}")
        graph = load_graph(path)
        env.note_dependency(str(path))
        for problem in graph.problems:
            logger.warning("causal graph (%s): %s", path.name, problem,
                           location=(env.docname, self.lineno))
        return graph

    def fail(self, exc: Exception):
        logger.warning("causal graph: %s", exc,
                       location=(self.state.document.settings.env.docname, self.lineno))
        return [nodes.system_message(str(exc), level=2, type="WARNING",
                                     source=self.state.document["source"], line=self.lineno)]


class CausalGraphDirective(_GraphDirective):
    """Render the graph, interactively where the builder supports it."""

    has_content = False
    optional_arguments = 1
    option_spec = {
        "file": directives.unchanged,
        "group": directives.unchanged,
        "collapse": directives.nonnegative_int,
        "height": directives.unchanged,
    }

    def run(self):
        try:
            graph = self.resolve(self.arguments[0] if self.arguments else None)
        except GraphError as exc:
            return self.fail(exc)

        group = self.options.get("group")
        if group and group not in graph.groups:
            return self.fail(GraphError(f"unknown group {group!r}"))

        collapse = self.options.get("collapse")
        payload = json.dumps(graph.to_json(group), separators=(",", ":"))
        height = self.options.get("height", "640px")
        uid = f"cg{abs(hash((group, collapse, str(graph.source)))):x}"
        env = self.state.document.settings.env
        page = standalone_name(graph.source, group)
        _pages(env).setdefault(env.docname, {})[page] = (payload, collapse)
        # The page is versioned like the assets it loads, so a rebuilt graph is
        # never served from the browser's cache of the previous one.
        standalone = f"{page}?v={env.config.causal_graph_assets}"
        # The CDN URLs are handed to the browser as data rather than emitted as
        # <script> tags: nbsphinx loads RequireJS on every page, and these are UMD
        # bundles, so a plain tag makes them register as anonymous AMD modules and
        # RequireJS throws "Mismatched anonymous define() module". causal_graph.js
        # loads them with AMD suppressed instead.
        html = f"""
<div class="causal-graph" id="{uid}" data-collapse="{'' if collapse is None else collapse}"
     data-scripts='{json.dumps(list(CDN_SCRIPTS))}' data-standalone="{standalone}"
     style="--cg-height:{height}">
  <script type="application/json" class="causal-graph-data">{payload}</script>
{LEGEND_HTML}
</div>
"""
        return [nodes.raw("", html, format="html")]


class CausalGraphTableDirective(_GraphDirective):
    """Generate the inputs/outputs table for a group's children."""

    has_content = False
    required_arguments = 1
    option_spec = {"file": directives.unchanged}

    def run(self):
        try:
            graph = self.resolve(None)
        except GraphError as exc:
            return self.fail(exc)

        group = self.arguments[0].strip()
        if group not in graph.groups:
            return self.fail(GraphError(f"unknown group {group!r}"))

        children = [c for c in graph.subgroups.get(group) or []
                    if c in graph.groups]
        if not children:
            children = [group]

        child_label = (graph.level_labels[graph.depth_of(children[0])]
                       if graph.depth_of(children[0]) < len(graph.level_labels)
                       else "Group")
        headers = [child_label.capitalize(), "Inputs", "Outputs", "Nested subcomponents"]

        table = nodes.table(classes=["causal-graph-table"])
        group_node = nodes.tgroup(cols=len(headers))
        table += group_node
        # One colspec per column, carrying no width: the HTML writer indexes
        # the column list when it writes each cell, so leaving them out is not
        # an option, and a width would need a `colwidths-given` class before
        # the browser saw it.
        for _ in headers:
            group_node += nodes.colspec()
        head = nodes.thead()
        group_node += head
        head += self._row([nodes.paragraph(text=h) for h in headers])
        body = nodes.tbody()
        group_node += body

        for child in children:
            info = graph.groups[child]
            inputs, outputs = graph.io_for(child)
            name_cell = nodes.paragraph()
            if info["documentation_ref"]:
                name_cell += self._ref(info["documentation_ref"][0], info["label"])
            else:
                name_cell += nodes.Text(info["label"])
            body += self._row([
                name_cell,
                self._bullets(graph.describe(n) for n in inputs),
                self._bullets(graph.describe(n, with_values=True) for n in outputs),
                self._bullets_refs(graph.subcomponents_of(child)),
            ])
        return [table]

    @staticmethod
    def _row(cells):
        row = nodes.row()
        for cell in cells:
            entry = nodes.entry()
            entry += cell
            row += entry
        return row

    @staticmethod
    def _bullets(labels):
        items = list(labels)
        if not items:
            return nodes.paragraph()
        bullet = nodes.bullet_list()
        for text in items:
            item = nodes.list_item()
            item += nodes.paragraph(text=text)
            bullet += item
        return bullet

    def _bullets_refs(self, targets):
        """Bullets of :ref: links.

        An entry is either a bare target (Sphinx supplies the target's own
        title) or a ``{ref:, text:}`` mapping. Use the mapping form for labels
        that have no title or caption of their own -- an implicit reference to
        one of those warns, which fails the build under ``fail_on_warning``.
        """
        if not targets:
            return nodes.paragraph()
        bullet = nodes.bullet_list()
        for entry in targets:
            target = entry["ref"] if isinstance(entry, dict) else entry
            text = entry.get("text") if isinstance(entry, dict) else None
            item = nodes.list_item()
            para = nodes.paragraph()
            para += self._ref(target, text)
            item += para
            bullet += item
        return bullet

    @staticmethod
    def _ref(target, text=None):
        """A :ref: cross-reference.

        With no ``text``, ``refexplicit`` is False so Sphinx substitutes the
        target's own title rather than showing the raw target name.
        """
        from sphinx import addnodes
        pending = addnodes.pending_xref(
            "", refdomain="std", reftype="ref", reftarget=target,
            refexplicit=text is not None, refwarn=True,
        )
        label = text if text is not None else target
        pending += nodes.inline(label, label, classes=["xref", "std", "std-ref"])
        return pending


def _asset_fingerprint(app) -> str:
    """Hash of this extension and its static assets.

    Registered as an ``env`` config value so that editing the extension, the JS
    or the CSS invalidates cached doctrees. Without this, Sphinx happily serves
    HTML built by an older version of the directive -- which is worse than a
    plain stale page, because the newer JS then runs against markup it does not
    match.
    """
    digest = hashlib.sha256()
    paths = [Path(__file__)]
    for name in ("causal_graph.js", "causal_graph_query.js", "causal_graph.css"):
        paths.append(Path(app.srcdir) / "_static" / name)
    for path in paths:
        try:
            digest.update(path.read_bytes())
        except OSError:
            digest.update(b"missing")
    return digest.hexdigest()[:16]


def _pages(env) -> dict:
    """``{docname: {filename: (payload, collapse)}}`` for the standalone pages.

    Kept on the environment, not in a module global: with a cached doctree the
    directive never runs, and the page still has to be written.
    """
    if not hasattr(env, "causal_graph_pages"):
        env.causal_graph_pages = {}
    return env.causal_graph_pages


def purge_pages(app, env, docname):
    _pages(env).pop(docname, None)


def merge_pages(app, env, docnames, other):
    _pages(env).update(_pages(other))


def write_pages(app, exc):
    """Write one whole-window page per graph into the output ``_static``."""
    if exc is not None or getattr(app.builder, "format", "") != "html":
        return
    static = Path(app.builder.outdir) / "_static"
    fingerprint = app.config.causal_graph_assets
    written = {}
    for pages in _pages(app.env).values():
        for name, (payload, collapse) in pages.items():
            written[name] = (payload, collapse)
    if written:
        static.mkdir(parents=True, exist_ok=True)
    for name, (payload, collapse) in written.items():
        (static / name).write_text(STANDALONE_HTML.format(
            title="Causal graph",
            fingerprint=fingerprint,
            collapse="" if collapse is None else collapse,
            scripts=json.dumps(list(CDN_SCRIPTS)),
            payload=payload,
            legend=LEGEND_HTML,
        ), encoding="utf-8")


def setup(app):
    app.add_config_value("causal_graph_default_file", None, "env")
    app.add_config_value("causal_graph_assets", _asset_fingerprint(app), "env")
    app.add_directive("causal-graph", CausalGraphDirective)
    app.add_directive("causal-graph-table", CausalGraphTableDirective)
    app.add_css_file("causal_graph.css")
    # the query engine first: causal_graph.js uses it
    app.add_js_file("causal_graph_query.js")
    app.add_js_file("causal_graph.js")
    app.connect("env-purge-doc", purge_pages)
    app.connect("env-merge-info", merge_pages)
    app.connect("build-finished", write_pages)
    return {"version": "0.1", "parallel_read_safe": True, "parallel_write_safe": True}
