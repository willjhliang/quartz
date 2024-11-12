---
---
Geometric perception analyzes images using geometry and linear algebra.

[[📷 Camera Models]], specifically the pinhole model, allow us to project points in the 3D world to an image. To relate pixels on these images and points in the world, we use [[📽️ Projective Geometry]] across the image, camera, and world [[🗺️ Coordinate Systems]].

Within this framework, there are two key ideas used in multiple algorithms:
1. [[🖼️ Homography]] relates two planes with a linear transformation.
2. [[🌞 Horizon]] connects vanishing points and gives us the line of points at infinity.

With this formulation, we can tackle a variety of geometric problems concerning the image and world. Two common ones are pose estimation and visual metrology.

# Pose Estimation
Pose estimation finds the rotation and translation of the camera coordinate system with respect to the world. In other words, our goal is to figure out the orientation of the camera using some combination of 2D or 3D images and sparse correspondences between them.
1. [[👟 Structure From Motion]] uses [[📍 Epipolar Geometry]] with 2D-2D correspondences.
2. [[📏 Perspective-N-Point]] applies trigonometry for 2D-3D correspondences.
3. [[⚰️ Procrustes]] solves the optimization problem for 3D-3D correspondences.

Across these three problems, we have a few special cases:
1. [[🔖 Coplanar PNP]] tackles 2D-3D correspondence when the 3D points lie on the same plane.
2. [[🏞️ Panorama Projection]] "reverses" the pose estimation problem; given a pure rotation, we can associate points across images.

If we have dense correspondences—finding correspondences between views for each pixel, we can not only estimate pose but also depth.
1. [[🍿 Two-View Stereopsis]] measures the disparity (inverse depth) between image patches.
2. [[🔮 Multi-View Stereopsis]] constructs a 3D model using multiple views.

Moreover, for videos, [[💦 Optical Flow]] measures the continuous change in camera pose over time. In the real world, [[🧭 Visual Odometry]] systems package optical flow with advanced tracking and memory systems for robust location estimation.

# Metrology
Metrology deals with measuring distances in the world using some known information along with images.
1. [[📏 Single-View Metrology]] uses cross ratios to relate lengths across projections.
2. [[📐 Two-View Metrology]] relate multiple views via a world plane.

With these methods, we can perform [[♻️ Distance Transfer]]: inferring real-world distance using some measurements and pictures relating the reference and target. Another tangentially-related landmark problem is the [[⚽️ Soccer Goal Problem]], which finds the location of a soccer ball through multiple views.