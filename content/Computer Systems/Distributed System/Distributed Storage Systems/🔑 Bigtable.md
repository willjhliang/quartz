Bigtable is a [[📦 Distributed Storage System]] for structured data, designed for flexibility and performance (varying data sizes, diverse latency requirements). It uses the key-value abstraction where keys and values can be arbitrary; the basic commands are `PUT(k, v)` and `GET(k)`.

As its name suggests, the database is structured like a big table. Each row is identified by its *row key*, and the row itself is a key-value store with keys identifying a column. Different rows have different columns.

To split the table across many machines, we partition it into row ranges, called tablets. The tablets are given to tablet servers, and Bigtable maintains an index by row key to find rows.

# System
Bigtable is implemented as a single-master system, where the master assigns tablets to tablet servers, load balances, and and does other tasks. Each server stores a memtable, SSTables, and commit log:
1. Writes are appended to commit log and kept in memtable. This allows quick restoration after a crash.
2. When memtable is full, it's frozen and written to [[🔎 Google File System (GFS)]] as a SSTable.
3. In the background, a process occasionally merges SSTables and delete old data.