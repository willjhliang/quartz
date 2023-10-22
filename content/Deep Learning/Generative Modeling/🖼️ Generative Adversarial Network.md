GANs are generative models that learn via an adversarial process, which implicitly models the data density function. It consists of a generative and a discriminative network; the former generates samples from a random latent space, and the latter ties to distinguish between generative outputs and samples from the training data.

Specifically, we input random noise $z \sim p(z)$ into the generator $G_\phi(z)$ to get an image, and the discriminator $D_\theta(x)$ predicts the likelihood of real images. Treating this as a two-player game, our minimax objective is $$\min_\phi \max_\theta \mathbb{E}_{x \sim p_{data}} [\log D_\theta(x)] + \mathbb{E}_{z \sim p(z)} [\log (1 - D_\theta(G_\phi(z))].$$

For an optimal discriminator $D^*(x) = \frac{p_{data}(x)}{p_{data}(x) + p_G(x)}$, our objective can be written as $$\begin{align*} V(G, D^*) &= D_{KL}( p_{data} \Vert (p_{data} + p_G)/2) + D_{KL}(p_G \Vert (p_{data} + p_G)/2) - \log 4 \\ &= 2D_{JSD}(p_{data}, p_G) - \log 4 \end{align*}$$ where Jenson-Shannon Divergence $$D_{JSD}(p, q) = \frac{1}{2}(D_{KL}(p \Vert (p+q)/2) + D_{KL}(q \Vert (p+q)/2)).$$

Minimizing this objective is this analogous to making the generator's distribution close to the data distribution.

For training, we alternate between gradient ascent on slightly-modified parts from the minimax objective: $$\begin{align*} \max_\theta [\mathbb{E}_{x \sim p_{data}} \log D_\theta(x) + \mathbb{E}_{z \sim p(z)}\log (1 - D_\theta(G_\phi(z))] &\text{ for discriminator} \\ \max_\phi \mathbb{E}_{z \sim p(z)} \log(D_\theta(G_\phi(z)) &\text{ for generator} \end{align*}$$

# Challenges
The above theory, when applied empirically, is often unstable with a few main problems.
1. Unstable optimization and oscillating loss likely caused by imbalance between discriminator and generator effectiveness or oscillation between modes.
2. Generator mode collapse, causing it to generate duplicates consisting of modes of the distribution.

# f-GAN
Instead of using the Jenson-Shannon Divergence, we can generalize the GAN objective to any [[🪭 F-Divergence]], $$D_f(P \Vert Q) = \int_x q(x) f\left(\frac{p(x)}{q(x)}\right)dx$$ for some $f$. However, this is an expectation over only one distribution, and we need to convert it into expectations for both the data and model distributions.

To do this, we use the Fenchel conjugate, defined as $$f^*(t) = \sup_{u \in \text{dom}_f} \{ ut - f(u) \}.$$ Intuitively, $f^*(t)$ represents linear lower bounds on $f$ with slope $t$. Furthermore, it has the property that $f^{**} = f$, so we have $$f(u) = \sup_{t \in \text{dom}_{f^*}} \{tu - f^*(t)\}.$$

Plugging this into our $f$-divergence, we get the following: $$\begin{align*} D_f(P \Vert Q) &= \int_x q(x) \sup \left\{ t\frac{p(x)}{q(x)} - f^*(t) \right\} dx \\ &\geq \sup_{T} \left\{ \int_x p(x)T(x)dx - \int_x q(x)f^*(T(x))dx \right\} \\ &= \sup_{T} \{ \mathbb{E}_{x \sim p} [T(x)] - \mathbb{E}_{x \sim q} [f^*(T(x))] \} \end{align*}$$

We thus have a lower bound on our objective and can choose any $f$-divergence to optimize. We can parameterize $T$ by $\phi$ and the model distribution by $\theta$ to get $$\min_\theta \max_\phi \mathbb{E}_{x \sim p_{data}} [T_\phi(x)] - \mathbb{E}_{x \sim p_{G_\theta}} [f^*(T_\phi(x))],$$ which is a generalization of the original GAN objective.

# Wasserstein GAN
The Wasserstein GAN notes that our divergence requires the support of $q$ to cover the support of $p$; if it doesn't then, there are discontinuities in the divergence function.

To avoid this limitation, we can instead use the Wasserstein distance $$D_w(p, q) = \int_{\gamma \in \sqcap(p, q)} \mathbb{E}_{(x, y) \sim \gamma} [\Vert x - y \Vert_1]$$ where $\sqcap(p, q)$ consists of all joint distributions with marginals $p(x)$ and $q(y)$. We can interpret $\gamma(y \vert x)$ as the "earth moving" plan that warps $p(x)$ to $q(y)$.

To convert this into two expectations, we use the Kantorovich-Rubinstein duality, $$D_w(p, q) = \sup_{\Vert f \Vert_L \leq 1} \mathbb{E}_{x \sim p} [f(x)] - \mathbb{E}_{x \sim q}[f(x)]$$ where $\Vert f \Vert_L \leq 1$ means the Lipschitz constant of $f(x)$ is $1$. Applying the general formula above to our GAN, we get $$\min_\theta \max_\phi \mathbb{E}_{x \sim p_{data}} [D_\phi(x)] - \mathbb{E}_{z \sim p(z)}[D_\phi(G_\theta(z))].$$

# Progressive Growing
Training instability often arises from the generator and discriminator improving at different levels. To address this problem, we can start by generating small 4x4 resolution images, then slowly scale up the resolution by adding more layers onto the generator and discriminator. This not only encourages faster convergence but also allows the models to see many more images during training due to smaller hardware requirements in the early stages.

![[20230315220136.png#invert|400]]

# BiGAN
BiGAN infers the latent representation of a sample $x$ by training an encoder network $E$ along with the generator $G$; the former maps $x \sim p_{data}$ to $z$ and the latter maps $z \sim p(z)$ to $x$.

Our discriminator objective is to differentiate $z, G(z)$ and $E(x), x$. Training adversarially this way allows us to use $E$ to move from images to the original noise.
