A process is an instance of a program that is being executed by the [[⚙️ Operating Systems]]. Each process has its own memory (code, heap, stack), registers, and other resources.

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

# Fork
Processes are created from forking another process (via the `fork()` function). Whenever this happens, both parent and (newly created) child continue running the same code, but they run different branches depending on the `fork()` output (`child_pid` for the parent, `0` for the child). The child receives a cloned version of the parent's memory, making it entirely separate.

# Process Groups
Processes are associated together in groups, which allows us to manage multiple processes at once. For example, [[🚥 Signal]]s can be sent to all processes in a group.