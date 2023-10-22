A square matrix $A$ is diagonalizable if it's similar to a diagonal matrix, $D = P^{-1}AP$. Below, we'll show that this is equivalent to express [[🗺️ Linear Mapping]] $A$ in another basis consisting of the eigenvectors of $A$.

---
**Proof of Diagonalization**

Given $A$, let $P = \begin{bmatrix} p_1 & \ldots & p_n \end{bmatrix}$ contain vectors in $\mathbb{R}^n$. We want to find 
$$
AP = PD
$$
 for some diagonal matrix $D$ with diagonal entries $\lambda_1, \ldots, \lambda_n$.

The left hand side is equivalent to $\begin{bmatrix}Ap_1 & \ldots & Ap_n\end{bmatrix}$, and the right hand side is equivalent to $\begin{bmatrix}\lambda_1p_1 & \ldots & \lambda_np_n\end{bmatrix}$. By definition, $\lambda_i$ must be the [[💐 Eigenvalue]]s of $A$, and $p_i$ must be eigenvectors.

---

Therefore, we have the eigendecomposition 
$$
A = PDP^{-1}
$$
 where $P$ consists of eigenvectors and $D$ consists of eigenvalues. A matrix $A$ can only be factored in this way if its eigenvectors form a basis of $\mathbb{R}^n$; in other words, only non-defective matrices can be diagonalized.

In this form, we can easily find the determinant of $A$, 
$$
\det A = \det(P)\det(D)\det(P^{-1}) = \det(D) = \prod_i d_{ii}.
$$


# Powers
Since diagonal matrices can be easily raised to a power, 
$$
A^k = (PDP^{-1})^k = PD^kP^{-1}.
$$
