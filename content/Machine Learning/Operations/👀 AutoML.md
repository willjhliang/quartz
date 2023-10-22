# Theory
AutoML is an algorithm that automatically builds an ensemble of models for a given dataset. In other words, it automates the process of hyperparameter tuning, model selection, and data processing.

It consists of two main parts: a model predicting performance from hyperparameters and the dataset's metadata, and a stagewise method of ensemble assembly. This idea of predicting performance (surrogate) and going to the predicted minima in a stagewise method (acquisition) is called Bayesian optimization.

The former is a model (originally a [[🌲 Random Forest]]) that takes in dataset metadata and hyperparameters and predicts the expected performance of a model defined by these hyperparameters.
1. Metadata contains information like $n$, $p$, class probabilities, and general statistics that characterize a problem. Advanced models use language embeddings of the problem statement itself as metadata.
2. Hyperparameters include classifier choice, hyperparameters for each classifier, and feature and data preprocessing methods

Given this predictor, we then build an ensemble stagewise on residuals, iteratively adding a scaled-down model that maximizes performance; we find this model by gradient ascending on the hyperparameter inputs, warm-starting with hyperparameters from similar problem.

> [!info]
> We add "a bit" of the model (scaling it down, similar to $\alpha$ in [[🎍 Gradient Tree Boosting]]) to prevent overfitting and to leave some residual behind for the next model.

For deep learning, we use reinforcement learning setup. The policy generates deep learning architectures from an embedding space, analogous to an action. The environment then runs this architecture and gives back performance, analogous to reward. With this reward, the policy then gradient descends in the embedding space to improve predictions.

# Model
The model itself contains learned weights for the performance predictor and the ensemble construction method.

# Training
The performance predictor is trained on a wide variety of problems (characterized by metadata) and the performance of classifiers that were actually run on these problems. 

# Prediction
With a trained performance predictor, we can then use the stagewise method to construct our ensemble. Given a problem, we start from an empty ensemble.

Then, for a preset number of times,
1. Gradient ascent on input hyperparameters in the performance predictor to find the model that has maximum performance on the residual.
2. Add this model to the ensemble, scaled down by a factor to prevent overfitting.
3. Calculate the new residual.

After many iterations, we have a complete ensemble.