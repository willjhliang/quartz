Importance sampling is a form of [[🤔 Monte Carlo Sampling]] that uses an alternate distribution $q(x)$ in case $p(x)$ requires too many samples for an accurate estimate. Since we can write $$p(x)f(x) = q(x) \frac{p(x)f(x)}{q(x)},$$ we can compute the expectation over $q(x)$ instead. Sampling $x^{(i)} \sim q$, we have $$\hat{s}_q = \frac{1}{n}\sum_{i = 1}^n \frac{p(x^{(i)}) f(x^{(i)})}{q(x^{(i)})}.$$

However, we need to choose a good distribution $q$. The variance of our estimate $$\mathbb{V}[\hat{s}_q] = \mathbb{V}[\frac{p(x)f(x)}{q(x)}]/n.$$ If the fraction is large, the variance of our estimate can increase; this occurs if $q(x)$ is too small and neither $p(x)$ nor $f(x)$ are small enough. Since we're sampling from $q$, we still need $q$ to be a simple distribution.

> [!info]
> Typically, the discrepancy between $p$ and $q$ leads to common underestimations of $s$ with rare cases of extreme overestimation.

# Biased Importance Sampling
If we allow for a biased sample, we can use more complicated distributions for $q$ without requiring normalization. Specifically, $$\hat{s}_{BIS} = \frac{\sum_{i=1}^n \frac{\tilde{p}(x^{(i)})}{\tilde{q}(x^{(i)})}f(x^{(i)})}{\sum_{i=1}^n\frac{\tilde{p}(x^{(i)})}{\tilde{q}(x^{(i)})}}$$ where $\tilde{p}$ and $\tilde{q}$ are unnormalized forms of $p$ and $q$ and $x^{(i)}$ are drawn from $q$.