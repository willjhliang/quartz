Memory is a way to store and load state—similar to registers, but on a larger scale. The two common memory technologies are:
1. Static RAM (SRAM): 6 transistors per bit, optimized for speed.
2. Dynamic RAM (DRAM): 1 transistor and 1 capacitor per bit, optimized for density.

Our [[🧠 CPU]] depends on main memory (DRAM) to run instructions; thus, it's only as fast as memory. However, modern memory latency is much more than execution latency, creating a bottleneck. The solution to this is a hierarchy of [[💵 Hardware Cache]]s (SRAM).

Note that memory is volatile, meaning it is lost when it loses power. Forms of non-volatile storage include magnetic disk and flash.
