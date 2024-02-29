Summary statistics describes how a [[🪐 Random Variable]] behaves, essentially summarizing the distribution.

> [!info]
> The following will assume that we're operating over continuous space. However, the equations are roughly similar for discrete random variables if we substitute the integration for a summation.

# Expected Value
The expected value of a function $g(x)$ of a random variable $X \sim p(x)$ is given by 
$$
\mathbb{E}[g(x)] = \int_x g(x)p(x)dx.
$$
 If we choose $g(x) = x$, then the expected value is called the mean, 
$$
\mathbb{E}[x] = \int_x xp(x)dx.
$$


If $X$ is multivariate, we compute the expectation over each dimension separately.

# Covariance
If we have two random variables $X$ and $Y$, their covariance 
$$
\text{Cov}[x, y] = \mathbb{E}_{X, Y}[(x - \mathbb{E}[x])(y - \mathbb{E}[y])] = \mathbb{E}[xy] - \mathbb{E}[x]\mathbb{E}[y]
$$
 measures their deviation from their respective means.

The covariance of a variable with itself is called variance, 
$$
\mathbb{V}[x] = \text{Cov}[x, x] = \mathbb{E}[(x - \mathbb{E}[x])^2] = \mathbb{E}[x^2] - \mathbb{E}^2[x].
$$
 The square root of the variance is the standard deviation $\sigma$.

If $X$ and $Y$ are multivariate, we have a slightly modified equation 
$$
\text{Cov}[x, y] = \mathbb{E}[xy^\top ] - \mathbb{E}[x]\mathbb{E}[y]^\top .
$$
 For variance, we get the covariance matrix 
$$
\mathbb{V}[x] = \begin{bmatrix} \text{Cov}[x_1, x_1] & \ldots & \text{Cov}[x_1, x_D] \\ \vdots & & \vdots \\ \text{Cov}[x_D, x_1] & \ldots & \text{Cov}[x_D, x_D] \end{bmatrix}.
$$


Another formula for variance is given by the law of variance: for two random variables $X$ and $Y$, 
$$
\mathbb{V}[x] = \mathbb{E}_Y[\mathbb{V}[x \vert y]] + \mathbb{V}_Y[\mathbb{E}[x \vert y]].
$$


## Correlation
When comparing random variables $X$ and $Y$, their variances affect the covariance. Normalizing their variance gives us correlation, 
$$
\text{corr}[x, y] = \frac{\text{Cov}[x, y]}{\sqrt{\mathbb{V}[x]\mathbb{V}[y]}} \in [-1, 1].
$$
 Another interpretation is that correlation is the covariance of the standardized random variables $x / \sigma(x)$.

Positive correlation means that if $x$ increases, $y$ is expected to increase. Negative correlation means that if $x$ increases, $y$ is expected to decrease.

# Properties
For random variables $X$ and $Y$, the expected value and covariance have the properties below.
1. 
$$
\mathbb{E}[x + y] = \mathbb{E}[x] + \mathbb{E}[y]
$$

2. 
$$
\mathbb{V}[x + y] = \mathbb{V}[x] + \mathbb{V}[y] + \text{Cov}[x, y] + \text{Cov}[y, x]
$$


Furthermore, for $y = Ax + b$, let $\mu$ and $\Sigma$ be the mean and covariance matrix of $X$. Then, we have the following.
1. 
$$
\mathbb{E}[y] = A\mu + b
$$

2. 
$$
\mathbb{V}[y] = A \Sigma A^\top
$$

3. 
$$
\text{Cov}[x, y] = \Sigma A^\top
$$


# Empirical Summaries
If we have only a small empirical sample for the random variable instead of access to the whole population, we can only use $N$ values $x_1, \ldots, x_n$ to estimate the true summary statistics. Then, our sample mean, sample variance, and sample covariance matrix equations are as follows: 
$$
\begin{align*} \bar{x} &= \frac{1}{N}\sum_{i=1}^N x_i \\ S^2 &= \frac{1}{N-1}\sum_{i=1}^N(x_i - \bar{x})^2 \\ \Sigma &= \frac{1}{N}\sum_{i=1}^N (x_i - \bar{x})(x_i - \bar{x})^\top \end{align*}
$$


> [!note]
> Note that for our sample variance, we divide by $N - 1$ instead of $N$ to account for the variance of the sample mean $\bar{x}$. Since we're basing the sample variance off an empirical estimate for the mean instead of the true mean, we have to adjust for its inaccuracy accordingly. This formula can be mathematically derived, and we can show that $\mathbb{E}[S^2] = \sigma^2$.