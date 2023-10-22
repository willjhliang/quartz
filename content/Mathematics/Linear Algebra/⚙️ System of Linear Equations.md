We commonly use a [[🍱 Matrix]] to encode systems of linear equations. Specifically, a system $$\begin{gather*} a_{11}x_1 + \ldots + a_{1n}x_n = b_1 \\ a_{21}x_1 + \ldots + a_{2n}x_n = b_2 \\ \ldots \\ a_{m1}x_1 + \ldots + a_{mn}x_n = b_m \end{gather*}$$ can be written as $$\begin{bmatrix}a_{11} & \ldots & a_{1n} \\ \vdots & & \vdots \\ a_{m1} & \ldots a_{mn}\end{bmatrix}\begin{bmatrix}x_1 \\ \vdots \\ x_n\end{bmatrix} = \begin{bmatrix}b_1 \\ \vdots \\ b_m\end{bmatrix}.$$

# Gaussian Elimination
The general solution to such a system consists of a particular solution, a specific value for $x_1, \ldots, x_n$ summed with all solutions for $Ax = 0$. We can find these solutions by applying elementary transformations listed below to the augmented matrix $\begin{bmatrix} A & b \end{bmatrix}$ that preserve the solution set. This process is known as Gaussian elimination.
1. Exchange two rows.
2. Multiply one row with a constant.
3. Add a multiple of a row to another.

# Row-Echelon Form
We can use these operations to reach row-echelon form where all nonzero rows have $1$ as the leftmost number, known as the pivot, such that the pivot is to the right of all rows above it. All zero rows are at the bottom of the matrix.

From this form, we can solve for each variable row-by-row, starting with the bottom. Variables corresponding to pivots are fixed variables, and the rest are free variables.

# Reduced Row-Echelon Form
The reduced row-echelon form takes this idea a bit further, enforcing the conditions above as well as making each pivot the only nonzero entry in its column. Solutions to $Ax = 0$ can be easily found by expressing non-pivot columns in terms of negated pivot columns.