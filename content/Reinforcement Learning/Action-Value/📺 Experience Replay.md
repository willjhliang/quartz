Experience replay is a technique used in [[♟️ Reinforcement Learning]], usually with [[🚀 Q-Learning]].

One problem with the standard Q-learning algorithm is that our tuples $(s_i, a_i ,s_i', r_i)$ will be heavily correlated with each other since we're collecting them from the same trajectory. If we train our network in this order, we're overfitting on our current trajectory.

The solution to this is a replay buffer $B$ that stores some past transitions. When training, instead of using the most recent tuple, we randomly take a batch from $B$; we also periodically update the buffer with our most recent data. This method disrupts the correlation, reducing variance and allowing our Q-function to generalize better. Moreover, we also improve sample efficiency since a transition can be used for multiple updates.

# Prioritized Experience Replay
Prioritized Experience Replay[^1] notes that in the original formulation, all transitions are equally likely to be sampled, regardless of their "usefulness" or "importance." It would be more efficient to instead sample the important transitions more frequently.

One straightforward notion of "importance" is the transition's TD error (from [[⌛️ Temporal Difference Learning]]); the higher the error, the more crucial its update will be. Thus, we prioritize experience replay's stochastic sampling by assigning higher probability to those transitions. For transition $i$, the probability we select it is $$P(i) = \frac{p_i^\alpha}{\sum_k p_k^\alpha}$$ where $\alpha$ controls the degree of prioritization ($\alpha = 0$ makes it uniform) and $p_i$ is the priority defined as $$p_i = \vert \delta_i + \epsilon \vert \text{ or } \frac{1}{\text{rank}(i)}$$ where $\delta_i$ is the TD error and $\text{rank(i)}$ is the rank of transition $i$ in sorted ordering.

However, since our ultimate goal for sampling is to estimate the expectation, we need to avoiding biasing our prioritized estimate with [[🪆 Importance Sampling]] weights, $$w_i = \left( \frac{1}{N} \cdot \frac{1}{P(i)} \right)^\beta$$ where $N$ is the number of transitions and $\beta$ controls the weight's importance, which can be annealed from $0$ to $1$ throughout training. In our weight update, we use $w_i \delta_i$ instead of just $\delta_i$.

[^1]: [Prioritized Experience Replay (Schaul et al, 2016)](https://arxiv.org/pdf/1511.05952.pdf)