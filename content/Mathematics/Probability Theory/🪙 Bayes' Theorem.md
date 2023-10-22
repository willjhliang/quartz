Given events $x$ and $y$, the following always holds. 
$$
p(y \vert x) = \frac{p(x \vert y)p(y)}{p(x)}.
$$

> [!info]
> This is commonly used to reverse the conditionals or incorporate extra probabilities that we can find.

In bayesian terms, each element in the equation has a name: 
$$
\text{posterior} = \frac{\text{likelihood} \cdot \text{prior}}{\text{evidence}}
$$

The posterior is our belief for $y$ given evidence $x$. The likelihood is the reverse, the probability of $y$ given a fixed $x$. Finally, the prior is our initial belief for $y$.

The evidence $p(x)$ can be computed as follows: 
$$
p(x) = \int p(x \vert y)p(y)dy.
$$
 Thus, it can be interpreted as the expected likelihood, taking the expectation over the prior. Note that this integration is difficult to compute algorithmically.

# Conjugacy
Note that the posterior is proportional to the prior multiplied by likelihood. This product can be difficult to compute analytically, so we often use conjugate priors, defined as priors with the same form as the posterior.

These priors come from the [[👨‍👩‍👧‍👦 Exponential Family]] of distributions, with the most common one being the [[👑 Gaussian]].