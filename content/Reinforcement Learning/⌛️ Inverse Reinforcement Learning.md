Inverse reinforcement learning (IRL) reverses the standard reinforcement learning task: rather than deriving a policy from some given reward function, IRL is concerned with deriving a reward function from some (assumed to be optimal) policy. This problem is similar to [[♟️ Reinforcement Learning#Imitation Learning]], but rather than simply copying the action of the demonstrator, we seek to copy the intent—different actions taken to get the same reward are still desirable.

More formally, given sample trajectories $\{ \tau_i \}$ sampled from an optimal policy $\pi^*$, our goal is to learn $r_\psi(s, a)$, which can then be used to learn $\pi^*(a \vert s)$.
1. [[🃏 Feature Matching]] finds policies that match the optimal one in expectation.
2. [[🎲 MaxEnt]] models behavior as a stochastic process and optimizes reward parameters via direct inference.
3. [[🦮 Guided Cost Learning]] is a MaxEnt alternative that replaces environment dynamics with sampling.