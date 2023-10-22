The exponential mechanism is a generalized differentially private algorithm for any output space $O$. Unlike the [[📌 Laplace Mechanism]] that must output real-valued statistics, $O$ can be anything—such as models, clustering, or voting results.

Our mechanism takes in some input $x \in I$ and outputs some $o \in O$. Let the "quality" of some $o$ for the input $x$ be measured as 
$$
u(x, o) \in \mathbb{R}.
$$
 For example, if $x$ is a dataset and $o$ is the model, $u$ could be the inverse error of $o$ on $x$.

# Generalized Sensitivity
Without privacy, our output would simply be the $o$ that maximizes quality, 
$$
o^* = \arg\max_o u(x, o).
$$
 To add randomness, we use generalized sensitivity, 
$$
\Delta u = \max_{x, x'} \max_o \vert u(x, o) - u(x', o) \vert
$$
 where $x, x'$ are neighbors. Intuitively, generalized sensitivity is the maximum change in a single input that changes the quality of some output. For example, the generalized sensitivity of the machine learning setting (input dataset, output model) is $1/n$.

# Sampling
In the exponential mechanism, we sample the output $o$ using probability 
$$
p_x(o) = \frac{1}{Z} e^{\epsilon u(x, o) / (2\Delta u)}
$$
 where $Z = \sum_o \exp \{ \epsilon u(x, o) / (2 \Delta u) \}$ is a normalizing constant to ensure a valid probability distribution. This formulation assigns exponentially higher probability to higher-quality outputs, but due to the sampling randomness, we can show that this method is differentially private.

# Differential Privacy Analysis
We'll show that the exponential mechanism is $\epsilon$-differentially private. For all neighbors $x, x'$ and outputs $o$, we have 
$$
\frac{p_x(o)}{p_{x'}(o)} = \frac{\exp \{ \epsilon u(x, o) / (2 \Delta u) \} / Z(x)}{\exp \{ \epsilon u(x', o) / (2 \Delta u) \} / Z(x')} = e^{\epsilon (u(x', o) - u(x, o))/(2\Delta u)} \frac{Z(x')}{Z(x)}.
$$
 Next, since the absolute value of the difference is less than or equal to the actual difference, we have the first term in the product 
$$
e^{\epsilon (u(x', o) - u(x, o))/(2\Delta u)} \leq e^{\epsilon \vert u(x', o) - u(x, o)\vert/(2\Delta u)} = e^{\epsilon \Delta u / (2\Delta u)} = e^{\epsilon/2}.
$$


As for the second term, we have 
$$
\frac{Z(x')}{Z(x)} = \frac{\sum_o \exp \{ \epsilon u(x', o) / (2 \Delta u) \}}{\sum_o \exp \{ \epsilon u(x, o) / (2 \Delta u) \}}.
$$
 Since $\Delta u$ is the maximum difference between $u(x', o)$ and $u(x, o)$, we have 
$$
u(x', o) \leq u(x, o) + \Delta u,
$$
 and thus 
$$
\frac{Z(x')}{Z(x)} \leq \frac{\sum_o \exp \{ (\epsilon u(x, o) + \Delta u) / (2 \Delta u) \}}{\sum_o \exp \{ \epsilon u(x, o) / (2 \Delta u) \}} = e^{\epsilon \Delta u/(2 \Delta u)} \cdot 1 = e^{\epsilon / 2}.
$$


Combining both terms, we finally get 
$$
\frac{p_x(o)}{p_{x'}(o)} \leq e^{\epsilon/2} \cdot e^{\epsilon / 2} = e^\epsilon.
$$
 This can then be generalized to sets of outcomes rather than single outcomes, and thus the exponential mechanism formulation is differentially private.

# Bounds
In the special case of finite $O$, for some input $x$ and output $o$ of the exponential mechanism, we have with high probability 
$$
u(x, o^*) - u(x, o) \leq \frac{2 \Delta u}{\epsilon} \ln \vert O \vert.
$$
 This gives us a strong bound on how good our differentially-private output $o$ will be. Since $\Delta u$ is usually dependent on $n$, we can directly calculate the $n$ that gives us a desired difference between our output and the optimal result. For example, in the machine learning setting, $\Delta u = 1/n$, and if we let $\vert O \vert = 2^d$, we have 
$$
\frac{2}{\epsilon n} \cdot d \ll 1 \rightarrow n \gg \frac{2d}{\epsilon}.
$$
