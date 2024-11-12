Spark is a big data computing framework designed to address three limitations in [[🗺️ MapReduce]]:
1. Performance: instead of writing to disk, Spark uses in-memory computing.
2. Usability: provides higher-level operation abstractions (DSL).
3. Interactivity: includes shell support for queries.

Spark's key innovation is the resilient distributed dataset (RDD), which are read-only collections stored in memory partitioned across machines. Computations on existing RDDs results in new RDDs, and they can be written back to disk. With this setup, old RDDs can be reused, which can provide efficiency gains.

To perform a computation on RDDs, Spark provides coarse-grained *transformations* like `map`, `filter`, `union`, and others. To produce a result, Spark has *actions* like `count` and `collect`. Work is only done when a user applies an action, which allows Spark to optimize transformations.

Transformations define how new RDDs are constructed from old ones. Spark keeps track of this in a lineage graph, which is used for optimization, fault tolerance, and caching.

# Implementation
Spark uses a single-master architecture where a driver program defines RDDs, invokes actions, and tracks lineage. Workers coordinated by the driver store pieces of RDDs in memory and perform computations on them.