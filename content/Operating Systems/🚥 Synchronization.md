Each [[🧶 Thread]] performs some task, and our [[🗓️ Scheduler]] is responsible for deciding which thread to run at any given time. If we have multiple threads working on some shared resource (usually memory), we need to be careful about data races—different threads accessing the same location where at least one is writing. When this happens, the result can be unpredictable.

# Increment Data Race
As a classic example, consider two threads trying to increment the same variable. The increment operation actually consists of three instructions, something like:
```
LOAD sum into R0
ADD r0 r0 #1
STORE R0 into sum
```

If we context switch between the two threads in the middle of running these three instructions, we get unexpected behavior. For example:
```
Thread 0						Thread 1
-----------------------------------------------------------------
LOAD sum into R0
								LOAD sum into R0
								ADD r0 r0 #1
								STORE R0 into sum
ADD r0 r0 #1
STORE R0 into sum
```

Both `R0` registers will read the `sum` in and write `sum + 1` out; thus, instead of incrementing twice, our result is only incremented once.

# Synchronization
To prevent concurrent threads from interfering with each other, we need to coordinate them. Our goals are to ensure that only one thread acts on a shared resource (during the critical section) at any time, and we also want to ensure that all threads are eventually allowed to access the resource.

There are three main solutions:
1. We can naively disable interrupts, preventing threads from being interrupted in the first place. Obviously, this is overkill and stops unrelated threads as well.
2. Peterson's algorithm forces a thread to busy wait while another thread is accessing some resource. However, it assumes atomic operations and a specific execution order, which might be affected by the compiler or processor (if they decide it won't affect function semantics).
3. [[🔒 Mutex]] locks before the critical section and unlocks after. When a thread tries to acquire a lock, it'll block if the lock is already in use. This is the most common solution. It's also often used with [[☝️ Condition Variable]]s.

On a higher level, some systems associate shared objects with monitors; the monitor, consisting of a mutex and condition variable, enforces that one thread can access the object at a time.