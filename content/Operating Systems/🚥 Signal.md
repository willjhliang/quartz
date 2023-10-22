Signals are sent to a process by the [[⚙️ Operating Systems]] to interrupt the execution—for example, to terminate or to stop the process. The OS can send these signals for a variety of reasons, for example due to user input (`ctrl-C`, `ctrl-Z`) or due to another process' `kill()` call.

Whenever a signal is received, the process runs a handler function that responds to the signal. This interrupts the currently-running code and will return to it after the handler finishes.

# Signal Blocking
Each process contains a signal mask that defines which signals to blocked—temporarily delayed from being delivered until the process unblocks the signal. Note that this is different from ignoring the signal.

Blocking is especially important for critical sections, where concurrent execution will mess up a shared piece of memory. If our process code and handler are working on the same thing, we need to block the signal until the end of our critical section to avoid the handler running concurrently.