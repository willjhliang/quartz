The gradient is a generalization of the [[🍧 Derivative]] to functions with several variables. We find the gradient by varying one variable at the time, keeping the others constant, to find partial derivatives.

# Partial Derivatives
The partial derivative is defined for function $f$ as 
$$
\frac{\partial f}{\partial x_k} = \lim_{h \rightarrow 0} \frac{f(x_1, \ldots, x_k + h, \ldots, x_n) - f(x_1, \ldots, x_n)}{h}.
$$


Computing all partial derivatives and collecting them in a vector, we get the gradient 
$$
\nabla_x f = \frac{df}{dx} = \begin{bmatrix} \frac{\partial f(x)}{\partial x_1} & \ldots \frac{\partial f(x)}{\partial x_n} \end{bmatrix}.
$$


# Partial Differentiation Rules
The rules from univariate differentiation still apply, but order matters since we're dealing with matrices and vectors. The following state them more concretely using partial derivatives.
1. Product rule: $\frac{\partial}{\partial x}(f(x)g(x)) = \frac{\partial f}{\partial x}g(x) + f(x)\frac{\partial g}{\partial x}$.
2. Sum rule: $\frac{\partial}{\partial x}(f(x) + g(x)) = \frac{\partial f}{\partial x} + \frac{\partial g}{\partial x}$.
3. Chain rule: $\frac{\partial}{\partial x}(g \circ f)(x) = \frac{\partial g}{\partial f} \frac{\partial f}{\partial x}$.

> [!info]
> Note that if we compute gradients as row vectors, we can compute the chain rule for multiple multivariate functions via matrix multiplication.

# Vector Gradients
Functions can also output vectors. For a function $f: \mathbb{R}^n \rightarrow \mathbb{R}^m$, we have 
$$
f(x) = \begin{bmatrix}f_1(x) \\ \vdots \\ f_m(x)\end{bmatrix}.
$$

Taking the partial derivative of $f$ with respect to $x_i$, we have 
$$
\frac{\partial f}{\partial x_i} = \begin{bmatrix}\frac{\partial f_1}{\partial x_i} \\ \vdots \\ \frac{\partial f_m}{\partial x_i}\end{bmatrix} = \begin{bmatrix}\lim_{h \rightarrow 0} \frac{f_1(x_1, \ldots, x_i + h, \ldots, x_n) - f_1(x)}{h} \\ \vdots \\ \lim_{h \rightarrow 0} \frac{f_m(x_1, \ldots, x_i + h, \ldots, x_n) - f(x)}{h}\end{bmatrix}.
$$


Each partial derivative is a column vector, and since the gradient stacks partial derivatives in a row, we find the gradient of $f$ to be 
$$
\frac{df}{dx} = \begin{bmatrix}\frac{\partial f_1(x)}{\partial x_1} & \ldots & \frac{\partial f_1(x)}{\partial x_n} \\ \vdots & & \vdots \\ \frac{\partial f_m(x)}{\partial x_1} & \ldots & \frac{\partial f_m(x)}{\partial x_n}\end{bmatrix} \in \mathbb{R}^{m \times n}.
$$


This matrix is also called the Jacobian, $J = \nabla_xf = \frac{df}{dx}$, $J_{ij} = \frac{\partial f_i}{\partial x_j}$.

> [!info]
> Note that if we have a function $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$, the Jacobian $J$ locally approximates the coordinate transformation. The determinant of $J$ is the change in area or volume.

# Matrix Gradients
We can compute gradients in higher dimensions as well. For example, the gradient of $A \in \mathbb{R}^{m \times n}$ with respect to $B \in \mathbb{R}^{p \times q}$ is a tensor $J$ with shape $(m \times n) \times (p \times q)$, and $J_{ijkl} = \frac{\partial A_{ij}}{\partial B_{kl}}$.

However, we can take advantage of the fact that there is a isomorphism from matrix space $\mathbb{R}^{m \times n}$ to vector space $\mathbb{R}^{mn}$, which allows us to compute the Jacobian just like above.

The following are some useful gradients used in machine learning.
1. 
$$
\frac{\partial}{\partial X}f(X)^\top = \left(\frac{\partial f(X)}{\partial X}\right)^\top
$$

2. 
$$
\frac{\partial}{\partial X} \text{tr}(f(x)) = \text{tr}\left(\frac{\partial f(X)}{\partial X}\right)
$$

3. 
$$
\frac{\partial}{\partial X} \det(f(X)) = \det(f(X)) \text{tr}\left( f(X)^{-1}\frac{\partial f(X)}{\partial X} \right)
$$

4. 
$$
\frac{\partial}{\partial X}f(X)^{-1} = -f(X)^{-1} \frac{\partial f(X)}{\partial X} f(X)^{-1}
$$

5. 
$$
\frac{\partial a^\top X^{-1}b}{\partial X} = -(X^{-1})^\top ab^\top (X^{-1})^\top
$$

6. 
$$
\frac{\partial x^\top a}{\partial x} = \frac{\partial a^\top x}{\partial x} = a^\top
$$

7. 
$$
\frac{\partial a^\top Xb}{\partial X} = ab^\top
$$

8. 
$$
\frac{\partial x^\top Bx}{\partial x} = x^\top (B + B^\top )
$$

9. 
$$
\frac{\partial}{\partial s}(x - As)^\top W(x - As) = -2(x - As)^\top WA \text{ if $W = W^\top$}
$$

# Second-Order Derivatives
Derivatives can be applied one-after-another. For example, 
$$
\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right).
$$
 For a twice-differentiable function, 
$$
\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial^2 f}{\partial y \partial x}.
$$
 In other words, the order of differentiation doesn't matter.

For a function $f(x, y)$, we can compute the Hessian 
$$
H = \nabla^2_{x, y}f =  \begin{bmatrix}\frac{\partial^2 f}{\partial x^2} & \frac{\partial^2 f}{\partial x \partial y} \\ \frac{\partial^2}{\partial x\partial y} & \frac{\partial^2 f}{\partial y^2}\end{bmatrix}.
$$
 This matrix measures the curvature of the function around $(x, y)$.