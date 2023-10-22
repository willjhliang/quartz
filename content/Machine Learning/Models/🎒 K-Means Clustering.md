# Theory
K-Means groups datapoints $x$ into distinct groups, called clusters. Each cluster is defined by its centroid $\mu$. We optimize the clusters using [[🎉 Expectation Maximization]] where we treat the cluster assignment as our hidden state $z$.

We implicitly minimize the loss function 
$$
J(\mu, r) = \sum_{i=1}^n \sum_{k=1}^K r_{ik} \Vert \mu_k - x_i\Vert_2^2
$$
where $r_{ik} = 1$ when $x_i$ belongs in cluster $k$; in other words, we minimize the distance between each point and the centroid of the cluster it belongs to. This can also be interpreted as reconstruction loss if we approximate points by their centroid.

> [!info]
> For a softer clustering, we can turn to [[📼 Gaussian Mixture Model]]s that model the probability of $x_i$ belonging to cluster $k$ rather than a simple $0$ or $1$.

E-step finds the best $r_{ik}$ for each point, assigning each point to its closest centroid. M-step finds the best $\mu_k$ for each cluster, recalculating the centroid to be the average of the cluster’s points.

# Model
K-Means tracks the $k$ centroids of the clusters; cluster assignment can be calculated for each point by finding its closest centroid.

# Training
Given training data $D$, pick $k$ centroids at random, usually points from $D$ that are spread out.

Alternate until convergence.
1. Assign each point to its nearest centroid.
2. Recalculate each centroid to be the mean of its assigned points.

# Prediction
Given point $x$, its cluster assignment is the centroid $\mu_k$ closest to $x$.