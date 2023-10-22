Heuristic search is a decision-time planning algorithm that computes values for possible future states whenever we need to decide on an action.

Specifically, we consider the tree of possible continuations (by traversing the environment dynamics $p(s', r \vert s, a)$, analogous to [[🚋 Breadth First Search]]) and approximate value functions starting from the leaves using the [[🔔 Bellman Equation#Bellman Optimality Equation]]s. The value function that initializes the leaves is generally hand-designed; however, it's possible to make it a universal function approximated over many heuristic searches, similar to [[💎 Value Iteration]].

![[20230310115306.png#invert|500]]

After computing the values and backing it up to our current state, we greedily pick the max-value action. Note that this procedure is similar to a greedy policy but instead of looking one step into the future, we go much deeper into the possible future states.

# Focused Depth
The core advantage of heuristic search is that it focuses updates on the current state, thus applying our limited compute to the most relevant states for our immediate decision. Going deeper than one step allows us to gather more accurate estimates as well since we're using the environment dynamics and actual rewards rather than any other approximation method.