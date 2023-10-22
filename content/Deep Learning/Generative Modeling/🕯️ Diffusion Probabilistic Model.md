> [!abstract]
> Diffusion breaks down data over multiple time steps and trains a model to iteratively reconstruct it. Thus, the model learns a way to transition samples from senseless noise back to the data distribution.

# Theory
Diffusion iteratively destroys data through gaussian noise and learns a way to reverse time and recreate the original image. If we successfully learn such a model, then we can generate any picture from random noise. This idea is also similar to [[🧨 Score SDE]]s.

## Forward Process
Diffusion models destroy the training distribution of images $q(x)$ by repeatedly applying gaussian noise for $T$ time-steps, known as the forward process. $x_t$ represents the distribution after applying noise for $t$ steps; $x_0$ is the original image, and $x_T$ is isotropic noise. The forward process equation is 
$$
q(x_t \vert x_{t-1}) = \mathcal{N}(\sqrt{1-\beta_t} x_{t-1}, \beta_t \mathbf{I})
$$

where $\beta_t$ is controlled by a variance schedule, which dictates how much noise to add at every time step $t$. $\beta_t$ usually increases as $t$ increases.

## Reverse Process
Our goal is to learn the reverse process $p_\theta(x_{t-1} \vert x_t) = \mathcal{N}(\mu_\theta(x_t, t), \Sigma_\theta(x_t, t))$, which is also a gaussian. The two processes are illustrated below.

