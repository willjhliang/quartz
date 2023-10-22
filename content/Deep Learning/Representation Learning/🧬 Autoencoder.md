Autoencoders are deep learning structures that learn a compressed latent space of the input data. In a sense, autoencoders generalize [[🗜️ Principle Component Analysis]] with a [[🕸️ Multilayer Perceptron]] or [[👁️ Convolutional Neural Network]]; the hidden layer of the neural network is analogous to $z_i$, the compressed form of $x_i$.

Using the neural network, we still optimize weights to minimize $L_2$ reconstruction error—forcing the network's output to match the input. However, with a standard neural network, it’s easy to perfectly fit the training data; therefore, we impose one or more constraints.
1. Bottleneck, where the hidden layer has dimension $k < p$.
2. Input noise, making a de-noising autoencoder.
3. $L_1$ or $L_2$ regularization penalties.
4. Forcing orthogonality or independence.

# Stacked Training
One potentially-more efficient method of training an autoencoder is the stacking method, which trains layers one at a time.
1. For each hidden layer $L_i$, take the values from $L_{i-1}$, then process it and feed it to $L_{i+1}$.
2. Optimize $L_i$ to reconstruct $L_{i-1}$ in $L_{i+1}$; in other words, we’re training $L_i$ to learn to reconstruct intermediate features in the neural network.