Monte Carlo tree search (MCTS) is a decision-planning algorithm that approximates action-values by focusing [[🎳 Rollout]]s on high-potential trajectories. Specifically, we maintain a tree rooted at the current state that contains future states and actions with their estimated action-values. To update the tree and action-values, we sample a trajectory that starts at the root, goes to a leaf of the tree, and then plays until termination; the return of this trajectory updates all action-values inside the tree.

![[20230310123315.png#invert]]

More formally, MCTS repeats four steps multiple steps for a single decision:
1. Selection: select some leaf node in our current tree via the tree policy.
2. Expansion: expand the current tree by adding child actions and states.
3. Simulation: simulate a complete episode with the rollout policy that starts from the child state.
4. Backup: backup returns from the episode to action-values inside our tree.

After these steps, we select our action based on some measurement of the recorded values, for example the highest action-value or highest visit count. Once we get to the new state, we can repeat MCTS using the subtree rooted at the new states.

# UCT
There are many variants of the tree policy, but the general idea is to get a balance of exploring rarely visited nodes and to expand high-value nodes. For example, the UCT policy seeks to completely expand a state first, then recurse onto the child with the highest score; the score of $s_t$ is defined as 
$$
\frac{Q(s_t)}{N(s_t)} + 2C \sqrt{\frac{2\ln N(s_{t-1})}{N(s_t)}}
$$
 where $Q(s_t)$ is the value, $N(s_t)$ is the number of visits, and $s_{t-1}$ is the parent of $s_t$.