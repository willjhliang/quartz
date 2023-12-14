An operating system (OS) is a layer of abstraction between software and hardware in a computer. Its primary job is to manage [[💼 Process]]es on the system, ensuring that they're isolated from each other and providing an *illusion* of exclusive access to the processor. It also protects the system by serving as a middle-man between the running process (which can be malicious) and the hardware.

# Kernel
The kernel of an OS is the memory-resident OS code that's used for important functions such as context switching, running the [[🗓️ Scheduler]], and handling [[⏰ Interrupt]]s.

# Multiprocessing
In a basic hardware system, a single CPU reads and executes instructions sequentially (known as control flow). Thus, we cannot run multiple programs at once.

However, multiprocessing gives the illusion of multiple simultaneously-running programs by interleaving the execution of the programs. These processes are called "concurrent"—control flows overlapping in time, with one flow running at any specific moment. Note that this is slightly different from parallel processes, where there can be multiple flows running at the same moment in time (requiring multiple processors).

# Control Flow
Control flow is the sequence of instructions a processor executes. Individual programs can control the flow with jumps, branches, calls, and returns, but they only respond to program state. Changes to the system state—I/O, timers, networking, and more—also change the control flow, either with [[⏰ Interrupt]]s, context switches, or [[🗼 Signal]]s.

## Context Switch
A context switch passes control from one process to another. Each time this happens, user code stops, kernel code responsible for the context switch runs, and then another user code runs.