Bayesian neural networks are models that parameterize the distribution of its weights rather than directly optimizing the weights themselves. That is, given training data $D$, rather than finding the fixed parameters $\theta$, bayesian neural networks model $p(\theta \vert D)$ and optimize 
$$
\max_{p(\theta \vert D)}\mathbb{E}_{p(\theta \vert D)}[p(y(x) \vert \theta)].
$$


![[20230403224211.png#invert|400]]

In doing so, these models can represent prediction uncertainty by inferring $p(y(x) \vert D)$. Intuitively, they can be thought of as an infinite [[🎻 Ensemble]] of standard neural nets.

Optimizing $p(\theta \vert D)$ is naturally harder than optimizing $\theta$ directly, and there are a variety of approaches. [[🎯 Markov Chain Monte Carlo]] methods estimate the expectation by performing multiple samples for $\theta$. Alternatively, the [[🧬 Evidence Lower Bound]] framework allows us to parameterize the weight distribution $q_\phi(\theta)$ and optimize the ELBO, 
$$
L(\phi) = \mathbb{E}_{x, y \sim D}[\mathbb{E}_{\theta \sim q_\phi(\theta)}[\log p(y(x)=y \vert \theta) + \log p(\theta) - \log q_\phi(\theta)]].
$$
 The gradient can then be found via the [[🪄 Reparameterization Trick]] with $\theta(\phi, \epsilon)$, 
$$
\nabla_\phi L(\phi) = \mathbb{E}_{x, y \sim D} [\mathbb{E}_{\epsilon}[\log p(y(x) = y \vert \theta(\phi, \epsilon) ) + \log p(\theta(\phi, \epsilon))]].
$$
