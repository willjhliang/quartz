Files are non-volatile storage that is saved even if the computer loses power. These files have names, contents, and metadata. They're organized into directories, which are essentially files that track which other files are inside of it.

The file system in an [[⚙️ Operating System]] provides an interface for [[💼 Process]]es to interact with files.

# Interface
When interacting through the file system, an open file can be thought of as a stream of bytes: the data is a continuous sequence, and as we read the data, we move a pointer to the next byte. When we open a file, the pointer is set to the beginning and can also be manually moved to an offset within the file.

# Organization
While the interface is a seamless stream of bytes from the file, the actual file doesn't have to be stored in a continuous section of the disk. Since their size can change anytime, we need a more robust method that allows files to grow and shrink easily and quickly.

The file system organizes the disk into blocks, which are a fixed-size continuous chunk of bytes. When we interface with hardware, we interact with blocks rather than individual bytes, and to store files on disk, we break it up to fit into multiple blocks.

## Directories
First, we need to track which blocks a file's data is stored in. To do this, we can store the file's information in an entry in its directory file. The entry contains information like filename, block number (of the start of its data), permissions, and more. All systems have a root directory that's fixed to the start of the data region of the disk, and starting from there, we can find all files on disk.

Note that directories are just files, so they will grow and shrink just like a normal file. Subdirectories can also be implemented as a file that belongs to its parent directory.

## Allocation
To choose where the files are stored on hardware, we need an allocation scheme.
1. Continuous allocation is the naive method that arranges files into blocks one-by-one. While this is quick and simple, it causes fragmentation after deletion and makes it difficult to extend files.
2. Linked list allocation is similar to [[🍰 Memory Allocation]] with the free list. Each file remembers its first block number, and then each physical block has a pointer to the next block of its file, if it exists.

However, linked list allocation suffers from slow sequential access and random access since we need to seek to every new block of a file. Previously, the [[🍩 FAT]] was used to speed up random access; more recently, we use [[ℹ️ Inode]]s.