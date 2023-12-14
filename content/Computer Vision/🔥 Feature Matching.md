One common problem in computer vision is to "match" two images by finding corresponding points between them. To do this, we first extract feature points from the image, usually with [[⌛️ SIFT]], and then match them to find correspondences.

SIFT provides us with key points where each point contains a feature—a $4 \times 4$ grid of histograms that describe the local area around the point. We use these descriptors to match points across pictures; ideally, the histograms should be similar for correct correspondences.

![[20231212193559.png]]

Now, given points and descriptors across two images, we want to find matches between them. We go through each point in one image and compute the following:
1. Look through all points in the other image, rank them by feature similarity. Let the distances be $d_1, d_2, \ldots$ where $d_1$ is the most similar (smallest distance).
2. Check the uniqueness of the most similar feature by checking $d_1 / d_2 < 0.7$: if this is true, then $d_1$ is much better than $d_2$ and will likely be correct.

We then repeat this computation in the reverse direction. Our final matches are those that were found in both directions, satisfying bi-directional consistency.

One direct application of these correspondences is calculating the [[🖼️ Homography]] between these two pictures, allowing us to blend them together.