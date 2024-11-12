MapReduce is a framework for performing structured computations on large amounts of data—so much data that compute and storage must be split across multiple machines. Thus, we need to solve problems with coordination, load balancing, etc.

For simplicity, lets abstract the data as key-value pairs $(k, v)$. MapReduce, as its name suggests, processes the data in two stages:
1. Map: takes $(k, v)$ and produces some intermediate $(k', v')$ pair(s), essentially organizing them into "stacks."
2. Reduce: takes groups of $(k', v')$ pairs with the same key $k'$ and produces some $(k'', v'')$ pairs for the output, essentially "aggregating" the information for the same key $k$'.

![[20240429191952.png#invert]]

For example, to find the number of occurrences of each word in a set of documents, the map function reads each documents and maps each word to $(\text{word}, 1)$; then, the reduce function adds the $1$s together for each $\text{word}$.

To design a system, we must consider the limitations and responsibility of each function:
1. Map: only looks at individual key-value pairs, cannot use other key-value pairs. However, it can emit more than one intermediate key-value pair.
2. Reduce: aggregates multiple values from the same intermediate key.

# Implementation
![[20240429192621.png#invert]]

To implement this system, we need:
1. [[📦 Distributed Storage System]] to store inputs, outputs, and intermediate results. For example, [[🔎 Google File System (GFS)]].
2. A driver program (master), which specifies the input and output locations, the mapper and reducer functions, and more. Notably, it should assign tasks to maximize locality, making nodes do work on data replicas it's already storing.
3. The runtime system, which controls nodes and supervises execution.