Sarsa is an on-policy [[⌛️ Temporal Difference Learning]] method. The core update rule is 
$$
Q^\pi(S_t, A_t) \leftarrow Q^\pi(S_t, A_t) + \alpha(R_{t+1} + \gamma Q^\pi(S_{t+1}, A_{t+1}) - Q^\pi(S_t, A_t))
$$
 for all state-action to state-action sample transitions following our policy $\pi$. This update requires the tuple $(S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1}),$ hence the name.

Like in [[🪙 Monte Carlo Control#On-Policy]], our policy needs to cover all state-action pairs in order to estimate the Q-function. Thus, we generally use [[💰 Epsilon-Greedy]] to choose our next action.

# Expected Sarsa
Expected Sarsa eliminates the single-sample estimate for $A_{t+1}$ by replacing $Q^\pi(S_{t+1}, A_{t+1})$ with an expectation. Our update rule is 
$$
Q^\pi(S_t, A_t) \leftarrow Q^\pi(S_t, A_t) + \alpha\left(R_{t+1} + \gamma \sum_a \pi(a \vert S_{t+1}) Q^\pi(S_{t+1}, A_{t+1}) - Q^\pi(S_t, A_t)\right),
$$
 but this also increases computational cost since we now need to consider all possible actions $a$.

# Semi-Gradient Sarsa
If we approximate $Q^\pi$ with a function $Q^\pi_\theta$, our update is a semi-gradient step 
$$
\theta \leftarrow \theta + \alpha[R + \gamma Q^\pi_\theta(S', A') -Q^\pi_\theta(S, A)] \nabla_\theta Q_\theta^\pi(S, A).
$$
