InfoNCE is a loss that encourages a model to associate some "context" $c$ with samples $x$. That is, we want to learn some embedding for $x$ and $c$ that maximizes their [[🤝 Mutual Information]], 
$$
I(x;c) = \mathbb{E}_{x, y \sim p(x, y)} \left[ \log \frac{p(x, c)}{p(x)p(c)} \right] = \mathbb{E}_{x, y \sim p(x, y)} \left[ \log \frac{p(x \vert c)}{p(x)} \right].
$$
 In the original contrastive predictive coding (CPC) paper, $c$ was a context used to summarize a sequence history and $x$ consists of future predictions in the sequence. However, InfoNCE has since been generalized to many different domains that all share the goal of learning semantics in $x$ or $c$ (or both) that relate to each other.

More specifically, we'll model the density ratio within the expectation, 
$$
f_\theta(x, c) \propto \frac{p(x \vert c)}{p(x)}.
$$
 Our goal is to make $f(x, c)$ high for context and samples from our data distribution. To do so, we'll take inspiration from [[📣 Noise Contrastive Estimation]] and develop a contrastive loss between positive and negative samples.

Specifically, we'll form a set $X$ consisting of a positive sample from $p(x \vert c)$ and $N-1$ negative samples from some proposal distribution $p(x)$ that's independent of $c$. The probability of $x^{(i)}$ being our positive sample, indicated by $d = i$, is 
$$
p(d= i \vert X, c) = \frac{p(d=i, X, c)}{p(X, c)} = \frac{p(x^{(i)} \vert c) \prod_{l \neq i} p(x^{l})}{\sum_{j=1}^N p(x^{(j)} \vert c) \prod_{l \neq j} p(x^{l})} = \frac{\frac{p(x^{(i)} \vert c)}{p(x^{(i)})}}{\sum_{j=1}^N \frac{p(x^{(j)} \vert c)}{p(x^{(j)})}}.
$$


From our final expression, we can substitute in our definition for $f_\theta$ and get 
$$
p(d = i \vert X, c) = \frac{f_\theta(x^{(i)}, c)}{\sum_{j=1}^N f_\theta(x^{(j)}, c)}.
$$
 We want to learn $\theta$ that has high probability for true positive samples, so the InfoNCE loss optimizes the categorical [[💧 Cross Entropy]] loss for classifying $x^+$ correctly, 
$$
J(\theta) = -\mathbb{E}_{X \sim p(X)} \left[ \log \frac{f_\theta(x^+, c)}{\sum_{x^- \in X} f_\theta(x^-, c)} \right].
$$
 Optimizing this loss thus gives us a $f_\theta$ that maximizes $\frac{p(x \vert c)}{p(x)}$ for $x, c$ sampled from our data distribution, which in turn maximizes mutual information. This objective is actually explicitly related to mutual information as 
$$
I(x, c) \geq \log N - J(\theta),
$$
 so another interpretation is that minimizing $J(\theta)$ maximizes the mutual information lower bound.