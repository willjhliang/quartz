Physical memory can be thought of as a big array that the processor can address into. However, there are two problems with directly using it as is:
1. Addressable memory—the total amount of memory that can theoretically be accessed—is huge (based on address space and addressability), exponentially bigger than the actual physical memory. (Address space is number of addresses, addressability is size, in bytes, of each address.)
2. Multiple processes need to store things in memory, and they need to be isolated.

Instead, we abstract away physical memory with a layer of indirection: virtual memory. This virtual memory will give the illusion of huge address spaces specific to each process while fitting the constraints of our hardware. To do this, we observe that data in virtual memory can either be stored in physical memory or disk; we really only need data used by running processes to be stored in physical memory (RAM).

![[20231019151243.png#invert|300]]

Thus, programs don't know about physical addresses: they only use virtual addresses, which are translated into physical addresses by the memory management unit (MMU).

# Pages
Virtual memory is organized into units called pages; each page is a fixed size, usually 4 KB (4096 bytes). Pages currently in use are stored in RAM, and pages not in use are stored on disk.

Similarly, physical memory is divided into page frames, which each frame being the same size as one virtual page. Pages stored in physical memory are each assigned a frame. This information is all tracked in the [[📄 Page Table]].

# Page Replacement
We don't have enough space to store all virtual pages in physical memory, so when physical memory gets full and we need to load a page, we need to replace another page and save it to the swap file on disk. To choose which page to evict, we follow a replacement policy.
1. FIFO: evict the page that was been in memory the longest (first in).
2. LRU: evict the page that has had the longest time since it was last used. Implementing this is tricky, but a common approximation is to set reference bit during page access and track it throughout set time intervals.
3. Second chance: like FIFO, but if the reference bit is set, we move the entry to the end of the queue.

Note that the optimal policy is to replace the page that's furthest away from being used. This requires future information, making it impossible to implement, but it's a good benchmark to compare against replacement policies.

## Belady's Anomaly
Sometimes, increasing the number of page frames results in a increase in page faults. This can be shown in case-specific accesses, and we can minimize this using stack-based algorithms like LIFO and LRU.

## Thrashing
When too much memory is used, we might constantly have page faults. This can be caused by too many concurrent processes running; then, the benefits of multiprocessing start to get outweighed by the decreased speed of memory access.

# Address Translation
Virtual memory breaks down memory into pages, but in most machines, every byte has its own address. Thus, there are many addresses on a single page.

For a page size of 4 KB, we have 4096 (0x1000) addresses corresponding to this page. To specify a byte on this page, we thus need 12 bits—known as the page offset. The rest of the bits in our address is the virtual page number, which defines which virtual page to access. In other words, the virtual page number determines which page, and the page offset determines where in the page.

Specifically, the virtual address is constructed as the concatenation of the virtual page number and the page offset. To translate a virtual address to a physical one, we perform the following steps:
1. Derive the virtual page number from the address (get the first $n$ bits).
2. Get the physical page number from the page table.
3. Construct the physical address by concatenating the page offset to the physical page number.
