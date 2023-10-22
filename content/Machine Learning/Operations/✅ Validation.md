Validation is used to find the best hyperparameters for complexity control. The general idea is to leave a fraction of data for validation, then use the rest to train; models are trained in different hyperparameters, and the one with lowest error on validation set is selected. Then, train this model on optimal hyperparameters with the entire dataset.

If the model never sees the validation data, we interpret validation error as an unbiased estimate of true error.

Depending on costs and dataset sizes, there are multiple validation methods.

# LOOCV
Leave-one-out cross-validation (LOOCV) leaves only one datapoint for validation and is used for very small datasets. The leave-one-out-error is the average of the $n$ errors.

# K-Fold CV
K-fold cross validation uses LOOCV for subsets of data (folds) instead of individual datapoints. This is used for larger datasets that makes computing validation error for each datapoint removal too computationally expensive.

# Validation Set
With a big-enough dataset, we can leave out a fraction of it to use solely for validation and train our model on the rest. This is the least computationally expensive method but prevents our model from ever seeing the information left for validation.