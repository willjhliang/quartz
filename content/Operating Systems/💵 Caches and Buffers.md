Caches and buffers are a common design pattern for temporarily storing information for some possible speedup.
1. Caches generally save information in case it's needed again in the future. This takes advantage of spatial and temporal locality (see [[⏱️ Memory Hierarchy]]).
2. Buffers generally save information and flush them altogether to prevent excess writes.

# CPU Cache
The CPU (L1, L2, L3) cache is a piece of memory which faster access than RAM. Putting the right data in this cache decreases the memory access bottleneck.

We can split memory into 64-byte lines (so the bottom 6 bits of the address is the offset and 58 bits specify the line number). When we access some address, we bring the whole line into our cache, assuming spatial locality for future accesses.

When designing programs, this cache spatial locality can produce huge differences in speed. For example, a `vector` with continuous memory can be much faster than a `list`. Similarly, row-wise traversal of a 2D matrix is faster than column-wise (since the matrix is stored row-by-row).

# Block Cache
Disk I/O in the [[🗄️ File System]] is slow, and one way we can speed it up is by caching some blocks in memory. We'll store the cached blocks in a chaining hash map with the LRU (least recently used) eviction policy. The [[📍 Hashmap]] gives us O(1) lookup time, and the linked list has O(1) pops and pushes to its ends.

# Write Buffer
When we write to disk, we usually don't want to write everything one-by-one as it'll require many more I/O requests, making it slow. Instead, we save our information in a buffer, and once the buffer is full, we flush the whole thing onto disk in one I/O request.

Thus, the buffer is an intermediate step between a write call and an actual write to the disk. In situations with many small writes or few writes, it provides speedups. However, it also introduces some overhead and won't help for large writes (that'll just fill the entire buffer).

The buffer also has some risks:
1. Since the buffer is stored in memory, it will be copied when a new process is forked. This introduces odd behavior such as extra writes.
2. Also, since memory is not persistent, if the system loses Ppower, everything in the buffer will be lost—even though they are supposed to be written to persistent storage.

We can manually flush the buffer (before it's full), which alleviates some problems. Nevertheless, it's important to keep in mind that *when write is called, the data might not actually be written to disk until later*.