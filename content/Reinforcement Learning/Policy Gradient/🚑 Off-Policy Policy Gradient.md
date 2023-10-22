Many [[🚓 Policy Gradient]] algorithms are on-policy, meaning that they require samples collected by running the same policy we're optimizing for. Once we update our policy, we need to collect new samples.

The goal of the off-policy policy gradient is to be able to update our policy using samples not from our trajectory. Let $\pi_\beta$ be our desired target policy and $\pi_\beta$ be the policy that generated our samples.

We start with the original objective and apply [[🪆 Importance Sampling]] to rewrite the expectation in terms of the sample distribution $p_\beta(\tau)$: 
$$
J(\theta) = \mathbb{E}_{\tau \sim p_{\theta}(\tau)}[r(\tau)] = \mathbb{E}_{\tau \sim p_\beta(\tau)} \left[ \frac{p_{\theta}(\tau)}{p_\beta(\tau)}r(\tau) \right]
$$


Next, for our policy gradient, we can apply the [[🦄 Log Derivative Trick]]: 
$$
\begin{align*} \nabla_{\theta} J(\theta) &= \mathbb{E}_{\tau \sim p_\beta(\tau)}\left[ \frac{\nabla_{\theta} p_{\theta}(\tau)}{p_\beta(\tau)}r(\tau) \right] \\ &= \mathbb{E}_{\tau \sim p_\beta(\tau)}\left[ \frac{p_{\theta}(\tau)}{p_\beta(\tau)} \nabla_{\theta} \log p_{\theta}(\tau) r(\tau) \right] \\ &= \mathbb{E}_{\tau \sim p_\beta(\tau)}\left[ \left( \prod_{t=1}^T \frac{\pi_{\theta}(a_t \vert s_t)}{\pi_\beta(a_t \vert s_t)} \right)\left( \sum_{t=1}^T \nabla_{\theta} \log \pi_{\theta}(a_t \vert s_t) \right)\left( \sum_{t=1}^T r(s_t, a_t) \right) \right] \end{align*}
$$


While this gradient can work on its own, there are a few adjustments we make for practicality. First, we can incorporate causality (policy at time $t$ doesn't affect reward in the past) to get 
$$
\mathbb{E}_{\tau \sim p_\beta(\tau)} \left[ \sum_{t=1}^T \nabla_{\theta} \log \pi_{\theta}(a_t \vert s_t) \left( \prod_{t'=1}^t \frac{\pi_{\theta}(a_{t'} \vert s_{t'})}{\pi_\beta(a_{t'} \vert s_{t'})} \right) \left( \sum_{t'=t}^T r(s_{t'}, a_{t'}) \left( \prod_{t''=t}^{t'} \frac{\pi_{\theta}(a_{t''} \vert s_{t''}}{\pi_\beta(a_{t''} \vert s_{t''})} \right) \right) \right].
$$


The difficulty here is that both the first and second products can be exponentially large, and we must find a way to reduce the variance of our estimates.
1. We can ignore the second product, which is an importance weight on our future rewards, to recover a [[♻️ Policy Iteration]] algorithm. This will still improve our policy, but we no longer have the actual gradient—however, an approximation will do.
2. As for the second product, we can consider only using the final importance weight as an estimation. The reasoning behind this choice is that if we look at the state-action marginal (occupancy measure) formulation of our objective, we get 
$$
\nabla_\theta J(\theta) \approx \mathbb{E}_{s \sim \rho^\beta(s)}\left[\frac{\pi_\theta(s \vert a)}{\pi_\beta(s \vert a)} Q^\pi(s, a) \nabla_\theta \log \pi_\theta(a \vert s) \right]
$$
 by assuming $\frac{\pi_\theta(s \vert a)}{\pi_\beta(s \vert a)} \approx \frac{\pi_\theta(s, a)}{\pi_\beta(s, a)}$ and ignoring the gradient's impact on $Q^\pi(s, a)$. Our original trajectory-level estimate can then use only the importance weight for each state-action pair, giving us 
$$
\nabla_{\theta} J(\theta) \approx \mathbb{E}_{\tau \sim p_\beta(\tau)} \left[ \sum_{t=1}^T \frac{\pi_{\theta}(a_t \vert s_t)}{\pi_\beta (a_t \vert s_t)} \nabla_{\theta} \log \pi_{\theta} (a_t \vert s_t) \left( \sum_{t'=t}^T r(s_{t'}, a_{t'}) \right) \right].
$$


In general, this is not the correct policy gradient. However, if $\beta$ is close to $\theta$, the error is bounded, and this method avoids the exponential blowup.