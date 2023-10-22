Single-view metrology deals with measuring lengths in the real world using images. If we have a [[📽️ Projective Geometry#Projective Transformation]] from world to image plane, we can directly translate pixels to world coordinates. However, we can also use geometry.

# Cross Ratio
Note that ratios aren't preserved by projections, as demonstrated in the figure below.

![[20230220101455.png#invert|300]]

However, cross ratios, defined as $$CR(A, B, C, D) = \frac{AC}{AD} : \frac{BC}{BD},$$ are preserved. Thus, in the diagram below, $$CR(A, B, C, D) = CR(A', B', C', D').$$

![[20230220101536.png#invert|300]]

Furthermore, if a point $D$ is at infinity, we have $$CR(A, B, C, D) = \frac{AC}{BC}.$$

# Transferring Measurements
In an image, we can compute all lengths between points. If we're given some measurements in the world, we can solve the cross ratios equality above for a single variable to compute all measurements in the world.

Conversely, an interesting application of the cross ratio is using measurements from the world to find the vanishing point's projection in the image. This is an alternative method for finding vanishing points that doesn't require parallel lines.