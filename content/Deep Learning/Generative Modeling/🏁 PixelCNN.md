PixelRNN and PixelCNN are explicit density generative models that use the chain rule to capture the image data likelihood, $$p_\theta(x) = \prod_{i=}^n p_\theta(x_i \vert x_1, \ldots, x_{i-1}).$$ Since we can analytically compute this density, we can optimize the model by directly maximizing the density over our dataset.

# Pixel RNN
Pixel RNN orders the pixels starting from the upper-left corner and moves down the diagonal. Sequential generation using a [[💬 Recurrent Neural Network]] was thus possible by conditioning on the previously generated pixels. However, the training and generation process was slower than CNN methods since it operated diagonal-by-diagonal.

# Pixel CNN
Pixel CNN partially fixes this inefficiency by using a [[👁️ Convolutional Neural Network]] with a specialized convolutional operation that only looks at previously generated pixels. Since we know all the pixels during training, the sequential nature can be parallelized with masks. However, during generation, we still proceed sequentially.

![[20230219180701.png#invert|300]]