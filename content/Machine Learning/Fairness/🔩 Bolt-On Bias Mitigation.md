The bolt-on fairness method converts a standard machine learning classifier $h$ into an adjusted classifier $\tilde{h}$ that we can control to satisfy fairness guarantees.

Specifically, for subgroups $A$ and $B$, $\tilde{h}$ is defined by four parameters: $$\begin{align*} p = \Pr[\tilde{h}(x) = 1 \vert h(x) = 1, x \in A] \\ q = \Pr[\tilde{h}(x) = 1 \vert h(x) = 1, x \in B] \\ r = \Pr[\tilde{h}(x) = 1 \vert h(x) = 0, x \in A] \\ s = \Pr[\tilde{h}(x) = 1 \vert h(x) = 0, x \in B] \end{align*}$$

In other words, these parameters define the probability of outputting a positive prediction for each of the four groups defined by $A, B$ and the prediction from $h(x)$. For $h(x) = \tilde{h}(x)$, we would set $p = q = 1$ and $r = s = 0$. For random decisions (perfect fairness), we have $p = q = r = s = 1/2$.

These parameters thus range from perfect fairness to standard machine learning, giving us a wide range of valid models. Specifically, the set of all $(p, q, r, s)$ gives us a Pareto frontier of $\tilde{h}$ defined on difference in errors and overall error.

![[20230315000744.jpeg]]

For a certain maximum difference $\gamma$, we can solve a linear program to find the values for $p, q, r, s$ that minimize $\epsilon(\tilde{h})$.

# Limitations
However, this bolt-on method restricts our possible models to only those that can be modified from our initial model $h$. There are possibly better models $h^*$ beyond our Pareto frontier above, and we can't get to $h^*$ simply because our initial model wasn't as good.

![[20230315000744-1.jpeg]]

The Pareto frontier formed from mixtures of models $h' \in H$ is thus better than the Pareto frontier from our bolt-on method. However, finding $h^*$ is intractable in the worst case, but we do have heuristics like the [[🔮 Oracle Fairness Approach]].