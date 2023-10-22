# Shortest Path Problem
Find the shortest path between all pairs of vertices $(u, v)$ in weighted graph $G$.

# Theory
Each between two vertices contains at most $V - 2$ internal vertices (not including its endpoints), so we can incrementally build this path over many iterations. Such a path $P = v_1 v_2 \dots v_n$ would take at most $O(V)$ iterations to construct since we find $v_1 v_2$ in the first iteration, then $v_1 v_2 v_3$, and so on.

# Implementation
```python
def floyd_warshall(adj):
	dist = [[float('inf') for _ in range(len(adj))] for _ in range(len(adj))]
	for u in adj:
		for v, w in adj[v]:
			dist[u][v], dist[v][u] = w, w
	for k in range(len(adj)):
		for i in range(len(adj)):
			for j in range(len(adj)):
				if dist[i][k] != float('inf') and dist[k][j] != float('inf'):
					dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
	return dist
```

# Runtime
$$ O(V^3) $$

We perform a triple-nested loop over the vertices, giving us $O(V^3)$.