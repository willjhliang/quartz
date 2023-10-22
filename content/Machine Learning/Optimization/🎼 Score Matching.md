The derivative of log density with respect to its argument, $\nabla_x \log p(x)$, is called the score. Score matching tries to make the score of the model's distribution equal to the score of the data distribution by minimizing the Fisher divergence 
$$
\mathbb{E}_{x \sim p_{data}} \left[ \Vert \nabla_x \log p_{model}(x) - \nabla_x \log p_{data}(x) \Vert_2^2 \right].
$$


Since $Z$ isn't a function of $x$, $\nabla_x Z = 0$. Thus, we avoid differentiating the partition function altogether.

However, it's not possible to directly find the score of the true distribution $\nabla_x \log p_{data}(x)$. A series of derivations from our original objective shows that we can minimize the following instead: 
$$
\mathbb{E}_{x \sim p_{data}}\left[ \frac{1}{2} \left( \frac{\partial}{\partial x_j} \log p_{model}(x) \right)^2 + \frac{\partial^2}{\partial x_j^2} \log p_{model}(x) \right],
$$
 also written as 
$$
\mathbb{E}_{x \sim p_{data}} \left[ \frac{1}{2} \Vert \nabla_x \log p_{model}(x) \Vert_2^2 + \text{tr}(\nabla_x^2 \log p_{model}(x)) \right]
$$
 where $\nabla_x^2$ is the Hessian. In most cases, we can perform [[⛰️ Gradient Descent]] on this objective.

# Ratio Matching
Since we're taking derivatives, score matching only works for continuous data. In the discrete case, specifically for binary data, ratio matching seeks to minimize 
$$
L(x) = \sum_{j=1}^n \left(  \frac{1}{1 + \frac{p_{model}(x)}{p_{model}(f(x), j))}}\right)^2
$$
 where $f(x, j)$ returns $x$ with the $j$th bit flipped. This was derived using the same idea as the [[🙃 Pseudo-Likelihood]]: the ratio of two probabilities cancels out the partition function.

# Denoising Score Matching
Finding the trace of the Hessian $\nabla_x^2$ is computationally expensive, especially if $p_{model}$ is a neural network. We can avoid this computation with denoising score matching, which adds noise to our data distribution. Formally, our noisy distribution is 
$$
q_\sigma(\tilde{x}) = \int_x q_\sigma(\tilde{x} \vert x)p_{data}(x) dx
$$
 where $q_\sigma(\tilde{x} \vert x)$ is a corruption process.

Sampling $\tilde{x} \sim q_\sigma$ for our objective instead of $x \sim p_{data}$, we can derive 
$$
\begin{align*} &\mathbb{E}_{x \sim p_{data}} \left[ \Vert \nabla_x \log p_{model}(x) - \nabla_x \log p_{data}(x) \Vert_2^2 \right] \\ = &\mathbb{E}_{x \sim p_{data}, \tilde{x} \sim q_\sigma(\tilde{x} \vert x)}[\Vert \nabla_{\tilde{x}} \log p_{model}(\tilde{x}) - \nabla_{\tilde{x}} \log q_\sigma(\tilde{x} \vert x) \Vert_2^2 ] + C \end{align*}
$$
 where $C$ is a constant that we can discard. If we let 
$$
q_\sigma(\tilde{x} \vert x) = \mathcal{N}(x, \sigma^2 \mathbf{I}),
$$
 then we can easily compute 
$$
\nabla_{\tilde{x}} \log q_\sigma(\tilde{x} \vert x) = -\frac{\tilde{x} - x}{\sigma^2}.
$$


Note that the main drawback here is that our model is now trained on a different distribution than our data, though it should be decently close if we have small $\sigma$. However, we have also gained the ability to denoise samples via Tweedie's formula, 
$$
\mathbb{E}_{x \sim p(x \vert \tilde{x})}[x] = \tilde{x} + \sigma^2 \nabla_x \log q_\sigma(\tilde{x}) \approx \tilde{x} + \sigma^2 \log p_{model}(\tilde{x}).
$$


# Sliced Score Matching
An alternative to denoising score matching is sliced score matching, which trains our model on the data distribution at a comparable speed to the denoising method. The key insight is that if our scores match, their projections onto any direction would also be the same. Thus, we can choose a directions $v$ aim to minimize the sliced Fisher divergence 
$$
\mathbb{E}_{v \sim p_v} \mathbb{E}_{x \sim p_{data}} [(v^\top \nabla_x \log p_{data}(x) - v^\top \log p_{model}(x))].
$$
 After some derivations, we have the objective 
$$
\mathbb{E}_{v \sim p_v} \mathbb{E}_{x \sim p_{data}} \left[ v^\top \nabla_x^2 \log p_{model}(x) v + \frac{1}{2}(v^\top \nabla_x \log p_{model}(x))^2 \right].
$$


Unlike $\text{tr}(\nabla_x^2 \log p_{model}(x))$, computing 
$$
v^\top \nabla_x \log p_{model}(x) v = v^\top \nabla_x(v^\top \log p_{model}(x))
$$
 is scalable and can be done in a single backpropagation.