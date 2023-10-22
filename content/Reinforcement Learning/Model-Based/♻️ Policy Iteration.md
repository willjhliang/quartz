Policy iteration is a reinforcement learning approach that iteratively performs policy evaluation and policy improvement.
1. [[💯 Policy Evaluation#Iterative Policy Evaluation]] computes the value function $V^\pi$ for our policy $\pi$.
2. Policy improvement learns a better policy using $V^\pi$.

In tabular settings, by repeating these two steps, policy iteration is guaranteed to converge to the optimal policy. The first step gives an accurate estimate for the current value, and the second step always produces a better policy given the values.

# Policy Improvement
Policy improvement is based on the observation that for two deterministic policies $\pi$ and $\pi'$, if 
$$
Q^\pi(s, \pi'(s)) \geq V^\pi(s),
$$
 then $\pi'$ is a better policy than $\pi$. That is, if taking the action chosen by $\pi'(s)$ and following $\pi$ afterwards is better than following $\pi$ directly, then $\pi'$ is better than $\pi$, 
$$
V^{\pi'}(s) \geq V^\pi(s).
$$


Given our current policy $\pi$ and the state-value $v_\pi$, we can thus find a better policy via 
$$
\pi'(s) = \arg\max_a \sum_{s', r}p(s', r \vert s, a)[r + \gamma V^\pi(s')].
$$
 Note that this is also equivalent to 
$$
\pi'(s) = \arg\max_a Q^\pi(s, a) = \arg\max_a A^\pi(s, a).
$$
 Both the Q-function and advantage can be computed from our state-value function and the environment dynamics.

# Alternative Formulation
Noting that we're using the Q-function anyway in the policy improvement step, we can alternatively evaluate $Q^\pi$ directly. Then, 
$$
Q^\pi(s, a) \leftarrow r(s, a) + \gamma \mathbb{E}_{s' \sim p(s' \vert s, a)}[Q^\pi(s' ,\pi(s'))].
$$


Crucially, the difference between this update and the one for the value function is that our action $a$ doesn't have to be from our current policy. Thus, another way to estimate $Q^\pi$ without transition dynamics is to fit it using $(s_i, a_i, s_i', r_i)$ tuples generated from any policy.