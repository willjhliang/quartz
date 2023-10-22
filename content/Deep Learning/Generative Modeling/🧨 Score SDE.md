The score SDE, a time-dependent score-based model, seeks to learn the score of the data distribution. This is an extension of the [[🎧 NCSN]] into infinitesimally small noise-scale steps. This model also shares heavy resemblances to [[🕯️ Diffusion Probabilistic Model]]s.

# SDE Perturbation
Let $p_t(x)$ be the data distribution perturbed with noise at time $t$. Unlike the discrete noise scales in NCSN, $p_t(x)$ follows a stochastic differential equation $$dx = f(x,t)dt + g(t)dw$$ where $dw$ is white noise. At $t = 0$, $p_0(x) = p(x)$, the original data distribution, and with $t = T$ for high enough $T$, $p_T(x) = \pi(x)$, a tractable prior noise distribution.

As $t$ increases, we increasingly add noise, defined by diffusion coefficient $g(t)$, and guide the general direction with $f(x, t)$, the drift coefficient. $f(x, t)$ and $g(t)$ are hand-designed.

![[20230302131517.gif#invert|500]]

# SDE Reversal
To recover our data distribution from $\pi(x)$, we reverse the SDE using $$dx = [f(x,t) - g^2(t)\nabla_x\log p_t(x)]dt + g(t)dw.$$ The time-dependent score-based model seeks to learn this score, $$s_\theta(x, t) \approx \nabla_x \log p_t(x).$$

![[202303021315172.gif#invert|500]]

## Optimization
We follow a similar setup from NCSN, training $s_\theta$ on the objective $$\mathbb{E}_{t \in \mathcal{U}(0, T)} \mathbb{E}_{x \sim p_t} [\lambda(t) \Vert \nabla_x \log p_t(x) - s_\theta(x, t) \Vert_2^2],$$ with $\lambda(t)$ typically set to the inverse of the expectation to balance losses over time.

## Predictor-Corrector
To computationally solve the reverse SDE, we can use the Euler-Maruyama method, which quantizes time $\Delta t$ and defines $z_t \sim \mathcal{N}(0, \mathbf{I})$ to get the following: $$\begin{align*} \Delta x &\leftarrow [f(x,t) - g^2(t)s_\theta(x, t)]\Delta t + g(t)\sqrt{\vert \Delta t \vert} z_t \\ x &\leftarrow x + \Delta x \\ t &\leftarrow t + \Delta t\end{align*}$$

This can be improved via fine-tuning with [[🎯 Markov Chain Monte Carlo]]. The predictor is a SDE solver like Euler-Maruyama that predicts the next step $x(t + \Delta t)$, and the corrector uses MCMC methods like [[☄️ Langevin Dynamics]] to improve the sample $x(t + \Delta t)$ using the score $s_\theta(x, t + \Delta t)$. In other words, the predictor moves us to the next data distribution $p_{t + \Delta t}$, and the corrector finds a better quality sample from $p_{t + \Delta t}$.

With this method, we can achieve incredibly realistic samples from our modeled distribution.

# Probability Flow ODE
One limitation of the SDE method is that we can't compute the log likelihood of our model. Fortunately, we can convert the SDE to an ordinary differential equation $$dx = \left[ f(x, t) - \frac{1}{2}g^2(t) s_\theta(x, t)\right]dt.$$ This resembles a [[🎱 Neural ODE]], which thus allows us to compute the exact log likelihood.