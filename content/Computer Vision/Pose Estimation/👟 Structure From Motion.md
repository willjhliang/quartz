Structure from motion deals with finding the rotation and translation between two views. Given correspondences $\{(u_1, v_1, u_2, v_2)_i \}$ and intrinsics $K_1, K_2$, our goal is to find $R, T$ from one camera to the other as well as depths $(\lambda, \mu)_i$ for each correspondence.

![[20230423101756.png#invert|400]]

Let's hone in on a single correspondence. first, we can find the calibrated coordinates $p = K_1^{-1} \begin{pmatrix}u_1 & v_1 & 1\end{pmatrix}^\top$ and $q = K_2^{-1} \begin{pmatrix}u_2 & v_2 & 1\end{pmatrix}^\top$. These rays are related in space by $R$ and $T$; specifically, since the world point can be found as $\lambda p = \mu q$ in each of the camera's individual coordinate systems, we can rotate one view to match the coordinate system of the other view, giving us $$\mu q = \lambda Rp + T.$$

# Essential Matrix
To solve for $R, T, \lambda, \mu$ in the above equation, we'll use constraints from [[📍 Epipolar Geometry]]. Specifically, the epipolar constraint gives us $$q^\top (T \times Rp) = 0$$ (since all three vectors lie on the same triangle and thus the same plane). Note that this introduces scale ambiguity since $T$ on any scale gives us a valid solution.

Next, define $$a \times b = 0 \equiv \hat{a} b = 0 \text{ for } \hat{a} = \begin{pmatrix}0 & -a_z & a_y \\ a_z & 0 & -a_x \\ -a_y & a_x & 0\end{pmatrix}.$$ Applying this to the constraint, we have $$q^\top \hat{T}Rp = q^\top E p = 0$$ where $E = \hat{T}R$ is called the essential matrix. 

> [!note]
> If we have uncalibrated pixels $p' = K_1 p$ and $q' = K_2 q$, we have $$q' K_2^{-1} E K_1^{-1}p' = q'Fp'$$ where $F = K_2^{-1} E K_1^{-1}$ is the fundamental matrix.

Our strategy is now to first solve for $E$, then find $R$ and $T$ from $E$.

# Solving the Essential Matrix
First, let $E = \begin{pmatrix}e_1 & e_2 & e_3\end{pmatrix}$ where $e_i$ is a column vector. Then, our above constraint gives us $$q^\top \begin{pmatrix}e_1 & e_2 & e_3\end{pmatrix} \begin{pmatrix}p_x \\ p_y \\ p_z\end{pmatrix} = q^\top (p_x e_1 + p_y e_2 + p_z e_3) = 0.$$ Rearranging to a system of equations for $e_1, e_2, e_3$, we have $$\begin{pmatrix}p_x q^\top & p_y q^\top p_z q^\top\end{pmatrix}\begin{pmatrix}e_1 \\ e_2 \\ e_3\end{pmatrix} = 0.$$ Note that these vectors are $1 \times 9$ and $9 \times 1$, and to find $e_1, e_2, e_3$, we need 8 rows (which can be found with [[🎲 RANSAC]]), forming $$A \begin{pmatrix}e_1 \\ e_2 \\ e_3\end{pmatrix} = 0.$$ $\begin{pmatrix}e_1 & e_2 & e_3\end{pmatrix}^\top$ is then in the null space of $A$ and can be found via [[📎 Singular Value Decomposition]], $A = USV^\top$, as the last column of $V$.

Some linear algebra can show that since the essential matrix is the product of an antisymmetric $\hat{T}$ and special orthogonal $R$, it must have singular values $\sigma_1, \sigma_2, \sigma_3$ such that $\sigma_1 = \sigma_2$ and $\sigma_3 = 0$. In practice, to maintain this property for our estimated $E$, we compute $E = USV^\top$ and approximate the final essential matrix as $$E' = U \begin{pmatrix}(\sigma_1 + \sigma_2)/2 & 0 & 0 \\ 0 & (\sigma_1 + \sigma_2)/2 & 0 \\ 0 & 0 & 0\end{pmatrix} V^\top.$$

# Recovering Rotation and Translation
We can use the singular value property to recover $R$ and $T$. First, we need two observations:
1. If $Q$ is orthogonal, $\widehat{Qa} = Q \hat{a} Q^\top$ (which can be shown algebraically).
2. We can express the matrix $$\begin{pmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0\end{pmatrix} = -\hat{T_z} R_{z, \pi/2}$$ where $T_z$ is a unit translation in the z direction and $R_{z, \pi/2}$ is a 90-degree rotation around the z axis. Their respective matrices can be multiplied together to get the left hand side.

Now, let $\sigma_1 = \sigma_2 = \sigma$. The SVD gives us the following: $$\begin{align*} E &= U \begin{pmatrix}\sigma & 0 & 0 \\ 0 & \sigma & 0 \\ 0 & 0 & 0\end{pmatrix} V^\top \\ &= \sigma U \begin{pmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0\end{pmatrix} V^\top \\ &= \sigma U (-\hat{T_z}) U^\top U R_{z, \pi/2} V^\top \\ &= \sigma\widehat{(-U T_z)} U R_{z, \pi/2} V^\top \\ &= \sigma (\hat{-u_3}) UR_{z, \pi/2} V^\top \end{align*}$$

Now, observe that $-\hat{u_3}$ is antisymmetric, and $UR_{z, \pi/2} V^\top$ is orthogonal, giving us $$T = -u_3,\ R = UR_{z, \pi/2} V^\top.$$

# Multiple Solutions
Unfortunately, due to the scale ambiguity introduced by the epipolar constraint, if $E$ is a solution, so is $-E$. Moreover, if $T$ is a solution, so is $-T$. More specifically, we have four possible solutions: all combinations of $T = u_3, -u_3$ and $R = UR_{z, \pi/2}V^\top, UR_{z, -\pi/2} V^\top$.

To find the best solution, we compute the projection of the correspondences and use the $R, T$ pair that gives us the points in front of the image plane. That is, for each $R, T$ and correspondence $p, q$, we solve for $\lambda$ and $\mu$ via least squares on $$\mu q - \lambda Rp = \begin{pmatrix}q & -Rp\end{pmatrix}\begin{pmatrix}\mu \\ \lambda\end{pmatrix} = T,$$ and our final answer is the $R, T$ that gives us the most points with positive $\mu, \lambda$.

