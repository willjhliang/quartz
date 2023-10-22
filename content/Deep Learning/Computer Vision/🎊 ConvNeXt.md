# Theory
[[🦿 Vision Transformer]]s perform exceptionally well on vision tasks, often surpassing [[👁️ Convolutional Neural Network]]s as the state-of-the-art model.

ConvNeXt uses standard CNN techniques to mimic strategies from transformers that allowed them to become the new cutting-edge model. In doing so, it finds that convolutions are still competitive and necessary and shows that heavily modified [[🪜 ResNet]] can compete with the top transformers.

# Model
Starting with ResNet-50, we apply multiple transformer-inspired changes to create ConvNeXt.
1. Change optimizer to AdamW and include modern data augmentation and regularization schemes.
2. Modify the number of layers per block to match Swin transformers, changing from (3, 4, 6, 3) to (3, 3, 9, 3).
3. Switch the stem (input processing) block with a "patchify" layer using 4-by-4 convolutions with stride 4.
4. Use depth-wise convolutions (group convolutions from [[🪜 ResNet#ResNeXt]] with number of groups equal to input depth) and 1-by-1 convolutions to simulate self-attention.
5. Use inverted bottlenecks in each ResNeXt block, inspired by the large hidden dimension in transformers' MLP block.
6. Increase kernel-size to mimic Swin windows and move up the depth-wise convolution (for computational efficiency).
7. Replace ReLU with GeLU, reduce the number of activation functions and normalization layers, and replace batch normalization with layer normalization to match transformers.
8. Separate out downsampling layers, using 2-by-2 convolutions with stride 2, akin to the patch merging layer in the Swin transformer.