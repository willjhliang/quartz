Pseudo-likelihood is a proxy for the actual likelihood term. For a probability distribution $$p(x) = \frac{1}{Z}\tilde{p}(x),$$ if our partition function $Z$ is intractable, we can optimize the pseudo-likelihood instead.

This objective is motivated by the observation that ratios of probabilities cancels out the partition function, $$\frac{p(x_1)}{p(x_2)} = \frac{\tilde{p}(x_1)}{\tilde{p}(x_2)}.$$

We can use this idea to compute conditional probabilities without the partition function. Since we can break up the log likelihood via the chain rule into $$\log p(x) = \log p(x_1) + \log p(x_2 \vert x_1) + \dots + \log p(x_n \vert x_1\ldots x_{n-1}),$$ we can calculate all values except the first in this manner.

However, the challenge is that in the first few terms, we would need to marginalize the denominator over large sets of variables—any variables not conditioned on needs to be marginalized over.

Thus, instead of computing the exact likelihood via the equation above, we can instead compute the log pseudo-likelihood, defined as $$\ell_{PL} = \sum_{i=1}^n \log p(x_i \vert x_{-i}).$$ Maximizing this objective is asymptotically consistent with maximizing the actual log likelihood. In the context of [[🪩 Probabilistic Graphical Model]]s, due to conditional independences, conditioning on $x_{-i}$ is equivalent to conditioning on the neighborhood of $x_i$, denoted $N(i)$, so another form of the pseudo-likelihood is $$\ell_{PL} = \sum_{i=1}^n \log p(x_i \vert x_{N(i)}).$$

# Generalized Pseudo-Likelihood
Writing the above in terms of sets of variables $\mathbb{S}^{(i)}$, we have the generalized pseudo-likelihood $$\sum_{i=1}^m \log p(x_{\mathbb{S}^{(i)}} \vert x_{-\mathbb{S}^{(i)}})$$ where $m = 1$ and $\mathbb{S}^{(1)} = 1, \ldots, n$ gives the normal log likelihood and $m = n$ and $\mathbb{S}^{(i)} = \{ i \}$ gives the pseudo-likelihood.
