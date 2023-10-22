Coplanar PNP is a variant of the standard [[📏 Perspective-N-Point]] problem with the additional guarantee that the 3D points lie on the same plane. If we let them all lie on the ground, $Z_w = 0$, our goal is the following: given $N$ correspondences from world points to pixels $(X_w, Y_w, u, v)$ and the camera intrinsics $K$, find the rotation $R$ and translation $T$ of the camera.

The [[🗺️ Coordinate Systems#World Coordinates to Image Coordinates]] equation is given by 
$$
\begin{pmatrix}u \\ v \\ 1\end{pmatrix} \sim K \begin{pmatrix}r_1 & r_2 & r_3 & T\end{pmatrix} \begin{pmatrix}X_w \\ Y_w \\ Z_w \\ 1\end{pmatrix}
$$

Assuming $Z_w = 0$, we can write this as 
$$
\begin{pmatrix}u \\ v \\ 1\end{pmatrix} \sim K \begin{pmatrix}r_1 & r_2 & T\end{pmatrix}\begin{pmatrix}X_w \\ Y_w \\ 1\end{pmatrix}
$$


Observe that this is a [[📽️ Projective Geometry#Projective Transformation]] with $H \sim K \begin{pmatrix}r_1 & r_2 & T\end{pmatrix}$. The determinant is zero only when the camera lines in the ground plane $Z_w = 0$.

We can find $H$ by solving the [[🖼️ Homography]] as usual, but our problem now is that $K^{-1}H \sim \begin{pmatrix}r_1 & r_2 & T\end{pmatrix}$ must have the first two columns be orthogonal unit vectors. Therefore, we have an extra few steps using [[📎 Singular Value Decomposition]].

Compute $H' = K^{-1}H = \begin{pmatrix}a & b & c\end{pmatrix}$. We want to find 
$$
\arg\min_{\lambda, r_1, r_2, T}\Vert \begin{pmatrix}a & b & c\end{pmatrix} - \lambda \begin{pmatrix}r_1 & r_2 & T\end{pmatrix}\Vert_F
$$

with the constraints $r_1^\top r_2 = 0$ and $\Vert r_1 \Vert = \Vert r_2 \Vert = 1$. We can do this by decomposing the first two columns of $H'$, 
$$
\begin{pmatrix}a & b \end{pmatrix} = U \begin{pmatrix}s_1 & 0 \\ 0 & s_2 \\ 0 & 0\end{pmatrix}V^\top
$$

Then, $\begin{pmatrix}r_1 & r_2\end{pmatrix} = UV^\top$, $\lambda = (s_1 + s_2)/2$, and $T = c/\lambda$. Finally, to fill in $R$, we have $R = \begin{pmatrix}r_1 & r_2 & r_1 \times r_2\end{pmatrix}$.