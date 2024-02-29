A mixture model uses multiple distributions to fit a complex distribution. We'll focus on a mixture of two Normal distributions, which looks like this: 
$$
y_i \sim \begin{cases} \text{Normal}(\mu_1, \sigma_1^2) & \text{w.p.} & \alpha \\ \text{Normal}(\mu_0, \sigma_0^2) & \text{w.p.} & 1-\alpha \end{cases}.
$$
 This is akin to two [[🛎️ Normal Model]]s where we randomly draw from each one according to probability $\alpha$.

The likelihood for $y = (y_1, \ldots, y_n)$ is 
$$
p(y \vert \theta) = \prod_i \left( \alpha \cdot \frac{1}{\sqrt{2\pi\sigma_1^2}} e^{-(y_i - \mu_1)^2/(2\sigma_1^2)} + (1-\alpha) \cdot \frac{1}{\sqrt{2\pi\sigma_0^2}} e^{-(y_i - \mu_0)^2/(2\sigma_0^2)} \right).
$$


This likelihood is very complicated, and this is because each datapoint $y_i$ has a possibility of coming from either Normal component. To make this simpler, we can introduce indicator variables 
$$
I_i = \begin{cases} 1 & \text{if} & y_i \sim \text{Normal}(\mu_1, \sigma_1^2), & \text{w.p.} & \alpha \\ 0 & \text{if} & y_i \sim \text{Normal}(\mu_0, \sigma_0^2), & \text{w.p.} & 1-\alpha \end{cases}.
$$


Incorporating $I_i$, we can rewrite our likelihood as 
$$
p(y, I \vert \theta) = \prod_i \left( \frac{\alpha}{\sqrt{2\pi\sigma_1^2}} e^{-(y_i - \mu_1)^2/(2\sigma_1^2)} \right)^{I_i} \left( \frac{1-\alpha}{\sqrt{2\pi\sigma_0^2}} e^{-(y_i - \mu_0)^2/(2\sigma_0^2)} \right)^{1-I_i}.
$$
 However, we only have $y$ and not $I$; luckily, the [[🎉 Expectation Maximization]] algorithm serves to "fill in" this missing data. The steps are as follows:
1. Start with initial values for $\theta = (\alpha, \mu_1, \mu_0, \sigma_1^2, \sigma_0^2)$.
2. Repeat the following:
	1. Expectation: calculate expected values for each $I_i$, 
$$
\hat{I}_i = \mathbb{E}[I_i \vert y_i, \theta].
$$

	2. Plug $\hat{I}_i$ into the likelihood $p(y, \hat{I} \vert \theta)$ and find new values $\hat{\theta}$ that maximize the likelihood; note that it can be easier to instead maximize the log likelihood.

The EM algorithm converges to a *fixed* set of values, providing only point estimates $\hat{\theta}$ for our parameters. ==TBD for posterior distribution===