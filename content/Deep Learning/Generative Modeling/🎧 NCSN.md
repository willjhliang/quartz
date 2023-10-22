Noise conditional score networks (NCSNs) seek to approximate the true data distribution $p(x)$ by learning the score function 
$$
s_\theta(x) \approx \nabla_x \log p(x)
$$
 of the distribution. [[🎼 Score Matching]] is a natural way to train $s_\theta$, and we can sample from it using [[☄️ Langevin Dynamics]].

However, because our data distribution is concentrated around manifolds in the full data space (as per the [[🪐 Manifold Hypothesis]]), our model doesn't learn accurate scores for the rest of the image space, preventing convergence and mixing between modes. A visualization is below.

![[20230302083602.png#invert|600]]

The solution is to perturb the data distribution with multiple levels of noise, which populates the low-density regions and allows our model to learn scores from them. Specifically, we set noise scales $\sigma_1 > \sigma_2 > \ldots > \sigma_L$ and define 
$$
p_{\sigma_i}(x) = \int_y p(y)\mathcal{N}(x; y, \sigma_i^2 \mathbf{I})dy
$$
 as our noisy distribution for each scale. Our score model is now conditioned on the scale as well, so we have 
$$
s_\theta(x, i) \approx \nabla_x \log p_{\sigma_i}(x).
$$
 We can still train using a weighted sum of Fisher divergences 
$$
\sum_{i=1}^L \lambda(i) \mathbb{E}_{x \sim p_{\sigma_i}} [\Vert \nabla_x\log p_{\sigma_i}(x) - s_\theta(x, i) \Vert_2^2]
$$
 where $\lambda(i)$ is a weighing function set as $\lambda(i) = \sigma_i^2$ to balance the score matching loss for different variances.

To sample, we use annealed Langevin dynamics, which essentially performs Langevin dynamics for $T$ steps for each noise scale, starting from $\sigma_1$ and going to $\sigma_L$. In doing so, our randomly initialized sample will be able to use the score of the extremely noisy $p_{\sigma_1}$ and move toward the manifold.