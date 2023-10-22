Optimization and inference often require computing intractable sums or integrals, sometimes due to expectations. If they have an infeasible or exponential number of terms, we approximate them instead with Monte Carlo sampling.

The core idea is to view the sum or integral as an expectation over some distribution: $$s = \mathbb{E}_p[f(x)] = \begin{cases}\sum_x p(x)f(x) & \text{if $x$ is discrete} \\ \int_x p(x)f(x)dx & \text{if $x$ is continuous}\end{cases}$$

We can approximate this expectation by drawing samples $x^{(i)}$ from $p$ and computing the empirical average, $$\mathbb{E}_p[f(x)] \approx \hat{s}_n = \frac{1}{n}\sum_{i=1}^nf(x^{(i)}).$$

> [!note]
> We use the empirical average since it's unbiased and, by the law of large numbers, converges to the actual value $s$ as $n$ goes to infinity.

We can also calculate the variance of our estimate, $$\mathbb{V}[\hat{s}_n] = \frac{1}{n^2} \sum_{i=1}^n \mathbb{V}[f(x)] = \frac{\mathbb{V}[f(x)]}{n}.$$ Our empirical average thus follows a normal distribution with mean $s$ and variance $\mathbb{V}[f(x)]/n$, so we can estimate confidence intervals.