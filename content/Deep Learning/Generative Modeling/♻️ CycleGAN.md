CycleGAN modifies the [[🖼️ Generative Adversarial Network]] game to facilitate domain transfer, pairing samples from one distribution to samples from another. To do this, we learn two generative models $G$ and $F$; the former maps from distribution $X$ to distribution $Y$, and the latter goes backwards. We also train two discriminators $D_Y$ and $D_X$.

![[20230301195445.png#invert|200]]

The key idea is that if we go from $X$ to $\hat{Y}$, we should be able to go back from $\hat{Y}$ to $X$. This defines our cycle consistency loss $$\mathbb{E}_X[\Vert F(G(X)) - X \Vert_1] + \mathbb{E}_Y [\Vert G(F(Y)) - Y \Vert_1],$$ which we add onto the standard GAN losses for $F, D_X$ and $G, D_Y$.

# StarGAN
If we want to go between multiple domains, it would be inefficient to train so many generators and discriminators based on the CycleGAN structure. StarGAN addresses this limitation by training a single generator that can translate between any two domains.

To do this, our generator $G(x, c)$ takes in both the source image $x$ and the target main label $c$ to generate output $y$. Our discriminator $D(x)$ will predict $D_{src}(x)$ and $D_{cls}(x)$, the former for discriminating between real and fake images and the latter to predict which domain $x$ belongs to.

Our overall loss then consists of three parts: adversarial, domain classification (split into real and fake examples), and reconstruction.
1. $$L_{adv} = \mathbb{E}_{x \sim p_{data}} [\log D_{src}(x)] + \mathbb{E}_{x, c}[\log (1 - D_{src}(G(x, c)))]$$
2. $$L_{cls}^r = \mathbb{E}_{x, c' \sim p_{data}} [-\log D_{cls}(c' \vert x)], \ L_{cls}^f = \mathbb{E}_{x, c}[-\log D_{cls}(c \vert G(x, c))]$$
3. $$L_{rec} = \mathbb{E}_{x, c, c'}[\Vert x - G(G(x, c), c')\Vert_1]$$

The discriminator is trained to minimize a combination of negative $L_{adv}$ and $L_{cls}^r$, and our generator is trained to minimize a combination of $L_{adv}$, $L_{cls}^f$, and $L_{rec}$.