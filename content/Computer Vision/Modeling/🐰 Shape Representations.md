3D shapes and surfaces can be represented in a variety of ways, each with own advantages and functions.

# Point Cloud
The most basic way is a set of points; plotting them together gives us a point cloud, which isn't a complete shape but gives a general notion of what the shape looks like. Point clouds are typically outputted by real-world sensors and can be further processed into meshes.

# Polygon Mesh
A polygon mesh is a collection of vertices, edges, and faces that define the object. The faces are triangles defined by 3 vertices and 3 edges; though simple, they can model complex objects at high resolution. Meshes are commonly used for 3D modeling and graphics.

# Voxel Grid
The voxel grid is a direct successor to the pixel grid (in standard images) to 3D space. We maintain a 3D matrix that discretizes the volumetric space, and each cell is either $0$ or $1$ depending on whether the shape occupies it or not.

# Implicit Field
The above methods all explicitly represent the shape; that is, we can directly get the shape from the representation. However, their expressiveness is limited: point clouds aren't complete shapes, and both meshes and voxel grids are discretized versions of the actual object.

A more appealing alternative are implicit fields, which implicitly model the shape by parameterizing some other value. The shape can then be "extracted" from the field via [[🧊 Marching Cubes]], but in the implicit form, we can achieve a continuous (and thus infinite) resolution.

## Occupancy Field
The occupancy field is a function that maps a 3D point to its occupancy—whether the point is in the object, $0$ or $1$ for "in object" or "free space" respectively. That is, the occupancy field is defined as 
$$
o: \mathbb{R}^3 \rightarrow \{ 0, 1 \}.
$$


![[20230424110137.png#invert|100]]

## Signed Distance Field (SDF)
The signed distance field (SDF) encodes a bit more information than the occupancy field; rather than just $0$ or $1$, the SDF is a function mapping the point to the distance from the point to the object's surface (with positive being outside and negative being inside the object). That is, our function is 
$$
d: \mathbb{R}^3 \rightarrow \mathbb{R}.
$$


![[20230424110253.png#invert|100]]