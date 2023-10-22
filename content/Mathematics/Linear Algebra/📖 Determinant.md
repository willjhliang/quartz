The determinant is an important property of a square [[🍱 Matrix]]. For a $2 \times 2$ matrix $A$, the determinant is 
$$
\det A = \begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc.
$$

For higher dimensional matrices, we use Laplace expansion along a row or column. Along a column $j$, 
$$
\det A = \sum_{k=1}^n (-1)^{k+j}a_{kj}\det A_{k,j}
$$
 where $A_{k, j}$ is a sub-matrix we obtain by deleting row $k$ and column $j$.

> [!info]
> For an upper-triangular matrix, the determinant is the product of diagonal elements.

# Properties
Determinants exhibit the following.
1. $\det(AB) = \det(A)\det(B)$.
2. $\det A = \det A^\top$.
3. $\det A^{-1} = 1/\det A$.
4. If $A$ and $B$ are similar ($B = S^{-1}AS$), $\det A = \det B$.
5. Adding a multiple of a row to another does not change $\det A$.
6. Multiplying a row by $\lambda$ scales $\det A$ by $\lambda$.
7. Swapping two rows changes the sign of $\det A$.

Furthermore, square matrix $A$ has $\det A \neq 0$ if and only if the rank of $A$ is $n$. In other words, $A$ has non-zero determinant if and only if it's invertible.