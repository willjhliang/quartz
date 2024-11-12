Digital logic is about the low-level manipulation of signals through basic logical operations; by building them up, we can perform complex tasks.

On the lowest level, digital logic consists of transistors (MOSFETs), which act like an electrical switch: source and drain are connected only when voltage is applied to the gate. Specifically, there are two types:
1. N-transistors: conducts when gate voltage is 1, good at passing 0s.
2. P-transistors: conducts when gate voltage is 0, good at passing 1s.

Using N-transistors and P-transistors, we can build CMOS circuits that form boolean logic gates. The basic gates are `NOT`, `NAND`, `NOR`, `AND`, `OR`, and `XOR`.

There are two types of logic:
1. Combinational logic is logic without state variables (and clocks). Examples include adders, multiplexers, decoders, and encoders.
2. Sequential logic is logic with state variables, thus requiring a clock to keep the circuit in sync. Examples include latches, flip-flops, registers, and memories.

We can think of a processor as a complex state machine, with combinational blocks separating storage elements. A clock acts as a global write-enable signal for storage, commanding all state elements to write together, moving values in lock-step.