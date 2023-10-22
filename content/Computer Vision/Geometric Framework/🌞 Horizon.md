The horizon in the image plane is the line consisting of points at infinity in the world. In other words, it's the projection of the world's line at infinity onto the image plane.

We can find the horizon by using any method to find two vanishing points; connecting them gives the horizon. Alternatively, if we assume that the horizon is horizontal, we only need one vanishing point.

One way to find the vanishing points is via the homography $H$ from the ground plane to the image plane. Since the points at infinity in the world are $\begin{pmatrix}1 & 0 & 0\end{pmatrix}^\top$ and $\begin{pmatrix}0 & 1 & 0\end{pmatrix}^\top$, their projections are the first two columns of $H$, $h_1$ and $h_2$. The horizon is thus given by the line $$l = h_1 \times h_2.$$

Lastly, the horizon plane is parallel to the ground plane, so $h_1 \times h_2$ is normal to the ground plane.