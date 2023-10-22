# Theory
Assume our input data $D$ is linear. That is, it follows the following function.
$$ Y = aX + b + \varepsilon $$
Noise $\varepsilon \sim \mathcal{N}(0, \sigma^2)$ can be interpreted as randomness or effects of other features not included in $D$. Another way to write $Y$ is as follows.
$$ Y_i \sim \mathcal{N}(aX_i + b, \sigma^2) $$
Linear regression fits a linear model that maximizes the fit, which equates to minimizing the error $J(\theta)$ or maximizing the likelihood $L(\theta)$, both of which are defined below.
$$ J(\theta) = \sum_{i=1}^n (y^{(i)} - \theta^\top x^{(i)})^2 $$
$$ L(\theta) = p(y \vert X;\theta) = \prod_{i=1}^n \frac{1}{\sqrt{2\pi}\sigma} \exp\{-\frac{(y^{(i)}-\theta^\top x^{(i)})^2}{2\sigma^2}\} $$
To maximize the likelihood, we find $\theta$ that maximizes the log-likelihood, which simplifies the math. This gives us an equation that's analogous to minimizing $J(\theta)$.
$$ \ell(\theta) = n\log\frac{1}{\sqrt{2\pi}\sigma} - \frac{1}{2\sigma^2}\sum_{i=1}^n (y^{(i)} - \theta^\top x^{(i)})^2 = n\log\frac{1}{\sqrt{2\pi}\sigma} - \frac{1}{2\sigma^2}J(\theta) $$
The following is an example of performing (MLE) linear regression on single-feature $x$.
![[20221229103224.png#invert|400]]
Note that with regularization (MAP), we need to incorporate an extra term to our error
$$J(\theta) = \sum_{i=1}^n (y^{(i)} - \theta^\top x^{(i)})^2 + \lambda \Vert w\Vert_2^2$$ that pushes the weights toward $0$. This makes MAP not scale-invariant as the scale of the weights now matter; MLE, on the other hand, is scale invariant and will always find the parameters that maximize likelihood.

# Model
Our model consists of the weight matrix $\theta$ (which can be MLE or MAP). With $\theta_{MAP}$, we apply a prior (that’s usually $0$), which causes a regularization effect.

# Training
Given training data $X$ and $y$, assume weight prior $\theta_j \sim \mathcal{N}(0, \gamma^2)$. Let regularization term $\lambda = \frac{\sigma^2}{\gamma^2}$, then closed form solution is as follows.

$$ \theta_{MAP} = (X^\top X + \lambda I)^{-1}X^\top y $$

If we don’t use a prior, our MLE closed form is as follows

$$ \theta_{MLE} = (X^\top X)^{-1}X^\top y $$

To get bias term $b$, add a new feature $x_0 = 1$ for all training examples; the coefficient for this feature is our bias

Note that computing the closed form solution may be expensive, in which case [[🗼 Least Mean Squares]] provides an alternative optimization method using gradient descent.

# Prediction
Our prediction for input $x$ is $\hat{y} = \theta^\top x$, which returns the location of the point on the line
