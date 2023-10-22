A projection $\pi$ is a linear mapping from $\mathcal{V}$ to $\mathcal{U}$ that satisfies $\pi^2 = \pi \circ \pi = \pi$. These mappings can be expressed by projection matrices $P_\pi$.

# Projection Onto Lines
For vector $x$, projection $pi_\mathcal{U}(x)$ onto line $\mathcal{U}$ defined by basis vector $b$ is $$\pi_\mathcal{U}(x) = \lambda b = \frac{\langle x, b \rangle}{\Vert b \Vert^2} b$$ and assuming the dot product, the projection matrix $$P_\pi = \frac{bb^\top }{\Vert b \Vert^2}.$$

# General Projections
Generalizing to any subspace $\mathcal{U}$ defined by bases $B = \begin{bmatrix} b_1 & \ldots & b_m \end{bmatrix}$, we have coordinates $$\lambda = (B^\top B)^{-1}B^\top x,$$ projection $$\pi_\mathcal{U}(x) = B\lambda = B(B^\top B)^{-1}B^\top x,$$ and projection matrix $$P_\pi = B(B^\top B)^{-1}B^\top .$$

Also, note that to project onto an affine space, we can translate before and after the projection, $$\pi_L(x) = x_0 + \pi_\mathcal{U}(x - x_0).$$
