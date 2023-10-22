# Theory
Adaboost is a boosting method that focuses new learners on past errors by weighing each datapoint $x^{(i)}$ with $w_i$.

Each learner is a stump: a decision tree with only one split. This gives the simplest possible split of the data. The learner is also weighed by $\alpha_t$, which can be interpreted as its relative importance in the ensemble.

The entire model is defined as 
$$
h(x) = sign(\sum_{t=1}^\top \alpha_t h_t(x))
$$
 
At every iteration, after we train a new learner, Adaboost redistributes the weights for each datapoint depending on whether $h^\top (x)$ got the datapoint right or wrong. The new weight calculation is as follows. 
$$
w_i^{t+1} = \frac{w_i^\top }{Z}e^{-\alpha_th_t(x^{(i)})y^{(i)}}
$$

Note that $\alpha^\top h^\top (x^{(i)})y^{(i)}$ is $1$ when the prediction is correct and $-1$ when it's wrong. The weighing therefore increases when the prediction is wrong and decreases when it's correct. $Z$ is a normalization term to keep the sum of the weights to equal $1$.

Next to scale the learner, $\alpha_t$ is defined as 
$$
\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon_t}{\epsilon_t} \text{ where error } \epsilon_t = \sum_{i \in \text{wrong}} w_i^\top
$$

While this equation for $\alpha_t$ initially seems arbitrary, it's actually selected to mathematically work out with the weight distribution step above. Plugging it into the equation for $w^{t+1}_i$, we get 
$$
w^{t+1}_i = \frac{w^\top _i}{Z} * \begin{cases} \sqrt{\frac{\epsilon_t}{1-\epsilon_t}} & \text{if $h^\top (x^{(i)})$ is correct} \\ \sqrt{\frac{1-\epsilon_t}{\epsilon_t}} & \text{if $h^\top (x^{(i)})$ is wrong} \end{cases}
$$

This definition can then be used to define $Z$, which is simply the sum over all new weight values before normalizing (dividing by $Z$). 
$$
Z = \sum_{i=1}^n w^{t+1}_i = \sqrt{\frac{\epsilon_t}{1-\epsilon_t}}\sum_{i \in \text{correct}}w_i^\top + \sqrt{\frac{1-\epsilon_t}{\epsilon_t}} \sum_{i \in \text{wrong}} w_i^\top
$$

Observing that $\sum_{i\in\text{wrong}} w_i^\top = \epsilon_t$ and therefore $\sum_{i\in\text{correct}} w_i^\top = 1-\epsilon_t$, the equation above simplifies to 
$$
Z = 2\sqrt{\epsilon_t(1-\epsilon_t)}
$$

The update step for $w^{t+1}_i$ can now be simplified to 
$$
w^{t+1}_i = \frac{w^\top _i}{2} * \begin{cases} \frac{1}{1-\epsilon_t} & \text{if $h_t(x^{(i)})$ is correct} \\ \frac{1}{\epsilon_t} & \text{if $h_t(x^{(i)})$ is wrong} \end{cases}
$$

Now we can see that $\sum_{i\in\text{correct}}w^{t+1}_i = \frac{1}{2}$ and $\sum_{i\in\text{wrong}}w^{t+1}_i = \frac{1}{2}$. In other words, the equation chosen for $\alpha^\top$ re-weighs the datapoints so that correct ones evenly split up half the distribution and incorrect ones evenly split up half the distribution. Since our weak learner should get more correct than incorrect, the incorrect weights will always be bigger.

Lastly, note that there was no explicit loss function to optimize. However, the algorithm implicitly minimizes an exponential loss function, and it learns exponentially fast.

> [!note]
> Since it doesn’t directly optimize from training error, it can also cause test error to decrease even with no training error; in a sense, it stretches the margin of classification, making the model more confident in each prediction.

# Model
The model consists of many weak learners (stumps) $h_t(x)$ as well as their scaling coefficients $\alpha^\top$.

The entire ensemble is given by $h(x) = sign(\sum_t a_th_t(x))$. Note that this is the exact same as stagewise regression.

Hyperparameters
- $T$ is ensemble size, equal to number of training iterations. Higher $T$ gives a better ensemble, though it takes longer to train.

# Training
Given binary classification training data $D$ with $n$ examples, $y = \{1, -1\}$, let $w^1_i = \frac{1}{n}$.

For $T$ iterations,
1. Train a weak classifier $h_t(x)$ on distribution defined by weights $w^\top _i$
2. Evaluate $h_t(x)$ to calculate $\epsilon_t = \sum_{i\in\text{wrong}} w^\top _i$.
3. Let scaling factor $\alpha_t = \frac{1}{2}\log\frac{1-\epsilon_t}{\epsilon_t}$.
4. Update the distribution 
$$
w_i^{t+1} = \frac{w_i^\top }{Z}e^{-\alpha_th_t(x^{(i)})y^{(i)}}
$$
This gives greater weight to training examples that we got wrong.

# Prediction
Given input $x$, calculate $h_t(x)$ for all $t$ and return the majority decision $sign(\sum_{t=1}^\top a_th_t(x))$.