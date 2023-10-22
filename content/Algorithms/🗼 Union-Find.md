# Disjoint Set Problem
Maintain a series of disjoint sets supporting quick unions and identification.

# Theory
UF builds a tree for each disjoint set, merging them optimally with path compression to achieve fast asymptotic query times.

# Implementation
```python
class UnionFind:
	def __init__(self, n):
		self.par = [i for i in range(n)]
		self.rank = [1 for i in range(n)]

	def find(self, x):
		while self.par[x] != x:
			self.par[x] = self.find(par[x])
		return self.par[x]

	def union(self, x, y):
		px, py = self.find(x), self.find(y)
		if px == py:
			return False
		if self.rank[px] > self.rank[py]:
			px, py = py, px
		self.par[px] = py
		if self.rank[px] == self.rank[py]:
			self.rank[py] += 1
		return True
```

# Runtime
`find`: asymptotic $O(1)$ with path compression; technically $O(\lg ^* n)$ but can be treated as constant for any $n$.

`union`: asymptotic $O(1)$ as we only perform constant-time operations after `find`.