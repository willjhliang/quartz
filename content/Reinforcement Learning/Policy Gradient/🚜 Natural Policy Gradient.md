[[🚓 Policy Gradient]] relies on gradient descent to optimize the policy, which (at least in the world of [[🎓 Supervised Learning]]) is stable and usually converges to some optimum. However, the key issue with simply using gradient descent is that unlike supervised problems that have a fixed data distribution, *the data distribution our policy gradient learns from is itself dependent on the policy*.

This means that our gradient update step affects the data distribution of our next time step. However, since our gradient was estimated using our current data distribution, it would be inaccurate for a new data distribution that's different from the current one; that is, if we make a big update to our policy that lands us in a drastically different data distribution, the training process will be unstable.

# Theory
To formalize this problem, we can consider policy gradients as a "soft" version of [[♻️ Policy Iteration]]: rather than directly setting $\pi'(s) = \arg\max_a Q^\pi(s, a)$, policy gradients shifts our policy toward that direction via the gradient 
$$
\nabla_\theta J(\theta) \propto \mathbb{E}_{s, a \sim \rho(s, a)}[Q^\pi(s, a) \nabla_\theta \log \pi_\theta(a \vert s)].
$$


In the context of policy iteration, we can view the gradient step as finding some new parameters $\theta'$ that maximizes $J(\theta') - J(\theta)$ (as that's the direction of steepest descent).

If we let $J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}[\sum_{t=1}^T \gamma^t r(s_t, a_t)]$, we can analytically derive 
$$
J(\theta') - J(\theta) = \mathbb{E}_{\tau \sim p_{\theta'}(\tau)}\left[ \sum_{t=1}^T \gamma^t A^{\pi_\theta}(s_t, a_t) \right].
$$
 Observe that maximizing this quantity is the same goal as policy iteration, where we set a new policy $\pi'$ that maximizes the advantage calculated by our old policy $\pi$.

