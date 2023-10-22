The No Free Lunch theorem states that every classification algorithm, averaged over all possible data generating distributions, has the same error rate on unobserved data. In other words, no algorithm is universally better than another.

> [!note]
> Intuitively, this is saying that inductive reasoning—inferring rules from a limited set of examples—is not logically valid since we haven't seen an example of an unobserved datapoint.

The reason why empirical machine learning is thriving is because there are specific probability distributions in the real world. Empirical models aren't assessed over all possible data generating distributions but only on specific distributions. Thus, the models we design are tailored to perform well on those distributions.