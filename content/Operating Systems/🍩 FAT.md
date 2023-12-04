The file allocation table (FAT) is a table in memory that stores the next-block pointers. It's also saved in the beginning of the disk to ensure persistence.

![[20231204113000.png|400]]

The table is essentially a map from physical block numbers to the next block number of the file. Since this is stored in memory, we can speed up random access by moving through the table before ever seeking the disk. However, it doesn't help with sequential access, and it also takes up a significant chunk of memory since we need one entry per hardware block.

# Metadata
The first entry in the fat `FAT[0]` holds metadata and doesn't correspond to a data block. The MSB is the number of blocks in the FAT, and LSB is an integer indicating the block size.

# Special Values
In the fat, each entry can either be a next-block number, 0 to indicate a free block, and -1 to indicate the end of the file (last block).

Note that as designed in the [[🗄️ File System]], the first data entry in the fat `FAT[1]` is the first block of the root directory.