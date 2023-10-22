Control variates is a method used for variance reduction in [[🤔 Monte Carlo Sampling]]. Consider the mean 
$$
\mu = \mathbb{E}_{x \sim p}[f(x)].
$$
 Then, define 
$$
f'(x) = f(x) + c(h(x) - \mathbb{E}_{x \sim p}[h(x)])
$$
 where $h(x)$ is another random variable called the control variate. Observe that 
$$
\mathbb{E}_{x \sim p}[f'(x)] = \mathbb{E}_{x \sim p}[f(x)] + 0,
$$
 so a mean estimate for $f'(x)$ is an unbiased estimate for $f(x)$.

However, the variance is 
$$
\mathbb{V}[f'(x)] = \mathbb{V}[f(x)] + c^2\mathbb{V}[h(x)] + 2c\text{Cov}(f(x), h(x)).
$$
 To minimize this value, we differentiate with respect to $c$ and get 
$$
\mathbb{V}[f'(x)] = \mathbb{V}[f(x)] - \frac{(\text{Cov}(f(x), h(x))^2}{\mathbb{V}[h(x)]} = (1 - \rho_{f, h})^2 \mathbb{V}[f(x)]
$$
 where $\rho_{f, h}$ is the [[📚 Summary Statistics#Correlation]] between the two random variables. Thus, if we have $h(x)$ that's positively correlated with $f(x)$ with a easily-computable mean, we can reduce the variance of our original estimate.