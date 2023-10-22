# Homogeneous Coordinates
A point $(x, y) \in \mathbb{R}^2$ on the image plane can be extended to homogeneous coordinates with $$(x, y) \rightarrow \begin{pmatrix}x \\ y \\ 1\end{pmatrix} \in \mathbb{P}^2,$$ where the third coordinate allows us to represent rays in 3-dimensional space. The third dimensions is also used in satisfy certain equations in transformations across [[🗺️ Coordinate Systems]].

All points along the ray are projectively equivalent. That is, they're equivalent if they satisfy $$\begin{pmatrix} u \\ v \\ w \end{pmatrix} = \lambda \begin{pmatrix} u' \\ v' \\ w' \end{pmatrix}.$$ This equivalence is also expressed as $$\begin{pmatrix} u \\ v \\ w \end{pmatrix} \sim \begin{pmatrix} u' \\ v' \\ w' \end{pmatrix}.$$

These equivalences define equivalence classes in $\mathbb{R}^3 \setminus \{(0, 0, 0\}$, each of which constitutes a ray. The projective plane $\mathbb{P}^2$ is the set of all rays.

To go back from $\mathbb{P}^2$ to $\mathbb{R}^2$, we must find the spot on the ray with the third coordinate equal to $1$. Thus, $$\begin{pmatrix} x \\ y \\ w \end{pmatrix} \rightarrow (x/w, y/w) \in \mathbb{R}^2.$$

Notice that this injection requires $w \neq 0$. Rays where $w = 0$ (of the form $\begin{pmatrix} u & v & 0 \end{pmatrix}^\top$) are called points at infinity. These points cannot be projected onto the image plane; geometrically, the rays are parallel to the image plane and thus will never intersect it.

# Projective Lines
A line on the image plane is defined as $$ax + by + c = 0.$$

In projective space, this line becomes a plane defined by orthogonal vector $l = \begin{pmatrix} a & b & c \end{pmatrix}^\top$, and a ray $p$ is on the plane if $l^\top p = 0$.

## Lines From Points
Given two points $p_1$ and $p_2$ on the image plane, the line connecting them $l$ satisfies $l^\top p_1 = l^\top p_2 = 0$, so we can find the orthogonal vector as $$l \sim p_1 \times p_2.$$

There are two special forms of $l$:
1. $\begin{pmatrix} a & b & 0 \end{pmatrix}$ represents $ax + by = 0$, so $l$ passes through the origin.
2. $\begin{pmatrix} 0 & 0 & 1 \end{pmatrix}$ is only orthogonal to points $\begin{pmatrix} x & y & 0 \end{pmatrix}$, which are points at infinity. Thus, this line contains all points at infinity.

## Points From Lines
Two lines intersect at a point. Since the point must be orthogonal to both vectors $l_1$ and $l_2$, we have point $$p \sim l_1 \times l_2.$$

Notice that if $l_1$ and $l_2$ are parallel, $l_1 = \begin{pmatrix}a & b & c\end{pmatrix}$ and $l_2 = \begin{pmatrix}a' & b' & c'\end{pmatrix}$, their intersection is $$l_1 \times l_2 = (c' - c)\begin{pmatrix}b \\ -a \\ 0\end{pmatrix},$$ which is a point at infinity.