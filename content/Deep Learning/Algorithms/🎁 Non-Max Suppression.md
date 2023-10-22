NMS filters out bounding boxes based on overlap and their confidence scores. The algorithm is as follows.
1. Select proposal with highest confidence, remove from initial proposal list and add it to final proposal list.
2. Compare this proposal with all others, remove those with IoU over threshold.
3. Repeat above until there are no proposals left.

## Soft NMS
SoftNMS uses a more relaxed policy for removing proposals. Instead of directly deleting proposals with high IoU, we can reduce their confidence score: $$s_i = \begin{cases} s_i & iou(M, b_i) < t \\ s_i(1 - iou(M, b_i)) & iou(M, b_i) \geq t \end{cases}$$

This increases precision significantly by preventing overlapping objects from interfering with each others' predictions.