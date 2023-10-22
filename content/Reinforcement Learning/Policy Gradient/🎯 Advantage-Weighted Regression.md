Advantage-weighted regression (AWR) is an off-policy algorithm similar to [[♻️ Policy Iteration]] that alternates between estimating the advantage and improving the policy using samples from a replay buffer $B$.

To start, we use the approximate constrained policy search from [[🚜 Natural Policy Gradient]]s, 
$$
\max_{\pi} J(\pi) - J(\mu) \text{ such that } \mathbb{E}_{s \sim \rho^\mu(s)}[D_{KL}(\pi(\cdot\vert s) \Vert \mu(\cdot\vert s))].
$$
 Our objective can be written in terms of advantage, 
$$
J(\pi) - J(\mu) = \mathbb{E}_{s \sim \rho^\pi(s)}\mathbb{E}_{a \sim \pi(a \vert s)}[A^\mu(s, a)] \text{ where } A^\mu(s, a) = R^\mu(s, a) - V^\mu(s),
$$
 and we'll approximate it using old state samples $s \sim \rho^\mu(s)$ from $\mu$ instead of $\pi$. Solving this approximated objective with the Lagrangian yields the optimal policy 
$$
\pi^*(a \vert s) = \frac{1}{Z(s)} \mu(a \vert s) \exp \left\{ \frac{1}{\beta}(R^\mu(s, a) - V^\mu(s))\right\}.
$$
 For a parameterization of $\pi$ with parameters $\theta$, we can then optimize the policy toward this optimum: 
$$
\begin{align*} \theta &= \arg\max_\theta \mathbb{E}_{s \sim B}[D_{KL}(\pi^*(\cdot \vert s) \Vert \pi_\theta(\cdot \vert s))] \\ &= \arg\max_\theta \mathbb{E}_{s \sim \rho^\mu(s)}\mathbb{E}_{a \sim \mu(a \vert s)}\left[ \log \pi(a\vert s) \exp \left\{ \frac{1}{\beta} (R^\mu(s, a) - V^\mu(s)) \right\} \ \right] \end{align*}
$$


Though this derivation was in terms of a single $\mu$, it can be generalized to a mixture of past policies that stores observations in a replay buffer. Then, $V^\mu(s)$ is fit on all past policies via sampling from the buffer, 
$$
V^B = \arg\min_{V}\mathbb{E}_{(s, a, r) \sim B}[\Vert r - V(s)\Vert^2].
$$


We thus have the two components needed to iteratively improve our policy. A complete AWR step is as follows:
1. Sample trajectories $\tau_i$ with $\pi$ and add it to $B$.
2. Update $V^B_\phi$ by fitting it to rewards from $B$ using the equation above.
3. Update $\pi_\theta$ by fitting it with the exponential weight, 
$$
\arg\max_\theta \mathbb{E}_{(s, a, r) \sim B}\left[\log \pi(a \vert s) \exp \left\{ \frac{1}{\beta} (r - V^B_\phi(s)) \right\}\right].
$$
