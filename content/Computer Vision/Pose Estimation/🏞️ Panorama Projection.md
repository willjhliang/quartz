A panorama is created via pure camera rotation around an axis through the projection center. Given panorama images, our goal is to project them onto one large image.

![[20230227101134.png#invert|300]]

The problem is that by rotating our camera, we're rotating the camera coordinate system. To project a point from the second image onto the first, we'll have to account for the rotation.

We'll solve the panorama for both planar and spherical projections.

# Planar Projection
We'll first try to project panorama images onto a single image plane called the mosaic. For a point in the world, we have the following: 
$$
\begin{align*} \begin{pmatrix}u_1 \\ v_1 \\ 1\end{pmatrix} &\sim K_1 \begin{pmatrix}X_1 \\ Y_1 \\ Z_1\end{pmatrix} \\ \begin{pmatrix}u_2 \\ v_2 \\ 1\end{pmatrix} &\sim K_2 \begin{pmatrix}X_2 \\ Y_2 \\ Z_2\end{pmatrix} \\ \begin{pmatrix}X_1 \\ Y_1 \\ Z_1\end{pmatrix} &= R \begin{pmatrix}X_2 \\ Y_2 \\ Z_2\end{pmatrix} \end{align*}
$$


To go from the second image to the first, we thus have 
$$
\begin{pmatrix}u_1 \\ v_1 \\ 1\end{pmatrix} \sim K_1 R K_2^{-1} \begin{pmatrix}u_2 \\ v_2 \\ 1\end{pmatrix}.
$$
 If we don't use a relative rotation $R$ and instead consider rotation matrices $R_1$ and $R_2$ for each view, we have 
$$
\begin{pmatrix}u_1 \\ v_1 \\ 1\end{pmatrix} \sim K_1 R_1 R_2^\top K_2^{-1} \begin{pmatrix}u_2 \\ v_2 \\ 1\end{pmatrix}.
$$
 Note that this transformation is scene-independent and does not depend on the depth of a point.

> [!info]
> If we have multiple images, we can instead compute homographies using point tracking; by tracking at least four points, our problem reduces to the [[🖼️ Homography]].

# Spherical Projection
However, for a full panorama, we can't project 360 degrees onto a single plane. Our mosaic then needs to be a sphere or cylinder, and we need to map world points onto the unit sphere.

![[20230227102031.png#invert|200]]

Note that we would need to rotate our world point to the orientation of the sphere coordinate system, 
$$
\begin{pmatrix}X_s \\ Y_s \\ Z_s\end{pmatrix} = R \begin{pmatrix}X_c \\ Y_c \\ Z_c\end{pmatrix}.
$$
 Thus, to go from image to spherical coordinates, we have 
$$
\begin{pmatrix}\sin\theta \cos \phi \\ \sin \theta \sin \phi \\ \cos \theta \end{pmatrix} \sim \frac{1}{\sqrt{X_s^2 + Y_s^2 + 1}} RK^{-1} \begin{pmatrix}u \\ v \\ 1\end{pmatrix}
$$
 where 
$$
RK^{-1} \begin{pmatrix}u \\ v \\ 1\end{pmatrix} \sim \begin{pmatrix}x_s \\ y_s \\ 1\end{pmatrix}.
$$
 

If we wanted to unwrap the sphere, our coordinates would be 
$$
(s\theta, s\phi) + (\tilde{x}_c, \tilde{y}_c)
$$
 where the second tuple defines the unwrapping center.