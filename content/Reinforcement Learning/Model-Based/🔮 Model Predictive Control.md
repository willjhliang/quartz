Model predictive control (MPC) is an optimal control strategy that derives a control by learning a model of the world.

In order to learn a good model, we need to explore states that we'll end up in. One basic method would be the following:
1. Run some base policy to randomly collect $(s, a, s')$ tuples in a dataset $D$.
2. Fit a model of the world on the transitions.
3. Plan actions with some optimal control or optimization method like [[🎲 Cross Entropy Method]].
4. Execute in the world and add observations to $D$, then repeat.

The basic idea here is to alternate between fitting a model and executing actions generated via a planning algorithm. However, this method's main limitation is that we don't actually need to execute all the actions we planned. Rather, executing just the single action and observing the new state could allow us to avoid some future planning error. This observation gives us the MPC algorithm, which replans after each action:
1. Run a base policy to collect $D = \{ (s, a, s') \}$.
2. Learn a dynamics model $f(s, a)$ from $D$.
3. Plan through $f(s, a)$ to get actions.
4. Execute the first action and observe $s'$.
5. Add $(s, a, s')$ to $D$ and go back to step 3; go back to step 2 every $N$ steps.

# Uncertainty
At the start of training, our dynamics model may overfit the data, causing the planner to exploit some random trajectories that aren't actually advantageous. This causes the future transitions added to $D$ to be effectively useless, causing slow learning.

To address this, we can learn a model that predicts a distribution for $s'$. The planner then assesses the reward of an action in expectation, resulting in a trajectory that's more robust to exploitation.

## Uncertainty-Aware Models
To build an uncertainty-aware model, first note that the output entropy for the dynamics model is not the right uncertainty we want to model. There are two types:
1. Statistical uncertainty, where the data has noisy labels for an input. Here, the model is uncertain about the data.
2. Model uncertainty, where the model predicts out-of-distribution predictions. Here, we're uncertain about the model.

A model's output entropy measures the first type of uncertainty whereas we want to find the second. That is, the model may be overconfident with out-of-distribution predictions if there's little statistical uncertainty in the data.

To find model uncertainty, we estimate $p(\theta \vert D)$; the entropy of this distribution is the second kind of uncertainty. To do so, we can train an ensemble of neural networks using bootstrapping, each with its own weights. Then, our weight distribution is a mixture of Dirac deltas, 
$$
p(\theta \vert D) \approx \frac{1}{N}\sum_{i=1}^N \delta(\theta_i),
$$
 and we can predict the next state using 
$$
\int_\theta p(s_{t+1} \vert s_t, a_t, \theta) p(\theta \vert D) d\theta \approx \frac{1}{N}\sum_{i=1}^N p(s_{t+1} \vert s_t, a_t, \theta_i).
$$


## Planning
Given an uncertainty-aware model, our objective is the average reward 
$$
J(a_1, \ldots, a_T) = \frac{1}{N}\sum_{i=1}^N \sum_{t=1}^T r(s_{it}, a_t) \text{ where $s_{i(t+1)} = f_i(s_{it}, a_t)$}.
$$


In practice, this amounts to sampling some weights $\theta \sim p(\theta \vert D)$, calculating the objective, and repeating multiple times.