SimCLR is a contrastive learning framework that learns a latent representation by maximizing similarity between different augmentations of the same sample. The framework has four components:
1. Data augmentation composition techniques that produce two views of a data sample, $\tilde{x}_i$ and $\tilde{x}_j$.
2. A base encoder $f$ that extracts the representation $h_i = f(\tilde{x}_i)$.
3. A projection head $g$ that maps representations to contrastive space, $z_i = g(h_i)$. Though it's possible to optimize directly on the representations, the contrastive loss may discard some valuable representation information (like color or orientation transformations) that aren't crucial for measuring similarity.
4. The contrastive loss that finds the corresponding $\tilde{x}_j$ for some $\tilde{x}_i$ among a set with negative samples $\{ \tilde{x}_k \}$.

![[20230406233236.png#invert|300]]

Specifically, we'll first define similarity as cosine similarity, 
$$
s(z_i, z_j) = z_i^\top z_j / (\Vert z_i \Vert \Vert z_j \Vert).
$$
 Then, we'll perform the following for multiple iterations:
1. Sample a minibatch of $N$ examples, then augment them to form $2N$ views. For each $\tilde{x}_i$, we'll treat the other $2(N-1)$ views as negative samples.
2. Optimize a temperature-scaled [[ℹ️ InfoNCE]] loss, 
$$
l(i, j) = -\log \frac{\exp\{ s(z_i, z_j) / \tau \}}{\sum_{k=1}^{2N} \mathbb{1}[k \neq i] \exp\{ s(z_i, z_k) / \tau \}}.
$$
