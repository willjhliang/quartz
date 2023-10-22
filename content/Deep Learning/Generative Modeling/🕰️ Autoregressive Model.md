Autoregressive models parameterize the joint distribution $p(x)$ by breaking it down into conditionals for each dimension $x_i$. We have $$p(x) = p(x_1)p(x_2 \vert x_1) p(x_3 \vert x_1, x_2) \ldots p(x_n \vert x_1, \ldots, x_n) = \prod_{i=1}^np(x_i \vert x_{<i})$$ is the random variables with index less than $i$.

> [!info]
> The "autoregressive" name comes from time-series models that predict outcomes based on past observations. In this setting, $x_i$ is analogous to the $i$th time step.

If we parameterize $p(x_i \vert x_{<i})$ as a table, the number of parameters we need grows exponentially with the number of dimensions in $x_{<i}$. To make computations practical, autoregressive models use a fixed number of parameters to map $x_{<i}$ to the mean of the conditional distribution, which we typically assume to be Bernoulli. Thus, we have $$p_{\theta_i} (x_i \vert x_{<i}) = \text{Bern}(f_i(x_1, \ldots, x_{i-1}))$$ where $\theta_i$ are the parameters that specify $f_i$, the mean function. Note that the standard formulation allows separate parameters and functions for each dimension $i$.

> [!info]
> For non-binary discrete or continuous random variables, we can predict softmax for the former and parameterized distributions (mixture of Gaussians, for example) for the latter.

Since we restricted our function to a fixed number of parameters, we're limiting the expressiveness of our model. This is the tradeoff we get using this computationally-feasible representation.

# Variants
## FVSBN
If we let our function we a linear combination of the inputs with a non-linearity, $$f_i(x_1, \ldots, x_{i-1}) = \sigma(\alpha_0^{(i)} + \alpha_1^{(i)}x_1 + \ldots + \alpha^{(i)}_{i-1}x_{i-1})$$ with $\theta_i = \{ \alpha^{(i)}_0, \ldots, \alpha^{(i)}_{i-1}\}$, we get the fully-visible sigmoid belief network (FVSBN), a specific structure of the general [[🕋 Deep Belief Network]].

To increase the expressiveness, we can simply add more hidden layers and use a [[🕸️ Multilayer Perceptron]] for our function instead.

## NADE
Neural autoregressive density estimator (NADE) is an alternative method that shares some MLP parameters across conditionals, so we have the following: $$\begin{align*} h_i &= \sigma(W_{:, <i} x_{<i} + c) \\ f_i(x_1, \ldots, x_{i-1}) &= \sigma(\alpha^{(i)}h_i + b_i) \end{align*}$$

The first layer of computations uses shared weights, and the second uses separate weights. This reduces the total number of parameters to $O(nd)$ and allows for more efficient hidden unit activations.

## MADE
Masked autoencoder for distribution estimation (MADE) combines the autoregressive property with an [[🧬 Autoencoder]], which aims to reconstruct our input $x$ from the sampled $\hat{x}$.

However, by the autoregressive property, a standard architecture doesn't work because all outputs require all inputs. MADE sets a certain order for the input dimensions and masks out certain paths in the autoencoder to enforce the autoregressive property; that is, in MADE, $\hat{x}_1$ isn't conditional on any input, $\hat{x}_2$ is only conditioned on $x_1$, and so on.

![[20230226183348.png#invert|400]]

# Recurrence
To model $p(x_i \vert x_{<i})$, most methods apply more weights as $i$ increases. An alternative approach is to use [[💬 Recurrent Neural Network]]s to evaluate the "history" one-by-one. We thus maintain a hidden layer $h_i$ "summary" of the past inputs and use it to output parameters $o_i$ for our conditional: $$\begin{align*} h_i &= f(W_{hh}h_{i-1} + W_{xh}x_i) \\ o_i &= W_{hy}h_i \\ h_0 &= b_0 \end{align*}$$

# Optimization
Autoregressive models benefit from explicitly modeling $p(x)$, so we can directly optimize it via [[✂️ KL Divergence]], $$\min_\theta D_{KL}(p_{data}, p_\theta) = \mathbb{E}_{x \sim p_{data}} [\log p_{data}(x) - \log p_\theta(x)].$$ Since $p_{data}$ is constant with respect to $\theta$, this objective is equivalent to $$\max_\theta \mathbb{E}_{x \sim p_{data}} [\log p_\theta (x)].$$ With an analytical form for $p_\theta(x)$, we can directly use [[🤔 Monte Carlo Sampling]], so now we want $$\max_\theta \frac{1}{\vert D \vert} \sum_{x \in D} \log p_{\theta}(x)$$ where $D$ is our dataset of samples from $p_{data}$. In implementation, this is a loss function that we can optimize via [[⛰️ Gradient Descent]].

# Sampling
To sample from our learned distribution $p_\theta(x)$, we first sample $x_1$, then $x_2$, and so on to build $x$.