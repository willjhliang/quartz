DAgger, short for Dataset Aggregation, is an enhanced [[🐵 Behavioral Cloning]] algorithm that enriches the dataset with mistake correction examples. Specifically, we loop the following:
1. Train $\pi$ from human data $D$.
2. Run $\pi$ to get dataset $D_\pi$ of states.
3. Ask an expert to label $D_\pi$ with correct actions.
4. Aggregate, $D = D \cup D_\pi$, repeat.

By incorporating the policy's empirical states into our dataset, over many iterations, we'll have the data's distribution of observations converge to the policy's distribution, 
$$
p_{data}(o_t) \approx p_{\pi_\theta} (o_t),
$$
 thus allowing our model to learn correct responses to the states it encounters.