Kernels measure the similarity between two points $x_i$ and $x_j$. As such, it follows the invariant that the kernel matrix $K_{ij} = k(x_i, x_j)$ is symmetric and positive semi-definite (non-negative eigenvalues).

Another way to view kernels is that it computes of the inner product of $x_i$ and $x_j$ transformed to another feature space. Instead of directly transforming the points and computing the inner product $T(x_i) \cdot T(x_j)$, the kernel finds the value directly.

There are multiple types of kernels for different transformations.
1. Linear: $k(x, y) = x^\top y$
2. Polynomial: $k(x, y) = (x^\top y + c)^p$
3. Gaussian: $k(x, y) = \exp\{-\Vert x-y\Vert^2/\sigma^2\}$

# Kernel Trick
The kernel trick is a strategy for applying linear models to non-linear data. By using a kernel in the model's dual form, which solely relies on the relationship between pairs of datapoints, we can effectively transform the data into another feature space where the classes are linearly separable. This trick is especially effective because kernels don't require us to know the actual feature space.

This trick is most notably used in [[🛩️ Support Vector Machine]]s, allowing it to fit a curve to the original data.