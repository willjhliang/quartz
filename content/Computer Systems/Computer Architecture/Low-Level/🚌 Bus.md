A bus is a communication system that transfers data between components in a computer. It consists of both hardware (wires) and software (protocol). Buses are used internally to connect individual components (for example, CPU to memory) and externally to other devices.

A bus typically consists of three signal line types:
1. Data bus: exchange data.
2. Address bus: select which peripheral or register of a peripheral.
3. Control signals: synchronize and identify transactions, as part of the protocol.

Using these signals, a bus operation looks like:
1. Manager sends desired address on address bus and sets control signals. Then waits for response.
2. Subordinate sends back data on data bus and control signals.
3. Manager reads data, starts another communication cycle.

To avoid waiting, one common design is valid-ready:
1. The sender sets a VALID signal when it's sending a message.
2. The recipient sets a READY signal when it's ready to receive.
3. Data is only sent when both VALID and READY are set, otherwise both sides can do other work.

# AXI
One example protocol is AXI, which is part of the AMBA bus family and used by Arm. Its components include:
1. Manager: the component that initiates transactions.
2. Subordinate: the component that receives transactions.
3. Interconnect: a component that connects managers with subordinates.

The AXI protocol is burst-based and uses the following independent transaction channels:
1. Read address (AR): the address to read.
2. Read data (R): the data that was read.
3. Write address (AW): the address to write to.
4. Write data (W): the data to write.
5. Write response (B): the result of writing.

To read, the manager sends AR and the subordinate responds with R. To write, the manager sends AW and W, and the subordinates responds with B. Each of these channels use valid-ready to communicate.

![[20240514004650.png#invert]]

For futher coordination, each AXI component has clock (ACLK) and reset (ARESETn) signals. Input signals are sampled on the rising clock edge, and output signal changes must occur after the rising edge.