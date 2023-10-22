> [!abstract]
> Maximum likelihood estimate (MLE) is how we estimate probabilities given only the data.

Given historical data $D$, we can estimate the probabilities $\theta$ that generated this data. With the maximum likelihood estimate (MLE), we find $\theta$ that maximizes the likelihood of generating $D$: 
$$
\theta = \arg\max_\theta p(D \vert \theta) = \arg\max_\theta \sum_{i=1}^m \log p(x^{(i)} \vert \theta) = \arg\max_\theta \mathbb{E}_x[\log p(x \vert \theta)]
$$


Another way to interpret this estimate is minimizing the dissimilarity between the empirical data distribution and the model distribution. Measuring dissimilarity with [[✂️ KL Divergence]], we have 
$$
D_{KL}(\hat{p}_{data} \Vert p_{model}) = \mathbb{E}_x [\log \hat{p}_{data}(x) - \log p_{model}(x)],
$$
 but since $\log \hat{p}_{data}(x)$ is a constant with respect to the model parameters, to minimize this divergence by maximizing the negation, $\mathbb{E}_x[\log p_{model}(x)]$, which is equivalent to our objective above.

# Example
We'll illustrate this concept with a coin-flip example. Let $D$ be a set of coin-flip results, with $n_H$ heads and $n_T$ tails, and let $\theta$ be the probability of the coin landing heads. Our optimal parameter is calculated as follows.


$$
 \begin{align*} \hat{\theta}_{MLE} &= \arg\max_\theta(p(D \vert \theta)) \\ &= \arg\max_\theta(\log(p(D \vert \theta)) \\ &= \arg\max_\theta n_H\log(\theta) + n_T\log(1-\theta) \\ &= \frac{n_H}{n_H + n_T} \end{align*} 
$$


> [!note]
> Note that in the equation above, we find the $\arg\max$ over log-likelihood instead of likelihood. This works because log is monotonically increasing, and computing log-likelihood simplifies the math and avoids overflow errors.