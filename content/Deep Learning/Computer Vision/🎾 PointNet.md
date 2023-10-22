PointNet is an architecture that operates on unordered sets of points; its key design is permutation invariance—changing the ordering of the input doesn't affect the output. Moreover, additional transform modules also account for geometric transformations.

![[20230323084600.png#invert]]

The main backbone of the network (in blue) takes $n$ points of $(x, y, z)$ coordinates. The main idea is a shared MLP that individually computes features for each point. After developing $1024$ features per point, we take a global max pooling for each feature map—effectively taking the largest feature value for each of the $1024$ features. This max pooling is permutation invariant since the global max for each feature map doesn't change with reordering; formally, our operations are equivalent to approximating a general set function $f$ with a symmetric $g$ and transformed points $h(x)$, 
$$
f(\{x_1, \ldots, x_n\}) \approx g(h(x_1), \ldots, h(x_n)).
$$


For classification, we can pass the global features to a final MLP that computes class probabilities. For semantic segmentation, we need to incorporate local per-point feature information as well (in yellow), so we concatenate the global features to point features and process it with more per-point MLPs that consider both global and local information.

The input transform at the start is a smaller network that generates a $3 \times 3$ transformation matrix that's applied to every point. The feature transform similarly produces a $64 \times 64$ transform that's close to orthonormal.

# Key Points
One property of the max pool is robustness. For a max pooling layer of dimension $K$ (called the bottleneck dimension), there exists a critical point set $C_S \subseteq S$ with $\vert C_S \vert \leq K$ that defines the output of our function; that is, 
$$
f(T) = f(S) \text{ for } C_s \subseteq T.
$$


The network is similarly robust to some level of input noise where adding additional points outside of the critical set doesn't affect the output.

We can visualize the critical points below; the first row is our input, second is the critical set, and third is the largest possible input that results in the same input.

![[20230323091355.png#invert|400]]