> [!abstract]
> The evidence lower bound (ELBO) is a lower bound on the log probability of our data $x$. This is often used to find an accurate variational distribution $q(z \vert x) \approx p(z \vert x)$ or to maximizing the likelihood $p(x)$.

Consider a latent variable model involving observed data $x$ and latents $z$. The evidence (or variational) lower bound (ELBO) deals with a joint distribution on observed data $x$ and latents $z$. Specifically, it lower bounds the evidence, defined here as the log likelihood of $x$: 
$$
\log p_\theta(x) \geq \mathbb{E}_{q_\phi(z \vert x)}\left[\log \frac{p_\theta(x, z)}{q_\phi(z \vert x)}\right] = \text{ELBO}
$$

where $q_\phi(z \vert x)$ is a distribution with parameters $\phi$ that we use to approximate $p_\theta(z \vert x)$. Note that another common form can be derived by rearranging terms, 
$$
\text{ELBO} = \mathbb{E}_{z \sim q} [\log p(x, z)] + H(q).
$$


---
**Inequality Proof**

The inequality derivation is as follows. We start with the likelihood and apply a variational distribution $q$ to approximate the posterior.


$$
\begin{align*}\log p_\theta(x) &= \log p_\theta(x) \int q_\phi(z \vert x) dz \\ &= \int q_\phi(z \vert x) \log p_\theta(x) \\ &= \mathbb{E}_{q_\phi(z \vert x)}[\log p_\theta(x)] \\ &= \mathbb{E}_{q_\phi(z \vert x)} \left[\log\frac{p_\theta(x, z)}{p_\theta(z \vert x)}\right] \\ &= \mathbb{E}_{q_\phi(z \vert x)} \left[ \log \frac{p_\theta(x, z)}{q_\phi(z \vert x)}\right] + \mathbb{E}_{q_\phi(z \vert x)} \left[\log \frac{q_\phi(z \vert x)}{p_\theta(z \vert x)}\right] \\ &= \mathbb{E}_{q_\phi(z \vert x)} \left[\log \frac{p_\theta(x, z)}{q_\phi(z \vert x)}\right] + D_{KL}(q_\phi(z \vert x) \Vert p(z \vert x)) \\ &\geq \mathbb{E}_{q_\phi(z \vert x)} \left[\log \frac{p_\theta(x, z)}{q_\phi(z \vert x)}\right]\end{align*}
$$


---

From the second-to-last equation, we observe that the gap between the ELBO and evidence is exactly the [[✂️ KL Divergence]] between our approximate posterior $q_\phi(z \vert x)$ and the true posterior $p(z \vert x)$.

Then, rewriting the equality, we get 
$$
\text{ELBO} = \mathbb{E}_{q_\phi(z \vert x)} \left[\log\frac{p_\theta(x, z)}{q_\phi(z \vert x)}\right] = \log p_\theta(x) - D_{KL}(q_\phi(z \vert x) \Vert p(z \vert x))
$$


From the above expression, we can see that maximizing the ELBO can achieve two objectives: maximizing likelihood and minimizing KL.
1. Maximizing likelihood is useful when we want to find the optimal $\theta$ given the observed variables $x$ we want to model.
2. Minimizing KL, equivalent to finding the best approximation $q_\phi(z \vert x) \approx p(z \vert x)$, is commonly used in variational inference.