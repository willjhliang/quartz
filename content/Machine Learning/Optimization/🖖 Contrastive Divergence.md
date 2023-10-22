The contrastive divergence algorithm optimizes the log likelihood of a generative model $p(x)$; the gradient on a sample $x \sim p_{data}$ is $$\nabla_\theta \log p(x) = \nabla_\theta \log \tilde{p}(x) - \nabla_\theta \log Z.$$

The first term is the positive phase, and the second is the negative phase. An intractable positive phase can be solved with approximate inference, but an intractable negative phase is difficult.

Breaking down the negative phase, we can derive $$\nabla_\theta \log Z = \sum_x p(x) \nabla_\theta \log \tilde{p}(x) = \mathbb{E}_{x \sim p(x)} \nabla_\theta \log \tilde{p}(x).$$

From the above two equations, we can interpret the positive phase as pushing up on the model distribution based on the data and the negative phase as pushing down on the distribution based on our model's samples. This idea is illustrated below.

![[20230223162743.png#invert|400]]

There are many ways to implement this gradient update. A naive solution would be to directly estimate the expectation via [[🎯 Markov Chain Monte Carlo]]. However, since burning in the Markov chains is computationally expensive, contrastive divergence initializes the random variables to samples from the actual distribution instead. A single gradient update step is thus the following:
1. Sample a minibatch of samples $x^{(1)}, \ldots, x^{(m)}$ from the training data.
2. Compute the positive phase $$g_+ = \frac{1}{m}\sum_{i=1}^m \nabla_\theta \log\tilde{p}(x^{(i)}).$$
3. Let $\tilde{x}^{(i)} = x^{(i)}$ for $i = 1, \ldots, m$.
4. For $k$ steps, update $\tilde{x}^{(i)}$ with [[♻️ Gibbs Sampling]].
5. Compute the negative phase $$g_- = \frac{1}{m}\sum_{i=1}^m \nabla_\theta \log \tilde{p}(\tilde{x}^{(i)}).$$
6. Update weights $$\theta = \theta + \epsilon(g_+ - g_-).$$

By initializing the random variables this way, we lose some accuracy in sampling the model distribution. Our negative phase will be extremely inaccurate at the start, but once the positive phase starts shaping the model distribution, the Markov chain will get more accurate.

However, there's still an issue with this initialization: our random variables will be concentrated in areas where the data distribution is also high. Then, our gradient update won't suppress the regions of high probability in our model that are far from our data distribution; these areas are called spurious modes.

# Persistent Contrastive Divergence
Another way to initialize the random variables is to simply use the values from the previous gradient step. This is based on the assumption that the gradient update is small, so the new model's distribution stays similar, allowing us to use the already burned-in Markov chains.

This method is called persistent contrastive divergence or stochastic maximum likelihood (SML) in the applied mathematics community.