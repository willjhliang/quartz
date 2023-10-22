# Topological Sort Problem
Calculate a sorting of vertices in DAG $G$ such that all edges in $G$ point “forward” in the sort. In other words, find a sort where there is no $e = (u, v)$ where $v$ appears before $u$.

# Theory
Keep track of the number of incoming edges for each vertex $v$. If $v$ has no incoming edges, it can safely be added to the ordering.

Then, consider all of its outgoing edges “removed,” and update the counter for its neighbors accordingly.

# Implementation
```python
from collections import deque

def kahn(adj):
	inc = [0 for _ in range(len(adj))]
	for u in adj:
		for v in adj[u]:
			inc[v] += 1
	q = deque([i for i in range(len(adj)) if inc[i] == 0])
	ret = []
	while len(q) > 0:
		c = q.popleft()
		ret.append(c)
		for n in adj[c]:
			inc[n] -= 1
			if inc[n] == 0:
				q.append(n)
	return ret
```

# Runtime
$$ O(V+E) $$

We process each vertex and edge exactly once (similar to BFS), so Kahn runs in $O(V+E)$.