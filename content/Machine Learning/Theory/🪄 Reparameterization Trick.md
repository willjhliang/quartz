In stochastic models like the [[🖋️ Variational Autoencoder]], we sometimes have a sampling process in the middle of our model. However, during training, [[🤝 Backpropagation]] cannot flow through a random node because the randomness is also determined by parameters we're seeking to optimize.

Let our sampling process be 
$$
z \sim \mathcal{N}(\mu, \sigma^2).
$$
 We cannot backpropagate through $z$ directly, but we can instead reparameterize $z$ as follows: 
$$
z = \mu + \sigma \cdot \epsilon \text{ where } \epsilon \sim \mathcal{N}(0, 1)
$$


This essentially offsets the stochastic process to a separate part of our computation graph, allowing the gradient to flow through $z$. The following shows the difference between the two computations.

![[20230219223033.png#invert|500]]

# Formal Justification
Consider the gradient of 
$$
\mathbb{E}_{p(z)}[f_\theta(z)].
$$
 If we can differentiate $f_\theta(z)$, we get: 
$$
\begin{align*}\nabla_\theta \mathbb{E}_{p(z)}[f_\theta(z)] &= \nabla_\theta \left[\int_z p(z)f_\theta(z)dz\right] \\ &= \int_z p(z) [\nabla_\theta f_\theta(z)] dz \\ &= \mathbb{E}_{p(z)} \left[\nabla_\theta f_\theta(z)\right]\end{align*}
$$


However, if our density $p(z)$ is parameterized by $\theta$, we have: 
$$
\begin{align*}\nabla_\theta \mathbb{E}_{p_\theta(z)}[f_\theta(z)] &= \nabla_\theta \left[\int_z p_\theta(z)f_\theta(z)dz\right] \\ &= \int_z \nabla_\theta [p_\theta(z) f_\theta(z)] dz \\ &= \int_z f_\theta(z)\nabla_\theta p_\theta(z)dz + \int_z p_\theta(z) \nabla_\theta f_\theta(z)dz\end{align*}
$$


The first term requires the gradient of $p_\theta(z)$, which we can't find. However, if we reparameterize $z = g_\theta(\epsilon, x)$, we can differentiate $g_\theta$ and calculate the entire gradient.