# Theory
Latent Dirichlet Allocation is an unsupervised method for document classification that comes up with the topic classes on its own.

We treat each document as a mixture of topics, and each topic has a different probability distribution of words. The topic distribution for a document and word distribution for a topic come from two Dirichlet distributions $\alpha$ and $\beta$. The figure below is an example of these two Dirichlet distributions.

![[20221229103227.png#invert]]

> [!info]
> Each topic is similar to a [[👶 Naive Bayes]] model, producing words with different probabilities.

Fundamentally, LDA follows a generative process. To create a document,
1. Choose a topic distribution $\theta \sim \text{Dirichlet}(\alpha)$ for our document.
2. For each topic $z$, choose a word distribution $\varphi_z \sim \text{Dirichlet}(\beta)$.
3. For each of the $N$ word spots, choose topic $z \sim \text{Multinomial}(\theta)$.
4. Then, for each spot and its chosen topic $z$, choose a word from the topic's distribution, $w \sim \text{Multinomial}(\varphi_z)$.

It can be optimized with [[🎉 Expectation Maximization]], alternating between calculating probabilities for $\theta$ and $z$, then estimating parameters $\alpha$ and $\beta$.

# Model
Consists of parameters $\alpha$, which defines the Dirichlet distribution for topics, and $\beta$, the multinomial distribution of words for each topic.

During training, we maintain hidden variables $\theta$, the multinomial distribution of topics, and $z$, the chosen topic from this distribution.

# Training
Given training data $D$, randomly assign each word in a document to a topic, then estimate $\theta$ by counting the topics that come up in each document.

Then, alternate until convergence, starting with the M step, then E step.
1. Given topic assignments, for each topic, estimate $$\beta = p(\text{word}=j \vert \text{topic}=k)$$
2. Using $\beta$ from earlier, for every token estimate $$p(\text{topic}=k \vert \text{word}=j) \sim p(\text{word}=j \vert \text{topic}=k)p(\text{topic}=k)$$
   We can use this probability to pick new topics for each word, giving us $z$ and $\theta$.

# Prediction
To predict the topic for a given document, find the topic that maximizes the product of probabilities of words in the document belonging to that topic.