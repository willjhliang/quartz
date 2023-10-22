Optical flow finds the visual flow in videos, sort of like [[🍿 Two-View Stereopsis]] but with small baselines. Formally, we wish to compute the positional and angular velocities of the camera, $V$ and $\Omega$.

# Local Search
Since the frames of a video are extremely similar, we expect image patches to move very slightly in adjacent frames. Thus, the local search algorithm simply searches for matching patches in a nearby area, finding the one with most similar intensities: $$\min_{\delta x, \delta y} \sum_{x, y} (I_t(x, y) - I_{t+1}(x + \delta x, y + \delta y))^2.$$ Though this does work in practice, its main weakness is that it discretizes the offset, $\delta x$ and $\delta y$.

# Taylor Expansion Approximation
To remedy this, we can assume that $\delta x, \delta y$ are small and approximate the new intensities with a [[🎤 Taylor Series]], $$I_{t+1}(x + \delta x, y + \delta y) \approx I_{t+1}(x, y) + \begin{pmatrix}\frac{\delta I_{t+1}}{\delta x} & \frac{\delta I_{t+1}}{\delta y}\end{pmatrix} \begin{pmatrix}\delta x \\ \delta y\end{pmatrix} = I_{t+1}(x, y) + \nabla I_{t+1}^\top \begin{pmatrix}\delta x \\ \delta y\end{pmatrix}.$$ Then, the difference in intensities is $$I_t(x, y) - \left( I_{t+1}(x, y) + \nabla I_{t+1}^\top \begin{pmatrix}\delta x \\ \delta y\end{pmatrix} \right) = \Delta I_t(x, y) - \nabla I_{t+1}^\top \begin{pmatrix}\delta x \\ \delta y\end{pmatrix}.$$ Both $\Delta I_t(x, y)$ and $\nabla I_{t+1}^\top$ can be computed directly, so minimizing the square of the above equation is a least-squares problem with the analytical answer $$\begin{pmatrix}\delta x^* \\ \delta y^*\end{pmatrix} = \left( \sum_{x, y} \nabla I_{t+1}(x,y) \nabla I_{t+1}(x, y)^\top \right)^{-1} \left( \sum_{x, y} \Delta I_t(x, y) \nabla_{t+1}(x, y) \right).$$

## Texture Challenges
Our approach relies on the assumption that brightness stays similar and the absence of occlusions. We also need the patch to be sufficiently interesting for the left product to be invertible. As such, there are certain scenarios where this algorithm doesn't work well:
1. "White wall" problem: in the absence of texture, we get no gradient and thus no flow.
2. "Barber poll" problem: with one-dimensional texture, we get a constant gradient and insufficient information to compute the true flow. This is why the barber pole has an illusion of moving up or down when it's actually just rotating.

# Recovering Velocities
Nevertheless, in the case where we do get $\delta x, \delta y = \dot{x}, \dot{y}$, we can find velocities $V, \Omega$. First, consider a static point $P$ in the world. When we move our camera, its projection $p$ moves in the image plane with $\dot{p}$; however, $P$ doesn't actually move in the world.

Let $P^w$ be the point in world coordinates and $P^c$ be the same point in camera coordinates. We have the following derivation: $$\begin{align*} P^w &= RP^c + T \\ \dot{P^w} &= \dot{R}P^c + R\dot{P^c} + \dot{T} \\ 0 &= R \hat{\Omega} P^c + R\dot{P^c} + RV \\ &= R(\Omega \times P^c + \dot{P^c} + V) \end{align*}$$

Since $R$ can't be zero, the quantity inside the parenthesis must be equal to zero. This equality gives us the scene flow equation $$\dot{P} = -\Omega \times P - V.$$

To relate this to calibrated coordinates, we can differentiate the projection equation, $$p = \frac{P}{Z} \rightarrow \dot{p} = \frac{\dot{P}}{Z} - \frac{\dot{Z}}{Z}p.$$

Finally, combining the two equations above allows us to relate the change in calibrated coordinates with $V$ and $\Omega$, $$\begin{pmatrix}\dot{x} \\ \dot{y}\end{pmatrix} = \frac{1}{Z} \begin{pmatrix}-1 & 0 & x \\ 0 & -1 & y\end{pmatrix}V + \begin{pmatrix}xy & -(1+x^2) & y \\ -(1+y^2) & -xy & -x\end{pmatrix}\Omega.$$ The first term is the translational flow, and the second is the rotational flow that's independent of depth.

If $Z$ is known, we can solve this equation of 6 unknowns with 6 equations (3 flow vectors). If $Z$ is unknown, we have the following two methods.

## Pure Translation
In the case of pure translation, we have the translational flow $$\dot{p}_{trans} = \frac{V_z}{Z} \begin{pmatrix}x - V_x / V_z \\ y - V_y / V_z\end{pmatrix},$$ and the condition $$V^\top (p \times \dot{p}),$$ which says that the image point, flow, and linear velocity lie on the same plane. We can then solve for $V$ from multiple $\dot{p}$ by solving the homogeneous system $$\begin{pmatrix}(p_1 \times \dot{p_1})^\top \\ \vdots \\ (p_N \times \dot{p_N})^\top\end{pmatrix}V = 0$$ via SVD to find the nullspace.

## General Case
In the general case where both $V$ and $\Omega$ are unknown, we'll use the above combined equation $$\dot{p} = \frac{1}{Z}F(x, y)V + G(x, y)\Omega$$ where $$F(x, y) = \begin{pmatrix}-1 & 0 & x \\ 0 & -1 & y\end{pmatrix},\ G(x, y) = \begin{pmatrix}xy & -(1+x^2) & y \\ -(1+y^2) & -xy & -x\end{pmatrix}.$$

Rearranging, we have $$\dot{p} = \begin{pmatrix}F(x, y)V & G(x, y)\end{pmatrix}\begin{pmatrix}1/Z \\ \Omega\end{pmatrix},$$ and for $N$ points we have $$\dot{d} = \begin{pmatrix}\dot{p_1} \\ \vdots \\ \dot{p_N}\end{pmatrix} = \Phi(V) \begin{pmatrix}1/Z_1 \\ \vdots \\ 1/Z_N \\ \Omega \end{pmatrix}.$$

Our guess for $V$ determines the right hand side; if we have $V$, we can then solve for the rightmost vector with the pseudo-inverse $\Phi(V)^+ \dot{d}$. Thus, plugging this in for the rightmost vector, we can then find the $V$ that optimizes $$\min_V \Vert \dot{d} - \Phi(V) \Phi(V)^+ \dot{d} \Vert^2$$ and then recover both $V$ and $\Omega$.

# Time to Collision
One useful thing we can do with optical flow vectors is estimating the time to collision of the camera with something in front of it. Observe that the translational flow $$\dot{p}_{trans} = \frac{V_z}{Z} \begin{pmatrix}x - V_x / V_z \\ y - V_y / V_z\end{pmatrix}$$ all intersect at a single point—the focus of expansion (FOE). This point can be computed as $$FOE = (V_x/V_z, V_y/V_z).$$ The time to collision (TTC) can then be measured as $$TTC = \frac{Z}{V_z} = \frac{\Vert p - FOE \Vert}{\dot{p}_{trans}}.$$