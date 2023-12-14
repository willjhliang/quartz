The convolution of two functions $f$ and $g$ is a function $f * g$ that applies the domains of $f$ and $g$ onto each over through multiplication. Formally, 
$$
(f * g)(t) = \int_{-\infty}^\infty f(\tau) g(t - \tau)d\tau.
$$


Intuitively, this is a fancy multiplication operation on two functions that flips the domain of $g$ (thereby making $g(\tau) \rightarrow g(-\tau)$) and offsetting it by $t$.

In computer vision, convolutions are generally applied in 2D over [[🏞️ Image]]s. If we let $f$ be our convolution kernel and $I$ be our image, the convolution operation computes a new image $I'$ where the value at a single pixel is 
$$
I'[m,n] = \sum_{k, l} I(m-k, n-l) * f(k, l).
$$


By flipping the kernel, convolutions are associative, commutative, and distributive. They also preserve linear independence, $I \otimes (c_1f_1 + c_2f_2) = c_1 (I \otimes f_1) + c_2 (I \otimes f_2)$.

# Impulse Function
The impulse function is a 2D array where one index is $1$ and others are $0$. Convolutions with impulse functions reveal some nice properties:
1. For an impulse function $I$ with $1$ in the middle, $I \otimes f = f$.
2. For impulse functions $f$ with $1$ in a certain direction, $I \otimes f$ shifts $I$ towards that direction.

# Padding
If we apply an $n \times n$ filter with $n > 1$ only on pixels in our image, our result will have smaller dimensions. To preserve the same size—or even potentially expand the size—we can use padding: we add a border around our original image, thus enlarging it before applying the kernel.

There are three common padding methods: full maximizes the dimensions, same preserves the same dimensions, and valid shrinks dimensions (and uses no padding).
![[20231212161917.png|500]]

# Filtering
A very similar idea is filtering, which performs the same operation as a convolution *without* flipping $g$. Thus, we can think of it as computing a weighted sum of values in $f$ using $g$ as the weights.

Note that in [[👁️ Convolutional Neural Network]]s and most machine learning systems, we actually use learned filters instead of convolutions. The reason is that since the values are learned anyways, there's no difference between flipping $g$.