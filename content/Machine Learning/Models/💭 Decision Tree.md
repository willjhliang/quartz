# Theory
Certain features in $x$ are indicative of what $y$ can be; given training data $D$, we can divide up all $x$ into groups based on their features such that each group has different $y$.

Decision trees use this idea to recursively divide up the data in $D$, building a binary tree where each node is a “yes-no” question, and depending on the answer, we go to a different subtree; each leaf gives a prediction for the value of $y$. This structure is analogous to a [[🌳 Binary Search Tree]] but with questions at the nodes rather than value comparisons.

To maximize the effectiveness of our questions, we want to split up the data that gets to a node using a question about a feature that most determines $y$. To do this, we maximize [[💰 Information Gain]].

# Model
Our model is a binary tree: each internal node is a question, each edge is an answer, and leaves are predictions for $y$.

For discrete features, we can directly check the value in $x$. For continuous features, we must impose a threshold $\alpha$ on the value in $x$ to get a binary answer; in other words, replace feature $x_i$ with $x_i’ = \mathbf{1}(x_i > \alpha)$.

> [!note]
> Note that with this threshold method, binary trees are scale invariant. If the scale of a feature increases, the best threshold will increase in scale equivalently. Therefore, the new decision tree after rescaling a feature will be the same.

# Training
Given training data $D$,
1. If all current records have the same label $y$, return a leaf with label $y$.
2. If all current records have the same inputs $x$, return a leaf with majority decision $y$.
3. Otherwise, split $D$ on the feature that has most information gain and recurse on both sides.

# Prediction
Given input $x$, walk down the decision tree according to the questions at each node and return the associated $y$ at the leaf we reach.