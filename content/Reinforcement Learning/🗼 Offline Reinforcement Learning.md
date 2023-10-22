Offline reinforcement learning aims to train generalized models that can reuse previously collected datasets. While most classic reinforcement methods learn by interacting with the world (online data collection), offline methods don't collect new data at all—it only uses the dataset it's given, much like [[🎓 Supervised Learning]].

Formally, given a dataset 
$$
D = \{ (s_i, a_i, s_i', r_i) \}
$$
 generated from some unknown policy $\pi_\beta$, with $s \sim d^{\pi_\beta}(s)$, $a \sim \pi_\beta(a \vert s)$, $s' \sim p(s' \vert s, a)$, and $r(s, a)$, our goal is to learn the best possible policy $\pi_\theta$.

# Distribution Shift
Theoretically, any off-policy algorithm can work for offline RL. However, this doesn't work well in practice due to the core problem of offline learning: distribution shift.

Simply put, some actions possible in the environment won't be present in our dataset. Whereas online methods would be able to try the action out to see if it's good or bad, offline algorithms can't; in other words, counterfactual queries are possible in the online setting but impossible offline. However, our goal is still to train a policy that performs *better* than the dataset. Thus, unlike standard supervised settings with independent and identically distributed data and an algorithm that performs well in distribution, our goal is to learn a policy that has a even better distribution.

Specifically, if we have the policy 
$$
\pi_\theta = \arg\max_{\pi} \mathbb{E}_{a \sim \pi(a \vert s)}[Q(s, a)]
$$
 that maximizes the Q-function trained with 
$$
\min_Q \mathbb{E}_{(s, a) \sim \pi_\beta(s, a)} [(Q(s, a) - y(s, a))^2],\ y(s, a) = r(s, a) + \mathbb{E}_{a' \sim \pi_\theta}[Q(s', a')],
$$
 then we're picking the best policy in the wrong distribution, effectively maximizing the error.