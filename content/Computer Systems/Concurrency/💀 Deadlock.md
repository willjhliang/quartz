Deadlocks are cases where a program with [[🏓 Concurrency]] completely stops due to [[🔒 Lock]]es. In the simplest case, if two threads each own a lock and try to acquire each others' locks, neither thread can continue, and we run into a deadlock.

Deadlocks arise from cyclical dependencies on locked resource acquisition. If there's a cycle of waits, no thread can proceed. This happens when four conditions are met:
1. A resource uses mutual exclusion; it must be held exclusively by one thread.
2. Threads are holding a resource and request and wait for another one that's locked.
3. Resources are held until they're explicitly released. There's no preemption by the OS.
4. A circular chain of threads wait for each other.

To avoid deadlocks, we need to prevent all four of the above conditions from occurring at one point in time. In fact, in many cases, deadlocks are so rare or expensive to handle that some systems ignore the possibility of it happening; that is, avoiding it is much more costly than manually recovering when it happens.

Nevertheless, there are other ways to address deadlocks.

# Prevention
To prevent a deadlock from occurring, we either need application-specific insights to write deadlock-free code or we need exhaustive search verification to check for potential deadlocks. The former isn't generalizable, and the latter is too costly for large programs.

# Detection
Instead, we can try to detect a deadlock before it happens and intervene. To do so, we need both a detection algorithm and a way to revert to a safe state if a deadlock is imminent.
1. A common detection algorithm is to treat threads and resources as a resource allocation graph, then check for cycles.
2. To recover, we can force a thread to give up a resource (not safe), rollback to a previous checkpoint of the system, or manually kill a thread (not safe).

# Avoidance
To avoid deadlocks earlier, we can use an avoidance system: threads submit requests for all the resources it will need in advance, and a deadlock detection algorithm checks if there's a potential deadlock.

However, it's usually difficult to know what resources are needed ahead of time, and if we always acquire resources at the very start (instead of when they're actually used), we reduce concurrency.
