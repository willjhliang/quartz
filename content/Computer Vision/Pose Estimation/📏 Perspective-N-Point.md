Perspective-$N$-point estimates camera pose from $N$ correspondences; formally, given $N$ correspondences from world points to calibrated camera points $(X_w, Y_w, Z_w, x_c, y_c)$, we can find the rotation $R$ and translation $T$ of the camera.

First, we have that each point satisfies the equation 
$$
\lambda \begin{pmatrix}x_c \\ y_c \\ 1\end{pmatrix} = R\begin{pmatrix}X_w \\ Y_w \\ Z_w\end{pmatrix} + T
$$

$N$ points gives us $3N$ equations and $N + 6$ unknowns, so we need $N \geq 3$ points. Below, we solve the problem with $N = 3$ (P3P). For more points, we can directly optimize the equation above.

>[!info]
> Note that if we have two points, our camera can lie anywhere on a circle in 2D or a toroid in 3D.

# P3P
We're given the location of three points ($A, B, C$ in the diagram) and the rays going out from the camera.

![[20230207091800.png#invert|300]]
> [!info]
> The variables below will be different from the diagram. Distance to point $i$ is $d_i$. Distance between points $i$ and $j$ is $d_{ij}$. Angle between points $i$ and $j$ is $\delta_{ij}$. We'll also now use subscript to denote the $i$th point, maintaining uppercase letters as world variables and lowercase letters as camera variables.

First, we'll solve for all $\lambda_i$. This is the depth of the point using camera coordinates; in other words, the point can be found at $\lambda_i \begin{pmatrix}x_i & y_i & 1\end{pmatrix}^\top$. However, another way to find this point is by measuring the distance directly, then going along the unit direction; this equation for the point is $\frac{d_i}{\sqrt{x_i^2 + y_i^2 + 1}} \begin{pmatrix}x_i & y_i & 1\end{pmatrix}^\top$. Thus, we have 
$$
\lambda_i = \frac{d_i}{\sqrt{x_i^2 + y_i^2 + 1}}
$$


We find can $d_i$ using trigonometry. Since we have the world coordinates of the points, we can compute 
$$
d_{ij} = \sqrt{(X_i - X_j)^2 + (Y_i - Y_j)^2 + (Z_i - Z_j)^2}
$$
We can also find the angles between the rays with 
$$
\delta_{ij} = \cos^{-1} \frac{\begin{pmatrix}x_i \\ y_i \\ 1\end{pmatrix} \cdot \begin{pmatrix}x_j \\ y_j \\ 1\end{pmatrix}}{\left\lVert\begin{pmatrix}x_i \\ y_i \\ 1\end{pmatrix}\right\rVert \left\lVert\begin{pmatrix}x_j \\ y_j \\ 1\end{pmatrix}\right\rVert}
$$


Then, we can relate these variables together with 
$$
d_{ij}^2 = d_i^2 + d_j^2 - 2d_id_j\cos \delta_{ij}
$$

We have three equations of this form, which we can solve by setting $d_2 = ud_1, d_3 = vd_1$. Then, we have the system 
$$
\begin{align*} d_{12}^2 &= d_1^2(1 + u^2 - 2u\cos\delta_{12}) \\ d_{13}^2 &= d_1^2(1 + v^2 - 2v\cos\delta_{13}) \\ d_{23}^2 &= d_i^2(u^2 + v^2 - 2uv\cos\delta_{23}) \end{align*}
$$

Eliminating via $d_1$ and rearranging, we get the following. 
$$
\begin{align*} d_{13}^2(u^2 + v^2 - 2uv\cos\delta_{23}) &= d_{23}^2(1 + v^2 - 2v\cos\delta_{13}) \\ d_{12}^2 (1 + v^2 - 2v\cos\delta_{13}) &= d_{13}^2 (1 + u^2 - 2u\cos\delta_{12}) \end{align*}
$$

This gives us a quartic in $u$, so there are $4$ possible solutions for $d_i$ and therefore $\lambda_i$.

We can now find the points in camera coordinates using the calibrated coordinates and $\lambda_i$. We now want to find $R$ and $T$ from correspondences $(X_w, Y_w, Z_w, X_c, Y_c, Z_c)$; our solution thus ends with the solution to the [[⚰️ Procrustes]].