# AutoSDF
AutoSDF first learns an encoding of complete models in a quantized latent space using [[🔪 VQ-VAE]] with a patch-wise encoder and global decoder. This latent space distribution is then modeled by a non-sequential transformer—autoregressive modeling on randomized sequence orderings.

For conditional generation, we encode the input into partial latents, complete the sequence with our transformer, then decode with VAE.

![[20230401153032.png#invert|600]]
![[20230401153043.png#invert|600]]

# SLIDE
Sparse latent point diffusion model (SLIDE) performs controlled mesh generation via two key observations:
1. It's much easier to generate point clouds first, then convert them to meshes.
2. A dense point cloud can be generated in the latent space, then decoded.

Following these two ideas, SLIDE uses an encoder and decoder to convert between point clouds and a sparse latent point cloud representation; for reconstruction, the sparse latent point clouds go through diffusion to generate the full object.

The latent representation consists of "key" points, found via farthest point sampling, and their associated features that define the local geometric area. To diffuse a full shape, we train a DDPM to learn the latent point location and another DDPM to learn their features.

![[20230401150754.png#invert|800]]

# Triplane Diffusion
Triplane diffusion models a shared occupancy field that takes tri-plane projections as input, 
$$
o(x) = g(f_{XY}(x), f_{YZ}(x), f_{ZX}(x)).
$$
 These tri-planes and MLP $g$ are optimized by (enhanced) reconstruction loss on complete point cloud data.

We can then train a [[🕯️ Diffusion Probabilistic Model]] on the tri-plane features, which gives us shape generation.

![[20230401153116.png#invert|600]]

# ShapeFormer
ShapeFormer performs conditional generation by encoding points into a quantized sequence with an autoencoder called VQDIF, completes the sequence with transformer (predicting from scratch, conditioned on partials), and decodes into an occupancy field.

The VQDIF encoder converts the point cloud into a feature grid with local-pooled PointNet, flattens it into a sequence in row-major order, and compresses the features with vector quantization using a codebook. The decoder takes projects the sequence into the grid and decodes it into an occupancy network through a 3D U-Net.

![[20230401153210.png#invert|600]]