Dynamic programming algorithms find optimal policies given a perfect model of the environment's MDP. They exploit the [[🔔 Bellman Equation#Bellman Optimality Equation]] of value functions to find exact solutions.
1. [[♻️ Policy Iteration]] alternates between policy evaluation and policy improvement.
2. [[💎 Value Iteration]] merges the two steps into one value update step.

These two algorithms capture the general idea of iterative improvement, but they can be adapted to fit different situations. If our state space is too large, asynchronous dynamic programming methods like [[⏰ Real-Time Dynamic Programming]] find a better ordering of the states to update rather than sweeping the state space every iteration. Generally, policy evaluation and improvement processes can have different granularities—tabular convergence is guaranteed as long as all states are eventually checked.

This idea can also be applied to scenarios where the environment's dynamics are not known (as is often the case). [[🪙 Monte Carlo Control]] is such an example.