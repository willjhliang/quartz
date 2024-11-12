NFS is a standard for clients to access files on a remote system, usually one server. Modern operating systems have a virtual file system layer (VFS) that provides an interface for file manipulation, and the NFS client intercepts VFS calls and forwards them to the server via RPC, making the NFS transparent to the user.

The RPC calls mostly mirror VFS operations. They can either be stateless or stateful (depending on NFS version):
1. Stateless calls contain all information the server needs, including user credentials. Then, the server doesn't need to remember session state.
2. Stateful calls require the user to log into the server, which gives them a session ID; the session ID is then included with subsequent RPCs. While this is more complicated, it allows the NFS to support file locking and mutual exclusion.

However, an RPC call for every single operation would be extremely expensive. Instead, we cache data on the client side, allowing clients to make changes directly to the cached data; the cache is flushed after the file is closed. This type of consistency is called close-to-open, and its main problem is that if two clients are changing the same file in their own caches, the most recent file close overwrites the other.

To avoid this issue, NFS also supports file delegation: move the file to the client and recall it when other clients use it. Then, the client that gets the delegation can exclusively modify the file, and others need to wait until the changes are pushed back.
