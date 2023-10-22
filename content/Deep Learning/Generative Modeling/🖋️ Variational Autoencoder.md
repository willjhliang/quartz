Variational autoencoders are generative models that define an intractable density function using latent variable $z$: $$p_\theta(x) = \int_z p_\theta(x \vert z)p_\theta(z) dz$$
Using a similar structure as [[🧬 Autoencoder]]s, we use an encoder and decoder to map $x$ to $z$ and back. However, we use a stochastic process instead of a deterministic one.

# Optimization
We choose $p_\theta(z)$ to be a simple distribution like a Gaussian and use our decoder $p_\theta(x \vert z)$ to sample from the latent space. However, we cannot optimize the likelihood since integrating over the latent space is intractable. The solution is to use an encoder network $q_\phi(z \vert x)$ that approximates $p_\theta(z \vert x)$. In doing so, we can use the [[🧬 Evidence Lower Bound]], $$\text{ELBO} = \mathbb{E}_{q_\phi(z \vert x)}\left[\log \frac{p_\theta(x, z)}{q_\phi(z \vert x)}\right] = \mathbb{E}_{q_\phi(z \vert x)}[\log p_\theta(x \vert z)] - D_{KL}(q_\phi(z \vert x) \Vert p_\theta(z)).$$

The first term can be estimated via [[🤔 Monte Carlo Sampling]], and the second can be computed analytically since it's the divergence between two Gaussians. Thus, optimizing the ELBO as a proxy objective with a reconstruction term and a prior regularization term.

## Implementation
Concretely, we implement the network as two [[👁️ Convolutional Neural Network]]s. The first predicts $\mu_{z \vert x}$ and $\Sigma_{z \vert x}$ from $x$, and we sample $z \sim \mathcal{N}(\mu_{z \vert x}, \Sigma_{z \vert x})$. The second takes $z$ and predicts $\mu_{x \vert z}$ and $\Sigma_{x \vert z}$, then samples $x \vert z \sim \mathcal{N}(\mu_{x \vert z}, \Sigma_{x \vert z})$. To backpropagate through the sampling for $z$, we use the [[🪄 Reparameterization Trick]].

# Intuition
We use a probability distribution to force the decoder to recognize that small changes in the sampled latent vector should result in minor changes to the final image. For example, on a single training image, we can have multiple slightly-different sampled latent vectors, and the decoder must learn that they all correspond to the same image.

However, with multiple training examples, it's still possible for the encoder to generate completely different distributions with low variance and different means, essentially acting as a normal autoencoder. We can mitigate this by regularizing the probability distribution in our loss function, forcing them all to be similar to the standard normal $\mathcal{N}(0, I)$.

By regularizing the distributions, we force the latent space to be a smooth distribution where any chosen point in the space can be meaningfully reconstructed, as shown in the third graph below.

![[20230105112139.png#invert]]