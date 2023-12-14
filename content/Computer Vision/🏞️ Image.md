An image is a 2D projection of a scene, which can be derived using world and camera [[🗺️ Coordinate Systems]].

# Array Representation
On the most fundamental level, an image can be thought of as a 2D array. Each index in the array, analogous to a pixel, contains some information—generally red, green, and blue (RGB) channels.

# Waves Representation
Images can also be thought of as a composition of wave signals. If we have multiple waves of different direction and frequency overlaid on each other, we can construct an image.

![[20231212154559.png|400]]

Based on this decomposition, we can imagine images as a hierarchy of signals at different scales. Coarse patterns are low frequency, and fine details are high frequency.

More concretely, we can compress an image by encoding it via a codebook of discrete cosine functions. We first split an image into patches, and for each patch, we save the scalar coefficients of elements in the codebook such that the weighted sum of these elements reproduces our patch.
![[20231212170755.png]]