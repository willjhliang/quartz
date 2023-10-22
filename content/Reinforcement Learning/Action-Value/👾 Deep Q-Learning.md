Deep Q-Learning[^1] is a landmark [[♟️ Reinforcement Learning]] algorithm that uses [[🚀 Q-Learning]] to train a [[👁️ Convolutional Neural Network]]—termed Deep Q-Network (DQN). This takes advantage of the powerful function approximation abilities of CNNs and was originally used to achieve groundbreaking performance on Atari games.

On top of replacing $Q(s, a)$ (tabular approach) with $Q_\theta(s, a)$ (function approximation), we also use [[📺 Experience Replay]]: instead of performing Bellman backups for the immediate action we take, we instead store all transitions in a replay buffer $B$ and randomly sample some to update our weights $\theta$. This avoids strong correlations between consecutive transitions and also increases sample-efficiency since a transition can be used for multiple updates.

The entire algorithm is as follows:
1. Take some action $a_i$ with [[💰 Epsilon-Greedy]] and observe $(s_i, a_i, s_i', r_i)$, add it to $B$.
2. Sample a mini-batch $\{ ((s_j, a_j, s_j', r_j) \}$ from $B$.
3. Compute 
$$
y_j = r_j + \gamma \max_{a_j'} Q_{\theta}(s_j', a_j').
$$

4. Update parameters 
$$
\theta \leftarrow \theta - \alpha\sum_{j=1}^{N_{batch}}\frac{dQ_\theta}{d\theta}(s_j, a_j)(Q_\theta(s_j, a_j) - y_j).
$$


# Target Network
Unfortunately, Deep Q-Learning satisfies the function approximation, bootstrapping, and off-policy sampling conditions of the [[💀 Deadly Triad]], making it prone to unstable or divergent training. One way to improve the function approximation component is to use a target network $Q_\phi$,[^2] which maintains weights different from our value network $Q_\theta$, in our update instead: 
$$
y_j = r_j + \gamma \max_{a_j'} Q_{\phi}(s_j', a_j').
$$


In the algorithm above, $y_j$ depends on $Q_\theta$ and thus will change once $\theta$ is updated. By using a target network with weights $\phi$, our target $y_j$ won't change after an update to $\theta$. This network is a "lagging" version of the value network, updated every $C$ steps so $\phi = \theta$ and remaining constant between the updates.

# Dueling Architecture
Another improvement to the original DQN is a modification of the architecture. Whereas the original predicts Q-values for each $(s, a)$ pair, the dueling architecture[^3] decouples state-value from action-value, instead predicting the state value $V^\pi(s)$ and advantage $A^\pi(s)$ (and then using them to compute $Q^\pi(s, a)$). Intuitively, this allows the architecture to generalize information across $(s, a)$ pairs for the same state $s$, and it can learn whether a state is valuable without considering the effect of potentially-irrelevant actions.

While the definition of the value functions has 
$$
Q^\pi(s, a) = V^\pi(s) + A^\pi(s, a),
$$
 this is unidentifiable since a value for $Q$ doesn't have unique $V$ and $A$. To address this, we compute 
$$
Q^\pi(s, a) = V^\pi(s) + \left( A^\pi(s, a) - \frac{1}{\vert A \vert} \sum_{a'} A^\pi(s, a') \right).
$$
 With an optimal policy, the average should instead be a max operator (since $Q^\pi(s, a^*) = V^\pi(s)$), so this prediction is off by a constant. However, the average is more stable empirically.

With this computation, the dueling architecture can be plugged into any algorithm that uses Q-value estimates and offers the benefit of generalizing across actions.

[^1]: [Playing Atari with Deep Reinforcement Learning (Mnih et al, 2013)](https://arxiv.org/pdf/1312.5602v1.pdf)
[^2]: [Human-Level Control Through Deep Reinforcement Learning (Mnih et al, 2015)](https://www.nature.com/articles/nature14236)
[^3]: [Dueling Network Architectures for Deep Reinforcement Learning (Wang et al, 2016)](https://arxiv.org/pdf/1511.06581.pdf)