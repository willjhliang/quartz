StyleGAN improves on the generator design of a standard [[🖼️ Generative Adversarial Network]] by incorporating ideas from style-transfer. Specifically, we introduce an intermediate latent space $\mathcal{W}$ that we can interpret as the style code. The motivation behind this change is that by introducing $\mathcal{W}$ and injecting it into the generative process multiple times, we have better control over the style of the image compared to sampling a seed $z \in \mathcal{Z}$ at the start of generation.

To create this intermediate space, we use two models (trained end-to-end): the mapping network $f$ maps $z \in \mathcal{Z}$ to $w \in \mathcal{W}$, and the synthesis network $g$ generates the image.

![[20230315205323.png#invert|300]]

Notably the synthesis network doesn't take $w$ as input. Rather, it starts from random input and injects $w$ in four stages via adaptive [[✂️ Normalization#Instance Normalization]] (AdaIN). AdaIN first normalizes its input, then manipulates it by a scaling factor $y_{si}$ and bias factor $y_{bi}$ that we derive from a learned affine transformation $A$ of our style code $w$. Formally, for a feature-map $i$, $$\text{AdaIN}(x_i, y) = y_{si} \frac{x_i - \mu(x_i)}{\sigma(x_i)} + y_{bi}.$$

We also inject noise into the synthesis, each scaled by a learned factor $B$, that controls stochastic image details like the curls in hair.

# Disentanglement
The core contribution of this architecture is successful disentanglement across stochastic features (via noise injections) and style (via style injections). Moreover, this network also disentangles different scales of styles—since AdaIN normalizes its input before applying the style, previous applied styles aren't considered in later injections.

![[20230315210457.png#invert]]

For example, in the picture above, we can take latent codes that generated source A and source B, then mix the styles together. Coarse, middle, and fine styles (injected from early to later in the network) capture a different range of scales from the head position and age to the hair color.

Another key disentanglement is between different style dimensions—age and gender, for example. The authors hypothesize that if our data distribution isn't uniform—missing some combination of dimensions—our mapping from the latent code $z$ to features will cause entanglement. This problem is illustrated below when we try to contort the first L-shaped distribution to the circular uniform distribution.

![[20230315210809.png#invert|400]]

If we use an intermediate $\mathcal{W}$ instead, the mapping network $f$ can learn to "un-warp" this distortion. Crucially, since $f$ is learned, it allows us to sample from an arbitrary distribution rather than a fixed one (as with $\mathcal{Z}$). Thus, we can largely avoid the entanglement effects from contorting to a fixed circle.