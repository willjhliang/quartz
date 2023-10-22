# Energy
The energy function $E(x)$ returns a scalar that measures the compatibility between features of $x$. The lower the energy, the "better" $x$ is.

> [!info]
> We can also use the energy function to model $E(x, y)$. Unlike feed-forward models that explicitly compute $y$ from $x$, the energy function implicitly models their dependencies. By doing this, it's possible to find multiple $y$ that have high compatibility with $x$, which cannot be done with an explicit model.

## Probability Distribution
To convert $E(x)$ to a probability, we use the Gibbs-Boltzmann distribution, 
$$
p(x) = \frac{1}{Z} \exp \{ -\beta E(x) \}
$$
 where partition function $Z = \sum_y \exp\{ -\beta E(x) \}$ ensures that we get a valid distribution. $\beta$ is the reciprocal of the temperature; we often let $\beta = 1$, but if we manually tune it, the distribution becomes more sharp as $\beta$ goes to infinity.

> [!info]
> This choice of this distribution is not arbitrary: since we don't have any constraints on the system, we want to use a distribution that has maximum entropy. Solving the optimization problem gives us the above distribution.

# Optimization
With our parameterization, we cannot directly optimize $p_\theta(x)$ since we can't calculate it. Moreover, maximizing $f_\theta(x)$ doesn't guarantee increasing the likelihood of our data since it's not normalized, so any optimization step may be increasing $Z(\theta)$ more than $\exp \{ f_\theta(x) \}$.

The solution to this problem is [[🖖 Contrastive Divergence]]. The core idea is to sample $x_{sample} \sim p_\theta$ and take a step in the direction of 
$$
\nabla_\theta f_\theta(x_{train}) -\nabla_\theta f_\theta(x_{sample}).
$$
 Intuitively, this makes the training data more likely than a random sample from the model.