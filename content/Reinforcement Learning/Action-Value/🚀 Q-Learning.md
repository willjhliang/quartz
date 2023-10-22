Q-Learning is an off-policy temporal difference learning method. Our goal is to fit $Q_\phi(s, a)$, and instead of training on a dataset like [[💎 Value Iteration#Fitted Q-Iteration]], we perform online updates. Traditionally, the tabular Q-learning algorithm performs 
$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha(R_{t+1} + \max_a Q(S_{t+1}, a) - Q(S_t, A_t)),
$$
 which directly approximates the optimal Q-function using some policy that generates tuples $(S_t, A_t, R_{t+1}, S_{t+1})$.

Note that the policy that generates these tuples must be soft, so we must use something like [[💰 Epsilon-Greedy]]. This algorithm is off-policy in that our behavioral policy explores and generates the training samples, and the Q-function implicitly defines the optimal greedy policy via the maximization operation.

# Approximation
Beyond the tabular case, if we represent our Q-function as a neural network, our algorithm is as follows:
1. Take action $a_i$ and observe $(s_i, a_i, s_i', r_i)$.
2. Set 
$$
y_i = r(s_i, a_i) + \gamma \max_{a_i'}Q_\phi(s_i', a_i').
$$

3. Update 
$$
\phi \leftarrow \phi - \alpha\frac{dQ_\phi}{d\phi}(s_i, a_i)(Q_\phi(s_i, a_i) - y_i).
$$


Note that this update rule is a single gradient step from [[💎 Value Iteration#Fitted Q-Iteration]]. The loss we're optimizing is essentially 
$$
\Vert Q_\phi(s_i, a_i) - y_i \Vert^2,
$$
 but we don't update the gradient until convergence to avoid overfitting to this single transition.

# Exploration
Our final policy will be deterministic: 
$$
\pi(a \vert s) = \begin{cases} 1 & \text{if $a_t = \arg\max_a Q_\phi(s, a)$} \\ 0 & \text{otherwise} \end{cases}
$$


However, during learning, our actions $a_i$ should not come from a deterministic policy since if it was suboptimal, we wouldn't be exploring any better options. Thus, our goal during learning is to encourage exploration.

One common method is [[💰 Epsilon-Greedy]], which takes the greedy action with probability $1 - \epsilon$ and a random action otherwise.

Another method is to assign probabilities according to the $Q$ values, 
$$
\pi(a \vert s) \propto \exp\{ Q_\phi(s, a) \}.
$$
 This is a somewhat "softer" version of epsilon-greedy.

# Target Network
Another issue is that in our update step, we're trying to fit $Q_\phi$ to a target $y_i$ that's also based on $Q_\phi$; is this a "moving target" since any update would also change the target that we were trying to match in the first place.

Instead, we can keep another network, called the target network $Q_{\phi'}$, that isn't updated as frequently. Our target is thus 
$$
y_i = r(s_i, a_i) + \gamma \max_{a_i'}Q_{\phi'}(s_i', a_i'),
$$
 and our update step proceeds the same as above. We occasionally update $\phi' \leftarrow \phi$ while training to keep the targets accurate, but with less frequent updates, we effectively avoid the moving target problem.

This simple update introduces an uneven amount of lag since a update right after the $\phi' \leftarrow \phi$ operation would have a recent $Q_{\phi'}$ for the target but other updates right before the target update would be matching a older (laggier) target. A popular alternative is to update the target at every step with 
$$
\phi' \leftarrow \phi' \tau\phi' + (1-\tau)\phi,
$$
 somewhat like Polyak averaging.

> [!info]
> Though usually it's not possible to linearly interpolate neural network weights, Polyak averaging offers some justification for why it works here, assuming that $\phi'$ is similar to $\phi$.

Applying this target network along with the replay buffer gives us [[👾 Deep Q-Learning]].

# Multi-Step Returns
Finally, another improvement we can make to encourage faster convergence is by borrowing the idea for [[🪜 N-Step Bootstrapping]]s. Since our Q function is hugely inaccurate at the start of training, we can do better by basing our target more on the actual rewards (our single-sample estimate). Thus, the improved target is 
$$
y_t = \sum_{t'=t}^{t+n-1} \gamma^{t-t'}r(s_{t'}, a_{t'}) + \gamma^n \max_{a_{t+n}} Q_{\phi'}(s_{t+n}, a_{t+n}).
$$


However, this theoretically requires our transitions to be on-policy. Practical implementations offer some heuristics that mitigate this issue, but it largely works well in practice.