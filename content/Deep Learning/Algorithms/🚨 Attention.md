Attention mechanisms compute a weighted sum of values, paying different levels of attention to each one. Given the queries $Q$ and key-value pairs represented by $K$ and $V$, we compute the generalized attention for each query $q_j$ as follows.
1. Compute the score $e_i = \text{score}(q_j, k_i)$ for each key $k_i$ using some score function. Intuitively, the higher the score, the more compatible the key is with the query.
2. Compute the softmax over scores to get weights $\alpha_i$.
3. Output the weighted sum $\sum_{i=1}^n \alpha_i v_i$ of values.

In the simplest case, with the score function being a dot-product, we can write the attention mechanism as $$\text{Attention}(Q, K, V) = \text{softmax}(QK^T)V.$$ However, there are many other score functions. The most common ones are below:
1. Additive: $\text{score}(q, k) = v^\top \text{tanh}(W[q;k])$ where $v$ and $W$ are learned weights and $[q;k]$ is the concatenated vector of $q$ and $k$.
2. Dot-product: $\text{score}(q, k) = q^\top k$.
3. General: $\text{score}(q, k) = q^\top Wk$ where $W$ is learnable.
4. Scaled dot-product: $\text{score}(q, k) = q^\top k / \sqrt{n}$ where $n$ is the dimension of the key space.

> [!info]
> Note that additive attention was originally used in sequence translation, and the equation above generalizes some subtleties from the model.

# Variants
Since the attention concept is extremely general, it can be applied to a variety of models (most notably [[🦾 Transformer]]s). In these integrations, there are a variety of names for specific attention configurations.
1. Self-attention refers to generating the query, key, and values from the same source. Intuitively, one example is focusing on different parts of a single sentence as we scan through it.
2. Cross-attention uses one source for the query and another source for the key and values. This is analogous to focusing on a sentence while we generate another one, like in translation.