# Traversal Problem
Visit each vertex connected to source $s$ in a graph $G$, detecting any cycles if they exist.

# Theory
For each vertex, recurse on each of its neighbors if they haven’t been visited yet; this ensures that we visit every reachable vertex from $s$.

# Implementation
```python
def dfs(s, adj):
	vis = set()
	dfs_visit(s, adj, vis)

def dfs_visit(s, adj, vis):
	vis.add(s)
	for n in adj[s]:
		if n not in vis:
			dfs_visit(n, adj, vis)
```

# Runtime
$$ O(V+E) $$

We visit each vertex exactly once (due to the visited set) and each edge exactly once (since we visit an endpoint vertex exactly once), giving us a runtime of $O(V+E)$.