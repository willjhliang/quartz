> [!abstract]
> Bayesian networks are graphical models that capture the conditional independences and dependences between random variables of a probability distribution. Specifically, each directed arrow specifies a direct conditional dependence between its two nodes.

Bayesian (or belief) networks represent conditional independence and dependence assertions over a complex joint distribution via a directed acyclic graph.
1. Each node is a random variable that has conditional distribution $p(x_i \vert \text{parents} (x_i))$. We can think of this conditional as represented by probability tables.
2. Each directed edge is an conditional dependence assertion.

The following is an illustration of a simple network.

![[20221229103135.png#invert|500]]

By representing conditional dependences using arrows, our graph captures both the conditional independences and dependences of the probability distribution. As a simple example, if we have a simple graph with two nodes $X$ and $Y$, an arrow from $X$ to $Y$ means that $Y$ depends on $X$ whereas the absence of an arrow means that $X$ and $Y$ are independent.

One variant, called [[⏰ Dynamic Bayesian Network]]s, uses these variables to capture changes over time with the Markov assumption and time invariance.

# Independencies
In more complex graphs, we can interpret the directed edges as follows.
1. With $X \leftarrow Y \rightarrow Z$, we have $X \perp Z \mid Y$ but $X \not\perp Z$. The former is because knowing anything more about $X$ wouldn't help us learn more about $Z$ since $X$ affects $Y$ but we know $Y$ already. As for the latter, if we didn't know $Y$, learning $X$ gives us information about $Y$ and thus also about $Z$.
2. With $X \rightarrow Y \rightarrow Z$, we have $X \perp Z \mid Y$ but $X \not\perp Z$. This follows a similar reasoning as the previous example: knowing $Y$ blocks the flow of information from $X$ to $Z$ since our knowledge of $X$ would be redundant given $Y$, but not knowing $Y$ allows the information to flow.
3. With $X \rightarrow Y \leftarrow Z$, we have $X \perp Z$ but $X \not\perp Z \mid Y$. The former is because knowing $X$ gives information about unknown $Y$, but more information about $Y$ does not reveal anything about $Z$. On the other hand, if we did know $Y$, since both $X$ and $Z$ affect $Y$, knowing $X$ would reveal some information about $Z$.

A common example for the third configuration is the alarm scenario: $X$ is a burglar, $Z$ is an earthquake, and $Y$ is an alarm. If we know the alarm $Y$ went off, we would wonder whether it was caused by a burglar or earthquake. If we also knew that there was a burglar $X$, then an earthquake $Z$ would seem more unlikely. Similarly, if we knew there was an earthquake, a burglary is also less likely.

## Active Trails
Active trails represent flow of information; variables connected by an active trail are not conditionally independent. For each triplet $X, Y, Z$ in the trail, one of the following must be true.
1. $X \rightarrow Y \rightarrow Z$, $Y$ not observed.
2. $X \leftarrow Y \leftarrow Z$, $Y$ not observed.
3. $X \leftarrow Y \rightarrow Z$, $Y$ not observed.
4. $X \rightarrow Y \leftarrow Z$, $Y$ observed or one of its descendants is observed.

## D-Separation
If there is no active trail between $x_i$ and $x_j$ given a set of observed variables $O$, they are conditionally independent and are d-separated. One immediate conclusion is the local Markov assumption, which states that any node is d-separated from its non-descendants given its parents.

> [!note]
> All d-separated independences in the graph are independencies in the probability distribution, but it's not guaranteed that all independences in the distribution are represented in the graph.

# I-Maps
Let $I(p)$ be the set of independencies that hold in distribution $p$, and let $I(G)$ contain all d-separated pairs $(X \perp Y \mid Z)$. We say that a distribution $p$ factorizes over $G$ if it can be factorized over $G$. That is, $$p(x) = \prod_i p(x_i \vert \text{parents}(x_i)).$$

This is the case when $I(G) \subseteq I(p)$, and we call $G$ an I-map (independency map). Conversely, if $G$ is an I-map for $p$, then $p$ factorizes over $G$.

Note that we don't require $G$ to perfectly enforce all independences in $p$. Rather, we only require that the conditional independencies in $I(G)$ are also in $I(p)$. Thus, as an example, a fully-connected network is an I-map for any distribution since there are no independences, $I(G) = \emptyset$.

Some graphs can also encode the same independences—we call them I-equivalent. By the independencies specified above, two graphs are I-equivalent if they have the same skeleton (same edges, not considering directionality) and same v-structures.

> [!info]
> A more connected network represents a distribution with few conditional independences. Each conditional independence limits the size of the class of distributions that satisfy it, so a more connected network models a larger class of joint probability distributions.

# Ancestral Sampling
To sample from our distribution, we can go through the nodes from top to bottom. Specifically, we first topologically sort our variables, then go in order, sampling from each table. The sorting guarantees that we calculate all the conditionals in order.