The CPU cache is a piece of memory which faster access than RAM. Putting the right data in this cache decreases the memory access bottleneck.

We can split memory into 64-byte lines where the bottom 6 bits is the offset and 58 bits specify the line number. When we access some address, we bring the whole line into our cache, assuming spatial locality for future accesses.

When designing programs, this cache spatial locality can produce huge differences in speed. For example, a `vector` with continuous memory can be much faster than a `list`. Similarly, row-wise traversal of a 2D matrix is faster than column-wise (since the matrix is stored row-by-row).