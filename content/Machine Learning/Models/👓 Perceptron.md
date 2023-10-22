# Theory
Perceptrons are an online learning alternative to the [[🛩️ Support Vector Machine]]. We optimize a classifying hyperplane $w$, updating it if we get a prediction wrong and keeping it the same if we get a prediction right.

We update the plane by modifying its perpendicular vector to look more like the example $(x^{(i)}, y^{(i)})$ we get wrong. In other words, our update step is 
$$
w = w + \eta y^{(i)}x^{(i)}
$$
with a certain learning rate $\eta$.

Intuitively, we can see the new classification (assuming $\eta = 1$ for simplicity) as getting more positive or negative, depending on the class. 
$$
\begin{align*}w_{t+1}^\top x^{(i)} = w_t^\top x^{(i)} + \Vert x^{(i)} \Vert^2 > w_t^\top x^{(i)} &\text{ if $y^{(i)} = 1$} \\ w_{t+1}^\top x^{(i)} = w_t^\top x^{(i)} - \Vert x^{(i)} \Vert^2 < w_t^\top x^{(i)} &\text{ if $y^{(i)} = -1$}\end{align*}
$$


For linearly separable data and $\eta = 1$, the algorithm will converge after $<\frac{R^2}{\gamma^2}$ mistakes where $R = \max_i \Vert x^{(i)}\Vert_2$ (size of biggest $x_i$) and margin $\gamma \leq y^{(i)}w_*^\top x^{(i)}$, $w_*$ being the optimal classifier.

---
**Proof of Convergence**

We'll prove the convergence property for $\Vert x^{(i)} \Vert_2 \leq 1$ for all $i$. Then, the perceptron will convergence in $< \frac{1}{\gamma^2}$ steps.

First, note that we can assume that $\Vert w_* \Vert = 1$ since the optimal hyperplane is scale-invariant. Then, let $\theta$ be the angle between $w_t$ and $w_*$, and consider $\cos \theta = \frac{w_*^\top w_t}{\Vert w_t \Vert}$.

Let's say we got $x^{(i)}$ wrong at time $t$, so $y^{(i)}w_t^\top x^{(i)} < 0$. Then, we'll update $w_{t+1} = w_t + y^{(i)}x^{(i)}$, and consider the quantity for the numerator. 
$$
w_*^\top w_{t+1} = w_*^\top (w_t + y^{(i)}x^{(i)}) = w_*^\top w_t + y^{(i)}w_*^\top x^{(i)} \geq w_*^\top w_t + \gamma
$$

Next, let's see what happens to the square of the denominator. 
$$
\begin{align*} \Vert w_{t+1} \Vert^2 &= w_{t+1}^\top w_{t+1} \\ &= (w_t + y^{(i)}x^{(i)})^\top (w_t + y^{(i)}x^{(i)}) \\ &=w_t^\top w_t + 2y^{(i)}w_t^\top x^{(i)} + {y^{(i)}}^2{x^{(i)}}^\top x^{(i)} \\ &\leq \Vert w_t \Vert^2 + \Vert x^{(i)} \Vert^2 \text{ since $y^{(i)}w_t^\top x^{(i)} < 0$ and ${y^{(i)}}^2 = 1$} \\ &\leq \Vert w_t \Vert^2 + 1\end{align*}
$$


Over $T$ time-steps, we have $w_*^\top w_{T+1} \geq \gamma T$ and $\Vert w_{T+1} \Vert^2 \leq T$. Putting them together, 
$$
\frac{w_*^\top w_{T+1}}{\Vert x_{T+1}\Vert} \geq \frac{\gamma T}{\sqrt{T}} = \gamma \sqrt{T}
$$


However, the maximum value for cosine is $1$, so 
$$
1 \geq \gamma\sqrt{T} \rightarrow T \leq \frac{1}{\gamma^2}
$$


---

If the data is not linearly separable, the simple perceptron will keep updating $w$, we can need to manually stop training. After stopping, there are variations in the way we get our final model.
1. Voted perceptron: keep track of all intermediate models, predict the majority vote of running input $x$ through all models
2. Averaged perceptron: final model is average of all intermediate models, essentially an approximation of voted perceptron that has much faster prediction times

We can also apply the [[🍿 Kernel]] trick to the perceptron. Note that due to our update rule, our weights $w$ will always be a linear combination of $x$. Then, if we let $w = \alpha_jx_j$, we can replace all instances of $w^\top x$ with $\sum_{j=1}^n \alpha_j x_j^\top x$ so that everything is in terms of inner products between inputs. Then, we replace $x_j^\top x$ with $k(x_j, x)$ to achieve the kernelized perceptron.

A nuanced variation is the Margin-Infused Relaxed Algorithm (MIRA), a type of passive-aggressive perceptron that which minimizes the hinge loss at each observation. It updates $w$ to be as close as possible to the old weights while setting hinge loss to $0$ (in case of misclassification or correct prediction within the margin); in other words, it makes the smallest change to $w$ for a correct prediction outside the margin.

# Model
Same as SVM, we maintain a hyperplane $w$ that splits the $x$ space, classifying each side. We update the hyperplane with learning rate $\eta$, which we can configure to be different for different loss functions; the passive-aggressive perceptron, for example, uses it to optimize hinge loss.

# Training
Given training data $D$, randomly initialize hyperplane $w$.

While $w$ incorrectly classifies datapoints in $D$, for each $x^{(i)}, y^{(i)}$,
1. Predict $\hat{y} = sign(w^\top x^{(i)})$.
2. If $\hat{y} \neq y_i$, update 
$$
w = w + \eta y^{(i)}x^{(i)}
$$


> [!info]
> For a multi-class perceptron, in case of a wrong class prediction, we update both the weights for the correct and incorrect classes; the former adds $\eta x^{(i)}$ while the latter subtracts it.

For simple perceptrons, $\eta = 1$; with passive-aggressive perceptrons, 
$$
\eta = L(w \vert x_i, y_i) / \Vert x_i\Vert^2
$$
where $L$ is the hinge loss $L(w \vert x_i, y_i) = \max(0, 1 - y_iw^\top x_i)$.

# Prediction
As with SVM, given input $x$, our prediction is $\hat{y} = sign(w^\top x)$.