A system that stores data should be both durable (no data loss) and available (data is accessible when needed). It's difficult to achieve this with a single machine since it can fail and bottleneck. Instead, we can store copies of the data on multiple machines; data will be safe as long as there's at least one machine working, and users can access data from any machine.

If data was read-only, this would be a simple system. Writes make it more complicated:
1. Replication protocol: we need to propagate updates to all replicas.
2. Consistency model: we need to define the "right" value when a client asks for the data.

# Replication Protocols
## Primary-Based
A primary-based protocol chooses a primary for each object that's responsible for coordinating updates for that object. The client can still send requests to any replica, but the primary should coordinate changes. There are two ways to implement this:
1. Remote writes: replicas forward writes to the primary, which propagates writes to all other replicas. This is common for distributed file systems and databases.
2. Local writes: the replica that receives the write request *becomes* the primary and propagates it to all other replicas. This can be used during disconnection operation; the primary can always accept writes, so if a node is going to be disconnected, it can first become the primary, accept the writes, then propagate them after it's reconnected.

## Quorum-Based
Primary-based protocols are susceptible to bottlenecks and single points of failure. To make replication fully distributed, a client can ask multiple replicas for permission for some request. Specifically, it must ask $R$ replicas for read and $W$ for write; any group of $R$ or $W$ replicas is called a read or write quorum respectively.
1. To read, each server in the quorum responds with the latest version number of the object. The client downloads from the server with the latest version number.
2. To write, each server responds with the latest version number, and the client sends the new object and the highest number plus one to all servers in the quorum.

Let $N$ be the total number of servers. To prevent read-write conflicts (no read should return old value before write), we need the groups to overlap, $R + W > N$. Similarly, to prevent write-write conflicts (no two writes can succeed concurrently), we need $W + W > N$. $R$ and $W$ must satisfy these two constraints, and their specific values can be 

# Consistency Models
A consistency model defines the "correct" behavior to guarantee.
1. Sequential consistency: result of any execution is same as some serial ordering, and all clients see operations in the same order. This can be achieved via the primary serializing operations (primary-based) or preventing concurrent writes (quorum-based).
2. Causal consistency: writes that are causally related must be seen in the same order by all nodes, but concurrent writes can be in a different order. We can implement this with [[⏰ Clock Synchronization#Vector Clock]]s.
3. Eventual consistency: in absence of further updates, all replicas converge to the same state (by lazily forwarding updates). This is used when we don't care about interactions between multiple clients—for example, if each object is only used by one client.

## Client-Centric Consistency
In the final case, we only consider a single client's experience with our system, not what *multiple* clients see. However, this client can access different replicas, and we can ensure some client-centric consistency guarantees:
1. Monotonic reads: if a client reads the value of an object, successive reads will return the same value or a more recent one. This means the value of the read must be propagated before returning the result to the next read.
2. Monotonic writes: if a client writes to an object, the write is completed before subsequent writes. Similarly, this means the written value must be propagated before applying the next write.
3. Read your writes: if a client writes to an object, the value will always be seen by subsequent reads.
4. Writes follow reads: if a client writes to an object after reading, the change will take place on the same or more recent value that was read.
