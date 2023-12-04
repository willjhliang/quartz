The inode is a modern solution for tracking blocks in the [[🗄️ File System]]. The key observation is that at any time, we only care about blocks for currently-open files.

So, for each file, we track which blocks it's using. This information, along with metadata (permissions, size, etc), is stored in an inode. The file's associated inode is stored at the beginning of disk, and when we want to access a file's data, we look up the inode and directly get a list of ordered blocks.

![[20231204115011.png]]

# Structure
Each inode has a fixed size set to store metadata as well as 12 block numbers. If a file needs more than 12 blocks, we can allocate a new block (with 128 numbers) to hold more block numbers, and the last entry in our inode will point to this new block instead.

![[20231204115224.png]]

If we need even more blocks, we can add another field—indirect—in our inode that points to a block, and each entry in this block points to blocks that store block numbers. And if we need even more, we can have a trebly indirect that does this with one more hierarchy layer. This is as big as a file can get (for ext2); this structure has an upper bound on the file size, but it's way more than we probably ever need.

![[20231204115615.png]]

With this setup, we store all information for a file close to each other, and we also don't store anything for unused blocks. Thus, we only need to store the inodes of the open files in memory, which is much smaller than a whole [[🍩 FAT]].

Note that with inodes, our directory files will store the inode number for each file instead of the first block number.