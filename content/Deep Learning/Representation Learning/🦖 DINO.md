DINO is a self-supervised pre-training framework that extends pre-training ideas from natural language processing (like in [[🧸 BERT]]) to vision. It performs knowledge distillation with no labels, using a student-teacher setup where the teacher is based off the student.

Formally, we have a student with parameters $\theta_s$ and teacher with $\theta_t$. Given an input, both networks output a probability distribution defined via softmax, 
$$
P(x) = \frac{\exp \{ g_\theta(x) / \tau \}}{\sum_{k=1}^K \exp \{ g_\theta(x) / \tau \}}.
$$
 In order for the two networks to learn meaningful semantics, we give them different data: for an image $x$, we create two global views and several local views, giving everything to the student and only the global views to the teacher. The goal is for both networks to predict the same probabilities by minimizing 
$$
\sum_{x \in x_{global}} \sum_{x' \in x_{all}} H(P_t(x), P_s(x')).
$$
 In other words, we want the student to output the same probabilities as the teacher, even with a local view of the original image.

![[20230401192530.png#invert|300]]

Both networks use the same architecture $g$ (consisting of a general backbone and projection head), but their weights are different. $\theta_s$ is learned via gradient descent from the loss above, and $\theta_t$ is updated with the student parameters via an exponential moving average 
$$
\theta_t \leftarrow \lambda \theta_t + (1-\lambda)\theta_s.
$$
 Note that this formulation is similar to [[🐼 MoCo]]'s momentum encoder, but this setup doesn't use a queue or contrastive objective. Also, to avoid collapse, we perform centering and sharpening the teacher's outputs; that is, we maintain a center $c$, also updated via EMA 
$$
c \leftarrow mc + (1-m) \frac{1}{B}\sum_{i=1}^B g_{\theta_t}(x^{(i)})
$$
 that's applied to the output prediction and also set up a low temperature $\tau_t$ for sharpening. The former avoids collapse from a dominant dimension by encouraging a uniform output, and the latter avoids collapse from uniformity, essentially the reverse.

Using a [[🦿 Vision Transformer]] as the backbone for $g$, DINO pre-training learns semantically meaningful segmentations in the self-attention masks. Moreover, simple [[🏠 K-Nearest Neighbors]] with the features yields strong performance on ImageNet classification.

![[20230401193533.png#invert|600]]