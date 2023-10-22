Entropy is the average level of "surprise" or "uncertainty" in a probability distribution. Intuitively, the surprise of an individual event $y$ is inversely correlated with the probability of the event happening—we would be surprised if an improbable event happened—so we can quantify surprise as $$\log (1/p(y)) = -\log p(y).$$ Note that we apply the log to change the bound from $[1, \infty)$ to $[0, \infty)$.

By combining all events together with an expectation, we get the entropy equation $$H(Y) = -\sum_y p(y)\log p(y).$$

Another way to interpret this is the expected number of bits needed to encode $Y$ or number of questions needed to guess $Y$. Tying it all together: the more average surprise we have, the more uncertain we are about the results; the more uncertainty there is, the more bits we need to encode the distribution.

> [!info]
> Uncertainty is a measure of the variance of a distribution. A distribution with high entropy or uncertainty would be roughly uniform.

Below is a graph of the entropy of binary variable $X$. Highest entropy is when probability is $\frac{1}{2}$, and as probability goes toward one extreme, entropy decreases since $X$ becomes less random.

![[20221229103244.png#invert|200]]

# Conditional Entropy
Just like with a standard distribution, entropy can be measured for a conditional distribution $P(Y \vert X)$. If we knew some value $X = x$, then the entropy of the conditional is $$H(Y \vert X=x) = -\sum_y p(y \vert x) \log p(y \vert x).$$

Conditional entropy is the expectation of this entropy for all $x$, $$H(Y \vert X) = \sum_x p(x)H(Y\vert X=x) = -\sum_{x, y} p(x, y) \log \frac{p(x, y)}{p(x)}.$$ More intuitively, we can derive $$H(Y \vert X) = H(X, Y) - H(X).$$