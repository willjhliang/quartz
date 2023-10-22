Boltzmann machines are a type of [[⚡️ Energy-Based Model]] that defines energy function $E(x)$ on binary variables $x$, which is used to calculate the probability distribution 
$$
p(x) = \frac{1}{Z}\exp \{ -E(x) \}.
$$
 In a Boltzmann machine, 
$$
E(x) = -x^\top Ux - b^\top x
$$
 where $U$ is the weight matrix and $b$ is the bias. Intuitively, the energy looks at the variables $x$ that are $1$ and takes the negated weights between them as well as their biases. Energy is small when variables associated with high weights are active.

# Latent Variables
To model hidden features that we don't know about, we split the binary variables into sets of observable units $v$ and latent units $h$. Our energy function can then be factored into 
$$
E(v, h) = -v^\top Rv - v^\top Wh - h^\top Sh - b^\top v - c^\top h.
$$
 By introducing hidden units, the Boltzmann machine becomes a universal approximator of probability mass functions over discrete variables.

A slight variation of this form gives us the [[🚫 Restricted Boltzmann Machine]].

# Optimization
We generally optimize the weights $R$, $W$, $S$ and biases $b$ and $c$ using maximum likelihood methods. One special property is that the update for a weight between two units depends only on the statistics of the two units $p_{model}(v)$ and $\hat{p}_{data}(v) p_{model}(h \vert v)$; this makes the update local, unlike many other probabilistic models.