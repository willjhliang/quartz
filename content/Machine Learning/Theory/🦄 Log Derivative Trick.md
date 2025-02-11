The log derivative trick allows us to estimate the gradient 
$$
\nabla_\theta \mathbb{E}_{x \sim p_\theta} [f(x)]
$$
 by rewriting it as a valid expectation.

Note that simply expanding out this expectation gives us the following: 
$$
\begin{align*} \nabla_\theta \mathbb{E}_{x \sim p_\theta}[f(x)] &= \nabla_\theta \int_x p_\theta(x)f(x) dx \\ &= \int_x \nabla_\theta p_\theta(x) f(x)dx \end{align*}
$$


However, $\nabla_\theta p_\theta(x)$ isn't a valid probability, so we can't directly approximate the integral as an average via [[🤔 Monte Carlo Sampling]].

Instead, we observe that 
$$
\nabla_\theta \log p_\theta(x) = \frac{\nabla_\theta p_\theta(x)}{p_\theta(x)},
$$
 which allows us to rewrite the expectation below: 
$$
\begin{align*} \nabla_\theta \mathbb{E}_{x \sim p_\theta}[f(x)] &= \nabla_\theta \int_x p_\theta(x)f(x) dx \\ &= \int_x \nabla_\theta p_\theta(x) f(x)dx \\ \\ &= \int_x p_\theta(x) \frac{\nabla_\theta p_\theta(x)}{p_\theta(x)}f(x)dx \\ &= \int_x p_\theta(x) \nabla_\theta \log p(x)f(x) dx \\ &= \mathbb{E}_{x \sim p_\theta} [\nabla_\theta \log p_\theta(x) f(x)] \\ &\approx \frac{1}{n}\sum_{i=1}^n \nabla_\theta\log p_\theta(x^{(i)}) f(x^{(i)}) \end{align*}
$$
 where $x^{(i)}$ are samples drawn from $p_\theta$.