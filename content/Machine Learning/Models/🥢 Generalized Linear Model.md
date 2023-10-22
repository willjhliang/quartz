# Theory
Generalized Linear Models generalize linear regression to non-linear data by either transforming the output $y$ with a link function or input $x$ with basis functions.
1. With link function $f$, our prediction $\hat{y} = f(\theta^\top x)$. This link is derived by associating $\theta^\top x$ with a certain exponential family distribution, chosen depending on the type of output we expect.
2. With basis functions $\phi_1 \ldots \phi_d$, our prediction $\hat{y}(x) = \theta^\top z$ where $z_i = \phi_i(x)$. This usually works well with gaussian basis functions instead of polynomial functions.

## Exponential Family
The exponential family of distributions is defined by the form $$p(y;\eta) = b(y) \exp \{ \eta T(y) - a(\eta)\}$$
where $\eta$ is the natural or canonical parameter, $T(y)$ is the sufficient statistic, and $a(\eta)$ is the log partition function.

Distributions that fall into this family include the following.
1. Bernoulli: $p(y; \phi) = \phi^y (1-\phi)^{1-y}$ where $\phi = \frac{1}{1 + e^{-\eta}}$, $T(y) = y$, $a(\eta) = \log(1+e^\eta)$, and $b(y) = 1$.
2. Gaussian (for simplicity, let $\sigma^2 = 1$): $p(y; \mu) = \frac{1}{\sqrt{2\pi}} \exp \{-\frac{1}{2}(y-\mu)^2\}$ where $\mu = \eta$, $T(y) = y$, $a(\eta) = \eta^2/2$, and $b(y) = \frac{1}{\sqrt{2\pi}}\exp\{-y^2/2\}$.
3. Multinomial, Poisson, Gamma, Exponential, Beta, and Dirichlet.

Another way we can view the link function is that it predicts the expected value of the distribution we select, with $\eta = \theta^\top x$. We choose the distribution depending on our problem: Bernoulli for classification, Gaussian for regression, and the others depending on other output requirements.

## Radial Basis Functions
Radial basis functions are especially powerful and common. They use $d$ gaussian [[🍿 Kernel]]s, $z_i$ is $x$’s position on kernel $i$’s distribution, or $k(x, \mu_i)$. These kernel centers $\mu_i$ are calculated with [[🎒 K-Means Clustering]], chosen randomly from datapoints, or estimated with nonlinear regression.

By projecting our data onto the multiple RBFs, we can perform changes to our data.
1. If $d < p$, we essentially perform dimensionality reduction. Conversely, with $d > p$, we increase dimensionality.
2. With $d = p$, we switch to dual representation that relies on pairwise relationships between our datapoints.

The following is an example of two gaussian kernels for binary classification. (This is technically a Gaussian Discriminant Analysis model, but the idea is similar.)
![[20221229103237.png#invert|400]]

Using GLMs, we use the same idea of applying weights to features but get more versatile results. Specifically, a GLM is a model that fits any $y$ that follows an exponential family of distributions; this includes Gaussian (linear regression) and Bernoulli (logistic regression).

# Model
Our model’s the same as linear regression with the link or basis function additions. We still optimize the weights $\theta$, potentially with regularization, and select $f$ or $\phi_i$ beforehand.