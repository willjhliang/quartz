# Theory
Assuming that our binary-labeled data has a linear split, we can classify data points by dividing them with a hyperplane defined by 
$$
w^\top x + b = 0
$$
Points on one side of the hyperplane belong to one class, and those on the other side belong to the other class.

There are many different planes that can divide up the data, but the best one maximizes the margin, the minimum distance from a point to the hyperplane. The datapoints that lie on the margin are called support vectors.

> [!info]
>Technically, support vectors are points that aren't in the correct side of the line past the margin. Misclassified points are also considered support vectors.

Since the overall scale of the data doesn't affect the hyperplane, SVM solves with the scaling constraint that 
$$
y^{(i)}(w^\top x^{(i)} + b) \geq 1
$$
Note that this inequality turns into a equality for support vectors.

The size of the margin is then solely dependent on the hyperplane and can be calculated to be $\frac{2}{\Vert w \Vert}$. To maximize this value, our objective, known as the separable primal problem, is 
$$
\min_{w, b} \frac{1}{2} \Vert w\Vert^2 \text{ such that } y^{(i)}(w^\top x^{(i)} + b) \geq 1
$$


Our constraints satisfy the strong duality conditions, so we can use [[👠 Constrained Optimization]] to solve for $w$. Applying the augmented Lagrangian and solving for the Lagrange dual, we can transform this into the separable dual form 
$$
\max_{\alpha \geq 0} \sum_{i=1}^n \alpha_i - \frac{1}{2} \sum_{i=1}^n\sum_{j=1}^n \alpha_i \alpha_j y^{(i)} y^{(j)}(x^{(i)} \cdot x^{(j)}) \text{ such that } \sum_{i=1}^n\alpha_iy^{(i)} = 0
$$
 where weights $w = \sum_{i=1}^n\alpha_iy_ix_i$ and bias $b = y^{(i)} - w^\top x^{(i)}$ for $\alpha_i > 0$.

> [!note]
> By the KKT condition, one of $\alpha_i$ or $y^{(i)}(w^\top x^{(i)}+b)$ must be $0$. Therefore, the data points with nonzero $\alpha_i$ are support vectors.

This equation tells us that the hyperplane is solely dependent on the similarity between pairs $x^{(i)}$ and $x^{(j)}$. Currently, this similarity is measured by the dot product, but we can instead replace it with a [[🍿 Kernel]] to achieve the kernelized separable dual 
$$
\max_{\alpha \geq 0} \sum_{i=1}^n \alpha_i - \frac{1}{2} \sum_{i=1}^n\sum_{j=1}^n \alpha_i \alpha_j y^{(i)} y^{(j)}k(x^{(i)}, x^{(j)}) \text{ such that } \sum_{i=1}^n\alpha_iy^{(i)} = 0
$$

that can separate linearly inseparable data.

If we don't need to perfectly separate the data, the above algorithms will not converge if there's no perfect separation. In this case, the non-separable SVM introduces the slack variable 
$$
\xi_i = \max(0, 1 - y^{(i)}(w^\top x^{(i)} + b))
$$
which we can interpret as the amount that $x^{(i)}$ goes into the margin or the penalty on low-confidence classifications.

Adding it to the primal problem, we get a softer constraint 
$$
\min_{w, b} \frac{1}{2} \Vert w \Vert^2 + C\sum_{i=1}^n\xi_i \text{ such that } \ y^{(i)}(w^\top x^{(i)} + b) \geq 1 - \xi_i
$$


This form can be interpreted as minimizing the hinge loss, defined as $\sum_i \xi$, while applying $L_2$ regularization to the weights $w$. $C$ controls for the strength of the constraint or the degree of regularization.

This form of the primal can be generalized with different [[📌 Norm]]s so that $\Vert w \Vert^2$ is $\Vert w\Vert_p^p$ and $\xi_i$ is $\Vert \xi_i\Vert_q^q$.

In the non-separable dual, we have an additional upper bound on $\alpha_i$, 
$$
\max_{\alpha \geq 0} \sum_{i=1}^n \alpha_i - \frac{1}{2} \sum_{i=1}^n\sum_{j=1}^n \alpha_i \alpha_j y^{(i)} y^{(j)}(x^{(i)} \cdot x^{(j)}) \text{ such that } \sum_{i=1}^n\alpha_iy^{(i)} = 0, \alpha_i \leq C
$$


# Model
The model itself consists of weights $w$ and bias $b$, which represent the hyperplane used to split the $x$ space.

# Training
Training method was not covered in class, but algorithms like sequential minimal optimization (SMO) and the sub-gradient method work well.

# Prediction
Given input $x$, its class is simply $sign(w^\top x + b)$, the side of the hyperplane it’s on.