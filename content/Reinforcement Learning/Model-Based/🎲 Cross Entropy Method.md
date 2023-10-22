The cross entropy method (CEM) is a stochastic optimization algorithm that addresses the general optimization problem 
$$
A = \arg\max_A J(A)
$$
 via random selection. $J(A)$ can be any objective, but in the reinforcement learning setting, we commonly have 
$$
J(A) = \sum_{t=1}^T r(s_t, a_t) \text{ where } s_{t+1} = f(s_t, a_t)
$$
 for some world model $f$.

First, we're motivated by the naive, completely stochastic approximation algorithm (sometimes called "random shooting"):
1. Pick $A_1, \ldots, A_N$ from some distribution.
2. Choose $\arg\max_i J(A_i)$.

The cross entropy method notes that $A_1, \ldots, A_N$ can be picked from an "informed guess." That is, rather than picking the $A_i$ at random, we can iteratively improve the distribution they're chosen from—we'll repeat random shooting multiple times and update our sampling distribution based on results from the previous iterations.

Formally, the CEM algorithm is as follows.
1. Sample $A_1, \ldots, A_N$ from $p(A)$, which is typically a Gaussian.
2. Evaluate $J(A_1), \ldots, J(A_N)$.
3. Pick the elites $A_{i_1}, \ldots, A_{i_M}$ with the highest value ($M < N$).
4. Refit $p(A)$ to the elites and repeat.

Note that though this method is efficient, it only works in low dimensions. Moreover, it only supports open-loop planning and doesn't incorporate any environment feedback to replan.