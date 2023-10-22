# Problem
Given a minimization problem with constraints, we want to find optimal parameters. The problem is formulated as follows: $$\min_w J(w) \text{ such that } c_i(w) \leq 0, e_i(w) = 0$$

## Classes
There are two main problem classes that fit into this generalization.
1. Linear programs solve $$\min_w c^\top w \text{ such that } Aw = b, w \geq 0.$$
2. Quadratic programs solve $$\min_w w^\top Gw + w^\top d \text{ such that } Aw = b, w \geq 0.$$

# Solution
We start with the augmented Lagrangian $$\mathcal{L}(w, \alpha, \beta) = J(w) + \sum_i \alpha_i c_i(w) + \sum_j\beta_j e_j(w)$$ where $\alpha_i$ and $\beta_j$ are Lagrange multipliers with constraints $\alpha \geq 0$ and $\beta \in \mathbb{R}$.

Then, observe that $$\max_{\alpha, \beta} \mathcal{L}(w, \alpha, \beta) = \begin{cases} J(w) & \text{if $w$ is feasible} \\ \infty & \text{otherwise} \end{cases}$$ since if a constraint was violated, setting $\alpha$ or $\beta$ to $\infty$ would make the whole value $\infty$.

Let $J^*$ be the optimal solution, $J^* = \min_w J(w)$ with the given constraints. Following from above, $$J^* = \min_w \max_{\alpha, \beta} \mathcal{L}(w, \alpha, \beta).$$
## Duality
Let the Lagrange dual be $$D(\alpha, \beta) = \min_w \mathcal{L}(w, \alpha, \beta)$$ and optimal $D^* = \max_{\alpha, \beta} D(\alpha, \beta)$.

The weak duality theorem states $$D(\alpha, \beta) \leq J(w)$$ and the strong duality theorem states that if $J$, $c_i$, and $e_i$ are convex and there exists $c_i(w) < 0$ for all $i$, we have $$D^* = J^*.$$

In many cases, the dual solution is easier to solve for. Thus, if the strong duality requirements are met, we can optimize for the dual instead.

## KKT Conditions
If we solve the problem, we have the following KKT conditions. Let $\alpha^*$, $\beta^*$, and $w^*$ be optimal, and $c_i(w^*) \leq 0$, $e_j(w^*) = 0$. Then, $\alpha^* \geq 0$ and $\alpha^* c_i(w^*) = 0$, and $$\nabla \mathcal{L}(w^*, \alpha^*, \beta^*) = \nabla J(w^*) + \sum_i \alpha_i^* \nabla c_i(w^*) + \sum_j \beta_j^* \nabla e_j(w^*) = 0.$$