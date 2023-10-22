If we're given more "information" about a distribution, [[🔥 Entropy]] decreases. Specifically, for the distribution $Y$ that has some correlation with $X$, if we learn the value of $X = x$, we narrow the range of results of $Y$ and thereby decrease entropy.

Averaging over the probability of all $X = x$ that we can know, we get the equation for conditional entropy, $$H(Y \vert X) = \sum_x P(X=x)H(Y\vert X=x)$$
The decrease in entropy caused by us knowing $x$ is known as information gain. $$IG(X) = H(Y) - H(Y \vert X)$$