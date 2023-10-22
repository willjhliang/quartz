Policy gradients is a class of reinforcement learning algorithms that directly optimize our objective, 
$$
\theta^* = \arg\max_\theta J(\theta)
$$
 where 
$$
J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \sum_{t=1}^T r(s_t, a_t) \right] = \mathbb{E}_{\rho(s)}[V^\pi(s)] = \mathbb{E}_{\rho(s, a)}[Q^\pi(s, a)].
$$


We seek to find the gradient of our objective with respect to $\theta$ and use [[⛰️ Gradient Descent]], 
$$
\theta \leftarrow \theta + \alpha \nabla_\theta J(\theta).
$$
 Unfortunately, directly calculating $\nabla_\theta J(\theta)$ is impossible since the trajectories depend on the environment's dynamics. However, we can derive another form, known as the policy gradient theorem: 
$$
\nabla_\theta J(\theta) \propto \sum_s \rho(s) \sum_a Q^\pi(s, a) \nabla_\theta \pi_\theta(a \vert s).
$$
 To actually calculate this value, we can further rewrite it with the [[🦄 Log Derivative Trick]], so 
$$
\nabla_\theta J(\theta) \propto \mathbb{E}_{s, a \sim \rho(s, a)}[Q^\pi(s, a) \nabla_\theta \log \pi_\theta(a \vert s)].
$$


In the proof for this theorem, the constant of proportionality is the average length of an episode for the episodic case and equal to $1$ for the infinite horizon case. We can also arrive at an equality by "capturing" this constant in the expectation by calculating over full trajectories $\tau$, 
$$
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \vert s_t) \right)\left( \sum_{t=1}^T r(s_t, a_t) \right) \right].
$$
 Intuitively, this is a supervised learning update with the gradients scaled by the reward; thus if the reward is high, then our policy is more likely to perform this trajectory again. In a sense, this is simply "trial and error."

The above formula is the core equation for many policy gradient algorithms; more generally, most can be expressed in the form 
$$
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \sum_{t=0}^T \Psi_t \nabla_\theta \log \pi_\theta (a_t \vert s_t) \right]
$$
 where $\Psi_t$ can be one of multiple choices: 
$$
\Psi_t = \begin{cases} \sum_{t'=0}^T r_{t'} & \text{total trajectory reward} \\ \sum_{t'=t}^T r_{t'} & \text{reward after $a_t$ (return)} \\ \sum_{t'=t}^T r_{t'} - b(s_t) \text{ for some baseline $b(s_t)$} & \text{baselined return} \\ Q^\pi(s_t, a_t) & \text{action-value function} \\ A^\pi(s_t, a_t) & \text{advantage function} \\ r_t + V^\pi(s_{t+1}) - V^\pi(s_t) & \text{TD residual} \end{cases}
$$
