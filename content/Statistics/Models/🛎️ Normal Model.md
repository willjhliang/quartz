The normal model measures continuous values and is commonly used for random variables whose distributions are unknown. For mean $\mu$ and variance $\sigma^2$, the model produces 
$$
y_i \sim \text{Normal}(\mu, \sigma^2)
$$
 with the probability 
$$
p(y_i \vert \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}}e^{-(x-\mu)^2/(2\sigma^2)}.
$$
 For multiple values $y = (y_1, \ldots, y_n)$, 
$$
p(y \vert \mu, \sigma^2) = \left(\frac{1}{\sqrt{2\pi\sigma^2}}\right)^n e^{-\sum_i(y_i-\mu)^2/(2\sigma^2)}.
$$


# Known Variance
Since this model has two parameters, it can be hard to analyze. We first start with a easier version, where $\sigma^2$ is known. With the [[🥂 Conjugate]] prior 
$$
\mu \sim \text{Normal}(\mu_0, \tau^2),
$$
 the posterior is 
$$
\mu \vert y \sim \text{Normal}\left( \frac{n/\sigma^2 \cdot \bar{y} + 1/\tau^2 \cdot \mu_0}{n/\sigma^2 + 1/\tau^2}, \frac{1}{n/\sigma^2 + 1/\tau^2} \right).
$$


## Interpretation
We can see $\mu_0$ is a prior guess for $\mu$ and $\tau^2$ as the uncertainty in our guess. The posterior mean is a balance between the data mean $\bar{y}$ and prior mean $\mu_0$.

