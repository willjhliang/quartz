The following are special types of mappings.
1. Injective: if $\forall x, y \in \mathcal{V}$, $\Phi(x) = \Phi(y) \implies x = y$.
2. Surjective: if $\Phi(\mathcal{V}) = \mathcal{W}$.
3. Bijective: if $\Phi$ is both injective and surjective.

A mapping $\Phi: \mathcal{V} \rightarrow \mathcal{W}$ is linear if $\Phi(x + y) = \Phi(x) + \Phi(y)$ and $\Phi(\lambda x) = \lambda \Phi(x)$. If the mapping is linear and bijective, it's called an isomorphism.

For a basis $B = (b_1, \ldots, b_n)$ of $\mathcal{V}$, every $x \in \mathcal{V}$ can be expressed as $x = \sum_{i=1}^n \alpha_i b_i$. Then, $\alpha_1, \ldots, \alpha_n$ are the coordinates of $x$ with respect to $B$, and the coordinate vector is 
$$
\alpha = \begin{bmatrix}\alpha_1 \\ \vdots \\ \alpha_n\end{bmatrix}.
$$


For vector spaces $\mathcal{V}$ and $\mathcal{W}$ with corresponding bases $B = (b_1, \ldots, b_n)$ and $C = (c_1, \ldots, c_m)$ and linear mapping $\Phi: \mathcal{V} \rightarrow \mathcal{W}$, we can write 
$$
\Phi(b_j) = \alpha_{1j}c_1 + \ldots + \alpha_{mj}c_m.
$$
 Then, the transformation matrix $A_\Phi$ contains these elements $\alpha_{ij}$. If $\hat{x}$ is the coordinate vector of $x \in \mathcal{V}$ with respect to $B$ and $\hat{y}$ is the coordinate vector of $y = \Phi(x) \in \mathcal{W}$ with respect to $C$, then 
$$
\hat{y} = A_\Phi \hat{x}.
$$


Using this formulation, we can also define a change of basis matrix $S$ that maps basis $B$ to $C$ within the same vector space. Finally, note that transformation matrices can be composed together via matrix multiplication.

# Image and Kernel
For $\Phi: \mathcal{V} \rightarrow \mathcal{W}$, the kernel is defined as 
$$
\ker(\Phi) = \{v \in \mathcal{V} \mid \Phi(v) = 0\}
$$
 and the image is defined as 
$$
\text{Im}(\Phi) = \{w \in \mathcal{W} \mid \exists v \in \mathcal{V}: \Phi(v) = w \}.
$$
 We can think of the kernel as all vectors that map to $0$ and the image as all vectors that can be reached via $\Phi$.

![[20230216220325.png#invert|300]]

The rank-nullity theorem states that for $\Phi: \mathcal{V} \rightarrow \mathcal{W}$, 
$$
\dim(\ker(\Phi)) + \dim(\text{Im}(\Phi)) = \dim(V).
$$


# Affine Spaces and Mappings
Affine spaces, also known as linear manifolds, are spaces offset from the origin. Thus, they are no longer vector subspaces. Specifically, for vector space $\mathcal{V}$, $x_0 \in \mathcal{V}$, and subspace $\mathcal{U} \subseteq \mathcal{V}$, an affine space $L$ is defined as 
$$
L = x_0 + \mathcal{U} = \{x_0 + u \mid u \in \mathcal{U}\}.
$$
 $\mathcal{U}$ is called direction, and $x_0$ is the support point.

Note that every element $x \in L$ can be described as 
$$
x = x_0 + \sum_{i=1}^k\lambda_ib_i
$$
 for basis $(b_1, \ldots, b_k)$ of $\mathcal{U}$. $\lambda_1, \ldots, \lambda_k$ are known as parameters, and this is the parametric equation of $L$.

Following a similar definition, an affine mapping $\phi: \mathcal{V} \rightarrow \mathcal{W}$ with $a \in \mathcal{W}$ and $\Phi: \mathcal{V} \rightarrow \mathcal{W}$ is defined as 
$$
\phi: x \mapsto a + \Phi(x).
$$
 $a$ is the translation vector, and every affine mapping can be seen as a linear mapping followed by a translation.