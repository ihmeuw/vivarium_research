/* Causal queries over the graph: D-separation, confounding, adjustment sets
 * and latent projection.
 *
 * Everything here runs on the FULL variable-level graph, regardless of which
 * groups happen to be open on screen. A group-level edge does not mean every
 * variable in the source affects every variable in the target, so the
 * collapsed view is for navigation only and must never be the basis of an
 * answer.
 *
 * TWO THINGS THAT MAKE THIS A SIMULATION RATHER THAN A STUDY:
 *
 * 1. Every variable is observed. There is no measurement problem, so an
 *    adjustment set may contain anything that is not a descendant of the
 *    cause. The correlated propensities are still drawn as a shared latent,
 *    because that is what their joint draw amounts to and it is what makes
 *    path-tracing come out right -- but the latent itself is not a simulation
 *    variable, so it cannot be conditioned on. Its *children* can: blocking a
 *    path through the correlation means conditioning on the other propensity,
 *    which is perfectly observable.
 *
 * 2. Many variables are exact functions of their causes (`deterministic`).
 *    Conditioning on such a node's parents fixes the node too, which blocks
 *    paths that plain d-separation leaves open. So the tests below use
 *    D-separation: the conditioning set is first closed under determinism, and
 *    that closure is what blocks. Ignoring this would report confounding that
 *    cannot exist.
 */
