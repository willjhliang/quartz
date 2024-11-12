A cache is a hardware-managed collection of data built with SRAM that aims to make memory access faster and avoid bottlenecking the [[🚗 Datapath]].

Caches exploit two locality principles:
1. Temporal locality: recently-referenced data is likely to be referenced again. Thus, we should cache recently-used data in a small and fast memory.
2. Spatial locality: we're more likely to reference data near recently-referenced data. Thus, we should cache large chunks to include nearby data.

# Hierarchy
In practice, we often use a hierarchy of caches. Caches closer to the CPU are smaller and faster, and caches farther away are larger and slower. Thus, upper components (I$ and D$ caches) emphasize low access speed while lower components emphasize high hit rate (to avoid going to slow main memory and disk). Furthermore, splitting instruction and data in I$ and D$ allows for individually optimizing each part, while mixing them in L2 and L3 minimizes miss rate.

![[20240513210503.png#invert|200]]

# Cache Structure
A cache, at its core, is a hardware hashtable mapping memory addresses to blocks (also called lines). Concretely, we'll use 10-bit address input and 4-byte/32-bit blocks; here, the 4-bytes is called the block size. For a 32-bit address, we use bits 11:2—index bits—to locate a block and bits 1:0—offset bits—to locate a specific byte within the block.

Multiple addresses can have the same index bits and map to the same block, so we need to keep a tag containing the remaining 31:12 bits for each block (plus a valid bit). To lookup a cache, we need to check if the tag matches and is valid, and if so, we can use the data in the block. To write, we need to first match the correct tag, then write to the block.

# Read Miss
If the requested data isn't in the cache, we need a cache controller (implemented as finite state machine) to perform a cache fill: remember miss address, access next level of memory, wait for response, and write response and tag to cache. These misses also stall the [[🚗 Datapath]] pipeline (for instructions and data memory).

# Write Miss
If the target block for a write isn't in the cache, we have two options:
1. Write-allocate: fill the block from next-level cache, then write it. This decreases read misses if we need this block again, but it requires additional bandwidth.
2. Write-non-allocate: write directly to the next-level cache and don't allocate a block.

Unlike a read miss, a write miss doesn't need to stall the pipeline. Thus, we can keep a Store Buffer between the processor and cache: store instructions put the address and value in the buffer and continue, and the buffer actually writes stores in the background. This hides the effect of store misses.

Note that the Store Buffer causes consistency issues in [[🍎 Multicore]] since it sits between the CPU and cache, so cache coherence doesn't apply and a processor can't see values in another processor's Store Buffer.

# Write Propagation
When we write to a cache, we need to choose whether to propagate this value to next-level cache or not:
1. Write-through: propagate immediately.
2. Write-back: propagate when block with the new value is replaced.

## Write-Back Caching
 Since write-back propagates sometime after the writes, there will be multiple versions of the same block within our hierarchy. To track the latest version and also know if write-back is necessary, we keep a dirty bit with the block that's set if the block is written. During propagation, the dirty bit remains set, and it's only cleared when the block goes into memory.

To hide the write-back latency, we can use a write-back buffer (WBB):
1. Cache sends fill request for the replacement block to next-level cache.
2. While waiting, cache writes dirty block to WBB.
3. When the fill request's block arrives, put it into cache.
4. Write WBB contents to next-level cache.

# Associativity
With the simple hashtable structure, two addresses with the same index bits will cause conflict. We can reorganize the cache with set-associativity: keep groups of frames (places to store blocks) called sets, and each frame in a set is called a way. Specific index bits correspond to a set, and the data can be stored in any way within that set; during lookup, we can check all of them in parallel, and any matched tag is a hit.

![[20240513214139.png#invert|300]]

## Replacement Policy
Now that we have multiple blocks in the set, which one should be replace during cache miss? This is decided by a replacement policy, which can be:
1. FIFO: first in first out.
2. LRU: least recently used, which aligns with temporal locality.
3. NMRU: not most recently used, which is easier to implement than LRU.
4. Belady's: replace block that's used furthest in future. Note that this is a theoretical optimum.

# Performance
For a miss rate $r_{miss}$, time to check cache $t_{access}$, and time to fill cache $t_{miss}$, the cache's performance is 
$$
t_{avg} = t_{access} + r_{miss} * t_{miss}.
$$


Our goal is to make $t_{avg}$ as low as possible. Aside from improving the hardware ($t_{access}$ and $t_{miss}$), certain design choices change the miss rate $r_{miss}$:
1. Increase cache capacity: this simply stores more data in the cache, so the miss rate decreases monotonically. However, this increases $t_{access}$ latency.
2. Increase block size: this exploits spatial locality, changing the boundary between index and offset bits while keeping tag bits the same. However, this can cause potentially-useless data transfer and prematurely replace useful data, increasing conflict and capacity misses. Note that this also increases $t_{miss}$, but we can largely avoid this effect for isolated misses by fetching the critical data first, continuing the pipeline, then filling in the rest in the background (called critical-word-first).
3. Increase associativity: this decreases conflict misses, which increases $r_{miss}$ (with diminishing returns) but increases $t_{access}$.

## Victim Buffer (VB)
Conflict misses occur if there's not enough associativity, but high associative is expensive and rarely needed. We can have an additional component, called Victim Buffer, that's a small fully-associative cache that provides a few extra ways shared by *all* sets, with the assumption that only a few sets need it at any given time. In practice, this is placed to catch instruction and data misses.

## Prefetching
We can also bring data into cache speculatively, for example with the hardware anticipating a miss on the next block if the current block missed. This can also be done in software with a special `prefetch` instruction.