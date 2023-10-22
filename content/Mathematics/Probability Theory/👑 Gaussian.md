The Gaussian distribution, also called the normal distribution, is the most common distribution for continuous [[🪐 Random Variable]]s. The probability density is given by 
$$
p(x \vert \mu, \sigma^2) = \frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).
$$
 In the multivariate case, 
$$
p(x \vert \mu, \Sigma) = (2\pi)^{-D/2} \Vert \Sigma \Vert^{-1/2} \exp\left(-\frac{1}{2}(x - \mu)^\top \Sigma^{-1}(x-\mu)\right).
$$


Rather than writing the whole formula, we commonly denote 
$$
p(x) = \mathcal{N}(\mu, \Sigma) \text{ or } X \sim \mathcal{N}(\mu, \Sigma).
$$


> [!note]
> With $\mu = 0$ and $\Sigma = I$, we have the standard normal distribution.

# Marginals and Conditionals
Consider two multivariate random variables $X$ and $Y$ with 
$$
p(x, y) = \mathcal{N}\left(\begin{bmatrix}\mu_x \\ \mu_y\end{bmatrix}, \begin{bmatrix}\Sigma_{xx} & \Sigma_{xy} \\ \Sigma_{yx} & \Sigma_{yy}\end{bmatrix}\right).
$$


The conditional distribution $p(x \vert y)$ is a Gaussian, 
$$
p(x \vert y) = \mathcal{N}(\mu_{x \vert y}, \Sigma_{x \vert y})
$$
 where $\mu_{x \vert y} = \mu_x + \Sigma_{xy}\Sigma_{yy}^{-1}(y - \mu_y)$ and $\Sigma_{x \vert y} = \Sigma_{xx} - \Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx}$.

The marginal distribution $p(x)$ is also Gaussian, 
$$
p(x) = \mathcal{N}(\mu_x, \Sigma_{xx}).
$$


# Sums and Transformations
The sum of two independent Gaussian random variables with $p(x) = \mathcal{N}(\mu_x, \Sigma_x)$ and $p(y) = \mathcal{N}(\mu_y, \Sigma_y)$ is a Gaussian given by 
$$
p(x + y) = \mathcal{N}(\mu_x + \mu_y, \Sigma_x + \Sigma_y).
$$

Moreover, if $x$ and $y$ are scaled, we have 
$$
p(ax + by) = \mathcal{N}(a\mu_x + b\mu_y, a^2\Sigma_x + b^2\Sigma_y).
$$


Furthermore, if we transform $x$ using [[🗺️ Linear Mapping]] $A$ so that $y = Ax$, if $p(x) = \mathcal{N}(\mu, \Sigma)$, 
$$
p(y) = \mathcal{N}(A\mu, A \Sigma A^\top ).
$$
