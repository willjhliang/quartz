The convolution of two functions $f$ and $g$ is a function $f * g$ that applies the domains of $f$ and $g$ onto each over through multiplication. Formally, 
$$
(f * g)(t) = \int_{-\infty}^\infty f(\tau) g(t - \tau)d\tau.
$$


Intuitively, this is a fancy multiplication operation on two functions that flips the domain of $g$ (thereby making $g(\tau) \rightarrow g(-\tau)$) and offsetting it by $t$.

In machine learning, convolutions are used in [[👁️ Convolutional Neural Network]]s. However, note that the machine learning definition for convolution doesn't flip $g$ (so it's really more like a mathematical correlation instead).