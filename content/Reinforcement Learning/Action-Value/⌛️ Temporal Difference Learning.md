Temporal difference learning is a class of reinforcement learning algorithms that estimates the value function via bootstrapping and sampling. In a way, this is a combination of [[🧨 Dynamic Programming]] and [[🪙 Monte Carlo Control]].

Specifically, temporal difference methods learn after every time step by using the recursive nature of the value function. The most common example is TD(0).

# TD(0)
TD(0) is a value estimation method that updates its value estimate after every action. Specifically, it performs $$V(S_t) \leftarrow V(S_t) + \alpha(R_{t+1} + \gamma V(S_{t+1}) - V(S_t))$$ as a proxy for the [[🔔 Bellman Equation]] $$V^\pi(s) = \mathbb{E}_\pi[R_{t+1} + \gamma V^\pi(s') \vert S_t = s].$$

This update step uses a single sample to estimate the expectation, and it also uses the current value function as an approximation for the actual value function.

The second term is called the TD error, $$\delta_t = R_{t+1} + \gamma V(S_{t+1}) - V(S_t).$$ This quantity comes up often in other reinforcement learning methods.

# Control
For control, we train action-values using the same methodology as the prediction equation above.
1. [[🚀 Q-Learning]] is an off-policy algorithm that implicitly optimizes a greedy policy.
2. [[🧭 Sarsa]] is an on-policy algorithm that performs TD updates with $\epsilon$-greedy.