Norm of $x$, denoted $\Vert x \Vert$, represents the “size” of the vector with three properties.
1. Positive definite: $\Vert x \Vert > 0$ for $x \neq 0$ and $\Vert x \Vert = 0$ for $x = 0$.
2. Absolutely homogeneous: $\Vert kx \Vert = \vert k \vert * \Vert x \Vert$.
3. Triangle inequality: $\Vert x + y \Vert \leq \Vert x \Vert + \Vert y \Vert$.

The $P$-norm is defined as $$\Vert x \Vert_p = (\sum_{i=1}^m \vert x_i\vert^p)^{1/p}$$

# Special Norms
For extreme values of $p$, there are special norms.
1. For $p = 0$, $\Vert x\Vert_0 = \sum_{i=1}^m \mathbf{1}(x_i \neq 0)$. In other words, this is the number of non-zero elements in $x$.
2. For $p = \inf$, $\Vert x\Vert_{\inf} = \max_i \vert x_i\vert$. This is the maximum magnitude value in $x$.

> [!info]
> Note that $L_0$ is a pseudo-norm since it violates the second property defined above. $L_0(av) \neq \vert a\vert L_0(v)$, and instead, $L_0(av) = L_0(v)$ for $a \neq 0$.

# Matrix Norms
For a matrix, we commonly use the Frobenius norm, a function of the elements in the matrix or the singular values of the matrix: $$\Vert A\Vert_F = \sqrt{\sum_{i=1}^n\sum_{j=1}^m\vert a_{i,j}\vert^2} = \sqrt{\sum_{i=1}^{\min(n, m)}\sigma_i^2} = \sqrt{\text{tr}(AA^\top )}$$

Another norm is the spectral norm, defined as $$\Vert A \Vert_2 = \max_x \frac{\Vert Ax \Vert_2}{\Vert x \Vert_2}.$$ Intuitively, this measures how long any vector $x$ can at most become when multiplied by $A$.