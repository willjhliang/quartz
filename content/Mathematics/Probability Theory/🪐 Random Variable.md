A random variable $X$ is a function that maps probabilistic outcomes $\omega$ to quantities of interest $x$. In layman's terms, $X$ is a variable that can take on different states at random.

Let $\mathcal{T}$ be the target space containing all such $x$. A random variable can be expressed as $X: \Omega \rightarrow \mathcal{T}$ where $\Omega$ is the outcome space, defined in context of a [[🎲 Probability Distribution]].

> [!info]
> For example, in the case of tossing two coins, $\Omega = \{ hh, ht, th, tt \}$. If we're interested in the number of heads, $\mathcal{T} = \{ 0, 1, 2 \}$ and $X(hh) = 2$, $X(ht) = X(th = 1)$, and $X(tt) = 0$.

# Transformations
Sometimes, we're given random variable $X$ and a transformation $Y = U(X)$. Given the distribution for $X$, our task is to find the distribution for $Y$. The two core methods are detailed below.

## Distribution Function
This technique first finds the cdf of $Y$, then differentiates it to get the pdf.
1. Find $F_Y(y) = P(Y \leq y)$ by substituting $U(X)$ into $Y$.
2. Differentiate $f(y) = \frac{d}{dy}F_Y(y)$ to get the pdf.

## Change of Variables
The change of variables technique uses similar steps from the distribution function to generalize one final formula, 
$$
f(y) = f_x(U^{-1}(y)) \cdot \left\vert \frac{d}{dy} U^{-1}(y)\right\vert.
$$
