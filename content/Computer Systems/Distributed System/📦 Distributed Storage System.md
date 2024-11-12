Distributed storage systems make shared data available for a group of users. The goal is transparency: users should not know where the data is actually stored.

There are many design decisions to consider; for example:
1. How much scalability do we need?
2. What kind of consistency?
3. What is the expected workload?

There are two access models:
1. Upload/download: when a client uses a file, they download it from the server, then upload it once they're done.
2. Remote access: files stay on the server, and clients ask the server to perform the operation on their behalf.

There are multiple established systems, including:
1. Classics like [[🌞 Network File System (NFS)]] and [[🦴 Coda File System]].
2. More modern, scalable ones like [[🔎 Google File System (GFS)]] and [[🔑 Bigtable]].

# CAP Theorem
In this system, we want three things:
1. Consistency: all clients see the same data, even during concurrent updates.
2. Availability: all clients can access the data, even during faults.
3. Partition-tolerance: consistency and availability hold, even during network partitions.

Unfortunately, the CAP theorem states that we can get at most two of the three. In essence, when a network partition happens, we can either:
1. Cancel the operation, decreasing availability but increasing consistency.
2. Proceed with the operation, increasing availability but decreasing consistency.

Generally, a CA system is not a great option. Instead, we usually use CP, which rejects updates when not all replicas can be contacted, making the system unavailable ([[🔑 Bigtable]]), or AP, which accepts inconsistencies and tries to resolve them later ([[🦴 Coda File System]]).