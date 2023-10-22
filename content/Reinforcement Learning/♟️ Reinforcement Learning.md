Reinforcement learning deals with general learning problems in which an [[🧸 Agent]] seeks to achieve some goal in an environment formalized as a [[🌎 Markov Decision Process]] (and in rare cases a [[🎰 Multi-Armed Bandit]] or [[📖 Contextual Bandit]]). This system can be broken down into four key components:
1. A policy $\pi$ defines how the agent behaves by defining what the agent should do in response to an observation from the environment.
2. A reward signal defines our goal for the agent by designating what states or actions are desirable. Our agent aims to maximize its expected total reward; that is, for some parameters $\theta$ that define our policy $\pi$, our objective is to maximize 
$$
J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[ \sum_{t=1}^T r(s_t, a_t) \right] = \mathbb{E}_{\rho(s)}[V^\pi(s)] = \mathbb{E}_{\rho(s, a)}[Q^\pi(s, a)].
$$

3. Value functions define the expected total reward. Thus, these functions define the long-term value of the state or state-action pair.
4. A model of the environment estimates how the environment behaves. This component is optional, but learning it allows our agent to perform planning.

There's a huge diversity of algorithms that balance stability, efficiency, and prior assumptions. Depending on the environment, specifically the size of the state space, these methods are either tabular or function approximations; for the former, we simply maintain values for each state or state-action pair whereas in the latter, due to a combinatorially large state space, we need to generalize our findings by using a function (like [[🕸️ Multilayer Perceptron]] or [[✏️ Linear Function Approximation]]) instead.

Generally, if we have a table or function $f_\theta$ with parameters $\theta$, index $x$ (like state or state-action), and target $y$, then a tabular update looks like 
$$
f_\theta(x) \leftarrow f_\theta(x) + \alpha[y - f_\theta(x)]
$$
 whereas a function update uses [[⛰️ Gradient Descent]], 
$$
\theta \leftarrow \theta + \alpha[y - f_\theta(x)]\nabla_\theta f_\theta(x).
$$


Nevertheless, whether tabular or approximate, we can generally categorize them as learning or planning—depending on whether they're model-free or model-based respectively.

# Planning (Model-Based)
Planning methods use a model of the environment's dynamics, $p(s', r \vert s, a)$, to augment learning or decision-making. Generally, the dynamics can either be used to learn the value functions (background planning) or to make decisions during execution (decision-time planning).

## Background Planning
Background planning methods exploit the known probabilities to accurately estimate expectations over the environment.
1. [[🧨 Dynamic Programming]] is a classic approach to estimating value functions using the environment dynamics and bootstrapping. The two most common implementations are [[♻️ Policy Iteration]] and [[💎 Value Iteration]].
2. [[🔮 Model Predictive Control]] and [[💣 Dyna]] are methods that execute both model-learning and planning updates simultaneously.

## Decision-Time Planning
Decision-time planning supplements the policy by using the dynamics to choose an action $a$ when given state $s$.
1. [[🌲 Heuristic Search]] recursively checks the game tree and computes action-values using the dynamics probabilities.
2. [[🎳 Rollout]] methods optimize a rollout policy that explores possible future trajectories and estimate action-values via sampling.
3. [[🗺️ Monte Carlo Tree Search]] performs multiple rollouts directed toward trajectories that it estimates to have high value.

# Learning (Model-Free)
Learning methods derive a policy directly from interacting with the environment without using the dynamics. There are a variety of different approaches: these algorithms can generally be grouped as action-value methods, policy gradients, or imitation learning.

## Action-Value Methods
Action-value methods estimate the state-value and action-value functions and derive a policy indirectly.
1. [[🪙 Monte Carlo Control]] is an approximation of dynamic programming using only samples from the environment.
2. [[⌛️ Temporal Difference Learning]] combines dynamic programming and Monte Carlo control by learning from samples and bootstrapping updates. The most common instances of control are [[🧭 Sarsa]] (on-policy) and [[🚀 Q-Learning]] (off-policy).
3. [[🪜 N-Step Bootstrapping]] bridges TD learning and Monte Carlo estimates by balancing the weight on samples versus bootstrap estimates.
4. [[🎫 Eligibility Traces]] generalizes $n$-step bootstrapping to average over all $n$.

## Policy Gradients
[[🚓 Policy Gradient]]s optimize the policy directly rather than using the value functions. These are most commonly with function approximation techniques since approximation ensures that similar states get similar actions. Some common policy gradients are below:
1. [[🛠️ Monte Carlo Policy Gradient]] estimates baselined return through samples.
2. [[🚑 Off-Policy Policy Gradient]] derives computes gradients with samples that from another distribution.
3. [[🎭 Actor-Critic]] uses an action-value function estimate and updates both the policy and value function simultaneously.
4. [[🎩 Off-Policy Actor-Critic]] modifies actor-critic to work with out-of-distribution samples from a replay buffer.
5. [[🩰 A3C]] applies actor-critic updates asynchronously to stabilize training.
6. [[⚔️ Deterministic Policy Gradient]]s and [[🧨 DDPG]] optimize a deterministic policy for Q-learning-like offline updates.
7. [[✌️ TD3]] improves DDPG training stability with more conservative value estimates.
8. [[🪶 Soft Actor-Critic]] trains an offline actor-critic through [[🎲 Entropy Regularization]].

[[🚜 Natural Policy Gradient]] observes that the policy updates changes the future state-action data distribution and adds a distribution-change constraint to the gradient problem. 
1. [[🏦 Trust Region Policy Optimization]] improves the stability and efficiency of the natural policy gradient with conjugate gradient and line search for improvement.
2. [[📪 Proximal Policy Optimization]] simplifies TRPO by incorporating the distribution constraint directly in a clipped objective.

## Imitation Learning
Imitation learning is a class of reinforcement learning algorithms that learn by observing an expert's actions.
1. [[🐵 Behavioral Cloning]] solves the supervised learning problem by directly copying expert demonstrations.
2. [[🗡️ DAgger]] adds robustness to BC by incorporating manual feedback.