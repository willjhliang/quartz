Kernel density estimation constructs an estimate of a distribution $p(x)$ given only samples $S = \{ x^{(1)}, \ldots, x^{(n)} \}$. We essentially make a smoothed-out histogram of the samples using a kernel. Formally, our estimate 
$$
\hat{p}(x) = \frac{1}{n}\sum_{x^{(i)} \in S} k\left(\frac{x - x^{(i)}}{\sigma}\right)
$$
 where $\sigma$ is a bandwidth parameter that controls how smooth our estimate is. For our estimate to be a valid, the function $k$ chosen as our kernel must satisfy the following:
1. Normalization: $\int_{-\infty}^{\infty} k(u) du = 1$.
2. Symmetry: $k(u) = k(-u)$.