Control as inference is a probabilistic framework that recasts reinforcement learning through the lens of inference from a [[🪩 Probabilistic Graphical Model]]. The key advantage of this method is that unlike optimal methods, this framework gives us "soft" policies that explain stochastic behavior and model suboptimal behavior as well.

To start, we describe a trajectory via the following structure, where $e$ represents "optimality: 

![[20230404201754.png#invert|400]]

The reason we have optimality is that a graph with only $s$ and $a$ would simply describe the environment's dynamics. To incorporate some notion of "good" and "bad," we use the optimality variable, which can be thought of as a binary variable that's $1$ if optimal and $0$ otherwise. We can then define the probability of optimality as 
$$
p(e_t \vert s_t, a_t) = \exp r(s_t, a_t),
$$
 which naturally leads to an optimal trajectory distribution 
$$
p(\tau \vert e_{1:T}) \propto p(\tau) \exp \left\{ \sum_t r(s_t, a_t) \right\}.
$$


Now that this model gives us an optimal trajectory distribution, we can perform inference within the graph to derive optimal policies. That is, our policy is 
$$
\pi(a_t \vert s_t) = p(a_t \vert s_t, e_{t:T}=1).
$$
 This can be done either through direct inference or variational inference.

# Direct Inference
In direct inference, we take inspiration from [[☂️ Hidden Markov Model#Forward-Backward Algorithm]] and use a similar message passing technique.
1. First, we compute the backward messages $p(e_{t:T} = 1 \vert s_t)$ and $p(e_{t:T} = 1 \vert s_t, a_t)$.
2. Using the backward messages, we can then recover the policy $p(a_t \vert s_t, e_{t:T} = 1)$.
3. For some applications, it's also useful to find the forward messages $p(s_t \vert e_{1:{t-1}})$.

## Backward Message
A backward state-action message is defined as 
$$
\beta(s_t, a_t) = p(e_{t:T} \vert s_t, a_t).
$$
 Expanding out this definition gives us 
$$
\beta(s_t, a_t) = \int_{s_{t+1}} p(e_{t+1:T} \vert s_{t+1}) p(s_{t+1} \vert s_t, a_t) p(e_t \vert s_t, a_t) ds_{t+1},
$$
 and the first term, the backward state message, is 
$$
\beta(s_{t+1}) = p(e_{t+1:T} \vert s_{t+1}) = \int_{a_{t+1}} p(e_{t+1:T} \vert s_{t+1}, a_{t+1}) p(a_{t+1} \vert s_{t+1}) da_{t+1}.
$$
 We can assume that $p(a_{t+1} \vert s_{t+1})$ (actions taking without optimality in mind) is uniform, and noting that the first term is the previous backward message, we have 
$$
\beta(s_{t+1}) = \int_{a_{t+1}} \beta_t(s_{t+1}, a_{t+1}) da_{t+1}.
$$


The backward message passing thus amounts to alternating between computing the two messages starting from $T-1$ down to $1$:
1. 
$$
\beta(s_t, a_t) = p(e_t \vert s_t, a_t) \mathbb{E}_{s_{t+1} \sim p(s_{t+1} \vert s_t, a_t)}[\beta(s_{t+1})].
$$

2. 
$$
\beta(s_t) = \mathbb{E}_{a_t \sim p(a_t \vert s_t)}[\beta(s_t, a_t)].
$$


Though the above equations don't seem very intuitive, we can recast them in the form of [[💎 Value Iteration]] if we let 
$$
V(s_t) = \log \beta_t(s_t),\ Q(s_t, a_t) = \log \beta(s_t, a_t).
$$
 Then, the above steps are the following:
1. 
$$
Q(s_t, a_t) = r(s_t, a_t) + \log \mathbb{E}[\exp V(s_{t+1})].
$$

2. 
$$
V(s_t) = \log \int_{a_t} \exp \{ Q(s_t, a_t) \}.
$$


Note that rather than computing the maximum, our log of the exponentiation finds a "soft" maximum (not to be confused with softmax).

## Policy Derivation
Using the backward messages, we can derive, through [[🪙 Bayes' Theorem]], 
$$
\pi(a_t \vert s_t) = p(a_t \vert s_t, e_{1:T}) = \frac{\beta(s_t, a_t)}{\beta(s_t)}.
$$
 Note that in context of our value functions, this is equivalent to 
$$
\pi(a_t \vert s_t) = \exp \{ Q(s_t, a_t) - V(s_t) \} = \exp A(s_t, a_t),
$$
 which essentially gives better actions an exponentially better probability.

## Forward Message
A forward message $\alpha(s_t) = p(s_t \vert e_{1:t-1})$ gives us more insight into the trajectories we'll reach given optimality. Some lengthy algebra gives us 
$$
\alpha(s_t) = p(s_t \vert e_{1:{t-1}}) = \int_{s_{t-1}, a_{t-1}} p(s_t \vert s_{t-1}, a_{t-1}) p(a_{t-1} \vert s_{t-1}, e_{t-1})p(s_{t-1} \vert e_{1:t-1}) ds_{t-1} da_{t-1}
$$
 where 
$$
p(a_{t-1} \vert s_{t-1}, e_{t-1})p(s_{t-1} \vert e_{1:t-1}) = \frac{p(e_{t-1} \vert s_{t-1}, a_{t-1}) p(a_{t-1} \vert s_{t-1}) \alpha(s_{t-1})}{p(e_{t-1} \vert e_{1:t-2})}.
$$


More importantly, if we now compute the state marginal under optimality, we find 
$$
p(s_t \vert e_{1:T}) \propto \beta(s_t) \alpha(s_t).
$$
 Intuitively, this tells us that the state distribution is the intersection of states with high probability of reaching the goal (backward) and states with high probability of originating from the initial state (forward).

# Variational Inference
Unfortunately, one problem with the above approach is that 
$$
Q(s_t, a_t) = r(s_t, a_t) = \log \mathbb{E}[\exp V(s_{t+1})]
$$
 is too optimistic. That is, it's taking a "soft" max over the future states, which are stochastic; thus, this value is based on the fact that the future state is also optimal, which is out of our control and completely up to luck. This problem stems from the inference setup itself: the transition marginal is 
$$
p(s_{t+1} \vert s_t, a_t, e_{1:T}),
$$
 which assumes that future states are optimal and thereby gives the "lucky" version of our true environment dynamics, which is not conditioned on $e_{1:T}$.

What we really want is to find another distribution $q(s_{1:T}, a_{1:T})$ that's close to $p(s_{1:T}, a_{1:T} \vert e_{1:T})$ but with dynamics $p(s_{t+1} \vert s_t, a_t)$. In this reframing, we have an approximation problem; if we have $x = e_{1:T}$ and $z = (s_{1:T}, a_{1:T})$, we see that our problem reduces to finding $q(z)$ to approximate $p(z \vert x)$, which can be done via variational inference.

First, to enforce the dynamics, we define 
$$
q(s_{1:T}, a_{1:T}) = p(s_1) \prod_t p(s_{t+1} \vert s_t, a_t) q(a_t \vert s_t)
$$
 where $q(a_t \vert s_t)$, our policy, is the only part of the distribution we can control. Applying the [[🧬 Evidence Lower Bound]], we have 
$$
\log p(e_{1:T}) \geq \sum_t \mathbb{E}_{s_t, a_t \sim q}[r(s_t, a_t) + H(q(a_t \vert s_t))].
$$
 Tightening the bound by maximizing this quantity is thereby equivalent to maximizing reward and action entropy. From here, it can be shown that the policy $q(a_t \vert s_t)$ that maximizes this value is 
$$
q(a_t \vert s_t) = \exp \{ Q(s_t, a_t) - V(s_t) \}
$$
 where our value functions are still "soft," 
$$
V(s_t) = \log \int_{a_t} \exp Q(s_t, a_t) da_t,\ Q(s_t, a_t) = r(s_t, a_t) + \mathbb{E}[V(s_{t+1})].
$$


These definitions for the value functions and policy can be immediately substituted into [[🚀 Q-Learning]] and [[🚓 Policy Gradient]]s for their soft optimality variants, bringing the benefits of improved exploration, easier fine-tuning, and stronger robustness. Using a similar idea gives us [[🎲 Entropy Regularization]], which forms the basis of [[🪶 Soft Actor-Critic]].