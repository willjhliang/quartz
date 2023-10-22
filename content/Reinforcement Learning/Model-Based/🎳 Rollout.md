Rollout algorithms are decision-time planning methods that decide the next action by estimating action values via [[🪙 Monte Carlo Control]]. That is, using the environment dynamics, we simulate multiple trajectories that start at our current state and end at a terminal state; we can then estimate value as the average return.

Rather than optimizing a universal policy, we optimize a rollout policy $\pi$ that decides which trajectories we sample in MC control. We then improve $\pi$ by choosing the greedy action, 
$$
\arg\max_a Q^\pi(s, a),
$$
 and modifying $\pi$ to repeat this decision in the future. This is similar to a step in [[♻️ Policy Iteration]] except that we update $\pi$ for this single state $s$. However, unlike dynamic programming (background planning), our action-value estimates are discarded after choosing the action.