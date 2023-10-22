# Theory
ICA is an algorithm for source separation, also known as disentanglement. For example, if we have $k$ recordings of $k$ people talking, ICA outputs $k$ audio sources, one for each voice. Generally, given an input $x$, our goal is to find output $s$ of the same dimension so that $s_i$ are as independent as possible.

> [!info]
> Note that though ICA shares a similar name with [[🗜️ Principle Component Analysis]], their objectives are unrelated.

Let $A$ be the mixing matrix such that $x = As$. We want to find the un-mixing matrix $W = A^{-1}$ so that $s = Wx$. Note that if $s$ is non-gaussian, our solution $W$ is equivalent across permutation or scaling.

First, assume independence across sources, and let them come from some non-gaussian distribution $p_s$. We solve ICA by maximizing likelihood $$p(s) = \prod_{j=1}^d p_s(s_j)$$
Converting to $x$, we have $$p(x; W) = \prod_{j=1}^d p_s(w_j^\top x) \cdot \vert W \vert$$
Next, we assume that the cdf of the sources is a sigmoid, so the pdf $$p_s(s) = g'(s) \text{ where } g(s) = \frac{1}{1+e^{-s}}$$

Then, our log likelihood is $$l(W, x) = \sum_{i=1}^n \sum_{j=1}^d \log g'(w_j^\top x) + \log \vert W \vert$$

Finally, this can be maximized via [[⛰️ Gradient Descent]] with the gradient $$\nabla_W l(W, x_i) = [1 - 2g(Wx_i)]x^\top$$

# Training
Our loss function is the negative of the log likelihood above, and we optimize with gradient descent.

# Prediction
To get the sources from $x$, we apply our learned $W$ onto $x$.