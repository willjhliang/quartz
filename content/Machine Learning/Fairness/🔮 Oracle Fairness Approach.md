The oracle (or reductions) approach to fair machine learning reduces the fairness problem into a standard optimization problem.

Assume we have a black-box subroutine $L$ that can learn $h \in H$ with minimum empirical error, $\hat{\epsilon}(h)$. We can then introduce some fairness constraints $$\vert \epsilon(h, A) - \epsilon(h, B) \vert \leq \gamma$$ where $A$ and $B$ are two subgroups, and we restrict the difference in errors between the two subgroups to be within a certain threshold. Introducing variables for weights in $h$ with these constraints gives us a linear program, $$\min_h \hat{\epsilon}(h) + \sum_i \sum_j \lambda_{ij} \max(0, \vert \hat{\epsilon}(h, i) - \hat{\epsilon}(h, j)\vert - \gamma).$$

We can solve this by alternating in a two-player game:
1. First, the learner $L$ picks the best $h \in H$.
2. Next, a regulator $R$ picks a pair of groups $A$ and $B$ where the constraint is most violated. (More generally, $R$ gives a distribution over all possible pairs.)
3. We calculate payoff for the regulator as $$\hat{\epsilon}(h) + \max(0, \vert \hat{\epsilon}(h, A) - \hat{\epsilon}(h, B)\vert - \gamma).$$
4. The payoff for the learner is just the negative of the above.

Our final result, after $T$ steps, is the mixture model formed from all intermediate models, $$h(x) = \frac{1}{T}\sum_{t=1}^T h_t(x).$$

Let $\Delta(H)$ denote the set of all mixtures models formed by models in $H$. In terms of game theory, the learner is playing a mixed strategy $p \in \Delta(H)$ and the regulator plays a mixed strategy $q$ over fairness constraints. Our payoff creates a zero-sum game, and the Nash equilibrium is the constrained optimization solution.

It can be shown that if $L$ best responds to $q_t$ and $R$ updates $q_{t+1}$ using no-regret, this method will converge to a $1/\sqrt{T}$-optimal solution—our final error is within $1/\sqrt{T}$ of the optimal solution and we violate constraints by $\leq 1/\sqrt{T}$.