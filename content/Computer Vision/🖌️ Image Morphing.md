Image morphing finds the "average" between two objects. We're not simply averaging the the two object images; rather, we're also warping them to fit the same shape.

# Cross Dissolve
First, to blend the colors together, we can cross dissolve the images. This takes an average over the two images over a time interval $t \in [0, 1]$, 
$$
I' = (1-t)I_1 + tI_2.
$$


# Warping
However, cross dissolving is not enough if parts of the images are not spatially aligned. To spatially manipulate the images, we need some external information on what corresponds with what. Specifically, we have a human label point correspondences—for example, where eyes are in each image.

![[20231212232804.png]]

## Delaunay Triangulation
Given these points, we'll construct a triangular mesh over the image using Delaunay triangulation: we construct a Voronoi diagram that splits the image into per-point cells where each pixel is assigned to the cell of the closest point; we then connect any two points that share a cell edge. This is guaranteed to give us the "best" possible triangulation, avoiding oddly shaped or skinny triangles.

To make sure our triangles are consistent across the two images, we compute an "average" image by interpolating each point correspondence and perform triangulation on this. We can then use the same triangulation for both images, thereby giving us triangle correspondences.

## Affine Transformation with Barycentric Coordinates
Now, we need to transform these triangles according to $t \in [0, 1]$. We can interpolate the points via $(1-t)p + tq$, thereby giving the triangle locations. To warp the pixels within each triangle, we calculate each pixel's Barycentric coordinates, which are relative to the three points of the triangle; thus, the pixel will move along with the triangle vertices during our transformation.

Given vertices $A, B, C$, we write Barycentric coordinates as 
$$
x = \alpha A + \beta B + \gamma C \text{ such that } \alpha + \beta + \gamma = 1.
$$


In other words, $x$ is a weighted combination of the three vertices.

![[20231212235540.png#invert|500]]

Rewriting the equation above, we can view $\beta$ and $\gamma$ as our movement, starting from $A$, along the vectors $B - A$ and $C - A$: 
$$
x = A + \beta (B - A) + \gamma (C - A) \text{ and } \alpha = 1 - \beta - \gamma.
$$
 Another interpretation is that $\alpha$ is the (inverse) distance to $A$ along the direction perpendicular to its opposing edge $BC$ (and similarly for $\beta$ and $\gamma$).

To solve for $\alpha, \beta, \gamma$, we can solve a linear equation using known $A, B, C$ and $x = (x, y)$, 
$$
\begin{bmatrix}A_x & B_x & C_x \\ A_y & B_y & C_y \\ 1 & 1 & 1\end{bmatrix}\begin{bmatrix}\alpha \\ \beta \\ \gamma\end{bmatrix} = \begin{bmatrix}x \\ y \\ 1\end{bmatrix}.
$$


Now, when we move our triangle's $A, B, C$, we keep $\alpha, \beta, \gamma$ constant and can use the same equation to calculate new $(x, y)$ positions for our pixel.

One important detail is that with forward warping, there might be parts of our resulting triangle that aren't warped onto, thereby creating holes. Instead, we should perform backward warping for each pixel in our target image, then get the color via interpolation within the source image.