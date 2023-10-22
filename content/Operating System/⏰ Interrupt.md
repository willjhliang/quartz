An interrupt transfers control from some running program to the [[⚙️ Operating System]] kernel in response to some event. Some examples include arithmetic overflow, page fault, or I/O.

Each event is stored in a table as some unique identifier. Each identifier is associated with a function handler, which executes code that deals with the event.

# Asynchronous Interrupts
Asynchronous interrupts are caused by events external to the processor, for example a timer or I/O from keyboard, network, or disk. After running the handler, the control flow returns to the instruction pre-interrupt.

# Synchronous Interrupts
Synchronous interrupts are caused by executing an instruction.
1. Traps are intentional commands primarily used for system calls.
2. Faults are unintentional but possibly recoverable cases, such as page faults and floating point exceptions.
3. Aborts are unintentional and aborts the program. Examples include illegal instruction, parity error, or machine check.