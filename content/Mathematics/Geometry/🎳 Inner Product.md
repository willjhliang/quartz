A mapping $\Omega$ is symmetric if $\Omega(x, y) = \Omega(y, x)$ and positive definite if for vector space $\mathcal{V}$, $\forall x \in \mathcal{V} \setminus \{ 0 \}, \Omega(x, x) > 0$ and $\Omega(0, 0) = 0$. A bilinear mapping satisfies 
$$
\Omega(\lambda x + \psi y, z) = \lambda\Omega(x, z) + \psi\Omega(y, z)
$$
 and the same for the order of elements swapped.

A bilinear, symmetric, and positive definite mapping $\Omega$ is called an inner product, with $\Omega(x, y)$ usually denoted as $\langle x, y \rangle$.

> [!note]
> One common inner product is the dot product, 
$$
\langle x, y \rangle = x^\top y = \sum_{i=1}^n x_iy_i.
$$


> [!info]
> A less common definition of the inner product can be applied to functions $u$ and $v$, 
$$
\langle u, v \rangle = \int_a^b u(x) v(x) dx.
$$


# Symmetric Positive Definite
If [[🍱 Matrix]] $A$ is symmetric positive definite, then 
$$
\langle x, y \rangle = \hat{x}^\top A \hat{y}
$$
 defines an inner product where $\hat{x}$ and $\hat{y}$ are coordinate representations with respect to basis $B$, and $A_{ij} = \langle b_i, b_j \rangle$.