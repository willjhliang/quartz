Threads are sequential execution streams within a [[💼 Process]]. In most [[⚙️ Operating Systems]]s, threads are the unit of scheduling.

While each process has its own address space, resources, and security, each thread has its own stack, stack pointer, program counter, and registers—*but shared address space*. Thus, threads see the same heap and globals and can communicate via this memory.

Usually, parallelism with threads is much faster than with processes (less overhead), and it can be especially helpful to share information via the shared address space. Moreover, with multiple CPUs/cores, threads can run completely in parallel.

# Thread Scheduling
Threads are created at the kernel-level (1:1) by default, and it will be scheduled by the kernel. For greater control, we can instead create user-level (N:1) threads that aren't seen by the kernel; the kernel just sees our entire program as "one thread," and we need to schedule our user-level threads manually.

There are two ways to switch between threads:
1. Preemption: a thread is interrupted and replaced with another.
2. Cooperation: a thread willingly gives up execution to another thread.