In deep learning, our output $y$ goes through multiple layers of function composition, 
$$
y = (f_K \circ f_{K-1} \circ \ldots \circ f_1)(x).
$$


With loss function $L$ and parameters $\theta_i$ applied to $f_i$ to get $f_{i+1}$, we perform [[⛰️ Gradient Descent]] by iteratively computing the [[❄️ Gradient]] layer-by-layer: 
$$
\begin{align*}\frac{\partial L}{\partial \theta_{K-1}} &= \frac{\partial L}{\partial f_K} \frac{\partial f_K}{\partial \theta_{K-1}} \\ \frac{\partial L}{\partial \theta_{K-2}} &= \frac{\partial L}{\partial f_K} \frac{\partial f_K}{\partial f_{K-1}} \frac{\partial f_{K-1}}{\partial \theta_{K-2}} \\ &\ldots \\ \frac{\partial L}{\partial \theta_i} &= \frac{\partial L}{\partial f_K} \frac{\partial f_K}{\partial f_{K-1}} \ldots \frac{\partial f_{i+2}}{\partial f_{i+1}} \frac{\partial f_{i+1}}{\partial \theta_i} \end{align*}
$$


# Automatic Differentiation
Backpropagation is a specific instance of a general technique called automatic differentiation. A computation graph over input variables $x_1, \ldots, x_d$, intermediate variables $x_{d+1}, \ldots, x_{D-1}$, and output variable $x_D$ can be expressed as 
$$
x_i = g_i(x_{\text{Pa}(x_i)})
$$
 where $g_i$ is an elementary function and $x_{\text{Pa}(x_i)}$ are parent nodes of $x_i$.

Then, for function $f$ that takes in the inputs and produces the output $f = x_D$, we have $\frac{\partial f}{\partial x_D} = 1$. For the remaining variables, we apply the chain rule, 
$$
\frac{\partial f}{\partial x_i} = \sum_{x_j: x_i \in \text{Pa}(x_j)} \frac{\partial f}{\partial x_j} \frac{\partial x_j}{\partial x_i} = \sum_{x_j: x_i \in \text{Pa}(x_j)} \frac{\partial f}{\partial x_j} \frac{\partial g_j}{\partial x_i}.
$$
