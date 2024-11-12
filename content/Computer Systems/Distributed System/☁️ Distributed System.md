A distributed system is a collection of independent machines that appears, on the outside, as a single unified system. These machines, called nodes, are connected by a network and interact by sending messages. By joining them together, distributed systems can do much more than a single machine.

# Group Communication
To coordinate nodes, we need some way to communicate with multiple of them at once:
1. Broadcast: the host process communicates with every process at the same time.
2. [[👨‍👩‍👧‍👦 Multicast]]: the host communicates with a designated group of processes at the same time.
3. Unicast: the host process communicates with a single process, though the process may pass the information to others afterwards.