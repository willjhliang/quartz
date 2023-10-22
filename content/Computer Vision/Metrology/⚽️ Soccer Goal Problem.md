# Problem
Given two images of a soccer ball $B$ and homography $H$ between the two image planes, check whether the ball is inside the goal (past the goal line).

# Solution
The first crucial insight is that to check whether the soccer ball (in midair) is behind or in front of the goal plane, we can find the ball's projection onto the ground plane $P$ (the point right below the ball) and compare it with the goal line.

Then, our scene is the following:

![[20230227094550.png#invert|500]]

Let $B$ be the ball, $b$ and $b'$ be its projections, $v$ and $v'$ be vertical vanishing points. Note that the vanishing points in the image are heavily abstract and are likely off the image or at infinity in an empirical setting.

The lines $l$ and $l'$ are the projection of $L$ onto the image planes. If we imagine $l$ and $l'$ casting rays onto $L$ in the world, we create two "shadows," $L_s$ and $L_s'$. The key insight is that the intersection of these shadows gives us the point $P$ on the ground plane that's directly underneath the ball; with $P$, we can compare it with the goal line to see what side it's on.

We can compute all this on a single image plane; let's choose the one on the right. We know that the shadow $L_s'$ is projected onto $l'$, and we want to find the projection of $L_s$, which we'll call $l_s$, onto the right image plane.

However, we also have the homography $H$, and we know $L_s$ is projected onto $l$ in the left image plane. Thus, to project $l$ onto the right image plane, we have 
$$
l_s \sim H^{-\top}l.
$$
 Then, the projection of $p$ onto the right image plane is the intersection of the projection of the two shadows, 
$$
p \sim H^{-\top}l \times l'
$$


With $p$, we can compare it with the goal line in the right image plane to check which side the ball is on.