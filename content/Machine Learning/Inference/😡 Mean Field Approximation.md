Mean field approximation is a type of variational inference that assumes the variational distribution $q$ to take on a specific form, 
$$
q(z) = \prod_{i=1}^m q(z_i)
$$
 where there are no dependencies across hidden variables.

When we apply the [[🧬 Evidence Lower Bound]], we find that the optimal value for $q$, denoted as $q^*$, follows 
$$
q^*(z_j) \propto \mathbb{E}_{q_{-j}} [\log p(x, z)]
$$
 where $q_{-j}$ in the expectation denotes a marginalization over all $z_i$ for $i \neq j$. We can thus optimize the ELBO via coordinate ascent, changing one dimension while keeping the others constant.