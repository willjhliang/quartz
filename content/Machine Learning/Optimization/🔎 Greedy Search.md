Greedy Search is a feature selection method used to optimize $L_0$ regularization, which has a non-convex loss function that cannot be solved with [[⛰️ Gradient Descent]]. There are three main methods, each adding features one-by-one in some sort of greedy fashion; we first initialize all weights to $0$, then perform one of the following.

# Streamwise Regression
For each feature $x_j$, try adding $x_j$ to the model and retrain; if the penalized error improves, accept this new model.

# Stepwise Regression
Iterate $p$ times.
1. For each feature $x_j$, try adding $x_j$ to the model and retrain.
2. Pick the feature that has lowest error; if the penalized error improves, accept this new model.

# Stagewise Regression
Iterate $p$ times.
1. For each feature $x_j$, try adding $x_j$ to the model and retrain only the weight for $x_j$; in other words, fit $x_j$ on residual $r_t = y - h_{t-1}(x)$.
2. Pick the feature $\phi_t(x)$ that has lowest error.
3. Regress $r_t = \alpha_t\phi_t(x)$ to find scaling coefficient $\alpha_t$.
4. Update our model $h_t(x) = h_{t-1}(x) + \alpha_t\phi_t(x)$.