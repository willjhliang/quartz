# Theory
Unsupervised learning captures patterns in input data $x$; our model $f$ maps input $x$ to some form of structure.

> [!note]
> An alternative interpretation of the unsupervised objective is to find a low-dimensional projection of $x$ that captures most of the information but with less complexity. This compression implies some structure within the data.

# Clustering
One form of structuring is clusters, defined as groups of datapoints that are close together, with distance defined by some function $d$.
1. [[🎒 K-Means Clustering]] groups points into $k$ clusters so that each point belongs to exactly one cluster.
2. [[📼 Gaussian Mixture Model]] performs soft clustering, assigning each point a probability of belonging to each cluster.

# Dimensionality Reduction
Another type of structuring is dimensionality reduction, where we encode our feature space to into a lower-dimensional embedding space. [[🗜️ Principle Component Analysis]] finds embeddings that minimize distortion; these embeddings capture the most information from the original data.

# Disentanglement
Structure can also be thought of as "un-mixing" data to get back the original sources. [[🍝 Independent Component Analysis]] solves this problem by returning an output with maximum independence across its features.