$\epsilon$-greedy is a simple policy derived from $Q(s, a)$ values. Unlike a standard greedy policy that always takes the action that maximizes $Q$, $\epsilon$-greedy also encourages exploration by occasionally choosing random actions.

Specifically, the policy is as follows.
$$\pi(s) = \begin{cases} \text{random action} & \text{with probability $\epsilon$} \\ \arg\max_a Q(s,a) & \text{with probability $1-\epsilon$}\end{cases}$$
$\epsilon$ is the hyperparameter that balances exploration and exploitation. Higher $\epsilon$ means more exploration, less exploitation. We usually gradually reduce $\epsilon$ during training since at the start, we want to explore more, but as our policy gets better, we want to exploit it more.