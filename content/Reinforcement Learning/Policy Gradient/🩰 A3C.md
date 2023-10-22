Asynchronous Advantage Actor-Critic (A3C) is a setup of [[🎭 Actor-Critic]] with parallel training. That is, to stabilize our value function training, we can run multiple actor-critics at once with the same policy $\pi_\theta$ and different random seeds. Each instance makes online updates to the same neural network $V^\pi_\phi$.

Each instance accumulates gradients in the global model and updates it asynchronously. This is extremely similar to mini-batch gradient descent where we use multiple samples to update the model.

![[20230326174219.png#invert|400]]

# A2C
One weakness with A3C is that since the parallel instances are asynchronous, some may be using older parameters than others. Thus, our updates would come from different policies, making it suboptimal.

Advantage Actor-Critic (A2C) is a synchronous version of A3C that eliminates this problem. We can use a coordinator that waits for all parallel actors to finish, then update the global parameters in unison.