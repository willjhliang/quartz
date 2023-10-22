Two-view stereopsis is the problem of finding per-pixel depth given two camera views and their relative pose ($R$ and $T$). To do so, we need to match features across the two views and triangulate its position relative to the camera.

# Disparity
First, consider a basic setup where the cameras are facing the same direction and are related by a horizontal translation. That is, $R = I$ and $T = \begin{pmatrix}b & 0 & 0\end{pmatrix}$. In this configuration, for a point in the world, $Z_L = Z_R = Z$ and $v_L = v_R$, and the only difference between the two photos is the x-coordinate of the pixel of a feature in the world. Using the [[📷 Camera Models#Pinhole Model]] equation, we have 
$$
u_L = f\frac{X_L}{Z},\ u_R = f\frac{X_R}{Z},
$$
 and the difference, called the disparity, is 
$$
d = u_L - u_R = f\frac{X_L}{Z} - f\frac{X_R}{Z} = f\frac{X_L}{Z} - f\frac{X_L - b}{Z} = f\frac{b}{Z}.
$$
 Intuitively, this says that the farther the object is from the camera (higher $Z$), the less disparity there will be in the two views. That is, close objects will be shifted more than farther objects, and we can use this equation to find $Z$ if we first compute $d$.

# Stereo Rectification
Before we continue to finding $d$, we first note that any camera configuration can be "modified" to satisfy the setup above with $R = I$ and $T = \begin{pmatrix}b & 0 & 0\end{pmatrix}$. Given any two views, if we project the image onto the plane parallel to the line between camera centers, we'll get exactly this setup; this is the problem of stereo rectification.

Another way to view this transformation is to make the [[📍 Epipolar Geometry#Epipolar Line]]s parallel; if this is done, then the epipoles are at infinity, thus making the image planes parallel.

![[20230423194555.png#invert|300]]
![[20230423194602.png#invert|300]]

Formally, our transformation will be a rotation $R_{rect}$, and we desire such a rotation so that for an epipole $e$, 
$$
R_{rect}e = \begin{pmatrix}1 \\ 0 \\ 0\end{pmatrix}.
$$
 The matrix that satisfies this constraint has its first row be exactly $e$, then the other rows be orthogonal; that is, we have 
$$
R_{rect} = \begin{pmatrix}r_1^\top \\ r_2^\top \\ r_3^\top \end{pmatrix}
$$
 such that 
$$
r_1 = e,\ r_2 = e \times \begin{pmatrix}0 \\ 0 \\ 1\end{pmatrix},\ r_3 = r_1 \times r_2.
$$


Thus, the steps of stereo rectification can be summarized as follows:
1. Estimate the [[👟 Structure From Motion#Essential Matrix]] $E$.
2. Compute the epipole $e$ by solving $Ee = 0$.
3. Build $R_{rect}$ using the procedure above and also compute $R$ and $T$ from $E$.
4. Let $R_1 = R_{rect}$ and $R_2 = RR_{rect}$.
5. Transform the left camera with $H_L = KR_1$ and the right camera with $H_R = KR_2$.

# Finding Correspondences
Now, we will estimate $d$. This is done by matching "windows" or image "patches" across the two views; patches with the highest similarity are deemed two views of the same point in the world, and disparity is calculated as the difference between patch centers.

![[20230423194529.png#invert|400]]

More specifically, for each patch in the left image, we'll scan along the same $v$ coordinate in the right image to find the best patch (as measured by an similarity function, examples below). Then, for the corresponding patch in the right image, we'll scan along the left image with the same procedure. If both sides output each other—left is most similar to right and vice versa—then we found a correspondence, and their disparity and depth can be computed.

There are multiple choices of similarity functions. For windows $W_1$ and $W_2$, some examples are below:
1. Sum of squared differences (SSD): 
$$
\sum_{x, y} (W_1(x, y) - W_2(x, y))^2
$$

2. Sum of absolute differences (SAD): 
$$
\sum_{x, y} \vert W_1(x, y) - W_2(x, y) \vert
$$

3. Zero-mean normalized cross correlation (ZNCC): 
$$
\frac{\sum_{x, y}(W_1(x, y) - \overline{W_1})(W_2(x, y) - \overline{W_2})}{\sigma_{W_1} \sigma_{W_2}}
$$
 where $\overline{W_i} = \frac{1}{n}\sum_{x, y}W_i(x, y)$ and $\sigma_i = \sqrt{\frac{1}{n} \sum_{x, y}(W_i(x, y) - \overline{W_i})^2}$.

# Photoconsistency
Note that this stereopsis technique relies on two major assumptions:
1. There are few occlusions within the scene. Most features in the world are captured in both views.
2. The world's surfaces is Lambertian; that is, it reflects the same color into both views (unlike mirrors or shiny surfaces).