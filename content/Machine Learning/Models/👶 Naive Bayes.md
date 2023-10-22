# Theory
The Naive Bayes assumption states that each attribute is conditionally independent given class $y$.
$$ p(x_1\ldots x_p \vert y) = \prod_{j=1}^p p(x_j \vert y) $$
Naive Bayes uses a generative model that estimates how the training data is generated; to generate $x \in X$, pick category using $p(y)$, then generate data with $p(x \vert y)$ using the Naive Bayes assumption.

Specifically, we have probabilities for each class, $p(y=k)$, and probabilities of each word occurring in a class, $p(x_j = 1 \vert y = k)$.

We can estimate these probabilities using frequencies in the data. To avoid probabilities from being $0$, we apply Laplace smoothing, adding a prior of $1$ for each feature (analogous to assuming we’ve seen each feature once before).
$$ p(y=k) = \frac{N(y = k)}{N} $$
$$ p(x_j =1 \vert y=k) = \frac{N(x_j = 1, y = k) + 1}{N(y = k) + P} $$
To predict the class of a given $x$, we want to find the class $y$ that maximizes $p(y \vert x)$, which is found with [[🪙 Bayes' Theorem]], defined below.
$$ p(y \vert x) = \frac{p(x \vert y)p(y)}{p(x)} $$

# Model
Our model consists of probabilities of each class $p(y=k)$ and probabilities of each feature given each class $p(x_j=1 \vert y=k)$, both based on the training data.

# Training
Given training data $D$, calculate the vocabulary $V$.

For each label $y$,
$$ p(y) = \frac{\text{documents with class $y$}}{\text{total number of documents}} $$
For each word $x_k$ in the vocabulary,
$$ p(x_k \vert y=k) = \frac{\text{number of occurrences of $x_k$ in documents of class $k$} + 1}{\text{number of total words in documents of class $k$} + \text{size of $V$}} $$

# Prediction
Given a document $x$ consisting of words $x_j$.

Return the class $k$ that maximizes the probability of generating $x$,
$$ \arg\max_k p(y=k)\prod_{j=1}^p p(x_j \vert y=k) $$
During implementation, we calculate the following instead to avoid underflow.
$$ \arg\max_k (\log p(y=k) + \sum_{j=1}^p \log p(x_j \vert y=k)) $$

> [!info]
> For document classification, in the prediction step, we assume that there is no information in the words we did not observe; a standard probabilistic model would include probability of words not being observed for each word in the vocabulary, instead of only probability of words that appear in the input document