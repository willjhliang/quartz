Markov random fields use an undirected graph to model dependences over a probability distribution. For each clique $c$ in its graph, [[🍪 Factor]] $\phi(x_c)$ measures the degree of dependence between variables in the clique; specifically, given a configuration of values for the variables, $\phi(x_c)$ returns a high value if it's probable.

Using factors, we construct a probability distribution $$p(x) = \frac{1}{Z}\prod_{c \in C} \phi(x_c)$$ where $C$ is the set of cliques and $Z$ is the partition function $$Z = \sum_x \prod_{c \in C} \phi(x_c)$$ that ensures the distribution is valid.

This form of the graphical model is extremely general. In fact, a [[🚨 Bayesian Network]] can be represented in this form using the transformation (called moralization) below.

![[20230220165101.png#invert|400]]

# Independence
Two variables are dependent if they're connected by a path of unobserved variables. Thus, independence is achieved when the variables are separated by a "wall" of observed variables.

The Markov blanket $U$ for $X$ is defined as the minimal set of nodes that, if observed, makes $X$ independent from the rest of the graph. The blanket here is simply the neighborhood of $X$.

# Factor Graphs
Another way to visualize Markov random fields is with factor graphs, with explicitly separates factors from the random variables. This makes the computation and dependencies clearer.