Left and right shifts are often used for fast multiplication/division (by 2) and bit manipulation. Since they can be done so quickly in hardware, compliers will perform *strength reduction* to optimize code to take advantage of shifts.

Note that there are two types of right shifts:
1. Logical right shift puts 0 in the MSB.
2. Arithmetic right shift puts whatever the original MSB is. This preserves the sign of the integer value.

A simple shifter that moves by a constant $C$ bits can be implemented using just wires, but this is slow if we want to shift by $N$ bits (since we would need to run a 1-bit simple shifter $N$ times).

# Barrel Shifter
The barrel shifter provides a faster way to shift by $N$ bits. We create multiple simple shifters with $C = 1, 2, 4, \ldots$. Then, we use muxes to select the shifters that have bit $1$ in $N$, effectively shifting by the powers of 2 that make up $N$.