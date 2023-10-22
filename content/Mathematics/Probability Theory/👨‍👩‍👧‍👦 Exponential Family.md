The exponential family of distributions is a group of probability distributions that have favorable computation and inference properties. These distributions can also be described with parameters that stay constant with respect to the size of the data. 

A member in the family is parameterized in the form 
$$
p(x \vert \theta) = h(x) \exp(\langle \theta, \phi(x) \rangle - A(\theta))
$$
 where $\phi(x)$ is a vector of sufficient statistics that define $\theta$. $h(x)$ is a function only on $x$ that can be absorbed into the exponent via $\log h(x)$, and $A(\theta)$ is a normalization constant called the log-partition function that ensures the distribution is valid. The crux of the distribution is described as 
$$
p(x \vert \theta) \propto \exp(\theta^\top \phi(x))
$$
 where we use the dot product for the [[🎳 Inner Product]].

# Examples
Common members of the exponential family include [[👑 Gaussian]], Bernoulli, Binomial, Multinomial, Beta, and Laplace, listed respectively.
1. 
$$
p(x \vert \mu, \sigma^2) = \frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

2. 
$$
p(x \vert \mu) = \mu^x(1- \mu)^{1-x}
$$

3. 
$$
p(x \vert N, \mu) = {N \choose m} \mu^x (1-\mu)^{N - x}
$$

4. 
$$
p(x \vert N, p_1, \ldots, p_k) = \frac{n!}{x_1! \ldots x_k!} p_1^{x_1} \ldots p_k^{x_k}
$$

5. 
$$
p(x \vert \alpha, \beta) = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\Gamma(\beta)}x^{\alpha - 1}(1-x)^{\beta - 1} \text{ where } \Gamma(t) = \int_0^\infty x^{t-1}\exp(-x)dx
$$

6. 
$$
p(x \vert \mu, \gamma) = \frac{1}{2\gamma}\exp\left(-\frac{\vert x - \mu \vert}{\gamma}\right)
$$

