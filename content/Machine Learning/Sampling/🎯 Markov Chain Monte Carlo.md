Markov Chain Monte Carlo (MCMC) methods conduct approximate sampling for an intractable distribution $p(x)$. Its properties are guaranteed for distributions with $p(x) > 0$ for all $x$, so it's commonly applied to [[⚡️ Energy-Based Model]]s that guarantee this inequality via the Boltzmann distribution.

The core idea is to repeatedly update a state $x$ so that in enough iterations, $x$ becomes an approximately fair sample from $p(x)$. Formally, we have random state $x$ that's arbitrarily initialized and a transition distribution $T(x' \vert x)$ that specifies the change in every iteration; $T$ has the form of a [[⛓️ Markov Chain]], thus giving this algorithm its name.

Consider infinite states $x$ initialized and transitioned in parallel. At the beginning, these states have distribution $q^{(0)}$ (equivalent to whatever distribution we chose to arbitrarily initialize $x$ with), and after $t$ steps, these states form a distribution $q^{(t)}(x)$. Our goal is to make $q^{(t)}(x)$ converge to $p(x)$ via transitions 
$$
q^{(t+1)}(x') = \sum_x q^{(t)} T(x' \vert x).
$$


Our choice of $T$ varies with each MCMC algorithm; the most common solutions are [[♻️ Gibbs Sampling]] and [[🚊 Metropolis-Hastings]].

# Convergence
In order to converge to a equilibrium distribution, we need to satisfy two constraints:
1. Irreducibility: it's possible to get from any state $x$ to any other state $x'$ with non-zero probability in a finite number of steps.
2. Aperiodicity: it's possible to return to any state at any time.

Irreducibility guarantees the absence of absorbing states that present the chain from leaving, and aperiodicity prevents us from alternating back-and-forth periodically.

## Theory
The convergence of the random variable's distribution may not be intuitively obvious. The following theory explains it using the primary eigenvector of a corresponding transition matrix.

Consider a discrete variable $x$. Let $v$ describe the distribution $q$ such that $q(x = i) = v_i$. Our above transition can then be described in terms of $v$ and a transition matrix $A$, 
$$
v^{(t+1)} = Av^{(t)}
$$
 where $A_{ij} = T(x' = i \vert x = j)$.

Since the columns of $A$ represent a probability distribution, they're called stochastic matrices. By the Perron-Frobenius theorem, if all transitions have non-zero probability, the largest eigenvalue of $A$ is real and equal to $1$. As we multiply our $v$ by $A$ over and over for $t$ steps, its eigenvalues are exponentiated as follows: 
$$
v^{(t)} = A^\top v^{(0)} = (V \text{diag}(\lambda)V^{-1})^\top v^{(0)} = V \text{diag}(\lambda)^\top V^{-1}v^{(0)}
$$


Thus, all eigenvalues less than $1$ decay to zero, and under some mild conditions, $A$ has only one eigenvectors with eigenvalue $1$, so with high enough $t$, we reach the equilibrium distribution where 
$$
v' = Av = v
$$
 where $v$ being the largest eigenvector.

Generalizing this equilibrium to continuous variables, the above equation is theoretically equivalent to the following: 
$$
q'(x') = \mathbb{E}_{x \sim q} T(x' \vert x)
$$


## Detailed Balance Condition
The above explanation shows that MCMC will converge, but we don't know what it converges to. The following is a framework that relates our transitions $T$ to the equilibrium distribution.

Let $x_1$ and $x_2$ be two distinct random variables. The detailed balance condition states that if 
$$
p(x_1) T(x_2 \vert x_1) = p(x_2) T(x_1 \vert x_2)
$$
 is satisfied, we will converge to an approximation for $p$. Thus, our choice of $T$ can be shown to be valid for MCMC. This condition can be applied to [[♻️ Gibbs Sampling]] and [[🚊 Metropolis-Hastings]] to show that their choice of transition allows us to approximate our target.

# Sampling
Once the Markov chain reaches the equilibrium distribution (called "burning in" the chain during the "mixing time"), we can sample infinitely from the new distribution with 
$$
x = x' \sim T(x' \vert x).
$$
 Note that this is the same formula as changing the distribution of $x$ with $T$, but since we're in equilibrium, the distribution of $x$ doesn't change.

> [!note]
> There's no analytical way to check when we've burned in the chain. Most methods involve some heuristic sampling, but the actual point where we start approximately sampling after burning in is arbitrary.

However, consecutive samples are identically distributed but not independent, so we often take every $n$ samples to reduce the bias. Another solution is to run multiple MCMC in parallel to break up the sequential samples.

## Modes
A single chain generally hovers around a low energy region (a mode of the distribution) and rarely leaves it. As such, it's difficult for MCMC's sample to cover multiple modes of a complex distribution.

One solution is to modify our distribution to have higher entropy (less extreme peaks and valleys). In [[⚡️ Energy-Based Model]]s, we can change the $\beta$ term in the exponent; with $\beta < 1$ (called tempering), we allow for easier mixing between modes.