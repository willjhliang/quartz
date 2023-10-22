# Minimum Spanning Tree Problem
Find the spanning tree of weighted-graph $G$ (connects all vertices) that has minimum cumulative weight.

# Theory
We greedily add the smallest unused edge $e$ to our MST if it doesn’t form a cycle. $e = (u, v)$ forms a cycle iff $u$ and $v$ are in the same connected component.

# Implementation
```python
def kruskal(adj):
	edges = []
	for u in adj:
		for v, w in adj[u]:
			edges.append((u, v, w))
	edges.sort(key=lambda x: x[-1])
	uf = UnionFind(len(adj))
	ret = 0
	for u, v, w in edges:
		if uf.find(u) != uf.find(v):
			uf.join(u, v)
			ret += w
	return ret
```

# Runtime

$$
 O(E\lg V) 
$$


Sorting the edges takes $O(E \lg E)$, but since $E \leq V^2$, this is equivalent to $O(E \lg V)$. Each [[🗼 Union-Find]] operation takes asymptotic $O(1)$, so iterating over edges takes $O(E)$.

Therefore, our runtime is dominated by the sorting, taking $O(E \lg V)$.