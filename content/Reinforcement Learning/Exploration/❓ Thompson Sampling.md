In the multi-armed bandit setting, Thompson sampling estimates $\hat{p}(\theta_1, \ldots, \theta_n)$ which is the distribution over rewards. Generalizing this to the MDP environment, we estimate the distribution over Q-functions instead, $p(Q)$. Thus, our algorithm is as follows:
1. Sample a Q-function $Q \sim p(Q)$.
2. Act according to $Q$ for one episode.
3. Update $p(Q)$.

To represent $p(Q)$, we can use bootstrapping: train multiple functions on (possibly limited) the past data, and the sampling procedure randomly picks one of the functions.

Intuitively, Thompson sampling explores by using random Q-functions. The agent commits to the consistent policy defined by this function, and our hope is that it will eventually stumble upon something good.