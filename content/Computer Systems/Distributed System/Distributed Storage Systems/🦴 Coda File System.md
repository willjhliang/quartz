The goal of Coda is for the system to remain usable even if the servers fail or cannot be reached. This is done via disconnection operation: the client uses local data and changes are reconciled after connectivity is restored.

A Coda client can be in one of three states:
1. Hoarding: connected to the server and downloading files and metadata used in case of disconnection.
2. Emulation: disconnected and emulating the server behavior locally.
3. Reintegration: connection is available, and changes are pushed back to server.

The client decides to hoard files by priority, which is based on user input and recency. Clients fill their cache, and the goal is to always have the highest-priority files locally. Also, when a file is opened, the client downloads it.

# Callbacks and Transactions
For consistency, Coda uses callbacks: the server remembers which clients have a file (callback promise), and when a client modifies the file, it notifies the server, causing it to send invalidation messages to other clients that have the file (callback break). The other clients then invalidate their local copies and redownload if the file is opened again.

Coda also serializes transactions, which are defined as sessions (open to close). The client acquires necessary shared locks, and the server enforces these locks.

# RPC2
Coda uses RPC calls to communicate, specifically RPC2; this has a few advantages:
1. Failure detection: periodically sending heartbeats, allowing the client to detect disconnection and enter emulation stage.
2. Parallel RPC: invalidation messages are sent in parallel instead of one-by-one.

# Replication
Coda replicates volumes and uses the read-one-write-all (ROWA) protocol, allowing reads from any replica and sending writes to all replicas. Consistency is maintained via [[⏰ Clock Synchronization#Vector Clock]]s.

In case of a network partition, Coda implements optimistic replication: clients can still writes to files, and vector clocks reintegrate replicas when the partition heals. If there is a conflict, resolution must be done by the application or manually.