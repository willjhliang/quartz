Hidden Markov models are a common structure for [[⏰ Dynamic Bayesian Network]]s that model probability distribution with the Markov property, which states that each variable conditionally depends only on the variable right before it in the sequence.

$$
p(x_1, x_2, x_3, x_4) = p(x_1)p(x_2 \vert x_1)p(x_3 \vert x_2)p(x_4 \vert x_3).
$$


We exploit this assumption to translate an input sequence to another sequence using a Markov matrix or graph that models probabilistic transitions across variables. The graph consists of hidden states and observable variables in the structure below; note that this structure is similar to [[⛓️ Markov Chain]] with observable variables tacked onto the original states.

![[20230404194813.png#invert|300]]

Each hidden state gives emissions with certain probabilities and transition to another hidden state with another set of probabilities. The input sequence we get is the observable variables $Y$, and for translation, our goal is to find the most probable sequence $X$ that generated these emissions.

To predict the probability of sequence $X$ given another sequence $Y$, we use [[🪙 Bayes' Theorem]], ignoring the denominator and taking the highest probability.


$$
\arg\max_X P(X \vert Y) = \arg\max_X \frac{P(Y \vert X)P(X)}{P(Y)} = \arg\max_X \prod_{i=1}^m P(y_i \vert x_i) P(x_i \vert x_{i-1})
$$


For example, for speech recognition (predicting words from sounds), we start with a prior of the likelihood of each word along with likelihood of each sound given a word.

# Forward-Backward Algorithm
The forward-backward algorithm is an inference method for HMMs that estimates the hidden states given observations. Assuming $p(y_k \vert x_k), p(x_{k+1} \vert x_k), p(x_1)$ is known, our goal is to compute $p(x_k \vert y_{1:n})$.

To do this, we have the forward and backward steps, both computed using recursive message passing, similar to [[🕍 Belief Propagation]].
1. Forward step computes $p(x_k, y_{1:k})$.
2. Backward step computes $p(y_{k+1:n} \vert x_k)$.

The forward and backward steps are detailed in the below sections. Assuming their values are known, we can then recover our target via marginalization over 
$$
p(x_k \vert y) \propto p(x_k, y) = p(y_{k+1:n} \vert x_k, y_{1:k})p(x_k, y_{1:k}) = p(y_{k+1:n} \vert x_k) p(x_k, y_{1:k})
$$
 due to the conditional independence structure of the HMM. Note that the first term in the product uses our backward pass, and the second term uses the forward pass.

## Forward Pass
For the forward pass, we want to compute $p(x_k, y_{1:k}$). The key observation is that we can marginalize over $x_{k-1}$, then write a recursive definition: 
$$
p(x_k, y_{1:k}) = \sum_{x_{k-1}} p(x_k, x_{k-1}, y_{1:k}) = \sum_{x_{k-1}} p(y_k \vert x_k) p(x_k \vert x_{k-1}) p(x_{k-1}, y_{1:k-1}).
$$
 Observe that the final term in our expression is exactly the distribution for $k - 1$. Thus, if we let our message 
$$
\alpha_k(x_k) = p(x_k, y_{1:k}),
$$
 then we have 
$$
\alpha_k(x_k) = \sum_{x_{k-1}} p(y_k \vert x_k) p(x_k \vert x_{k-1}) \alpha_{k-1}(x_{k-1}).
$$
 Our base message is $\alpha_1(x_1) = p(x_1)p(y_1 \vert x_1)$, and we can pass this all the way to $k$ to get back our desired probability.

## Backward Pass
The backward pass is similar to the forward pass: our goal is to compute $p(y_{k+1:n} \vert x_k)$, and we'll do so recursively with 
$$
p(y_{k+1:n} \vert x_k) = \sum_{x_{k+1}} p(y_{k+1} \vert x_{k+1}) p(x_{k+1} \vert x_k) p(y_{k+2:n} \vert x_{k+1}).
$$
 Defining our message as 
$$
\beta_k(x_k) = p(y_{k+1:n} \vert z_k),
$$
 we have 
$$
\beta_k(x_k) = \sum_{x_{k+1}} p(y_{k+1} \vert x_{k+1}) p(x_{k+1} \vert x_k) \beta_{k+1}(x_{k+1})
$$
 with the base case $\beta_n(x_n) = 1$ (which we can derive from looking at the equation for $\beta_{n-1}(x_{n-1})$).