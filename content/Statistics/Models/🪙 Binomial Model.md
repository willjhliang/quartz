The binomial model measures the number of successes/failures in $n$ trials, if the probability of success in each trial is $\theta$. Then, the number of successes $y$ is 
$$
y \sim \text{Binomial}(n, \theta)
$$
 with likelihood 
$$
p(y \vert \theta) = {n \choose y} \theta^y (1-\theta)^{1-y}.
$$


The [[🥂 Conjugate]] prior distribution for this model will be 
$$
\theta \sim \text{Beta}(a, b),
$$
 which has the probability density 
$$
p(\theta) = \frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}\theta^{a-1}(1-\theta)^{b-1}.
$$
 Note that if $a = b = 1$, then $\theta \sim \text{Uniform}(0, 1)$.

With this prior, our posterior can be derived to be 
$$
p(\theta \vert y) = \theta^{y+a-1}(1-\theta)^{n-y+b-1},
$$
 which is 
$$
\theta \vert y \sim \text{Beta}(y+a, n-y+b).
$$


# Interpretation
Our posterior distribution has a mean 
$$
\mathbb{E}[\theta \vert y] = \frac{y+a}{n+a+b},
$$
 which we can interpret as a balance between our observation $y$ and prior $a, b$. If we have a lot of data, $n \rightarrow \infty$, then our mean becomes $y / n$, the MLE estimate. Similarly, if we set $a, b \rightarrow \infty$, we also have a mean that's close to $y / n$.

In this sense, $a$ and $b$ can be seen as "pseudo-counts" of success and failure trials. If we make them small—called non-informative—at $a = b  = 1$, they don't have a big effect on the posterior. The prior in this case is a uniform distribution from $0$ to $1$, which we can interpret as $\theta$ being equally probable for anything.

# Special Priors
The improper non-informative prior for $\theta$ has $a = b = 0$, so $\theta \sim \text{Beta}(0, 0)$. [[💁‍♂️ Jeffrey's Prior]] for the binomial is $\theta \sim \text{Beta}(1/2, 1/2)$.