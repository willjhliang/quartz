# Theory
Principal Component Regression uses [[🗜️ Principle Component Analysis]] to provide a regularization effect for regression. After PCA, we can apply OLS linear regression on the embeddings of $x$.

If we’re given partially-labeled data, we can use PCR to train with the labels. This is an example of semi-supervised learning, where our dataset is partially unlabeled.
1. Calculate PCA on all $x$, then project labeled $x$ to get $z$ and train OLS regression only on the labeled data.
2. Unlabeled data gives some information about the structure of input space, allowing us to train a stronger regression model.

# Model
PCR contains the PCA parameters, scores $Z$ and loadings $V$, and linear regression weights $\theta$.

# Training
Given training data $D$, train a PCA on the inputs $x$ in $D$; apply $V$ to get the scores $Z$.

We’ll train a regression model with $Z$ in place of $x$, using labels $y$ as normal

$$
 \theta = (Z^\top Z)^{-1}Z^\top Y 
$$


# Prediction
Given input $x$, compute scores $z = V^\top x$, then apply our weights to predict $\hat{y} = \theta^\top z$.