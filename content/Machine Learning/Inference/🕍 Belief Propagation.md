Belief propagation is an inference algorithm to calculate marginals of a [[🗳️ Markov Random Field]].

# Cluster Graph
First, we need to organize our random variables into a cluster graph, which is an undirected graph with nodes representing clusters $c_i \subseteq \{ x_1, \ldots, x_n \}$ and edges associated with the sepset (separation set) $s_{ij} \subseteq c_i \cap c_j$.

This graph needs to satisfy two conditions:
1. Family preservation: for each [[🍪 Factor]] $\phi(x_k) = \phi_k$, there exists a cluster $c_i$ such that $\text{scope}(\phi_k) \subseteq c_i$.
2. Running intersection: for each pair of clusters $c_i, c_j$ and variable $x \in c_i \cap c_j$, there exists a unique path between $c_i$ and $c_j$ for which all clusters and sepsets along the path contain $x$. Equivalently, for any $x$, the set of clusters and sepsets containing $x$ forms a tree.

Note that a MRF may already satisfy these properties; specifically, a tree MRF is a perfect candidate for the cluster graph, with each cluster being simply a node and the edge's sepset containing its endpoints.

## Bethe Cluster Graph
Alternatively, for other more complicated probabilistic graphs, a simple cluster graph called the Bethe cluster graph is commonly used. There are two types of clusters: for each $\phi_k$, we create factor cluster $c_k = \text{scope}(\phi_k)$ and for each $x_i$, we create singleton cluster $\{ x_i \}$. To connect them, we add edge $(c_k, \{ x_ i \})$ if $x_i \in c_k$ for all $x_i$ and $c_k$.

## Assigning Factors
After constructing the cluster graph, we assign each $\phi_k$ to a cluster $c_{\alpha(k)}$ that contains the factor's scope, $$\text{scope}(\phi_k) \subseteq c_{\alpha(k)},$$ and define the initial potentials of a cluster $c_i$ as the product of its assigned factors, $$\psi_i(c_i) = \prod_{k \vert \alpha(k) = i} \phi_k$$

This completes the initialization part of the algorithm, and we now "mix" these potentials together via message passing.

# Message Passing
With a cluster graph, we now pass messages between clusters. The goal of a message from $c_i$ to $c_j$ is to relay information from all the other neighbors of $c_i$ to $c_j$.

Let $N(i)$ denote the neighbors of cluster $i$. The information we want to send involves the potential of $c_i$ and the messages sent to $c_i$ from its other neighbors $c_k$ for $k \in (N(i) \setminus \{ j \})$. However, since $c_j$ may not include some random variables in $c_i$, we marginalize over the unneeded ones, $c_i \setminus s_{ij}$.

To find marginal probabilities, we use sum-product message passing. For MAP inference (finding the most likely assignment), we use max-sum.

## Sum-Product
In sum-product, we marginalize over the product of our desired quantities. This is somewhat analogous to [[🔫 Variable Elimination]] where we combined factors via multiplication and then marginalized over a random variable.

Formally, a message from cluster $i$ to cluster $j$ is defined as $$\delta_{i \rightarrow j} (s_{ij}) = \sum_{c_i \setminus s_{ij}} \psi_i \times \prod_{k \in (N(i) \setminus \{ j \})} \delta_{k \rightarrow i}(s_{ki}).$$

## Max-Sum
Observe that to find the max, we can simply replace the summation with maximization. However, this introduces numerical instability, so we can maximize the log instead, giving us the max-sum $$\delta_{i \rightarrow j}(s_{ij}) = \max_{c_i \setminus s_{ij}} \left\{ \log \psi_i + \sum_{k \in (N(i) \setminus \{ j \})} \delta_{k \rightarrow i}(s_{ki}) \right\}.$$

# Algorithm
The belief propagation algorithm initializes all messages to $1$ and repeats the message passing operation again and again on all edges. Upon convergence, for each cluster $c_i$, we have the belief $$\beta_i(c_i) = \psi_i \times \prod_{k \in N(i)} \delta_{k \rightarrow i}(s_{ki}).$$

With sum-product, our beliefs are proportional to the marginal probabilities over their scopes, $$\beta_i (c_i) \propto  p(c_i),$$ so to answer a query for $p(x)$, we find a cluster $c_i$ for which $x \in c_i$ and get $$\tilde{p}(x) = \sum_{c_i \setminus \{ x \}} \beta_i (c_i),$$ which we need to normalize by dividing by partition $$Z = \sum_{c_i}\beta_i(c_i).$$

With max-sum, our beliefs are the max-marginals $$\beta_i(c_i) = \max_{\{ x_1, \ldots, x_n \} \setminus c_i} \log p(x).$$

Note that we can answer any query by caching the results of our messages to avoid computing everything for each query.

Unfortunately, cluster graphs with loops may not lead to accurate inference. The solution to this is to use [[🌲 Junction Tree]]s, which guarantee that message passing converges to the true marginals, thus making belief propagate an exact inference algorithm.