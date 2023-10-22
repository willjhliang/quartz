YOLO (You Only Look Once) performs multi-object detection with a single pass through a [[👁️ Convolutional Neural Network]].

We divide the input image with a grid, and each grid cell is responsible for predicting bounding boxes for objects whose center is in the cell. A single cell is limited to predicting $B$ boxes and one class for all bounding boxes predicted by the cell.

# Architecture
The architecture begins with DarkNet to detect features from image. It then flattens the result and feeds it into FC layers.

The final output has shape $S \times S \times (C + B * 5)$ where $S$ is the size of the grid, $C$ 
is the number of classes, and $B$ is the number of boxes per cell.

Each cell is in charge of $C + B * 5$ values: $C$ probabilities for classes, then confidence, x, y, width, height for each of the $B$ bounding boxes.

Confidence depends on both the probability of there being an object as well as the predicted IoU of the bounding box with the object's actual bounding box. 
$$
\text{Conf} = \text{Pr} * \text{IoU}
$$


# Losses
We train YOLO with gradient descent on a loss function that assigns bounding boxes to grid cells.
1. For each actual object, calculate the squared error of the center coordinate, 
$$
\lambda_{coord} \sum_{i = 0}^{S^2} \sum_{j = 0}^B \mathbb{1}_{ij}^{obj} [(x_i - \hat{x_i})^2 + (y_i - \hat{y_i})^2].
$$

2. For each actual object, calculate the squared error of roots of the dimensions, "
$$
\lambda_{coord} \sum_{i = 0}^{S^2} \sum_{j = 0}^B \mathbb{1}_{ij}^{obj} [(\sqrt{w_i} - \sqrt{\hat{w_i}})^2 + (\sqrt{h_i} - \sqrt{\hat{h_i}})^2].
$$
 Rooting the values makes the loss penalize small variations in small boxes more than small variations in big boxes.
3. For each actual object, calculate the error between the actual IoU of the bounding box and the predicted IoU; in other words, penalize mis-predicted confidences, 
$$
\sum_{i = 0}^{S^2} \sum_{j = 0}^B \mathbb{1}_{ij}^{obj} (C_i - \hat{C_i})^2.
$$
 Note that this error is a moving target since we want the network to predict the IoU of the predicted bounding box.
4. Do the same as above if the cell isn't responsible for a bounding box but multiply this error with $\lambda_{noobj}$ to decrease its importance relative to confidences for cells with objects, 
$$
\lambda_{noobj} \sum_{i = 0}^{S^2} \sum_{j = 0}^B \mathbb{1}_{ij}^{noobj}(C_i - \hat{C_i})^2.
$$

5. For each actual object, calculate the squared error between the probabilities of each class, 
$$
\sum_{i = 0}^{S^2} \mathbb{1}_i^{obj} \sum_{c \in classes} (p_i(c) - \hat{p_i(c)})^2.
$$


# Prediction
During prediction, we first run the CNN on the input image. Since some objects near the edge of a cell may cause multiple bounding boxes to be predicted, we then run [[🎁 Non-Max Suppression]] to remove redundant predictions.

# Details
The theory and descriptions capture the broad idea of the model, but there are a few notational and implementational details to be aware off.

First, we need to scale all predictions to be between $0$ and $1$. To do this, we need specific definitions of the variables.
1. $x$ and $y$ is location of center relative to the grid cell.
2. $w$ and $h$ are lengths relative to size of the entire image.
3. $C$ is IoU between predicted box and ground truth box.
Only one bounding box predictor is responsible for each object; the one responsible is assigned based on highest IoU.
1. $\mathbb{1}_{ij}^{obj}$ means the $j$-th bounding box predictor in cell $i$ is responsible for the bounding box.
2. $\mathbb{1}_{i}^{obj}$ means there is an object in cell $i$.
3. $\mathbb{1}_{ij}^{noobj}$ means there's no object for the $j$-th bounding box predictor in cell $i$.

> [!info]
> If there are $>B$ objects in a cell, YOLO isn't able to predict bounding boxes for all of them. This is a weakness in the design of the algorithm, but it's extremely unlikely for this is occur given a small-enough cell size and large-enough $B$.