Memory allocation assigns chunks of memory for any [[💼 Process]]es that need it.

One way to manage the available memory is with a free list, which is a linked list containing nodes that correspond with allocated or free chunks of memory.

# Fragmentation
When memory is allocated and freed a lot, storage might be used inefficiently—called fragmentation. This prevents some unused memory from otherwise being used.
1. External fragmentation: free memory is spread out in small chunks that can't be coalesced into a bigger block.
2. Internal fragmentation: more space is allocated for something than is actually used.

# Allocation Policies
To minimize fragmentation, there are a variety of allocation policies, each good for certain use cases.
1. First fit: take the first block that's big enough.
2. Best fit: take the tightest fit—smallest block that's big enough.
3. Worst fit: take the largest block.

## Buddy Algorithm
The buddy algorithm fixes a maximum amount of memory and divides memory into powers of 2; the smallest unit is 1 page, 4 KB. Specifically, for an allocation request, we split chunks in half until we have the smallest size that'll fit the request. When chunks are freed, they're merged with their "buddy" (the other chunk that came out of the split).

While this neatly organizes memory and generally minimizes external fragmentation, a lot of weirdly-sized allocations will significantly increase internal fragmentation.

## Slab Algorithm
The slab allocator restricts memory management to a single size that can be allocated or freed. We first specify some fixed chunk of memory as a slab; the slab can then be broken into the fixed-sized pieces called objects. If more memory is needed, we create another slab.

In the kernel, we use this slab algorithm *on top of* the buddy algorithm—the buddy algorithm allocates chunks of memory for multiple slabs and object sizes. This gives us a degree of flexibility while retaining the benefits of the slab's quick memory management.