mAP is used to measure the accuracy of object detectors. It's calculated as the mean of average precisions found over each class.

## Average Precision
Precision are recall are calculated as the following: 
$$
\text{Precision} = \frac{TP}{TP + FP} = \frac{TP}{\text{total positive}}
$$
 
$$
\text{Recall} = \frac{TP}{TP + FN} = \frac{TP}{\text{total actual}}
$$


Average precision is calculated as follows.
1. Rank all predictions in descending order of predicted confidence (IoU).
2. Calculate precision and recall down the ranking. Recall increases while precision moves up and down in a zigzag pattern.

	![[20230212101658.png#invert|500]]

	![[20230212101621.png#invert|500]]

3. Average precision is the area under the precision-recall curve, 
$$
AP = \int_0^1 p(r)dr.
$$

4. We can also smooth out the curve before calculating AP. In this case, we use a different formula: 
$$
AP = \sum_{i=1}^n (r_{i + 1} - r_i)p(r_{i + 1})
$$
