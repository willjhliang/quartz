---
---
Proximal policy optimization (PPO) is a direct successor to [[🏦 Trust Region Policy Optimization]] that uses a different methodology to deal with the KL constraint. We still follow the natural gradient objective 
$$
\max_{\theta'} \bar{A}(\theta') \text{ such that } D_{KL}(\pi_{\theta'} \Vert \pi_\theta) \leq \epsilon,
$$
 but unlike the [[🚜 Natural Policy Gradient]] or TRPO, PPO introduces two simple ways of dealing with the constraint. First, an adaptive penalty can be used to estimate the Lagrange multiplier for this optimization; second, we can implicitly enforce the constraint by de-incentivizing updates outside of it via clipping. The latter often performs better in practice and is usually the default version of PPO.

# Adaptive Penalty
First, PPO with adaptive penalty directly incorporates the constraint into our objective by using a soft penalty; similar to the Lagrangian, we'll optimize 
$$
\max_{\theta'} \bar{A}(\theta') - \beta D_{KL}(\pi_{\theta'} \Vert \pi_\theta).
$$
 At every optimization step, if the constraint is violated more than $1.5\epsilon$, we increase $\beta \leftarrow 2\beta$. If the constraint is violated less than $\epsilon/1.5$, we decrease $\beta \leftarrow \beta/2$. This doesn't strictly enforce the KL constraint, but it maintains the same spirit—make small changes to $\pi_\theta$.

# Clipping
Alternatively, PPO with clipping (the more popular variant) simply restricts the gradient itself by clipping the importance weights. For our original natural gradient objective 
$$
\bar{A}(\theta')= \sum_{t=1}^T \mathbb{E}_{s_t \sim p_\theta(s_t)} \left[ \mathbb{E}_{a_t \sim \pi_\theta(a_t \vert s_t)} \left[ \frac{\pi_{\theta'}(a_t \vert s_t)}{\pi_\theta(a_t \vert s_t)} \gamma^t A^{\pi_\theta}(s_t, a_t) \right] \right],
$$
 we can constrain $\frac{\pi_{\theta'}(a_t \vert s_t)}{\pi_\theta(a_t \vert s_t)}$ to be within $1-\epsilon$ and $1+\epsilon$—note that $\epsilon$ is an implicit restriction for the KL constraint, not the same as the actual $\epsilon$ in the inequality.

If an importance weight is outside the clipping trust region, the gradient is zero since we use $1-\epsilon$ or $1+\epsilon$ instead; thus, the advantages achieved by going outside our trust region are effectively ignored, which results in closer updates. An equivalent interpretation is that if we maximize $\bar{A}(\theta')$, finding some $\pi_{\theta'}$ with huge importance weight on high advantages gives us the same value as finding an update that makes the importance weight $1 + \epsilon$—after clipping, both weights are the same, so there is no incentive for larger updates.

More specifically, for the clipping, we'll take a pessimistic approach and treat "good" and "bad" cases differently. These rules are also visualized below.
1. In a "good" case with positive advantage, we'll be cautious and clip the weight.
2. In a "bad" case with negative advantage, we'll allow large importance weights past the clipping to incentivize large updates that avoid the negative advantage. In other words, if $\pi_{\theta'}$ is much more likely to do something with negative advantage, we want to consider it when maximizing $\bar{A}(\theta')$ and not clip its importance.

![[20230327204255.png#invert|400]]

Putting the clipping rules together, we get the following definition: 
$$
\bar{A}(\theta') = \mathbb{E}_{\tau \sim p_\theta(\tau)}[\sum_{t=0}^T \min \{ r_t(\pi_{\theta'}, \pi_\theta) A^{\pi_\theta}(s_t, a_t), \text{clip}(r_t(\pi_{\theta'}, \pi_\theta), 1-\epsilon, 1+\epsilon) A^{\pi_\theta}(s_t, a_t) \}].
$$
 where $r_t(\pi_{\theta'}, \pi_\theta) = \frac{\pi_{\theta'}(a_t \vert s_t)}{\pi_\theta(a_t \vert s_t)}$ is the importance weight. We can now simply perform gradient ascent on $\bar{A}(\theta')$ to optimize our policy.