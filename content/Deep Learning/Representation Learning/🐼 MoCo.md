MoCo (momentum contrast) is an unsupervised representation learning technique for images. We can generalize contrastive learning to the task of training some encoder $f$ for a dictionary look-up: given an encoded query $q = f(x_q)$ and encoded keys $k_i = f(x_{k_i})$ of the dictionary, find the correct match (positive key) $k_+$ for $q$. In MoCo, the correct match is the key image that came from the same source image as the query (after augmentation).

![[20230331231113.png#invert|200]]

To find the match, our goal is to make $q$ and $k_+$ more similar than $q$ and any other $k_i$. Measuring similarity with the dot product, we can achieve this by minimizing the [[ℹ️ InfoNCE]] loss, 
$$
L = -\log \frac{\exp \{ q \cdot k_+ / \tau \}}{\sum_{i=0}^K \exp \{ q \cdot k_i / \tau \}}
$$
 where $\tau$ is a temperature parameter.

A standard training method would be to sample a minibatch and minimize this loss by picking each item in the minibatch to be positive and set the rest to be negative. However, if we can compare the positive with more negative samples, our training would be more stable.

MoCo introduces a queue that represents our dictionary $\{ k_i \}$, effectively decoupling a minibatch from the dictionary. When we sample a new minibatch, everything's enqueued, and old keys are popped. The entire queue is used in the loss computation, thereby increasing the number of negative samples we compare to.

Another innovation is that $f$ can be different for queries and keys. We'll have a key encoder $f_k$ and query encoder $f_q$; $f_q$ can directly be trained via backpropagation, but since our queue can be very large, we can't compute the gradient for each negative sample to optimize $f_k$. Other works have set $f_k = f_q$, but this yields poor results since in our setting, the encoder's updates are making the encoded keys too inconsistent. Alternatively, for $f_k$, we can use a momentum update, 
$$
\theta_k \leftarrow m\theta_k + (1-m)\theta_q,
$$
 effectively making $f_k$ "lag" behind $f_q$, maintaining stability.