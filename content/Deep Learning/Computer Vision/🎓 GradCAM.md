GradCAM is a technique for explaining the output of a vision system by checking the gradients in the [[👁️ Convolutional Neural Network]] layers to produce a localization of the output—a heatmap explaining which part of the image most contributed to the output.

![[20230402181143.png#invert|600]]

The key idea is that for some target class $c$, we can compute the gradient of the score $y^c$ (pre-softmax) with respect to a layer's feature map activations $A^k$. We can then weigh the feature maps by this gradient to get the localization map. Formally, we compute importance weights via global average pooling, 
$$
\alpha_k^c = \frac{1}{Z} \sum_i \sum_j \frac{\partial y^c}{\partial A^k_{ij}},
$$
 and compute the localization for a class as 
$$
L^c = \text{ReLU}\left(\sum_k \alpha_k^c A^k\right).
$$


Intuitively, $\alpha_k^c$ is high when $A^k$ strongly influences the output; that is, if we change $A^k$, $y^c$ will change a lot. Therefore, multiplying the averaged gradient with these features gives us a signal for how the activations affect our output—positive for parts that contribute to the target and negative otherwise. After the weighted sum, we take the ReLU to filter out any negative influences, reducing noise and leaving only strong positive signals from the activations.

![[20230402181956.png#invert|600]]

# Applications
GradCAM is an extremely versatile technique that can be used for a variety of applications in prediction and interpretation.
1. Weighting guided backpropagation with GradCAM weights gives us more localized pixel-wise explanations (Guided GradCAM).
2. Taking the negative of the gradients for the weights gives us counterfactual localization—regions which, if removed, would increase confidence for our target.
3. Combining GradCAM output with weakly-supervised methods can give localization bounding boxes or segmentation masks.
4. Visualized localizations can be used to increase trust, debug failure modes, and find biases.