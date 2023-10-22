The Markov property states that the future only depends on the present. Markov chains use this property to model dynamic systems that transition between states; the next state depends only on the current state.

A chain consists of a set of states, probabilities of initializing at each state, and a matrix of transition probabilities across states. The following is a graphical example.

![[20230101134733.png#invert|400]]

Formally, the chain consists of the state space $S$ and transition operator $T$. For states $s, s' \in S$, we wish to capture the probability 
$$
p(s_{t+1} = s' \vert s_t = s),
$$
 using the transition operator. If we let $\mu_{ti} = p(s_t = i)$ and $T_{ij} = p(s_{t+1} = i \vert s_t = j)$, then 
$$
\mu_{t+1} = T\mu_t
$$
 describes how the probability distribution of states changes over time via our transitions.