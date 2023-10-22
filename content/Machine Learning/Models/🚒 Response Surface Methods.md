Response surface methods is a mix between [[♟️ Reinforcement Learning]] and [[✋ Active Learning]] that aims some $x$ that minimizes $y$ (for unknown function $y=f(x)$). To do so, we repeatedly query $x_t$ and improve our guess for $f$.

Unlike active learning, our goal is to minimize $y$ instead of fitting to the entire data. This makes the problem much more like reinforcement learning, specifically [[📖 Contextual Bandit]], where $x$ corresponds with an action and $f(x)$ is the reward (or loss, in our minimization case).

# Training
Given a set of datapoints $(X, y)$, fit a model $y = f(x; \theta)$, known as the response surface (analogous to model of the world). Then, repeat the following.
1. Pick the next $x_t$ using gradient descent on $f$. This is similar to the exploitation step in standard reinforcement learning.
2. Measure the corresponding $y_t$, then use $(x_t, y_t)$ to update $f(x; \theta)$.