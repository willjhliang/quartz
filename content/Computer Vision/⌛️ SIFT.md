SIFT (scale-invariant feature transform) is a feature extraction algorithm that produces feature points and orientations. It satisfies three desirable properties:
1. Repeatability: same point is repeatedly detected across small changes in viewpoint.
2. Discriminatively: detected points are unique.
3. Orientation aware: detected points are robust to orientation, which might change across viewpoints.

To find feature points, we compute the laplacian layers from the [[🔺 Image Pyramid]] and look for extreme locations. For each detected point, we describe it via its surrounding image patch rotated to an invariant orientation; we divide this patch into a $4 \times 4$ grid, and within each cell, we compute a histogram of discretized gradients of its pixels.