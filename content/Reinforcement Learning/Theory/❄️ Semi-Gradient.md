Semi-gradients are commonly used for function approximation updates. While most deep learning methods follow some variant of [[⛰️ Gradient Descent]], reinforcement learning updates sometimes require bootstrapping—that is, our function estimate is part of the target, and thus updating the function with a standard gradient descent update gives us a semi-gradient instead of a true gradient.

For example, let's approximate $V$ with a function $V_\theta$. In standard gradient descent, since our target also uses our function $V_\theta$, the update step would need to consider how the update would affect the target as well. We usually don't consider this and instead allow a slight bias to our update; hence, in bootstrapping methods that update the gradient with a target estimate that depends on parameters $\theta$, we use the semi-gradient update: 
$$
\theta \leftarrow \theta + \alpha[R + \gamma V_\theta(S') - V_\theta(S)] \nabla_\theta V_\theta(S).
$$


Note that this update is exactly the standard gradient update for some target $y = R + \gamma V_\theta(S') - V_\theta(S)$—the only reason this is a semi-gradient is because $y$ is dependent on $\theta$.