The successor representation framework is an extension of value estimation that decouples reward and future states. That is, it observes that 
$$
V(s_t) = R(s_t) M(s_t, s_{t+1})
$$
 where $R(s_t)$ contains the reward for each state and $M(s_t, s_{t+1})$ contains expected discounted future states. Combining them together, we get the expected future reward, the exact definition of a value function.

The advantage with this factorization is that the environment dynamics is now decoupled from the actual rewards. In fact, both can be learned separately from experience: the reward can be optimized with gradient descent, and the visitation probabilities with [[⌛️ Temporal Difference Learning]], 
$$
M(s_t, s_{t+1}) = M(s_t, s_{t+1}) + \alpha(\mathbb{1}[s_t = s_{t+1}] + \gamma M(s_{t+1}, s') - M(s_t, s_{t+1})).
$$


With $M$, we can compute values when the reward $R$ changes in our environment, thus enabling transfer.