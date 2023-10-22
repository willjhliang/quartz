Epipolar geometry describes the relationship between two cameras in stereo vision (like the arrangement below).

![[20230423104143.png#invert|300]]

# Epipolar Constraint
In this setup, the green triangle forms a plane called the epipolar plane. Let $p$ and $q$ be the calibrated coordinates of $x$ in the left and right camera coordinate systems respectively. If $R$ and $T$ are the rotation and translation from the left camera to the right, the sides of the triangle are scaled versions of $Rp$, $q$, and $T$ (left, right, bottom sides).

Since these three vectors lie on the same plane, we get the epipolar constraint $$q^\top (T \times Rp) = 0.$$ Geometrically, this says that the vector orthogonal to $T$ and $Rp$ (the cross product) is orthogonal to $q$ (via the dot product evaluating to zero).

# Epipolar Line
The intersection of the epipolar plane with the image plane gives us the epipolar line. To find the equation of this line, we can rearrange the epipolar constraint for each view.

For the left image, we have $$(Rp)^\top (q \times T) = p^\top (R^\top q \times R^\top T) = p^\top \ell_p = 0$$ where the left epipolar line is $$\ell_p = R^\top q \times R^\top T.$$

For the right image, we have $$q^\top (T \times Rp) = q^\top \ell_q = 0$$ where the right epipolar line is $$\ell_q = T \times Rp.$$

# Epipole
The intersection of all epipolar lines (from multiple $p, q$ correspondences) in an image plane is called the epipole. The epipole is also the projected location of one camera center onto the other's camera plane.

Geometrically, varying $p$ and $q$ shifts the left and right sides of the triangle, but the bottom (defined by $T$) is kept constant. Thus, we can see that the epipole must lie on the bottom side for each image plane; that is, our epipoles $$e_p \sim -R^\top T,\ e_q \sim T.$$