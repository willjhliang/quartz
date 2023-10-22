# Problem
Given a convex objective $F(w)$ and for parameters $w \in \mathcal{L}$, a convex set, we want to find $$\min_w F(w) \text{ such that } w \in \mathcal{L}.$$
## Convexity
A convex set is defined as a set where for all $w, w' \in \mathcal{L}$ and $\alpha \in [0, 1]$, $$\alpha w + (1 - \alpha)w' \in \mathcal{L}.$$ Intuitively, this is saying that the line between $w$ and $w'$ is inside the set.

A convex function is defined as $F$ such that for $w, w' \in \mathbb{R}^d$ and $\alpha \in [0, 1]$, $$F(\alpha w + (1 - \alpha)w') \leq \alpha F(w) + (1 - \alpha)F(w').$$ In other words, the function is upwards curving. This is also known as [[🌈 Jensen's Inequality]].

Moreover, if $F$ is convex and differentiable, then for all $w, w'$, $$F(w') \geq F(w) + \nabla F(w)^\top (w' - w).$$ This is illustrated below.

![[20230217121603.png#invert|500]]

Lastly, for all $w$, $\nabla^2 F(w)$ is a positive semidefinite matrix. This is also saying that the function always curves upwards.

# Solution
If $F$ is convex and differentiable, any $w$ that satisfies $\nabla F(w) = 0$ is a global minimum.

## Convex Properties
A convex function $F$ is $L$-smooth if $$F(w') \leq F(w) + \nabla F(w)^\top (w' - w) + \frac{L}{2}\Vert w - w' \Vert_2^2.$$

A function $F$ is $\mu$-strongly convex if $$F(w') \geq F(w) + \nabla F(w)^\top (w' - w) + \frac{\mu}{2} \Vert w - w' \Vert_2^2.$$

## Gradient Descent
These two properties essentially bound our function with $L$ and $\mu$. We'll use them to inform our algorithm below, called [[⛰️ Gradient Descent]].

1. Initialize $w_1 \in \mathbb{R}^d$.
2. For $t$ time steps,
	1. Update $w_{t+1} = w_t - \eta_t\nabla F(w_t)$.

For a $L$-smooth convex function $F$, since we have an upper bound, we can minimize the quadratic $$\min_{w'} F(w) + \nabla F(w)^\top (w' - w) + \frac{L}{2}\Vert w' - w \Vert_2^2,$$ which gives us $w' = w - \frac{1}{L} \nabla F(w)$, our gradient descent step.

With this update rule setting $\eta = \frac{1}{L}$, we will converge to optimal $w_*$. Specifically, at time $t$, we have $$F(w_{t+1}) - F(w_*) \leq \frac{L}{2t} \Vert w_1 - w_* \Vert_2^2.$$ Also, if we let our acceptable error $\epsilon = F(w_{t+1}) - F(w_*)$, we converge in $O(\frac{1}{\epsilon})$ steps.

---
**Proof of Convergence**

We'll start with the smoothness property, $$F(w_{t+1}) \leq F(w_t) + \nabla F(w_t)^\top (w_{t+1} - w_t) + \frac{L}{2}\Vert w_{t+1} - w_t \Vert^2.$$

By our gradient descent step, we know $w_{t+1} = w_t - \frac{1}{L}\nabla F(w_t)$, so rearranging for $\nabla F(w_t) = L(w_t - w_{t+1})$ and plugging it into our equation above, we get $$F(w_{t+1}) \leq F(w_t) + L(w_t - w_{t+1})^\top (w_{t+1} - w_t) + \frac{L}{2} \Vert w_{t+1} - w_t \Vert^2$$ and simplifying, we have $$F(w_{t+1}) - F(w_t) \leq -\frac{L}{2} \Vert w_{t+1} - w_t \Vert^2.$$

Next, we use the convex property to get $$F(w_*) \geq F(w_t) + \nabla F(w_t)^\top (w_* - w_t),$$ and rearranging and plugging in the gradient update above, $$F(w_t) - F(w_*) \leq L(w_t - w_{t+1})^\top (w_t - w_*).$$ Then, since $$2a^\top b = \Vert a \Vert^2 + \Vert b \Vert^2 - \Vert a - b \Vert^2,$$ we let $a = (w_t - w_{t+1})$ and $b = (w_t - w_*)$ and replace the above to get $$F(w_t) - F(w_*) \leq \frac{L}{2}(\Vert w_{t+1} - w_t \Vert^2 + \Vert w_t - w_* \Vert^2 - \Vert w_* - w_{t+1} \Vert^2).$$ Adding the inequality we derived above, we get $$F(w_{t+1}) - F(w_*) \leq \frac{L}{2}(\Vert w_t - w_* \Vert^2 - \Vert w_* - w_{t+1} \Vert^2)$$
Finally, summing $t$ on both sides, we have the following: $$\begin{align*}\sum_{t=1}^\top [F(w_{t+1}) - F(w_*)] &\leq \sum_{t=1}^\top \frac{L}{2}(\Vert w_t - w_* \Vert^2 - \Vert w_* - w_{t+1} \Vert^2) \\ T[F(w_{T+1}) - F(w_*)] & \leq \frac{L}{2}(\Vert w_1 - w_* \Vert^2 - \Vert w_* - w_{T+1} \Vert^2) \\ F(w_{T+1}) - F(w_*) &\leq \frac{L}{2T}(\Vert w_1 - w_* \Vert^2) \end{align*}$$ where we also use the property that $F(w_t)$ is non-increasing in the second step.

---

Moreover, if we also assume strong convexity with $\mu$, we converge even faster, with $$\Vert w_{t+1} - w_* \Vert_2^2 \leq \left(1 - \frac{\mu}{L}\right)^\top \Vert w_1 - w_* \Vert_2^2$$ and convergence rate $O(\log \frac{1}{\epsilon})$.