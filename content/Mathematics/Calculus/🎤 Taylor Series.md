# Univariate Functions
For a univariate function $f: \mathbb{R} \rightarrow \mathbb{R}$, we can use its [[🍧 Derivative]]s to represent it as a polynomial: 
$$
T_n(x) = \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k.
$$
 This is only an approximation of the actual function in the neighborhood around $x_0$. With $n = \infty$, we have the Taylor series.

# Multivariate Functions
With multivariate functions $f: \mathbb{R}^D \rightarrow \mathbb{R}$, we'll use the [[❄️ Gradient]]. The gradient provides a linear approximation around $x_0$ as 
$$
f(x) \approx f(x_0) + (\nabla_xf)(x_0) \cdot (x - x_0)
$$
 where $(\nabla_x f)(x_0)$ is the gradient of $f$ evaluated at $x_0$.

Generalizing to higher derivatives, for a function $f$ that is smooth at $x_0$, the Taylor polynomial is 
$$
T_n(x) = \sum_{k=0}^n \frac{D_x^kf(x_0)}{k!}\delta^k
$$
 where $D_x^k f(x_0)$ is the $k$th total derivative of $f$ evaluated at $x_0$ and $\delta = x - x_0$. Similarly, the Taylor series is 
$$
f(x) = \sum_{k=0}^\infty \frac{D_x^kf(x_0)}{k!}\delta^k.
$$



Note that $\delta^k$ isn't defined for vectors. This notation is instead a $k$-fold outer product, $\delta^k = \delta \otimes \ldots \otimes \delta$. Thus, 
$$
D_x^kf(x_0)\delta^k = \sum_{i_1= 1}^D \ldots \sum_{i_k = 1}^D D_x^kf(x_0)[i_1, \ldots, i_k] \delta[i_1] \ldots \delta[i_k].
$$
