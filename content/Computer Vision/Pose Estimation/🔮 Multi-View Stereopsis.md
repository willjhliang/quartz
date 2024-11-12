---
---
Multi-view stereopsis generalizes [[🍿 Two-View Stereopsis]] to $N$ views; given these images and their relative $R$ and $T$, our goal is to reconstruct the 3D world model. The goal is to check correspondences and infer occupancies and colors.

There are a multitude of approaches to this problem. A few of the more common ones are below.

# Depth Map Fusion
The most straightforward approach is to simply fuse the two-view stereopsis depth maps together. That is, for each pair of the $N$ views, we can generate the depth map by computing disparities; then, we can project them all into world coordinates and merge them together, giving us a more complete model.

# Plane Sweep Stereo
Plane-sweep stereo constructs a robust depth map for a single view by scanning the world plane-by-plane. That is, we pick a view as the reference, then sweep a parallel plane across the optical axis; for each plane $Y_w = s$, we can compute [[🖼️ Homography]]s from the views onto this plane; the depth for each pixel in the reference is the $s$ value for the plane where the pixel's patches are most similar.

![[20230423203956.png#invert|400]]

# Space Carving
Space carving builds a 3D world model by iteratively "carving" a voxel grid. That is, we start out with a full grid. Then, we choose a voxel, project it onto the views, and remove it if it's not photo-consistent.

# Visual Hull
The visual hull follows a similar idea to space carving but in the reverse direction: for each view, we segment out the object and then project it into 3D space. The final shape is the intersection of the back-propagated volumes.

![[20230423204643.png#invert|300]]

# Surface Expansion
Surface expansion revisits the feature matching idea from two-view stereopsis but adds robustness by changing our strategy for selecting matches. We first start out with a sparse set of confident matches, then "expand" them to nearby locations, iteratively growing our matches from the most confident locations toward nearby semi-confident ones.