window.CausalGraphQuery = (function () {
  "use strict";

  function keys(o) { return Object.keys(o); }
  function setOf(list) {
    var s = {};
    (list || []).forEach(function (k) { s[k] = true; });
    return s;
  }

  /* ---- model ---------------------------------------------------------- */

  function build(data) {
    var parents = {}, children = {}, latent = {}, observable = [];
    data.nodes.forEach(function (n) {
      parents[n.id] = [];
      children[n.id] = [];
      observable.push(n.id);
    });
    data.edges.forEach(function (e) {
      if (!parents[e.target] || !children[e.source]) return;
      parents[e.target].push(e.source);
      children[e.source].push(e.target);
    });
    var declared = {};
    (data.correlated || []).forEach(function (pair, i) {
      var u = "__latent" + i;
      parents[u] = [];
      children[u] = [pair[0], pair[1]];
      latent[u] = true;
      parents[pair[0]].push(u);
      parents[pair[1]].push(u);
      // both orderings, so a lookup needs no sorting
      declared[pair[0] + ">" + pair[1]] = true;
      declared[pair[1] + ">" + pair[0]] = true;
    });
    var label = {}, deterministic = {};
    data.nodes.forEach(function (n) {
      label[n.id] = n.label;
      deterministic[n.id] = !!n.deterministic;
    });
    var m = { parents: parents, children: children, latent: latent,
              observable: observable, label: label,
              deterministic: deterministic,
              // correlations the graph declares, as "a>b" both ways round
              declared: declared,
              // variables with no variation in the selected scenario
              held: {} };

    // Edges the scenario says are not there, before anything reads the graph.
    (data.absentEdges || []).forEach(function (e) { unlink(m, e[0], e[1]); });

    /* Constants, and everything that is an exact function of them.
     *
     * A constant is not a variable: it transmits no variation, so it can
     * neither confound nor carry an influence, and conditioning on it says
     * nothing, so it cannot open a collider path either. Cutting its edges is
     * what makes every later step agree about that -- D-separation, adjustment
     * sets, the projection and its explanations -- instead of each one having
     * to remember. */
    m.held = determined(m, data.constant || []);
    keys(m.held).forEach(function (v) {
      (m.children[v] || []).slice().forEach(function (c) { unlink(m, v, c); });
      (m.parents[v] || []).slice().forEach(function (p) { unlink(m, p, v); });
    });
    return m;
  }

  function unlink(m, source, target) {
    if (m.children[source]) {
      m.children[source] = m.children[source].filter(function (c) {
        return c !== target;
      });
    }
    if (m.parents[target]) {
      m.parents[target] = m.parents[target].filter(function (p) {
        return p !== source;
      });
    }
  }

  function ancestors(m, seed) {
    var seen = setOf(seed), stack = (seed || []).slice();
    while (stack.length) {
      var n = stack.pop();
      (m.parents[n] || []).forEach(function (p) {
        if (!seen[p]) { seen[p] = true; stack.push(p); }
      });
    }
    return seen;
  }

  function descendants(m, seed) {
    var seen = setOf(seed), stack = (seed || []).slice();
    while (stack.length) {
      var n = stack.pop();
      (m.children[n] || []).forEach(function (c) {
        if (!seen[c]) { seen[c] = true; stack.push(c); }
      });
    }
    return seen;
  }

  /* Everything that conditioning on Z pins down.
   *
   * A deterministic variable whose every parent is already fixed is itself
   * fixed, so the closure is taken to a fixed point. A deterministic variable
   * with no parents is a constant and is likewise determined. */
  function determined(m, Z) {
    /* Constants are fixed whether or not anything was conditioned on. A
     * variable held at one value across every simulant has nothing to vary
     * with, so it blocks paths through it and can never confound. */
    var fixed = setOf(Z);
    keys(m.held || {}).forEach(function (v) { fixed[v] = true; });
    var changed = true;
    while (changed) {
      changed = false;
      keys(m.parents).forEach(function (v) {
        if (fixed[v] || !m.deterministic[v]) return;
        var ps = m.parents[v] || [];
        var all = ps.every(function (p) { return fixed[p]; });
        if (all) { fixed[v] = true; changed = true; }
      });
    }
    return fixed;
  }

  /* ---- D-separation, via the ancestral moral graph --------------------- */

  /* Blocking uses the determinism closure of Z rather than Z itself. A node
   * fixed by Z behaves exactly as if it had been conditioned on: it blocks
   * non-colliders, and it opens colliders below it. Substituting the closure
   * throughout is what turns d-separation into D-separation. */
  function dSeparated(m, X, Y, Z) {
    var D = determined(m, Z);
    var cond = keys(D);
    var A = ancestors(m, X.concat(Y).concat(cond));
    var adj = {};
    function link(a, b) {
      (adj[a] = adj[a] || {})[b] = true;
      (adj[b] = adj[b] || {})[a] = true;
    }
    keys(A).forEach(function (n) {
      var ps = (m.parents[n] || []).filter(function (p) { return A[p]; });
      ps.forEach(function (p) { link(p, n); });
      // moralise: co-parents of a common child become adjacent
      for (var i = 0; i < ps.length; i++) {
        for (var j = i + 1; j < ps.length; j++) link(ps[i], ps[j]);
      }
    });
    var target = setOf(Y);
    var seen = {}, stack = [];
    X.forEach(function (x) {
      if (!D[x]) { seen[x] = true; stack.push(x); }
    });
    while (stack.length) {
      var n = stack.pop();
      if (target[n]) return false;
      keys(adj[n] || {}).forEach(function (v) {
        if (!seen[v] && !D[v]) { seen[v] = true; stack.push(v); }
      });
    }
    return true;
  }

  /* The model with x's outgoing edges removed, so nothing found in it can be
   * x's own influence on anything. */
  function withoutOutgoing(m, x) {
    var cut = {
      parents: {}, children: {}, latent: m.latent,
      observable: m.observable, label: m.label,
      deterministic: m.deterministic, held: m.held,
    };
    keys(m.parents).forEach(function (n) { cut.parents[n] = m.parents[n].slice(); });
    keys(m.children).forEach(function (n) { cut.children[n] = m.children[n].slice(); });
    (m.children[x] || []).forEach(function (c) {
      cut.parents[c] = cut.parents[c].filter(function (p) { return p !== x; });
    });
    cut.children[x] = [];
    return cut;
  }

  /* Is there an open back-door path from x to y given Z? */
  function confounded(m, x, y, Z) {
    return !dSeparated(withoutOutgoing(m, x), [x], [y], Z || []);
  }

  /* ---- why: the variables upstream of both ---------------------------- */

  /* What the two variables share upstream.
   *
   * With nothing conditioned there are no open colliders, so every back-door
   * path from x to y has exactly one fork and reads x <- ... <- C -> ... -> y.
   * The complete reason for the dependence is therefore a LIST OF VARIABLES,
   * not a list of paths -- which is what makes it short enough to state.
   *
   * `lowest` drops any C that has another such C below it: a variable further
   * up the same stream adds nothing except distance. Those stay in `above` and
   * can be walked to. */
  function sharedCauses(m, x, y) {
    var cut = withoutOutgoing(m, x);
    var upX = ancestors(m, [x]);
    var upY = ancestors(cut, [y]);
    var fixed = determined(m, []);
    var all = keys(upX).filter(function (v) {
      /* Fixed with nothing conditioned means constant, so it varies with
       * nothing and heads no open path. */
      return upY[v] && v !== x && v !== y && !fixed[v];
    });

    /* Cut the list down to one that accounts for everything.
     *
     * Leave a shared cause out and the projection grows a bidirected edge
     * standing for it: a dependence the picture asserts but cannot attribute
     * to anything on it. Keeping the whole list never does that -- a variable
     * outside the list reaching both ends would itself be on the list -- so
     * pruning from the full list is safe. Taking the most distant out first
     * leaves the nearest set that still explains itself.
     *
     * A declared correlation is exempt: it IS in the model, so drawing it
     * asserts nothing that is not there. */
    var depth = depthOf(m);
    var order = all.slice().sort(function (a, b) { return depth[b] - depth[a]; });
    var kept = all.slice();
    order.forEach(function (c) {
      var without = kept.filter(function (v) { return v !== c; });
      if (!unexplained(m, x, y, drawable(m, without, x, y)).length) kept = without;
    });

    var inKept = setOf(kept);
    return {
      all: all.slice().sort(),
      sufficient: kept.slice().sort(),
      drawn: drawable(m, kept, x, y).sort(),
      above: all.filter(function (c) { return !inKept[c]; }).sort(),
    };
  }

  /* A correlation has no node of its own, so it is stood in for by the two
   * propensities it joins: the dependence then sits between them, which is
   * where it actually is, and it is drawn as the declared edge it is. */
  function drawable(m, causes, x, y) {
    var out = [];
    causes.forEach(function (c) {
      var list = m.latent[c] ? (m.children[c] || []) : [c];
      list.forEach(function (v) {
        if (v !== x && v !== y && out.indexOf(v) < 0) out.push(v);
      });
    });
    return out;
  }

  /* Bidirected edges the projection would draw that the model does not have:
   * each one asserts a dependence and attributes it to nothing on screen. */
  function unexplained(m, x, y, keep) {
    return project(m, [x, y].concat(keep)).bidirected.filter(function (e) {
      return !m.declared[e[0] + ">" + e[1]];
    });
  }

  /* Longest path from a root, per variable. Orders pruning, nothing else. */
  function depthOf(m) {
    if (m.depth) return m.depth;
    var depth = {};
    function walk(v) {
      if (v in depth) return depth[v];
      depth[v] = 0;                      // acyclic, so this is never read back
      var best = 0;
      (m.parents[v] || []).forEach(function (p) {
        best = Math.max(best, walk(p) + 1);
      });
      depth[v] = best;
      return best;
    }
    keys(m.parents).forEach(walk);
    m.depth = depth;
    return depth;
  }

  /* The narrowest waist of a leg, and how many routes run through it.
   *
   * A leg between two variables stands for every directed route between them,
   * and there is usually no single variable they all pass through -- in this
   * model there is essentially never one. The smallest SET they all pass
   * through is the honest summary, and by Menger's theorem its size is the
   * number of routes that share no variable at all. That count is what belongs
   * on an unexpanded leg: enumerating paths instead double-counts every route
   * that overlaps another.
   *
   * Minimum vertex cut by max flow, each interior variable split into an entry
   * and an exit joined by a unit edge, so a saturated edge is a chosen
   * variable. The cut returned is the one nearest the source, which reads as
   * "what happens first"; other minimum cuts of the same size exist. */
  function legWaist(m, from, to, keep) {
    /* Only routes the leg actually stands for. The projection stops at kept
     * variables, so a route through one of them is drawn as its own pair of
     * legs and must not be counted or cut here -- counting it also offered a
     * waist that was already on screen, which looked like a click doing
     * nothing. */
    var off = setOf(keep || []);
    var mid = descendants(m, [from]);
    var up = ancestors(m, [to]);
    var inner = keys(mid).filter(function (v) {
      return up[v] && v !== from && v !== to && !off[v];
    });
    /* A direct edge is a route with no interior, so no choice of interior
     * variables can intercept it. It is counted but cannot be cut, and it is
     * kept out of the flow network: every source-to-sink path there has to
     * cross a unit-capacity split edge, or the sentinel capacity on the
     * structural edges becomes the bottleneck and lands in the count. */
    var direct = (m.children[from] || []).indexOf(to) >= 0 ? 1 : 0;
    if (!inner.length) return { routes: direct, waist: [] };

    var innerSet = setOf(inner);
    var cap = {}, adj = {};
    function link(a, b, c) {
      cap[a + "\0" + b] = (cap[a + "\0" + b] || 0) + c;
      (adj[a] = adj[a] || {})[b] = true;
      (adj[b] = adj[b] || {})[a] = true;
    }
    var BIG = 1e6;
    var S = from + "|out", T = to + "|in";
    inner.forEach(function (v) { link(v + "|in", v + "|out", 1); });
    inner.concat([from]).forEach(function (v) {
      (m.children[v] || []).forEach(function (c) {
        if (innerSet[c]) link(v + "|out", c + "|in", BIG);
        // the direct from->to edge is deliberately not linked: see above
        else if (c === to && v !== from) link(v + "|out", T, BIG);
      });
    });

    function residualReach() {
      var seen = {}, stack = [S];
      seen[S] = true;
      while (stack.length) {
        var u = stack.pop();
        keys(adj[u] || {}).forEach(function (w) {
          if (!seen[w] && (cap[u + "\0" + w] || 0) > 0) {
            seen[w] = true; stack.push(w);
          }
        });
      }
      return seen;
    }

    var routes = 0;
    for (;;) {
      // one augmenting path at a time; capacities here are tiny integers
      var prev = {}, stack = [S], found = false;
      prev[S] = null;
      while (stack.length && !found) {
        var u = stack.pop();
        var ws = keys(adj[u] || {});
        for (var i = 0; i < ws.length; i++) {
          var w = ws[i];
          if (!(w in prev) && (cap[u + "\0" + w] || 0) > 0) {
            prev[w] = u;
            if (w === T) { found = true; break; }
            stack.push(w);
          }
        }
      }
      if (!found) break;
      var path = [], node = T;
      while (prev[node] !== null && prev[node] !== undefined) {
        path.push([prev[node], node]);
        node = prev[node];
      }
      var bottleneck = Infinity;
      path.forEach(function (e) {
        bottleneck = Math.min(bottleneck, cap[e[0] + "\0" + e[1]] || 0);
      });
      path.forEach(function (e) {
        cap[e[0] + "\0" + e[1]] -= bottleneck;
        cap[e[1] + "\0" + e[0]] = (cap[e[1] + "\0" + e[0]] || 0) + bottleneck;
      });
      routes += bottleneck;
    }

    var side = residualReach();
    var waist = inner.filter(function (v) {
      return side[v + "|in"] && !side[v + "|out"];
    });
    return { routes: routes + direct, waist: waist.sort() };
  }

  /* ---- latent projection ---------------------------------------------- */

  /* Project onto `keep`, preserving every d-separation among those variables.
   *
   * Chains through projected-out nodes contract to a single directed edge;
   * common causes that are projected out reappear as bidirected edges. So the
   * answer to "is this confounded" becomes a visible `<->` rather than a path
   * you have to trace. */
  function project(m, keep) {
    var K = setOf(keep);
    function reach(from) {
      var out = {}, stack = (m.children[from] || []).slice(), seen = {};
      while (stack.length) {
        var n = stack.pop();
        if (seen[n]) continue;
        seen[n] = true;
        if (K[n]) { out[n] = true; continue; }       // stop at kept nodes
        (m.children[n] || []).forEach(function (c) { stack.push(c); });
      }
      return out;
    }
    var reachOf = {};
    keys(m.parents).forEach(function (n) { reachOf[n] = reach(n); });

    var directed = [], bidirected = [], forks = {};
    keep.forEach(function (a) {
      keys(reachOf[a]).forEach(function (b) {
        if (a !== b) directed.push([a, b]);
      });
    });
    keys(m.parents).forEach(function (c) {
      if (K[c]) return;                               // only projected-out forks
      var hits = keys(reachOf[c]).sort();
      for (var i = 0; i < hits.length; i++) {
        for (var j = i + 1; j < hits.length; j++) {
          var key = hits[i] + "|" + hits[j];
          (forks[key] = forks[key] || []).push(c);
        }
      }
    });
    keys(forks).forEach(function (key) {
      var pair = key.split("|");
      bidirected.push([pair[0], pair[1]]);
    });
    return { directed: directed, bidirected: bidirected, forks: forks };
  }

  /* ---- explaining a projected edge ------------------------------------ */

  /* The variables a contracted directed edge passed through.
   *
   * A projected edge a -> b stands for one or more paths whose intermediate
   * nodes were all projected away. These are those intermediates: reachable
   * forward from a and backward from b without crossing a kept node. */
  function pathNodes(m, a, b, keep) {
    var K = setOf(keep);
    function sweep(start, key) {
      var seen = {}, stack = (m[key][start] || []).slice();
      while (stack.length) {
        var n = stack.pop();
        if (seen[n] || K[n]) continue;
        seen[n] = true;
        (m[key][n] || []).forEach(function (v) { stack.push(v); });
      }
      return seen;
    }
    var fwd = sweep(a, "children");
    var bwd = sweep(b, "parents");
    return keys(fwd).filter(function (n) { return bwd[n]; }).sort();
  }

  /* The common causes behind a bidirected edge, most explanatory first.
   *
   * A pair typically has many responsible forks, most of them ancestors of
   * each other -- naming all of them explains nothing.
   *
   * First preference is a fork with a direct edge to BOTH endpoints: that
   * renders as two plain arrows and needs no further unpacking. Failing that,
   * the lowest forks, since a fork that is an ancestor of another responsible
   * fork is further away and says less. Those may still reach the endpoints
   * through contracted chains, which can be expanded in turn. */
  function nearestForks(m, projection, a, b) {
    var key = a < b ? a + "|" + b : b + "|" + a;
    var all = (projection.forks || {})[key] || [];
    var observed = all.filter(function (c) { return !m.latent[c]; });
    var pool = observed.length ? observed : all;

    var direct = pool.filter(function (c) {
      var kids = m.children[c] || [];
      return kids.indexOf(a) >= 0 && kids.indexOf(b) >= 0;
    });
    if (direct.length) {
      return { nearest: direct.sort(), all: all.slice().sort(),
               latentOnly: !observed.length, direct: true };
    }

    var lowest = pool.filter(function (c) {
      var below = descendants(m, [c]);
      return !pool.some(function (other) {
        return other !== c && below[other];
      });
    });
    return { nearest: lowest.sort(), all: all.slice().sort(),
             latentOnly: !observed.length, direct: false };
  }

  /* What to add to the view to explain one projected edge.
   *
   * One step at a time, deliberately. Revealing every intermediate at once
   * puts up to fifteen nodes on screen and trades one unreadable picture for
   * another; a single hop can be read, and clicking again walks further. The
   * counts let the caller say how much is still hidden. */
  function explainEdge(m, projection, keep, a, b, kind) {
    if (kind === "correlated") {
      var f = nearestForks(m, projection, a, b);
      if (f.latentOnly) {
        /* No observed fork explains this pair: the dependence bottoms out in a
         * correlated-propensity draw. Reveal the two propensities that draw
         * shares instead, so the irreducible `<->` ends up between them --
         * where it actually is -- rather than floating between two distant
         * variables with nothing to account for it. */
        var pair = [];
        f.all.forEach(function (u) {
          (m.children[u] || []).forEach(function (c) { pair.push(c); });
        });
        pair = uniqueSorted(pair).filter(function (c) {
          return c !== a && c !== b;
        });
        return { add: pair, latentOnly: true, via: f.all, hidden: 0,
                 irreducible: !pair.length };
      }
      return { add: f.nearest, latentOnly: false, via: f.nearest,
               direct: !!f.direct, hidden: f.all.length - f.nearest.length };
    }
    /* A directed leg opens at its narrowest waist rather than at its first
     * hop. The first hop is an accident of where the routes happen to start
     * diverging; the waist is the set they all have to pass through, so
     * revealing it splits the leg without hiding any route. */
    var waist = legWaist(m, a, b, keep);
    var through = pathNodes(m, a, b, keep);
    return { add: waist.waist.slice(), latentOnly: false, via: [],
             routes: waist.routes,
             hidden: through.length - waist.waist.length, through: through };
  }

  /* Add whatever the picture needs to stop asserting something it cannot
   * attribute. Opening a leg grows the kept set, and a bigger kept set can
   * expose a fork that was previously hidden behind one of its own
   * descendants, so the condition has to be restored after every change
   * rather than only when the query is first run. */
  function closeUnexplained(m, x, y, keep) {
    var out = keep.slice();
    for (var round = 0; round < keys(m.parents).length; round++) {
      var artefacts = unexplained(m, x, y, out);
      if (!artefacts.length) return out;
      var pr = project(m, [x, y].concat(out));
      var grew = false;
      artefacts.forEach(function (e) {
        var f = nearestForks(m, pr, e[0], e[1]);
        drawable(m, f.nearest, x, y).forEach(function (v) {
          if (out.indexOf(v) < 0) { out.push(v); grew = true; }
        });
      });
      if (!grew) return out;        // nothing left to add; leave it as it is
    }
    return out;
  }

  function uniqueSorted(list) {
    var seen = {}, out = [];
    list.forEach(function (k) { if (!seen[k]) { seen[k] = true; out.push(k); } });
    return out.sort();
  }

  /* ---- the query ------------------------------------------------------- */

  /* A query is an unordered pair.
   *
   * Order is not a question the graph can be asked: it is acyclic, so at most
   * one of the two causes the other, and which one is a fact to report rather
   * than an input to supply. The pair is oriented internally because the
   * back-door test has to cut the outgoing edges of the causing variable --
   * and when neither causes the other there are no such edges on any path
   * between them, so the choice is immaterial. */
  function analyze(data, a, b) {
    var m = build(data);
    var forward = a !== b && !!descendants(m, [a])[b];
    var backward = a !== b && !!descendants(m, [b])[a];
    var x = backward ? b : a;
    var y = backward ? a : b;
    var desc = descendants(m, [x]);
    var shared = sharedCauses(m, x, y);
    // Shown as a fork: the endpoints, plus the variables they share upstream.
    var keep = [x, y].concat(shared.drawn);
    var seen = {}, uniq = [];
    keep.forEach(function (k) { if (!seen[k]) { seen[k] = true; uniq.push(k); } });
    return {
      pair: [a, b],
      // internal orientation; the two are drawn and described alike
      from: x,
      to: y,
      fromIsConstant: !!(m.held || {})[x],
      toIsConstant: !!(m.held || {})[y],
      // which one causes the other, or null when neither does
      causes: (forward || backward) ? [x, y] : null,
      hasDirectedPath: !!desc[y] && x !== y,
      confounded: confounded(m, x, y, []),
      shared: shared,
      // how many variables the naive "everything upstream" view would show
      relevantCount: keys(ancestors(m, [x, y])).length,
      keep: uniq,
      projection: project(m, uniq),
      model: m,
    };
  }

  return {
    build: build,
    ancestors: ancestors,
    descendants: descendants,
    determined: determined,
    dSeparated: dSeparated,
    confounded: confounded,
    sharedCauses: sharedCauses,
    legWaist: legWaist,
    closeUnexplained: closeUnexplained,
    unexplained: unexplained,
    project: project,
    pathNodes: pathNodes,
    nearestForks: nearestForks,
    explainEdge: explainEdge,
    analyze: analyze,
  };
})();
