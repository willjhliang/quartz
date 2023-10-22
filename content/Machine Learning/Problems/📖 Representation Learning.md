Representation learning studies how we can train models to learn a semantically-meaningful representation embedding of the input data. That is, given some inputs (most commonly images), we want to "compress" it into some form that preserves its meaning. Representations learned in this manner can then be adapted for any task by predicting the desired target using these representations rather than directly from the input.

Representations are generally learned via self-supervised learning, either with "pretext" tasks or contrastive objectives.

# Pretext Tasks
Many self-supervised methods train a model in a supervised manner by augmenting the unlabeled dataset to artificially create pretext tasks. Some examples are as follows:
1. For each image, form distorted variants via translation, rotation, scaling, or color shifts and learn to classify the distorted variants to their original.
2. Rotate images randomly and learn to rotate them back to the original.
3. Crop two patches from an image and learn to associate their relative spatial relationships. Similarly, we can also divide the image into patches, randomize their order, and learn to un-shuffle them back to their canonical positions.
4. Recover the original image from a grayscale variant (known as colorization).

Other more advanced techniques take inspiration from [[🎨 Generative Modeling]] to learn a model that can generate parts of the input image:
1. Denoising autoencoder: given an image corrupted by noise, recover the original.
2. Context encoder: given an image with a missing patch, recover the original.
3. Split-brain autoencoder (pictured below): predict complementary missing color channels using two sub-networks.

![[20230406105430.png#invert|400]]

If we have video data, we can take advantage of the temporal relationships between frames for more powerful self-supervised tasks. Many of these tasks resemble contrastive objectives below.
1. Given patches of the same object at different times and a random third patch, learn an embedding that makes the similar patches closer than with the third.
2. Determine which sequence of frames is in the correct or incorrect temporal order.
3. Predict a video's arrow of time (whether it's playing forward or backward).
4. Colorize videos by tracking pixels across frames (via embedding similarity) and coloring a new frame with tracked pixels from the former frame.

# Contrastive Objectives
Rather than learning some pretext task, which might cause our features to be specialized toward that task, we can learn some general embedding space with a notion of "similarity" between samples. Contrastive objectives learn this space by attracting similar samples and repelling different ones.
1. Contrastive loss: the standard contrastive loss seeks to minimize distances between samples with the same label and maximizes distances between those with different labels: $$L(x^{(i)}, x^{(j)}) = \begin{cases} \Vert f_\theta(x^{(i)}) - f_\theta(x^{(j)}) \Vert_2^2 & \text{if } y^{(i)} = y^{(j)} \\ \max(0, \epsilon - \Vert f_\theta(x^{(i)}) - f_\theta(x^{(j)}) \Vert_2)^2 & \text{if } y^{(i)} \neq y^{(j)}  \end{cases}$$ For dissimilar pairs, we define hyperparameter $\epsilon$ to lower bound the dissimilarity distance.
2. Triplet loss: rather than comparing pairs, we can compare an "anchor" with "positive" and "negative" samples, seeking to attract positives and repel negatives with $$L(x, x^+, x^-) = \max(0, \Vert f(x) - f(x^+) \Vert_2^2 - \Vert f(x) - f(x^-) \Vert_2^2 + \epsilon).$$
3. Lifted structured loss: we can check all possible pairs in a batch; for positive pairs $P$ and negative pairs $N$ and distance $D_{ij} = \vert f(x^{(i)}) - f(x^{(j)}) \vert_2$: $$\begin{align*} L &= \frac{1}{2 \vert P \vert} \sum_{(i, j) \in P} \max (0, L(i, j))^2 \\ L(i, j) &= D_{ij} + \max \left( \max_{(i, k) \in N} (\epsilon - D_{ik}), \max_{(j, l) \in N}(\epsilon - D_{jl}) \right)\end{align*}$$ In practice, the nested max operations can be relaxed to a soft maximum for smoother optimization, $$L(i, j) = D_{ij} + \log \left( \sum_{(i, k) \in N} \exp \{ \epsilon - D_{ik} \} + \sum_{(j, l) \in N} \exp \{ \epsilon - D_{jl} \} \right).$$
	
	![[20230406130932.png#invert|300]]

4. Multi-class $N$-pair loss: we can generalize the triplet loss to push multiple classes at once. For $\{ (x_i, x_i^+) \}$ be pairs of samples from $N$ classes with embeddings $f_i, f_i^+$, we have $$L(\{ (x_i, x_i^+)\}) = \frac{1}{N} \sum_{i=1}^N \log \left( 1 + \sum_{j \neq i} \exp \{ f_i^\top f_j^+ - f_i^\top f_i^+ \} \right).$$ Note that the inner product is essentially the inverse of a distance norm; the more similar the two embeddings are, the larger their inner product.
5. [[ℹ️ InfoNCE]]: framing contrastive learning in the context of maximizing mutual information between similar samples, we can derive the InfoNCE loss over a set $X$ containing one positive $x^+$ and $N - 1$ negative $x^-$, $$L(X) = -\mathbb{E}_{X \sim p(X)}\left[ \log \frac{f(x^+, c)}{\sum_{x^- \in X} f(x^-, c)} \right].$$