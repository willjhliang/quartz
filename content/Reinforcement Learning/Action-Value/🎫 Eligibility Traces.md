Eligibility traces bridges function approximation [[🪙 Monte Carlo Control]] and [[⌛️ Temporal Difference Learning]] by averaging [[🪜 N-Step Bootstrapping]]. For $n$-step return 
$$
G_{t:t+n} = R_{t+1} + \gamma R_{t+2} + \ldots + \gamma^{n-1} R_{t+n} + \gamma^n V(S_{t+n}),
$$
 the $\lambda$-return is defined as 
$$
G^\lambda_t = (1-\lambda)\sum_{n=1}^\infty \lambda^{n-1}G_{t:t+n}.
$$
 This is a exponentially-weighted average with $(1-\lambda)$ in front to normalize the sum. In the finite horizon, we let post-termination returns be the conventional return $G_t$, so 
$$
G_t^\lambda = (1-\lambda)\sum_{n=1}^{T-t-1}\lambda^{n-1}G_{t:t+n} + \lambda^{T-t-1}G_t.
$$


Note that with $\lambda = 0$, we get the one-step TD return, and with $\lambda=1$, we have a Monte Carlo estimate.

However, this formulation isn't commonly used because it requires complex computations for the $n$-step returns. We can instead use an eligibility trace $z_t$ that has the same dimension as our weights $\theta_t$. This vector represents the magnitude of the update performed to $\theta_t$ at each time step, and it can viewed as a "backward" way of updating the weights rather than the "forward" return method above.

Specifically, we initialize $z = 0$, and at each transition, 
$$
z_t = \gamma \lambda z_{t-1} + \nabla_\theta V_\theta(S_t).
$$
 The eligibility trace is then used to update our weights, 
$$
\theta_{t+1} = \theta_t + \alpha E z_t
$$
 where $E$ is some error measure. From this formulation, we can see that the eligibility trace essentially captures the "recency" of updates to our weights; similar to $\lambda$-return, it places more emphasis on the most recent values.

# TD($\lambda$)
TD($\lambda$) is the most common implementation of eligibility traces. Our error $E$ is set as the TD error 
$$
\delta_t = R_{t+1} + \gamma V_\theta(S_{t+1}) - V_\theta(S_t),
$$
 and our weight update can be performed at every time step, similar to standard [[⌛️ Temporal Difference Learning#TD(0)]]. Observe that again, with $\lambda = 0$, we (quite literally) get TD(0), and with $\lambda = 1$, we get TD(1), a Monte Carlo variant that discounts rewards.