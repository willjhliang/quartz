The difference in [[💧 Cross Entropy]] and [[🔥 Entropy]] is known as KL divergence, which can multiple common forms below: 
$$
\begin{align*} D_{KL}(P \Vert Q) &= H(P, Q) - H(P) \\ &= -\sum_x P(X = x) \log \frac{Q(X=x)}{P(X=x)} \\ &= \mathbb{E}_{x \sim p} [\log p(x) - \log q(x)] \end{align*}
$$

This value can be interpreted as the expected extra number of bits to transmit using our predicted $Q$ instead of true $P$. It's equal to $0$ if $P = Q$.

> [!info]
> Note that this value is non-symmetric, non-negative, and does not satisfy triangle inequality.

We commonly see KL divergence or cross entropy used as loss functions in categorization problems (for example, in [[🦠 Logistic Regression]]). The truth label $P$ is a one-hot encoding, and our prediction $Q$ consists of softmax probabilities. In this case, our KL divergence simplifies to 
$$
D_{KL}(P \Vert Q) = -\lg Q(Y=k)
$$

for a single datapoint where $k$ is the true label. Moreover, since the entropy of the true labels is constant regardless of our model's predictions, we can instead just use cross entropy $H(P, Q)$ as our loss function.

We can also apply KL divergence to [[💰 Information Gain]]. Rather than computing it as the difference in entropies before and after knowing $X$, it can instead be interpreted as the difference in distributions 
$$
IG(x) = D_{KL}(P(Y \vert X) \Vert P(Y))
$$
