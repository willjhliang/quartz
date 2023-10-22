# Ordered Set Problem
Maintain an ordered set of elements, supporting quick insertion and search.

# Theory
Maintain a binary tree such that all nodes in the left subtree are smaller and all nodes in the right subtree are bigger than the current node. This allows for quick inserts and deletes, given that the tree is balanced.

# Implementation
```python
class Node:
	def __init__(self, v):
		self.v = v
		self.left, self.right = None, None
	
	def insert(self, x):
		if x < self.v:
			if self.left is not None:
				self.left.insert(x)
			else:
				self.left = Node(x)
		elif x > self.v:
			if self.right is not None:
				self.right.insert(x)
			else:
				self.right = Node(x)

	def search(self, x):
		if self.v == x:
			return True
		elif x < self.v:
			return self.left.search(x) if self.left is not None else False
		else:
			return self.right.search(x) if self.right is not None else True
```

> [!info]
> Note that the implementation above doesn’t include rebalancing.

# Runtime
`insert`: $O(\lg n)$ since the height of the balanced tree is $O(\lg n)$.

`search`: $O(\lg n)$ since the height of the balanced tree is $O(\lg n)$.