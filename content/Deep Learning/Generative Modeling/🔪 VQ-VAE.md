VQ-VAE is a quantized [[🖋️ Variational Autoencoder]] that uses discrete latent variables trained via vector quantization (VQ). We maintain a codebook containing embedding vectors $e_i \in \mathbb{R}^D$; for a given continuous variable $z = z_e(x)$ from the encoder, we set it to the closest embedding vector, 
$$
z_q(x) = e_k \text{ where } k = \arg\min_j \Vert z_e(x) - e_j \Vert_2.
$$
 This gives us the posterior distribution: 
$$
q(z=k\vert x) = \begin{cases} 1 & \text{for $k = \arg\max_j \Vert z_e(x) - e_j \Vert_2$} \\ 0 & \text{otherwise} \end{cases}
$$


Our quantized $z_q(x)$ is then passed through the decoder $p(x \vert z_q)$, which aims to reconstruct our input $x$.

![[20230324145442.png#invert|600]]

# Training
To train this system, we need to not only optimize the encoder and decoder but also the embedding codebook—the embedding vectors should be set to accurately quantize the encoding. Thus, we have reconstruction loss, the VQ objective (which moves embedding vectors $e$ closer to encoder output $z_e(x)$), and commitment loss (to move encoder output toward embedding vectors, preventing divergence): 
$$
L =\log p(x \vert z_q(x)) + \Vert \text{sg}[z_e(x)] - e \Vert_2^2 + \beta\Vert z_e(x) - \text{sg}[e] \Vert_2^2
$$
 where $\text{sg}[]$ is the stop-gradient operator.

Also, since it's impossible to mathematically pass the decoder gradient past the quantization step to the encoder, we approximate it by simply copying the gradient over, skipping the quantization step.