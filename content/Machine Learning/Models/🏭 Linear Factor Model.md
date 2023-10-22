Linear factor models are simple models that capture the distribution $p(x)$ with latent variables, called factors $h \sim p(h)$, that model $$x = Wh + b + \epsilon$$ where $\epsilon$ is some form of noise.

# Factor Analysis
With $h \sim \mathcal{N}(0, \mathbf{I})$, we have $$x \sim \mathcal{N}(b, WW^\top + \psi)$$ where $\psi$ is a diagonal covariance matrix. This form is known as factor analysis

# Probabilistic PCA
If we force all variances to be equal to each other, we get probabilistic PCA, $$x \sim \mathcal{N}(b, WW^\top + \sigma^2 \mathbf{I})$$ or $$x = Wh + b + \sigma \epsilon$$ where $\epsilon$ is Gaussian noise. With $\sigma = 0$, we get the standard [[🗜️ Principle Component Analysis]].