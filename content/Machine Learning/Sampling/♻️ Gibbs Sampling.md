Gibbs sampling is a [[🎯 Markov Chain Monte Carlo]] technique for approximately sampling from a distribution $p(x)$. If our joint probability $p(x)$ is hard to sample but the conditionals $p(x_i \vert x_{-i})$ are computable, our transition $T(x' \vert x)$ samples one variable $x_i$ conditioned on all others.

# Block Gibbs Sampling
Some $p(x)$ are structured with many conditional independences; one example is the intra-layer nodes in a [[🚫 Restricted Boltzmann Machine]]. If this is the case, we can update many variables at once during our transition, a process known as Block Gibbs sampling.

> [!note]
> In latent variable models, we often alternate between $p(x \vert h)$ and $p(h \vert x)$.