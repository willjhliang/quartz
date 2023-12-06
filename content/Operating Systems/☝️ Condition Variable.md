Condition variables are a [[🚥 Synchronization]] method that allows a thread to wait until it's notified to resume. Used in conjunction with a [[🔒 Mutex]], the condition variable can put a thread to sleep and wait until some condition is fulfilled.

Specifically, the locking flow is as follows:
1. Thread acquires a lock, enters a critical section.
2. Some condition is unfulfilled. Thread uses the condition variable to wait, and it also gives up the lock in the meantime.
3. Sometime later, condition is fulfilled and thread receives a signal broadcast. Thread wakes up and tries to re-acquire the lock. If it's unsuccessful, it blocks as normal.
4. After re-acquiring the lock, thread finishes the rest of the critical section and unlocks.

This is commonly used to avoid busy waits, such as in the [[🏓 Concurrency#Producer-Consumer]] problem.