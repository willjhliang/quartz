Noise contrastive estimation[^1] (NCE) is a method for optimizing a probability model that predicts probabilities by directly approximating the partition function $Z$. We represent the model's distribution as 
$$
\log p_\theta(x) = \log \tilde{p}_\theta(x) + c
$$
 where $c$, a parameter learned alongside $\theta$ in the model, approximates $-\log Z$. Note that this resulting distribution is not an exactly valid probability distribution, but it will be close as our estimate for $c$ improves.

Naively asking our algorithm to approximate $c$ doesn't guarantee that it's equal to $-\log Z$: to maximize probabilities, it can simply learn an extremely large $c$ and ignore the probability constraint.

# Contrastive Objective
Instead, we'll create a joint distribution consisting of samples from our data distribution $p_{data}$ and samples from some noise distribution $p_{noise}$. Specifically, for one sample from $p_{data}$, we'll have $k$ noise samples; if we let $D = 1$ indicate a true data sample and $D = 0$ be noise, we have 
$$
p(D = 1, x) = \frac{1}{k+1} p_{data}(x),\ p(D = 0, x) = \frac{k}{k+1} p_{noise}(x),
$$
 and thus the joint is 
$$
p_{joint}(x) = p(D=1, x) + p(D=0, x) = \frac{1}{k+1}[p_{data}(x) + kp_{noise}(x)].
$$
 Whereas our original goal is to learn some $p_\theta$ that resembles $p_{data}$, NCE builds a binary classifier for $D$ on top of $p_\theta(x)$, 
$$
p_\theta(D = 1 \vert x) = \frac{p_\theta(x)}{p_\theta(x) + kp_{noise}(x)},\ p_\theta(D = 0 \vert x) = \frac{kp_{noise}(x)}{p_\theta(x) + kp_{noise}(x)}.
$$
 Our goal is to minimize the [[✂️ KL Divergence]] between the joint defined by our model and the joint data-noise distribution above, which is equivalent to maximizing the the NCE objective: 
$$
\begin{align*} J(\theta) &= \mathbb{E}_{x \sim p_{data}}\left[\log p(D = 1 \vert x) + k \mathbb{E}_{x' \sim p_{noise}}[\log p(D = 0 \vert x')] \right] \\ &\approx \mathbb{E}_{x \sim p_{data}}\left[\log p(D = 1 \vert x) + \sum_{i=1}^k \log p(D = 0 \vert x') \right] \text{ where } x' \sim p_{noise} \end{align*}
$$


Minimizing $L$ gives us the optimal values for $\theta$ and $c$. To do so, we must compute our probabilities; we'll need to know our noise distribution (which gives us $p_{noise}(x)$) and also estimate the partition with $c$.

# Analysis and Intuition
Unlike the naive case where $c$ can be chosen to explode our probabilities to infinity, $p_\theta(x)$ appears in both the numerator and denominator here—if our model predicts sky-high $p_\theta(x)$ for any input, whether real or noise, then $p_\theta(D = 1 \vert x) = 1$, which is good, but $p_\theta(D = 0 \vert x') = 0$, which is wrong. Thus, this objective controls $c$, forcing the model to predict high values of $p_\theta(x)$ for real samples $x$, thereby making $p_\theta(D = 1 \vert x) \approx 1$, while predicting low values for noisy samples $x'$ to make $p_\theta(D = 0 \vert x') \approx 1$, which maximizes our objective.

Moreover, a closer analysis of the derivative of this objective shows that 
$$
\frac{\partial}{\partial \theta}J(\theta) = \sum_x \frac{kp_{noise}(x)}{p_\theta(x) + kp_{noise}(x)}(p_{data}(x) - p_\theta(x)) \frac{\partial}{\partial \theta} \log \tilde{p}_\theta(x),
$$
 which, as $k \rightarrow \infty$, approaches the gradient for the standard MLE, 
$$
\frac{\partial}{\partial \theta} J(\theta) \rightarrow \sum_x (p_{data}(x) - p_\theta(x)) \frac{\partial}{\partial \theta} \log \tilde{p}_\theta(x).
$$
 Thus, with a large enough $k$, optimizing our NCE objective moves us in the same direction as maximizing $\mathbb{E}_{x \sim p_{data}}[\log p_\theta(x)]$.

# Log Odds Form
Finally, note that in practice, $c$ is usually set to $0$, and our model learns the probabilities directly, $\tilde{p}_\theta(x) = p_\theta(x)$. Also, with this setting, we can convert 
$$
p(D = 1 \vert x) = \sigma(\log p_\theta(x) - \log kp_{noise}(x)).
$$
 If we have 
$$
p_\theta(x) = e^{f_\theta(x)}
$$
 (without the partition function, which was assumed to be $1$ with $c = 0$), then this probability simplifies to 
$$
p(D = 1 \vert x) = \sigma(f_\theta(x) - \log kp_{noise}(x)) = \sigma(\Delta f_\theta(x)) \text{ for } \Delta f_\theta(x) = f_\theta(x) - \log kp_{noise}(x).
$$
 Plugging this (and $p(D = 0 \vert x) = 1 - p(D = 1 \vert x)$) back into the NCE objective we recover its log odds form, 
$$
J(\theta) = \mathbb{E}_{x \sim p_{data}}\left[\log \sigma(\Delta f_\theta(x)) + k \mathbb{E}_{x' \sim p_{noise}}[\log (1 - \sigma(\Delta f_\theta(x)))] \right].
$$


[^1]: Awesome explanation and connections with [[ℹ️ InfoNCE]] [here](https://jxmo.io/posts/nce).