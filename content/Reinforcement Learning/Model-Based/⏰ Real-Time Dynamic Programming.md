Real-time dynamic programming (RTDP) is an asynchronous variant of [[💎 Value Iteration]] that selects states via trajectory sampling rather than an overall sweep over all states. Specifically, it follows an optimal partial policy (for example, with [[💰 Epsilon-Greedy]]) defined by the current value function, and at each state, it performs the value iteration update step 
$$
V(s) \leftarrow \max_a \mathbb{E}_{(s', r) \sim p(s' \vert s, a)} [r(s, a) + \gamma V(s')].
$$


# Convergence
Convergence is guaranteed in problems with reachable goal states and purely negative-reward transitions across non-goal states. The advantage over standard dynamic programming methods is that to reach this convergence, RTDP will only visit states that are relevant to the problem—ones that are reachable and valid—rather than sweeping over the entire state space.