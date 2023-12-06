Concurrency is the idea that multiple tasks can be executed at once—interleaving executing [[🧶 Thread]]s to give that impression that a program to doing thing. To avoid unexpected behavior, we need [[🚥 Synchronization]], usually with [[🔒 Mutex]]es.

Across different systems, there are some common concurrency design patterns.

# Producer-Consumer
We have producer and consumers threads; the former creates data and adds it to a shared data structure (such as a queue), and the latter removes the data from the shared structure and processes it.

The key problem here is that we need to avoid two threads from manipulating the data structure at the same time. Both producers and consumers need to lock the shared data structure when using it.

There will be situations where the shared data structure is empty, and the consumer has nothing to do but to keep checking it. To avoid busy loops, we can use [[☝️ Condition Variable]]s to wait until the data structure is updated. Some pseudo-code for the producer and consumer are below:
```
void consumer() {
	while (1) {
		acquire_lock()
		while (q.empty()) {
			cond_wait()
		}
		
		data = q.pop()
		release_lock()
	}
}

void producer() {
	while (1) {
		acquire_lock()
		q.push(data)
		cond_signal()
		release_lock()
	}
}
```

# Reader-Writer
We have reader and writer threads that access shared data. While multiple readers can safety read the data at the same time, we can only have one writer at a time; during a write, nothing else can access the data.

We have one lock, but we'll have two ways to acquire it—one for reader, one for writer.
1. For reader, we'll acquire the lock, then wait until there's no writer active and there's no writer waiting. Afterwards, we're safe to read.
2. For writer, we'll acquire the lock, then wait while there's another active writer or any active readers. Afterwards, we're safe to write.

When releasing the lock, both readers and writers broadcast a signal to wake up other sleeping threads.

There are some pitfalls regarding liveness to watch out for:
1. If readers always wait until there are no writers, readers can starve if we keep having new writers. Similarly, if writers wait until there are no readers, writers can starve if we keep having new readers.
2. We can't guarantee that a specific thread will run after a signal. If we have multiple threads waiting, it's possible that one thread will just be unlucky and never run.

# Dining Philosophers
We have multiple philosophers sitting around a table, and between every two philosophers is one chopstick. For a philosopher to eat, they must acquire the chopsticks on both sides; however, the philosophers on their sides are also trying to acquire the chopstick between them.

In this setup, we want to allow all philosophers to take turns eating—without encountering [[💀 Deadlock]]s or starvation.
1. In the naive solution where each philosopher tries to acquire the left chopstick, then the right, it's possible for all of them to lock their left chopstick, resulting in a deadlock.
2. We can instead have a global lock on the "right to pick up chopsticks." Philosophers take turns trying to acquire both chopsticks and only hold them if both succeed. This prevents deadlocks, but it's still susceptible to starvation.
3. Alternatively, philosophers can just try to get a chopstick, and if they can't eat, they release the lock and wait a bit before trying again. This again avoids deadlock but doesn't guard starvation.
4. A simpler method is for philosophers to alternate their pick-up order: even-numbered ones grab the left chopstick first, and odd-numbered ones grab the right first. This avoids deadlock, but starvation is still possible.