Each [[🧶 Thread]] performs some task, and our [[🗓️ Scheduler]] is responsible for deciding which thread to run at any given time. If we have multiple threads working on some shared resource (usually memory), we need to be careful about data races—different threads accessing the same location where at least one is writing. When this is happens, in an event called a race condition, the result can be unpredictable.

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

# Mutual Exclusion
To prevent concurrent threads from interfering with each other, we need to coordinate them. Our goals are to ensure that only one thread acts on a shared resource—in the part of code called the critical section—at any time, and we also want to ensure that all threads are eventually allowed to access the resource.

There are several solutions:
1. We can naively disable interrupts, preventing threads from being interrupted in the first place. Obviously, this is overkill and stops unrelated threads as well.
2. Peterson's algorithm forces a thread to busy wait while another thread is accessing some resource. However, it assumes atomic operations and a specific execution order, which might be affected by the compiler or processor (if they decide it won't affect function semantics).
3. Lamport's Bakery algorithm works with $n$ threads: each thread picks a number higher than the number of waiting threads and busy waits until they're done.
4. Special instructions like TSL and CAS can perform atomic operations that allow us to check for other concurrent threads. TSL atomically writes `1` to the memory location and returns the old value. CAS atomically compares the memory location with a value and sets it to a new value if they're the same.
5. [[🔒 Lock]] locks before the critical section and unlocks after. When a thread tries to acquire a lock, it'll block if the lock is already in use. This is the most common solution. It's also often used with [[☝️ Condition Variable]]s.
6. [[🏁 Semaphore]]s let a certain number of threads run concurrently by internally tracking an integer state.

## Monitor
On a higher level, some systems associate shared objects with monitors, which are built-in features of a language that protects functions of a class. Each instance of the class has its own lock, and the protected functions must acquire the lock before running. However, this gives us less fine-grained control over the lock, and a blocked protected function waiting on some condition would be deadlock; to avoid this, we need to use condition variables.

When a monitor uses a condition variable's signal, a thread is woken up; then, if they're using the same lock, who gets it?
1. Hoare monitor: signaler yields monitor lock to the released thread, guaranteeing that the released thread's condition is true.
2. Mesa monitor: signaler continues to hold the lock, released thread waits again and can't guarantee that the condition is true. Though this is less "clean," it can be more efficient and is used by most systems.

One example of a Hoare monitor is as follows, with the producer-consumer problem:
```c
monitor PC {
	Buffer buffer;
	condition can_insert, can_remove;
	int count;

	void insert(int item) {
		if (count == N)
			can_insert.wait();
		buffer.add(item);
		count++;
		if (count == 1)
			can_remove.signal();
	}

	int remove() {
		if (count == 0)
			can_remove.wait();
		int item = buffer.get();
		count--;
		if (count == N-1)
			canInsert.signal();
	}
}
```