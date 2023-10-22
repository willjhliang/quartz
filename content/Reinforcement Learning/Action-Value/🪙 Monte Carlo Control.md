Monte Carlo methods for reinforcement learning can be used to approximate the exact [[🧨 Dynamic Programming]] algorithms without using environment dynamics. Without the distribution $p(s', r \vert s, a)$, we can perform estimates via sampling instead. Our updates are thus performed episode-by-episode rather than at every time step.

# Evaluation
The Monte Carlo way to estimate state-value function $V^\pi(s)$ is by averaging the returns $G_t$ experienced after visits to each state $s$, 
$$
V^\pi(s) = \frac{\sum_{t=1}^T \mathbb{1}[S_t = s] G_t}{\sum_{t=1}^T \mathbb{1}[S_t = s]}
$$
 where $\mathbb{1}[S_t = s]$ is a indicator function. There are two approaches defining this indicator and thus how we count these returns:
1. First-visit MC prediction only uses the return of the first visit to $s$ in the episode. This avoids biased estimates, making it more theoretically studied.
2. Every-visit MC prediction tracks the returns for every visit to $s$.

# Control
Since we don't have the environment dynamics, our policy improvement step requires knowing the value of each action, not just the value of each state. Thus, in a full Monte Carlo control algorithm, we perform prediction for the Q-function $Q^\pi(s, a)$ instead, tracking averages across state-action pairs instead of just states: 
$$
V^\pi(s, a) = \frac{\sum_{t=1}^T \mathbb{1}[S_t=s, A_t=a] G_t}{\sum_{t=1}^T \mathbb{1}[S_t=s, A_t=a]}
$$


However, if our policy $\pi$ is deterministic, some state-action pairs will never be visited. This introduces the exploration-exploitation tradeoff, which can be resolved using either an on-policy or off-policy behavior method.

## On-Policy
An on-policy Monte Carlo control method uses the same policy $\pi$ to estimate the value function and for improvement. To estimate our Q-function, we need to use a stochastic "soft" policy instead, for example [[💰 Epsilon-Greedy]], that allows us to sample all state-action pairs.

Our policy improvement guarantees still hold, but our final optimal policy won't be greedy. Rather, this optimality can be thought of as a standard greedy deterministic policy acting in an environment that has a $\epsilon$ chance of ignoring our chosen action and picking a random one instead. Thus, we end up with the best soft policy, but not the best deterministic one.

## Off-Policy
To train a deterministic policy, we have off-policy Monte Carlo, which uses a policy to generate estimates that's separate from the one we're improving. The former is the behavioral policy $b$, and the latter is the target policy $\pi$.

$b$ can be any stochastic policy that visits all state-action pairs, and $\pi$ can be deterministic. The core problem with off-policy is that our estimates for our value $q_\pi$ must be based off of how $\pi$ would act, but our samples were generated from $b$.

To address this, we evaluate the expectation with [[🪆 Importance Sampling]], which allows us to swap the sampling distribution by adding an importance weight inside the expectation. Specifically, the weight for a single transition is 
$$
\rho_t = \frac{\pi(A_t \vert S_t) p(S_{t+1} \vert S_t, A_t)}{b(A_t \vert S_t)p(S_{t+1} \vert S_t, A_t)} = \frac{\pi(A_t \vert S_t)}{b(A_t \vert S_t)}.
$$
 For a return at time step $t$, we would apply this weight to every transition in the trajectory, so the definition for state-value is 
$$
V^\pi(s) = \mathbb{E}_b[\rho_{t:T-1} G_t \vert S_t = s],
$$
 and similar for action-value we have 
$$
Q^\pi(s) = \mathbb{E}_b[\rho_{t:T-1}G_t \vert S_t = s, A_t = a].
$$
 With ordinary importance sampling, we would estimate these as the average of the weighted returns calculated via first-visit.

Another alternative estimate is weighted importance sampling, which divides the sum of estimates by the sum of their weights rather than the number of samples. This results in an estimate that has higher bias but lower variance.

# Policy Improvement
Similar to [[♻️ Policy Iteration]], once we estimate our Q-function, we can generate a better deterministic policy 
$$
\pi(s) = \arg\max_a q_\pi(s, a).
$$

