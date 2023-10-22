The randomized response protocol is an algorithm originally used to survey people for sensitive true/false questions. The goal is to ensure plausible deniability—that if someone knew our survey response, they can't make any immediate conclusions.

To do this, we follow the below procedure:
1. Flip a coin. If it's heads, answer the question truthfully.
2. If it's tails, flip another coin. Answer "yes" if it's heads and "no" if it's tails.

Even though our answers are somewhat randomized, we can get the truth proportion of "yes" with some math. Let $Y$ and $N$ be the true answer and "yes" and "no" be our survey results. By our coin flipping process, 
$$
\Pr[\text{``yes"} \vert Y] = \frac{3}{4},\ \Pr[\text{``yes"} \vert N] = \frac{1}{4}.
$$


If $p$ is the fraction of our population that has true yes, we have 
$$
\Pr[\text{``yes"}] = \frac{3}{4}p + \frac{1}{4}(1-p)
$$
 and can solve for $p$ by computing the left hand side using survey responses.

# Differential Privacy Analysis
Randomized response is a differentially private algorithm, and we prove it below.

Consider the distribution of outputs from all participants. Let $o_i = \text{``yes" or ``no"}$, and assuming independence across individuals, 
$$
\Pr[o_1 o_2 \ldots o_N] = \Pr[o_1]\Pr[o_2] \ldots \Pr[o_N].
$$


Our dataset $D = o_1 \ldots o_N$, and a single change to one component $\Pr[o_i]$ gives us the neighboring dataset $D'$. WLOG, let this change be between saying "yes" and the truth being yes or no. Then, 
$$
\frac{\Pr[\text{``yes"} \vert Y]}{\Pr[\text{``yes"} \vert N]} = \frac{3/4}{1/4} = 3.
$$
 This is the proportionate change in our total dataset probabilities, so setting $3 = e^\epsilon$, we have $\epsilon = \ln 3$ and thus randomized response is $\ln 3$-differentially private.

## Generated Analysis
Assume our first coin is biased; with probability $q$, we tell the truth, and with probability $1 - q$, so flip the second coin. Then, we have 
$$
\Pr[\text{``yes"} \vert Y] = q + \frac{1-q}{2} = \frac{1+q}{2},\ \Pr[\text{``yes"} \vert N] = \frac{1-q}{2}.
$$
 Applying the same analysis as above, we get the $q$-randomized response has 
$$
\epsilon = \ln \frac{1+q}{1-q}.
$$
