Bayesian optimization is a method for optimizing variables $x$ for an objective function $f$. This is used in the situation where we don't know the shape of $f$ but can evaluate it at any point—calculate $f(x)$ for some $x$. If we did know the shape, then [[⛰️ Gradient Descent]] would be more suitable.

If we had infinite resources, we could evaluate $f(x)$ for all $x$ and find the actual shape of $f$. However, this is often infeasible.

Instead, bayesian optimization builds a probability model $p(y \vert x)$ where $y = f(x)$—called surrogate model—of the objective function from a smaller set of evaluations. To do so, it requires two key components:
1. Surrogate model: a probability model $p(y \vert x)$ that estimates the objective $f$ given data $x$. A common choice is a [[🎲 Gaussian Process]].
2. Acquisition (selection) function: how we select which $x$ to evaluate that best improves our surrogate model.

To perform bayesian optimization, we repeat the following steps multiple times:
1. Use the acquisition function to find the best $x^*$ to evaluate.
2. Evaluate $f(x^*)$.
3. Add $(x^*, f(x^*))$ to a history buffer $H$.
4. Fit a new surrogate model on $H$.

At the end, we can find the global maximum from $H$, thereby giving an estimate of the optimal $x$.

# Acquisition Functions
