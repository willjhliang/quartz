Langevin dynamics is mathematical model of molecular systems that can be used as a method for sampling from a distribution $p(x)$.

# Langevin Equation
The Langevin equation is 
$$
\lambda \frac{dx}{dt} = -\frac{\partial v}{\partial x} + \eta(t),
$$
 where we have particle position $x$, particle velocity $v$, and noise $\eta(t)$. This is also commonly written as 
$$
dx = -\nabla vdt + \sqrt{2}dw
$$
 where $w$ is Brownian motion, making $dw$ a noise term. Generalizing this form, we have 
$$
dx = f(x, t) dt + g(t)dw.
$$
 $f(x, t)$ is called the drift coefficient, and $g(t)$ is the diffusion coefficient.

# MCMC Sampling
In machine learning, Langevin dynamics refers to a [[🎯 Markov Chain Monte Carlo]] method that uses the above equation to sample from distribution $p(x)$. Specifically, our transition is 
$$
x' = x + \epsilon \nabla_x \log p(x) + \sqrt{2\epsilon} z
$$
 where $z \sim \mathcal{N}(0, I)$. $x_0$ is sampled from an arbitrary prior distribution, and as $\epsilon$ approaches $0$ and the number of iterations approaches infinity, $x$ converges to a sample from $p(x)$. Note that the only term we need in the transition step is the score function $\nabla_x \log p(x)$, which can be trained via [[🎼 Score Matching]].