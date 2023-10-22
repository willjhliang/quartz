PointNet++ is an extension of [[🎾 PointNet]] that incorporates local information as well as the global features in the original PointNet.

To incorporate local information, we take inspiration from pure [[👁️ Convolutional Neural Network]]s: each convolution essentially operates on a receptive field of the input, with earlier layers being more local and later layers being more global. Following this idea, we can design a hierarchical model constructed from multiple set abstraction levels, each of which takes in a point set and produces a set with fewer points.

A set abstraction level has three main components:
1. Sampling layer: choose a subset of the input via farthest point sampling and set them as centroids.
2. Grouping layer: group input points based on proximity to each centroid.
3. PointNet layer: run each group through a PointNet and assign the global features to the centroid. The set of centroids with these new features is our output.

![[20230401171827.png#invert|600]]

For more robust feature learning across inputs of different point densities, PointNet++ also introduces two methods for density-adaptive PointNet layers for the third component of set abstraction:
1. Multi-scale grouping: for each centroid, find multiple groups of varying scales and run each scale through a PointNet, concatenating the results together.
2. Multi-resolution grouping: output the concatenated features of a standard set abstraction and the global features of a PointNet run directly on the original input.

![[20230401172612.png#invert|200]]

The latter is preferred since it avoids computing multiple PointNets for each group scale, which is extremely expensive. Intuitively, when the local density is low, the latter global features are more important, and when local density is high, the former provides more fine details.

Finally, in problems where per-point features are desired (segmentation, for example), we can "upsample" the set abstraction layers' output via feature propagation: interpolate feature values for the global layer for points in the previous layer, then repeat. This passes the final features back to the original input points, allowing us to process them via a unit PointNet to get scores.