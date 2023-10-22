Partially observable Markov Decision Processes (POMDPs) generalize [[🌎 Markov Decision Process]] to make a distinction between the environment's states $s_t$ and agent's observations $o_t$.

On top of the states $S$, actions $A$, and rewards $R$ that define $$p(s_{t+1} \vert s_t, a_t),\ r(s_t, a_t),$$ we also have an observation space $O$ and emissions $E$. The emissions capture probability distribution $$p(o_t \vert s_t),$$ or the probability of getting a certain observation from the current state.

Crucially, in a POMDP, the states satisfy the Markov property, $p(s_{t+1} \vert s_t, a_t)$ whereas our observations might depend on the past. This influences the design of some reinforcement learning algorithms to avoid the Markov property with observations.

# Learning
Like with MDPs, model-based reinforcement learning algorithms that have observations (images, for example) seek to learn the world transitions. In POMDPs, we need to learn both $p(s_{t+1} \vert s_t, a_t)$ and $p(o_t \vert s_t)$. The former is called the dynamics model, and the latter is called the observation model.

We can use a similar log likelihood objective as MDPs, but since our true states are unknown, we need to take an expectation over them, $$\max_\phi \frac{1}{N}\sum_{i=1}^N \sum_{t=1}^T \mathbb{E}_{(s_t, s_{t+1}) \sim p(s_t, s_{t+1} \vert o_{1:T}, a_{1:T})} [\log p_\phi(s_{i(t+1)} \vert s_{it}, a_{it}) + \log p_\phi(o_{it} \vert s_{it})].$$

To compute this expectation, we need an approximate posterior encoder $$q_\psi(s_t \vert o_{1:t}, a_{1:t}),$$ much like with [[🖋️ Variational Autoencoder]]s. There are many choices for this posterior, ranging from the fully expressive $q_\psi(s_t, s_{t+1} \vert o_{1:T}, a_{1:T})$ to the single-step $q_\psi(s_t \vert o_t)$.