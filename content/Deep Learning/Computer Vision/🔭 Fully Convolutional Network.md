Fully convolutional networks (FCNs) are simply [[👁️ Convolutional Neural Network]]s without flattening or fully connected layers. Our output is thus a structure feature map (specifically, a 3-dimensional tensor), which is helpful for dense prediction tasks like segmentation or depth prediction.

![[20230317162807.png#invert|400]]

# Segmentation
Notably, FCNs are excellent for semantic segmentation. To output a high-resolution segmentation map and incorporate coarse and fine information, we can collect feature activations from different depths in our FCN, as shown below. At the end, we use $1 \times 1$ convolutions to map our final activations to per-pixel class probabilities.

![[20230317162852.png#invert]]
