Generative modeling is the task of accurately learning a data distribution $p(x)$ with the end-goal of evaluating the probability of some specific $x$ or generating new samples from the distribution. To do this, we must either explicitly define a model that parameterizes the distribution or implicitly train a model that can sample from the distribution.

# Explicit Density
Modeling a completely flexible $p(x)$ is intractable due to the exponential number of parameters required. We thus use [[🪩 Probabilistic Graphical Model]]s that have some tractable parameterization or approximation methods to simplify the distribution.
1. [[🕰️ Autoregressive Model]]s flexibly capture $p(x)$ by conditioning each dimension on the ones before it. One landmark example is [[🏁 PixelCNN]].
2. [[💦 Normalizing Flow]] models transform a simple distribution into $p(x)$ via invertible operations.
3. [[🖋️ Variational Autoencoder]]s map a latent space $p(z)$ to our desired distribution.
4. [[⚡️ Energy-Based Model]]s assume the Boltzmann distribution and model the energy of the distribution rather than the distribution itself.

# Implicit Density
Some models focus on carefully defining objectives rather than deriving them from an analytical distribution. The most famous example is the [[🖼️ Generative Adversarial Network]], which optimizes a generator and discriminator in a two-player minimax game.