Guided Cost Learning[^1] is an extension of the [[🎲 MaxEnt]] algorithm to problems where the environment dynamics are unknown. We start from the gradient definition, 
$$
\nabla_\psi J(\psi) = \mathbb{E}_{\tau \sim \pi^*(\tau)}[\nabla_\psi r_\psi(\tau)] - \mathbb{E}_{\tau \sim p(\tau \vert e_{1:T}, \psi)}[\nabla_\psi r_\psi(\tau)],
$$
 and instead of analytically computing the second expectation, another method would be to sample from $p(\tau \vert e_{1:T}, \psi)$, which can be first derived from any soft RL algorithm from [[🎛️ Control As Inference]].

However, this would involve solving an entire learning problem at every iteration of the inverse RL step, so a natural improvement would be to "lazily" learn some policy $\pi_\theta$ to approximate second expectation. That is, rather than solving the entire problem, we'll improve our solution by a little, then use [[🪆 Importance Sampling]] to account for the approximation.

Then, we have 
$$
\nabla_\psi J(\psi) = \frac{1}{N}\sum_{i=1}^N \nabla_\psi r_\psi(\tau_i) - \frac{1}{\sum_j w_j} \sum_{j=1}^M w_j \nabla_\psi r_\psi(\tau_j)
$$
 where $\tau_j$ is sampled from our approximate policy $\pi_\theta$ and the importance weight 
$$
w_j = \frac{p(\tau)\exp r_\psi(\tau_j)}{\pi_\theta(\tau_j)} = \frac{\exp \left\{ \sum_t r_\psi(s_t, a_t) \right\}}{\prod_t \pi_\theta(a_t \vert s_t)}.
$$


Alternating between optimizing $\pi_\theta$ and $r_\psi$ in this manner gives us the guided cost learning algorithm, which produces both a reward that describes the expert trajectories and a policy that follows the reward.

# Generator and Discriminator
The alternating framework can be alternatively interpreted as the policy $\pi_\theta$ learning to be more similar to the expert $\pi^*$ and the reward trying to make expert trajectories more likely and our policy's trajectories less likely—thereby distinguishing the two.

Framed this way, we observe a natural connection to [[🖼️ Generative Adversarial Network]]s with our policy is the generator and the reward function is the discriminator.[^2] The optimal discriminator has the form 
$$
D^*(x) = \frac{p^*(x)}{p_\theta(x) + p^*(x)},
$$
 so following this formulation, we have explicitly define a discriminator for our expert and learned trajectories, 
$$
D_\psi(\tau) = \frac{p(\tau)\frac{1}{Z} \exp r(\tau)}{p_\theta(\tau) + p(\tau)\frac{1}{Z}\exp r(\tau)} = \frac{\frac{1}{Z} \exp r(\tau)}{\prod_t \pi_\theta(a_t \vert s_t) + \frac{1}{Z} \exp r(\tau)}.
$$
 From here, we can use the standard GAN objective for our discriminator, 
$$
\psi \leftarrow \arg\max_\psi \mathbb{E}_{\tau \sim \pi^*}[\log D_\psi(\tau)] + \mathbb{E}_{\tau \sim \pi_\theta}[\log (1 - D_\psi(\tau))],
$$
 and optimize the policy with the gradient 
$$
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}[\nabla_\theta \log \pi_\theta(\tau) r_\psi(\tau)].
$$


[^1]: [Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization (Finn et al, 2016)](https://arxiv.org/pdf/1603.00448.pdf)
[^2]: [A Connection Between Generative Adversarial Networks, Inverse Reinforcement Learning, and Energy-Based Models (Finn et al, 2016)](https://arxiv.org/pdf/1611.03852.pdf)