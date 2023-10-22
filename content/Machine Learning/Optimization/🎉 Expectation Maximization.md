EM is a general algorithm that trains latent variable models $p(x, z)$; it alternates between the expectation (E) and maximization (M) steps, iteratively improving the model.

For each iteration, we first estimate the hidden variables given the model, then estimate the model given the hidden variables. The formal procedure is as follows.

Given training data $D$ and a model with hidden variables $z$ and parameters $\theta$, iterate until convergence.
1. E-step estimates $P(z = k \vert D)$, the probability of hidden variables being a specific value, to find the expected value of each hidden variable $z$.
2. M-step estimates $P(\theta \vert z)$ using the probabilities of $z$ calculated above and similarly finds the MLE or MAP of the parameters.

At its core, EM is an instance of variational inference using the [[🧬 Evidence Lower Bound]] 
$$
\text{ELBO} = \log p_\theta(x) - D_{KL}(q(z \vert x) \Vert p_\theta(z \vert x)).
$$

1. E-step estimates $q(z \vert x; \theta)$, an approximation for the actual posterior $p(z \vert x; \theta)$. This makes the ELBO tight to the true likelihood.
2. M-step maximizes $\log p_\theta(x)$ with respect to $\theta$, holding $q$ fixed.
