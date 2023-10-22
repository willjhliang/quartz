Trust region policy optimization (TRPO) is an improvement on the [[🚜 Natural Policy Gradient]] with some optimizations and new guarantees. It solves the same optimization problem, $$\max_{\theta'} \bar{A}(\theta') \text{ such that } D_{KL}(\pi_{\theta'} \Vert \pi_\theta) \leq \epsilon,$$ using the same initial steps as the natural gradient:
1. Approximate KL divergence (which defines our "trust region") as $$D_{KL}(\pi_{\theta'} \Vert \pi_\theta) \approx (\theta' - \theta)^\top \mathbf{F}(\theta' - \theta), \ \mathbf{F} = \mathbb{E}_{\pi_\theta}[(\nabla_\theta \log \pi_\theta(a \vert s)) (\nabla_\theta \log \pi_\theta(a \vert s)^\top)].$$
2. Follow the gradient $$\nabla_\theta \bar{A}(\theta) = \nabla_\theta J(\theta).$$

TRPO offers two main improvements to the standard natural policy gradient: improved Fisher matrix calculation and an improvement check via line search.

First, observe that we don't actually need to directly invert $\mathbf{F}$ for our gradient descent step $$\theta \leftarrow \theta + \alpha \mathbf{F}^{-1}\nabla_\theta J(\theta).$$ Rather, what we really want to compute is $\mathbf{F}^{-1} \nabla_\theta J(\theta)$. Reformulating this problem, we can solve $$\mathbf{F}x = \nabla_\theta J(\theta)$$ for some $x$, which can be done via conjugate gradients. Note that we'll still need to find $\mathbf{F}$ for the $\alpha$ step size calculation, but we can avoid the expensive inverse calculation.

Second, since we're making some approximations, the natural gradient may not actually improve our policy. TRPO double checks the update by performing line search: iteratively reducing the update size $\alpha$ until $\bar{A}(\theta') > 0$ and $D_{KL}(\pi_{\theta'}\Vert\pi_\theta) \leq \epsilon$, thus guaranteeing an improvement.

Putting these additions together, we have the full TRPO algorithm. We'll maintain a policy $\pi_\theta$ as well as a value function $V^\pi_\phi$ for advantage estimates in the policy gradient. A single improvement step is as follows:
1. Collect $N$ trajectories $\{ \tau_i \}$ by running $\pi_\theta$ in the environment and save rewards $R^t$.
2. Compute advantage estimates $\hat{A}^t$ based on our current value function $V^\pi_\phi$.
3. Estimate the policy gradient $$\nabla_\theta J(\theta) \approx \frac{1}{N} \sum_{i=1}^N \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \vert s_t) \hat{A}^t.$$
4. Use the conjugate gradient algorithm to find $$\hat{x} \approx \mathbf{F}^{-1}\nabla_\theta J(\theta),$$ and also calculate $\mathbf{F}$ normally.
5. Update the policy with line search: find the smallest $j$ such that $\bar{A}(\theta') > 0$ and $D_{KL}(\pi_{\theta'}\Vert\pi_\theta) \leq \epsilon$ for new parameters $$\theta' = \theta + \alpha^j \sqrt{\frac{2\epsilon}{\hat{x} \mathbf{F} \hat{x}}}\hat{x}.$$
6. Fit our value function on the new policy, $$\phi' = \arg\min_\phi \frac{1}{NT} \sum_{i=1}^N \sum_{t=1}^T (V^\pi_\phi(s_t) - R_t)^2.$$