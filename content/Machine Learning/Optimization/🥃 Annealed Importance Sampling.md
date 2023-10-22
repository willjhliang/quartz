Annealed importance sampling is a method for directly approximating the partition function $Z$. This is especially helpful during evaluation when we want to compare the likelihoods between two models.

# Partition Ratios
Note that to compare two models, we can check the ratio of their likelihoods, which is equivalent to $$\sum_i \log p_A(x^{(i)}) - \sum_i \log p_B (x^{(i)}) = \sum_i \log \frac{\tilde{p}_A(x^{(i)})}{\tilde{p}_B(x^{(i)}}-m\log \frac{Z_A}{Z_B}.$$

Knowing the ratio of the partition functions is enough to compare models, and if we ever need its actual value, we can find it with $$Z_B = \frac{Z_B}{Z_A} Z_A$$ if we knew the ratio and the partition for the other distribution.

# Importance Sampling
We can directly find the ratio using [[🪆 Importance Sampling]]: $$\begin{align*} Z_1 &= \int_x \tilde{p}_1(x)dx \\ &= \int_x \frac{p_0(x)}{p_0(x)}\tilde{p}_1(x)dx \\ &= Z_0 \int_x p_0(x) \frac{\tilde{p}_1(x)}{\tilde{p}_0(x)}dx \\ &= Z_0 \mathbb{E}_{x \sim p_0} \frac{\tilde{p}_1(x)}{\tilde{p}_0(x)} \end{align*}$$

Thus, the ratio is $$\frac{Z_1}{Z_0} = \frac{1}{K}\sum_{i=1}^K \frac{\tilde{p}_1(x^{(i)})}{\tilde{p}_0(x^{(i)})}$$ where $x^{(i)} \sim p_0$. If $p_0$ is close to $p_1$ and tractable, the equation above is an effective way to estimate $Z_1$.

# Annealing
However, often times $p_1$ is too complex, and there's no simple $p_0$ that's close enough to offer a good approximation; if most probabilities are off, our sum will be sparse and have high variance.

Annealed importance sampling bridges the gap between $p_0$ and $p_1$ with intermediate distributions $p_{\eta_0}, \ldots, p_{\eta_n}$ where $0 = \eta_0 < \eta_1 < \ldots < \eta_n = 1$. We begin with a simple distribution $p_0$ and gradually transform it to $p_1$. Then ratio is then $$\frac{Z_1}{Z_0} = \prod_{j=0}^{n-1} \frac{Z_{\eta_j + 1}}{Z_{\eta_j}}.$$

$p_{\eta_j}$ are hand-designed, usually set as $$p_{\eta_j} \propto p_1^{\eta_j} p_0^{1 - \eta_j}.$$ To sample from them, we define transition functions $T_{\eta_j}(x' \vert x)$ so that $$p_{\eta_j}(x') = \int_x p_{\eta_j}(x) T_{\eta_j}(x' \vert x) dx,$$ which can be constructed using any [[🎯 Markov Chain Monte Carlo]] method.

Then, we can sample $x_{\eta_1} \sim p_0(x)$ and $$x_{\eta_j} \sim T_{\eta_{j-1}}(x_{\eta_j} \vert x_{\eta_{j-1}}).$$ The importance weight of our sample is $$w = \frac{\tilde{p}_{\eta_1}(x_{\eta_1})}{\tilde{p}_0(x_{\eta_1})} \frac{\tilde{p}_{\eta_2}(x_{\eta_2})}{\tilde{p}_{\eta_1}(x_{\eta_2})} \ldots \frac{\tilde{p}_1(x_1)}{\tilde{p}_{\eta_n - 1}(x_{\eta_n})}$$

With $K$ samples and weights $w^{(1)}, \ldots, w^{(K)}$, our ratio estimate is $$\frac{Z_1}{Z_0} \approx \frac{1}{K}\sum_{i=1}^K w^{(k)}.$$