Marching cubes is an algorithm that converts an [[🐰 Shape Representations#Implicit Fields]] to a [[🐰 Shape Representations#Polygon Mesh]]; that is, we go from an implicit shape to an explicit one.

To do so, we need to query the implicit field (assumed here to be an occupancy field) at many points in space. Marching cubes does this by moving a cube (of 8 points) around the space to form a grid; within each cube cell of the grid, it evaluates the occupancy of its 8 corners and constructs a partial mesh based on which corners are within the object (pictured below).

![[20230424112917.png#invert|300]]

If we do this for each cell, we can connect the partial meshes together to recover the full shape. Though this is a discretized approximation of the continuous implicit representation, further improvements to this mesh can be made by either using a higher-resolution grid or via the methods below:
1. When constructing the partial mesh, accurately measure the point between an occupied corner and an un-occupied corner where the shape's surface is (rather than approximating it as the midpoint).
2. Use the gradient of the occupancy field to "push" the meshes outward toward the surface.