Visual odometry is the problem of determining camera position and orientation from a video of the trajectory. One of the most popular pipelines is ORB-SLAM, pictured below.

![[20230423231024.png#invert|600]]

The structure combines both engineering and theoretical methods, both generally, visual odometry algorithms perform the following steps:
1. Process input images and extract features.
2. Construct optical flow field or correspondences.
3. Remove outliers (via [[🎲 RANSAC]]), then estimate camera motion from the optical flow.