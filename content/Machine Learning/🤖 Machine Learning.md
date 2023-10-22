Machine learning involves algorithms that "learn" from data. They take data as input and produce a model as output.

# Problems
There are three main forms of learning depending the problem type.
1. [[🎓 Supervised Learning]] deals with modeling inputs $x$ to output $y$.
2. [[🔍 Unsupervised Learning]] finds patterns in unlabeled inputs $x$.
3. [[♟️ Reinforcement Learning]] trains an agent to act in an environment.

Across these three problems, we also have a multitude of more specific scenarios:
1. Semi-supervised learning uses both labeled and unlabeled data, essentially combining unsupervised and supervised methods.
2. Self-supervised learning frames unlabeled data as a supervised problem by extracting "pretext" tasks from the existing data (for example, in-painting).
3. [[✋ Active Learning]] extends semi-supervised learning by allowing the model to select which data samples to label next.
4. [[📖 Representation Learning]] tackles learning latent embeddings of the data—summaries of the data with semantically-meaningful information.
5. [[🎨 Generative Modeling]] learns generative models that can "sample" from the data distribution, creating synthetic data that resembles its input.

# Models
Theoretically, models can be thought of as probability distributions. They can be either generative or discriminative.
1. Generative models $p(x, y)$ or $p(x)$ capture the entire shape of the data distribution and predicts via probabilistic inference.
2. Discriminative Models $p(y \vert x)$ directly draw boundaries in the data space.

With simple data, [[🏭 Linear Factor Model]]s can capture basic distributions. However, as our data becomes more complex, we can't directly model the joint distributions and must incorporate assumptions via [[🪩 Probabilistic Graphical Model]]s.

Either way, models are usually designed for one problem type:

| Supervised Learning      | Unsupervised Learning               | Reinforcement Learning               |
| ------------------------ | ----------------------------------- | ------------------------------------ |
| [[🏦 Linear Regression]] | [[🎒 K-Means Clustering]]           | [[⌛️ Temporal Difference Learning]]                    |
| [[💭 Decision Tree]]     | [[📄 Latent Dirichlet Allocation]]  | [[🚓 Policy Gradient]]                         |
| [[👓 Perceptron]]        | [[🗜️ Principle Component Analysis]] | [[🧨 Dynamic Programming]] |
| [[🔥 Adaboost]]          | [[📼 Gaussian Mixture Model]]       | [[🪙 Monte Carlo Control]]                                     |


## Priors
Classical machine learning models generally have statistical and mathematical roots and are largely reliant on the smoothness prior—that the function we learn should be smooth within a small region, $$f(x) \approx f(x + \epsilon).$$

In more complex problems, classical methods run into problems. As the dimensionality of the problem space increases, we run into the [[☠️ Curse of Dimensionality]]. The smoothness prior is not sufficient to generalize higher dimensional problem spaces as there aren't enough samples to cover the space. Rather, we have the [[🪐 Manifold Hypothesis]], which states that samples lie on a low-dimensional subspace of the full problem space.

To address this challenge, [[🧠 Deep Learning]] uses biologically-inspired neural network architectures that are magnitudes more complex than classical methods. This introduces stronger priors and allows us to model more flexible functions that can capture higher-dimensional inputs.

# Optimization
Training machine learning models involve optimizing their parameters, also called weights.
1. [[⛰️ Gradient Descent]] gradually moves down a convex loss function. [[🌱 Natural Gradient]] is a variant that moves in probability space rather than parameter space.
2. [[🔎 Greedy Search]] performs feature selection for non-convex loss.
3. [[🎉 Expectation Maximization]] optimizes hidden variables in unsupervised models.

More generally, mathematical techniques like [[👟 Unconstrained Optimization]] and [[👠 Constrained Optimization]] are used to optimize functions that satisfy certain conditions.

In practice, [[👔 Overfitting]] is a common problem where models learn noise in the training data that's not part of the real world. The solution is two-fold.
1. [[⚽️ Regularization Penalties]] in loss functions apply weight shrinkage or selection.
2. [[✅ Validation]] methods find hyperparameters that optimize model complexity.

[[👀 AutoML]] is a modern solution that automates both processes by automatically building a ensemble that maximizes performance for a given problem.

# Operations
Finally, there are some more real-world practices to keep in mind.
1. [[❓ Imputation]] is required to address missing data.
2. [[🎹 Classification Metrics]] is necessary to measure a model's performance.
3. [[🎙️ Explainability]] analyses the patterns our model learned and what the model actually tells us about the world.
