The poisson model measures the count of something where the number of opportunities or trials is not known. That is, $y_i = 0, 1, 2, \ldots$, and 
$$
y_i \sim \text{Poisson}(\theta)
$$
 where $\theta$ is the mean number of events. The likelihood is 
$$
p(y_i \vert \theta) = \frac{\theta^{y_i}e^{-\theta}}{y_i!},
$$
 and for multiple counts $y = (y_1, \ldots, y_n)$, 
$$
p(y \vert \theta) = \prod_i p(y_i \vert \theta) = \frac{\theta^{\sum_i y_i} e^{-n\theta}}{\prod_i y_i!} \propto \theta^{\sum_i y_i} e^{-n\theta}.
$$


The [[🥂 Conjugate]] prior distribution is 
$$
\theta \sim \text{Gamma}(a, b),
$$
 which is 
$$
p(\theta) = \frac{b^a}{\Gamma(a)}\theta^{a-1} e^{-b\theta} \propto \theta^{a-1}e^{-b\theta}.
$$


The posterior is then 
$$
p(\theta \vert y) \propto \theta^{\sum_iy_i + a - 1}e^{-(n+b)\theta},
$$
 which is another Gamma distribution, 
$$
\theta \vert y \sim \text{Gamma}(\sum_i y_i + a, n + b).
$$


# Interpretation
The posterior mean is 
$$
\mathbb{E}[\theta \vert y] = \frac{\sum_i y_i + a}{n + b}.
$$
 We can view $a$ and $b$ as pseudo-counts, where $b$ is the number of prior observations and $a$ is the sum of those observation values. 

# Special Priors
A non-informative prior has $a \approx 0, b \approx 0$. The improper non-informative prior has $b = 0$. [[💁‍♂️ Jeffrey's Prior]] is $a = 1/2, b = 0$.