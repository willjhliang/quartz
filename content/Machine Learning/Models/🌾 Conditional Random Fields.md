Conditional random fields are a form of [[🗳️ Markov Random Field]]s that models the conditional distribution $p(y \vert x)$. Our graph contains variables $X$ and $Y$, and the distribution is 
$$
p(y \vert x) = \frac{1}{Z(x)}\prod_{c \in C}\phi_c(x_c, y_c)
$$
 with partition function 
$$
Z(x) = \sum_y \prod_{c \in C} \phi_c(x_c, y_c).
$$
 This is similar to a standard Markov random field, but it now depends on $x$.

We commonly assume the factors have form 
$$
\phi_c(x_c, y_c) = \exp \{ w_c^\top f_c(x_c, y_c) \}
$$
 where $f_c(x_c, y_c)$ describes the compatibility between $x_c$ and $y_c$. Sometimes, the factor may take in the entire $x$ and use it to compare $y_i$. We do this because $x$ is given as input, and there's no need to model $p(x, y)$ since we're only looking for $p(y \vert x)$.