The scheduler is a part of the [[⚙️ Operating System]] kernel that decides which process to run. It makes a decision whenever a process starts (arrives but not executing), finishes, blocks (waiting on something), or has run for a certain amount of time.

Scheduling is crucial to maintain the illusion of multiprocessing, and scheduling algorithms must consider many factors:
1. Fairness: every program needs to run.
2. Liveness: "something" will eventually happen.
3. Throughput: amount of work completed over time.
4. Wait time: average time a task is "alive" but not running.
5. Turnaround time: time between task ready and completing.
6. Response time: time between task ready and taking user input.

The goal of the scheduler is to minimize wait time and latency while maximizing throughput and fairness.

# Scheduling Algorithms
Scheduling algorithms can either be non-preemptive (continue running thread until completion) or preemptive (interrupt thread after some condition).

## Non-Preemptive
1. FCFS (first come first serve): maintain queue of ready threads, run in order of arrival.