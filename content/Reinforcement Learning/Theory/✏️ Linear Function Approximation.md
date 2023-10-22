When we need function approximation in the case of large complex state spaces, we want to find a parameterization that balances complexity and expressiveness. On the least complex end of the spectrum is linear approximation, which simply applies an inner product between the input and parameters; for a value function estimate, we have $$V^\pi_\theta (s) = \theta^\top x(s)$$ where $x(s)$ is some feature vector of state $s$ and $\theta$ is our parameters.

While this is often impractical in practice, this method does offer some properties for theoretical analysis. The gradient of our function is $$\nabla_\theta V^\pi_\theta(s) = x(s),$$ so our gradient update is $$\theta' \leftarrow \theta + \alpha[U - V_\theta^\pi(s)]x(s)$$ where $U$ is some estimate of the true value $V^\pi(s)$. In this setting, there is only one optimum, so methods that guarantee convergence will always arrive at the optimal function approximation.

# Feature Construction
Since linear function approximation only uses the inner product, the expressiveness of our state feature vector is crucial to generalization.
1. Polynomials across state dimensions allows us to relate multiple states together.
2. Fourier basis decomposes signals into periodic functions.
3. Coarse coding produces a binary in-or-out vector with respect to some basis; the feature for some component is $1$ if the state is in the designated region or $0$ otherwise.
4. Tile coding is a specific type of coarse coding that breaks the state space into multiple tile grids.
5. Radial basis functions, commonly used in [[🥢 Generalized Linear Model]]s, are a soft version of coarse coding that measures similarity with Gaussian kernel functions.