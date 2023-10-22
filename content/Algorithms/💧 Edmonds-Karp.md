# Max-Flow Min-Cut Problem
Find the maximum flow of a flow network such that
1. An edge’s flow cannot exceed capacity.
2. A vertex’s incoming flow equals outgoing flow.

# Theory
We can greedily find paths that have positive flow through the graph, called augmenting path $P$. Use [[🚋 Breadth First Search]] to find $P$, then decrease the flow from the residual capacities of the edges used.

However, we must also add capacity to the reverse direction of those edges, which allows future augmenting paths to “cancel out” this flow if it leads to greater flow.

While there is an augmenting path, it is possible to increase the total flow. Total flow is the sum of flows of all augmenting paths.

# Implementation
```python
from collections import deque

def edmonds_karp(s, t, n, adj, cap):
	ret = 0
	# Build residual graph
	for i in adj:
		for j in adj[i]:
			adj[j].append(i)
			cap[j][i] = 0

	# Keep finding augmenting paths
	while True:
		flow, par = bfs(s, t, n, adj, cap)
		if flow == 0:
			break
		ret += flow
		cur = t
		while cur != s:  # Update residual capacities
			prev = par[cur]
			cap[prev][cur] -= flow
			cap[cur][prev] += flow
			cur = prev
	return ret

def bfs(s, t, n, adj, cap):
	par = [-1 for _ in range(n)]
	par[s] = s
	q = deque([(s, float('inf'))])
	while len(q) > 0:
		cur, flow = q.popleft()
		for nex in adj[cur]:
			if par[nex] == -1 and cap[cur][nex] > 0:
				par[nex] = cur
				if nex == t:
					return flow, par
				q.append((nex, min(flow, cap[cur][nex]))
	return 0, par
```

# Runtime

$$
 O(VE^2) 
$$


Since each vertex in our graph has an incident edge, BFS takes $O(V + E) = O(E)$ time.

Due to BFS, whenever an edge $e = (u, v)$ bottlenecks an augmenting path, any future instances when it bottlenecks again will be in an augmenting path that places $e$ at least $2$ distance farther from the source than it was originally.

For $e$ to be “added back,” a new augmenting path must traverse its reverse edge; then, $u$ must appear after $v$ in BFS, so its level in the BFS tree increases by $2$. Therefore, each edge can bottleneck at most $O(V)$ times, and since each augmenting path needs at least one edge to bottleneck, there are $O(VE)$ paths.

With $O(VE)$ possible paths each taking $O(E)$ to discover, our total runtime is $O(VE^2)$.