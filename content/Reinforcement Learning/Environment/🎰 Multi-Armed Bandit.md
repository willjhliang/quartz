The multi-armed, or $k$-armed, bandit is a simplification of the general reinforcement learning problem. We're in a single state, and we're given the option to choose between $k$ different actions, each yielding some stochastic reward; this is analogous to choosing $k$ different arms of a bandit, or slot machine, hence the name.

Our objective, as usual, is to maximize expected total reward. Let the true value of an action $a$ be $$q_*(a) = \mathbb{E}[R_t \vert A_t = a]$$ where $R_t$ and $A_t$ are the reward and selected action at time step $t$. If we estimate $q_*$ with $Q_t(a) \approx q_*(a)$, then we can solve our problem by choosing the highest-valued action at each time step.

The problem is that to estimate $Q_t$ accurately, we need to explore different actions. However, to achieve our objective, we need to exploit the best action we already know. This balance between exploration and exploitation is at the core of all reinforcement learning algorithms.

# Action-Value Estimation
## Sample-Average
One simple estimate for $Q_t(a)$ is the average of our past rewards for $a$, $$Q_t(a) = \frac{\sum_{i=1}^{t-1} R_i \cdot \mathbb{1}[A_i = a]}{\sum_{i=1}^{t-1} \mathbb{1}[A_i = a]}.$$ If we haven't chosen $a$ in the past (meaning the denominator is $0$), we can set $Q_t(a)$ to some default value. At our time step $t$, we can then choose a greedy action $$A_t = \arg\max_a Q_t(a)$$ that exploits our current estimates. Alternatively, we can use [[💰 Epsilon-Greedy]], which chooses a random action with probability $\epsilon$ and exploits otherwise.

After choosing an action, we perform the iterative update $$Q_{t+1}(a) = Q_t(a) + \frac{1}{n}(R_t - Q_{t+1}(a))$$ after observing reward $R_t$ for action $a$. This is equivalent to recalculating the average using our first formula, but this form allows us to formulate the general update rule $$\text{New Estimate} = \text{Old Estimate} + \text{Step Size} \cdot (\text{Target} - \text{Old Estimate})$$ that is widely used in other algorithms.

## Exponential Recency-Weighted Average
Sometimes, in non-stationary problems, the reward distributions might change over time. Thus, instead of a simple average, we want to place higher weight on more recent samples with the update rule $$Q_{t+1}(a) = Q_t(a) + \alpha(R_t - Q_t(a))$$ for some step size $\alpha \in [0, 1)$. Expanding out this formula gives us $$Q = (1-\alpha)^n Q_0 + \sum_{i=1}^n \alpha(1-\alpha)^{n-i} R_i$$ where $Q_0$ is the default value and the summation loops over all past rewards. This thus gives us a weighted average that decays exponentially for older samples.

# Gradient Bandit
Alternatively, we can forgo any notion of $Q_t$ and instead learn a preference $H_t(a)$ for action $a$ that has no interpretation in terms of reward. We'll pick actions according to the softmax defined by these preferences, $$p(A_t = a) = \pi_t(a) = \frac{e^{H_t(a)}}{\sum_{b=1}^k e^{H_t(b)}}.$$

To update our preferences after selecting action $A_t = a$ and receiving reward $R_t$: $$H_{t+1}(A_t) = \begin{cases} H_t(A_t) + \alpha(R_t - \bar{R}_t)(1-\pi_t(A_t)) & \text{for $A_t = a$} \\ H_t(A_t) - \alpha(R_t - \bar{R}_t)\pi_t(A_t) & \text{otherwise} \end{cases}$$

$\bar{R}_t$ is a baseline measure that's usually set to the average of all past rewards (not just for $a$). Intuitively, we increase preference for $a$ if $R_t$ is better than average and decrease if $R_t$ is worse; we also move the other actions in the opposite direction.

The above update rule comes directly from a derivation from [[⛰️ Gradient Descent]]; we're performing a gradient step in the direction of greater expected reward, $$\mathbb{E}[R_t] = \sum_a \pi_t(a) q_*(a).$$