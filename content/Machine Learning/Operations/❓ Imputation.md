Imputation deals with how we process missing values in our dataset.

If values are missing at random, we can assume a generative model form for $x$, estimate parameters of the model, then use it to fill in missing spots.
1. Simple imputation replaces missing values with the feature’s average or majority.
2. Regressed imputation trains a regression model for each feature using non-missing data points, then fills in missing values with predictions. The model learns with [[🎉 Expectation Maximization]]: use current values to find regression model, use regression model to fill in missing values, use new values to train a better model, and so on.

However, most data aren’t missing at random; in this case, it’s better to add indicator features for whether there’s a missing value as well as imputing with one of the strategies above. For a categorical feature, treat missing as its own class.

> [!info]
> If there are many categories, we can perform dimensionality reduction with clustering, PCA, or autoencoders.