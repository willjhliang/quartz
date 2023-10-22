Cross entropy generalizes [[🔥 Entropy]] to two distributions: $P$ is the true distribution, and $Q$ is the predicted distribution. Using them, cross entropy measures the entropy we get if we encode using our predicted distribution but have events happen according to the true distribution. In other words, our surprise is defined by our predicted probabilities while the expected value uses the actual, true probabilities of the event happening.

Putting $P$ and $Q$ in their respective spots in the original equation, we get 
$$
H(P, Q) = -\sum_x p(x) \lg q(x).
$$


Note that if $P$ and $Q$ are equal, then cross entropy is equal to entropy. Otherwise, the cross entropy is higher than true entropy $H(P)$: if we use an imperfect predicted distribution, our bit encoding won't be as optimal as if we knew the true distribution.

# Loss
In the context of machine learning, cross entropy is commonly used to compare a predicted distribution with the ground truth distribution. In a categorical setting, our model is expected to predict probabilities for each class, and our ground truth distribution is usually a one-hot encoded vector for the true class.

In this case, $P$ is the ground truth, and $Q$ is the model prediction. The cross entropy loss is simply $H(P, Q)$. However, since $P$ is one-hot, we can simplify our equations.
1. In the binary case with $N$ datapoints, if $y^{(i)}$ is our true class and $p^{(i)}$ is our predicted probability for the first class, we have 
$$
H(P, Q) = -\sum_{i=1}^N y^{(i)}\log p^{(i)} + (1 - y^{(i)})\log (1-p^{(i)}).
$$

2. For $K$ classes with $N$ datapoints, if $y^{(i)}_j = 1$ for our true class (and $0$ for everything else) and $p^{(i)}_j$ is our predicted probability for class $j$, 
$$
H(P, Q) = -\sum_{i=1}^N \sum_{j=1}^K y^{(i)}_j\log p^{(i)}_j.
$$
 Note that this generalizes the binary case above, which expanded the inner summation into $K = 2$ classes.

Lastly, if we compute probabilities with the softmax (like in virtually every classification method), the cross entropy loss can be further expressed in terms of the "scores" pre-softmax. If we let $z_j^{(i)}$ denote the score for class $j$ of datapoint $i$, we have 
$$
H(P, Q) = -\sum_{i=1}^N \sum_{j=1}^K y^{(i)}_j \log \frac{e^{z_j}}{\sum_{j'=1}^K e^{z_{j'}}}.
$$
