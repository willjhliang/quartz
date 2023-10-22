> [!abstract]
> Maximum A Posteriori (MAP) is an estimation of parameters given the data as well as some prior hypothesis.

Given historical data $D$, we want to estimate the parameters $\theta$. For maximum a posteriori (MAP), we already have some pre-existing hypothesis about our probabilities, termed a prior $p(\theta)$, and use our new data $D$ to update our hypothesis to get the posterior, $p(\theta \vert D)$.. In other words, we find $\theta$ that’s most likely explained by $D$ as well as our prior: $$\theta = \arg\max_\theta p(\theta \vert D) = \arg\max_\theta \log p(D \vert \theta) + \log p(\theta)$$

The prior has an influence on the final probability density, and in practice biases our model toward a smoother, simpler distribution.

# Example
We'll illustrate this concept with a coin-flip example. Let $D$ be a set of coin-flip results, with $n_H$ heads and $n_T$ tails, and let $\theta$ be the probability of the coin landing heads. We'll find $\theta$ that maximizes the probability of $\theta$ given that $D$ occurred. For conjugacy, let $$p(\theta) = Beta(\alpha, \beta) = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha) \Gamma(\beta)} \theta^{\alpha-1} (1-\theta)^{\beta - 1}$$follow the same family of distributions as the likelihood and posterior. Then, we can maximize the posterior with [[🪙 Bayes' Theorem]].
$$ \begin{align*} \hat{\theta}_{MAP} &= \arg\max_\theta(p(\theta \vert D)) \\ &= \arg\max_\theta(p(D \vert \theta)p(\theta)) \\ &= \arg\max_\theta(\log p(D \vert \theta) + \log p(\theta)) \\ &= \frac{n_H+\alpha-1}{n_H+n_T+\alpha+\beta-2} \end{align*} $$