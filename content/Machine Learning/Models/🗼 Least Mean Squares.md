# Theory
LMS is an online learning (streaming) alternative to [[🏦 Linear Regression]]; the closed form calculation can be extremely expensive, so LMS approximates it.

As before, we optimize the $L_2$ loss, but this time with stochastic [[⛰️ Gradient Descent]].

> [!info]
> For learning rate $\eta$, LMS converges if $0 < \eta < \lambda_{max}$ where $\lambda_{max}$ is the largest value of covariance matrix $X^\top X$.

## Locally Weighted Regression
If our data is non-linear, we can approximate a prediction by fitting a line to points that are nearby. However, this is a non-parametric method that requires fitting a new line for every prediction.

Specifically, we aim to find $\theta$ that minimizes the weighted $L_2$ loss $$\sum_{i=1}^n w^{(i)} (y^{(i)} - \theta^\top x^{(i)})^2$$
where $w^{(i)} = \exp\{\frac{-(x^{(i)} - x)^2}{2\tau^2}\}$, $\tau$ controlling the bandwidth of the sudo-gaussian.

# Model
The model itself is the exact same as linear regression: we keep a set of weights $\theta$ that are applied to each feature in the input $x$. We also maintain learning rate $\eta$ as a hyperparameter used during training.

# Training
Given training data $D$, initialize weights $\theta$ randomly.

Then, go through each observation $x_i$ sequentially,
1. Let residual $r_i = y_i - \theta^\top x_i$
2. Update weights $\theta = \theta + \eta r_i x_i$

> [!info]
> To derive the update step, we observe that the derivative of L2 loss is $-2r_ix_i$, so a move in the gradient step with scaling $\frac{\eta}{2}$ gives us our update equation.

# Prediction
Similar to linear regression, given input $x$, our prediction $\hat{y} = \theta^\top x$.