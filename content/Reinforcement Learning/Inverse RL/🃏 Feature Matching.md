Feature matching is an [[⌛️ Inverse Reinforcement Learning]] technique that uses a linear reward function based on features derived from the state and action. For some feature function $f(s, a)$, we define reward 
$$
r_\psi(s, a) = \psi^\top f(s, a).
$$
 The naive matching principle seeks to equalize the expected features across the expert and derived policies; that is, find $\psi$ such that 
$$
\mathbb{E}_{\pi^{r_\psi}}[f(s, a)] = \mathbb{E}_{\pi^*}[f(s, a)].
$$
 This is similar to [[♟️ Reinforcement Learning#Imitation Learning]] techniques since we're just trying to get a policy to match the states we visit in our demonstrations.

However, this approach is ambiguous since there can be many reward functions that give the same trajectory distribution and thus the same expectation. To reduce ambiguity, we can instead borrow the maximum margin idea from [[🛩️ Support Vector Machine]]s and seek to find some reward function that makes the expert policy much better than all other policies. That is, we want to find $\psi$ such that the expert's expected reward, $\psi^\top \mathbb{E}_{\pi^*}[f(s, a)]$, is better than the next best one by a margin of $m$: 
$$
\max_{\psi, m} m \text{ such that } \psi^\top \mathbb{E}_{\pi^*}[f(s, a)] \geq \max_\pi \psi^\top \mathbb{E}_\pi[f(s, a)] + m.
$$


However, in complex or continuous settings, there can be policies that are slightly different from $\pi^*$ that give extremely similar expected reward. Intuitively, what we actually want is for our optimal policy to be much better than other distinct policies; in other words, we want the margin to be better for more different policies than more similar ones.

Borrowing the SVM primal definition, we can instead optimize the objective 
$$
\min_\psi \frac{1}{2}\Vert \psi \Vert^2 \text{ such that } \psi^\top \mathbb{E}_{\pi^*}[f(s, a)] \geq \max_\pi \psi^\top \mathbb{E}_\pi[f(s, a)] + D(\pi, \pi^*)
$$
 where $D$ is a divergence measure that replaces the $1$ from the original primal.