Without prior knowledge, we often want prior distributions that are non-informative—with small influence on the posterior. Sometimes, we can set our prior to have hyperparameters that minimize the impact on the posterior, even if our prior distribution becomes improper (doesn't integrate to finite amount).

For our non-informative prior, another important principle is Jeffrey's Invariance Principle: a non-informative prior should stay non-informative under any transformations of $\theta$. Following this principle, we have a special kind of non-informative prior, called Jeffrey's prior, that remains invariant under change of coordinates for $\theta$. This prior follows the formula 
$$
p(\theta) \propto \sqrt{J(\theta)}
$$
 where $J(\theta)$ is the expected Fisher information, 
$$
J(\theta) = -\mathbb{E}\left[\frac{d^2\log p(y \vert \theta)}{d\theta^2}\right].
$$
