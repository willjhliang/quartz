The angle $\omega$ between vectors $x$ and $y$ can be calculated by 
$$
\cos \omega = \frac{\langle x, y \rangle}{\Vert x \Vert \Vert y \Vert}.
$$
 Intuitively, the smaller the angle, the more similar $x$ and $y$ are.

# Orthogonality
Then, since orthogonal vectors have $\cos \omega = 0$, two vectors are orthogonal if and only if $\langle x, y \rangle = 0$. If $x$ and $y$ are unit, they're orthonormal.

Furthermore, a basis $(b_1, \ldots, b_n)$ is orthonormal if $\langle b_i, b_j \rangle = 0$ for $i \neq j$ and $\langle b_i, b_i \rangle = 1$. It's possible to construct an orthonormal basis from any basis using the Gram-Schmidt process.

The orthogonal complement $\mathcal{U}^\perp$ of subspace $\mathcal{U} \subseteq \mathcal{V}$ contains all vectors in $\mathcal{V}$ that are orthogonal to every vector in $\mathcal{U}$. The intersection of $\mathcal{U}$ and $\mathcal{U}^\perp$ is the $0$ vector, and the bases of each combined form a basis for $\mathcal{V}$.