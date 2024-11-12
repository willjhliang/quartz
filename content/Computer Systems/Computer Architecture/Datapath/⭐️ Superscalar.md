With [[🚗 Datapath#Pipelining]], we achieve pipeline-level parallelism where different stages run different instructions at the same time. The next level to this design is superscalar (also called multiple issue), with instruction-level parallelism: executing multiple independent instructions fully in parallel.

Key to this idea is having *multiple instructions per stage* (currently, around 2-6 is standard). An example ideal scenario is below:

![[20240514005046.png#invert]]

Realistically, there are still many dependencies, which limits the amount of instruction-level parallelism possible. It heavily depends on the application, even though the compiler tries to schedule code to avoid stalls.

# Fetch
During fetch, we need to get multiple instructions per cycle. Complications arise when the next instruction is in another cache block, or when there's branching. Below are two solutions:
1. Over-fetch and buffer: add a queue between fetch and decode, and put instructions in the buffer. This compensates for cycles that fetch less instructions.
2. Loop stream detector: if there's a loop, put the entire body into a small cache.

# Bypass
To implement bypassing for multiple parallel instructions, we need $N^2$ wires. Each bypass contains 64-bit quantities, and there are multiple levels of bypassing. This lengthens the critical path and makes it difficult to use.

To mitigate this $N^2$ factor, we can use clustering: group ALUs into $K$ clusters, and only fully bypass within each cluster (with limited bypassing between clusters). It's also important to steer dependent instructions to the same cluster.

# Register File
Another big $N^2$ problem is the register file due to the growing number of ports. We can similarly use clustering by replicating the register file so there's one per cluster; reads go to the cluster's register file (so we need less read ports), though writes need to go to all register files.