# Minimum Value Problem
Maintain a set that support quick insertions and minimum-value retrievals.

# Theory
Maintain binary tree where the current node’s value is smaller than its child node’s value. This allows for quick minimum pops and insertion.

# Implementation
```python
class MinHeap:
	def __init__(self, l=None):
		self.heap = [0] if l is None else ([0] + l)
		if len(self.heap) > 1:
			self.build_heap()
	
	def build_heap(self):
			for i in range(len(self.heap)//2, 0, -1):
				self.min_heapify(i)

	def min_heapify(self, i):
		l, r = self.left(i), self.right(i)
		if l >= len(self.heap) and r >= len(self.heap):
			return
		if self.heap[l] < min(self.heap[i], self.heap[r]):
			self.heap[i], self.heap[l] = self.heap[l], self.heap[i]
			self.min_heapify(l)
		elif self.heap[r] < min(self.heap[i], self.heap[r]):
			self.heap[i], self.heap[r] = self.heap[r], self.heap[i]
			self.min_heapify(r)

	def insert(self, v):
		i = len(self.heap)
		self.heap.append(v)
		while i > 1 and self.heap[self.par(i)] > self.heap[i]:
			self.heap[self.par(i)], self.heap[i] = self.heap[i], self.heap[self.par(i)]
			i = self.par(i)
	
	def pop(self):
		ret = self.heap[1]
		self.heap[1], self.heap[len(self.heap)-1] = self.heap[1], self.heap[len(self.heap)-1]
		self.heap.pop(-1)
		self.min_heapify(1)
		return ret

	def left(self, i): return i * 2

	def right(self, i): return i * 2 + 1

	def par(self, i): return i // 2
```

# Runtime
`build_heap`: $O(n)$ since there are more nodes at lower levels, balancing out the $O(\lg n)$ factor from `min_heapify`.

`min_heapify`: $O(\lg n)$ since the recurrence relation is $T(n) = T(n/2) + O(1)$.

`insert`: $O(\lg n )$ since the height of the tree is $O(\lg n)$.

`pop`: $O(\lg n)$ due to calling `min_heapify`.