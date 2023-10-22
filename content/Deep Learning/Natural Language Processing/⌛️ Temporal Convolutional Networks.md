Temporal convolutional networks (TCNs) is a class of networks that apply convolutions from [[👁️ Convolutional Neural Network]]s to sequence modeling. Our problem is to predict some sequence 
$$
y_0, \ldots, y_T = f(x_0, \ldots, x_T)
$$
 with a function $f$ and the causal constraint that $y_t$ depends only on $x_0, \ldots, x_t$.

To achieve this, we can apply 1D convolutions along the sequence's time dimension with padding to ensure that the intermediate and final layers have the same size as the input. Furthermore, in order to maintain the causal constraint, we can use causal convolutions that simply shift the convolution output to the farthest time in the convolution's window.

However, this naive approach has a receptive field that's solely defined by the depth of the network. To widen this field, we can use dilated convolutions defined as 
$$
(x *_d f)(s) = \sum_0^{k-1} f(i) \cdot x_{s-d \cdot i}
$$
 where $d$, our dilation factor, controls the "skips" in between the convolution input and $k$ is the convolution size. Moreover, to stabilize deep networks, we also use residual connections (from [[🪜 ResNet]]). Combining these enhancements with the ingredients above gives us the generic TCN architecture pictured below (dilated convolutions on left, residual connections in middle, and combining them on the right).

![[20230405215522.png#invert|600]]

Unlike [[💬 Recurrent Neural Network]]s, TCNs enforce a fixed history (input sequence) size and enable parallelism. One key advantage of this structure is that gradient are propagated through the hidden layers rather than through the temporal dimension, thus avoiding the RNN's infamous exploding and vanishing gradients.