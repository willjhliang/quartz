The natural gradient is a [[⛰️ Gradient Descent]] procedure that uses a different constraint for the optimization step. Gradient descent finds 
$$
\theta' \leftarrow \arg\min_{\theta'} \nabla_\theta J(\theta)^\top (\theta' - \theta) \text{ such that } \Vert \theta - \theta' \Vert^2 \leq \epsilon.
$$
 That is, the constraint for standard gradient descent is defined by the $L_2$ norm in parameter space. Sometimes (such as with [[🚜 Natural Policy Gradient]]), we care more about the constraint in the probability space defined by $\theta$. That is, we want to solve the following instead: 
$$
\theta' \leftarrow \arg\min_{\theta'} \nabla_\theta J(\theta)^\top (\theta' - \theta) \text{ such that } D_{KL}(p_\theta \Vert p_{\theta'}) \leq \epsilon.
$$


To solve this, we first need to make an approximation. It's difficult to directly use the [[✂️ KL Divergence]] constraint in our optimization, but we can substitute 
$$
D_{KL}(p_{\theta'} \Vert p_\theta) \approx (\theta' - \theta)^\top \mathbf{F}(\theta' - \theta)
$$
 where $\mathbf{F}$ is the Fisher-information matrix 
$$
\mathbf{F} = \mathbb{E}_{\pi_\theta}[(\nabla_\theta \log p_\theta(a \vert s)) (\nabla_\theta \log p_\theta(a \vert s)^\top)].
$$
 We can approximate $\mathbf{F}$ via samples from our distribution.

Then, solving the Lagrangian, we get the gradient step 
$$
\theta \leftarrow \theta + \alpha \mathbf{F}^{-1}\nabla_\theta J(\theta)
$$
 where $\alpha$ is our Lagrange multiplier. We can pick $\alpha$, analogous to the learning rate, or compute it as 
$$
\alpha = \sqrt{\frac{2\epsilon}{\nabla_\theta J(\theta)^\top \mathbf{F} \nabla_\theta J(\theta)}}
$$
 if we decide to set $\epsilon$.