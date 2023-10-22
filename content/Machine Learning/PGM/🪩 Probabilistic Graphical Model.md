General [[🎲 Probability Distribution]]s require an exponential number of parameters to describe. For example, for two binary variables $x_1$ and $x_2$, we need to define the probabilities for $\{ 0, 1 \}^2$ (except the last one).

To model complex distributions, we make assumptions that simplify the distribution, essentially forcing certain dependence conditions to reduce the number of parameters needed to represent the distribution. To do this, we can model probabilities using a graph, where each random variable $x_1, \ldots, x_n$ is a node. Due to this structure, these models are also called probabilistic graphical models (PGMs).
1. [[🚨 Bayesian Network]]s naturally model causation and conditional distributions using directed edges.
2. [[🗳️ Markov Random Field]]s and [[🌾 Conditional Random Fields]] model more general relationships between random variables using undirected edges.

> [!note]
> Bayesian networks can be expressed with a product of factors $\phi_c$ similar to MRFs. Specifically, the factors are the conditional probability distributions: each node $x_i$ forms a factor with $\{ x_i \} \cup \text{parents}(x_i)$.

# Intractability
However, inference and computing the partition function (a normalizing constant for the distribution) are often intractable. We must then solve them heuristically or approximate them using a variety of methods below.

## Intractable Inference
Inference is the task of computing probabilities or expectations from a model like $p(y \vert x)$ or $p(x)$; some problems may also look for other properties like $\arg\max_y p(y \vert x)$.

With complex models, inference computations require exponential-time calculations or involve unknown values. For example, given a model with latent variables $z$, our likelihood calculation for a specific $x$ can be found by marginalizing over $z$ or with the chain rule.
1. 
$$
p_\theta(x) = \int p_\theta(x, z) dz
$$

2. 
$$
p_\theta(x) = \frac{p_\theta(x, z)}{p_\theta(z \vert x)}
$$


Both methods pose a challenge: the former requires us to integrate over all latent variables, which is often intractable, and the latter requires knowing the ground truth latents $p(z \vert x)$.

To get around this impossible process, we use different ways of calculating or approximating inference questions.
1. [[🍿 Kernel Density Estimation]] estimates $p(x)$ purely from drawn samples.
2. [[🔫 Variable Elimination]] performs exact inference by optimizing the computation order and strategy.
3. [[🕍 Belief Propagation]] and [[🌲 Junction Tree]]s simulate message-passing to infer true marginals or MAP arguments.
4. [[🧬 Evidence Lower Bound]] lower bounds the evidence $p(x)$, turning inference into an optimization problem for tightening the bound.
5. [[😡 Mean Field Approximation]] uses the ELBO to optimize a specific variational distribution via coordinate ascent.

## Intractable Partition
Many probabilistic models, especially ones using undirected edges, are defined by an unnormalized probability distribution $\tilde{p}(x)$. Their distribution needs to be normalized 
$$
p(x; \theta) = \frac{1}{Z}\tilde{p}(x)
$$
 by partition function $Z$, defined as follows: 
$$
Z = \begin{cases} \sum_x \tilde{p}(x) & \text{if $x$ is discrete} \\ \int_x \tilde{p}(x)dx & \text{if $x$ is continuous} \end{cases}
$$


If $Z$ is intractable, we need to optimize log likelihood using some approximate methods.
1. [[🖖 Contrastive Divergence]] estimates the gradient $\nabla_\theta \log p(x)$, which requires the gradient of $\log Z$, using [[🎯 Markov Chain Monte Carlo]].
2. [[🙃 Pseudo-Likelihood]] maximizes a proxy objective that's computable with unnormalized $\tilde{p}$.
3. [[🎼 Score Matching]] optimizes the derivative of the distribution with respect to $x$, which allows us to avoid the gradient of the partition.
4. [[📣 Noise Contrastive Estimation]] trains a classifier on a joint model-noise distribution; optimizing this supervised problem gives us optimal weights and the partition function for our original model.
5. [[🥃 Annealed Importance Sampling]] approximates the ratio between two partitions, and with a tractable second partition, allows us to directly approximate $Z$.