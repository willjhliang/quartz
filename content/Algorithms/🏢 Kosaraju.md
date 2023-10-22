# Strongly Connected Components Problem
Find the partition $S_1, S_2, \ldots S_k$ of $G$ such that all vertices in each partition are reachable from each other and that each partition is maximal. Each partition is a strongly connected component.

# Theory
As shown in [[⏱️ Finish-Time DFS]], a source vertex must have larger DFS finish times than other vertices.

Then, in $G^\top$, such a vertex $v$ must be a sink; running DFS on $v$ in $G^\top$ finds the strongly connected component $C$ that it’s in, and we can move on to the next vertex with largest finish time that’s not in $C$.

# Implementation
```python
t = 0

def kosaraju(adj):
	vis, fin = set(), []
	for s in range(len(adj)):
		if s not in vis:
			dfs1(s, adj, vis, fin)

	adj_t = {}
	for i in range(len(adj)):
		adj_t[u] = []
	for u in adj:
		for v in adj[u]:
			adj[v].append(u)

	ret, vis = [], set()
	for _, s in reversed(fin):
		if s not in vis:
			comp = set()
			dfs2(s, adj_t, vis comp)
			ret.append(comp)
	return ret

def dfs1(s, adj, vis, fin):
	vis.add(s)
	for n in adj[s]:
		if n not in vis:
			dfs1(n, adj, vis)
	fin.append((t, s))
	t += 1

def dfs2(s, adj, vis, comp):
	vis.add(s)
	comp.add(s)
	for n in adj[s]:
		if n not in vis:
			dfs2(n, adj, vis, comp)
```

# Runtime
$$ O(V+E) $$

We essentially perform two runs of DFS, so our algorithm takes $O(V+E)$.