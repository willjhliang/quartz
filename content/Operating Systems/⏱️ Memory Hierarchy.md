The memory hierarchy is an organization of different types of memory based on their size and access time. The higher it is (lower level number), the faster but smaller.

![[20231019155743.png#invert]]

Generally, the closer the data is to the CPU, the faster the access time. We want to store commonly-used data in places with faster access time; to do so, we can take advantage of two principles:
1. Temporal locality: if we access some part of memory, we'll likely access it again soon.
2. Spatial locality: if we access some part of memory, we'll likely access its neighbors.

These ideas are used to optimize speeds in [[🧠 Virtual Memory]].