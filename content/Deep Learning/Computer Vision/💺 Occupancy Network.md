An occupancy network is a 3D reconstruction technique that models the [[🐰 Shape Representations#Implicit Fields#Occupancy Field]] conditioned on a specific input object representation $x \in \mathcal{X}$ (for example, an image or point cloud) that we want to reconstruct; formally, the network is 
$$
f_\theta: \mathbb{R}^3 \times \mathcal{X} \rightarrow [0, 1],
$$
 which assigns occupancy probabilities for each point.

In implementation, we treat $p$, our point, as the FCN network input, and use conditional batch normalization (embedding-predicted $\beta$ and $\gamma$) to condition on an encoding of the inputted data.

![[20230323115914.png#invert|400]]

The encoder is task specific; we use ResNet for images, [[🎾 PointNet]] for point clouds, and 3D CNN for voxels.

![[20230323120058.png#invert]]

# Optimization
To train our network, we randomly sample points $\{ p_1, \ldots, p_K \}$ in the 3D bounding volume of the desired object and minimize 
$$
\sum_{i=1}^K L(f_\theta(p_i, x), o_i)
$$
 where $o_i = o(p_i)$ is the ground truth occupancy and $L$ is the cross-entropy loss.

# Inference (MISE)
To provide a 3D reconstruction using a trained occupancy network, we require a series of refinement steps; this algorithm is called multiresolution isosurface extraction (MISE).
1. Discretize the volumetric space and evaluate $f_\theta(p, x) > \tau$ for all points $p$ on the grid; $\tau$ is some threshold, and all predictions above it indicate an occupied point.
2. Mark voxels as active if they have $\geq 2$ adjacent grid points with different occupancies. This gives us the surface of the mesh.
3. Divide active voxels into eight subvoxels and repeat from step one until the desired resolution.
4. Apply marching cubes to extract an isosurface.
5. Simplify the mesh using Fast-Quadric-Mesh-Simplification.
6. Refine the mesh using gradients from the occupancy network by minimizing 
$$
\sum_{i=1}^K (f_\theta(p_i, x) - \tau)^2 + \lambda \left\Vert \frac{\nabla_p f_\theta(p_i, x)}{\Vert \nabla_p f_\theta(p_i, x) \Vert} - n(p_i) \right\Vert^2
$$
 with respect to the mesh points $p_i$. $n(p_i)$ is the normal vector of our current mesh at $p_i$, and this step essentially "smoothens" our mesh.

# Convolutional Occupancy Network
Convolutional occupancy networks apply local information in occupancy prediction by using a more complex procedure than a simple FCN; rather than conditional on a global encoding of the input, we localize the features that are used in the occupancy network.

![[20230323120717.png#invert|500]]

We first use a plane or volume encoder to process the input point cloud and collect them in a quantized grid. These grids are then processed by a U-Net, and local features from the grid are inputted to the occupancy prediction. These local features are defined as follows:
1. For the single-plane encoding, use a bilinear sample from the projected position of the query point onto the grid.
2. For the multi-plane encoding, project the plane onto all three dimensional planes and aggregate the features via summation.
3. For the volume encoding, use trilinear interpolation for the voxel cell the query point lies in.