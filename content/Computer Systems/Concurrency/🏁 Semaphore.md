A semaphore is an object with integer value and two operations:
1. P: if value is greater than 0, decrement it; otherwise, wait until it increases above 0, then decrement it.
2. V: Increment the value.

This object is commonly used to ensure [[🚥 Synchronization]] of multiple concurrent threads via the wait part of P. Note that if we limit the value to be either 0 or 1, we get the [[🔒 Lock]].

# Implementation
Note that the implementation below doesn't strictly follow the definition of value above, but it's simpler since we always decrement (instead of potentially waiting) during P.
```c
struct {
    int value;
    queue *Q;
    int lock;  // For TSL
} sem_t;

void sem_wait(sem_t *sem) {
	while (TSL(sem->lock)) {
	    yield();  // Let other threads run
	}
	sem->value--;
	if (sem->value < 0) {
		sem->Q->add(this_thread);
		mark_blocked();  // Stop this thread afterwards
	}
	lock = 0;
}

void sem_post(sem_t *sem) {
	while (TSL(sem->lock)) {
	    yield();  // Let other threads run
	}
	sem->value++;
	if (sem->value <= 0) {
		thread t = sem->Q->get();
		mark_ready(t);
	}
	lock = 0;
}
```