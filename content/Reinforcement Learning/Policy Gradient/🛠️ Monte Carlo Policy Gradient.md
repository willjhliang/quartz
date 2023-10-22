The Monte Carlo policy gradient, commonly called REINFORCE, estimates the gradient at every time step using samples from the trajectory.

We start with the gradient equation $$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \vert s_t) \right)\left( \sum_{t=1}^T r(s_t, a_t) \right) \right].$$ One key observation is that our policy at time $t'$ doesn't affect reward at time $t$ for $t < t'$—this is called causality. Thus, in our gradient computation, any reward in the past shouldn't be applied to an action in the future. We can reflect this by distributing the reward summation into the gradient summation and limiting the summation to only rewards in the future, $$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \vert s_t) \left( \sum_{t'=t}^T r(s_{t'}, a_{t'}) \right) \right].$$

More succinctly, we can observe that the reward summation is exactly our return, so our gradient is $$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \vert s_t) G_t \right].$$

# Baseline
The expectation above has a high variance due to reward. One observation is that our rewards can be arbitrary; if they're all positive, the gradient for a bad trajectory would still increase its probability, even if by a little. Intuitively, we want the good trajectories to increase probability and bad trajectories to decrease probability, so we can introduce a baseline $$b = \frac{1}{N} \sum_{i=1}^N r(\tau).$$ Then, we would simply measure a trajectory's reward relative to the baseline, $$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)} [\nabla_\theta \log p_\theta (\tau)(r(\tau) - b)].$$

Note that introducing this constant doesn't change the expectation (with $N \rightarrow \infty$) but decreases variance.

### Optimal Baseline
Note that the average of the rewards is actually not the best baseline for minimal variance. A formal derivation shows that $$b^* = \frac{\mathbb{E}_{\tau \sim p_\theta(\tau)}[(\nabla_\theta \log p_\theta (\tau))^2 r(\tau)]}{\mathbb{E}_{\tau \sim p_\theta(\tau)}[(\nabla_\theta \log p_\theta (\tau))^2]}.$$

Intuitively, this baseline is the expected reward weighted by gradient magnitudes; notably, this one has different values for each parameter of the gradient whereas the simple average uses the same value for all. In practice, however, we often use the average baseline just for simplicity.