The laplace mechanism is a differentially private algorithm for computing statistics over a dataset. The key idea is to add laplace noise to the true statistic, thus incorporating randomization and ensuring privacy.

Formally, the mechanism takes dataset $x \in [0, 1]^n$ (where person $i$'s data is $x_i$) and computes some function 
$$
f(x_1 \ldots x_n) \in \mathbb{R}.
$$
 Our algorithm first computes $f(x)$ exactly, then outputs $f(x) + v$ where $v$ is noise sampled from the laplace distribution.

# Sensitivity
To formally specify the degree of noise and its relation to the definition of differential privacy, we define a measure called "sensitivity." Intuitively, sensitivity $\Delta f$ is the magnitude of change between two neighboring inputs; that is, 
$$
\Delta f = \max_{x, x'} \vert f(x) - f(x') \vert
$$
 for neighbors $x$ and $x'$.

Some common sensitivity examples are below:
1. Average: $\Delta f = 1/n$ for $x = 0\ldots0$ and $x' = 10\ldots0$.
2. Standard deviation: $\Delta f \approx 1/\sqrt{n}$ for the same $x, x'$.
3. Maximum: $\Delta f = 1$ for the same $x, x'$.
4. Median: $\Delta f = 1$ for odd $N$, $x, x'$ split in the middle.

# Laplace Sampling

![[20230503134234.png#invert|300]]

For a laplace distribution centered at $0$ with variance $2b^2$, we randomly sample a value $v$ with probability 
$$
p(v) = \frac{1}{2b} e^{- \vert v \vert / b}.
$$
 $2b$ controls the magnitude of noise we add to $f(x)$, so in the laplace mechanism, we set $b$ with the desired degree of differential privacy $\epsilon$ via the equation 
$$
b = \frac{\Delta f}{\epsilon}.
$$
 Note that this formulation is extremely useful if our sensitivity is inversely proportional to the number of samples $n$. This mechanism can be used for any function $f$ such that as $n \rightarrow \infty$, $\Delta f \rightarrow 0$ and thus $b \rightarrow 0$.

# Differential Privacy Analysis
We'll now show that the algorithm above is $\epsilon$-differentially private. Let $x, x'$ be neighboring inputs with laplace mechanism distributions $p_x, p_{x'}$. For an output value $o$, we have 
$$
\frac{p_x(o)}{p_{x'}(o)} = \frac{1/2b \cdot \exp \{ -\vert f(x) - o \vert / b\}}{1/2b \cdot \exp \{ -\vert f(x') - o \vert / b \}} = e^{ (\vert f(x') - o \vert - \vert f(x) - o \vert) / b }.
$$


Now, observe that $\vert f(x') - o \vert - \vert f(x) - o \vert$ is the difference from $f(x)$ and $f(x')$ to some value $o$; this difference is bounded by the case when $f(x)$ and $f(x')$ are on different sides of $o$ (one higher, one lower); that is, 
$$
\vert f(x') - o \vert - \vert f(x) - o \vert \leq \vert f(x') - f(x) \vert.
$$


Thus, our equation above is 
$$
\frac{p_x(o)}{p_{x'}(o)} \leq e^{ \vert f(x') - f(x) \vert / b} \leq e^{ \Delta f / b } = e^{ \Delta f / (\Delta f / \epsilon) } = e^\epsilon.
$$


Note that the above derivation showed the difference in probabilities for neighboring individual outcomes. To relate this to the definition of differential privacy, which is concerned with all possible sets $S$ of (disjoint) outcomes, we have 
$$
\frac{p_x(S)}{p_{x'}(S)} = \frac{\sum_i p_x(o_i)}{\sum_i p_{x'}(o_i)} \leq \frac{\sum_i e^\epsilon p_{x'}(o_i)}{\sum_i p_{x'}(o_i)} = e^\epsilon.
$$
 Thus, our laplace mechanism is $\epsilon$-differentially private.