Computers represent integers in binary with a finite width of $N$. If we're simply representing unsigned integers, the least significant bit (LSB) is $2^0$, and the most significant bit (MSB) is $2^{N-1}$.

However, with signed integers, we need some way to indicate if the value is negative. Two's complement is a trick that makes certain arithmetic operations valid for both unsigned and signed binary: all bits are $2^i$ as normal, except the MSB is $-2^{N-1}$.

Intuitively, this representation comes from the insight that due to the finite width $N$, we can imagine that overflow or underflow "cycles around." Then, for example with $N = 4$, if we want to compute $0 - 1$, we can imagine the $0$ as cycling around, $0 = 1111 + 1 = 10000$. Using this, we have 
$$
10000 - 1 = 1111.
$$


To negate a number, we have a simple rule: 
$$
-B = B' + 1
$$
 where $B'$ is the flipped bits of $B$. This arises from the equation above, since 
$$
-B = 0 - B = (1111 + 1) - B = (1111 - B) + 1,
$$
 and we notice that $1111 - B$ is the flipped bits $B'$.
 