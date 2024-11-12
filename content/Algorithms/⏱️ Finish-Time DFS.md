---
---
# Topological Sort Problem
Calculate a sorting of vertices in DAG $G$ such that all edges in $G$ point “forward” in the sort. In other words, find a sort where there is no $e = (u, v)$ where $v$ appears before $u$.

# Theory
If there’s an edge $(u, v)$ in $G$, $u$ will have a larger finish time than $v$; it either uses the edge to reach $v$ or $v$ was reached earlier and therefore finished earlier.

Thus, taking vertices in descending order of finish time gives us a topological sort.

# Implementation
```python
def dfs(adj):
	vis = set()
	ret = []
	for s in range(len(adj)):
		if s not in vis:
			dfs_visit(s, adj, vis, ret)
	return ret.reverse()

def dfs_visit(s, adj, vis, ret):
	vis.add(s)
	for n in adj[s]:
		if n not in vis:
			dfs_visit(n, adj, vis)
	ret.append(s)
	
```

# Runtime

$$
 O(V+E) 
$$


This is just a modified DFS, so it also takes $O(V+E)$.