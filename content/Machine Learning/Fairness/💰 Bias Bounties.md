Bias bounties is a public-sourcing approach to mitigating biases in a model. Since it's difficult to anticipate adversarial dynamics, we can instead reward people for finding such problems.

Let $f(x)$ be our current model. For a bounty to be valid, we require two classifiers:
1. A group classifier $g(x) \in \{ 0, 1 \}$ that defines the harmed group.
2. A model classifier $h(x)$ that has better error on the group, 
$$
\epsilon(h, g) < \epsilon(f, g).
$$


We can then build a better model: 
$$
f'(x) = \begin{cases} h(x) & \text{if $g(x) = 1$} \\ f(x) & \text{if $g(x) = 0$} \end{cases}
$$
 Intuitively, we simply use to the better model $h$ for the group defined by $g$ in the bounty.

We can show that this improves our model overall. Let 
$$
\Delta = \epsilon(f, g) - \epsilon(f', g) > 0,
$$
 and let $w = \Pr[g(x) = 1]$. We have 
$$
\epsilon(f') = (1-w)\epsilon(f', \neg g) + w \epsilon(f', g).
$$
 The second term is a better error, and by combining our equations, we get 
$$
\epsilon(f) - \epsilon(f') = w\Delta > 0.
$$
 In practice, we can require $w\Delta \geq \gamma > 0$ for some threshold $\gamma$ to prevent extremely minuscule improvements.

We can how repeat and recurse this method, adding multiple $g_i$ and $h_i$ to the front of our model. If adding a new $g_i$ makes a previous improvement $g_j$ worse, we can simply re-add $g_j$ to the front of the model stack. With our threshold $\gamma$, we will only accept $1/\gamma$ models before reaching to best-possible result.