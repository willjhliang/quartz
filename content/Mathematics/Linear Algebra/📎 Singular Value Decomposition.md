SVD decomposes a matrix $A$ into 
$$
A = UDV^\top
$$
 where $U$ and $V$, both orthonormal, contain left and right singular vectors respectively and diagonal $D$ contains singular values.
1. The singular values $\sigma_i$ are roots of the nonzero eigenvalues of both $A^\top A$ and $AA^\top$.
2. The left singular vectors in $U$ are eigenvectors of $AA^\top$.
3. The right singular vectors in $V$ are eigenvectors of $A^\top A$.

The singular values in $D$ satisfy 
$$
AV_i = \sigma_iu_i
$$
 for left and right singular vector $u_i$ and $v_i$, respectively.

Geometrically, we can interpret this decomposition as a rotation, scaling, and another rotation.

# Matrix Approximation
We can approximate $A$ by keeping the $k$ largest singular values and their associated vectors. Specifically, 
$$
\hat{A}(k) = \sum_{i=1}^k \sigma_i u_iv_i^\top = \sum_{i=1}^k \sigma_iA_i.
$$
 This is the best approximation of $A$, minimizing distortion $\Vert A − \hat{A}\Vert_F$. 

Furthermore, 
$$
\Vert A - \hat{A}(k)\Vert_2 = \sigma_{k+1}
$$
 where the subscript denotes the spectral [[📌 Norm]].