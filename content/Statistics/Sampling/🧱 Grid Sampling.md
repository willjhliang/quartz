Grid sampling is a simple way to obtain samples of some random variable $\theta$ from a distribution $p(\theta)$. The main idea is to discretize $p(\theta)$ by evaluating it along a grid of values, then sampling from the values proportionally.

The procedure is as follows:
1. Select a grid of values for $\theta$.
2. For each grid value, calculate $m(\theta) = p(\theta)/\sum_\theta p(\theta)$.
3. Sample a grid value $\theta^*$ with probability $m(\theta)$.

Finding an appropriate grid can often be trial-and-error, and ideally, the grid should cover all values of $\theta$ with non-zero probability, and it shouldn't contain many values with zero probability.

# Multi-Dimensional Sampling
If we have multiple variables, we can select a grid of values for each and loop over all joint probabilities. For example, with two parameters $\alpha$ and $\beta$:
1. Select a grid of values for $\alpha$ and another grid for $\beta$.
2. For each $(\alpha, \beta)$ pair, compute $m(\alpha, \beta) = p(\alpha, \beta) / \sum_{\alpha, \beta} p(\alpha, \beta)$.
3. Calculate marginal probabilities $m(\alpha) = \sum_\beta m(\alpha, \beta)$.
4. Calculate conditional probabilities $m(\beta \vert \alpha) = m(\alpha, \beta) / m(\alpha)$.
5. Sample $\alpha^*$ using $m(\alpha)$.
6. Sample $\beta^*$ using $m(\beta \vert \alpha^*)$.