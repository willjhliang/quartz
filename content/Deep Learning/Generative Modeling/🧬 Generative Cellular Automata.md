Generative cellular automata (GCA) is a 3D reconstruction method that takes inspiration from [[🏁 PixelCNN]] to "grow" a conditioned 3D model in voxel space. Like its namespace, the cellular automata, this model mutates states based on rules based on a Markov Chain.

Formally, we can represent a 3D shape in voxel space as $s = \{ c_1, \ldots, c_k \}$, a set of occupied cells $c \in \mathbb{Z}^3$. Then, to generate a shape, we follow the process $$s_0 \sim p_0,\ s_{t+1} \sim p_\theta(s_{t+1} \vert s_t).$$ Within each transition, we assume independence across occupancies and generate the next state as with local updates, $$p_\theta(s_{t+1} \vert s_t) = \prod_c p_\theta(c \vert s_t).$$ Specifically, we apply convolutions onto each $c \in s_t$ to get probabilities for its neighboring voxels, $p_\theta(N(c) \vert s_t)$. After this, the product above goes through all neighbors and samples using the cell-wise average of the predicted probabilities.

![[20230401153255.png#invert|600]]

To train our transitions, we seek to maximize $$p_\theta(x \cap N(s_t) \vert s_t),$$ the probability that our next generation (within the reachable neighborhood $N(s_t)$) is close to $x$. However, naively optimizing this using the sampling method above runs into difficulties since we might have $x \not\subset N(s)$. The solution is to sample from an infusion chain instead during training, $$s_0 \sim q_0(s_0 \vert x),\ q_t(s_{t+1} \vert s_t ,x) = \prod_c (1-\alpha_t)p_\theta(c \vert s_t) + \alpha_t \delta_x(c)$$ where $\delta_x(c) = \mathbb{1}[c \in x]$ encourages the sampling to get closer to $x$. By "pushing" our current shape toward the desired one, we can then maximize our next-generation probability above.

# Continuous GCA
We can combine GCA with an encoder and decoder to form continuous GCA (cGCA), which generates smooth surfaces with an implicit function. Specifically, the encoder encodes the input into a voxel latent representation; the GCA completes the shape, which is now defined with both occupancy and latent codes $s = \{ (c, o_c, z_c) \}$, and the decoder predicts occupancy for a query point $q$ conditioned on the latents, $f(s, q)$.

![[20230401153351.png#invert|600]]