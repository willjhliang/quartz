Homographies, or projective transformations, project points from a plane onto another plane and is defined by an invertible matrix transformation from $\mathbb{P}^2$ to $\mathbb{P}^2$. Specifically, the 3x3 transformation matrix $H$ with $\det H \neq 0$ maps 
$$
p' \sim Hp.
$$
 Note that $H$ and $kH$ are the same transformation.

Applied to a line $l$, we have 
$$
l^\top p = l^\top H^{-1}p' = 0,
$$
 so the projection of the line is 
$$
l' = H^{-\top} l.
$$


# Computing Homography
We need four points to find the homography between two planes. Intuitively, $H$ has $8$ degrees of freedom, and each point gives us $2$ equations, so we need four of them. We also need the points to be collinear since otherwise we have redundant information.

## From Canonical Points
We'll first cover a special case where the first plane is a unit square. We can then use two of its corners as well as the points at infinity: 
$$
\begin{align*} A &= \begin{pmatrix}1 & 0 & 0\end{pmatrix}^\top \\ B &= \begin{pmatrix}0 & 1 & 0\end{pmatrix}^\top \\ C &= \begin{pmatrix}0 & 0 & 1\end{pmatrix}^\top \\ D &= \begin{pmatrix}1 & 1 & 1\end{pmatrix}^\top \end{align*}
$$


Note that the first three points, when multiplied with $H$, gives us the three columns of $H$. Let the projections of our points be $A', B', C', D'$. Then, $H$ has the form 
$$
H = \begin{pmatrix}\alpha A' & \beta B' & \gamma C'\end{pmatrix}
$$
 where $\alpha, \beta, \gamma$ are our scaling coefficients from $p' \sim Hp$.

Our fourth point sums the columns of $H$, so it maps 
$$
D' = \lambda(\alpha A' + \beta B' + \gamma C').
$$
 Since $H$ is the same as $\lambda H$, we can let $\lambda = 1$ and solve 
$$
D' = \alpha A' + \beta B' + \gamma C',
$$
 which is a system of three equations with three unknowns, thus giving a unique solution 
$$
\begin{pmatrix}\alpha \\ \beta \\ \gamma\end{pmatrix} = \begin{pmatrix}A' & B' & C'\end{pmatrix}^{-1} D'.
$$


### Composing Homographies
If our first plane isn't a square, we can find homographies $H$ and $H'$ that go from canonical points to the first and second planes respectively. The homography that goes between them is then $H' H^{-1}$.

## From General Points
We can generalize this solution to any number of points. We're given correspondences of the form $(x, y, x', y')$, and we'll find $H$.

First, consider a single correspondence. We have 
$$
\lambda \begin{pmatrix}x' \\ y' \\ 1\end{pmatrix} = H \begin{pmatrix}x \\ y \\ 1\end{pmatrix},
$$
 which gives us the following equations: 
$$
\begin{align*} \lambda x' &= h_{11}x + h_{12}y + h_{13} \\ \lambda y' &= h_{21}x + h_{22}y + h_{23} \\ \lambda &= h_{31}x + h_{32}y + h_{33} \end{align*}
$$


Solving for $x'$, we get 
$$
x' = \frac{h_{11}x + h_{12}y + h_{13}}{h_{31}x + h_{32}y + h_{33}}.
$$

Rearranging terms, we get 
$$
(h_{31}x + h_{32}y + h_{33})x' = h_{11}x + h_{12}y + h_{13}.
$$
 Putting this in matrix form, we have 
$$
\begin{pmatrix}-x & -y & 1 & 0 & 0 & 0 & xx' & yx' & x'\end{pmatrix}\begin{pmatrix}h_{11} \\ \ldots \\ h_{33}\end{pmatrix} = 0.
$$


We can do the same for $y'$, 
$$
\begin{pmatrix}0 & 0 & 0 & -x & -y & 1 & xy' & yy' & y'\end{pmatrix}\begin{pmatrix}h_{11} \\ \vdots \\ h_{33}\end{pmatrix} = 0.
$$


Then, we can apply the same idea to all correspondences and stack the rows together to form a general equation 
$$
\begin{pmatrix} a_{1x} \\ a_{1y} \\ \vdots \\ a_{nx} \\ a_{ny}\end{pmatrix} \begin{pmatrix}h_{11} \\ \vdots \\ h_{33}\end{pmatrix} = 0
$$
 where each $a$ is a row from above.

The vertical vector form of $H$ can then be interpreted as the null space of our stacked matrix. To find it, we calculate the [[📎 Singular Value Decomposition]] of the stacked matrix, and $H$ is given by the last column of $V$.