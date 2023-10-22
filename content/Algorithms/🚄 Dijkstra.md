# Shortest Path Problem
Find the shortest path from $s$ to all other vertices in a weighted graph $G$ with non-negative weights.

# Theory
Greedily go to the next-closest vertex $v$, then update distances to its neighbors. If there was a shorter path to $v$ that ends with $(u, v)$, we would’ve gone to $u$ already and found this path; therefore, the one we just found must be the shortest path.

# Implementation
```python
from heapq import heappush, heappop

def dijkstra(s, adj):
	dist = [float('inf') for _ in range(len(adj)]
	dist[s] = 0
	pq = [(0, s)]
	while len(pq) > 0:
		d, c = heappop(pq)
		for n, w in adj[c]:
			if dist[c] + w < dist[n]:
				dist[n] = dist[c] + w
				heappush(pq, (dist[n], n))
	return dist
```

# Runtime
$$ O((V+E)\lg V) $$

Priority queue takes $O(\lg V)$ for both push and pop. We pop each vertex once, taking $O(V\lg V)$ total, and use each edge once to add a neighbor to the priority queue, taking $O(E \lg V)$ total; therefore, our total runtime is $O((V+E)\lg V)$.