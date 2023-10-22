Mask R-CNN is an extension of [[👟 Faster R-CNN]] for instance segmentation. We use the same region proposal network but attach a separate branch to the detection network for segmentation; thus, our detection network is now responsible for classification, bounding box regression, and segmentation.

![[20230317155131.png#invert|400]]

The mask branch predicts a binary probability mask for each object class, and we use the classification branch to choose which mask to use. This design crucially decouples classification from segmentation—unlike semantic segmentation with a [[🔭 Fully Convolutional Network]]—which allows each binary mask to specialize to its respective class.

To train this branch, we include $L_{mask}$ into our multi-task loss function. This loss is calculated as the cross-entropy loss on the predicted and true masks of the ground truth class.

# RoI Align
On top of the new branch, we need to modify the RoI pooling layer in the original Fast R-CNN since its coarse quantization disrupts segmentation accuracy, which relies on pixel-level precision. We use the same general idea of RoI pooling, but instead of taking the max, we sample four locations in each bin and compute the value via bilinear interpolation from nearby features. The results of these four samples are aggregated using either max or average.

![[20230317160328.png#invert|200]]