## Special Priors
A non-informative prior has $\tau^2 \rightarrow \infty$. Note that at infinity, we get $p(\mu) \propto 1$, which is an improper prior. [[💁‍♂️ Jeffrey's Prior]] is the same as the improper prior $p(\mu) \propto 1$.

With this "flat" improper prior, the posterior is 
$$
\mu \vert y \sim \text{Normal}(\bar{y}, \sigma^2/n).
$$


## Posterior Prediction
Since the Normal is a conjugate for itself, the posterior predictive distribution can also be simplified, 
$$
p(y^* \vert y) = \int p(y^* \vert \mu) \cdot p(\mu \vert y)d\mu
$$
 becomes 
$$
y^* \vert y \sim \text{Normal}\left( \frac{n/\sigma^2 \cdot \bar{y} + 1/\tau^2 \cdot \mu_0}{n/\sigma^2 + 1/\tau^2}, \sigma^2 + \frac{1}{n/\sigma^2 + 1/\tau^2} \right)
$$


# Unknown Variance
Now, with unknown variance $\sigma^2$, we need a *joint* prior over both $\mu$ and $\sigma^2$.

## Fully Conjugate Prior
The [[🥂 Conjugate]] joint prior is 
$$
\begin{align*}\sigma^2 &\sim \text{InvGamma}(\nu/2, \nu\sigma_0^2/2) \\ \mu \vert \sigma^2 &\sim \text{Normal}(\mu_0, \sigma^2/\kappa)\end{align*}.
$$
 Note that for this fully conjugate prior, the prior for $\mu$ is dependent on $\sigma^2$. Also, note that $\text{InvGamma}$ means $1/\sigma^2 \sim \text{Gamma}(\cdot, \cdot)$.

The joint posterior $p(\mu, \sigma^2 \vert y)$ is a large equation, but we can break it up into 
$$
p(\mu, \sigma^2 \vert y) = p(\mu \vert \sigma^2, y) \cdot p(\sigma^2 \vert y).
$$


The marginal posterior $p(\sigma^2 \vert y)$ is 
$$
\sigma^2 \vert y \sim \text{InvGamma}\left( \frac{n+\nu-1}{2}, \frac{\sum_i (y_i - \bar{y})^2 + \frac{\kappa n}{\kappa+n}(\bar{y} - \mu_0)^2 + \nu\sigma_0^2}{2} \right).
$$


The conditional posterior $p(\mu \vert \sigma^2, y)$ is 
$$
\mu \vert \sigma^2, y \sim \text{Normal}\left( \frac{n \cdot \bar{y} + \kappa \cdot \mu_0}{n + \kappa}, \frac{\sigma^2}{n + \kappa} \right).
$$


### Interpretation
We can interpret $\mu_0$ as the prior guess for $\mu$ with uncertainty $\kappa$, and $\sigma_0^2$ is the prior guess for $\sigma^2$ with uncertainty $\nu$.

The posterior mean with a fully conjugate prior for $\sigma^2$ is 
$$
\mathbb{E}[\sigma^2 \vert y] \approx \frac{\sum_i (y_i - \bar{y})^2 + \frac{\kappa n}{\kappa+n} (\bar{y} - \mu_0)^2 + \nu\sigma_0^2}{n + \nu},
$$
 so we can also interpret $\nu$ as the prior equivalent of a pseudo-count (like $n$). Similarly, we can also interpret $\kappa$ as a pseudo-count for the posterior mean of $\mu$.

### Special Priors
The non-informative prior has $\kappa \rightarrow 0$ and $\nu \rightarrow 0$. At $0$, we have the improper prior $p(\sigma^2) \propto 1/\sigma^2$ and $p(\mu) \propto 1$. With an improper prior, our posterior is greatly simplified, becoming 
$$
\begin{align*} \sigma^2 \vert y &\sim \text{InvGamma}\left(\frac{n-1}{2}, \frac{\sum_i(y_i - \bar{y})^2}{2}\right) \\ \mu \vert \sigma^2, y &\sim \text{Normal}\left(\bar{y}, \frac{\sigma^2}{n}\right) \end{align*}.
$$


### Sampling
To sample from this distribution, we can perform the following steps:
1. Sample $x \sim \text{Gamma}((n + \nu - 1)/2, \ldots)$.
2. Set $\sigma^2 = 1/x$.
3. Sample $\mu \sim \text{Normal}(\ldots)$.

## Semi-Conjugate Prior
The fully conjugate prior has $\mu$ dependent on $\sigma^2$, which makes it difficult to set the hyperparameter $\kappa$ for $\mu$. We can get rid of this dependency with a slightly different prior, 
$$
\begin{align*}\sigma^2 &\sim \text{InvGamma}(\nu/2, \nu\sigma_0^2/2) \\ \mu \vert \sigma^2 &\sim \text{Normal}(\mu_0, \tau^2)\end{align*}.
$$


Now, $\tau^2$ takes the place of $\sigma^2/\kappa$, making $\mu$'s uncertainty hyperparameter independent. However, this causes our posterior to be semi-conjugate: part of it does not lead to a standard distribution. The conditional posterior is still standard, 
$$
\mu \vert \sigma^2, y \sim \text{Normal}\left( \frac{n/\sigma^2 \cdot \bar{y} + 1/\tau^2 \cdot \mu_0}{n/\sigma^2 + 1/\tau^2}, \frac{1}{n/\sigma^2 + 1/\tau^2} \right),
$$
 but the marginal posterior follows 
$$
p(\sigma^2 \vert y) \propto \left( \frac{n}{\sigma^2} + \frac{1}{\tau^2} \right)^{-1/2} \cdot (\sigma^2)^{-(\frac{n+\nu}{2} + 1)} \cdot \exp\left\{ -\frac{\nu \sigma_0^2}{2\sigma^2} - \frac{1}{2\sigma^2} \sum_i(y_i - \hat{\mu})^2 - \frac{1}{2\tau^2}(\hat{\mu} - \mu_0)^2 \right\}
$$
 where 
$$
\hat{\mu} = \frac{n/\sigma^2 \cdot \bar{y} + 1/\tau^2 \cdot \mu_0}{n/\sigma^2 + 1/\tau^2}.
$$


Because of this non-standard distribution, we need to adjust our sampling approach. One solution is [[🧱 Grid Sampling]], which we can use to sample $\sigma^2$ in lieu of the first and second steps above.