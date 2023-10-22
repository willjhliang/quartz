Variable elimination is an exact inference technique for $p(x)$, represented as a [[🗳️ Markov Random Field]] or equivalently a product of [[🍪 Factor]]s, that can drastically reduce the computation time for probabilistic inference. The main idea is to eliminate variables one-by-one instead of naively summing over combinations of all variables at once.

First, we need some elimination ordering $O$ of the variables. Choosing this ordering itself is NP-hard, but there are some heuristic approaches.
1. Min-neighbors orders by fewest dependencies.
2. Min-weight orders by minimizing the product of cardinalities of dependencies.
3. Min-fill orders by minimizing the size of the next marginalized factor $\tau$.

Now, to perform elimination, we perform the following for each variable $x_i$ from our ordering $O$.
1. Take the product of all factors $\phi_j$ containing $x_i$.
2. Marginalize out $x_i$ to obtain $\tau$.
3. Replace factors $\phi_i$ with $\tau$.

# Pushing Sums
A more intuitive alternative explanation is that we're essentially "pushing in" our summations from the original naive solution. Consider a [[⛓️ Markov Chain]]'s probability distribution $$p(x_1, \ldots, x_n) = p(x_1) \prod_{i=2}^n p(x_i \vert x_{i-1}).$$

Our naive calculation is for $p(x_n)$ is $$p(x_n) = \sum_{x_1}\ldots\sum_{x_{n-1}} p(x_1, \ldots, x_n) = \sum_{x_1}\ldots\sum_{x_{n-1}} p(x_1) \prod_{i=2}^n p(x_i \vert x_{i-1}).$$

However, note that these variables aren't dependent on most of the summations. For example, $p(x_n \vert x_{n-1})$ only requires a summation over $x_{n-1}$. Thus, flipping the summation order and factoring, we get $$p(x_n) = \sum_{x_{n-1}} p(x_n \vert x_{n-1}) \sum_{x_{n-2}} p(x_{n-1} \vert x_{n-2}) \ldots \sum_{x_1} p(x_2 \vert x_1) p(x_1).$$

Now, we can calculate the innermost sum, $\tau(x_2) = \sum_{x_1} p(x_2 \vert x_1)p(x_1)$, to get $$p(x_n) = \sum_{x_{n-1}} p(x_n \vert x_{n-1}) \sum_{x_{n-2}} p(x_{n-1} \vert x_{n-2}) \ldots \sum_{x_2} p(x_3 \vert x_2) \tau(x_2),$$ which we can eliminate again using the same procedure. In this illustration, "pushing" the summation is equivalent to choosing which factors to multiply and marginalizing over them.

# Complexity
In our Markov chain example, if each random variable has $k$ unique values, each elimination here takes $O(k^2)$ time, so our total runtime is $O(nk^2)$ instead of the naive $O(k^n)$.

However, not all distributions have such an ideal structure. In most cases, the ordering of our variables significantly affects our runtime: if we combine too many factors and need to marginalize out a big factor, the summation size grows by a factor of $k$ for each variable.

Thus, the complexity of variable elimination ifs $O(nk^{M+1})$ where $M$ is the maximum size of any factor $\tau$ formed via factor product.
