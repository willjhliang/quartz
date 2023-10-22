For [[🍱 Matrix#Symmetric Positive Semidefinite (PSD)]] matrix $A$, we can factorize $$A = LL^\top$$ where $L$ is a lower triangular matrix with a positive diagonal.

$L$, called the Cholesky factor, is commonly used in machine learning for numerical computations. For example, it simplifies the determinant calculation, $$\det A = \det(L)\det(L^\top ) = \det(L)^2 = \prod_i l_{ii}^2.$$