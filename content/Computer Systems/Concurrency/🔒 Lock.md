A lock (or mutex/mutual exclusion) is a method for ensuring [[🚥 Synchronization]] between [[🧶 Thread]]s that share resources in critical sections. The general structure is as follows:
```
lock.acquire();
// critical section
lock.release();
```

When `acquire()` is called, a thread will own the lock if it's unused or block if the lock is used. Only one thread can acquire a lock at a time, and others will wait until it's finished. Thus, the critical section will be run from start to end by only one thread at any given time.

# TSL
To ensure that lock operations are atomic and can't be interrupted, we implemented them with the TSL (test and set) instruction `TSL R, M`. This instruction is atomic at the hardware level and performs the following:
1. `R` is a register, `M` is a memory location.
2. `R` gets the value of `M`.
3. `M` is set to `1` after setting `R`.

The `acquire()` function essentially uses `TSL` to read a lock value `M`; if it's already `1`, then the lock is held by something else, and we block. In `release()`, we set the lock back to `0` and send a wakeup signal to processes that are blocked by the lock.

# CAS
Another instruction we can use is CAS (compare and swap), which stores a new value to a register if it currently equals a certain value. Using CAS, we implement the lock by trying to store `1` if the value is currently `0`. If this succeeds, we acquired the lock; if it fails, we need to block.

# Test and Test-and-Set
The special atomic lock check is expensive with [[🍎 Multicore#Cache Coherence]]. To avoid the overhead, we first check the lock by using a standard load instruction; if we see that the lock is free, we then use test-and-set to acquire it.

# Memory Barriers
Lastly, to enforce the order of operation execution (since they can be mixed up if they're semantically equivalent), we use memory barriers (fences) to indicate to the CPU and compiler that all memory accesses before the barrier must occur before those that are after the barrier.