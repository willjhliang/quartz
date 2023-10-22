A reinforcement learning agent aims to maximize total reward by performing actions in an environment, formally a [[🌎 Markov Decision Process]]. To do so, it leverages (one or more) policies, value functions, and models of the world.

# Policy
A policy defines how our agent acts in the environment. Formally, it's a mapping from states to the distribution over possible actions, $$\pi_\theta(a \vert s)$$ where $\theta$ are the parameters defining our policy.

One nuance is that while some environments provide us their full state (for example, in games), other situations like the real world only allow a partial view of the state through sensors, so our policy is conditioned on observations $o$ instead. In that case, our environment functions as a [[🪐 POMDP]] that makes a distinction between observations available to the agent and the internal state of the world.

# Objective
The crucial objective in reinforcement learning is to maximize expected total reward, not just the immediate reward (like a greedy algorithm). We quantify the total reward as our return, $$G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \ldots = \sum_{k=0}^T \gamma^k R_{t+k+1} = R_{t+1} + \gamma G_{t+1}$$ where $\gamma \in [0, 1]$ is a discount factor that represents how much we value current reward relative to future rewards. If our horizon is infinite, $T = \infty$ but $\gamma < 1$ (to avoid infinite returns); otherwise, $T$ is a finite value that denotes our termination time.

For some trajectory $\tau$ defined by our policy $\pi_\theta$, $$p_\theta(\tau) = p(s_1, a_1, \ldots, s_T, a_T) = p(s_1)\prod_{t=1}^T \pi_\theta(a_t \vert s_t)p(s_{t+1} \vert s_t, a_t),$$ the expected return is given by $$\mathbb{E}_\pi[G_1] = \mathbb{E}_{\tau \sim p_\theta(\tau)} \left[ \sum_{t=1}^T \gamma^{t-1} r(s_t, a_t) \right],$$ and our objective is to find the policy that maximizes this value.

# Value Functions
By following the policy, our agent will get some return. We can quantify the expected return of policy $\pi$ that starts from state $s$ via the state-value function $$V^\pi(s) = \mathbb{E}_\pi[G_t \vert S_t = s].$$ Similarly, we can define the expected return of following $\pi$ after taking action $a$ at state $s$ with the action-value function (or Q-function) $$Q^\pi(s, a) = \mathbb{E}_\pi[G_t \vert S_t = s, A_t = a].$$ Note that the action-value function is related to the state-value function by $$V^\pi(s) = \mathbb{E}_{a \sim \pi}[Q^\pi(s, a)].$$

Note that while the Q-function captures the value of an action $a$ on state $s$, its value is the combination of the state value $V^\pi(s)$ plus the additional value of the action. In order to decouple these the latter, we have the advantage function $$A^\pi(s) = Q^\pi(s, a) - V^\pi(s)$$ that directly measures the *extra* reward from taking action $a$.

The state-value and action-value functions can also be expressed recursively via the [[🔔 Bellman Equation]]. This equality is the basis of many reinforcement learning techniques.

# Occupancy Measure
The occupancy measure $\rho^\pi(s, a)$ is the stationary distribution of running our policy $\pi$ in the environment. Formally, $$\rho^\pi(s, a) = \pi(a \vert s) \sum_{t=0}^T \gamma^t p(s \vert \pi)$$ where $p(s \vert \pi)$ is dependent on both the environment dynamics and the policy. Note that we can conversely define our policy in terms of the occupancy measure, $$\pi(a \vert s) = \frac{\rho^\pi(s, a)}{\sum_{a'} \rho^\pi(s, a')},$$ meaning that the policy and occupancy measure share a one-to-one correspondence.

If we just want the stationary distribution of states, we can marginalize over the occupancy measure to get the on-policy distribution $$\rho^\pi(s) = \sum_a \rho^\pi(s, a).$$