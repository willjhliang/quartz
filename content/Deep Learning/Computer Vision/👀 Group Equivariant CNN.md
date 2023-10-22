Group Equivariant CNNs (G-CNNs) generalized the standard [[👁️ Convolutional Neural Network]]s' translation [[🪞 Equivariance]] to other symmetries, specifically rotation and reflection.

# Symmetric Groups
A symmetry of an object is a transformation that leaves it invariant. The set of symmetric transformations is a symmetry group.

The translation, rotation, and reflection operations are all symmetries for our feature map. Thus, they form the p4m group parameterized by $$g(m, r, u, v) = \begin{bmatrix} (-1)^m \cos(r\pi/2) & -(-1)^m\sin(r\pi/2) & u \\ \sin(r\pi/2) & \cos(r\pi/2) & v \\ 0 & 0 & 1 \end{bmatrix}.$$ This matrix is applied to [[📽️ Projective Geometry#Homogenous Coordinates]] for the transformed pixels. That is, a member of the group $g$ can be applied to a pixel location via $gx$.

# Group Functions
However, observe a transformation on a pixel is equivalent to the inverse transformation on the image; for example, moving a pixel to the left in $\mathbb{R}^2$ space is equivalent to shifting the image to the right in the same pixel space. Thus, the transformation acting on a feature map $f$ is defined as $$[L_gf](x) = f(g^{-1}x).$$ Intuitively, this is saying that the value at point $x$ after transforming $f$ via $L_g$ comes from the point $g^{-1}x$ in the original feature map.

A feature map in p4m space and the operations a group can perform on it is below.

![[20230310184114.png#invert|400]]

# G-Convolutions
Now, we can generalize standard convolutions to groups. Note that the original convolution is CNNs is performed on a group consisting of translations; for a filter $\psi$ and feature map $f$, this convolution is defined as $$[f * \psi](x) = \sum_{y \in \mathbb{Z}^2} f(y)\psi(y-x)$$ for each offset $x$. That is, the convolution computes the product across the feature map and a translated (offset) filter.

The key insight here is that $x \in \mathbb{Z}^2$ is equivalent to the group parameterized by $$g(u, v) = \begin{bmatrix} 1 & 0 & u \\ 0 & 1 & v \\ 0 & 0 & 1 \end{bmatrix}.$$ Thus, instead of thinking about $x$ as simply a tuple, we can imagine it as a member of this translation group, meaning that each output of the convolution is the result of a specific parameterization of $u$ and $v$ in $g$. Fundamentally, the convolution is a function that takes groups as input rather than a simple offset.

Therefore, we can generalize to any symmetric group $G$: for an operation $g \in G$, we can write the above equation as $$[f * \psi](g) = \sum_{y \in \mathbb{Z}^2} f(y)\psi(g^{-1}y).$$ This is the G-convolution that acts on the input feature map.

However, since this results in a feature map $f * \psi$ that's a function on $G$, all other G-convolutions require filters that are functions on $G$, giving us $$[f * \psi](g) = \sum_{h \in G} f(h)\psi(g^{-1}h).$$

Pooling layers can be defined using the same idea, and nonlinearities are still performed over each value, $\mathbb{R} \rightarrow \mathbb{R}$. These three building blocks thus allow us to build a CNN that has equivariance for translations, rotations, and reflections; note that in implementation, only 90-degree rotations were implemented.