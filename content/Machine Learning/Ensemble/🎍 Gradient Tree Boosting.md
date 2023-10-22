# Theory
Gradient tree boosting builds an ensemble of trees (instead of stumps as in [[🔥 Adaboost]]) of a specified depth, each with a different scaling coefficient and trained on a fraction of the dataset.

The general idea is very similar to a [[🌲 Random Forest]], but boosting introduces two different ideas.
1. Fit each new tree on the residual instead of the original data.
2. Regress to find the scaling coefficient and add it to the model scaled by learning rate.

We can train the algorithm on any loss function; the residual we fit on is the gradient of this loss. For simplicity, we'll use $L_2$ regression loss, and we move down the gradient every time we add a tree, thereby decreasing loss with each new addition to the model.

# Model
Our model consists of trees $h_t(x)$ with scaling coefficient $\alpha_t$. In other words, our model is $$h(x) = \sum_{t=1}^\top \alpha_th_t(x) + C$$where $C$ a constant term (generally used for regression) that's equivalent to $h_0(x) = C$.

The $T$ trees are limited to depth $d$, and each are trained on fraction $f$ of the data. $\eta$ is also used as a learning rate when we add new trees.

# Training
Given training data $D$, let $C$ be the average $y$ value.

Then, for $T$ iterations,
1. Pick a subset of the data of size $fn$.
2. Calculate the residual of this subset $r_t = y - h(x)$.
3. Fit a decision tree $h_t(x)$ on the residual.
4. Regress $r_t = \alpha_th_t(x)$ for $\alpha_t$.
5. Update our model $h(x) = h(x) + \eta \alpha_t h_t(x)$ using the learning rate.

# Prediction
Similar to Adaboost, given input $x$, calculate $h_t(x)$ for all $t = 1\ldots T$ and return $$\sum_{t=1}^\top \alpha_th_t(x) + C$$