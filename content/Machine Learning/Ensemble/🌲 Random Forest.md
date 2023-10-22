# Theory
Random forests create multiple slightly-inaccurate models so that together, their inaccuracies cancel out and we’re left with a good prediction. Therefore, each tree in our forest is limited by the data it accesses and features it splits on.

# Model
Our forest consists of $K$ decision trees, each with unique splits.

We maintain the hyperparameters $f$, the fraction of the training data to use for each tree, and $m$, the number of features a tree node can choose to split on, which is commonly set to $\sqrt{p}$.

# Training
Given training data $D$, repeat the following $K$ times to build $K$ trees.
1. Choose a fraction $f$ of the data, $fn$ data points total (with replacement).
2. Build a decision tree as normal, but at every node, we only have $m$ features to choose from (among the $p$ available).

# Prediction
Given input $x$, run $x$ through every tree in the forest. Return the majority vote for classification or average for regression.