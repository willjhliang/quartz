There are three common [[♻️ Convolution]] kernels in [[👁️ Computer Vision]], all based on the [[👑 Gaussian]] distribution 
$$
p(x \vert \mu, \sigma^2) = \frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).
$$

1. Gaussian: gaussian fixed at the center, blurs image.
2. Derivative: derivative of gaussian, detects directional differences in image.
3. Laplacian: second derivative of gaussian, detects details in image (like sharpening).

![[20231212162510.png]]