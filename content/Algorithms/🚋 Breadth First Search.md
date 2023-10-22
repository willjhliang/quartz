# Traversal Problem
Visit each vertex connected to source $s$ in a graph $G$, finding the shortest path from $s$ to $v$ for all $v$ in unweighted graph $G$.

# Theory
Keep a queue of vertices that can be visited, and for each vertex in the queue, add its neighbors to the queue if they haven’t been visited before. The queue ensures that we go through vertices in ascending distance order, so BFS finds the minimum distance to all vertices (given that the graph is unweighted).

# Implementation
```python
from collections import deque

def bfs(s, adj):
	q = deque([s])
	dist = {s: 0}
	while len(q) > 0:
		c = q.popleft()
		for n in adj[c]:
			if n not in dist:
				dist[n] = dist[c] + 1
				q.append(n)
```

# Runtime
$$ O(V+E) $$

We visit each vertex exactly once (due to the visited array) and each edge exactly once (since we visit an endpoint vertex exactly once), giving us a runtime of $O(V+E)$.