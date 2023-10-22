Actor-Critic is a [[🚓 Policy Gradient]] algorithm that augments the standard gradient calculation by also estimating value functions. The "actor" represents our policy gradient updates, and the "critic" is our value function updates.

# Actor
To motivate the formulation of our gradient, note that the reward summation in the standard policy gradient, after applying causation, can be better estimated with the Q-function. Thus, our gradient is $$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)} \left[ \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \vert s_t) Q^\pi(s_t, a_t) \right].$$

To reduce variance, we can incorporate a baseline: the average of $Q(s_t, a_t)$ over the state $s_t$, which is exactly the definition of our value function $$V^\pi(s_t) = \mathbb{E}_{a_t \sim \pi_\theta(a_t \vert s_t)}[Q^\pi(s_t, a_t)].$$ Thus, our gradient with the baseline gives us the actor-critic gradient: $$\begin{align*} \nabla_\theta J(\theta) &= \mathbb{E}_{\tau \sim p_\theta(\tau)} \left[ \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \vert s_t) (Q^\pi(s_t, a_t) - V^\pi(s_t)) \right] \\ &= \mathbb{E}_{\tau \sim p_\theta(\tau)} \left[\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \vert s_t) A^\pi(s_t, a_t) \right] \end{align*}$$

$A^\pi$ is the advantage function, which is the difference between the expected reward of an action $a_t$ and the average reward of an action at $s_t$. Intuitively, this gradient increases probabilities for actions that are above average and decreases those that are below average.

> [!note]
> Note that this formulation is extremely similar to [[♻️ Policy Iteration]]; the main difference is that we're performing a gradient ascent step on the gradient whereas policy iteration directly redefines the policy to the optimal value.

# Critic
To find the advantage function, we note that $$Q^\pi(s_t, a_t) = r(s_t, a_t) + \mathbb{E}_{s_{t+1} \sim p(s_{t+1} \vert s_t, a_t)}[V^\pi(s_{t+1})] \approx r(s_t, a_t) + V^\pi(s_{t+1}).$$ Thus, our Q-function and advantage function can both be determined by the value function, $$A^\pi(s_t, a_t) \approx r(s_t,a _t) + V^\pi(s_{t+1}) - V^\pi(s_t),$$ or the following if we incorporate discount factor $\gamma$, $$A^\pi(s_t, a_t) \approx r(s_t,a _t) + \gamma V^\pi(s_{t+1}) - V^\pi(s_t).$$

Finding the value function estimate $V^\pi_\phi$ can be done via [[💯 Policy Evaluation#Bootstrap Estimate]], either by training in batches or online updates after every move. Introducing this neural network to our policy gradient reduces its variance since the network predicts similar advantages for similar states, thereby generalizing our simple one-sample estimate in Monte Carlo policy gradient.

# Parallel Actor-Critic
To stabilize training the value function, we can run multiple actor-critics at the same time with the same policy $\pi$ but different random seeds. Each instance makes online updates to the same neural network for $V^\pi$.

Synchronized parallel actor-critic makes these updates together in a batch whereas asynchronous parallel actor-critic updates whenever an instance finishes. One slight theoretical drawback to the asynchronous version is that some instances might train the network on samples drawn using an old policy; however, practical performance benefits usually outweigh this drawback.