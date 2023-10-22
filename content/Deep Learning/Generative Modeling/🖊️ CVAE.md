The standard [[🖋️ Variational Autoencoder]] generation process can't be controlled. That is, we don't give any input into the generation. This is because the encoder $q_\phi(z \vert x)$ models $z$ directly on $x$ without considering any external information, and our prior only models $p_\theta(z)$, the latent distribution.

To remedy this, we can introduce a conditioning term (a label or prompt, for example) $y$ to the encoder and decoder to get $q_\phi(z \vert x, y)$ and $p_\theta(z \vert y)$ respectively. Then, our generation can be written as 
$$
p_\theta(x \vert y) = \int_z p_\theta(x \vert z, y) p_\theta(z \vert y),
$$
 and we can optimize the modified ELBO 
$$
\mathbb{E}_{q_\phi(z \vert x, y)}[\log p_\theta(x \vert z, y)] - D_{KL}(q_\phi(z \vert x, y) \Vert p_\theta(z \vert y)).
$$


# GSNN
One drawback with the formulation above is that our recognition network $q_\phi(z \vert x, y)$ is used during training whereas the prior $p_\theta(z \vert y)$ is used during generation. Through the KL term closes the difference, this difference can still be significant empirically.

Alternatively, we can set them to be equal, $q_\phi(z \vert x, y) = p_\theta(z \vert x)$, which gives us the Gaussian stochastic neural network (GSNN). The loss for training this CVAE variant is just the first term of the ELBO since our KL is $0$.