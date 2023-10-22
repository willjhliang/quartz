Deep Learning is a subfield of [[🤖 Machine Learning]] that focuses on neural networks, which model complex non-linear functions using certain structures and layer types.

# Models
There are many distinct models that capture different assumptions about the data. As such, each have their own advantages and disadvantages in modeling a discriminative or generative distribution.
1. [[🕸️ Multilayer Perceptron]] for general data, usually tabular with no dependencies.
2. [[👁️ Convolutional Neural Network]] with spatial translation (2D) invariance for vision.
3. [[💬 Recurrent Neural Network]] for sequential translation (1D) for text or audio.
4. [[🤝 Graph Neural Network]] for graphical structures like molecules or social nets.
5. [[🦾 Transformer]] for capturing inter-and-intra-sequence (1D) dependencies.
6. [[🎱 Neural ODE]] for modeling continuous hidden states, generally for probabilities.

## Enhancements
Building on top of these basic structures, there are general architectures and techniques that can typically be applied to a variety of domains.
1. [[🪜 ResNet]]s introduce residual connections in MLPs that allow for increased model depth and complexity.
2. [[🧬 Autoencoder]]s form an encoder-decoder framework for dimensionality reduction and latent space modeling.
3. [[🚨 Attention]] is used for weighted hidden calculations to capture dependencies.

# Domains
There are a variety of domains that have specialized literature. The two biggest ones are computer vision and natural language processing, dealing with 2D/3D and 1D data respectively.

## Computer Vision
Computer vision tasks deal with image data, generally using some form of the [[👁️ Convolutional Neural Network]]. The following are some landmark vision techniques.

**Object Detection**
1. [[🍀 YOLO]] performs object detection in a single pass through a CNN.
2. [[👟 Faster R-CNN]] uses a region proposal network and detector to decouple the localization and classification tasks.
3. [[📦 DETR]] predicts a fixed number of bounding boxes via a transformer.

**Segmentation**
1. [[🔭 Fully Convolutional Network]]s are commonly used for dense predictions; one landmark paper successfully trains it for semantic segmentation.
2. [[👺 Mask R-CNN]] augments Faster R-CNN with a mask branch for instance segmentation.

**Synthetic Generation**
1. [[🖼️ Generative Adversarial Network]]s train a generator and discriminator on an adversarial loss for the generator to produce realistic samples.
2. [[✨ StyleGAN]] improves on the original generator architecture by adapting ideas from style-transfer, which results in significantly stronger disentanglement.
3. [[♻️ CycleGAN]] is a GAN variant designed for domain transfer.
4. [[🎧 NCSN]] and [[🧨 Score SDE]] model the score of the data distribution via multiple noise levels and samples by moving up the score.
5. [[🕯️ Diffusion Probabilistic Model]]s generates sample from a data distribution by learning a denoising process.

**Reconstruction**
1. [[🌞 NeRF]] is a 3D modeling technique that models the density and color of points in space. NeRFs output images via rendering techniques.
2. [[💺 Occupancy Network]]s model the occupancy (existence probability) of each point in space and allow for complete 3D inference.

**Miscellaneous**
1. [[👀 Group Equivariant CNN]] generalizes the convolution operation for translation, rotation, and reflection invariance.
2. [[🎾 PointNet]] and [[🏐 PointNet++]] processes unordered point input and guarantees permutation invariance.
3. [[🦿 Vision Transformer]]s adapt the transformer architecture to images by converting input images to a sequence of patches.
4. [[🎊 ConvNeXt]] is a pure CNN model designed to mimic techniques from vision transformers.

## Natural Language Processing
Natural language processing works with sequential data, commonly sentences or audio, with [[💬 Recurrent Neural Network]]s or [[🦾 Transformer]]s.
1. [[🧵 Seq2Seq]] is an encoder-decoder architecture for sequence translation.
2. [[🎥 Long Short-Term Memory]] and [[⛩️ Gated Recurrent Unit]]s are RNN architectures designed to maintain memory of past information in long sequences.
3. [[⌛️ Temporal Convolutional Networks]] apply 1D convolutions for sequence modeling.