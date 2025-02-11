Soft actor-critic (SAC) is a stochastic off-policy algorithm that employs [[🎲 Entropy Regularization]] with [[🎭 Actor-Critic]]. We'll learn a policy $\pi_\theta$, action-value $Q^\pi_\phi$, and state-value $V^\pi_\psi$. Theoretically, we can estimate the state value from action value, but learning it stabilizes training in practice.

Following the entropy regularized definitions for the value functions, we use samples from a replay buffer $B$ to optimize the following for a given policy: 
$$
\begin{align*} J(\psi) &= \mathbb{E}_{s \sim B}[(V^\pi_\psi(s) - \mathbb{E}_{a \sim \pi_\theta(a \vert s)}[Q^\pi_\phi(s, a) - \alpha\log\pi(a \vert s)])^2] \\ J(\phi) &= \mathbb{E}_{s, a \sim B}[(Q^\pi_\phi(s, a) - (r(s, a) + \gamma\mathbb{E}_{s' \sim p(s' \vert s, a)}[V^\pi_\psi(s')]))^2] \end{align*}
$$


To update a policy from our values, we move it toward an exponential function defined by the action-value by measuring the "difference" via [[✂️ KL Divergence]], 
$$
J(\theta) = \mathbb{E}_{s \sim B} \left[ D_{KL}\left( \pi_\theta(\cdot\vert s) \Bigg\Vert \frac{\exp \{ Q^\pi_\phi(s, \cdot) \}}{Z^\pi_\phi(s)} \right) \right].
$$
 Since $Q^\pi_\phi$ is implemented as a differentiable neural network, we can optimize this with the [[🪄 Reparameterization Trick]]; that is, we'll parameterize the policy as 
$$
a_\theta(s, \epsilon) = \tanh(\mu_\theta(s) + \sigma_\theta(s) \odot \epsilon),
$$
 which allows us to rewrite 
$$
J(\theta) = \mathbb{E}_{s \sim B, \epsilon}[\log \pi_\theta(a_\theta(s, \epsilon) \vert s) - Q_\phi^\pi(s, a_\theta(s, \epsilon))],
$$
 which we can directly differentiate and minimize. Note that the partition term $Z^\pi_\phi(s)$ was ignored since it doesn't contribute to the gradient.

An alternate interpretation of the above objective is to directly maximize our state-value: then, since 
$$
V^\pi(s) = \mathbb{E}_{a \sim \pi_\theta(a \vert s)}[Q^\pi(s, a)] + \alpha H(\pi(\cdot\vert s)) = \mathbb{E}_{a \sim \pi_\theta(a \vert s)}[Q^\pi(s, a) - \alpha \log \pi(a \vert s)],
$$
 maximizing this is exactly the same as minimizing our objective $J(\theta)$ above.

This update toward the exponential can be theoretically shown to improve our action-values in soft policy iteration, which motivates its use in SAC.

# Twin-Q
In practice, to improve stability, we seek to counteract action-value estimation by training two Q-functions using the same $J(\phi)$ objective (similar to [[✌️ TD3]]). We then use the minimum of the action value estimates for the value gradient $\nabla_\psi J(\psi)$ and policy gradient $\nabla_\theta J(\theta)$.

More recently, another variant of SAC ditches the state value entirely, instead optimizing the twin Q-functions via target Q-networks obtained by Polyak averaging past parameters. Our action-value objective is 
$$
J(\phi_i) = \mathbb{E}_{(s, a, s', r) \sim B}[(Q_{\phi_i}(s, a) - y(r, s'))^2]
$$
 where the target 
$$
y(r, s') = r + \gamma[\min \{ Q_{\phi_1}'(s', a'),  Q_{\phi_2}'(s', a') \}  - \alpha \log\pi_\theta(a' \vert s')],\ a' \sim \pi_\theta(\cdot\vert s')
$$
 and $Q'$ denotes target Q-functions.

# Automatic Temperature
The entropy coefficient $\alpha$ is referred to as "temperature," and while we can set it manually as a hyperparameter, it can be better to manually define the desired minimum entropy $H_0$ instead and automatically compute $\alpha$. In this setting, our policy's objective is 
$$
\max_\pi \mathbb{E}_{\tau \sim p_\theta(\tau)}[\sum_{t=0}^T r(s_t, a_t)] \text{ such that } \forall t, H(\pi_t) \geq H_0.
$$


We can consider each time step of this objective as a [[👠 Constrained Optimization]] problem. For the final time step, we have the dual 
$$
\max_{\pi_T} \mathbb{E}[r(s_T, a_T)] = \min_{\alpha_T \geq 0} \max_{\pi_T} \mathbb{E}_{(s_T, a_T) \sim \rho^\pi(s, a)}[r(s_T, a_T) + \alpha_T H(\pi_T) - \alpha_T H_0]
$$
 where $\alpha$ is now a Lagrange multiplier. We can first find the optimal $\pi_T^*$ in terms of $a_T$, then find the optimal $a_T^*$. Then, going backwards one step, we observe that once again, the optimal $a_{T-1}^*$ can be expressed as a similar minimization, 
$$
a_{T-1}^* = \arg\min_{\alpha_{T-1} \geq 0} \mathbb{E}_{s_{T-1}, a_{T-1} \sim \rho^{\pi^*}(s, a)}[\alpha_{T-1} H(\pi^*_{T-1}) - \alpha_{T-1}H_0].
$$
 Repeating this minimization going backwards in time is equivalent to finding a global temperature parameter that minimizes 
$$
J(\alpha) = \mathbb{E}_{a_t \sim \pi(a_t \vert s_t)}[-\alpha \log \pi(a_t \vert s_t) - \alpha H_0],
$$
 which is the objective we can perform a gradient step on every iteration to automatically adjust our temperature.