Metropolis-Hastings is a [[🎯 Markov Chain Monte Carlo]] algorithm for approximate sampling from distribution $p(x)$ if we have access to the unnormalized distribution $\tilde{p}(x)$. Our transition function $T(x' \vert x)$ works in two steps.
1. Propose $x'$ from $x$ using some distribution $q(x' \vert x)$.
2. Choose to accept this change with probability $$A(x' \vert x) = \min\left(1, \frac{\tilde{p}(x')q(x \vert x')}{\tilde{p}(x)q(x' \vert x)}\right).$$

Intuitively, our transition is picking some sample $x'$ that's near $x$. If it moves in the direction of greater probability, we have a greater chance of accepting it. Thus, our samples gradually get closer to high probability, low energy areas, and begin to model the target distribution.