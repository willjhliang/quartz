Algorithmic fairness deals with building "fair" [[🤖 Machine Learning]] models. The main definitions of fairness group fairness and individual fairness; the former considers statistics across subgroups in the populations, and the latter considers each person individually.

However, among both definitions, choices for what constitutes "harm"—and thus how to equalize harm and guarantee fairness—is subjective and domain-specific, as seen in the [[🧭 COMPAS]] battle. Even worse, by the [[🪶 Multi-Fairness Unsatisfiability Theorem]], it's often impossible to satisfy multiple definitions of fairness at once.

# Machine Learning Bias
Standard machine learning optimization doesn't ensure fairness. Simply minimizing error often gives us models that are more effective on some groups than others. Note that for this reason, sometimes a model trained on datasets without sensitive attributes (like race) can be unfair to these groups—on the contrary, a model that considers such attributes may ironically be more fair.

There are many ways standard optimization practices may go wrong.
1. Less data on certain subgroups.
2. Different groups have different distributions.
3. Features are less predictive on some groups.
4. Some groups are inherently less predictable (for example, face recognition with or without facial hair).
5. Data is biased.

# Group Fairness
Group fairness algorithms aim to reduce the differences in harm across different groups. Two common methods are [[🔩 Bolt-On Bias Mitigation]] and the [[🔮 Oracle Fairness Approach]].

# Individual Fairness
Individual fairness is a bit harder to define. We can't treat each individual as their own group since their error would be $0$ or $1$.

## Metric Fairness
Metric fairness applies the idea that "similar individuals should get treated similarly." Specifically, it defines some distance metric $d(x_1, x_2)$ between two individuals and constraints $h(x)$ to obey $$\vert h(x_1) - h(x_2) \vert \leq \alpha d(x_1, x_2).$$

## Subgroup Fairness
Subgroup fairness notes that if we achieve group fairness, subgroups defined by membership in intersecting groups ("disabled Hispanic women over age 55," for example) can still face discrimination. To solve this, we can employ a similar learner-regulator framework from the [[🔮 Oracle Fairness Approach]] to enforce violations on groups $g \in G$.

## Average Individual Fairness
Average individual fairness considers cases where our model $h$ evaluates individuals multiple times (for example, in product recommendations). It forces the average error rates across individuals to be roughly similar, $$\epsilon(h, x_1) \approx \epsilon(h, x_2).$$

## Fairness Elicitation
Fairness elicitation goes beyond simple definitions of fairness and instead elicits empirical judgements from other people. These judgement have the form "$x_1$ and $x_2$ should receive the same treatment" or "$x_1$ should be treated at least as well as $x_2$."

If we have the outcome data $S = \{ (x, y ) \}$ and judgements $F = \{ (x_1, x_2) \}$, we can find $h \in H$ that minimizes error on $S$ subject to $F$. This provides another game theory problem formulation.

## Minimax Group Fairness
Minimax group fairness notes that for some methods that aim to equalize harm, we may be needlessly inflating harm for the advantaged subgroups to ensure equality. An alternative guarantee is to promise that the error on each group is beneath a threshold—but no promise that errors are equal across groups. This gives us the minimax problem $$\min_h \max_g \{ \epsilon(h, g) \}.$$

## Bias Bounties
[[💰 Bias Bounties]] is an approach that invites the public to help improve the model. Similar to bug bounties, we reward people for finding biases and fixing them.
