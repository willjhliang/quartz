The off-policy actor critic introduces a replay buffer $R$ that keeps track of all past $(s, a, s', r)$ tuples that uses this buffer to train its value function estimate rather than samples from the current policy's trajectory.

In other to work with samples from a past policy, we need to modify our on-policy [[🎭 Actor-Critic]] algorithm in two places.
1. First, the value estimate $y_i = r_i + \gamma \hat{V}_\phi^\pi(s_i')$ is incorrect since this estimate would be measuring the value of $s_i$ based on the action taken by the old policy, not the current one.
2. Second, our gradient step's $\nabla_\theta \log \pi_\theta(a_i \vert s_i)$ needs to be estimated as an expectation over the current policy, which requires some correction like in [[🚑 Off-Policy Policy Gradient]].

# Value Estimation
To address the first problem, we introduce the action-value 
$$
Q^\pi(s_t, a_t) = \sum_{t' = t}^T \mathbb{E}_{(s_{t'}, a_{t'}) \sim \pi_\theta}[r(s_{t'}, a_{t'}) \vert s_t, a_t]
$$
 which has no requirement that $a_t$ comes from our current policy. Thus, we'll train a network to predict the Q-function instead, and our objective is 
$$
\frac{1}{N}\sum_{i=1}^N \Vert \hat{Q}_\phi^\pi(s_i, a_i) - y_i \Vert^2 \text{ where } y_i =r_i + \gamma \hat{Q}_\phi^\pi(s_i', a_i').
$$
 Note that $a_i'$ is sampled from our current policy. This is essentially a single-sample estimate for 
$$
V^\pi(s_t) = \mathbb{E}_{a_t \sim \pi_\theta(a_t \vert s_t)}[Q(s_t, a_t)].
$$


# Action Sampling
As for the second issue, we'll sample $a_i^\pi \sim \pi_\theta(a \vert s_i)$ from our current policy and calculate the gradient 
$$
\nabla_\theta J(\theta) \approx \frac{1}{N}\sum_{i=1}^N \nabla_\theta \log \pi_\theta(a_i^\pi \vert s_i) \hat{A}^\pi(s_i, a_i^\pi).
$$
 This makes a distinction between the action used to update our action-value estimate and the action used to update our policy; the former can use any action from the replay buffer $R$ while the latter must come from the current policy.

In practice, since computing advantage requires some estimate of the state-value, we use the action-value directly instead, 
$$
\nabla_\theta J(\theta) \approx \frac{1}{N}\sum_{i=1}^N \nabla_\theta \log \pi_\theta(a_i^\pi \vert s_i) \hat{Q}_\phi^\pi(s_i, a_i^\pi).
$$
 Though this would increase our variance by getting rid of the baseline, we can make up for this by simply sampling $a_i^\pi$ multiple times from our policy and running this update from each one—the key idea here is that $a_i^\pi$ can come directly from our policy and has no reliance on the actual environment.