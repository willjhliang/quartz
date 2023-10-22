EfficientNet is a procedural method to designing [[👁️ Convolutional Neural Network]] architectures; specifically, while landmark models like VGG or ResNeXt scaled depth and width, EfficientNet proposes to scale depth, width, and input resolution with a constant ratio.

The key observation is that we can scale depth $d$, width $w$, and resolution $r$ proportional to their effect on the network's FLOPS—$O(d)$, $O(w^2)$, and $O(r^2)$ respectively. If we let $\phi$ control our computational budget (with FLOPS proportional to $2^\phi$), the proposed compound scaling method sets: 
$$
\begin{align*} d = \alpha^\phi,\ w = \beta^\phi,\ r = \gamma^\phi \\ \text{such that } \alpha\cdot\beta^2\cdot\gamma^2 \approx 2 \text{ and } \alpha, \beta, \gamma \geq 1 \end{align*}
$$


$\alpha, \beta, \gamma$ are constants that can be found by grid search on the base network for some temporarily fixed $\phi$. Once they're set, we can easily scale up the hyperparameters by increasing $\phi$ to meet our budget.