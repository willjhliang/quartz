NeRF (Neural Radiance Field) creates a 3D scene from multiple images taken from different perspectives. In other words, given a bunch of images of an object, the network learns the color and density of the object at each coordinate in 3D space; density controls how much light passes through a particular coordinate (to model glass, for example).

The model, implemented as a MLP, generates the scene by outputting color and density for any given coordinate and viewing direction. Formally, we have $$(c, \sigma) \leftarrow f_\theta(\gamma(x), \gamma(d))$$ for color $c$, density $\sigma$, 3D coordinate $x$, and viewing direction $d$; $\gamma$ is a positional encoding $$\gamma(p) = (\sin(2^0\pi p), \cos(2^0 \pi p), \sin(2^1 \pi p), \cos(2^1 \pi p), \ldots)$$ that projects its input into higher dimensions.

# Volume Rendering
We can render an image of the scene using volume rendering, which finds the color of every pixel by projecting a ray $r$, then taking integral $$C(r) = \int_{t_n}^{t_f}T(t)\sigma(r(t))c(r(t), d)dt$$
where $T(t) = \exp\{-\int_{t_n}^\top \sigma(r(s))ds\}$ computes how much light makes it to $t$ along the ray and $d$ is the direction (angles $\theta$ and $\phi$) of the ray. The integral is computed using quadratures in implementation.

This essentially simulates light going through the ray and finds the expected color based on the probability of light reaching each position on the ray.

## Coarse and Fine
The complete system actually uses two networks, one coarse and one fine: the former gives a rough idea of the density along each ray, and the latter uses this information to sample areas that have the highest density. In doing so, we allocate more samples to regions that are more likely to be visible in the final result.

# Optimization
To optimize $\theta$, we overfit to a particular scene, and the final network predicts only for this scene. Note that this is distinctly different from most machine learning objectives that aim to generalize across models—here, we seek to generalize across views of the same scene, not across entirely different scenes. Specifically, we optimize $\theta$ by rendering an image of the model and comparing it with our ground truth images; formally, our loss is $$L = \sum_r \Vert C_c(r) - C(r) \Vert_2^2 + \Vert C_f(r) - C(r) \Vert_2^2$$ where $C_c(r)$ is our coarse rendering, $C_f(r)$ is our fine rendering, and $C(r)$ is the ground truth from the image.