Entropy regularization in reinforcement learning encourages exploration by encouraging a stochastic policy $\pi(a \vert s)$ to have higher [[🔥 Entropy]], thus allowing it to stumble on more states by chance. The ultimate goal is thus 
$$
\theta = \arg\max_\theta \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \sum_{t=0}^T \gamma^t (r(s_t, a_t) + \alpha H(\pi_\theta(\cdot \vert s_t)) \right]
$$
 where 
$$
H(\pi(\cdot\vert s_t)) = -\sum_a \pi(a \vert s_t) \log \pi(a \vert s_t).
$$
 $\alpha$ is a temperature hyperparameter that controls the degree of exploration we desire.

Our value functions follow a similar form: 
$$
\begin{align*} V^\pi(s) &= \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \sum_{t=0}^T \gamma^t (r(s_t, a_t) + \alpha \sum_{t=0}^T \gamma^t H(\pi(\cdot\vert s_t)) \Bigg\vert s_0=s \right] \\ Q^\pi(s, a) &= \mathbb{E}_{\tau \sim p_\theta(\tau)} \left[ \sum_{t=0}^T \gamma^t r(s_t, a_t) + \alpha \sum_{t=1}^T \gamma^t H(\pi(\cdot \vert s_t)) \Bigg\vert s_0 = s, a_0 = a \right] \end{align*}
$$


Note that for the action-value, we only consider action entropy after the initial action $a_0 = a$. Thus, our values are related, 
$$
V^\pi(s) = \mathbb{E}_{a \sim \pi_\theta(a \vert s)}[Q^\pi(s, a)] + \alpha H(\pi(\cdot \vert s)).
$$
 Moreover, we also have a variant of the [[🔔 Bellman Equation]]: 
$$
\begin{align*} Q^\pi(s, a) &= \mathbb{E}_{s' \sim p(s' \vert s, a), a' \sim \pi_\theta}[r(s, a) + \gamma (Q^\pi(s', a') + \alpha H(\pi(\cdot\vert s'))] \\ &= \mathbb{E}_{s' \sim p(s' \vert s, a)}[r(s, a) + \gamma V^\pi(s')] \end{align*}
$$
