TensoRF is a [[🌞 NeRF]] that models radiance fields with voxel feature grids $G_\sigma \in \mathbb{R}^{I \times J \times K}$ and $G_c \in \mathbb{R}^{I \times J \times K \times P}$. From them, our radiance field is 
$$
c, \sigma \leftarrow S(G_c(x), d), G_\sigma(x).
$$
 where $G_\sigma(x)$ and $G_c(x)$ represent trilinear interpolation of continuous $x$ from the voxel grid and $S$ is an appearance processing function.

Instead of directly optimizing $G_\sigma$ and $G_c$, we decompose it into a sum of outer products and optimize $v$ and $M$ instead: 
$$
\begin{align*} G_\sigma &= \sum_r v_{\sigma, r}^X \circ M_{\sigma, r}^{YZ} + v_{\sigma, r}^Y \circ M_{\sigma, r}^{ZX} + v_{\sigma, r}^Z \circ M_{\sigma, r}^{XY} \\ G_c &= \sum_r v_{c, r}^X \circ M_{c, r}^{YZ} \circ b_{3r-2} + v_{c, r}^Y \circ M_{c, r}^{ZX} \circ b_{3r-1} + v_{c, r}^Z \circ M_{c, r}^{XY} \circ b_{3r} \end{align*}
$$


![[20230401152925.png#invert|600]]