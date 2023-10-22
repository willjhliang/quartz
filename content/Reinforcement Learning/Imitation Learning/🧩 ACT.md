Action chunking with transformers (ACT) is an imitation learning system that addresses the compounding errors problem in [[🐵 Behavioral Cloning]] with action chunking and a temporal ensemble.
1. Action chunking groups multiple actions together. For a chunk size $k$, our policy predicts the next $k$ actions and executes them in sequence; this effectively decreases the task horizon by a factor of $k$, reducing opportunities for compounding error.
2. Since a naive action chunking implementation would abruptly transition between action chunks, we can use a temporal ensemble: query the policy at every time step, then take a weighted average over current predictions for the next actions.

Since human behavior is stochastic, the action chunking policy can be modeled as a generative model. Specifically, we can use a CVAE with the encoder (orange) and decoder (blue) implemented as transformers.

![[20230401153616.png#invert|600]]