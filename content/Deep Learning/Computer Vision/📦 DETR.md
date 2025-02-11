DETR (detection transformer) is a solution to object detection that uses a [[🦾 Transformer]] encoder-decoder architecture. It predicts a fixed number $N$ of predictions and learns through a bipartite matching loss.

![[20230406084409.png#invert|600]]

A CNN backbone first encodes the input image into a feature representation. We then collapse the features (and add positional encodings) and process it with a transformer. The transformer encoder transforms the features into queries, and the decoder transforms learned positional encodings (called object queries) with cross attention from the queries into output embeddings. These outputs are then independently decoded into box coordinates and class labels.

One key design of DETR is that the number of predicted boxes is fixed (since the feature sequence is fixed), so many of them must predict the "no object" class. For $N$ predictions $\{ \hat{y}_i \}$, we compare it with the ground truth via bipartite matching; that is, we find a permutation 
$$
\sigma = \arg\min_\sigma \sum_{i=1}^N L_M(y_i, \hat{y}_{\sigma(i)})
$$
 that minimizes the matching loss between a ground truth and prediction: 
$$
\begin{align*} L_M(y_i, \hat{y}_{\sigma(i)}) &= \mathbb{1}[c_i \neq \varnothing] \cdot (-\hat{p}_{\sigma(i)}(c_i) + L_{box}(b_i, \hat{b}_{\sigma(i)})) \\ L_{box} (b_i, \hat{b}_{\sigma(i)}) &= \lambda_{iou}L_{iou}(b_i, \hat{b}_{\sigma(i)}) + \lambda_{L1} \Vert b_i - \hat{b}_{\sigma(i)} \Vert_1 \end{align*}
$$
 Using this ordering $\sigma$, we'll optimize our model with the Hungarian loss 
$$
L_H(y, \hat{y}) = \sum_{i=1}^N [-\log \hat{p}_{\sigma(i)}(c_i) + \mathbb{1}[c_i \neq \varnothing] L_{box}(b_i, \hat{b}_{\sigma(i)})].
$$


Empirically, DETR has performed on par with [[👟 Faster R-CNN]] with an advantage in predicting larger objects due to the transformer's self-attention.