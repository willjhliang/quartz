Value implicit pre-training (VIP) is a self-supervised representation learning method for implicitly generating goal-based value functions for reinforcement learning. The core of the algorithm is to learn an embedding $\phi$ of images that we can later use to derive the value function.

![[20230324115401.png#invert|600]]

To learn this embedding, we can use ego-centric human data; though it's out of distribution for robotic observations, the embedding we can learn from this data can be shared across both domains. Specifically, if we wanted to find some optimal human policy that maximizes some reward $r(o, g)$, the KL-regularized reinforcement learning objective has (assuming a deterministic policy) the dual problem of finding some optimal embedding $\phi$ and value function $V$: $$\begin{align*} \max_\phi \min_V \mathbb{E}_{p(g)} [(1-\gamma) \mathbb{E}_{\mu_0(o;g)}[V(\phi(o);\phi(g))] \\ + \log \mathbb{E}_{(o, o'; g) \sim D} [\exp \{ r(o, g) + \gamma V(\phi(o');\phi(g)) - V(\phi(o), \phi(g)) \}] ] \end{align*}$$

In our scenario, we set the reward: $$r(o, g) = \begin{cases} 0 & \text{if $o = g$} \\ -1 & \text{otherwise} \end{cases}$$

Our value function $V(\phi(o), \phi(g))$ captures the discounted number of steps needed to reach $g$ from $o$, so our embedding learns the features needed to predict temporal distance. In fact, with some manipulations, we can show that with optimal $V^*$, $\phi$ is trained via an objective similar to [[ℹ️ InfoNCE]], which we can interpret as a contrastive method of attracting the initial and goal states and repelling intermediate states, thereby giving us a smooth curve in the embedding space and a constantly decreasing embedding sequence as we transition toward the goal.

However $V^*$ isn't known, but since it's a distance measure in the context of InfoNCE, we can use $L_2$ distance, $$V^*(\phi(o), \phi(g)) = -\Vert \phi(o) - \phi(g) \Vert_2.$$ Our final training objective for $\phi$ is thus to minimize $$\begin{align*} L(\phi) = \mathbb{E}_{p(g)} [(1-\gamma) \mathbb{E}_{\mu_0(o;g)}[\Vert \phi(o) - \phi(g) \Vert_2] \\ + \log \mathbb{E}_{(o, o'; g) \sim D} [\exp \{ -r(o, g) - \gamma \Vert \phi(o) - \phi(g) \Vert_2 - \Vert \phi(o') - \phi(g) \Vert_2 \}] ] \end{align*}$$

With a learned embedding, we can then then compute a reward function and train a policy via offline trajectory optimization; in the VIP paper, MPPI was used. Moreover, we can also perform few-shot learning with reward-weighted regression, a weighted form of behavior cloning.

# LIV
Langauge-image value (LIV) learning extends VIP to textual goals by aligning text and image modalities in the same embedding space. At first glance, we can try optimizing the summed VIP loss on both image and text encoders; the text loss compares $\phi(o)$ with $\psi(l)$ for language encoder $\psi$, but otherwise, the language loss is the same as above.

However, while this does not explicitly ensure that the text and image embeddings are aligned, it can be shown that for a constant video distribution consisting of only the goal image, the VIP text loss becomes InfoNICE, $$L(\phi, \psi) = (1-\gamma)\mathbb{E}_{p(g, l)}\left[ -\log\frac{\exp \{ S(\phi(g), \psi(l)) \}}{\mathbb{E}_{D(g')}[\exp\{ S(\phi(g'), \psi(l)) \}] } \right]$$ where $S$, our similarity measure, is chosen to be cosine similarity to enable comparisons with [[🍌 CLIP]].

Thus, during training, we optimize the original VIP objective along with InfoNICE loss. In practice, we can pre-train our embedding on narrated videos (EpicKitchen, for example) and train a policy with this embedding using [[🐵 Behavioral Cloning]]. The LIV objective can also be used to fine-tune pre-trained vision-language models using in-domain task data.