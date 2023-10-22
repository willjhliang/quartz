# Chamfer Distance
Chamfer distance measures the distance between two point clouds as the squared distance between nearest-neighbor point correspondences. Formally, 
$$
d_{CD}(X, Y) = \sum_{x \in X} \min_{y \in Y} \Vert x - y \Vert_2^2 + \sum_{y \in Y}\min_{x \in X} \Vert x - y \Vert_2^2.
$$


# Hausdorff Distance
Hausdorff distance measures the distance between two sets (point clouds) as the maximum distance we need to travel from one set to another, 
$$
d_H (X, Y) = \max \left\{ \sup_{x \in X} d(x, Y), \sup_{y \in Y} d(X, y) \right\} \text{ where } d(a, B) = \inf_{b \in B} d(a, b).
$$


![[20230418124211.png#invert|200]]

## Unidirectional Hausdorff Distance (UHD)
In 3D shape completion, it's useful to measure the "faithfulness" of the outputted complete shape with a partial input point cloud. In this case, we only want to measure the Hausdorff distance in one direction—from partial to completed shape—which gives us UHD on input $X$ and output $Y$, 
$$
d_{UHD}(X, Y) = \sup_{x \in X} d(x, Y).
$$


# Total Mutual Difference (TMD)
TMD measures the measures diversity across multiple 3D shapes. This is commonly used in shape generation and is defined for $k$ shapes as 
$$
TMD = \sum_{i=1}^k \frac{1}{k-1} \sum_{j \neq i} d_{CD}(X^{(i)}, X^{(j)}),
$$
 the sum of average Chamfer distances from each of the $k$ shapes.