# Theory
Active learning is a form of semi-supervised learning with labeled and unlabeled data. It chooses unlabeled data whose label would be the most useful for model training. In other words, it answers the question: what observations should we label?

> [!info]
> For example, in linear regression we would want to label the points on the extreme ends of the feature range. For binary classification, we want to binary search for points near the decision boundary.

Given a label, the active learning algorithm then retrains the model parameters and repeats the request.

There are three main methods for selecting the next observation to label.
1. Uncertainty sampling queries the $x^{(i)}$ that the classifier was most unsure about, measured as entropy of the probability distribution. Other measurements include least confident predicted label or the point closest to SVM margin.
2. Information-based loss function adds onto this idea by looking at the effect of the label on the model; it finds the point whose label would most change the predictions of the model, measured by [[✂️ KL Divergence]].
3. Optimal experimental design finds a point that minimizes the variance of the weight estimates, unlike that previous methods that looked at uncertainty in $x$ or variance in $y$.

## Ordinary Least Squares
For OLS [[🏦 Linear Regression]], $$\theta \sim \mathcal{N}(\beta, \sigma^2(X^\top X)^{-1})$$for data $y = \beta^\top x + \epsilon$, $\epsilon \sim \mathcal{N}(0, \sigma^2)$. In optimal experimental design, we pick a point whose addition to $X$ will minimize $\sigma^2 (X^\top X)^{-1}$. Note that the label of this point, $y$, doesn't actually matter.

> [!info]
> Since $X^\top X = \Sigma$, we're actually finding a point that maximizes the covariance. This means we want to label points in the direction of maximizes variance, or in the direction of the first principal component of PCA.

This variance can be measured in multiple ways, usually some combination of eigenvalues of $X^\top X$. The Frobenius norm minimizes the sum, and other methods minimize product or the maximum eigenvalue. Intuitively, this finds points that are spread out in the feature space.