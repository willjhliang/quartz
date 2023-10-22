# Theory
Graph neural networks capture node, edge, and connectivity information, transforming an arbitrary graph into an embedding. This embedding can be used for node, edge, or graph (global context) classification as well as many other problems.

Graphs are very different from vectors or tensors that other neural networks typically work with. As such, GNNs consist of special components that maintain permutation invariance: renaming or reordering of the same graph shape doesn't change the result.

The general idea is similar to [[👁️ Convolutional Neural Network]]s. For each layer, we evaluate each node or edge based on its neighbors (akin to a convolution).

# Model
Our GNN keeps track of three different information types: global context $U$ (information about the entire graph), node vectors $V$, and edge vectors $E$.

A simple GNN layer consists of three neural networks to transform each of $U$, $V$, and $E$.

Pooling transfers information between these types. They're done by summing over neighbors; for example, pooling from edges to nodes would sum all incident edge vectors to a node, and pooling from nodes to nodes would sum all neighbors.

Message passing layers are simple layers that use pooling before applying the neural network, effectively performing specifically-designed convolutions on the graph. An example is illustrated below.

![[20230103104908.png#invert|500]]