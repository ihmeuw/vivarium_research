/* Interactive causal graph viewer.
 *
 * Progressive enhancement: each .causal-graph container ships with a static
 * placeholder. We only build the widget once Cytoscape has actually loaded,
 * so a CDN failure leaves a readable diagram rather than an empty box.
 *
 * Hierarchy is shown by containment: an open group is a labelled box holding its
 * members. Containment is used rather than colour because colour only separates
 * a handful of categories, and this model has twenty groups. Colour is therefore
 * reserved for the top-level group alone.
 */
(function () {
  "use strict";

  var PALETTE = ["#4C72B0", "#DD8452", "#55A868", "#C44E52", "#8172B3", "#937860"];

  // Below roughly this zoom, labels stop being readable and nodes get too small
  // to click. We pan rather than shrink past it.
  var MIN_LEGIBLE_ZOOM = 0.5;
  var REVEAL_MS = 650;       // how long the group you just acted on stays lit
  // How close to a box's edge, or how far down from its top, a click counts as
  // hitting the box's frame rather than its empty interior.
  var BOX_EDGE = 14;
  var BOX_TITLE = 26;
  // Tolerance so the border line itself is aimable from either side.
  var BORDER_SLACK = 4;
  // Size of the "open" badge drawn in a closed group's top-right corner, and
  // of the square that counts as hitting it.
  var BADGE = 12;
  var OPEN_HIT = 17;

  /* The badge is a real drawn control rather than a "+" glued onto the label:
   * a label-borne one moves when the text wraps, so the hit box stops matching
   * what is on screen. */
  var PLUS_BADGE = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">' +
    '<circle cx="8" cy="8" r="7" fill="#ffffff" stroke="#5a6470" stroke-width="1.2"/>' +
    '<path d="M8 4.3v7.4M4.3 8h7.4" stroke="#33393f" stroke-width="1.7" ' +
    'stroke-linecap="round"/></svg>'
  );

  /* Group names and variable names are separate namespaces in the YAML, but share
   * one id space in Cytoscape -- and compound layout needs a group and its members
   * present at the same time. (This model has a `postpartum_depression` group AND
   * variable.) So group ids are prefixed on the way in. */
  function G(name) { return "g:" + name; }
  function isGroupId(id) { return id.slice(0, 2) === "g:"; }
  function groupName(id) { return id.slice(2); }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ---------------------------------------------------------------- loading */

  /* Load one UMD bundle with AMD suppressed.
   *
   * nbsphinx puts RequireJS on every page. These are UMD bundles, so with a
   * loader present they call define() anonymously and RequireJS throws
   * "Mismatched anonymous define() module". Hiding window.define for the duration
   * of the load makes them fall back to attaching globals, which is what we want.
   * define is always restored, so Jupyter widget output on other pages still works.
   */
  function loadScript(src, done) {
    var saved = window.define;
    var suppress = saved && saved.amd;
    if (suppress) window.define = undefined;
    var el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.crossOrigin = "anonymous";
    function finish(ok) {
      if (suppress) window.define = saved;
      el.onload = el.onerror = null;
      done(ok);
    }
    el.onload = function () { finish(true); };
    el.onerror = function () { finish(false); };
    document.head.appendChild(el);
  }

  function loadAll(sources, done) {
    var i = 0;
    (function next(ok) {
      if (!ok) return done(false);          // a missing CDN leaves the static SVG
      if (i >= sources.length) return done(true);
      loadScript(sources[i++], next);
    })(true);
  }

  /* --------------------------------------------------------------- structure */

  /* Which box a variable is drawn inside, given the set of open groups.
   *
   * A variable is drawn as itself only when every group on its path is open;
   * otherwise it collapses into the outermost group that is still closed. A
   * variable with no group is cross-cutting and always drawn as itself. */
  function bucketFor(data, nodeId, open) {
    var node = data.nodeById[nodeId];
    if (!node) return nodeId;
    var path = node.path || [];
    for (var i = 0; i < path.length; i++) {
      if (!open[path[i]]) return G(path[i]);
    }
    return nodeId;
  }

  function parentFor(data, path, selfId, open) {
    for (var i = path.length - 1; i >= 0; i--) {
      if (open[path[i]] && G(path[i]) !== selfId) return G(path[i]);
    }
    return undefined;
  }

  function childGroupsOf(data, name) {
    return Object.keys(data.groups).filter(function (other) {
      return data.groups[other].parent === name;
    });
  }

  /* Open exactly one level.
   *
   * This used to cascade through groups whose only content was a single child
   * group, because in the old flat rendering such a level looked like a no-op:
   * one dashed box swapped for another. With boxes that reasoning is gone --
   * the level is visible as containment -- and cascading instead produced two
   * nested frames from one click, which is both surprising and redundant. */
  function openThrough(data, name, open) {
    open[name] = true;
  }

  function closeGroup(data, name, open) {
    delete open[name];
    childGroupsOf(data, name).forEach(function (kid) {
      closeGroup(data, kid, open);
    });
  }

  function keyed(ids) {
    var o = {};
    (ids instanceof Array ? ids : [ids]).forEach(function (id) { o[id] = true; });
    return o;
  }

  /* Causal ordering of siblings within every scope, for ELK partitioning.
   *
   * ELK's INCLUDE_CHILDREN assigns every descendant to a global layer, so two
   * sibling boxes can span overlapping layer ranges and interleave on screen.
   * Pinning each sibling to its own partition forces disjoint bands. Ordering
   * every scope, not just the top level, is what stops nested boxes colliding
   * too. The order comes from the graph rather than being hard-coded, so it
   * stays right as the model changes; a scope whose sibling graph has a cycle
   * is left unpartitioned rather than ordered arbitrarily.
   *
   * Returns { parentGroupName ("" at the root): { siblingId: rank } }.
   */
  function scopeOrders(data) {
    var siblings = {};
    function add(parent, key) {
      var p = parent || "";
      (siblings[p] = siblings[p] || []).push(key);
    }
    Object.keys(data.groups).forEach(function (g) {
      add(data.groups[g].parent, G(g));
    });
    data.nodes.forEach(function (n) { add(n.group, n.id); });

    // Which sibling each variable sits beneath, so edges between variables can
    // be attributed to the siblings that contain them.
    var owner = {};
    Object.keys(siblings).forEach(function (parent) {
      siblings[parent].forEach(function (key) {
        if (key.slice(0, 2) !== "g:") {
          owner[parent + "|" + key] = key;
          return;
        }
        var g = groupName(key);
        data.nodes.forEach(function (n) {
          if ((n.path || []).indexOf(g) >= 0) owner[parent + "|" + n.id] = key;
        });
      });
    });

    var orders = {};
    Object.keys(siblings).forEach(function (parent) {
      var keys = siblings[parent];
      var succ = {}, indeg = {};
      keys.forEach(function (k) { succ[k] = {}; indeg[k] = 0; });
      data.edges.forEach(function (e) {
        var a = owner[parent + "|" + e.source];
        var b = owner[parent + "|" + e.target];
        if (!a || !b || a === b || succ[a][b]) return;
        succ[a][b] = true;
        indeg[b] += 1;
      });
      var queue = keys.filter(function (k) { return !indeg[k]; }).sort();
      var order = {}, rank = 0, seen = 0;
      while (queue.length) {
        var k = queue.shift();
        order[k] = rank++;
        seen += 1;
        Object.keys(succ[k]).sort().forEach(function (m) {
          if (--indeg[m] === 0) queue.push(m);
        });
      }
      orders[parent] = seen === keys.length ? order : null;
    });
    return orders;
  }

  function openForDepth(data, depth) {
    var open = {};
    Object.keys(data.groups).forEach(function (name) {
      if (depth === null || data.groups[name].depth < depth) open[name] = true;
    });
    return open;
  }

  /* `nested` draws open groups as compound boxes. It requires a layout that
   * understands compound nodes: without one, boxes have no computed size and
   * pile up on top of each other, which is far worse than showing no boxes at
   * all. So when ELK is unavailable we build the same graph flat. */
  function buildElements(data, open, nested) {
    var els = [], seen = {}, needBox = {};
    var orders = nested ? scopeOrders(data) : null;
    // Rank of `key` among its siblings in `parent`'s scope.
    function partitionFor(parent, key) {
      if (!orders) return undefined;
      var scope = orders[parent || ""];
      return scope && key in scope ? scope[key] : undefined;
    }

    data.nodes.forEach(function (n) {
      var id = bucketFor(data, n.id, open);
      var path = n.path || [];
      if (nested) {
        path.forEach(function (p) {
          if (open[p] && G(p) !== id) needBox[p] = true;
        });
      }
      if (seen[id]) return;
      seen[id] = true;
      var collapsed = id !== n.id;
      els.push({ data: {
        id: id,
        label: collapsed ? data.groups[groupName(id)].label : n.label,
        parent: nested ? parentFor(data, path, id, open) : undefined,
        collapsedGroup: collapsed ? 1 : 0,
        // A collapsed bucket is neither, so it gets the plain border.
        drawsOwn: !collapsed && !n.deterministic ? 1 : 0,
        observed: !collapsed && n.observed ? 1 : 0,
        colour: PALETTE[(data.rootIndex[path[0] || ""] || 0) % PALETTE.length],
        // A collapsed bucket is ranked in its own group's scope; a variable in
        // the scope of the group it belongs to.
        partition: collapsed
          ? partitionFor(data.groups[groupName(id)].parent, id)
          : partitionFor(n.group, id),
      }});
    });

    Object.keys(needBox).forEach(function (name) {
      var info = data.groups[name];
      var root = (info.path && info.path[0]) || name;
      els.push({ data: {
        id: G(name),
        label: info.label,
        isBox: 1,
        parent: info.parent && open[info.parent] ? G(info.parent) : undefined,
        colour: PALETTE[(data.rootIndex[root] || 0) % PALETTE.length],
        partition: partitionFor(info.parent, G(name)),
      }});
      seen[G(name)] = true;
    });

    var edgeSeen = {};
    data.edges.forEach(function (e) {
      var s = bucketFor(data, e.source, open);
      var t = bucketFor(data, e.target, open);
      if (s === t) return;
      var key = s + ">" + t;
      if (edgeSeen[key]) return;
      edgeSeen[key] = true;
      els.push({ data: { id: "e" + key, source: s, target: t, kind: "causal" } });
    });

    (data.correlated || []).forEach(function (pair) {
      var s = bucketFor(data, pair[0], open);
      var t = bucketFor(data, pair[1], open);
      if (s === t || !seen[s] || !seen[t]) return;
      els.push({
        data: { id: "c" + s + ">" + t, source: s, target: t, kind: "correlated" },
      });
    });
    return els;
  }

  /* ------------------------------------------------------------------- style */

  var STYLE = [
    {
      selector: "node",
      style: {
        label: "data(label)",
        "text-wrap": "wrap",
        "text-max-width": 100,
        "font-size": 9,
        "text-valign": "center",
        shape: "round-rectangle",
        width: "label",
        height: "label",
        padding: 5,
        "background-color": "#ffffff",
        "border-color": "data(colour)",
        "border-width": 1,
        color: "#222222",
        // Cytoscape draws a translucent grey overlay on tap by default.
        "overlay-opacity": 0,
        "transition-property": "border-width border-color background-color",
        "transition-duration": "150ms",
      },
    },
    { selector: "node[drawsOwn = 1]", style: { "border-width": 2.5 } },
    { selector: "node[observed = 1]", style: { "background-color": "#eef3fa" } },
    {
      selector: "node[collapsedGroup = 1]",
      style: {
        "border-style": "dashed",
        "border-width": 2,
        "font-weight": "bold",
        // The badge sits inside the top-right corner. Uniform padding of at
        // least the badge size clears it on both axes -- the label's right
        // edge stops at x2-padding and its top at y1+padding -- so the text
        // can stay centred instead of being nudged aside.
        padding: BADGE + 1,
        "background-image": PLUS_BADGE,
        "background-image-containment": "over",
        "background-clip": "none",
        "background-width": BADGE + "px",
        "background-height": BADGE + "px",
        "background-position-x": "100%",
        "background-position-y": "0%",
        "background-repeat": "no-repeat",
        "background-image-opacity": 1,
      },
    },
    // An open group: a tinted box with its name at the top. Top padding has to
    // clear the label, or members collide with it.
    {
      selector: "node[isBox = 1]",
      style: {
        "text-valign": "top",
        "text-halign": "center",
        // text-valign:top centres the label ON the top border. Padding opens a
        // band between the frame and the members; the label sits in that band,
        // clear of both. (Cytoscape compound padding is uniform, so the sides
        // widen too -- harmless.)
        "text-margin-y": 13,
        "font-size": 11,
        "font-weight": "bold",
        // Group names are short; let them stay on one line. A wrapped title is
        // taller than the padding band reserves and spills over the frame.
        "text-max-width": 260,
        padding: 24,
        "background-opacity": 0.07,
        "background-color": "data(colour)",
        "border-width": 1,
        "border-style": "solid",
        "border-color": "data(colour)",
        color: "#333333",
      },
    },
    {
      selector: "edge",
      style: {
        width: 1,
        "line-color": "#b3b8bd",
        "target-arrow-color": "#b3b8bd",
        "target-arrow-shape": "triangle",
        "arrow-scale": 0.7,
        // Bezier, not taxi: orthogonal legs run straight across the group
        // boxes on this graph and read far worse than curves.
        "curve-style": "bezier",
        "overlay-opacity": 0,
        "transition-property": "line-color width target-arrow-color",
        "transition-duration": "120ms",
      },
    },
    {
      selector: 'edge[kind = "correlated"]',
      style: {
        "line-style": "dashed",
        "source-arrow-shape": "triangle",
        "line-color": "#c9868a",
        "target-arrow-color": "#c9868a",
        "source-arrow-color": "#c9868a",
      },
    },
    /* Edges carry their explanation in `note`, read out on hover rather than
     * drawn: with a dozen edges among five nodes, labels rotate along the
     * lines, collide with each other and are simply illegible. */
    // Suppress the grey puck Cytoscape paints where you tap empty canvas.
    { selector: "core", style: { "active-bg-opacity": 0, "active-bg-size": 0 } },
    { selector: ".dimmed", style: { opacity: 0.12 } },
    { selector: ".picked", style: { "border-width": 4, "background-color": "#fff3cd" } },
    // Hover: pull the touched edges out of the thicket.
    {
      selector: "edge.hovered",
      style: {
        width: 2.4,
        "line-color": "#1f6feb",
        "target-arrow-color": "#1f6feb",
        "source-arrow-color": "#1f6feb",
        "z-index": 20,
      },
    },
    { selector: "node.hovered", style: { "border-color": "#1f6feb", "border-width": 2.5 } },
    // The group just opened or closed, briefly, so the change is easy to find.
    {
      selector: "node.revealed",
      style: { "background-color": "#fff6d8", "border-color": "#d9a300",
               "border-width": 2.5 },
    },
    // A box is mostly transparent, so tint the frame rather than the fill.
    {
      selector: "node[isBox = 1].revealed",
      style: { "border-color": "#d9a300", "border-width": 2.5,
               "background-color": "#d9a300", "background-opacity": 0.13 },
    },
  ];

  var LAYOUT_ELK = {
    name: "elk",
    elk: {
      algorithm: "layered",
      // Vertical. Measured on this graph, LR comes out 6.3:1 and needs about as
      // much panning as DOWN even on a landscape screen -- and LR additionally
      // makes sibling group boxes interleave at full expansion.
      "elk.direction": "DOWN",
      "elk.hierarchyHandling": "INCLUDE_CHILDREN",
      "elk.partitioning.activate": "true",
      // Generous enough that sibling boxes keep a visible gap rather than
      // ending up flush against each other, which reads as an overlap.
      "elk.spacing.nodeNode": 28,
      "elk.layered.spacing.nodeNodeBetweenLayers": 50,
      "elk.spacing.edgeNode": 16,
      "elk.spacing.edgeEdge": 10,
      "elk.spacing.componentComponent": 50,
      // These insets MUST be at least the compound `padding` in STYLE below.
      // Cytoscape sizes a box as its children plus that padding; ELK only
      // reserves what it is told here. If padding is the larger of the two,
      // every box is drawn wider than the space allotted to it and siblings
      // collide -- and the error compounds with nesting depth.
      "elk.padding": "[top=32,left=24,bottom=24,right=24]",
    },
    fit: false,
    padding: 16,
  };

  // Compound boxes are only drawn when a compound-aware layout is present.
  function canNest() { return !!window.cytoscapeElk; }

  /* Did a click land on a box's frame -- its border or its title strip --
   * rather than the empty space inside it? */
  function within(bb, pos, slack) {
    slack = slack || 0;
    return pos.x >= bb.x1 - slack && pos.x <= bb.x2 + slack &&
           pos.y >= bb.y1 - slack && pos.y <= bb.y2 + slack;
  }

  function onBoxFrame(node, pos) {
    if (!pos) return false;
    var bb = node.boundingBox();
    // Inside (or just outside) first. Proximity alone is not enough: a point
    // far to the left of the box also satisfies "within BOX_EDGE of the left
    // border". The slack lets you aim at the border line itself.
    if (!within(bb, pos, BORDER_SLACK)) return false;
    return (pos.x - bb.x1) < BOX_EDGE ||
           (bb.x2 - pos.x) < BOX_EDGE ||
           (bb.y2 - pos.y) < BOX_EDGE ||
           (pos.y - bb.y1) < BOX_TITLE;
  }

  /* A closed group carries a "+" badge in its top-right corner. Hitting that
   * opens the group; hitting anywhere else highlights it like any other node,
   * so a group can be inspected without being taken apart. */
  function onOpenAffordance(node, pos) {
    if (!pos) return false;
    var bb = node.boundingBox();
    if (!within(bb, pos)) return false;
    return (bb.x2 - pos.x) < OPEN_HIT && (pos.y - bb.y1) < OPEN_HIT;
  }

  /* Layouts are never animated. Opening a group re-runs ELK over the whole
   * graph, so almost every node moves at once and the transition reads as noise
   * rather than as an unfold. The brief highlight on newly-revealed members
   * carries the continuity instead. */
  function layoutOptions() {
    var opts = canNest() ? LAYOUT_ELK
                         : { name: "breadthfirst", fit: false, directed: true,
                             spacingFactor: 1.3 };
    var merged = {};
    Object.keys(opts).forEach(function (k) { merged[k] = opts[k]; });
    merged.animate = false;
    // Per-node ELK options; see scopeOrders for why siblings are
    // pinned to partitions.
    merged.nodeLayoutOptions = function (node) {
      var opts = {};
      var p = node.data("partition");
      if (p !== undefined && p !== null) {
        opts["elk.partitioning.partition"] = String(p);
      }
      // partitioning.activate applies to the node whose CHILDREN are being
      // partitioned, so every box needs it -- setting it only on the root
      // graph orders the top-level boxes and nothing nested inside them.
      if (node.isParent()) opts["elk.partitioning.activate"] = "true";
      return opts;
    };
    return merged;
  }

  /* -------------------------------------------------------------------- dom */

  function control(tag, attrs, text) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (text) el.textContent = text;
    return el;
  }

  function scriptBase() {
    var el = document.querySelector('script[src*="causal_graph.js"]');
    return el ? el.src.replace(/causal_graph\.js.*$/, "") : "";
  }

  /* This graph's whole-window page, written into _static by the Sphinx build
   * and named in data-standalone. Earlier this page was assembled in the
   * browser and opened as a blob URL, which does not survive: a blob belongs to
   * the document that created it, so reloading the tab, bookmarking it, or
   * letting sphinx-autobuild refresh the page behind it all leave nothing to
   * load. The open groups ride along in the fragment so the bigger view starts
   * where the reader left off. */
  function standaloneUrl(container, open) {
    var name = container.getAttribute("data-standalone");
    if (!name) return null;
    var groups = Object.keys(open || {}).filter(function (g) { return open[g]; });
    return scriptBase() + name + "#open=" +
           groups.map(encodeURIComponent).join(",");
  }

  /* The open groups handed over by "New tab". Section anchors cannot collide
   * with this: they carry no "open=". */
  function openFromHash(data) {
    var match = /(?:^|[#&])open=([^&]*)/.exec(window.location.hash || "");
    if (!match) return null;
    var open = {};
    match[1].split(",").forEach(function (part) {
      var name = decodeURIComponent(part);
      if (name && data.groups[name]) open[name] = true;
    });
    return open;
  }

  function requestFullscreen(el) {
    var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (fn) fn.call(el);
  }

  function exitFullscreen() {
    var fn = document.exitFullscreen || document.webkitExitFullscreen ||
             document.msExitFullscreen;
    if (fn) fn.call(document);
  }

  function fullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement ||
           document.msFullscreenElement || null;
  }

  /* -------------------------------------------------------------------- init */

  function init(container) {
    var script = container.querySelector("script.causal-graph-data");
    if (!script || typeof window.cytoscape === "undefined") return;

    var data;
    try {
      data = JSON.parse(script.textContent);
    } catch (err) {
      return;
    }
    if (window.cytoscapeElk) window.cytoscape.use(window.cytoscapeElk);

    data.nodeById = {};
    data.nodes.forEach(function (n) { data.nodeById[n.id] = n; });
    // colour index per top-level group
    data.rootIndex = {};
    data.nodes.forEach(function (n) {
      var root = (n.path && n.path[0]) || "";
      if (!(root in data.rootIndex)) {
        data.rootIndex[root] = Object.keys(data.rootIndex).length;
      }
    });
    // group -> its own root-first path, for colouring boxes
    Object.keys(data.groups).forEach(function (name) {
      var path = [], walk = name;
      while (walk) { path.unshift(walk); walk = data.groups[walk].parent; }
      data.groups[name].path = path;
    });

    var maxDepth = 0;
    data.nodes.forEach(function (n) {
      if (n.path && n.path.length > maxDepth) maxDepth = n.path.length;
    });

    var preset = container.getAttribute("data-collapse");
    var open = openFromHash(data) || openForDepth(
      data, preset === "" || preset === null ? null : parseInt(preset, 10)
    );

    /* controls: presets are buttons, not a dropdown -- opening groups one at a
     * time reaches states matching no preset, and a dropdown would keep showing
     * a stale selection. */
    var bar = control("div", { class: "causal-graph-controls" });
    var presetBar = control("span", { class: "cg-presets" });
    var presets = [];
    for (var d = 0; d < maxDepth; d++) {
      presets.push([d, data.levelLabels[d] ? "By " + data.levelLabels[d]
                                           : "Level " + (d + 1)]);
    }
    presets.push([null, "Every variable"]);
    presets.forEach(function (entry) {
      var btn = control("button", { type: "button" }, entry[1]);
      btn.addEventListener("click", function () {
        open = openForDepth(data, entry[0]);
        draw();
      });
      presetBar.appendChild(btn);
    });

    var queryBtn = control("button",
      { type: "button", title: "Check whether the relationship between two variables is confounded" },
      "Query");
    var reset = control("button", { type: "button" }, "Reset view");
    var full = control("button", { type: "button", title: "Fullscreen" }, "Fullscreen");
    var newTab = control("button", { type: "button", title: "Open in a new tab" }, "New tab");
    [presetBar, queryBtn, reset, full, newTab]
      .forEach(function (el) { bar.appendChild(el); });
    // nothing to open from the whole-window page: it is already that page
    if (!container.getAttribute("data-standalone")) newTab.hidden = true;

    var panel = control("div", { class: "causal-graph-panel", hidden: "hidden" });

    // Two stacked canvases: the next graph is built and laid out in the hidden
    // one, then swapped in. Rebuilding in place blanks the view for as long as
    // the layout takes, which reads as a flicker on every click.
    var stage = control("div", { class: "causal-graph-stage" });
    var canvases = [
      control("div", { class: "causal-graph-canvas" }),
      control("div", { class: "causal-graph-canvas cg-offstage" }),
    ];
    canvases.forEach(function (el) { stage.appendChild(el); });
    // Lives above both canvases and survives the swap between them.
    var tip = control("div", { class: "cg-tip" });
    tip.hidden = true;
    stage.appendChild(tip);
    var canvas = canvases[0];      // the one currently on screen
    var legend = container.querySelector(".causal-graph-legend");
    [bar, panel, stage].forEach(function (el) {
      if (legend) container.insertBefore(el, legend);
      else container.appendChild(el);
    });

    /* The query view's legend REPLACES the model one rather than being
     * restated in the panel as prose: the two views share no keys, so showing
     * both at once would be showing one that does not apply. */
    var modelLegend = container.querySelector(".causal-graph-legend");
    var queryLegend = control("div", { class: "causal-graph-legend" });
    [["cg-key-query", "query variables"],
     ["cg-key-shared", "causes two of these"],
     ["cg-key-causal", "causes"],
     ["cg-key-correlated", "correlated propensities"]].forEach(function (k) {
      var span = control("span", {});
      span.appendChild(control("i", { class: "cg-key " + k[0] }));
      span.appendChild(document.createTextNode(k[1]));
      queryLegend.appendChild(span);
    });
    queryLegend.hidden = true;
    if (modelLegend) container.insertBefore(queryLegend, modelLegend);
    else container.appendChild(queryLegend);

    function showLegendFor(answerView) {
      queryLegend.hidden = !answerView;
      if (modelLegend) modelLegend.hidden = !!answerView;
    }

    var cy = null;
    var pending = null;        // an offstage build not yet swapped in
    var queuedDraw = null;     // a draw asked for while that build was running
    var revealTimer = null;
    var settleTimer = null;

    /* Causal-query state.
     *
     * `answer` holds the result of the last query; `showing` means the canvas
     * is displaying the latent projection of that answer rather than the model
     * itself. Queries always run on the full variable-level graph, whatever is
     * currently open on screen. */
    var query = { on: false, a: null, b: null, answer: null, showing: false,
                  // variables revealed by expanding projected edges
                  extra: {},
                  // selected scenario, or null for "any"
                  scenario: null };

    /* Panning when the drag starts on a node.
     *
     * Cytoscape pans from the background only. Zoomed in far enough, a group
     * box covers the whole viewport and there is no background left to grab.
     * Nodes are ungrabbable, so Cytoscape does nothing with those drags and we
     * can pan on them ourselves without fighting it. Background drags and wheel
     * zoom stay native. `dragged` suppresses the click a drag ends with.
     */
    var lastHover = null;
    var panFrom = null;
    var fromNode = false;
    var dragged = false;
    var DRAG_SLOP = 4;      // px of movement before it counts as a drag

    function beginDrag(x, y) {
      panFrom = { x: x, y: y };
      dragged = false;
    }

    function moveDrag(x, y) {
      if (!panFrom || !fromNode || !cy) return;
      var dx = x - panFrom.x;
      var dy = y - panFrom.y;
      if (!dragged && Math.abs(dx) + Math.abs(dy) < DRAG_SLOP) return;
      dragged = true;
      canvas.classList.add("cg-panning");
      cy.panBy({ x: dx, y: dy });
      panFrom = { x: x, y: y };
    }

    function endDrag() {
      panFrom = null;
      canvas.classList.remove("cg-panning");
    }

    stage.addEventListener("mousedown", function (evt) {
      if (evt.button === 0) beginDrag(evt.clientX, evt.clientY);
    });
    window.addEventListener("mousemove", function (evt) {
      moveDrag(evt.clientX, evt.clientY);
    });
    window.addEventListener("mouseup", endDrag);
    stage.addEventListener("touchstart", function (evt) {
      if (evt.touches.length === 1) beginDrag(evt.touches[0].clientX, evt.touches[0].clientY);
    }, { passive: true });
    stage.addEventListener("touchmove", function (evt) {
      if (evt.touches.length === 1) moveDrag(evt.touches[0].clientX, evt.touches[0].clientY);
    }, { passive: true });
    stage.addEventListener("touchend", endDrag);

    /* Re-fit when the stage changes size.
     *
     * Cytoscape binds its own listener to the window, but nothing watches the
     * container, and the panel above the stage changes height on its own --
     * entering the answer view adds lines to it. A graph fitted to the old
     * height is then left clipped at the bottom. */
    if (window.ResizeObserver) {
      var resizeTimer = null;
      new window.ResizeObserver(function () {
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () {
          if (!cy || cy.destroyed()) return;
          cy.resize();
          clampZoom();
        }, 60);
      }).observe(stage);
    }

    /* Clearing hover is bound to the DOM, not to Cytoscape: cy's "mouseout"
     * also fires as the pointer crosses from one element to another, which
     * wiped the cursor the instant mousemove had set it. Attached once here,
     * not in wire(), which re-runs on every redraw. */
    stage.addEventListener("mouseleave", function () {
      lastHover = null;
      canvas.classList.remove("cg-over-node");
      tip.hidden = true;
      if (cy) cy.elements().removeClass("hovered");
    });

    /* ---- causal queries ---- */

    function labelOf(id) {
      var n = data.nodeById[id];
      return n ? n.label : id;
    }

    /* The graph as the selected scenario sees it: the variables it holds at a
     * single value, and the edges that carry nothing under it. */
    function scenarioData() {
      var sc = currentScenario();
      if (!sc) return data;
      var copy = {};
      Object.keys(data).forEach(function (k) { copy[k] = data[k]; });
      copy.constant = sc.constant || [];
      copy.absentEdges = sc.absentEdges || [];
      return copy;
    }

    function currentScenario() {
      return (data.scenarios || []).filter(function (s2) {
        return s2.name === query.scenario;
      })[0];
    }

    function runQuery() {
      if (!window.CausalGraphQuery || !query.a || !query.b) return;
      query.answer = window.CausalGraphQuery.analyze(
        scenarioData(), query.a, query.b);
    }

    /* Every change to the query has to go through here.
     *
     * The canvas is a function of the query state -- in the answer view it is
     * built from the answer itself -- so changing that state without redrawing
     * leaves the old graph on screen with the new state's behaviour attached to
     * it: marks land on nodes that are no longer there, clicks resolve against
     * a view that has moved on. */
    function queryChanged(reveal) {
      // Panel first: it sits above the stage, so its height decides how much
      // room the graph has, and the layout that follows fits into that.
      renderPanel();
      draw(reveal);
    }

    /* Name one of the pair, from the pickers or from a click on the diagram.
     *
     * Anything revealed by opening a leg belonged to the previous answer, so it
     * goes. The answer is shown as soon as there is one: naming both variables
     * is the whole question, so there is nothing further to ask for. */
    function setEndpoints(first, second) {
      query.a = first;
      query.b = second;
      query.answer = null;
      query.extra = {};
      runQuery();
      query.showing = !!query.answer;
      queryChanged();
    }

    function resetQuery() {
      query.a = query.b = query.answer = null;
      query.showing = false;
      query.extra = {};
    }

    function say(parent, text, cls) {
      parent.appendChild(control("span", cls ? { class: cls } : {}, text));
    }

    /* Mark the endpoints on the model view. The answer view already colours
     * them by role, so it is left alone. Called after every swap, because a
     * redraw builds a new Cytoscape instance and drops the classes. */
    function markPicked() {
      if (!cy || !query.on || query.showing) return;
      cy.nodes().removeClass("picked");
      [query.a, query.b].forEach(function (id) {
        if (id) cy.getElementById(id).addClass("picked");
      });
    }

    /* A dropdown of every variable. Clicking nodes works too, but the fully
     * expanded graph is far taller than the viewport, so hunting for an
     * endpoint by eye means panning around; picking by name is the usable
     * path and clicking is the shortcut. */
    function variablePicker(selected, onChange, allowed) {
      var sel = control("select", {});
      sel.appendChild(control("option", { value: "" }, "—"));
      data.nodes.slice().sort(function (a, b) {
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
      }).forEach(function (n) {
        // A stale selection stays listed, so the panel can explain it rather
        // than the dropdown silently showing something else.
        if (allowed && !allowed[n.id] && n.id !== selected) return;
        var opt = control("option", { value: n.id }, n.label);
        if (n.id === selected) opt.setAttribute("selected", "selected");
        sel.appendChild(opt);
      });
      sel.addEventListener("change", function () { onChange(sel.value || null); });
      return sel;
    }


    function renderPanel() {
      panel.textContent = "";
      if (!query.on) { panel.hidden = true; return; }
      panel.hidden = false;

      if ((data.scenarios || []).length) {
        var scRow = control("div", { class: "cg-panel-pick" });
        say(scRow, "Scenario", "cg-pick-label");
        var scSel = control("select", {});
        scSel.appendChild(control("option", { value: "" }, "any (structure only)"));
        data.scenarios.forEach(function (s2) {
          var opt = control("option", { value: s2.name }, s2.label || s2.name);
          if (s2.name === query.scenario) opt.setAttribute("selected", "selected");
          scSel.appendChild(opt);
        });
        scSel.addEventListener("change", function () {
          query.scenario = scSel.value || null;
          setEndpoints(query.a, query.b);
        });
        scRow.appendChild(scSel);
        panel.appendChild(scRow);
      }

      var picker = control("div", { class: "cg-panel-pick" });
      say(picker, "Variables", "cg-pick-label");
      picker.appendChild(variablePicker(query.a, function (id) {
        setEndpoints(id, query.b);
      }));
      say(picker, "and", "cg-pick-label");
      picker.appendChild(variablePicker(query.b, function (id) {
        setEndpoints(query.a, id);
      }));
      panel.appendChild(picker);

      if (!query.a || !query.b) {
        say(panel, "Pick two variables above, or click two in the diagram.",
          "cg-hint");
        return;
      }

      var a = query.answer;
      var head = control("div", { class: "cg-panel-head" });
      say(head, labelOf(query.a) + "  and  " + labelOf(query.b), "cg-panel-pair");
      panel.appendChild(head);

      var body = control("div", { class: "cg-panel-body" });

      if (a.fromIsConstant || a.toIsConstant) {
        var frozen = [];
        if (a.fromIsConstant) frozen.push(labelOf(a.from));
        if (a.toIsConstant) frozen.push(labelOf(a.to));
        say(body, frozen.join(" and ") + " "
          + (frozen.length > 1 ? "are" : "is") + " held at a single value in"
          + " this scenario, so there is no variation to relate to anything"
          + " else.", "cg-fact cg-bad");
        panel.appendChild(body);
        panel.appendChild(queryActions(a));
        return;
      }

      /* Which one causes the other is a fact to report, not something the
       * reader had to know to ask the question. The graph is acyclic, so it
       * can only be one of them or neither. */
      say(body, a.causes
        ? labelOf(a.causes[0]) + " causes " + labelOf(a.causes[1]) + "."
        : "Neither causes the other.", "cg-fact");

      /* Not "confounded": that word is about an influence being measured, and
       * a query here is a pair, with no influence required. What is true
       * either way is that something upstream moves both. The diagram says
       * which -- restating it as a list of names was the same answer twice. */
      say(body, a.confounded
        ? (a.causes ? "They are also correlated through common causes."
                    : "They are correlated through common causes.")
        : "They share no common causes.",
        a.confounded ? "cg-fact" : "cg-fact cg-good");
      panel.appendChild(body);
      panel.appendChild(queryActions(a));
    }

    /* What the thing under the pointer is, for the tooltip. Edge explanations
     * have to be read somewhere other than the edge: with a dozen links among
     * five variables the labels rotate along the lines and collide. */
    function tipText(target) {
      if (!query.showing || !target || target === cy || !target.isNode) return "";
      if (target.isNode()) {
        var role = target.data("role");
        if (role === "query") return "";
        return target.data("label") + " — causes two of the variables shown";
      }
      var note = target.data("note");
      var arrow = target.data("kind") === "correlated" ? " ↔ " : " → ";
      var lead = labelOf(target.data("source")) + arrow
               + labelOf(target.data("target"));
      if (!note) return lead;
      return lead + " — " + note
        + (target.data("expandable") ? " (click to open)" : "");
    }

    /* Placed against the stage, not the page: the stage is the positioned
     * ancestor, and Cytoscape's rendered coordinates are already relative to
     * it. Flipped below the pointer when there is no room above, and kept
     * inside the stage horizontally. */
    function showTip(text, at) {
      if (!text || !at) { tip.hidden = true; return; }
      tip.textContent = text;
      tip.hidden = false;
      var room = stage.getBoundingClientRect();
      var x = Math.min(Math.max(at.x + 14, 4), Math.max(4, room.width - tip.offsetWidth - 4));
      var y = at.y - tip.offsetHeight - 12;
      if (y < 4) y = at.y + 20;
      tip.style.left = Math.round(x) + "px";
      tip.style.top = Math.round(y) + "px";
    }

    /* No "show me the answer" step: naming two variables IS the question, so
     * the answer replaces the diagram straight away. What is worth a button is
     * getting back -- to the answer as first drawn, and to the model. */
    function queryActions(a) {
      var actions = control("div", { class: "cg-panel-actions" });
      if (Object.keys(query.extra).length) {
        var back = control("button", { type: "button" }, "Collapse again");
        back.addEventListener("click", function () {
          query.extra = {};
          queryChanged();
        });
        actions.appendChild(back);
      }
      var clearBtn = control("button", { type: "button" }, "New query");
      clearBtn.addEventListener("click", function () {
        resetQuery();
        queryChanged();
      });
      actions.appendChild(clearBtn);
      return actions;
    }

    /* The kept set: the endpoints, the variables they share upstream, and
     * anything revealed by opening a leg. */
    function answerKeep() {
      var a = query.answer;
      var keep = a.keep.concat(Object.keys(query.extra)).filter(
        function (v, i, arr) { return arr.indexOf(v) === i; });
      /* Restored on every read, not just when the query is first run: opening
       * a leg grows the kept set, and a bigger kept set can expose a shared
       * cause that was previously hidden behind one of its own descendants. */
      return window.CausalGraphQuery.closeUnexplained(a.model, a.from, a.to, keep);
    }

    function answerProjection() {
      var Q = window.CausalGraphQuery;
      return Q.project(query.answer.model, answerKeep());
    }



    /* Why, as a graph: the two endpoints, the variables they share upstream,
     * and a leg for each contracted run between them. Each leg says how many
     * independent routes it stands for and opens at its narrowest waist. */
    function projectionElements() {
      var a = query.answer;
      var keep = answerKeep();
      var pr = answerProjection();
      var els = [];
      keep.forEach(function (id) {
        /* Two roles, not four. The pair share a colour because the question
         * does not distinguish them, and a variable brought in by opening a
         * leg is not marked apart from the rest: what it was before the click
         * is what "Collapse again" is for, not something the picture has to
         * carry permanently. */
        var query2 = id === query.a || id === query.b;
        /* No `drawsOwn`, deliberately: that thickens the border of anything with
         * a draw of its own, which in this view is a distinction with no key
         * in the legend -- it made one of the two query variables look
         * emphasised over the other. Here colour carries the only difference
         * that matters. */
        els.push({ data: {
          id: id,
          label: labelOf(id),
          colour: query2 ? "#1f6feb" : "#b06f00",
          role: query2 ? "query" : "shared",
        }});
      });
      var Q = window.CausalGraphQuery;
      pr.directed.forEach(function (e) {
        var ex = Q.explainEdge(a.model, pr, keep, e[0], e[1], "causal");
        var routes = ex.routes || 0;
        els.push({ data: {
          id: "p" + e[0] + ">" + e[1], source: e[0], target: e[1],
          kind: "causal", expandable: ex.add.length ? 1 : 0,
          note: routes > 1 ? routes + " independent routes"
              : (ex.through || []).length ? "one route" : "",
        }});
      });
      pr.bidirected.forEach(function (e) {
        var ex = Q.explainEdge(a.model, pr, keep, e[0], e[1], "correlated");
        els.push({ data: {
          id: "q" + e[0] + ">" + e[1], source: e[0], target: e[1],
          kind: "correlated", expandable: ex.add.length ? 1 : 0,
          note: ex.irreducible
            ? "correlated by construction"
            : ex.latentOnly
              ? "via correlated propensities"
              : "shared upstream: " + ex.via.map(labelOf).join(", "),
        }});
      });
      return els;
    }

    /* Reveal what a projected edge stands for: the next variable along a
     * contracted chain, or the nearest common cause behind a `<->`. */
    function expandAnswerEdge(edge) {
      var Q = window.CausalGraphQuery;
      var keep = answerKeep();
      var ex = Q.explainEdge(query.answer.model, answerProjection(), keep,
                             edge.data("source"), edge.data("target"),
                             edge.data("kind"));
      if (!ex.add.length) return null;
      ex.add.forEach(function (id) { query.extra[id] = true; });
      return ex.add;
    }

    function clampZoom() {
      cy.fit(undefined, 18);
      if (cy.zoom() < MIN_LEGIBLE_ZOOM) {
        cy.zoom(MIN_LEGIBLE_ZOOM);
        cy.center();
      }
    }

    /* Build the next graph offstage, then swap.
     *
     * Cytoscape paints elements the moment they are added, at default
     * positions, and ELK only reports real ones a beat later. Building into the
     * hidden canvas means that scramble is never on screen: the current graph
     * stays up untouched until the new one is laid out. reveal.ids marks nodes
     * that just appeared, highlighted briefly so a click's effect is obvious.
     */
    function draw(reveal) {
      // The pointer is about to be over something else, or over nothing.
      tip.hidden = true;
      lastHover = null;
      showLegendFor(query.showing && query.answer);
      /* One build at a time.
       *
       * Two draws in the same turn -- changing both endpoints at once does
       * that -- would otherwise put two Cytoscape instances in the same
       * offstage container, each one's swap capturing the same predecessor and
       * trying to destroy it. Abandoning the first is no better: ELK lays out
       * asynchronously and hands its result back to an instance that is by
       * then destroyed. So a draw asked for mid-build is deferred to the swap,
       * where it picks up whatever the state has become. */
      if (pending) { queuedDraw = { reveal: reveal || null }; return; }
      var showingAnswer = query.showing && query.answer;
      var els = showingAnswer ? projectionElements()
                              : buildElements(data, open, canNest());
      var incoming = canvases[0] === canvas ? canvases[1] : canvases[0];
      var outgoing = canvas;
      var oldCy = cy;
      incoming.classList.add("cg-offstage");

      var next = window.cytoscape({
        container: incoming,
        elements: els,
        style: STYLE,
        minZoom: 0.12,
        maxZoom: 3,
        // Dragging nodes is off: positions come from the layout and are
        // recomputed on every open/close, so a dragged node snaps back at the
        // next click.
        autoungrabify: true,
        boxSelectionEnabled: false,
        // Left enabled. Wheel zoom is zoom-about-the-cursor, which needs to pan
        // as it scales, so turning user panning off silently kills zooming too.
        // Cytoscape pans from the background; the handlers below add the case
        // it misses, dragging on a node.
        userPanningEnabled: true,
      });
      function swap() {
        if (settleTimer) { window.clearTimeout(settleTimer); settleTimer = null; }
        if (cy === next) return;                 // already swapped
        pending = null;
        cy = next;
        canvas = incoming;
        container._cyForTest = cy;               // handle for headless UI tests
        clampZoom();
        incoming.classList.remove("cg-offstage");
        if (outgoing !== incoming) outgoing.classList.add("cg-offstage");
        if (oldCy) oldCy.destroy();
        if (reveal && reveal.ids) {
          var fresh = cy.nodes().filter(function (n) { return reveal.ids[n.id()]; });
          fresh.addClass("revealed");
          if (revealTimer) window.clearTimeout(revealTimer);
          revealTimer = window.setTimeout(function () {
            // a redraw in the meantime has taken this instance away
            if (!next.destroyed()) fresh.removeClass("revealed");
          }, REVEAL_MS);
        }
        markPicked();
        wire();
        if (queuedDraw) {
          var again = queuedDraw;
          queuedDraw = null;
          draw(again.reveal);
        }
      }

      // The layout is run explicitly rather than passed to the constructor, so
      // that layoutstop is bound before the layout can finish.
      var layout = next.layout(layoutOptions());
      pending = next;
      layout.one("layoutstop", swap);
      // Safety net: never strand the new graph offstage if a layout dies quietly.
      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(swap, 6000);
      layout.run();
    }

    /* The innermost open box whose frame is under this point, if any.
     *
     * Edges sit above compound parents in Cytoscape's hit testing, so an edge
     * crossing a box's border swallows clicks meant for the border. Closing a
     * group is a deliberate act and an edge has no click behaviour, so the
     * frame wins. */
    function boxFrameAt(pos) {
      var best = null, bestDepth = -1;
      cy.nodes("[isBox = 1]").forEach(function (box) {
        if (!onBoxFrame(box, pos)) return;
        var depth = box.ancestors().length;
        if (depth > bestDepth) { best = box; bestDepth = depth; }
      });
      return best;
    }

    function closeBox(box) {
      var name = groupName(box.id());
      closeGroup(data, name, open);
      draw({ ids: keyed(G(name)) });
    }

    /* What a click at this point would do.
     *
     * The cursor is derived from this too, so the pointer can never promise
     * something a click won't deliver. Anything that changes click behaviour
     * has to change here, and the cursor follows automatically.
     */
    function actionAt(target, pos) {
      var isNode = target && target !== cy && target.isNode && target.isNode();
      var isEdge = target && target !== cy && target.isEdge && target.isEdge();
      /* Picking by click belongs to the model view, where it is a shortcut for
       * the dropdowns. Once the answer is up there is nothing on screen that
       * is not already part of it, and a click that threw the answer away to
       * start over was startling rather than useful -- so a variable there is
       * something to hover, not something to press. */
      if (query.on && isNode && !target.data("isBox") &&
          !target.data("collapsedGroup")) {
        return { kind: query.showing ? "inspect" : "pick", node: target };
      }
      // In the answer view an edge is a summary of something, so it opens up.
      if (query.showing && isEdge && target.data("expandable")) {
        return { kind: "expandEdge", edge: target };
      }
      // An open box's frame wins over whatever is drawn across it: closing is
      // deliberate, and edges have no click behaviour to lose.
      var box = boxFrameAt(pos);
      if (box) return { kind: "close", box: box };
      if (isNode) {
        if (target.data("isBox")) return { kind: "pan" };   // box interior
        if (target.data("collapsedGroup") && onOpenAffordance(target, pos)) {
          return { kind: "open", node: target };
        }
        return { kind: "highlight", node: target };
      }
      if (isEdge) return { kind: "pan" };
      return { kind: "clear" };
    }

    var CLICKABLE = { close: 1, open: 1, highlight: 1, pick: 1, expandEdge: 1 };
    container._actionAtForTest = actionAt;   // handle for headless UI tests

    function wire() {
      // Cytoscape handles background drags itself; we only take over when the
      // press landed on a node, where it does nothing.
      cy.on("tapstart", function (evt) { fromNode = evt.target !== cy; });

      // One tap handler for everything, driven by actionAt, so behaviour and
      // cursor cannot drift apart.
      cy.on("tap", function (evt) {
        if (dragged) return;      // this tap is the end of a pan, not a click
        var act = actionAt(evt.target, evt.position);

        if (act.kind === "inspect") return;      // hoverable, not pressable

        if (act.kind === "pick") {
          var id = act.node.id();
          // A half-finished pair completes; anything else starts over, which
          // includes clicking a variable while its answer is on screen.
          if (query.a && !query.b) setEndpoints(query.a, id);
          else setEndpoints(id, null);
          return;
        }

        if (act.kind === "expandEdge") {
          var added = expandAnswerEdge(act.edge);
          if (added) queryChanged({ ids: keyed(added) });
          return;
        }

        if (act.kind === "close") { closeBox(act.box); return; }

        if (act.kind === "open") {
          var name = groupName(act.node.id());
          openThrough(data, name, open);
          // Light the group itself, not its members: it is the thing that
          // changed, and it is where the eye already is.
          draw({ ids: keyed(G(name)) });
          return;
        }

        if (act.kind === "clear" || (act.kind === "highlight" &&
                                     act.node.hasClass("picked"))) {
          // Background, or the already-highlighted node again: clear.
          cy.elements().removeClass("dimmed");
          cy.nodes().removeClass("picked");
          return;
        }

        if (act.kind !== "highlight") return;
        var node = act.node;
        // Both directions, always: the one-sided options were a control to
        // read and choose between for a filter that is a glance either way.
        var keep = node.union(node.predecessors().union(node.successors()));
        // keep ancestor boxes of anything retained, or members float loose
        keep = keep.union(keep.ancestors());
        cy.elements().addClass("dimmed");
        keep.removeClass("dimmed");
        cy.nodes().removeClass("picked");
        node.addClass("picked");
      });

      /* Cursor and hover, from the same decision as the click.
       *
       * Hover highlighting only appears where a click would highlight, so the
       * badge and a box frame stay quiet -- they do something else. Edges still
       * light up on hover (that is what makes the thicket traceable) but only
       * where they are not lying across a frame.
       */
      cy.on("mousemove", function (evt) {
        var act = actionAt(evt.target, evt.position);
        canvas.classList.toggle("cg-over-node", !!CLICKABLE[act.kind]);

        var target = null;
        if (act.kind === "highlight") target = act.node;
        else if (act.kind === "expandEdge") target = act.edge;
        else if (act.kind === "pick" || act.kind === "inspect") target = act.node;
        else if (act.kind === "pan" && evt.target !== cy &&
                 evt.target.isEdge && evt.target.isEdge()) target = evt.target;

        // Repositioned on every move so the tooltip tracks the pointer; the
        // classes below only change when the element under it does.
        showTip(tipText(evt.target), evt.renderedPosition);

        var key = target ? target.id() : null;
        if (key === lastHover) return;      // avoid restyling on every pixel
        lastHover = key;
        cy.elements().removeClass("hovered");
        if (!target) return;
        target.addClass("hovered");
        if (target.isNode()) target.connectedEdges().addClass("hovered");
        target.connectedNodes().addClass("hovered");
      });

    }

    queryBtn.addEventListener("click", function () {
      query.on = !query.on;
      queryBtn.classList.toggle("cg-active", query.on);
      // Queries need individual variables, so open everything on entry.
      if (query.on) open = openForDepth(data, null);
      resetQuery();
      draw();
      renderPanel();
    });
    reset.addEventListener("click", function () {
      cy.elements().removeClass("dimmed");
      cy.nodes().removeClass("picked");
      clampZoom();
    });
    full.addEventListener("click", function () {
      if (fullscreenElement() === container) exitFullscreen();
      else requestFullscreen(container);
    });
    newTab.addEventListener("click", function () {
      var url = standaloneUrl(container, open);
      if (url) window.open(url, "_blank");
    });

    ["fullscreenchange", "webkitfullscreenchange", "msfullscreenchange"]
      .forEach(function (evt) {
        document.addEventListener(evt, function () {
          var on = fullscreenElement() === container;
          container.classList.toggle("cg-fullscreen", on);
          full.textContent = on ? "Exit fullscreen" : "Fullscreen";
          if (cy) { cy.resize(); clampZoom(); }
        });
      });

    draw();
  }

  ready(function () {
    var containers = document.querySelectorAll(".causal-graph");
    if (!containers.length) return;
    var sources;
    try {
      sources = JSON.parse(containers[0].getAttribute("data-scripts") || "[]");
    } catch (err) {
      return;
    }
    if (typeof window.cytoscape !== "undefined") {
      Array.prototype.forEach.call(containers, init);
      return;
    }
    loadAll(sources, function (ok) {
      if (!ok) return; // nothing to show without Cytoscape
      Array.prototype.forEach.call(containers, init);
    });
  });
})();
