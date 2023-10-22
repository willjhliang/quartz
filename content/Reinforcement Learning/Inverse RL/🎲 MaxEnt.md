Maximum entropy (MaxEnt) is an [[⌛️ Inverse Reinforcement Learning]] method that uses the principles of [[🎛️ Control As Inference]] to derive a reward function from stochastic behavior.

First, recall from the inference framework that 
$$
p(e_t \vert s_t, a_t) = \exp r(s_t, a_t).
$$
 If we parameterize $r$ with parameters $\psi$ and assume that our trajectories come from an optimal function, we seek to maximize the expected probability of the trajectories given optimality, 
$$
\max_\psi p(\tau \vert e_{1:T}, \psi) \propto p(\tau) \exp \left\{ \sum_t r_\psi(s_t, a_t) \right\}.
$$
 Since the first term isn't dependent on $\psi$, this objective (using an expectation over trajectories) simplifies to 
$$
\max_\psi \mathbb{E}_{\tau \sim \pi^*(\tau)}[r_\psi(\tau) - \log Z]
$$
 where $Z$ is our partition function, 
$$
Z = \int_\tau p(\tau) \exp r_\psi(\tau) d\tau.
$$
 Intuitively, our solution should assign high reward to trajectories we saw and low reward to everything else.

Taking the gradient of our objective, we have 
$$
\nabla_\psi J(\psi) = \mathbb{E}_{\tau \sim \pi^*(\tau)}[\nabla_\psi r_\psi(\tau)] - \frac{1}{Z} \int_\tau p(\tau) \exp \{ r_\psi(\tau) \} \nabla_\psi r_\psi(\tau) d\tau.
$$
 Observe that if we move the $Z$ into the integral, we recover $p(\tau \vert e_{1:T}, \psi)$, so this gradient simplifies to 
$$
\nabla_\psi J(\psi) = \mathbb{E}_{\tau \sim \pi^*(\tau)}[\nabla_\psi r_\psi(\tau)] - \mathbb{E}_{\tau \sim p(\tau \vert e_{1:T}, \psi)}[\nabla_\psi r_\psi(\tau)].
$$
 Note that the first expectation is over the expert policy, and the second is over the soft optimal one under our current reward.

The first expectation can be found via sampling, but the second must be analytically decomposed: 
$$
\mathbb{E}_{\tau \sim p(\tau \vert e_{1:T}, \psi)}[\nabla_\psi r_\psi(\tau)] = \sum_{t=1}^T \mathbb{E}_{s_t, a_t \sim p(s_t, a_t \vert e_{1:T}, \psi)}[\nabla_\psi r_\psi(s, a)].
$$
 The probability in our expectation can be broken down into 
$$
p(a_t \vert s_t, e_{1:T}, \psi) p(s_t \vert e_{1:T}, \psi) \propto \frac{\beta(s_t, a_t)}{\beta(s_t)} \cdot \alpha(s_t)\beta(s_t) = \beta(s_t, a_t)\alpha(s_t)
$$
 where $\alpha$ and $\beta$ are our messages from control as inference. From that framework, we have the product of our backward and forward messages represent the state-action visitation probabilities 
$$
\mu(s_t, a_t) \propto \beta(s_t, a_t) \alpha(s_t).
$$
 By computing the forward and backward messages (assuming we know the dynamics), we have a method of computing the second expectation.

Thus, the complete gradient is 
$$
\nabla_\psi J(\psi) = \mathbb{E}_{\tau \sim \pi^*(\tau)}[\nabla_\psi r_\psi(\tau)] - \sum_{t=1}^T \int_{s_t, a_t} \mu(s_t, a_t) \nabla_\psi r_\psi(s_t, a_t) ds_t da_t.
$$
 The MaxEnt algorithm essentially optimizes $\psi$ with this gradient: we iteratively compute $\beta$ and $\alpha$, then update $\psi$ via $\nabla_\psi J(\psi)$.

The name of this algorithm comes from the observation that if we let $r_\psi(s, a) = \psi^\top f(s, a)$ for some feature function $f$, it can be shown that MaxEnt optimizes 
$$
\max_\psi H(\pi^{r_\psi}) \text{ such that } \mathbb{E}_{\pi^{r_\psi}}[f(s, a)] = \mathbb{E}_{\pi^*}[f(s, a)],
$$
 much like [[🃏 Feature Matching]].