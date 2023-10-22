Optimistic exploration augments the standard reward function by adding an exploration bonus, 
$$
r^+(s, a) = r(s, a) + B(N(s))
$$
 where $N(s)$ is a "count" for state $s$. As $N(s)$ increases, we design $B(N(s))$ to decrease. Many designs for $B$ exist, but some examples are below:
1. UCB: $B(N(s)) = c\sqrt{\ln n/N(s)}$.
2. MBIE-EB: $B(N(s)) = \sqrt{1/N(s)}$.
3. BEB: $B(N(s)) = 1/N(s)$.

However, we don't literally count $N(s)$ because in complex environments, we almost never visit the same state twice. Thus, we employ some similarity measures, so $N(s)$ is a measure for how similar $s$ is to our past states. There are a variety of methods to measure this pseudo-count, as described below.

# Density Modeling
We can fit a density model $p_\theta(s)$ on our past experience. The idea is that if a state $s$ is similar to what we saw before, $p_\theta(s)$ would be high.

In the simple case where we measure true counts, our density would be exactly 
$$
p(s_i) = \frac{N(s)}{n}, \ p'(s_i) = \frac{N(s) + 1}{n + 1}
$$
 where $n$ is the total number of states visited. This is a system of equations we can use to solve for our pseudo-counts $\hat{N}(s_i)$ and $\hat{n}$, so if we have the density model $p_\theta(s)$ and the updated density $p_{\theta'}$ trained on past experience plus $s_i$, 
$$
\hat{N}(s_i) = \hat{n}p_\theta(s_i),\ \hat{n} = \frac{1 - p_{\theta'}(s_i)}{p_{\theta'}(s_i) - p_\theta(s_i)}p_\theta(s_i).
$$


# Hashing
Alternatively, we can measure actual counts, but we'll instead count a hashed version of the state $\phi(s)$. If our encoding method maps similar states to the same hash, then we effectively achieve the original goal. Empirical implementations use an [[🧬 Autoencoder]] trained to reconstruct the states, and the hash is the bottleneck.

# Exemplar Modeling
Exemplar modeling implicitly captures density $p_\theta(s)$ by comparing $s$ with all past states. Intuitively, the state is novel is it's easy to distinguish from past states. Thus, if we have a classifier $D_s$ trained with positive class $\{ s \}$ and everything else in the negative class, density is 
$$
p_\theta(s) = \frac{1 - D_s(s)}{D_s(s)}.
$$


Note that if we visited $s$ before, it would also appear in the negative class. Moreover, if we include regularization, $D_s(s)$ serves as an good measure for the uniqueness of $s$.

# Error
If we have some target function $f^*(s, a)$ and a fitted function $\hat{f}_\theta(s, a)$ that uses samples $\{ (s_i, a_i) \}$ from $f^*$, $\hat{f}$ would be good at estimating $f^*$ at the samples but worse in far-away regions. Thus, we can measure the novelty of a state as the error 
$$
\Vert \hat{f}_\theta(s, a) - f^*(s, a) \Vert^2
$$
 with $\hat{f}_\theta$ trained on past states. $f^*$ can be any function, but past implementations used $f^*(s, a) = s'$ or $f^*(s, a) = f_\phi(s, a)$ where $\phi$ is completely random.