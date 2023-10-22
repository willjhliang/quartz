unCLIP (deployed as DALL-E 2) is a text-to-image generation framework that utilizes the embeddings from [[🍌 CLIP]]. Its primary contribution is a decoder that reverses the process of CLIP's image encoder, hence the name.

![[20230309223811.png#invert]]

Though we can directly train a [[🕯️ Diffusion Probabilistic Model]] conditioned on the text embedding, unCLIP uses a two-stage process instead for more advanced functionality:
1. First, a prior generates the CLIP image embedding from the text embedding (which we can get from the CLIP text encoder).
2. Second, the decoder generates an image using the image embedding.

Both of these stages were implemented as diffusion models conditioned on the input (via classifier-free guidance), though the authors also evaluated an [[🕰️ Autoregressive Model]] for the prior.

# Manipulations
The core functionality of unCLIP is its ability to generate images from natural language captions—the pipeline was designed for this purpose. However, there are some other more subtle techniques as well.
1. Variation: we can generate variations of the same caption by using DDIM sampling with higher noise scales $\eta$. The higher $\eta$ is, the more stochastic our generation process becomes.
2. Interpolation: blending two images together can be done by moving across the CLIP image embeddings via spherical interpolation.
3. Diffs: we can modify an image from a text command by moving the text embedding in the direction of the command and then generating the image embedding and image using the prior and decoder.

Samples from variation, interpolation, and text diffs are below:
![[20230309224654.png#invert|400]]

![[20230309224643.png#invert]]

![[20230309224715.png#invert]]