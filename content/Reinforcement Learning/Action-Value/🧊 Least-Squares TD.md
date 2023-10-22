Least-squares TD is a [[✏️ Linear Function Approximation]] solution to the standard temporal difference formula. This solution $\theta^*$ has an analytical closed form, but derive it from first analyzing the gradient update step. For ease of notation, let the encoding of state $s_t$ be $x_t = x(s_t)$ and consider the following: 
$$
\begin{align*} \theta_{t+1} &= \theta_t + \alpha(R_{t+1} + \gamma w_t^\top x_{t+1} - w_t^\top x_t)x_t \\ &= w_t + \alpha(R_{t+1}x_t - x_t(x_t - \gamma x_{t+1})^\top w_t) \end{align*}
$$


In steady state (expectation over all possible TD updates), we expect 
$$
\mathbb{E}[\theta_{t+1} \vert \theta_t] = \theta_t + \alpha(b - A\theta_t)
$$
 where $b = \mathbb{E}[R_{t+1}x_t]$ and $A = \mathbb{E}[x_t(x_t - \gamma x_{t+1})^\top]$ from the equation above. Once $\theta$ converges to $\theta^*$, there are no updates, so 
$$
b - A\theta^* = 0.
$$
 Solving, we derive the equation 
$$
\theta^* = A^{-1}b,
$$
 which is called the TD fixed point, or the parameters for linear function convergence.

It's possible to arrive at this solution through both gradient descent and calculating the $A$ and $b$ matrices directly. The latter is least-squares TD, and we approximate our two matrices by sampling; at time step $t$ in our episode, we have 
$$
A_t = \sum_{k=0}^{t-1} x_k(x_k - \gamma x_{k+1})^\top + \epsilon I,\ b_t = \sum_{k=0}^{t-1} R_{k+1}x_k,
$$
 which gives us 
$$
\theta_t = A_t^{-1}b_t.
$$
