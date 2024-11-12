---
---
Faster R-CNN is a two-stage object detection network that builds on ideas from R-CNN and Fast R-CNN. Following the traditional object detection pipeline, we have a region proposal stage and a classification stage; the key innovation in Faster R-CNN is that both stages, trained as [[👁️ Convolutional Neural Network]]s, operate on a feature map rather than the original image.

We first use a feature network (such as VGG-16) to convert the image into a feature map. We'll use this feature map for both region proposal and classification.

![[20230317150125.png#invert|300]]

# Region Proposal Network
The Region Proposal Network (RPN) predicts regions of interest (RoI) from the feature map. To do so, we slide a window across the feature map and feed the window into a CNN; this CNN predicts $k$ region proposals, each is which is associated with an anchor box and defined by coordinates and objectness scores.
1. Coordinates $x, y, w, h$ represent the location (center coordinate) and scale of the bounding box.
2. Objectness scores estimate the probability of an object or no object.

## Anchor Boxes
Anchor boxes are boxes of varying scales and aspect ratios that allow the RPN to specialize each of its coordinate and objectness predictions to different objects. In Faster R-CNN, we use 3 scales and 3 aspect ratios; during training, ground truth boxes are (typically) assigned to the anchor boxes that most resemble them, thus encouraging specialization.

![[20230317145911.png#invert|400]]

## Training
Specifically, we assign an anchor to have an object (positive) if it has the highest IoU with a ground truth box or an IoU $\geq 0.7$; otherwise, we set it to be negative if it has IoU $< 0.3$, and we ignore it otherwise.

To train the RPN, we optimize objectness loss and coordinate loss, 
$$
L(\{p_i\}, \{t_i\}) = \frac{1}{N_{cls}} \sum_i L_{cls}(p_i, p_i^*) + \lambda \frac{1}{N_{reg}} \sum_i p_i^* L_{reg}(t_i, t_i*)
$$
 where $p_i^* = 1$ if the anchor is positive and $p_i^* = 0$ if the anchor is negative. $t_i$ is a vector containing the regressed coordinates of the predicted bounding box, 
$$
\begin{pmatrix}t_x \\ t_y \\ t_w \\ t_h\end{pmatrix} = \begin{pmatrix} (x-x_a)/w_a \\ (y-y_a)/h_a \\ \log(w/w_a) \\ \log(h/h_a) \end{pmatrix}
$$
 where $x_a, y_a, w_a, h_a$ are the parameters of the anchor box and $x, y, w, h$ are the predicted parameters. $t_i^*$ is defined similarly except we replace $x, y, w, h$ with $x^*, y^*, w^*, h^*$ denoting the ground truth box coordinates.

$L_{cls}$ is the log loss, and $L_{reg}$ uses the smooth $L_1$ loss 
$$
L_1(x) = \begin{cases} 0.5x^2 & \text{if $\vert x \vert < 1$} \\ \vert x \vert - 0.5  & \text{otherwise} \end{cases}
$$
 where in our case $x = t_i - t_i^*$.

# Detection Network (Fast R-CNN)
The detection network classifies proposed RoIs using Fast R-CNN. We take in the first feature map and RoIs and for each RoI projection on the feature map, we apply RoI pooling to create another fixed-size feature map; RoI pooling essentially performs max pooling but with a fixed output resolution. That is, given a feature projection of size $h \times w$, to create the fixed-size $H \times W$, we divide the input into sub-windows of size $h / H \times w / W$ and get the max value in each sub-window.

This second feature map goes through some fully-connected layers and gives us the softmax class probabilities $p_0, \ldots, p_K$ (including a probability for background) as well as bounding box regressors. These regressors are refined bounding box coordinates, specifically defined as regression offsets $(t_x, t_y, t_w, t_h)$ similar to the anchor box offsets as defined above.

![[20230317150818.png#invert|400]]

Our loss consists of classification and regression terms, 
$$
L(p, u, t, v) = L_{cls}(p, u) + \lambda L_{loc}(t, v)
$$
 where $p$ is our predicted probabilities, $u$ is the true class, $t$ is our predicted regressors, and $v$ is the true regressors. Note that we only penalize regressors (the second term) that are assigned to a ground truth object. Like above, our two components are specifically the log loss and smooth $L_1$ loss respectively.