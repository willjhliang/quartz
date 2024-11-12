Concurrency is the idea that multiple tasks can be executed at once—interleaving executing [[🧶 Thread]]s to give that impression that a program to doing thing. To avoid unexpected behavior, we need [[🚥 Synchronization]], usually with [[🔒 Lock]]es or [[🏁 Semaphore]]s.

Across different systems, there are some common concurrency design patterns.

# Producer-Consumer
We have producer and consumers threads; the former creates data and adds it to a shared data structure (such as a queue), and the latter removes one item from the shared structure and processes it.

The key problem here is that we need to avoid two threads from manipulating the data structure at the same time. Both producers and consumers need to lock the shared data structure when using it.

## Mutex with Condition Variable
There will be situations where the shared data structure is empty, and the consumer has nothing to do but to keep checking it. To avoid busy loops, we can use [[☝️ Condition Variable]]s to wait until the data structure is updated. Some pseudo-code for the producer and consumer are below:
```c
void consumer() {
	while (1) {
		acquire_lock();
		while (q.empty()) {
			cond_wait();
		}
		
		data = q.pop();
		release_lock();
	}
}

void producer() {
	while (1) {
		acquire_lock();
		q.push(data);
		cond_signal();
		release_lock();
	}
}
```

## Semaphores
If the queue has a finite capacity of $N$ items, also need to block the producer when it's full. The mutex with condition variable above works, but we can also use semaphores:
1. `emptyS` initialized to $N$ tracks the number of empty slots.
2. `fullS` initialized to $0$ tracks the number of occupied slots.
3. `mutex` controls access to the queue.

```c
void consumer() {
	while (1) {
		fullS.V();  // Block if queue is empty
		mutex.P();
		data = queue.pop();
		mutex.V();
		emptyS.V();
	}
}

void producer() {
	while (1) {
		emptyS.P();  // Block if queue is full
		mutex.P();
		queue.push(data);
		mutex.V();
		fullS.V();
	}
}
```

# Reader-Writer
We have reader and writer threads that access shared data. While multiple readers can safety read the data at the same time, we can only have one writer at a time; during a write, nothing else can access the data.

## Mutex with Condition Variable
We have one lock, but we'll have two ways to acquire it—one for reader, one for writer.
1. For reader, we'll acquire the lock, then wait until there's no writer active and there's no writer waiting. Afterwards, we're safe to read.
2. For writer, we'll acquire the lock, then wait while there's another active writer or any active readers. Afterwards, we're safe to write.

When releasing the lock, both readers and writers broadcast a signal to wake up other sleeping threads.

There are some pitfalls regarding liveness to watch out for:
1. If readers always wait until there are no writers, readers can starve if we keep having new writers. Similarly, if writers wait until there are no readers, writers can starve if we keep having new readers.
2. We can't guarantee that a specific thread will run after a signal. If we have multiple threads waiting, it's possible that one thread will just be unlucky and never run.

## Mutex without Condition Variable
We can use a mutex `rw` that's needed before accessing the shared data. To allow multiple readers, we'll let only the first reader lock the mutex. We can track the number of active readers in an integer and use another mutex `mutex` to protect the counter.

```c
void writer() {
	while (1) {
		rw.P();
		buffer.write();
		rw.V();
	}
}

void reader() {
	while (1) {
		mutex.P();
		readcount++;
		if (readcount == 1)
			rw.P();
		mutex.V();
		buffer.read();
		mutex.P();
		readcount--;
		if (readcount == 0)
			rw.V();
		mutex.V();
	}
}
```

# Dining Philosophers
We have multiple philosophers sitting around a table, and between every two philosophers is one chopstick. For a philosopher to eat, they must acquire the chopsticks on both sides; however, the philosophers on their sides are also trying to acquire the chopstick between them.

In this setup, we want to allow all philosophers to take turns eating—without encountering [[💀 Deadlock]]s or starvation.
1. In the naive solution where each philosopher tries to acquire the left chopstick, then the right, it's possible for all of them to lock their left chopstick, resulting in a deadlock.
2. We can instead have a global lock on the "right to pick up chopsticks." Philosophers take turns trying to acquire both chopsticks and only hold them if both succeed. This prevents deadlocks, but it's still susceptible to starvation.
3. Alternatively, philosophers can just try to get a chopstick, and if they can't eat, they release the lock and wait a bit before trying again. This again avoids deadlock but doesn't guard starvation.
4. A simpler method is for philosophers to alternate their pick-up order: even-numbered ones grab the left chopstick first, and odd-numbered ones grab the right first. This avoids deadlock, but starvation is still possible.
5. Have a lock manager, forcing the philosophers to ask the manager for a lock. This impacts scalability.
6. Enforce a hierarchy by numbering the chopsticks, then require each philosopher to pick up the chopstick with lower number first. This is similar to the disrupted pick-up order approach above.
7. Chandy/Misra solution: chopsticks start off dirty, and once philosopher eats, chopsticks are dirty. When a philosopher needs a chopstick they can't get, ask neighbor: if it's dirty, clean it and give it up; otherwise, keep it (and defer the request).

A simpler solution could be to add a timeout to lock requests, thereby allowing philosophers to "abort and retry" after a while. While this prevents deadlocks, introduces another issue: livelocks, whether the philosophers can abort and retry in lockstep.

# Sleeping Barber
We have a barbershop with one barber and multiple customers. When the barber is finished with a customer, they go to the waiting area and find another customer; if none are there, they go to their chair and sleep. If a customer arrives and the barber is sleeping, the customer wakes them up; otherwise, they just sit down and wait.

The key challenge here is to avoid the case where the customer waits, but the barber finishes before the customer sits down, thereby seeing no sitting customers and going to sleep—deadlock!

## Semaphores
With $N$ free seats, we use the following semaphores:
1. `mutex` protects a counter keeping track of the number of free seats.
2. `sittingCustomer` initialized to $0$ blocks the barber when there's nothing to do.
3. `barberReady` initialized to $0$ blocks the customers when the barber is busy.

```c
void customer() {
	mutex.P();
	if (freeSeats > 0) {
		freeSeats--;
		sittingCustomer.V();
		mutex.V();
		barberReady.P();
		// Have haircut here
	} else {
		mutex.V();
	}
}

void barber() {
	while (1) {
		sittingCustomer.P();
		mutex.P();
		freeSeats++;
		barberReady.V();
		mutex.V();
		// Cut hair here
	}
}
```