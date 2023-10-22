Vision-Robot Bridge (VRB) integrates vision with robotics by learning affordances—specifically contact points $c$ and post-contact trajectories $\tau$—from human egocentric videos.

![[20230625102627.png#invert|700]]

To extract this information from the video dataset, we perform the following steps:
1. For each frame, use a hand-object detector to get bounding boxes and a discrete contact variable; find the first timestep where contact occurs.
2. Compute a hand segmentation and compute all points where the hand intersects the object's bounding box. Fit a GMM ($\mu$ and $\Sigma$) on these contact points.
	1. Note that due to camera motion, these points are projected back into the coordinate space of the initial frame by computing homographies.
	2. To avoid domain shift from human to robot hands, the contact points and post-contact trajectories are paired with the initial frames without human hands.
3. Track the change of the hand's bounding box as our post-contact trajectory.
4. Train a predictive model to take in an image frame and output this GMM. This predictive model first runs the image through a backbone (ResNet), then uses $K$ deconvolutional heads to model the multi-modal distribution of contact point heatmaps. The trajectory predictor, implemented as a Transformer, takes the backbone's output and predicts relative shifts.

The trained model $f_\theta$ can be used in a variety of reinforcement learning tasks:
1. Imitation learning: rather than collecting human demonstrations, we can use $f_\theta$ to guide the robot and create interesting trajectories. These can then be filtered and used with BC to train a policy.
2. Reward-free exploration: use $f_\theta$ to bootstrap exploration; learn a distribution $h$ of the top trajectories, and then either sample from $h$ or use $f$.
3. Goal-conditioned learning: fit $h$ to top trajectories, then learn from them to minimize distance with goal image.