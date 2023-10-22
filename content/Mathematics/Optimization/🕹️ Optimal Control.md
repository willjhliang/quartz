Optimal control is a branch of optimization that aims to find a control (a series of actions) in a dynamic system to optimize some function. For example, a common problem is $$\min_{u_1, \ldots, u_T} \sum_{t=1}^T c(x_t, u_t) \text{ such that } x_{t+1} = f(x_t, u_t).$$ More generally, optimal control is defined with differential equations, $$\min_{u(t)} \varphi(x(T)) + \int_{0}^{T} L(x(t), u(t), t)dt \text{ subject to } x(t) = f(x(t), u(t), t).$$

Note that this field is closely related to [[♟️ Reinforcement Learning]] (where $x_t$ is state $s_t$ and $u_t$ is action $a_t$). The main difference is that optimal control methods generally arise from more mathematical roots whereas reinforcement learning is more applied.

# Dynamic System
A dynamic system is defined by state transitions, which, in the context of reinforcement learning, can be deterministic or stochastic.
1. Deterministic transitions follow $$x_{t+1} = f(x_t, u_t).$$
2. Stochastic transitions follow $$x_{t+1} \sim p(x_{t+1}\vert x_t, u_t).$$

Moreover, the system may be open-loop or close-loop.
1. Open-loop systems offer no feedback or new information—we're expected to output a sequence of actions $a_1, \ldots, a_T$ given just the initial state $s_1$. Algorithms that deal with this case include [[🎲 Cross Entropy Method]] and the Linear-Quadratic Regulator (LQR). Note that open loop control is often only feasible with deterministic transitions.
2. Closed-loop systems provide new information $s_t$ after we take an action $u_{t-1}$. In this case, we often derive a policy $\pi(a_t \vert s_t)$, falling closer into the realm of reinforcement learning.