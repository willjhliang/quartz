Supervised learning learns an accurate model $f$ that maps input $x$ to output label $y$. To do this, we search over a hypothesis class to minimize the loss on the training set, 
$$
\hat{f} = \arg\min_{f \in H} \frac{1}{m}\sum_{i=1}^m J(f(x^{(i)}, y^{(i)})
$$

> [!note]
> We can use any function, simple or complex, to fit the data. However, the [[🥪 No Free Lunch Theorem]] states that there's no single algorithm that performs best on all data. All models require built-in biases, and it's our job to choose a class $H$ that works for our data.

Moreover, we want the model to generalize well. Mathematically, our goal is to minimize risk 
$$
R(\hat{h}) = \mathbb{E}_{(x, y) \sim D} [J(\hat{f}(x), y)]
$$

where $D$ is the distribution of our data.

# Non-Parametric Models
Non-parametric models don't optimize any weights.
1. [[🏠 K-Nearest Neighbors]] compares an input with the known data.
2. [[💭 Decision Tree]]s split up the data on features that give the most information about the label.
3. [[🏯 Kernel Regression]] is a soft form of KNN that considers example similarity.

An [[🎻 Ensemble]] combines non-parametric models to generate more accurate predictions.

# Parametric Models
Parametric models, on the other hand, have a set of weights to optimize. Many optimize the their probability likelihood using [[🪙 Maximum Likelihood Estimate]] or [[🎲 Maximum A Posteriori]], while others use more model-specific methods.

While there's a huge diversity of solutions, parametric models can be categorized into the type of problem they solve: regression or classification.

## Regression
Regression problems deal with predicting continuous $y$.
1. [[🏦 Linear Regression]] fits a line to linear data.
2. [[🥢 Generalized Linear Model]] adapts this idea to work for non-linear data.
3. [[🔨 Principle Component Regression]] combines dimensionality reduction with linear regression.

## Classification
Classification problems, on the other hand, work with discrete $y$, or classes.
1. [[🦠 Logistic Regression]] is an extension of linear regression that outputs class probabilities.
2. [[🛩️ Support Vector Machine]]s divide the data into two classes with a hyperplane.
3. [[👶 Naive Bayes]] classifies extremely large features sets by assuming that features are conditionally independent given the label.

## Online Learning
There are some online variants of these algorithms that train via streaming, going through each datapoint one-by-one and updating the weights.
1. [[🗼 Least Mean Squares]] is an online version of linear regression.
2. [[👓 Perceptron]]s perform online updates for SVMs.

If there's not enough labeled data, [[✋ Active Learning]] strategies identify the most useful datapoints to label next.