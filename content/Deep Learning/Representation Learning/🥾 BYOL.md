BYOL (bootstrap your own latent) is a [[📖 Representation Learning]] method that uses two neural networks that learn from each other rather than a contrastive objective. We have online and target networks; the former will be constantly updated, and the latter is a time-lagged version of the former.

![[20230406234731.png#invert|600]]

The online network, parameterized by $\theta$, consists of an encoder $f_\theta$, projector $g_\theta$, and predictor $q_\theta$. The target network the same architecture with different weights $\xi$; these weights are updated via Polyak averaging with $\theta$, $$\xi \leftarrow \tau\xi + (1-\tau)\theta.$$

A simple pretext task for representation learning would be to learn some representation and projection that predicts the output of another randomly initialized and fixed network. This doesn't result in good representations, however, so BYOL slightly modifies this objective: instead of a random target, we'll have our online network predict the projection (output) of the lagging target network—hence the "bootstrapping" in its name.

Formally, we have the following steps:
1. Get a sample image $x$ and form two views $v = t(x)$ and $v' = t'(x)$ via augmentations $t$ and $t'$.
2. Get a representation $y$ and projection $z$ from the online network and similarly $y'$ and $z'$ from the target network.
3. Output a prediction $q_\theta(z)$ for $z'$, and define the loss between normalized $\overline{q_\theta(z)}$ and $\bar{z}'$ as $$L = \Vert \overline{q_\theta(z)} - \bar{z}' \Vert_2^2 = 2 - 2 \cdot \frac{\langle q_\theta(z), z' \rangle}{\Vert q_\theta(z) \Vert_2 \cdot \Vert z' \Vert_2}.$$
4. Compute the "mirrored" loss $\tilde{L}$ by feeding $v'$ into the online network and $v$ into the target and performing the same steps above, then minimize this symmetric loss only for the online network, $$\theta \leftarrow \theta - \alpha \nabla_\theta (L + \tilde{L}).$$
5. Finally, update the target $\xi$ with Polyak averaging.

Theoretically, BYOL's framework is susceptible to collapse since both networks can predict a constant for all inputs. However, one insight into its empirical performance is that while the collapsed presentation is the minimum of our loss, the Polyak averaging updates for $\xi$ are not in the direction of $\nabla_\xi(L + \tilde{L})$; thus, we don't perform gradient descent on both $\theta$ and $\xi$ toward the global minimum, avoiding collapse.