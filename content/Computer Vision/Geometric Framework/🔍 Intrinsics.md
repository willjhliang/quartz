Camera intrinsics are inherent characteristics of the [[📷 Camera Models]] (usually the lens) that relate points in the 3D camera coordinate system to its projected location on the image plane. Specifically, the intrinsics are defined by the focal length $f$ and image center $(u_0, v_0)$. Knowing these values allows us to transform between the camera and image coordinate systems.

Usually, the intrinsics are summarized as a matrix $$K = \begin{pmatrix}f & 0 & u_0 \\ 0 & f & v_0 \\ 0 & 0 & 1\end{pmatrix},$$ which is used in projective linear algebra equations. $K$ is usually known and computed via calibration (as given along with the camera), but it's also possible to compute $K$ directly from a picture.

# Intrinsics From Vanishing Points
Given a picture (and specifically vanishing points in the image plane), we can find $K$.

For two rays $\begin{pmatrix}x_1 & y_1 & 1\end{pmatrix}^\top$ and $\begin{pmatrix}x_2 & y_2 & 1\end{pmatrix}^\top$, we can find the angle between them $$\cos \delta = \frac{\begin{pmatrix}x_1 \\ y_1 \\ 1\end{pmatrix}^\top \begin{pmatrix}x_2 \\ y_2 \\ 1\end{pmatrix}}{\left\Vert \begin{pmatrix}x_1 \\ y_1 \\ 1\end{pmatrix} \right\Vert \left\Vert \begin{pmatrix}x_2 \\ y_2 \\ 1\end{pmatrix} \right\Vert}.$$

For most rays, we don't know $\delta$ since we would need to measure it in the world. However, if we use orthogonal vanishing points, we know $\delta$ is a right angle. Thus, if we have two vanishing points, $$0 = \begin{pmatrix}x_1 \\ y_1 \\ 1\end{pmatrix}^\top \begin{pmatrix}x_2 \\ y_2 \\ 1\end{pmatrix} = \begin{pmatrix}u_1 \\ v_1 \\ 1\end{pmatrix}^\top K^{-\top}K^{-1} \begin{pmatrix}u_2 \\ v_2 \\ 1\end{pmatrix}.$$

Let $K^{-\top}K^{-1}$ be $$\Omega = \frac{1}{f^2}\begin{pmatrix}1 & 0 & -u_0 \\ 0 & 1 & -v_0 \\ -u_0 & -v_0 & f^2 + u_0^2 + v_0^2\end{pmatrix} = \begin{pmatrix}\omega_{11} & 0 & \omega_{13} \\ 0 & \omega_{22} & \omega_{23} \\ \omega_{13} & \omega_{23} & \omega_{33}\end{pmatrix}.$$ If we find $\Omega$, we can directly recover $u_0$, $v_0$, and $f$.

Substituting $\Omega$ into our equation above, we have $$\begin{pmatrix}u_1 \\ v_1 \\ 1\end{pmatrix}^\top \Omega \begin{pmatrix}u_2 \\ v_2 \\ 1\end{pmatrix} = 0,$$ and if we expand it out, we can write this as a homogeneous equation $$\begin{pmatrix}u_1u_2 + v_1v_2 & u_1 + u_2 & v_1 + v_2 & 1\end{pmatrix}\begin{pmatrix}\omega_{11} \\ \omega_{13} \\ \omega_{23} \\ \omega_{33}\end{pmatrix} = 0.$$

However, the quantities for $\omega$ are dependent, $$\omega_{33} = 1 + \frac{u_0^2}{f^2} + \frac{v_0^2}{f^2} = 1 + \frac{1}{\omega_{11}}(\omega_{13}^2 + \omega_{23}^2).$$

We can set $\omega_{11} = 1$, so $\Omega = \begin{pmatrix}1 & 0 & \omega_{13} \\ 0 & 1 & \omega_{23} \\ \omega_{13} & \omega_{23} & \omega_{33}\end{pmatrix}$. Our system is now $$\begin{pmatrix}u_1 + u_2 & v_1 + v_2 & 1\end{pmatrix}\begin{pmatrix}\omega_{13} \\ \omega_{23} \\ \omega_{33} \end{pmatrix} = -(u_1u_2 + v_1v_2).$$

If we have three orthogonal vanishing points in the world that aren't at infinity in the image, we can form a system of equations, one equation per pair, in the form above. Note that if we use a vanishing point at infinity, then we can't solve for $\omega_{33}$, so we cannot recover $f$.

## Geometric Solution
Let $A$, $B$, and $C$ be our vanishing points in the image plane and $O$ be the projection center.

![[20230220100935.png#invert|400]]

If $OA \perp OB \perp OC$ and $H$ is the orthocenter of $ABC$, $OH \perp \text{plane}(ABC).$ We know the optical axis must be perpendicular to the image plane, so $OH$ is exactly our optical axis. Moreover, the intersection is the image center, so $H$ is at $(u_0, v_0)$.

Lastly, $f$ is the length of $OH$, and we can compute it. Since $OAB$ is a right triangle (right angle $O$), we can use the right triangle altitude property, $h^2 = d_1d_2$. We also have Pythagoras with $OHD$, giving us $f^2 + d_3^2 = h^2$. Combining, we get $$f^2 = d_1d_2 - d_3^2.$$