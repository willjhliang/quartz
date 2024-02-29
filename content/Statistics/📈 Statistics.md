Statistics is about the organization, modeling, analysis, and interpretation of data. Standard tasks include summarizing data and inferring conclusions from the data.

To model data, we commonly use probability. Within statistics, there are two classes that differ in how they interpret probabilities:
1. Classical or Frequentist statistics see it as *frequency* (over many trials). To build a model, we assume the data is generated following some unknown fixed parameters $\theta$, and we use our data samples $y$ to make point estimates for $\theta$.
2. Bayesian statistics see it as a *degree of belief*, and a model combines both the belief of the unknown parameter $\theta$ as well as the information provided by the data $y$ to make a more informed probabilistic estimate for $\theta$.

Fundamentally, the difference between Classical and Bayesian statistics is the treatment of the unknown parameter $\theta$: is $\theta$ some fixed unknown value, or is it a random variable?

# Classical Statistics
To explain our observations, we assume a probability model that links observed data $y$ to unknown parameters $\theta$, 
$$
y_i \sim \text{Model}(\theta).
$$
 For example, we can have a normal distribution, 
$$
y_i \sim \text{Normal}(\mu, \sigma^2),
$$
 where $\theta = (\mu, \sigma^2)$.

In Classical statistics, we assume $\theta$ are fixed values, and we find them with point estimation—the single best value for $\theta.$ We define "best" as the $\theta$ that maximizes the likelihood of generating the data we observe, so our estimate, called the maximum likelihood estimate (MLE), is 
$$
\hat{\theta}_{MLE} = \arg\max_\theta \Pr[y\vert\theta].
$$
 For our normal model, this is 
$$
\hat{\mu}_{MLE} = \bar{y},\ \hat{\sigma}^2_{MLE} = \frac{1}{n}\sum(y_i - \bar{y})^2.
$$


However, because our observations are *random samples*, there's some uncertainty in $\hat{\theta}_{MLE}$. The sampling distribution of $\hat{\theta}_{MLE}$ is a distribution of values that $\hat{\theta}_{MLE}$ takes across all possible random samples of data; it can be found with the central limit theorem or bootstrapping, and we can use it for hypothesis tests and confidence intervals.

# Bayesian Statistics
In the Bayesian approach, we instead assume $\theta$ are random variables following their own probability distributions, and our goal is to estimate a *distribution* for $\theta$ given the data we observe.

Like above, we assume our data $y$ comes from a model with parameters $\theta$, 
$$
y_i \sim \text{Model}(\theta).
$$
 However, we also assume our parameters come from their own distribution, 
$$
\theta \sim p(\theta),
$$
 called a *prior distribution*.

To estimate our distribution for $\theta$ given $y$, called the *posterior distribution*, we use [[🪙 Bayes' Theorem]], 
$$
p(\theta\vert y) \propto p(y\vert\theta) \cdot p(\theta),
$$
 which combines both the data model $p(y \vert \theta)$ and prior $p(\theta)$. We can interpret this calculation as up-weighing the probability of $\theta$ that have high likelihood, thus giving us a more informed distribution on $\theta$ compared to the prior.

With our posterior $p(\theta\vert y)$, we can make point and variance estimations. We can also make predictions about unobserved or future data $y^*$ using the posterior predictive distribution, 
$$
p(y^* \vert y) = \int p(y^*\vert\theta) \cdot p(\theta\vert y) d\theta.
$$
 Note that this distribution accounts for all variability—both from the parameter values $p(\theta \vert y)$ and the new data $p(y^* \vert \theta)$.