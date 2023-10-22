A factor $\phi(x_1, \ldots, x_k)$ is a function that maps a set of random variables $x_1, \ldots, x_k$ to a real value. $\{ x_1, \ldots, x_k \}$ is called the scope of $\phi$.

Factors are used to construct probability distributions involving random variables, but the factor itself doesn't have any constraints—it doesn't need to sum to one. In fact, constructing a probability distribution from factors often gives us an unnormalized distribution that must be normalized to be a valid distribution.

# Operations
We can perform multiple operations on factors:
1. Factor summation adds the corresponding pairs of outputs for a given input. For example, if our two scopes are $\{ x_1, x_2 \}$ and $\{ x_2, x_3 \}$, then 
$$
\phi'(x_1, x_2, x_3) = \phi_1(x_1, x_2) + \phi_2(x_2, x_3).
$$

2. Factor product combines the scope of two factors $\phi_1$ and $\phi_2$ so that the output of a specific input is the product of the outputs of the two factors. For example, using the same setup as above, 
$$
\phi' (x_1, x_2, x_3) = \phi_1(x_1, x_2) \cdot \phi_2(x_2, x_3).
$$

3. Factor marginalization reduces the scope of a factor by marginalizing over one of the random variables. For example, if we marginalize $x_3$ out of the scope $\{ x_1, x_2, x_3 \}$, then 
$$
\phi'(x_1, x_2) = \sum_{x_3} \phi(x_1, x_2, x_3).
$$

4. Factor reduction removes a random variable from the scope by only considering outputs where the random variable is a specific value. For example, if our original scope is $\{ x_1, x_2, x_3 \}$ and we assume a constant value for $x_3 = c$, then 
$$
\phi'(x_1, x_2) = \phi(x_1, x_2, x_3=c).
$$

5. Factor maximization removes the random variable by choosing the largest output that the random variable can give for the rest of the inputs. For example, using the same scope as above, 
$$
\phi'(x_1, x_2) = \max_{x_3} \phi(x_1, x_2, x_3).
$$
