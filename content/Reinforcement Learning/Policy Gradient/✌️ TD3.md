Twin delayed DDPG (TD3) addresses training instability in [[🧨 DDPG]] by solving its failure mode: the deterministic policy exploiting inaccurate overestimations in the Q-function.

To this end, we'll introduce three tricks:
1. Fit two (twin) Q-functions $Q_{\phi_1}$ and $Q_{\phi_2}$ and use the smaller of the two in hopes that an overestimation in one function won't also occur in the other.
2. Delay updates to the policy, essentially training it less frequently than the Q-functions to allow for more accurate action-value estimates.
3. Add clipped noise to the selected action, effectively smoothing out action-values and making it harder for the policy to exploit overestimations.

Formally, we'll first define our noised policy. We first add noise $\epsilon$, clipped to the range $[-c, c]$, to the selected action, then clip it again to be within the valid action range $[a_{low}, a_{high}]$: 
$$
\mu'_\theta(s) = \text{clip}(\mu_\theta(s) + \text{clip}(\epsilon, -c, c), a_{low}, a_{high})
$$


Next, for training our Q-functions, we use the same target 
$$
y(r, s') = r + \gamma\min\{ Q_{\phi_1}(s', \mu_\theta'(s')), Q_{\phi_2}(s', \mu_\theta'(s')) \}
$$
 and regress with samples from the replay buffer $B$, 
$$
J(\phi_i) = \mathbb{E}_{(s, a, s', r) \sim B}[ (Q_{\phi_1}(s, a) - y(r, s'))^2 ]
$$
 for $i = 1, 2$.

After every two updates to the Q-function, we update the policy using the first Q-function 
$$
\max_\theta \mathbb{E}_{s \sim B}[Q_{\phi_1}(s, \mu_\theta(s))],
$$
 which is the exact same as DDPG.