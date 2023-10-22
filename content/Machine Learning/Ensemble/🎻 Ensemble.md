# Theory
Ensembles exploit the "wisdom of the crowd." Rather than training a single model, it trains multiple models, termed learners.

Mainly used for classification, the prediction is then the class that the majority of the models predicted; in other words, we output the majority vote.

Ensembles consists of two main categories: bagging (short for bootstrap aggregation) and boosting. Both are strategies to reduce the bias and variance, which is equivalent to reducing the error.
1. Bagging trains weak learners in parallel. Each learner is trained with bootstrapping; each learns from a subset of the data via random sampling with replacement. By combining multiple learners, the ensemble also reduces variance.
2. Boosting trains weak learners one after another, training the next learner to specifically focus on the error. Each weak learner has low variance, and by focusing on the datapoints the previous learners got wrong, the entire ensemble reduces bias.

While the learners can be any classification model, ensembles commonly use [[💭 Decision Tree]]s since a combination of trees forms a more complex decision boundary whereas other models may collapse together.
1. Bagging is most commonly implemented as [[🌲 Random Forest]]s.
2. Boosting can be done with [[🔥 Adaboost]] or [[🎍 Gradient Tree Boosting]]; the methods differ in the strategy used to focus on past error.