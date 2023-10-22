A manifold is a connected region in high-dimensional space; from any given point on the manifold, the local neighborhood appears to be a Euclidean space. To move around the manifold, we use fewer dimensions than if we moved around anywhere in the high-dimensional space.

![[20230219160510.png#invert|400]]

The manifold hypothesis states that data is concentrated in low-dimensional manifolds. Most of $\mathbb{R}^n$ consists of invalid examples, and valid samples lie along the manifold such that we can find variations by moving along directions on the manifold rather than in the whole $n$-dimensional space.

# Observations
The first observation for why this is true is that the probability distribution of images, text, and sounds in real life is highly concentrated. Uniform noise is never structured like the inputs we expect; illustrated below are four completely-random images sampled from the high-dimensional image space.

![[20230219160904.png#invert|500]]

Thus, most places in $\mathbb{R}^n$ don't occur in our data distribution.

The second observation is that if we slightly modify an image (like below), we get back another valid image. Thus, the neighborhood of the image is also valid, and we hypothesize that it's set on the manifold.

![[20230219161206.png#invert|500]]