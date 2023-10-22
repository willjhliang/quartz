Models with residual connections generally have the form $$h_{t+1} = h_t + f(h_t, \theta_t)$$ with hidden layers $h$. We can view this as a discretized transformation of $h$; in other words, we're changing $h$ at discrete time steps $t = 1, \ldots, k$ with function $f$.

Neural ODEs present a continuous version of this transformation, $$\frac{dh(t)}{dt} = f(h(t), t, \theta)$$ where $t$ is now continuous, and $f$ is now a trainable model with parameters $\theta$. This is an implicit expression of our solution $h(t)$, which we can solve for using any ODE solver.

A better interpretation of $h$ is not as hidden layers but instead as a hidden variable $z$ in a dynamical system. If we let our start time be $t_0$ and end time be $t_1$, then $z(t_1)$, defined by the ordinary differential equation above, is our network's prediction. Our goal is thus to minimize the loss $$L(z(t_1)) = L\left( z(t_0) + \int_{t_0}^{t_1} f(z(t), t, \theta)dt \right) = L(\text{ODESolve}(z(t_0), f, t_0, t_1, \theta)).$$

However, computing the gradient $\frac{\partial L}{\partial \theta}$ isn't as simple as other networks since our loss is now defined by a solution to the ODE, and $\theta$ are the parameters to $f$, not $z$. Instead, we need to first relate the loss $L$ with our states $z(t)$; thus, we first introduce the adjoint $$a(t) = \frac{\partial L}{\partial z(t)},$$ which follows dynamics defined by $$\frac{da(t)}{dt} = -a(t)^\top \frac{\partial f(z(t), t, \theta)}{\partial z}.$$

![[20230302202647.png#invert|400]]

We have the value for $a(t_1) = \frac{\partial L}{\partial z(t_1)}$, so we can find $a(t_0)$ via another call to the ODE solver going backwards from $t_1$ to $t_0$. Finally, to compute the gradient update, we have $$\frac{dL}{d\theta} = -\int_{t_1}^{t_0} a(t)^\top \frac{\partial f(z(t), t, \theta)}{\partial \theta} dt.$$

# Continuous Normalizing Flows
Another common occurrence of the residual connection formula is in [[💦 Normalizing Flow]]s with the change of variables formula $$\log p(z_1) = \log p(z_0) - \log \left\vert \det \frac{\partial f}{\partial z_0} \right\vert \det$$ where $z_1 = f(z_0)$. Applying the same continuous idea to this transformation, we get $$\frac{\partial \log p(z(t))}{\partial t} = -\text{tr}\left( \frac{df}{dz(t)} \right).$$ This simplifies the normalizing constant to require only a linear computation rather than expensive Jacobian in standard normalizing flows. Experiments have shown that this continuous model is competitive with the standard method.