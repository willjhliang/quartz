Normalization is a general technique changing the scale of a certain distribution. In the context of machine learning, we use it to force multiple features (random variables) to have similar scales. Formally, to normalize some feature $x_i$, we have 
$$
x_i' = \frac{x_i - \mu_i}{\sigma_i}
$$
 where $\mu_i$ and $\sigma_i$ are the mean and standard deviation of $x_i$.

This technique is commonly used in data preparation, but there are also numerous methods employed during network training. Four of the most common ones are below, with the blue area highlighting the normalized section.

![[20230308131101.png#invert|400]]

# Batch Normalization
Batch normalization normalizes the inputs of a layer in a neural network. Intuitively, this applies the standard normalization idea to any hidden activations inside a neural network, treating each layer like it's the first layer of the model. Since standard supervised learning processes one mini-batch at a time (rather than one sample at a time), batch normalization computes the $\mu$ and $\sigma$ estimate per batch.

# Layer Normalization
In cases where we don't have batches (like in sequence models) or can only process small batch sizes, layer normalization provides an alternative by normalizing across the features rather than the batch. That is, we assume that all features in $x$ come from the same distribution and compute the mean and standard deviation across features rather than samples.

# Instance Normalization
For images that have $C$ channels, instance normalization normalizes over each channel. This is a much more fine-grained normalization technique as we allow each channel in each sample to have its own distribution.

# Group Normalization
Group normalization is a middle-ground between instance normalization and layer normalization that organizes channels into groups and normalizes each group. We can view this as a generalization that gives instance norm when the group size $G = 1$ and layer norm when $G = C$.

# Conditional Normalization
Conditional normalization is a general technique for augmenting normalization layers with other conditioning information. That is, rather than simply normalizing our features using statistical estimates, we can train other networks to predict the mean and variance instead. The goal of these generated parameters is usually not to predict the answer mean and variance but to perform some transformation on the features, thereby injecting conditioning data via normalization.