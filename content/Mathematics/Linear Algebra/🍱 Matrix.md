A matrix $A \in \mathbb{R}^{m \times n}$ is a $m$-by-$n$ tuple of elements $a_{ij}$ for $i = 1 \ldots m$ and $j = 1 \ldots n$. The matrix has $m$ rows and $n$ columns, represented as 
$$
A = \begin{bmatrix} a_{11} & a_{12} & \ldots & a_{1n} \\ a_{21} & a_{22} & \ldots & a_{2n} \\ \vdots & \vdots & & \vdots \\ a_{m1} & a_{m2} & \ldots & a_{mn} \end{bmatrix}.
$$


Note that by this definition, a [[🏹 Vector]] can be viewed as a matrix where one dimension is $1$; a column vector is a $m \times 1$ matrix, and a row vector is a $1 \times n$ matrix.

Generalizing to more than two-dimensions, we get tensors. Mathematically, a tensor is $T \in \mathbb{R}^{n_1 \times \ldots \times n_D}.$ Operations on tensors are usually less defined, but in many cases, we perform matrix operations on two dimensions of the tensor while ignoring the rest.

# Identity Matrix
The identity matrix is a square matrix $I_n \in \mathbb{R}^{n \times n}$ that has $1$ along the diagonals and $0$ everywhere else. It preserves the equation $I_m A = AI_n = A$ for some $A \in \mathbb{R}^{m \times n}$.

# Addition and Multiplication
Matrices are added element-by-element. For $C = A + B$, 
$$
c_{ij} = a_{ij} + b_{ij}.
$$


In matrix multiplication, $C = AB$, $c_{ij}$ is the sum of products between the $i$th row of $A$ and $j$th column of $B$. Specifically, 
$$
c_{ij} = \sum_{l=1}^n a_{il}b_{lj}.
$$
 Note that this also means that $AB \neq BA$.

> [!note]
> Matrix shapes must be the same for addition, and for multiplication, the inner sides must be equal: $n \times k$ with $k \times m$ gives a $n \times m$ product.

The Hadamard product, often denoted as $A \circ B$, performs multiplication element-wise, similar to addition. That is, 
$$
c_{ij} = a_{ij} \cdot b_{ij}
$$
 where $A$ and $B$ are required to have the same shape.

# Inverse and Transpose
The inverse of square matrix $A \in \mathbb{R}^{n \times n}$ is the matrix $A^{-1}$ satisfying $AA^{-1} = A^{-1}A = I_n$. Not all matrices have an inverse, but if they do, the inverse is unique.

The transpose of a matrix $A \in \mathbb{R}^{m \times n}$ is the matrix $A^\top \in \mathbb{R}^{n \times m}$ that's flipped across the diagonal. Specifically if $B = A^\top$, we have $b_{ij} = a_{ji}$. Also, if $A = A^\top$, we call $A$ a symmetric matrix.

For matrix products, $(AB)^{-1} = B^{-1}A^{-1}$ and $(AB)^\top = B^\top A^\top$.

We can compute the inverse using row operations from [[⚙️ System of Linear Equations#Gaussian Elimination]]. Simplifying 
$$
\begin{bmatrix}A & I_n\end{bmatrix} \rightarrow \begin{bmatrix}I_n & A^{-1}\end{bmatrix}
$$
 gives us the inverse. This immediately gives us the solution to the system, $x = A^{-1}b$.

## Moore-Penrose Pseudoinverse
If $A$ is not square but has linearly independent columns, we can use the Moore-Penrose pseudo-inverse 
$$
A^+ = (A^\top A)^{-1}A^\top .
$$


If $A$ doesn't have linearly independent columns, we add a small multiple of $I$ to $A^\top A$, 
$$
A^+ = \lim_{\alpha \rightarrow 0}(A^\top A + \alpha I)^{-1}A^\top ,
$$
 which can be solved with [[📎 Singular Value Decomposition]], 
$$
A^+ = VD^+U^\top
$$
 where $D^+$ is calculated from $D$ by taking the reciprocal of its diagonal and then taking the transpose.

# Special Matrices
## Symmetric Positive Semidefinite (PSD)
A matrix $A$ is symmetric positive semidefinite if for vector space $\mathcal{V}$, $\forall x \in \mathcal{V} \setminus \{ 0 \}$, 
$$
x^\top Ax \geq 0.
$$
 If the inequality is strict, the matrix is symmetric positive definite. This quality has a close connection with the [[🎳 Inner Product]].

Every matrix $A$ can form a PSD matrix $S = A^\top A$.

## Orthogonal
Square matrix $A$ is orthogonal if and only if its columns are orthonormal, as defined by the inner product between columns. For orthogonal matrix $A$, 
$$
AA^\top = A^\top A = I,
$$
 which implies $A^{-1} = A^\top$.

Moreover, transformations by orthogonal matrices preserve lengths, 
$$
\Vert Ax \Vert^2 =\Vert x \Vert^2
$$
 and angles, 
$$
\cos \omega = \frac{(Ax)^\top (Ay)}{\Vert Ax \Vert \Vert Ay \Vert} = \frac{x^\top y}{\Vert x \Vert \Vert y \Vert}
$$


## Phylogeny
The following covers a wider array of matrix types, arranged from top-to-bottom in a hierarchy.

![[20230217215249.png#invert]]