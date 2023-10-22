Deep deterministic policy gradient (DDPG) combines [[⚔️ Deterministic Policy Gradient]] with [[👾 Deep Q-Learning]]. While the DQN works in discrete action space, we can modify it for continuous actions by using a deterministic actor-critic that removes the need for the intractable max operation. DDPG borrows the replay buffer $B$ from DQN, but we also slightly deviate from the incremental target network updates by using extremely small updates to the target instead.

Formally, our setup is below:
1. We'll have the critic $Q_\phi$ and actor $\mu_\theta$ along with targets $Q'_\phi$ and $\mu'_\theta$.
2. Our exploration policy $\mu_\beta$ is a noisy version of our deterministic one, $$\mu_\beta(s) = \mu_\theta(s) + \epsilon.$$

A single time step of the algorithm is as follows:
1. For state $s$, select action $a = \mu_\theta(s) + \epsilon$. Execute $a$ and store $(s, a, s', r)$ in $B$.
2. Sample a minibatch $\{ (s_i, a_i, s'_i, r_i) \}$ from $B$. Each tuple's target will be $$y_i = r_i + \gamma Q'_\phi(s', \mu'_\theta(s')).$$
3. Update the critic by minimizing $$\frac{1}{N}\sum_i (y_i - Q_\phi(s_i, a_i))^2.$$
4. Update the actor with the DPG gradient $$\nabla_\theta J(\theta) \approx \frac{1}{N}\sum_i \nabla_a Q_\phi(s_i, a)\nabla_\theta \mu_\theta(s_i) \vert_{a = \mu_\theta(s_i)}.$$
5. Update the targets with an extremely small $\tau$, $$\theta' \leftarrow \tau\theta + (1-\tau)\theta',\ \phi' \leftarrow \tau\phi + (1-\tau)\phi'.$$