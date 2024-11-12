Threads are sequential execution streams within a [[💼 Process]]. In most [[⚙️ Operating System]]s, threads are the unit of scheduling.

Each process has one or more threads. Different processes have separate address spaces, resources, and security, and the threads within an address share the same address space. Each thread, however, has its own stack, stack pointer, program counter, and registers, allowing it to run its own thread of execution. Due to the shared address space, threads see the same heap and globals and can communicate via this memory. This avoids the overhead and effort of [[💼 Process#Inter-Process Communication]].

Usually, [[🏓 Concurrency]] with threads is much faster than with processes (less overhead, especially from [[⚙️ Operating System#Context Switch]]ing), and it can be especially helpful to share information via the shared address space. Moreover, with multiple CPUs/cores, threads can run completely in parallel.

However, the danger to threads is that if one breaks, the whole process can crash. Due to the shared memory, there's also more potential for bugs and often require [[🚥 Synchronization]].

# Thread Scheduling
Threads are created at the kernel-level (1:1) by default, and it will be scheduled by the kernel. For greater control, we can instead create user-level (N:1) threads that aren't seen by the kernel; the kernel just sees our entire program as "one thread," and we need to schedule our user-level threads manually. The advantage to user-level threads is greater scheduling control and faster context switching and creation; however, if one thread blocks, all others are also blocked.

There are two ways to switch between threads:
1. Preemption: a thread is interrupted and replaced with another.
2. Cooperation: a thread willingly gives up execution to another thread.

# Thread Pool
One common design pattern is the thread pool, which has multiple workers that can do different things in parallel. This way, if one of them blocks, the others can still do work.

Concretely, we have one dispatcher thread and many worker threads. The dispatcher is responsible for figuring out what the workers should do—in a server, for example, it would accept connections and give them to workers.