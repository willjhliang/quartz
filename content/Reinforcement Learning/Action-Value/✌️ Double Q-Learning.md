In practice, one phenomenon we commonly observe in [[🚀 Q-Learning]] is that the estimates of our Q function are systematically higher than the actual value it's supposed to represent—the expected discounted rewards over time. The reason for this is that in our target value calculation, 
$$
y_i = r(s_i, a_i) + \gamma \max_{a_i'}Q_{\phi'}(s_i', a_i'),
$$
 we're taking the $\max_{a_i'}$. Since our $Q_{\phi'}$ is an estimate for the actual Q-value, if we take the max, we're biased toward selecting positive noise, thereby causing an overestimation.

Going a bit deeper, we rewrite the max operation as 
$$
\max_{a'} Q_{\phi'}(s', a') = Q_{\phi'}(s', \arg\max_{a'} Q_{\phi'} (s' ,a')).
$$
 In this form, it's more obvious that the fundamental problem is that we're selecting the best action via the argmax over the noisy estimate, and then we're evaluating that action using the same noise. The immediate solution, then, is to avoid using the same noise to pick our argmax and max computation.

Double-Q Learning decorrelates the noise between action selection and evaluation by using separate networks, $A$ and $B$. Our update rule is slightly tweaked, 
$$
Q_{\phi_A} (s, a) = r(s, a) + \gamma Q_{\phi_B}(s', \arg\max_{a'}Q_{\phi_A}(s' ,a')),
$$
 to use one noisy estimate for argmax and another for max. Since the noise in $\phi_A$ used to select action $a'$ isn't also in $\phi_B$, our evaluation won't give it an overestimated value. Note that this update is performed for both $Q_{\phi_A}$ and $Q_{\phi_B}$ (just by swapping $\phi_A$ and $\phi_B$).

In practice, we can use "current" and "target" networks (from [[👾 Deep Q-Learning]]) for this purpose: select the action with the current network $Q_\phi$ but evaluate it with the target network $Q_{\phi'}$. Thus, 
$$
y = r(s, a) + \gamma Q_{\phi'}(s', \arg\max_{a'} Q_\phi(s', a')).
$$
