Decisions in reinforcement learning are a balance of exploration and exploitation. The former tries new actions that might find better rewards, and the latter repeats past actions that were known to yield high reward.

Exploitation is simply done by choosing the action that has the highest estimated value. Exploration, on the other hand, can be implemented in multiple ways; all share the key idea of entering new states, but their definitions for "new" vary.

# Bandits
As a partial justification for exploration techniques, we often analyze their performance on [[🎰 Multi-Armed Bandit]]s. If we choose action $a_i$, let the reward be defined by 
$$
r(a_i) \sim p_{\theta_i}(r_i)
$$
 where $\theta_i$ controls the reward distribution. This defines a [[🪐 POMDP]] with state $s = \{ \theta_1, \ldots, \theta_n \}$. Solving this POMDP gives us the optimal exploration strategy, but this is generally impossible since the belief state is huge; however, we can assess the goodness of an exploration algorithm by comparing it with the optimal POMDP solver. Formally, we measure regret at time step $T$ as 
$$
\text{Reg}(T) = T \mathbb{E}[r(a^*)] - \sum_{t=1}^Tr(a_t)
$$
 where $\mathbb{E}[r(a^*)]$ is the expected reward of the best action.

# Methods
The most basic exploration method is [[💰 Epsilon-Greedy]], but there are a variety of other methods that provide theoretical guarantees on regret. Moreover, while epsilon-greedy is entirely random, these methods have some inherent strategy to their selection for exploratory actions.

==TODO CLEAN UP==

## Optimistic Exploration
[[🤩 Optimistic Exploration]] adds a variance estimate onto the standard reward that essentially provides a bonus for less-explored actions. Generally, our decision is 
$$
a = \arg\max_{a} \hat{\mu}_a + C\sigma_a
$$
 where $\hat{\mu}_a$ is the average reward for action $a$ and $\sigma_a$ is the variance estimate. One such example is 
$$
C\sigma_a = \sqrt{\frac{2\ln T}{N(a)}}
$$
 where $N(a)$ is the number of times we picked action $a$. Lower $N(a)$ thus yields a higher bonus, encouraging our policy to pick the less-explored action. It can be shown that this example yields 
$$
\text{Reg}(T) = O(\log T),
$$
 which is best possible.

## Thompson Sampling
[[❓ Thompson Sampling]] approximates our POMDP belief state $\hat{p}(\theta_1, \ldots, \theta_n)$ by repeating the following:
1. Sample $\theta_1, \ldots, \theta_n \sim \hat{p}(\theta_1, \ldots, \theta_n)$.
2. Pretend these parameters are correct and take the optimal action.
3. Observe the outcome and update our model.

## Information Gain
[[💬 Information Gain Exploration]] chooses the action that gives us the most information, defined by [[💰 Information Gain]]. Specifically, if we let $z$ be our quantity of interest (for example $\theta$) estimated via $\hat{p}(z)$, $a$ is our action, and $y$ is our observation after $a$ (for example $r(a)$), then we have 
$$
IG(y \vert a) = \mathbb{E}_y[H(\hat{p}(z)) - H(\hat{p}(z) \vert y) \vert a].
$$


## Entropy Regularization
[[🎲 Entropy Regularization]]