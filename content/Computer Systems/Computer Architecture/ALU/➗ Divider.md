In elementary school, we learned long division. Binary division hardware performs the same algorithm, except in base 2. The algorithm is as follows:
1. Given the dividend $x$ and divisor $y$, we'll calculate the quotient $x/y$ and remainder $x \bmod y$.
2. First, shift the divisor left until the MSB lines up with the dividend's.
3. Repeat until the remainder is less than divisor:
	1. Find the largest $q$ such that $q * \text{divisor} < \text{dividend}$. If we're doing this in binary, $q$ is either 0 and 1, thus simplifying this to checking whether the divisor is less than the dividend (by subtraction).
	2. Set the LSB of the quotient to $q$.
	3. Subtract $q * \text{divisor}$ from dividend.
	4. Shift quotient left by 1, and shift divisor right by 1.

The code form of this algorithm is below:
```
remainder = 0;
quotient = 0;
for (int i = 0; i < 32; i++) {
	remainder = (remainder << 1) | ((dividend >> 31) & 1);
	if (remainder >= divisor) {
		quotient = (quotient << 1) | 1;
		remainder = remainder - divisor;
	} else {
		quotient = (quotient << 1) | 0;
	}
	dividend = dividend << 1;
}
```

These steps can be performed in hardware, either sequentially (one iteration per clock cycle) or combinationally ("unrolling" the loop with more hardware).