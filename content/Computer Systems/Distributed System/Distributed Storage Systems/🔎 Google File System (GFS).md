GFS is a file system originally designed for Google Search, which has three major components:
1. Crawler: downloads as many web pages as possible.
2. Indexer: builds an inverted index, mapping search term to urls.
3. Searcher: finds and ranks pages for a query.

A file system for these operations should have very large capacity, efficient appends (crawler), efficient sequential reading (indexer), and good fault tolerance. Perfect consistency, random access, and transparency is not as important.

GFS breaks files into 64MB chunks, which are stored on different chunkservers. A single master node stores the metadata (maps file to list of chunks, which chunkservers have which chunk); though this is a potentially bottleneck, the metadata is so small relative to the pages and it's okay. Note that the master does not save which chunkservers have which chunk; for simplicity and flexibility, chunkservers periodically update the master on their contents.

For [[❤️‍🩹 Fault Tolerance]], the master keeps an operation log of metadata changes and periodically checkpoints its state. The log is also replicated on multiple machines, and if the master is down, "shadow masters" provide read-only access.

# File Operations
To read from a file:
1. Client translate filename and byte range to filename and chunk number.
2. Client queries master, which responds with chunk handle and chunkservers.
3. Client picks chunkserver and sends a request with chunk handle and byte range.
4. Chunkserver returns requested data.

For write requests, GFS needs to ensure consistency across replicas of a chunk. To do so, the master designates one replica as the primary, which accepts all requests, orders them, and forwards them to the others. The primary is decided by a temporary *lease*, which is granted by the master. With this setup, to write to a file:
1. Client asks master for chunk handle and ID of primary chunkserver.
2. Master returns ID of primary and secondary chunkservers.
3. Client sends data to all replicas (technically only to one replica, then the replicas chain it to each other).
4. After "ack," client asks primary to write data.
5. Primary assigns a serial number to write operation and applies it.
6. Primary forwards writes to secondary replicas in the same order.
7. Secondaries reply success, and primary replies to client.

If there's a write failure, the state is inconsistent. GFS reports this to the client, and it's up to the client to handle the situation.

To append to a file:
1. Client sends request to master, master returns with last chunk's handle and primary and secondary chunkservers.
2. Client pushes write data to all replicas like above, then contacts primary.
3. Primary checks whether the chunk has enough room for new data:
	1. If so, it appends the record and tells secondaries to do the same. Then, it responds to the client.
	2. If not, the primary pads the chunk to maximum size (same for secondaries), then tells client to retry on the next chunk.

# Consistency
GFS uses a very relaxed consistency model, which allows multiple clients to overwrite each other and for failed writes or appends to cause replicas to diverge. The only guarantee is that metadata operations go through the master and thus are atomic.