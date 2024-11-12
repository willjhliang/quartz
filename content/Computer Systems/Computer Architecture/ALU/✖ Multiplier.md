In elementary school, we learned to decompose multiplication into simple multiplication and additions. The algorithm is as follows:
1. Given the multiplicand $x$ and multiplier $y$, we'll calculate the product $xy$.
2. Start with product $0$, repeat for each multiplier digit:
	1. Multiply multiplicand by LSB of multiplier, add to product. With binary, this amounts to deciding whether we add the multiplicand or not.
	2. Shift multiplicand left by 1, multiplier right by 1.

The code for this algorithm is below:
```
int pd = 0;
for (int i = 0; i < 16 && mr != 0; i++) {
	if (mr & 1)
		pd = pd + md;
	md = md << 1;
	mr = mr >> 1;
}
```

We can sequentially perform these operations in hardware, but this is very slow. Observing that this amounts to a bunch of additions, we can instead perform them combinationally and somewhat in parallel within a tree structure.

# Carry Save Addition
We can speed up this operation even more with a trick that applies when we need to do a lot of additions. The insight is that addition can be decomposed into two partials:
1. Partial sums: sums without carries.
2. Partial carries: carries without sums.

As we've seen in [[➕ Adder#Ripple-Carry Adder]], the main source of delay in addition is the carry. Computing the partial sums and partial carries can be done completely in parallel, and then summing them together requires carrying.

Building on this idea, we have a faster way to add *three* numbers: use a [[➕ Adder#Full Adder]] to add all three numbers at once (third number goes in carry-in), then add the partial sums and carries using a [[➕ Adder#Carry-Lookahead Adder]]. This allows us to perform the full adder computation entirely in parallel, then perform a normal addition afterwards. Compared to two normal additions—that both need carries—the carry save addition (CSA) is much faster.

# CSA Tree Multiplier
For multiplication, we can then repeat the first stage of CSA (3-to-2 parallel full adders) in a tree structure until we get to two final numbers, which we can finally add with [[➕ Adder#Carry-Select Adder]]. For $M$ numbers of $N$-bits each, this gives us the delay $O(\log M + \log N)$.