Expanding the right hand side and applying [[🪆 Importance Sampling]], we have 
$$
J(\theta') - J(\theta) = \sum_{t=1}^T \mathbb{E}_{s_t \sim p_{\theta'}(s_t)} \left[ \mathbb{E}_{a_t \sim \pi_\theta(a_t \vert s_t)} \left[ \frac{\pi_{\theta'}(a_t \vert s_t)}{\pi_\theta(a_t \vert s_t)} \gamma^t A^{\pi_\theta}(s_t, a_t) \right] \right].
$$


Unfortunately, the first expectation samples from the distribution defined by $\theta'$, the weights we want to find. This is the formal explanation of our intuitive idea above—the state space is defined by our updated parameters $\theta'$, which we don't know yet, so a "vanilla" policy gradient step isn't actually guaranteed to improve $J(\theta')$ at all. Since we only have access to $p_\theta(s_t)$ defined by our current policy, the best we can do in this situation is to approximate $J(\theta') - J(\theta)$ by bounding the mismatch between $p_{\theta'}(s_t)$ and $p_\theta(s_t)$.

# Bounding Mismatch
In order to approximate 
$$
J(\theta') - J(\theta) \approx \bar{A}(\theta')= \sum_{t=1}^T \mathbb{E}_{s_t \sim p_\theta(s_t)} \left[ \mathbb{E}_{a_t \sim \pi_\theta(a_t \vert s_t)} \left[ \frac{\pi_{\theta'}(a_t \vert s_t)}{\pi_\theta(a_t \vert s_t)} \gamma^t A^{\pi_\theta}(s_t, a_t) \right] \right],
$$
 we need to bound the difference between $p_\theta$ and $p_{\theta'}$. Since these distributions are determined by our policy, we claim that $p_\theta$ and $p_{\theta'}$ are "close" when $\pi_\theta$ and $\pi_{\theta'}$ are close.

Formally, we define "closeness" between the policies as 
$$
\vert \pi_{\theta'}(a \vert s) - \pi_\theta(a \vert s) \vert \leq \epsilon \text{ for all $s$}
$$
 where the left hand side is the [[👟 Total Variation Distance]] between the two distributions. It can be shown that given this condition, we can bound 
$$
\vert p_{\theta'}(s_t) - p_\theta(s_t) \vert = (1-(1-\epsilon)^t) \vert p_{mistake}(s_t) - p_\theta(s_t)\vert \leq \epsilon t.
$$
 Given this bound on the state distributions, we can then lower bound the true expectation by 
$$
\bar{A}(\theta') - \sum_{t=1}^T\epsilon tC
$$
 where $C$ is a constant dependent on the time steps and maximum reward. This result shows that if we optimize this approximation (via vanilla policy gradients), we also maximize our true objective.

# Constrained Policy Updates
Our goal now is to optimize our approximation while ensuring the closeness between our old and new policies. The total variation distance is upper bounded by [[✂️ KL Divergence]], and we'll use the KL constraint 
$$
D_{KL}(\pi_{\theta'}(a_t \vert s_t) \Vert \pi_\theta(a_t \vert s_t)) \leq \epsilon
$$
 for mathematical convenience.

Note that if we compare this constraint with our original policy gradient update, which can be viewed as 
$$
\theta' \leftarrow \arg\min_{\theta'} \nabla_\theta J(\theta)^\top (\theta' - \theta) \text{ such that } \Vert \theta - \theta' \Vert^2 \leq \epsilon,
$$
 our new constraint considers the distributions defined by $\theta$ and $\theta'$ rather than the parameters themselves. Intuitively, this accounts for the possibility that a small change in parameter space can cause a big change in probabilities; thus, we're effectively assigning a small step size for large probability changes and big step size for small probability changes.

The natural policy gradient solves our objective 
$$
\max_{\theta'} \bar{A}(\theta') \text{ such that } D_{KL}(\pi_{\theta'} \Vert \pi_\theta) \leq \epsilon
$$
 with the [[🌱 Natural Gradient]]. We first note that the gradient of our objective is 
$$
\nabla_{\theta'} \bar{A}(\theta') = \sum_{t=1}^T \mathbb{E}_{s_t \sim p_\theta(s_t)} \left[ \mathbb{E}_{a_t \sim \pi_\theta(a_t \vert s_t)} \left[ \frac{\pi_{\theta'}(a_t \vert s_t)}{\pi_\theta(a_t \vert s_t)} \gamma^t \nabla_{\theta'} \log \pi_{\theta'}(a_t \vert s_t)A^{\pi_\theta}(s_t, a_t) \right] \right],
$$
 and to find the gradient at our current policy, we plug in $\theta' = \theta$ to find that 
$$
\nabla_\theta \bar{A}(\theta) = \nabla_\theta J(\theta).
$$


Following the general natural gradient, we approximate our constraint 
$$
D_{KL}(\pi_{\theta'} \Vert \pi_\theta) \approx (\theta' - \theta)^\top \mathbf{F}(\theta' - \theta), \ \mathbf{F} = \mathbb{E}_{\pi_\theta}[(\nabla_\theta \log \pi_\theta(a \vert s)) (\nabla_\theta \log \pi_\theta(a \vert s)^\top)]
$$
 where $\mathbf{F}$ is the Fisher-information matrix. The natural policy gradient update is then 
$$
\theta \leftarrow \theta + \alpha \mathbf{F}^{-1}\nabla_\theta J(\theta)
$$
 where $\alpha$ is our Lagrange multiplier. We can manually pick $\alpha$, analogous to the learning rate, or compute it as 
$$
\alpha = \sqrt{\frac{2\epsilon}{\nabla_\theta J(\theta)^\top \mathbf{F} \nabla_\theta J(\theta)}}
$$
 if we decide to set $\epsilon$ from our original KL constraint.

The result of changing the constraint is illustrated below: $(-1.0, 0.0)$ is our optimal value, and the blue and red arrows are unit directions for the standard and natural policy gradients. We can see that the red arrows are much more direct whereas the blue arrows struggle with converging the $x$ axis.

![[20230305180614.png#invert|400]]