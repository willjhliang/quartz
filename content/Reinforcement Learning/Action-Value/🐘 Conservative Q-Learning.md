Conservative Q-learning (CQL) is a framework that modifies the standard Q-function to perform better in [[🗼 Offline Reinforcement Learning]] settings that prevent active exploration. We can mitigate the action distribution shift problem by learning conservative action-value estimates that lower bound the true value, thus preventing our policy from exploiting inaccuracies in low-data regions of buffer $B$'s data distribution collected by $\pi_\beta$.

More concretely, the key behind CQL is to minimize values under some distribution $\mu(s, a)$ and maximize those under the data distribution; the former serves to provide conservative estimates, and the latter tightens the bound on data we do have.

First, since we're only interested in overestimation for unseen actions, we can restrict $\mu$ to be $\mu(s, a) = \rho^{\pi_\beta}(s) \mu(a \vert s)$. "Pushing down" on these estimates amounts to adding a regularization term to the Q-function objective, 
$$
\arg\min_Q \alpha \mathbb{E}_{s \sim B, a \sim \mu(a \vert s)}[Q(s, a)] + \frac{1}{2} \mathbb{E}_{(s, a, s', r) \sim B}[(Q(s, a) - y)^2]
$$
 where the target is 
$$
y = r + \gamma  \max_{a'} Q(s', a').
$$
 This update step will lower bound our action-value for all $(s, a)$, but in most cases, we only care about its expectation (which gives us state value $V^\pi$). We can tighten our lower bound in expectation by setting $\mu = \pi$ and introducing the "pushing up" term, giving us 
$$
\arg\min_Q \alpha(\mathbb{E}_{s \sim B, a \sim \mu(a \vert s)}[Q(s, a)] - \mathbb{E}_{s \sim B, a \sim \hat{\pi}_\beta(a \vert s)}[Q(s, a)]) + \frac{1}{2} \mathbb{E}_{(s, a, s', r) \sim B}[(Q(s, a) - y)^2]
$$
 where $\hat{\pi}_\beta(a \vert s)$ is the behavior (data-generating) policy estimated from frequencies in the dataset $B$.

In practice, running policy iteration with this modified evaluation objective is computationally expensive. We can instead merge the two steps together, giving us the CQL($\mathcal{R}$) algorithm: 
$$
\begin{align*} \min_Q \max_\mu\ &\alpha(\mathbb{E}_{s \sim B, a \sim \mu(a \vert s)}[Q(s, a)] - \mathbb{E}_{s \sim B, a \sim \hat{\pi}_\beta(a \vert s)}[Q(s, a)]) \\ &+ \frac{1}{2}\mathbb{E}_{(s, a, s') \sim B}[(Q(s, a) - y)^2] + \mathcal{R}(\mu) \end{align*}
$$
 where $\mathcal{R}(u)$ is some regularization, measured as [[✂️ KL Divergence]] with a prior. This prior can be chosen as a uniform distribution over actions; analytically solving the above min-max for this prior gives us CQL($\mathcal{H}$), 
$$
\min_Q \alpha \mathbb{E}_{s \sim B}\left[\log \sum_a \exp\{ Q(s, a) \} - \mathbb{E}_{a \sim \hat{\pi}_\beta(a \vert s)}[Q(s, a)]\right] + \frac{1}{2}\mathbb{E}_{(s, a, s') \sim B}[(Q(s, a) - y)^2].
$$


If we choose the prior to be the previous policy instead, we can analytically show that the first term above becomes an exponentially weighted average of Q-values from the previous policy. The latter choice of prior is usually more stable in practice.

We can now solve the above equation via a gradient update, 
$$
\theta' = \theta - \eta_Q \nabla_\theta CQL(\mathcal{R})(\theta)
$$
 for our Q-function $Q_\theta$. The effect of this optimization is that our Q-function serves as a conservative estimate to the state value and also "expands" the gap between in-distribution and out-of-distribution actions. This modified Q-update can be used directly with [[🚀 Q-Learning]] or [[🎭 Actor-Critic]] to achieve conservative versions of the two.