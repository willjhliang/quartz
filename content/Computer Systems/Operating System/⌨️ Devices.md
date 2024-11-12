The [[⚙️ Operating System]] can read and write to devices like keyboards, files, displays, and networks. All of these devices provide different functionality and are used in many different ways; in order for the OS to support them all, we need a common layer of abstraction.

# Driver
This layer is called the driver: a piece of software that defines the device interface. To interact with devices, the OS treats them like files and uses the [[🗄️ File System]]. This lets us name devices, track I/O requests, and manage devices easily.

# I/O Controller
For devices that have hardware, we also need something to translate between hardware and software. The I/O controller acts as this translator, bridging the CPU (digital signals) and driver to the device (analog signals).

The controller abstracts the device into registers for control, status, and data. For example, a CPU reading data would check the status register to see if anything's available, and the it reads from the data register.

To perform these low-level instructions, we commonly use memory-mapped I/O, where each register is associated with a memory address, and we can reuse low-level instructions for memory to interact with the registers. No actual memory access is performed, but it enables a convenient way of manipulating the registers (as opposed to designing new instructions).

# Co-Processors
We need to perform some computations with I/O; for example, if we're waiting for data to appear in the register, we need to check that it's there and then unblock whatever process was waiting for it.

Instead of the CPU doing all this work, we have specialized co-processors that performs computations to support the CPU; they're usually used for GPUs, network cards, etc. Most co-processes have direct memory access (DMA), so they can independently manipulate memory. This conveniently allows them to read and write I/O requests to memory, freeing the CPU to execute other tasks without need to fetch information for the co-processor.