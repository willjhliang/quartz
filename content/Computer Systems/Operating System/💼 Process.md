A process is an instance of a program that is being executed by the [[⚙️ Operating System]]. Each process has its own address space (code, static data, heap, stack), registers, and other resources.

# Stack and Heap
The stack contains local variables and information for local functions, all organized in a stack frame for each function call. The heap contains dynamically-allocated data for anything that's required out of scope or whose size is only known during runtime.

The stack grows with each stack frame, but it has a static max size. On the other hand, the heap is allocated from a pool of memory with [[🍰 Memory Allocation]].

# States
A process can be in one of multiple states:
1. Running: process is currently executing instructions.
2. Ready: process is waiting to be scheduled by the kernel.
3. Blocked: process is waiting on some resource.
4. Stopped: process is stopped by the `SIGSTOP` signal and will only resume with `SIGCONT`.
5. Zombie: process is finished but still exists in the process table. (This is done so its parent can check its status even if it's done.)
6. Terminated: after the parent checks a zombie process, the zombie is reaped and completely terminated.

## Process Table
To keep track of all processes that their states, the OS maintains a table of processes, and each process has a process control block (PCB) that contains process id, parent process id, child process ids, process group id, status, and other values.

# Process Creation
Processes are created from forking another process (via the `fork()` function). Whenever this happens, both parent and (newly created) child continue running the same code, but they run different branches depending on the `fork()` output (`child_pid` for the parent, `0` for the child). The child receives a cloned version of the parent's memory, making it entirely separate. For the child to run another program, it calls `exec()`, which replaces its execution with a program specified in a file.

All processes come from a parent, except for the first process (`init/systemd`) which is created by the kernel during boot. 

# Process Groups
Processes are associated together in groups, which allows us to manage multiple processes at once. For example, [[🗼 Signal]]s can be sent to all processes in a group.

# Inter-Process Communication
Some processes work together to accomplish a task, and they need some method to communicate. Some common methods are below:
1. [[🪠 Pipe]]: a one-way FIFO channel (queue) with a read and write end.
2. [[🗼 Signal]]: asynchronous "signals" that cause the target process to run a handler function.
3. Message queue: a richer interface than pipes that store messages with priorities, making sure to always deliver the highest priority message first.