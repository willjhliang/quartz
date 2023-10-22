The junction (or clique) tree is a type of cluster graph for approximate inference with [[🕍 Belief Propagation]].

Instead of a any arbitrary cluster graph, we instead build a tree with nodes as clusters $c_i \subseteq \{ x_1, \ldots, x_n \}$ and each edge between $c_i, c_j$ with sepset $s_{i,j} = c_i \cap c_j$. Furthermore, we still maintain the family preservation and running intersection properties. The following is an example of a [[🗳️ Markov Random Field]] represented as a junction tree.

![[20230304205847.png#invert|500]]

# Correctness
Intuitively, if we form a tree, our algorithm must converge in a finite number of steps because the leaves send a constant message, and then their neighbors send a constant message, and so on. In other words, since a cluster sends a message to another cluster that contains messages from all other neighbors beside the recipient, a leaf can only send its potential to its only neighbor. This logic can be used to show that a tree structure will converge correctly in a fashion that's similar to [[🔫 Variable Elimination]].

# Independence
A junction tree $T$ satisfies the running intersection property if and only if for every edge $(i, j)$, 
$$
W_{<(i, j)} \perp W_{<(j, i)} \mid s_{i,j}
$$
 where the first $W$ contains all variables on the $c_i$ side of $T$, the second contains all variables on the $c_j$ side, and $s_{i, j}$ is the sepset edge.

Intuitively, we can think of $W_{<(i, j)}$ and $W_{<(j, i)}$ as two groups of variables on either side of our tree. Assume for contradiction that two variables not included in $s_{i, j}$ are not independent and thus shows up in a factor; then, by the family preservation property, we must have a cluster that contains this factor, and by the running intersection property, the variables must span the tree from one side to another. Then, these variables must also be included in $s_{i, j}$, a contradiction.