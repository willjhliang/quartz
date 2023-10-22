# Shortest Path Problem
Find the shortest path from $s$ to all other vertices in a weighted graph $G$, works for negative weights and detects negative-weight cycles.

# Theory
Iteratively try to relax each edge, using it if it creates a better shortest path.

Since a path can use at most $n - 1$ edges, if there’s a better path after iterating $n - 1$ times, we found a negative-weight cycle. Otherwise, we tried all possible length paths for all vertices, so we must find the shortest path from $s$ to all vertices.

# Implementation
```python
def bellman_ford(s, adj):
	dist = [float('inf') for _ in range(len(adj)]
	dist[s] = 0
	for _ in range(len(adj)-1):
		for u in adj:
			for v, w in adj[u]:
				if dist[u] + w < dist[v]:
					dist[v] = dist[u] + w
	for u in adj:
		for v, w in adj[u]:
			if dist[u] + w < dist[v]:
				return None, True
	return dist, False
```

# Runtime

$$
 O(VE) 
$$


We loop over all edges $V-1$ times, so our runtime is $O(VE)$.