N-step bootstrapping is an extension of [[⌛️ Temporal Difference Learning]] that incorporates the idea behind [[🪙 Monte Carlo Control]]. Rather than relying on one step to perform bootstrapped updates, the key idea is to use a Monte Carlo estimate for $n$ steps, then finish the rest with a bootstrapped estimate.

Formally, our $n$-step return can be written as $$G_{t:t+n} = R_{t+1} + \gamma R_{t+2} + \ldots + \gamma^{n-1} R_{t+n} + \gamma^n V_{t+n-1}(S_{t+n}).$$ Our value function updates thus requires sampling for $n$ time steps, then computing $$V_{t+n}(S_t) = V_{t+n-1}(S_t) + \alpha[G_{t:t+n} - V_{t+n-1}(S_t)]$$ for the state-value and $$Q_{t+n}(S_t, A_t) = Q_{t+n-1}(S_t, A_t) + \alpha[G_{t:t+n} - Q_{t+n-1}(S_t, A_t)]$$ for the action-value.

This action-value update can be directly integrated with [[🧭 Sarsa]]. However, for off-policy methods like [[🚀 Q-Learning]], we need to correct the Monte Carlo estimate with importance sampling; our importance weight is $\rho_{t:h} = \prod_{k=t}^{h} \frac{\pi(A_k \vert S_k)}{b(A_k \vert S_k)}$ where $\pi$ is our target policy and $b$ is our behavioral policy. Our updates are then as follows: $$\begin{align*} V_{t+n}(S_t) &= V_{t+n-1}(S_t) + \alpha\rho_{t:t+n-1} [G_{t:t+n} - V_{t+n-1}(S_t)] \\ Q_{t+n}(S_t, A_t) &= Q_{t+n-1}(S_t, A_t) + \alpha \rho_{t+1:t+n}[G_{t:t+n} - Q_{t+n-1}(S_t, A_t)] \end{align*}$$

# Advantage Estimation
In [[🚓 Policy Gradient]] methods, we can use the same idea to estimate the advantage function $A^\pi$. Like above, we can use the single-sample estimate for the next $n$ time-steps, then rely on the critic $\hat{V}_\phi^\pi$ for everything else.

Formally, we have $$\hat{A}_n^\pi(s_t, a_t) = \sum_{t'=t}^{t+n} \gamma^{t'-t}r(s_{t'}, a_{t'}) + \gamma^n\hat{V}_\phi^\pi(s_{t+n}) - \hat{V}_\phi^\pi(s_t)$$ where the last term is the baseline.

This method gives us a good bias-variance tradeoff in our estimate. Our single-sample estimate has extremely high variance in far-future cases because our trajectory can deviate more as we go further into the future, and our critic has lower variance further in the future due to discounted rewards. Thus, by using our single-sample for the near future and critic for the far future, we mitigate disadvantages from both.

## Generalized Advantage Estimation
GAE finds a weighted average of multiple $n$-step return estimators with distinct $n$, $$\hat{A}^\pi_{GAE}(s_t, a_t) = \sum_{n=1}^\infty w_n \hat{A}_n^\pi(s_t, a_t).$$ 

We usually prefer smaller $n$ ("cutting" earlier) to reduce the variance of our single-sample estimate, so we set weights $$w_n \propto \lambda^{n-1}.$$

$\lambda$ is extremely similar to the discount term, and if we choose our weights in this way, we can simplify our equation to $$\hat{A}_{GAE}^\pi(s_t, a_t) = \sum_{t'=t}^\infty (\gamma\lambda)^{t'-t} [r(s_{t'}, a_{t'}) + \gamma\hat{V}_\phi^\pi(s_{t'+1}) - \hat{V}_\phi^\pi(s_{t'})].$$