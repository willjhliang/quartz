Optical flow finds the visual flow in videos, sort of like [[🍿 Two-View Stereopsis]] but with small baselines. Formally, we wish to compute the positional and angular velocities of the camera, $V$ and $\Omega$.

# Local Search
Since the frames of a video are extremely similar, we expect image patches to move very slightly in adjacent frames. Let two adjacent frames be $I$ and $J$; the local search algorithm simply searches for matching pixels in a nearby area, finding the one with most similar intensities: 
$$
\min_d  (I(x) - J(x + d))^2
$$
 where $x$ is a point on the image and $d$ is the displacement.

Though this does work in practice, its main weakness is that to search, we discretize $d$ and cannot recover an extremely-accurate flow.

# Optimization
Rather than performing an exhaustive search, we can instead frame optical flow as an optimization problem where we want to minimize 
$$
E(d) = \Vert J(x + d) - I(x) \Vert^2.
$$
 The optimal $d$ is at a minima of this function, so its derivative must be zero. Thus, we have 
$$
\frac{\partial E}{\partial d} = 2 \frac{\partial J(x+d)^\top}{\partial d}(J(x+d) - I(x)) = 0.
$$


Since a variation with $\partial d$ for $J(x+d)$ is equivalent to a variation in $x$, we can rewrite the fraction, giving us 
$$
\frac{\partial E}{\partial d} = 2 \frac{\partial J(x)^\top}{\partial x}(J(x+d) - I(x)) = 0
$$
 and revealing that the fraction is exactly the image gradient of $J$. Now, we need to solve for $d$, but $J$ is an image and thus a nonlinear function of the pixel locations, making this equation difficult.

## Taylor Approximation
To simplify our task, we can approximate $J(x + d)$ with a [[🎤 Taylor Series]], 
$$
J(x + d) \approx J(x) + \frac{\partial J(x)}{\partial x}d.
$$
 Visually, this is assuming that the shifted image is the sum of an unshifted version with its gradient, which "shaves" off edges.

