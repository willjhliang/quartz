Markov decision processes (MDPs) model the reinforcement learning environment, defining states $S$, actions $A$, and rewards $R$. At each time step, the agent takes an action based on the current state, causing itself to land in a new state and receive a reward. Its trajectory thus looks like 
$$
\tau = S_0, A_0, R_1, S_1, A_1, R_2, \ldots.
$$


In a finite MDP, the dynamics can be described by the distribution 
$$
p(s' ,r \vert s, a).
$$
 The new state and reward are only dependent on the current state and action; the states thus follow the Markov property, much like in [[⛓️ Markov Chain]]s.

From these dynamics, we can get the state transitions 
$$
p(s' \vert s, a) = \sum_r p(s' ,r \vert s, a)
$$
 and the expected reward 
$$
r(s, a) = \mathbb{E}[R_t \vert S_{t-1}=s, A_{t-1}=a] = \sum_r r\sum_{s'} p(s', r \vert s, a).
$$
