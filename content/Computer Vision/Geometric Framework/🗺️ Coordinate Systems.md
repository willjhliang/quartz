Geometric perception works in three coordinate systems:
1. Image coordinate system, which is 2-dimensional, defined as pixels in the image. The pixels lie along the image plane, which is perpendicular to the optical axis of the camera.
2. Camera coordinate system, where the $z$ axis is the optical axis. The $z$ axis intersects the image plane at $(u_0, v_0)$.
3. World coordinate system, which is arbitrary. The world and camera coordinate system share scale and are related by an affine transformation.

![[20230206212501.png#invert|400]]

The image and camera systems are related by the camera [[🔍 Intrinsics]], which are $f, u_0, v_0$. Their relation can be summarized as a matrix 
$$
K = \begin{pmatrix}f & 0 & u_0 \\ 0 & f & v_0 \\ 0 & 0 & 1\end{pmatrix}.
$$

The camera and world coordinate systems are related by rotation and translation, which are matrices $R$ and $T$ respectively.

> [!note]
> Note that the image coordinate system and image plane are distinct concepts. The former expresses the projected world in terms of image pixels whereas the latter exists in the camera coordinate system $f$ distance away from the projection center along the $z$ axis.

# Camera Coordinates to Image Coordinates
Using the equations from [[📷 Camera Models#Pinhole Model]], we can convert coordinates to pixels with the following: 
$$
\begin{align*} u &= f\frac{X_c}{Z_c} + u_0 \\ v &= f\frac{Y_c}{Z_c} + v_0 \end{align*}
$$


Note that we add on image center $(u_0, v_0)$ because image pixels are measured from a corner at $(0, 0)$ with non-negative coordinates.

We can write the above instead as a matrix equation, 
$$
\lambda \begin{pmatrix} u \\ v \\ 1 \end{pmatrix} = \begin{pmatrix} f & 0 & u_0 \\ 0 & f & v_0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \end{pmatrix}\begin{pmatrix} X_c \\ Y_c \\ Z_c \\ 1 \end{pmatrix} = K \begin{pmatrix}X_c \\ Y_c \\ Z_c\end{pmatrix}
$$
 with the intermediate matrix in between because it's used (below) when transforming from world to image coordinates. In this case, we just have $R = I$ and $T = 0$.

> [!note]
> $\begin{pmatrix} u & v & 1 \end{pmatrix}^\top$ has no geometric meaning; we use it purely to represent the pinhole model equation in matrix form. The geometric location of pixel $(u, v)$ in camera coordinate space is $\begin{pmatrix} u - u_0 & v - v_0 & f \end{pmatrix}^\top$, which is equivalent to calibrated coordinates (defined below).

To go back from image coordinates to camera coordinates, we rearrange the above 
$$
K^{-1} \begin{pmatrix}u \\ v \\ 1\end{pmatrix} \sim \begin{pmatrix}X_c \\ Y_c \\ Z_c\end{pmatrix} \sim \begin{pmatrix}x \\ y \\ 1\end{pmatrix}.
$$


$\begin{pmatrix}X_c & Y_c & Z_c\end{pmatrix}^\top$ is the camera coordinate, but this isn't possible to find just from $u$ and $v$ since the possible camera coordinates that result from a pixel can be anywhere along a ray. Thus, we only have the direction, which is called calibrated coordinates 
$$
\begin{pmatrix}x \\ y \\ 1\end{pmatrix} = \begin{pmatrix}(u - u_0)/f \\ (v - v_0)/f \\ 1\end{pmatrix} \sim \begin{pmatrix}u - u_0 \\ v - v_0 \\ f\end{pmatrix}.
$$


# World Coordinates to Camera Coordinates
The world coordinate system is a rotated, translated camera coordinate system. The two are thus related by 
$$
\begin{pmatrix} X_c \\ Y_c \\ Z_c \\ 1 \end{pmatrix} = \begin{pmatrix} R & T \\ 0 & 1 \end{pmatrix} \begin{pmatrix} X_w \\ Y_w \\ Z_w \\ 1 \end{pmatrix}.
$$

We commonly write this instead 
$$
\begin{pmatrix}X_c \\ Y_c \\ Z_c\end{pmatrix} = \begin{pmatrix}R & T\end{pmatrix} \begin{pmatrix}X_w \\ Y_w \\ Z_w \\ 1\end{pmatrix} = R\begin{pmatrix}X_w \\ Y_w \\ Z_w\end{pmatrix} + T.
$$

Notice that by setting $X_w = Y_w = Z_w = 0$, we can see that the world origin is at $\begin{pmatrix}X_c & Y_c & Z_c\end{pmatrix}^\top = T$, in camera coordinates. Note that the direction of $T$ is from camera origin to world origin.

On the other hand, by setting $X_c = Y_c = Z_c = 0$, we observe that the camera origin is at $\begin{pmatrix}X_w & Y_w & Z_w\end{pmatrix}^\top = -R^\top T$, in world coordinates.

Moreover, we can also find $R$ from the world and camera axes. The columns $r_1, r_2, r_3$ of $R$ are the world $x, y, z$ axes respectively in camera coordinates.

> [!note]
> The rotation and translation matrices $R$ and $T$ reflect transformations of the coordinate system, not the points. A counterclockwise rotation of a point is equivalent to a clockwise rotation of the coordinate system, and a translation of a point is equivalent to the opposite translation of the coordinate system.

# World Coordinates to Image Coordinates
Putting both equations together, we arrive at the projection from world to image, 
$$
\lambda \begin{pmatrix} u \\ v \\ 1 \end{pmatrix} = \begin{pmatrix} f & 0 & u_0 \\ 0 & f & v_0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} R & T\end{pmatrix} \begin{pmatrix} X_w \\ Y_w \\ Z_w \\ 1 \end{pmatrix} = K \begin{pmatrix} R & T \end{pmatrix} \begin{pmatrix} X_w \\ Y_w \\ Z_w \\ 1 \end{pmatrix} = P \begin{pmatrix} X_w \\ Y_w \\ Z_w \\ 1 \end{pmatrix}.
$$

Notice that this can also be written as 
$$
\lambda \begin{pmatrix}u \\ v \\ 1\end{pmatrix} = K(R \begin{pmatrix}X_w \\ Y_w \\ Z_w\end{pmatrix} + T).
$$


Going backwards from image to world coordinates, we have 
$$
\begin{pmatrix}X_w \\ Y_w \\ Z_w\end{pmatrix} = -R^\top T + \lambda R^\top K^{-1}\begin{pmatrix}u \\ v \\ 1\end{pmatrix}.
$$

This again tells us at the camera origin, or the projection center, is at $-R^\top T$, and our world coordinates for a pixel along the line with direction $R^\top K^{-1} \begin{pmatrix}u & v & 1\end{pmatrix}^\top$ that intersect $-R^\top T$.

# Transformation Composition
Note that for a transformation 
$$
M = \begin{pmatrix}& R & & T \\ 0 & 0 & 0 & 1\end{pmatrix},
$$

the order of composition is $\text{LHS} = M_1 M_2 M_3 \text{RHS}$.

Note that the translations are all done in terms of the original coordinate system. Thus, when we apply a rotation and translation, it's helpful to translate first, then rotate. We can see this by finding the translation and rotation transformations $M_T$ and $M_R$, then observing that 
$$
P_c = RP_w + T = M_T M_R P_w.
$$
