Mutual information measures the dependence between two random variables. Formally, 
$$
I(X;Y) = D_{KL}(p(x, y) \Vert p(x)p(y))
$$
 where $D_{KL}$ is the [[✂️ KL Divergence]]. Intuitively, if $X$ and $Y$ are independent, $p(x, y) = p(x)p(y)$, we have low mutual information; conversely, the more dependent they are, the higher mutual information is.

Using the definition of KL divergence, we can also write 
$$
I(X; Y) = \mathbb{E}_{(x, y) \sim p(x, y)} \left[ \log \frac{p(x, y)}{p(x)p(y)} \right] = H(p(y)) - H(p(y \vert x)).
$$
 Following the last expression, another interpretation of mutual information is the difference between the [[🔥 Entropy]] of $Y$ and the entropy of $Y$ after knowing $X$. If $X$ has some information about $Y$, our entropy for $Y$ would decrease after knowing $X$, so our mutual information would be high.