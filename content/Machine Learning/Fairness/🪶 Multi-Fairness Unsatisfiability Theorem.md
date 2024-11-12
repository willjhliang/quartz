---
---
Consider some binary categorization of people (for example, yes or no recidivism). For a model $c$ that assigns individuals into bins with scores $v$ that represent the positive probability, we can define three notions of fairness:
1. Group calibration: scores are calibrated across groups and bins, so 
$$
\mathbb{E}[y \vert c(x) = v] = v.
$$

2. Positive balance: average scores for positive people across groups should be the same, 
$$
\mathbb{E}[c(x) \vert y = 1] \sim \bar{y}^+
$$
 where $\bar{y}^+$ is the mean predictions for the positive class.
3. Negative balance: symmetric to the positive balance for the negative class, 
$$
\mathbb{E}[c(x) \vert y = 0] \sim \bar{y}^-.
$$


Intuitively, the first notion requires the score to mean what they're intended—probabilities—for each subgroup; this means that different people with the same score should be treated comparably. The second and third similarly enforce fairness across predictions for the group—scores for true positives and true negatives should be comparable across groups.

Unfortunately, it's impossible to satisfy all three properties. A proof sketch is as follows.

Let $N_t$ be the number of people in group $t$ and $u_t$ be the number of positive labels in group $t$. Also, let $x$ be the average score for a negative label and $y$ be the average score for a positive label.

Assume for contradiction that all fairness definitions hold. Then, for a group $t$, the sum of calibrated predictions should be the number of positive labels. Splitting them into the positive and negative labels, we have 
$$
u_t y + (N_t - u_t)x = u_t.
$$


Across two groups $t_1$ and $t_2$, this draws a system of two lines. These lines are equal if 
$$
\frac{N_{t_1}}{u_{t_1}} = \frac{N_{t_2}}{u_{t_2}},
$$
 which forces the base rates across the two groups to be equal. This condition is rarely satisfied in the real world. Alternatively, if the lines aren't equal, they intersect at $(x, y) = (0, 1)$, implying perfect prediction, which is again not feasible.

Thus, these three constraints can't be simultaneously satisfied in most cases. More details are discussed in [*Kleinberg et al.*](https://arxiv.org/pdf/1609.05807.pdf)