An image transformation creates a new image from a given one. In general, we define a transformation in terms of pixel coordinates: for some coordinate $u$ in the original image, at what pixel $v$ does it end up?

Specifically, we define this transformation via matrix multiplication with [[📽️ Projective Geometry#Homogeneous Coordinates]]. For some transformation matrix $T$, we have 
$$
\begin{bmatrix}v_x \\ v_y \\ 1\end{bmatrix} = \begin{bmatrix}T_{11} & T_{12} & T_{13} \\ T_{21} & T_{22} & T_{23} \\ T_{31} & T_{32} & T_{33} \end{bmatrix} \begin{bmatrix}u_x \\ u_y \\ 1\end{bmatrix}.
$$


There are some transformation primitives that define specific versions of $T$.
1. For scaling, we have 
$$
T = \begin{bmatrix}s_x & 0 & 0 \\ 0 & s_y & 0 \\ 0 & 0 & 1\end{bmatrix}.
$$

2. For translation, we have 
$$
T = \begin{bmatrix}1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1\end{bmatrix}.
$$

3. For rotation (around the top-left corner), we have 
$$
T = \begin{bmatrix}\cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1\end{bmatrix}.
$$


# Euclidean Transform
In a Euclidean transform (SE(2)), we combine rotation and translation, 
$$
T = \begin{bmatrix}\cos\theta & -\sin\theta & t_x \\ \sin\theta & \cos\theta & t_y \\ 0 & 0 & 1\end{bmatrix}.
$$
 Plugging this into our transformation equation, we can write $v = Ru + t$. This transformation preserves length, angle, and area. One common operation, rotation around the center $p$, can be written in this way; we solve $v - p = R(u - p)$ to get $v = Ru - Rp + p$, indicating that our translation $t = -Rp + p$.

# Similarity Transform
A similarity transform adds a scaling factor onto the Euclidean transform, 
$$
T = \begin{bmatrix}\alpha & 0 & 0 \\ 0 & \alpha & 0 \\ 0 & 0 & 1\end{bmatrix}\begin{bmatrix}\cos\theta & -\sin\theta & t_x \\ \sin\theta & \cos\theta & t_y \\ 0 & 0 & 1\end{bmatrix} = \begin{bmatrix}\alpha\cos\theta & -\alpha\sin\theta & t_x \\ \alpha\sin\theta & \alpha\cos\theta & t_y \\ 0 & 0 & 1\end{bmatrix}.
$$


# Affine Transform
An affine transform introduces shearing along with scaling, rotation, and translation. This transform can be written as 
$$
T = \begin{bmatrix}a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ 0 & 0 & 1\end{bmatrix}
$$
 with six degrees of freedom. Affine transforms preserve parallelism and area and length ratios, but angles and absolute lengths are disrupted.

# Perspective Transform
Finally, the perspective transform—also known as [[🖼️ Homography]]—gives maximum freedom to our transformation, 
$$
T = \begin{bmatrix}h_{11} & h_{12} & h_{13} \\ h_{21} & h_{22} & h_{23} \\ h_{31} & h_{32} & 1\end{bmatrix}.
$$
 In this case, our transformation equation is modified to 
$$
\lambda\begin{bmatrix}v_x \\ v_y \\ 1\end{bmatrix} = \begin{bmatrix}h_{11} & h_{12} & h_{13} \\ h_{21} & h_{22} & h_{23} \\ h_{31} & h_{32} & 1 \end{bmatrix} \begin{bmatrix}u_x \\ u_y \\ 1\end{bmatrix}.
$$
 This $\lambda$ is a scaling term that ensures our transformation conforms to the $1$ value in our homogeneous coordinates. This is also the reason why $h_{33} = 1$: if not, there's an equivalent $T$ with $h_{33}=1$ if we just multiply by a different scalar $\lambda$.