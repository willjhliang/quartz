The Bellman equations defines a recursive property of the [[🧸 Agent#Value Functions]]: 
$$
\begin{align*} V^\pi(s) &= \sum_a \pi(a \vert s) \sum_{s', r} p(s', r \vert s, a) [r + \gamma V^\pi(s')] \\ Q^\pi(s, a) &= \sum_{s', r} p(s', r \vert s, a) [ r + \gamma\sum_{a'} \pi(a' \vert s') Q^\pi(s', a') ] \end{align*}
$$


The recursion relates our states to the successor states, and our value functions are always solutions to the Bellman equation.

# Bellman Optimality Equation
Value functions allow us to objectively rank policies, and therefore we can define an optimal policy $\pi^*$ as one that gives maximum value. Using $\pi^*$, we get the optimal state-value function $V^*(s) = \max_\pi V^\pi(s)$ and optimal action-value function $Q^*(s, a) = \max_\pi Q^\pi(s, a)$ for all $s$ and $a$.

We can apply the Bellman equations above to them, but since our policy's optimal, it always chooses the best action. Thus, we have the optimality equations: 
$$
\begin{align*} V^*(s) &= \max_a\sum_{s', r} p(s', r \vert s, a) [r + \gamma V^*(s')] \\ Q^*(s, a) &= \sum_{s', r} p(s', r \vert s, a) [ r + \gamma \max_{a'} Q^*(s', a') ] \end{align*}
$$

An exhaustive search over the entire MDP tree would allow us to solve the system of equations for the optimal value functions, which gives us the optimal policy. However, this is almost never possible due to computational costs, non-Markovian states, or unknown dynamics; many algorithms thus aim to approximate the solution, and this the optimality equation shows up all across reinforcement learning.
