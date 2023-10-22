Distance transfer is concerned with measuring lengths in the world using a reference measurement and an image. That is, given an image and a world measurement of a line in the image, our goal is to find the world length of another line.

First, we need to find the horizon. This can be done either with orthogonal parallel lines, assuming horizontal horizon and finding one vanishing point, or using [[📏 Single-View Metrology#Cross Ratio]]s.

![[20230220102726.png#invert|400]]

Then, we connect one end of the lines together $MS$ and find their intersection with the horizon. This gives us a vanishing point $A$.

Connecting $A$ with the top of the known line $T$ and shooting it to the unknown line, we intersect at $B$. Note that $SA$ and $TA$ are parallel in the world. Thus, $MB$ is the same length as $ST$ in the world.

Then, let $V$ be the vertical vanishing point. We can now apply cross ratios, $$\lambda = CR(M, B, H, V).$$ In the world, with $V$ at infinity, we have $$\lambda = \frac{M_w H_w}{B_w H_w} = \frac{M_w H_w}{M_w H_w - T_wS_w}.$$ We can measure $\lambda$ with the image, and we're given $T_wS_w$. Thus, we can solve for $M_wH_w$ to get the length of the unknown line in the world.