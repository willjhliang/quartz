Mathematics is the core of many algorithms and intuitive ideas. The following are the main topics used in computer science with a slight bias toward machine learning fundamentals.

# Linear Algebra
Linear algebra is the study of vectors and matrices and their manipulations.
1. [[🏹 Vector]]s are objects that are closed under clearly defined addition and scalar multiplication operations.
2. A [[🍱 Matrix]] is a two-dimensional tuple with entries; important properties of a matrix include the [[📖 Determinant]] and [[🖊️ Trace]] as well as its [[💐 Eigenvalue]]s.

Using vectors and matrices, we can solve [[⚙️ System of Linear Equations]] and model [[🗺️ Linear Mapping]]s.

Sometimes, a problem requires a matrix to be factorized.
1. [[🥧 Cholesky Decomposition]] converts a PSD matrix into two triangular matrices.
2. [[🪷 Eigendecomposition]] shows that a non-defective square matrix is similar to a diagonal matrix.
3. [[📎 Singular Value Decomposition]] decomposes a matrix into the product of two orthonormal matrices and one diagonal matrix with singular values.

# Geometry
Geometry is closely tied with vectors and matrices from linear algebra, and we can use it to interpret them from a new point of view.
1. [[🎳 Inner Product]]s map pairs of vectors to a number, and [[📌 Norm]]s represent the size of vectors and matrices.
2. With them, we can compute [[🚗 Distance]]s, [[📐 Angle]]s between vectors, and [[📽️ Projection]]s of vectors onto subspaces.
3. [[🪩 Rotation]]s can also be defined by matrices as linear mappings.

# Calculus
Calculus describes the shape of functions in detail and is crucial for optimization and approximations.
1. [[🍧 Derivative]]s find the tangent slope in univariate functions, and [[❄️ Gradient]]s generalize them to multivariate functions.
2. The [[🎤 Taylor Series]] is an important method for approximating any differentiable function as a polynomial.

# Optimization
Using calculus, we can solve general minimization problems.
1. [[👟 Unconstrained Optimization]] uses gradient descent to walk down convex objectives.
2. [[👠 Constrained Optimization]] applies the augmented Lagrangian to represent a problem in dual form.

# Probability Theory
Probability theory measures the likelihood of events and outcomes.

[[🪐 Random Variable]]s measure some quantitative value over [[🎲 Probability Distribution]]s.
1. [[🇺🇸 Independence]] between two variables is an important property that leads to further conclusions.
2. [[📚 Summary Statistics]] explains important properties of a random variable's distribution.

Among all classes of probability distributions, the [[👨‍👩‍👧‍👦 Exponential Family]] is commonly used due to its simplicity and computational properties. The most common member is the [[👑 Gaussian]].

Generalizing to any distribution, there are several crucial theorems and conclusions.
1. [[🪙 Bayes' Theorem]] relates the posterior, prior, likelihood, and evidence.
2. [[🌈 Jensen's Inequality]] measures the effect of applying a convex function to a random variable.
3. [[🧬 Evidence Lower Bound]] provides a tractable lower bound on an intractable likelihood.

Lastly, information theory is a subfield that analyzes the entropy of distributions.
1. [[🔥 Entropy]] measures the level of uncertainty in a distribution.
2. [[💧 Cross Entropy]] generalizes entropy to compute across two distributions.
3. [[💰 Information Gain]] measures the change in entropy after gaining new "information."
4. [[🤝 Mutual Information]] measures the degree of shared "information" between two variables.
5. [[✂️ KL Divergence]] and, more generally, [[🪭 F-Divergence]] measure the difference between two distributions.