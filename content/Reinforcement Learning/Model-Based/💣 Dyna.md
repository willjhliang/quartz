Dyna is a class of reinforcement learning algorithms that bridge model-free and model-based learning. It uses a learning algorithm that takes experiences from both the environment and the model simulation, thereby presenting two separate paths for learning—one directly through experience and one indirectly through model learning and planning.

![[20230310100640.png#invert|300]]

# Dyna-Q
One prominent example of this class is Dyna-Q, a [[🚀 Q-Learning]]-inspired algorithm. It augments the standard Q-learning updates via samples from the environment model, thus encouraging faster convergence.

The algorithm is as follows:
1. Given state $s$, pick action $a$ with [[💰 Epsilon-Greedy]] and observe $(s, a, s', r)$.
2. Update model $\hat{p}(s' \vert s, a)$ and $\hat{r}(s, a)$ using our transition. If our model is deterministic, our update is simply $$\text{Model}(s, a) \leftarrow (s', r).$$
3. Perform the Q-update using our immediate experience, $$Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma\max_{a'}Q(s', a') - Q(s, a)].$$
4. Repeat $K$ times:
	1. Sample $(s, a) \sim B$ from a buffer of past states.
	2. Simulate action $a$ on state $s$ via our model, $$(s', r) \leftarrow \text{Model}(s, a).$$
	3. Perform another Q-update with our simulated experience, $$Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma\max_{a'}Q(s', a') - Q(s, a)].$$

# Model Updates
If our environment is non-stationary, we would need to continuously update our model. Usually, this happens when our inaccurate model leads to an suboptimal policy that goes to some overestimated state; experiencing the actual value then corrects the error in our model.

A more general solution would be to directly encourage exploration. One method, similar to [[🤩 Optimistic Exploration]], is to track "time since last visit" for each transition. Then, we can augment our rewards by adding a small bonus dependent on this record, which encourages our algorithm to revisit transitions that haven't been seen in a while.

# Prioritized Sweeping
Dyna-Q selects $(s, a)$ pairs from our buffer randomly. However, some updates are more helpful than others. Specifically, the priority of a state should depend on the magnitude of the induced update in our Q-function; the bigger the update, the more likely we should sample it.

Prioritized sweeping is an upgrade to the buffer selection process that maintains a [[🔑 Priority Queue]] with the key being the update magnitude. Specifically, we replace the final simulated experience step with the following:
1. Take $(s, a)$ from the top of our priority queue.
2. Simulate action $a$, observe $(s' ,r)$, and perform Q-update $$Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma\max_{a'}Q(s', a') - Q(s, a)].$$
3. Using our model, check all $\bar{s}, \bar{a}$ that lead to $s$:
	1. Compute $\bar{r}$, the predicted reward for action $\bar{a}$ in $\bar{s}$, and compute the update magnitude $$p \leftarrow \vert \bar{r} + \gamma \max_a Q(s, a)  - Q(\bar{s}, \bar{a})\vert.$$
	2. If $p$ is above some threshold, insert $(\bar{s}, \bar{a})$ into the priority queue with key $p$.