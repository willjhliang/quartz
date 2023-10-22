Algorithmic privacy deals with controlling inferences and exfiltration from data sources. Unlike cryptography, which involves controlling access to data, privacy allows access but prevents "leaks."

Privacy has three general tiers.
1. Anonymization and aggregation techniques try to hide the individual's data, but this is often not private enough.
2. [[🎲 Differential Privacy]] injects guarantees that the presence of our data in a computation has little effect on the "harm" done; to do this, it introduces randomization into its computations, which provides strong indistinguishability guarantees.
3. "No Harm Whatsoever" is a guarantee that any computation on the data doesn't increase chance of harm, but this promise is too strong and not practical—harm may still come from computations done without our data anyways.

> [!info]
> The problem with "No Harm Whatsoever" is that it prevents the computation from being done even when our involvement doesn't affect the outcome (much). For example, if our case wasn't included in a smoking study, the study would still find the link with lung cancer. "No Harm Whatsoever" deems this a violation of privacy whereas differential privacy allows it.

# Anonymization
Anonymization transforms some dataset $D$ into an anonymized version $D'$ via two operations:
1. Redaction: removing entire fields and columns.
2. Coarsening: reducing the resolution of a field by grouping values into buckets.

However, anonymization is weak to comparison attacks that associate entries across multiple datasets, which might allow re-identification. One slight improvement is the $k$-anonymous property: for any tuple of values in $D'$, there are at least $k$ copies. However, this doesn't offer any strong guarantees.

# Aggregation
Aggregation is the idea that summary queries over a database won't leak individual entries. However, it can be shown that it's possible to partially or fully reconstruct a dataset from query results.

Specifically, queries gives us a system of equations over the dataset entries, which can be solved via non-convex optimization methods. More details can be found in [*Dick et al.*](https://arxiv.org/pdf/2211.03128.pdf)