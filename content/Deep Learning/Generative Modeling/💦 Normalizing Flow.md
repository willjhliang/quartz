Normalizing flows transform a simple latent distribution into the distribution of a dataset and vice versa. This allows us to sample new images from the dataset distribution and solve other inference problems.

If we could invert $p(x \vert z)$ and analytically compute $p(z \vert x)$, inference wouldn't require approximation. Normalizing flow's solution is to use a deterministic and invertible function $f$, so 
$$
x = f_\theta(z), \ z = f^{-1}_\theta (x).
$$


> [!note]
> For invertibility, the dimensions and $x$ and $z$ must be equivalent.

To transform a random variable's distribution, we need the change of variables formula 
$$
p_X(x) = p_Z(h(x)) \vert h'(x) \vert
$$
 where $z = f^{-1}_\theta(x) = h(x)$. Generalizing to vectors, we have 
$$
p_X(x) = p_Z(f_\theta^{-1}(x)) \left\vert \det \frac{\partial f_\theta^{-1}(x)}{\partial x}
\right\vert = p_Z(z) \left\vert \det \frac{\partial f_\theta(z)}{\partial z} \right\vert^{-1}
$$
 where $\frac{\partial f_\theta^{-1}(x)}{\partial x}$ is the Jacobian with the $i$th row and $j$th column equal to $\frac{\partial f_\theta^{-1}(x)_i}{\partial x_j}$.

A big advantage of this method is that we can now stack transformations on top of each other, as long as they're all invertible. Hence, we can capture complex distributions be iteratively transforming a simple one.

# Variants
## Planar Flow
Planar flow uses the transformation 
$$
x = f_\theta(z) = z + uh(w^\top z + b)
$$
 where $u$, $w$, and $b$ are parameters and $h$ is a function of our choice, usually tanh. The determinant of the Jacobian can be computed analytically as 
$$
\det \frac{\partial f_\theta(z)}{\partial z} = I + h'(w^\top z + b)uw^\top .
$$


Note that we need to restrict the parameters for the mapping to be invertible, so 
$$
h'(w^\top z + b)u^\top w \geq -1.
$$


## NICE
Nonlinear independence components estimation (NICE) introduces additive coupling layers and rescaling layers. The former are composed together, and the latter is applied at the end.
1. Additive coupling partitions $z$ into disjoint subsets $z_1$ and $z_2$. Then, the corresponding subsets of $x$, $x_1$ and $x_2$, are equal to the following: 
$$
\begin{align*} x_1 &= z_1 \\ x_2 &= z_2 + m_\theta(z_1) \end{align*}
$$
 where $m_\theta$ is a neural network. To invert this, we simply subtract $m_\theta(z_1)$ from $x_2$ to recover $z_2$.
2. Rescaling applies a scaling factor, $x_i = s_i z_i$, with the inverse being its reciprocal.

Note that by design, the Jacobian of the forward mapping for additive coupling is a lower triangular matrix 
$$
J = \begin{pmatrix}I_1 & 0 \\ \frac{\partial x_2}{\partial z_1} & I_2\end{pmatrix},
$$
 and the product along the diagonal is $1$. This makes the forward process much more efficient. The Jacobian of the rescaling layer is the product of scaling factors, which is also simple to compute.

## Real-NVP
Real-NVP builds on the additive coupling layer from NICE by adding extra complexity via scaling, 
$$
x_2 = z_2 \odot \exp\{\alpha_\theta(z_1)\} + \mu_\theta(z_1)
$$
 where $\alpha$ and $\mu$ are both neural networks. With this form, the Jacobian relies on outputs from $\alpha_\theta(z_1)$, making it more expensive to compute.

## Masked Autoregressive Flow
Masked autoregressive flow (MAF) connects the flow idea to [[🕰️ Autoregressive Model]]s that are defined by 
$$
p(x) = \prod_{i=1}^n p(x_i \vert x_{<i}).
$$
 If we let the transitions be parameterized Gaussians, we have invertible functions 
$$
x_i = \exp \{\alpha_i (x_{<i})\}z_i + \mu_i(x_{<i}).
$$
 The Jacobian is lower triangular and can be computed efficiently. However, generation is sequential, taking $O(n)$ time.

## Inverse Autoregressive Flow
Inverse autoregressive flow (IAF) addresses the slow generation problem by inverting the neural networks, so we have 
$$
x_i = \exp \{ \alpha_i(z_{<i}) \}z_i + \mu_i(z_{<i}),
$$
 where $\alpha_i$ and $\mu_i$ can now be computed in parallel at the start. Below is a comparison of MAF with IAF.

![[20230226180540.png#invert|600]]

However, the inverse mapping from $x$ to $z$ is now sequential, making the likelihood evaluation slower.

## Parallel Wavenet
Parallel wavenet combines the best from MAP and IAF speeds by training a teacher and student model. The teacher uses MAF and the student uses IAF. The teacher can be quickly trained via MLE, and the student aims to mimic the teacher by minimizing 
$$
D_{KL}(s \Vert t) = \mathbb{E}_{x \sim s} [\log s(x) - \log t(x)].
$$
 Since $x$ is generated from the student, its intermediate values $z$ can be cached, allowing us to avoid the sequential likelihood calculations.