![[20230102121606.png#invert]]

## Optimization
To find optimal parameters for $p_\theta(x_{t-1} \vert x_t)$, we optimize the log likelihood of $p_\theta(x_0)$ using the [[🧬 Evidence Lower Bound]]. After a series of derivations, we can express the ELBO with multiple terms: 
$$
\begin{align*}\mathbb{E}_{q(x_{1:T} \vert x_0)}\left[ \frac{p(x_{0:T})}{q(x_{1:T} \vert x_0)} \right] = \mathbb{E}_{q(x_1 \vert x_0)}[\log p_\theta(x_0 \vert x_1)] - D_{KL}(q(x_T \vert x_0) \Vert p(x_T)) \\ - \sum_{t=2}^\top \mathbb{E}_{q(x_t \vert x_0)}[D_{KL}(q(x_{t-1} \vert x_t, x_0) \Vert p_\theta (x_{t-1} \vert x_t))]\end{align*}
$$

Each term has its own function.
1. The first is a reconstruction term for getting back the original image.
2. The second is the distance between our final noisy latent space and the standard gaussian prior.
3. The third is a de-noising matching term within each time step.

## De-Noising Objective
The third term contains $q(x_{t-1} \vert x_t, x_0)$, which must be derived from $q(x_t \vert x_{t-1}, x_0)$ using Bayes' rule.

First, we'll find $q(x_t \vert x_0)$. Let $\alpha_t = 1 - \beta_t$ and all $\epsilon \sim \mathcal{N}(0, \mathbf{I})$, and observe that $x_t$ can be expressed in terms of $x_{t-2}$. 
$$
\begin{align*}x_t &= \sqrt{\alpha_t}x_{t-1} + \sqrt{1-\alpha_t}\epsilon_{t-1} \\ &= \sqrt{\alpha_t}(\sqrt{\alpha_{t-1}}x_{t-2} + \sqrt{1-\alpha_{t-1}}\epsilon_{t-2}) + \sqrt{1-\alpha_t}\epsilon_{t-1} \\ &= \sqrt{\alpha_t\alpha_{t-1}}x_{t-2} + \sqrt{\alpha_t(1-\alpha_{t-1})}\epsilon_{t-2} + \sqrt{1-\alpha_t}\epsilon_{t-1} \\ &= \sqrt{\alpha_t\alpha_{t-1}}x_{t-2} + \sqrt{\alpha_t(1-\alpha_{t-1}) + (1 - \alpha_t)}\epsilon \\ &= \sqrt{\alpha_t\alpha_{t-1}}x_{t-2} + \sqrt{1-\alpha_t\alpha_{t-1}}\epsilon \end{align*}
$$

> [!info]
> Note that to combine the two gaussians $\epsilon_{t-1}$ and $\epsilon_{t-2}$, our new gaussian's variance is the sum of the two variances. In other words, the combination of $\mathcal{N}(0, \sigma_1^2 \mathbf{I})$ and $\mathcal{N}(0, \sigma_2^2 \mathbf{I})$ is $\mathcal{N}(0, (\sigma_1^2 + \sigma_2^2) \mathbf{I})$.

Applying this pattern all the way down, we get 
$$
x_t = \sqrt{\bar{\alpha_t}}x_0 + \sqrt{1-\bar{\alpha}}\epsilon
$$

where $\bar{\alpha_t} =  \prod_{i=1}^\top \alpha_i$.

Then, plugging this into 
$$
q(x_{t-1} \vert x_t, x_0) = \frac{q(x_t \vert x_{t-1}, x_0)q(x_{t-1} \vert x_0)}{q(x_t \vert x_0)} \propto \mathcal{N}(x_{t-1}; \mu_q(x_t, x_0), \Sigma_q(t))
$$
 where $\mu_q(x_t, x_0) = \frac{\sqrt{\alpha_t}(1-\bar{\alpha}_{t-1}x_t) + \sqrt{\bar{\alpha}_{t-1}}(1-\alpha_t)x_0}{1-\bar{\alpha}_t}$ and $\Sigma_q(t) = \frac{(1-\alpha_t)(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_t}$.

Plugging this back into the KL term, we get 
$$
D_{KL}(q(x_{t-1} \vert x_t, x_0) \Vert p_\theta(x_{t-1} \vert x_t)) = \frac{1}{2\sigma^2_q(t)}\left[ \Vert \mu_\theta - \mu_q \Vert_2^2 \right]
$$
 where $\sigma_q^2(t)\mathbf{I} = \Sigma_q(t)$ is the scalar variance from our gaussian above. Thus, we have shown that our objective is to predict the mean of the noise.

However, we can also replace $\mu_q$ with an expression in terms of $x_0$ to get 
$$
D_{KL}(q(x_{t-1} \vert x_t, x_0) \Vert p_\theta(x_{t-1} \vert x_t)) = \frac{1}{2\sigma_q^2(t)}\frac{\bar{\alpha}_{t-1}(1-\alpha_t)^2}{(1-\bar{\alpha}_t)^2}\left[\Vert \hat{x}_\theta - x_0\Vert_2^2\right]
$$
 that says we can also predict the original image directly. Finally, we can express $\mu_q$ in terms of $x_t$ and $\epsilon$ to get 
$$
D_{KL}(q(x_{t-1} \vert x_t, x_0) \Vert p_\theta(x_{t-1} \vert x_t)) = \frac{1}{2\sigma_q^2(t)} \frac{(1-\alpha_t)^2}{(1-\bar{\alpha}_t)\alpha_t}\left[ \Vert \epsilon - \hat{\epsilon}_\theta \Vert_2^2 \right].
$$


Thus, predicting original image $x_0$, the noise $\epsilon_t$, and the mean of the noise (assuming we set variance constant) $\mu_t$ is equivalent, but the second option generally works best in empirical studies.

# Model
The model itself takes in $x_t$ and the time-step $t$ to predict noise $\epsilon_t$. This is commonly done using a [[👁️ Convolutional Neural Network]] or [[🦿 Vision Transformer]].

# Training
We train our model to minimize a simplified loss defined as 
$$
\Vert\epsilon - \epsilon_\theta(\sqrt{\bar{\alpha_t}}x_0 + \sqrt{1-\bar{\alpha_t}}\epsilon, t)\Vert^2
$$

where $\epsilon \sim \mathcal{N}(0, \mathbf{I})$, and $t$ is uniformly chosen from $1\ldots T$ at each gradient descent step.

# Prediction
To sample an image, we first generate random noise $x_T = \mathcal{N}(0, \mathbf{I})$. Then, for $T$ iterations,
1. Let $z \sim \mathcal{N}(0, \mathbf{I})$ if $t > 1$, else $z = 0$.
2. Move one step back in time with 
$$
x_{t-1} = \frac{1}{\sqrt{\alpha_t}}\left(x_t - \frac{1-\alpha_t}{\sqrt{1-\bar{\alpha_t}}}\epsilon_\theta(x_t, t)\right) + \sigma_t \mathbf{z}
$$
 where $\sigma_t$ can be either $\beta_t$ or $\Sigma_q(t)$ as defined above; empirical tests show little difference in results.

> [!note]
> The formula in the second step is derived from the equation for $\mu_q$ in terms of $x_t$ and $\epsilon$. Specifically, 
$$
\mu_q = \frac{1}{\sqrt{\alpha_t}} \left( x_t - \frac{1-\alpha_t}{\sqrt{1-\bar{\alpha}_t}}\epsilon_\theta(x_t, t) \right)
$$


Finally, $x_0$ is our generated image.