> [!abstract]
> Dynamic bayesian networks represent how a probability distribution changes over time via a directed acyclic graph.

Dynamic bayesian networks are a specific type of [[🚨 Bayesian Network]]s that captures the change of a distribution $p(x)$ over time. We can do this by first discretizing time $t$ into individual time steps, then assert the following two assumptions:
1. Markov: $p(x^{t+1} \vert x^0, x^1, \ldots, x^t) = p(x^{t+1} \vert x^t)$.
2. Time-invariance: $p(x^{t+1} \vert x^t) = p(x^{t'+ 1} \vert x^{t'}) = p(x' \vert x)$ for all $t, t'$.

Intuitively, the former says that the future only depends on the present, not the past, and the latter says that no matter what time we're at, the future depends the same way on the present.

Then, to capture this distribution, we employ a ground bayes net $p(x^0)$ for the initial distribution and a template transition model $p(x' \vert x)$ to represent how the distribution changes at each time step. These two models uniquely define our distribution over time.

This model structure is fairly broad, but a common specific variant is the [[☂️ Hidden Markov Model]], which uses multiple state transitions between each time step and separates latent (unobserved) and observable variables.