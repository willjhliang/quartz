Gradient descent is a method of optimizing model weights that's commonly used when there’s no direct closed form solution; other online methods also use gradient descent when closed form solutions are too expensive to compute.

The observation at the core of gradient descent is that the gradient of our objective $J(\theta)$ points toward the direction of steepest ascent; that is, the gradient defining the "tangent" to our objective is oriented so that moving "up" the tangent increases our objective the most.

Commonly, our goal in machine learning is to minimize the objective. Thus, our gradient update step subtracts the gradient 
$$
\theta' \leftarrow \theta - \alpha\frac{\partial}{\partial\theta}J(\theta)
$$
 for some hyperparameter $\alpha$ chosen manually. Intuitively, this is changing our parameters $\theta$ toward the direction of "steepest descent." Below is a graphical representation with two weights $\theta_1$ and $\theta_2$, with the inner-most blue ring representing the global minimum $J(\theta)$.

![[20221229103152.png#invert|300]]

An alternate interpretation of gradient descent is through the lens of [[👠 Constrained Optimization]], where our objective is to minimize a linearization of our objective in some neighborhood defined by our step size; the constraint controls how far we move with the gradient. Formally, our problem is 
$$
\theta' \leftarrow \arg\min_{\theta'} \nabla_\theta J(\theta)^\top (\theta' - \theta) \text{ such that } \Vert \theta - \theta' \Vert^2 \leq \epsilon
$$
 where our objective is the gradient direction applied to our change in parameters; that is, if $\theta' - \theta$ defines the space where we can move (constrained by our inequality), the $\nabla_\theta J(\theta)^\top (\theta' - \theta)$ defines how much we change $J(\theta)$ for some $\theta'$, and we seek to minimize this change (going in the steepest descent). Finally, it can be shown that $\alpha$ is related to our constraint $\epsilon$ by 
$$
\alpha = \sqrt{\frac{\epsilon}{\Vert \nabla_\theta J(\theta) \Vert^2}}\nabla_\theta J(\theta),
$$
 so our constraint is indeed determined by $\alpha$.

# Update Timing
The gradient $\frac{\partial}{\partial \theta}J(\theta)$ is calculated for each data point. Due to computational costs, there are multiple timings for when to apply this gradient to update the weights $\theta$.
1. Batch gradient descent updates weights after going through the entire dataset $X$
2. Stochastic gradient descent updates weights after computing the derivative for a single datapoint $x^{(i)}$, resulting in oscillations but decreasing convergence duration
3. Mini-batch gradient descent is a balance between the two, updating weights after checking $B$ datapoints

# Momentum
Convergence with standard gradient descent may be slow if the curvature is poorly scaled, like a valley. Momentum is an additional term that remembers what happened in previous update steps; incorporating this into our algorithm dampens oscillations and smoothes out the updates.

Mathematically, momentum $b_i$ is calculated as an exponential moving average, 
$$
b_t = \mu b_{t-1} + \frac{\partial}{\partial\theta}J(\theta)
$$
 Then, our update rule becomes 
$$
\theta_{t+1} = \theta_t - \alpha b_t
$$
