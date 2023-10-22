Principle Component Analysis (PCA) is used for dimensionality reduction, decomposing datapoint vectors $x^{(i)}$ in terms of coefficients $z^{(i)}$ on $k$ orthogonal unit basis vectors $u_j$. There are infinite bases we can use for $v_i$, but PCA aims to maximize the variance of the projected points (so that projections don't collapse points into a single space) and minimize the distortion, or data loss.

Note that we first mean center the data, subtracting $\bar{x}$ from all datapoints. This is used later to relate our equations to covariance, and all operations below will denote $\bar{x}$ as the mean.

# Projection
For an individual vector $x^{(i)}$, its projection onto the basis is defined by $$z^{(i)} = ((x^{(i)} - \bar{x})^\top u_1, \ldots, (x^{(i)} - \bar{x})u_k).$$ To reconstruct $x^{(i)}$ from $z^{(i)}$, we calculate $$\hat{x}^{(i)} = \bar{x} + \sum_{j=1}^k z^{(i)}_j u_j.$$

We can also write this in matrix form; for data $X$ arranged in a matrix (such that each row is one vector $x^{(i)}$), $$ X = ZV^\top$$ where $Z$ containing $z^{(i)}$ are the principal component scores and $V$ containing $u_j$ are principal components, also called loadings.

# Optimization
We can derive the analytical solution to PCA by following either methodology: minimizing distortion or maximizing variance.

## Minimizing Distortion
Distortion is defined as $$\Vert X - ZV^\top \Vert_F = \sum_{i=1}^n \Vert x^{(i)} - \hat{x}^{(i)}\Vert_2^2.$$

Plugging in our definition for $x^{(i)}$ and $\hat{x}^{(i)}$ above, we get $$\Vert X-ZV^\top \Vert_F = \sum_{i=1}^n \Vert(\bar{x}+\sum_{j=1}^mz_j^{(i)}u_j) - (\bar{x} + \sum_{j=1}^kz_j^{(i)}u_j)\Vert_2^2 = \sum_{i=1}^n \sum_{j=k+1}^m (z_j^{(i)})^2.$$

This shows that distortion is the sum of squared scores that we leave out. Plugging in the equation for the scores as defined above, we find that distortion actually equals $$\sum_{i=1}^n\sum_{j=k+1}^m u^\top (x^{(i)} - \bar{x})(x^{(i)} - \bar{x})^\top u_j = n\sum_{j=k+1}^m u_j^\top \Sigma u_j$$ where $\Sigma = \frac{1}{n}\sum_{i=1}^n (x^{(i)} - \bar{x})(x^{(i)} - \bar{x})^\top = \frac{1}{n}X^\top X$ is the covariance matrix of our data. (Note that in the equation above, we also swap ${x^{(i)}}^\top u_j = u_j^\top x^{(i)}$, but the value remains equivalent.)

To minimize distortion, we first observe that the covariance matrix is symmetric and therefore diagonal in its eigenvector basis. Because it's diagonal, the axes are independent, and we minimize distortion by leaving out the dimensions that have minimum variance.

> [!note]
> For a more mathematical proof, we use Lagrange multipliers. For $k = 1$, to minimize $u^\top \Sigma u$ with the constraint that $\Vert u\Vert = u^\top u = 1$, we differentiate the Lagrangian $u^\top \Sigma u - \lambda(u^\top u - 1)$ to get $\Sigma u - \lambda u = 0$, the definition of an eigenvector.

Setting $u_j$ to be the eigenvectors of the covariance matrix, we see that distortion is the sum of discarded eigenvalues, $$n\sum_{j=k+1}^m u_j^\top \lambda_ju_j = n\sum_{j=k+1}^m \lambda_j.$$

Observe that by setting the basis in this way, our basis is orthogonal. In other words, the components are uncorrelated, and the transformation of $x^{(i)}$ into $z^{(i)}$ gives us uncorrelated features. Moreover, uncorrelated components is intuitively the best way to minimize distortion since any correlation would be redundant.

## Maximizing Variance
Variance is defined as $$\sum_{i=1}^n\sum_{j=1}^k (z^{(i)}_j)^2 = \sum_{i=1}^n\sum_{j=1}^k (u_j^\top x^{(i)} - u_j^\top \bar{x})^2 = \sum_{j=1}^k u_j^\top [\sum_{i=1}^n(x^{(i)}-\bar{x})(x^{(i)}-\bar{x})^\top ]u_j.$$

Note that since we subtract off the mean from $x^{(i)}$, $\bar{z} = 0$ and is excluded from the variance formula above.

Observe that the middle summation is again a form of $\Sigma$. The equation then tells us that variance is the sum of squared eigenvalues we do include. $$n \sum_{j=1}^k u_j^\top \Sigma u_j = n\sum_{j=1}^k \lambda_j.$$

Therefore, by maximizing variance, we're also minimizing distortion (and vice versa). If we add them together, we get their inverse relationship $$ \text{Variance}_k + \text{Distortion}_k = n\sum_{j=1}^m \lambda_j = n\text{tr}(\Sigma).$$

# Visualization
As for a visual example, in the image below, we can see that the eigenvectors and their associated eigenvalues (the eigenvector's magnitude) fit the distortion-minimization variance-maximization objective.

![[20221229103232.png#invert|400]]

Projecting points onto the largest eigenvector (going from 2D to 1D) will maximize the spread since this axis has largest variance. It also minimizes the distortion, geometrically interpreted as the distance from each point to our new axis.

## Computation
There are two methods to compute the PCA's eigenvectors. The direct way requires us to find the covariance matrix, which may be computationally expensive; an alternative method uses SVD to avoid this cost.

### Direct PCA
Given data $D$, compute $\bar{x} = \frac{1}{n}\sum_{i=1}^n x^{(i)}$, the average over $x$, and covariance matrix $\Sigma$.

Find the $k$ largest eigenvalues of $\Sigma$ and their associated eigenvectors $v_1 \ldots v_k$, which are our principal components.

### PCA via SVD
Given data $D$, compute $\bar{x} = \frac{1}{n}\sum_{i=1}^n x^{(i)}$, the average over $x$, and let $X_c$ contains rows $x^{(i)} - \bar{x}$.

Compute [[📎 Singular Value Decomposition]] $X_c = USV^\top$, and take the $k$ rows of $V^\top$ with the largest singular values as our principal components.

Note that the singular values calculated by SVD for $X$ are roots of the eigenvalues of $X^\top X$, and the right singular vectors form an orthonormal basis of $X^\top X$. The SVD method therefore calculates our eigenvalues and eigenvectors for $\Sigma$.

# Variants
PCA has a few variants that add onto its basic functionality.
1. Sparse PCA adds an $L_1$ penalty to the size of the scores and components in our distortion equation, so the optimal values are no longer eigenvectors and require alternating gradient descent.
2. Kernelized PCA can model a nonlinear transformation of the original data.