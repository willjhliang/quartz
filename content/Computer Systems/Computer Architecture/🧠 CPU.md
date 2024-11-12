The central processing unit (CPU) executes instructions and processes data—making it the brain of a computer system.

The CPU's job can be summarized as:
1. Fetch: gets an instruction and translates opcode to control.
2. Datapath: performs the computation based on control.
3. Control: decides which computation to perform, routes data through datapath.

This fetch-decode-execute cycle consists of two component types, combinational and sequential. The former performs stateless computation (ALUs, muxes, logic), and the latter stores state (PC, memories, register file).

We can split the CPU's work into two main parts:
1. The [[🚗 Datapath]] is responsible for executing the instructions by manipulating registers, ALUs, muxes, and memories.
2. The control unit is responsible for coordinating the datapath's execution by fetching and decoding the instructions, then setting the mux selectors and write-enables within the datapath to their correct values.

![[20240513190258.png#invert]]

# Control Unit
We can think of control as a giant table that sets the correct values for mux selectors and write-enables for each instruction in the [[📋 ISA]]. Implementing this is impractical, and real machines use logic gates.