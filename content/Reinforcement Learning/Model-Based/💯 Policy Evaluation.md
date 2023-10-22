Policy evaluation computes the value function $V^\pi$ for a certain policy $\pi$. This is either done directly if we're given the environment dynamics or approximately with some estimation method.

# Iterative Evaluation
In the dynamic programming case, we're given the environment dynamics $p(s', r \vert s, a)$ and can solve the [[🔔 Bellman Equation]] directly. However, this system of equations is usually too computationally expensive, so we can instead perform an iterative approach, 
$$
V^\pi(s) = \sum_a \pi(a \vert s) \sum_{s', r} p(s' ,r \vert s, a) [r + \gamma V^\pi(s')].
$$


# Monte Carlo Estimate
Without the environment dynamics, one approach is to run our policy and collect trajectories with rewards. Then, we approximate $V^\pi(s_t)$ using a function approximator 
$$
V^\pi(s_t) \approx V^\pi_\phi(s_t) = \sum_{t'=t}^T r(s_{t'}, a_{t'}).
$$


Fitting this approximator with weights $\phi$ is a supervised learning problem with training data consisting of state-reward pairs 
$$
\left\{ \left(s_{it}, y_i=\sum_{t'=t}^T r(s_{it'}, a_{it'}) \right) \right\},
$$
 and we train on the objective 
$$
\frac{1}{2}\sum_{i=1}^N \Vert V_\phi^\pi(s_i) - y_i \Vert^2.
$$


# Bootstrap Estimate
We can improve our above estimates for $V^\pi(s_t)$ by observing that 
$$
V^\pi(s_t) \approx r(s_t, a_t) + V^\pi(s_{t+1}).
$$
 Instead of taking a single Monte Carlo estimate for the trajectory after time $t$, we now have a single-sample estimate for just the next reward and use the expectation for the trajectory after $t+1$.

However, we don't actually know the true $V^\pi(s_{t+1})$, so we replace it with our function approximator. Then, our training data is 
$$
\left\{ \left(s_{it}, y_i=r(s_{it}, a_{it}) \right) + V^\pi_\phi(s_{i(t+1)}) \right\},
$$
 and we use the same objective as above. This reduces the variance of our approximation, but it introduces more bias since we're using our approximation of $V^\pi$.

Finally, there's one small modification to the estimate in case we have an infinite-horizon problem. In the current setup, the value function will keep getting larger and larger due to the infinite horizon. To address this, we introduce a discount factor $\gamma \in [0, 1]$ that slightly reduces the value of the next time step, giving us 
$$
y_i = r(s_t, a_t) + \gamma V^\pi_\phi(s_{t+1}).
$$
 This is analogous to putting a "time pressure" on our values, prioritizing sooner rewards over than equivalent later rewards.