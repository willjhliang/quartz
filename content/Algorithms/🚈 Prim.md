# Minimum Spanning Tree Problem
Find the spanning tree of weighted-graph $G$ (connects all vertices) that has minimum cumulative weight.

# Theory
The cut property states that for any cut $(S, V \setminus S)$ of $G$, the minimum edge $e$ crossing the cut must be in all minimum spanning trees. Prim uses this property to greedily add minimum-weight edges, building a connected component $C$ and applying the property to cut $(C, V \setminus C)$.

# Implementation
```python
from heapq import heappush, heappop

def prim(adj):
	ret = 0
	dist = [float('inf') for _ in range(len(adj)]
	dist[0] = 0
	pq = [(0, 0)]
	while len(pq) > 0:
		d, c = heappop(pq)
		ret += d
		for n, w in adj[c]:
			if w < dist[n]:
				dist[n] = w
				heappush(pq, (dist[n], n))
	return ret
```

# Runtime
$$ O(E\lg V) $$

Assuming our input is valid (that $G$ does have a MST), $E \geq V - 1$ since it must be connected. Each priority queue pop and push takes $O(\lg V)$, and we perform these operations once for each vertex and edge.

Therefore, our runtime is $O((V+E)\lg V) = O(E \lg V)$.