Even though disks are persistent storage, they can still fail. For important information, we need to keep backups; RAID (redundant array of independent disks) is one such solution. Another benefit of RAID is improved performance; since we have multiple disks, we can perform operations in parallel.

In RAID, we have multiple disks that work together as one logical unit. The [[🗄️ File System]] interacts with the RAID controller with the normal disk interface, and the controller figures out how to store information to ensure redundancy and performance.

# Striping
Striping is the idea of organizing consecutive chunks of data across disks to improve performance. Then, when a read or write request comes, we can split the work across all disks, increasing speed.

# XOR
The exclusive or (XOR) of two bits is 0 if the bits are the same and 1 otherwise. Applying this to multiple bits, the result is 1 if there's an odd number of 1 inputs. Thus, XOR gives us the parity of the input.

Most crucially, if we have $N$ numbers and the XOR result of these numbers, we can recover one of the numbers from the $N - 1$ numbers and XOR result just by checking parity. This is used for data redundancy below.

# RAID Levels
RAID has many variations (levels) that split data across disks differently.
1. Level 0: apply block-level striping so a file with multiple blocks is stored in multiple drives. Read and write requests can be handled by both disks in parallel, resulting in higher throughput. However, if one disk fails, our data is corrupted.
2. Level 1: same as RAID 0, but each drive has a duplicate backup. This guards against data loss, but we need twice as much space, and our access speed is the slowest of the disks.
3. Level 2: uses bit-level striping with some bits used for error detection. This is parallel and has redundancy, but it requires disks to be synchronized for writes. (This also hasn't been used since 2014.)
4. Level 3: like RAID 2 but with byte-level striping. This reduces overhead and has good sequential reads and writes.
5. Level 4: like RAID 0, but we have another disk that stores disk parity using XOR. Thus, if one fails, we can recalculate it. However, each write will also write to the parity disk, so write requests aren't parallelized.
6. Level 5: same as RAID 4, but we distribute the parity across different disks, enabling write parallelism.