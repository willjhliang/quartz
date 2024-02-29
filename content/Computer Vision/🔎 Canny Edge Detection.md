Canny edge detection is an algorithm for finding edges in an image, like below.
![[20231212163239.png|500]]

The method consists of five steps:
1. Convolve image with derive of gaussian (see [[🍿 Gaussian Kernels]]), 
$$
I_x = I \otimes \left(\frac{\partial}{\partial x} \otimes G\right),\ I_y = I \otimes \left(\frac{\partial}{\partial y} \otimes G\right)
$$

2. Compute magnitude of gradient, $I_m = \sqrt{I_x^2 + I_y^2}$.
The above operations give us a rough idea of where edges are, but the detection is too soft and imprecise. To address this, we process $I_m$ to find the pixels with the "maximum" edge (non-maximum suppression):
1. Compute edge orientation, $\theta = \text{atan2}(I_y, I_x).$
2. For each pixel, mark it as edge only if its gradient is greater than or equal to its two neighbors along the $\theta$ direction. The idea behind this is to extract the most significant area of the soft edges from $I_m$ (see image below).
3. Filter the result with high (strong) and low (weak) thresholds on the gradient magnitude. Starting from strong edges, continue them with connected weak edges (Hysteresis).

![[20231212164025.png|300]]

