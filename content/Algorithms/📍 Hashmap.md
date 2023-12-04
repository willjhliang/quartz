# Map Problem
Maintain a set of key-value pairs with quick insertion, removal, and retrieval.

# Theory
Use a hash function $f$ to map every key to an index in an array. In case of collision, resolve via bucketing (chaining) or open addressing.

# Implementation
```python
class HashMap:
	def __init__(self, n, f):
		self.l = [LinkedList() for _ in range(n)]
		self.f = f

	def insert(self, k, v):
		self.l[self.f(k)].insert(k, v)

	def get(self, k):
		c = self.l[self.f(k)].head
		while c is not None and c.k != k:
			c = c.nex
		return c.v if c is not None else None

	def remove(self, k):
		self.l[self.f(k)].remove(k)

class LinkedList:
	def __init__(self):
		self.head = None
		self.tail = None

	def insert(self, k, v):
		c = self.head
		while c is not None and c.k != k:
			c = c.nex
		if c is not None:
			c.v = v
			return

		n = Node(k, v)
		if self.head is None:
			self.head = n
			self.tail = n
		else:
			self.tail.nex, n.prev = n, self.tail
			self.tail = n

	def remove(self, k):
		c = self.head
		while c is not None and c.k != k:
			c = c.nex
		if c is None:
			return False
		if c.nex is not None:
			c.nex.prev = c.prev
		if c.prev is not None:
			c.prev.nex = c.nex
		if c == self.head:
			self.head = c.nex
		if c == self.tail:
			self.tail = c.prev
		return True

class Node:
	def __init__(self, k, v):
		self.k, self.v = k, v
		self.prev, self.nex = None, None
```

# Runtime
`insert`: asymptotic $O(1)$ with bucketing if the range is large enough for universe, allowing bucket traversal to be $O(1)$.

`get`: asymptotic $O(1)$ for the same reason.

`remove`: asymptotic $O(1)$ for the same reason.