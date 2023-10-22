Eigenvalues and eigenvectors explain the properties of a [[🗺️ Linear Mapping]]. For square matrix $A$, $\lambda$ is an eigenvalue if it satisfies 
$$
Ax = \lambda x
$$
 for some $x \neq 0$, and $x$ is an eigenvector. Furthermore, it also satisfies $\text{rank}(A - \lambda I_n) < n$ and $\det(A - \lambda I_n) = 0$.

We can find eigenvalues by solving the characteristic polynomial. $\lambda$ is an eigenvalue if and only if it is a solution to 
$$
p_A(\lambda) = \det(A - \lambda I) = c_0 + c_1\lambda + \ldots + c_{n-1}\lambda^{n-1} + (-1)^n\lambda^n.
$$
 Note that $c_0 = \det A$ and $c_{n-1} = (-1)^{n-1} \text{tr}(A)$.

The algebraic multiplicity of $\lambda_i$ is the number of times it appears as a root in the characteristic polynomial.

> [!note]
> The [[📖 Determinant]] of a matrix is the product of its eigenvalues.

> [!info]
> If $A \in \mathbb{R}^{n \times n}$ has $n$ distinct eigenvalues, its eigenvectors are linearly independent. A matrix with less than $n$ linearly independent eigenvectors is called defective.

# Eigenspace
The set of all eigenvectors associated with eigenvalue $\lambda$ spans the eigenspace $E_\lambda$. This is the solution space of 
$$
(A - \lambda I)x = 0.
$$


The geometric multiplicity of $\lambda$ is the dimension of $E_\lambda$. This value is always between $1$ and the algebraic multiplicity, inclusive.

## Spectral Theorem
The Spectral theorem states that if $A$ is symmetric, there exists an orthonormal basis consisting of eigenvectors of $A$, and each eigenvalue is real.

# Power Method
The Power method is an algorithm for finding eigenvalues of square matrix $A$.

Any vector $x$ can be written as a summation over scaled eigenvectors, $x = \sum_i z_i v_i$. Then, we have the following observation.

$$
 Ax = \sum_{i=1}^n z_i Av_i = \sum_{i=1}^n z_i \lambda_i v_i 
$$

Every time we multiply $x$ by $A$, the eigenvector corresponding the largest eigenvalue gets bigger; multiplying $x$ by $A$ multiple times, we approach this eigenvector.

After multiplying $x$ multiple times by $A$, we find this eigenvector $v_1$, project it off, and continue to find $v_2\ldots v_k$.