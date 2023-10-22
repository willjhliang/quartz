Deterministic policy gradient (DPG) uses a deterministic policy 
$$
a = \mu(s),
$$
 which has (by the chain rule) the gradient 
$$
\nabla_\theta J(\theta) = \mathbb{E}_{s \sim \rho(s)}[\nabla_a Q^\mu(s, a)\nabla_\theta \mu_\theta(s) \vert_{a = \mu_\theta(s)}].
$$
 Theoretically, optimizing this policy would require less samples since we wouldn't need to check the data over the entire state and action space. This gradient can be directly used in most policy gradient frameworks with the update 
$$
\theta \leftarrow \theta + \alpha \nabla_a Q^\mu(s, a) \nabla_\theta \mu_\theta(s) \vert_{a = \mu_\theta(s)}.
$$


However, usually a deterministic policy doesn't perform exploration, so we can use another behavior policy $\mu_\beta$ for sampling. Then, our gradient is 
$$
\nabla_\theta J(\theta) = \mathbb{E}_{s \sim \rho^\beta(s)}[\nabla_a Q^\mu(s, a) \nabla_\theta \mu_\theta(s) \vert_{a = \mu_\theta(s)}].
$$
 Note that we don't need importance sampling since there are no other actions to consider besides the deterministic one.