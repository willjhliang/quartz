# Search Problem
Find the index of element $x$ in a sorted array $A$ if it exists or the insertion point if it doesn’t.

# Theory
Recursively divide the array into two halves; $x$ must appear in only one of these two halves, depending on whether it’s greater or less than the midpoint between the halves.

# Implementation
```python
def binary_search(arr, x):
	lo, hi = 0, len(arr) - 1
	while lo <= hi:
		mid = int((lo + hi) / 2)
		if arr[mid] == x:
			return mid
		lo = mid + 1 if x > arr[mid] else lo
		hi = mid - 1 if x < arr[mid] else hi
	return lo
```

# Runtime

$$
 O(\lg n) 
$$


Binary search divides the array of size $n$ into two, so it has the runtime recurrence $T(n) = T(n/2) + O(1)$. Therefore, our runtime is $O(\lg n)$.