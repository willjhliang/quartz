Overfitting occurs when a model learns training noise along with the actual correlations; in other words, the model’s performance becomes dependent on the training data, resulting in low training error but high test error.

The degree of overfitting depends on model complexity and regularization. With regularization, we decrease model complexity to reduce overfitting, but this also increases training error. This phenomenon is commonly known as the bias-variance tradeoff.

# Bias and Variance
Simple models don’t fit data well but generalized better; complex models can fit data perfectly but generalize terribly. Therefore, simple models have high bias while complex models have high variance.

For estimate $\hat{\theta}$ of parameter $\theta$, bias and variance are formally defined as expectations over a distribution of training data $D$. In other words, if we randomly take a subset of all possible observations from this problem as $D$, what errors will the model always make (bias) and what errors will vary (variance)?
$$ \text{bias}(\hat{\theta}) = \mathbb{E}_D[\hat{\theta} - \theta] $$
$$ \text{variance}(\hat{\theta}) = \mathbb{E}_D[(\hat{\theta} - \mathbb{E}_D[\hat{\theta}])^2] $$

## Bias-Variance Decomposition
These two terms are related by bias-variance decomposition. For model $h$ and average model $\bar{h}$ (over all datasets $D$), expected squared error can be decomposed into variance, bias squared, and noise.
$$ \begin{align*} \mathbb{E}_{x,y,D}[(h(x\vert D) - y)^2] &= \mathbb{E}_{x,D}[(h(x\vert D)-\bar{h}(x))^2] + \mathbb{E}_x[(\bar{h}(x) - \bar{y}(x))^2] + \mathbb{E}_{x,y}[(\bar{y}(x) - y)^2] \\ &=  \text{variance} + \text{bias}^2 + \text{noise} \end{align*}$$