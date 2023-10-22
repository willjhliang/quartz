> [!warning]
> Sorry, this note is under construction. Feel free to take a look at what I've got so far, and please come back later!

Restricted Boltzmann Machines (RBMs) are latent [[🤖 Boltzmann Machine]]s with slightly different weight connections. Rather than connecting between all possible pairs of unit, we only connect between visible units $v$ and latent units $h$, like in the figure below.

![[20230221223125.png#invert|200]]

> [!note]
> This structure, much like a [[🕸️ Multilayer Perceptron]], can be stacked on top of each other with additional latent unit layers to model increasingly complex probability distributions. This gives us Deep Boltzmann Machine (DBM), and with a slight modification, the [[🕋 Deep Belief Network]].

Our energy function is defined as $$E(v, h) = -v^\top Wh - b^\top v - c^\top h,$$ and the probability distribution it models is $$p(v, h) = \frac{1}{Z} \exp \{ -E(v, h) \}.$$

# Conditional Distributions
Although the joint is intractable due to the partition term $Z$, the conditionals can be found. First, $$p(h \vert v) = \frac{p(h, v)}{p(v)} = \frac{1}{Z'} \exp \{ c^\top h + v^\top Wh \}.$$ Note that this can be factored into a product of probabilities, one for each hidden unit $h_j$, and so we have for a single $h_j$ the probability $$p(h_j = 1 \vert v) = \frac{p(h_j = 1 \vert v)}{p(h_j = 0 \vert v) + p(h_j = 1 \vert v)} = \sigma(c_j + v^\top w_j)$$ where $w_j$ is the $j$th column of $W$.

This, the full conditional is $$p(h \vert v) = \prod_{j=1}^{n_h} \sigma ((2h - 1) \odot (c + W^\top v))_j$$ where we use $2h - 1$ to evaluate to $1$ or $-1$, depending on $h$.

A similar derivation also gives us the reverse, $$p(v \vert h) = \prod_{i=1}^{n_v} \sigma((2v - 1) \odot (b + Wh))_i.$$

Since we have the conditionals, with each visible unit independent of the rest (and same for hidden units), we can optimize our distribution using [[🖖 Contrastive Divergence]].