A vector $x$ is anything that is closed under addition and scalar multiplication. In other words, it satisfies the following.
1. $x + y = z$.
2. $kx = y$ for some scalar $k$.

> [!info]
> Geometric vectors, polynomials, audio signals, and tuple elements of $\mathbb{R}^n$ are all vectors.

# Vector Spaces
Vector space $\mathcal{V}$ is a set that's closed under addition and scalar multiplication. It also contains the zero vector $0$. Examples of vector spaces include $\mathbb{R}^n$ and $\mathbb{R}^{m \times n}$.

Vector subspaces are sets $\mathcal{U} \subseteq \mathcal{V}$ that are closed under addition and scalar multiplication.

# Linear Independence
A linear combination $v$ of vectors $x_1, \ldots, x_k$ is defined as 
$$
v = \lambda_1x_1 + \ldots + \lambda_kx_k.
$$
 
Vectors $x_1, \ldots, x_k$ are linearly independent if there are no non-trivial ($\lambda_1 = \ldots = \lambda_k = 0$) solutions to $\sum_{i=1}^k \lambda_ix_i = 0$. If there is such a solution, then the vectors are linearly dependent.

# Bases
For a vector space $\mathcal{V}$ and set of vectors $\mathcal{A} = \{x_1, \ldots, x_k\} \subseteq \mathcal{V}$, $\mathcal{A}$ is a generating set if every vector $v \in \mathcal{V}$ can be expressed as a linear combination of $x_1, \ldots, x_k$. All linear combinations of $x_i \in \mathcal{A}$ is called the span of $\mathcal{A}$. Finally, if $x_1, \ldots, x_k$ are linearly independent, $\mathcal{A}$ is minimal and a basis of $\mathcal{V}$.

Every vector space $\mathcal{V}$ has infinitely many bases, but they all have the same number of basis vectors. This number is the dimension of $\mathcal{V}$.

For a [[🍱 Matrix]] $A$, the number of linearly independent rows or columns is called the rank of $A$. Note that the number of linearly independent rows equals the number of linearly independent columns.