![[20231213194503.png#invert]]

Now, our original optimization task turns into 
$$
E(d) = \Vert J(x) + \frac{\partial J(x)}{\partial x}d - I(x) \Vert^2 = \Vert \frac{\partial J(x)}{\partial x}d - (I(x) - J(x)) \Vert^2.
$$
 In this form, our problem looks very similar to the least squares problem, $\Vert Ax - b \Vert^2.$

Indeed, we can plug our approximation back into our optimization equation, arriving at 
$$
2 \frac{\partial J(x)^\top}{\partial x}(J(x) + \frac{\partial J(x)}{\partial x}d - I(x)) = 0,
$$
 and reordering, we have 
$$
d = \left( \frac{\partial J(x)^\top}{\partial x} \frac{\partial J(x)}{\partial x} \right)^{-1}\frac{\partial J(x)^\top}{\partial x} (I(x) - J(x)),
$$
 exactly mirroring the least squares solution $x = (A^\top A)^{-1} A^\top b$.

Another common form of this equation is 
$$
\frac{\partial J(x)^\top}{\partial x} \frac{\partial J(x)}{\partial x} d = \frac{\partial J(x)^\top}{\partial x} (I(x) - J(x)).
$$
 The coefficient on the left is the second moment matrix that describes, for each pixel, the second-order gradients. The term on the right is the difference between images, then multiplied with the second image's gradient. We can compute both terms, and thus we can find $d$.

## Gradient Descent
However, since we used a Taylor approximation, our first solution for $d$ might not be perfect. We can refine our result applying the displacement to $I_t$, then recompute everything again, apply it again, then recompute, and so on. Each iteration will decrease the error, and our final result is the cumulative displacement.

## Windows
Finally, one more thing to note is that we usually perform this optimization over small patches (windows) of an image rather than individual pixels. This objective is 
$$
\min_d E(d) = \sum_{x \in w} \Vert J(x + d) - I(x) \Vert^2
$$
 where $w$ is our window. With our Taylor approximation, we can absorb the sum into matrix form, 
$$
E(d) = \left\Vert \begin{bmatrix}J_x (x_1) & J_y(x_1) \\ J_x(x_2) & J_y(x_2) \\ \vdots & \vdots \end{bmatrix} \begin{bmatrix}d_x \\ d_y\end{bmatrix} - \begin{bmatrix}I(x_1) - J(x_1) \\ I(x_2) - J(x_2) \\ \vdots \end{bmatrix}\right\Vert^2,
$$
 and again apply the least squares solution $(A^\top A)^{-1} A^\top b$; simplifying, we find 
$$
A^\top A = \begin{bmatrix}\sum_i J_x(x_i)^2 & \sum_i J_x(x_i) J_y(x_i) \\ \sum_i J_y(x_i) J_x(x_i) & \sum_i J_y (x_i)^2\end{bmatrix} \text{ and } A^\top b = \begin{bmatrix}\sum_i J_x(x_i)(I(x_i) - J(x_i)) \\ \sum_i J_y(x_i)(I(x_i) - J(x_i))\end{bmatrix}.
$$


(Note that $x_i$ here denotes a point, as in $x_i = (x, y)$. Sorry for the odd notation.)

# Large Displacements
Our gradient operator $\nabla I_{t+1}(x, y)$ only covers the gradient of our second image. If the difference between images is too big, the gradient operator will not capture the first image, $I_t$, which makes the least-squares problem unsolvable.

The most direct solution is to use a larger gradient kernel, allowing information to propagate across more pixels and hopefully incorporating parts of the first image. Alternatively, we can use the gaussian pyramid (from [[🔺 Image Pyramid]]) and perform optical flow on smaller images, thereby making the same kernel larger relative to the image.

# Texture Challenges
Our approach relies on the assumption that brightness stays similar and the absence of occlusions. We also need the patch to be sufficiently interesting for the left product to be invertible. As such, there are certain scenarios where this algorithm doesn't work well:
1. "White wall" problem: in the absence of texture, we get no gradient and thus no flow.
2. "Barber poll" problem: with one-dimensional texture, we get a constant gradient and insufficient information to compute the true flow. This is why the barber pole has an illusion of moving up or down when it's actually just rotating.

# Recovering Velocities
Nevertheless, in the case where we do get $\delta x, \delta y = \dot{x}, \dot{y}$, we can find velocities $V, \Omega$. First, consider a static point $P$ in the world. When we move our camera, its projection $p$ moves in the image plane with $\dot{p}$; however, $P$ doesn't actually move in the world.

Let $P^w$ be the point in world coordinates and $P^c$ be the same point in camera coordinates. We have the following derivation: 
$$
\begin{align*} P^w &= RP^c + T \\ \dot{P^w} &= \dot{R}P^c + R\dot{P^c} + \dot{T} \\ 0 &= R \hat{\Omega} P^c + R\dot{P^c} + RV \\ &= R(\Omega \times P^c + \dot{P^c} + V) \end{align*}
$$


Since $R$ can't be zero, the quantity inside the parenthesis must be equal to zero. This equality gives us the scene flow equation 
$$
\dot{P} = -\Omega \times P - V.
$$


To relate this to calibrated coordinates, we can differentiate the projection equation, 
$$
p = \frac{P}{Z} \rightarrow \dot{p} = \frac{\dot{P}}{Z} - \frac{\dot{Z}}{Z}p.
$$


Finally, combining the two equations above allows us to relate the change in calibrated coordinates with $V$ and $\Omega$, 
$$
\begin{pmatrix}\dot{x} \\ \dot{y}\end{pmatrix} = \frac{1}{Z} \begin{pmatrix}-1 & 0 & x \\ 0 & -1 & y\end{pmatrix}V + \begin{pmatrix}xy & -(1+x^2) & y \\ -(1+y^2) & -xy & -x\end{pmatrix}\Omega.
$$
 The first term is the translational flow, and the second is the rotational flow that's independent of depth.

If $Z$ is known, we can solve this equation of 6 unknowns with 6 equations (3 flow vectors). If $Z$ is unknown, we have the following two methods.

## Pure Translation
In the case of pure translation, we have the translational flow 
$$
\dot{p}_{trans} = \frac{V_z}{Z} \begin{pmatrix}x - V_x / V_z \\ y - V_y / V_z\end{pmatrix},
$$
 and the condition 
$$
V^\top (p \times \dot{p}),
$$
 which says that the image point, flow, and linear velocity lie on the same plane. We can then solve for $V$ from multiple $\dot{p}$ by solving the homogeneous system 
$$
\begin{pmatrix}(p_1 \times \dot{p_1})^\top \\ \vdots \\ (p_N \times \dot{p_N})^\top\end{pmatrix}V = 0
$$
 via SVD to find the nullspace.

## General Case
In the general case where both $V$ and $\Omega$ are unknown, we'll use the above combined equation 
$$
\dot{p} = \frac{1}{Z}F(x, y)V + G(x, y)\Omega
$$
 where 
$$
F(x, y) = \begin{pmatrix}-1 & 0 & x \\ 0 & -1 & y\end{pmatrix},\ G(x, y) = \begin{pmatrix}xy & -(1+x^2) & y \\ -(1+y^2) & -xy & -x\end{pmatrix}.
$$


Rearranging, we have 
$$
\dot{p} = \begin{pmatrix}F(x, y)V & G(x, y)\end{pmatrix}\begin{pmatrix}1/Z \\ \Omega\end{pmatrix},
$$
 and for $N$ points we have 
$$
\dot{d} = \begin{pmatrix}\dot{p_1} \\ \vdots \\ \dot{p_N}\end{pmatrix} = \Phi(V) \begin{pmatrix}1/Z_1 \\ \vdots \\ 1/Z_N \\ \Omega \end{pmatrix}.
$$


Our guess for $V$ determines the right hand side; if we have $V$, we can then solve for the rightmost vector with the pseudo-inverse $\Phi(V)^+ \dot{d}$. Thus, plugging this in for the rightmost vector, we can then find the $V$ that optimizes 
$$
\min_V \Vert \dot{d} - \Phi(V) \Phi(V)^+ \dot{d} \Vert^2
$$
 and then recover both $V$ and $\Omega$.

# Time to Collision
One useful thing we can do with optical flow vectors is estimating the time to collision of the camera with something in front of it. Observe that the translational flow 
$$
\dot{p}_{trans} = \frac{V_z}{Z} \begin{pmatrix}x - V_x / V_z \\ y - V_y / V_z\end{pmatrix}
$$
 all intersect at a single point—the focus of expansion (FOE). This point can be computed as 
$$
FOE = (V_x/V_z, V_y/V_z).
$$
 The time to collision (TTC) can then be measured as 
$$
TTC = \frac{Z}{V_z} = \frac{\Vert p - FOE \Vert}{\dot{p}_{trans}}.
$$
