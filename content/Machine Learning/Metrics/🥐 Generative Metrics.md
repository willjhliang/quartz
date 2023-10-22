# Inception Score
Inception score assesses the samples from a generative model $p_\theta(x)$ trained on labeled datasets. The score consists of a sharpness and diversity metric, each of which require a classifier $c(y \vert x)$ that can accurate predict the label given a sample.

Sharpness defines the model's confidence in making predictions; specifically, it looks for low [[🔥 Entropy]] in the classifier's predictions, $$S = \exp \left\{ \mathbb{E}_{x \sim p_\theta} \left[ \int_y c(y \vert x) \log c(y \vert x)dy \right] \right\}.$$

Diversity measures the entropy of the classifier's marginal predictive distribution $c(y) = \mathbb{E}_{x \sim p_\theta} [c(y \vert x)]$, so $$D = \exp \left\{ -\mathbb{E}_{x \sim p_\theta}\left[ \int_y c(y \vert x) \log c(y) dy \right] \right\}.$$

Our inception score is the product of the two metrics, $$IS = D \times S.$$ The higher the score, the better the sample quality.

# Frechet Inception Distance (FID)
FID evaluates the samples from a generative model by comparing its distribution with the true data distribution.

To do this, we first run our generated samples $S$ and true samples $T$ through a classifier like InceptionNet to get its features, or activations, from one of its later layers. We can then fit a multivariate Gaussian, one for features of $S$ and one for features of $T$, to get $(\mu_S, \Sigma_S)$ and $(\mu_T, \Sigma_T)$. From here, we compare the two distributions using the standard Frechet distance $$FID = \Vert \mu_S - \mu_T \Vert^2 + \text{tr}(\Sigma_S + \Sigma_T - 2\sqrt{\Sigma_S\Sigma_T}).$$ The lower our FID, the closer the distributions and thus the better our samples.