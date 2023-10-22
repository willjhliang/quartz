Behavioral cloning is an [[♟️ Reinforcement Learning#Imitation Learning]] technique that trains a policy $\pi$ to mimic an expert. The expert generates $(o_t, a_t)$ pairs, essentially converting our problem to a standard supervised learning problem. Our policy is thus trained to predict action from observations using this dataset.

One significant problem with this approach is that $\pi$ only learns states that the expert encounters. Since the expert performs "correct" actions, the dataset only consists of states that we reach after such actions. Thus, the dataset has no examples on states after the agent makes a mistake, and once an agent makes a mistake—due to random chance or incorrect prediction—it will make even larger mistakes. This drifting error is shown below.

![[20230225223828.png#invert|500]]

# Data Robustness
To make the policy more robust, we need to introduce imperfections to our data, which will allow to model to learn actions that correct possible mistakes. To do this, there are a variety of approaches.
1. Some experiments naturally lend to enhanced data collection procedures. A common example for vision observations is to capture the front, left, and right views; the left and right viewed are annotated with actions that'll correct for the tilt (such as "turn right" and "turn left," respectively).
2. [[🗡️ DAgger]] iteratively improves the dataset with annotated samples from the policy's experience, thus allowing it to learn from past mistakes.

# Accurate Mimicry
Another remedy for drifting is to reduce the model's error in the first place. If we don't make mistakes, we won't deviate from the expected trajectory.

However, two properties of human behavior make accurate mimicry difficult.
1. First, our actions generally exhibit non-Markovian behavior. Thus, our policy requires not just the current observation but also past ones, $\pi_\theta (a_t \vert o_1, \ldots, o_t)$. One common way to implement this is via a [[💬 Recurrent Neural Network]] reading in one observation at a time in sequence.
2. Second, our choice of action is usually multimodal (and sometimes random). Our predictions must then account for this by either outputting a mixture of Gaussians, basing the action off random latent variables, or via autoregressive discretization—sampling discrete values for each output dimension one-by-one.

> [!note]
> One danger in modeling non-Markovian behavior is causal confusion. If our model mistakes correlations as causations, it will fail in testing. For example, if a camera sees the brake light in a car turn on during braking, it might associate the brake light for the reason behind braking rather than the obstacle behind the window.

## Goal-Conditioned Behavioral Cloning
If our training data has multiple successful outcomes, it might be difficult to train the model for each outcome. One solution is to condition the policy on our outcome as well, $\pi_\theta (a_t \vert s_t, g = s_T)$ where $s_T$ is a successful state so that we can train the model using the entire dataset instead of learning each outcome separately.

# Cost Analysis
The following is a mathematical analysis of our policy's error, or cost. This provides a more formal justification for our intuitive explanation of the drifting problem.

Assume our supervised learning policy $\pi^*$ has error $\epsilon$ after training on the training data distribution. That is, it incorrectly predicts a training example with probability $\epsilon$. Furthermore, assume that we're training with base behavioral cloning without any of the enhancements above.

Let $c(s, a)$ be the cost of our action. It's equal to $0$ if $a = \pi^*(s)$ and $1$ otherwise.

Consider state $s_t$ after $t$ steps. If we make no mistakes, our state $s_t$ will be in the training distribution. Otherwise, it'll be in some mistake distribution. We can split our policy distribution into these two cases, 
$$
p_\theta(s_t) = (1-\epsilon)^\top p_{train}(s_t) + [1 - (1 - \epsilon)^\top ]p_{mistake}(s_t).
$$

Now, consider the [[👟 Total Variation Distance]], the sum of absolute value differences between probabilities, between $p_\theta$ and $p_{train}$, 
$$
\vert p_\theta(s_t) - p_{train}(s_t)\vert = [1 - (1 - \epsilon)^\top ] \vert p_{mistake}(s_t) - p_{train}(s_t)\vert.
$$

In the worst case, $\vert p_{mistake}(s_t) - p_{train}(s_t) \vert \leq 1$ since the distributions can be completely flipped. Then, we have 
$$
\vert p_\theta(s_t) - p_{train}(s_t) \vert \leq 1 - (1 - \epsilon)^\top \leq \epsilon t
$$
 via the identity $(1 - \epsilon)^\top \geq 1 - \epsilon t$ for $\epsilon \in [0, 1]$.

Finally, the expected value of the cost $c_t$ over time is the following: 
$$
\begin{align*} \sum_t \mathbb{E}_{p_\theta} [c_t] &= \sum_t \sum_{s_t} p_\theta(s_t)c_t(s_t) \\ &\leq \sum_t \sum_{s_t} p_{train}(s_t) c_t(s_t) + \vert p_\theta(s_t) - p_{train}(s_t) \vert c_{max} \\ &\leq \sum_t \epsilon + \epsilon t \\ &= O(\epsilon T^2)\end{align*}
$$


In the second-to-last step, we use the fact that our model's expected error on $p_{train}$ is $\epsilon$ and plug in the inequality derived above.

This thus shows that the expected error of our policy scales quadratically with time, which won't work in real-world applications.