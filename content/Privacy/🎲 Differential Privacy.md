Consider dataset $D$ containing an entry of our data and $D'$ without that entry. If we run the same algorithm $A$ on both datasets, we get the outputs $r$ and $r'$. To ensure privacy, we want to make $r$ and $r'$ "indistinguishable." That is, for an observer who knows everything except which output corresponds to which dataset, they can't tell which output is the result of which dataset.

The only way to ensure this is through randomization and probabilistic indistinguishability. One example is [[📄 Randomized Response]]; following this idea, we "randomize" a [[🎲 Probability Distribution]] to be similar to the original. 

Formally, an algorithm $A$ is $\epsilon$-differentially private is for any neighboring datasets $D$ and $D'$, the distributions for the outputs $A(D)$ and $A(D')$ are $\epsilon$-close, $$\frac{1}{e^\epsilon} \Pr[A(D') \in S] \leq \Pr[A(D) \in S] \leq e^\epsilon \Pr[A(D') \in S]$$ for any subset $S \subseteq O$ of outcomes. With $\epsilon = 0$, we have perfect privacy, and the higher the $\epsilon$, the less privacy we have.

![[20230315110734.png#invert|300]]

Intuitively, we can treat $S$ is the set of "harmful" outcomes. This is a guarantee that using our data ($D$) or not using it ($D'$) doesn't change the risk of the harmful outcomes happening. Note that this is different from guaranteeing that nothing bad will happen.

Examples of differentially-private algorithms include the [[📌 Laplace Mechanism]] and [[⚡️ Exponential Mechanism]].

# Post-Processing Immunity
The post-processing immunity of differential privacy states that any algorithm processing the output of a differentially-private algorithm cannot "undo" the differential privacy. That is, for some $\epsilon$-DP algorithm $A$ and post-processing algorithm $B$, $B(A(x))$ is also $\epsilon$-DP.

If $B$ is an algorithm that tries to recover the input to $A$ (that is, $B$ outputs $x$ or $x'$), then we can show that our chance of a correct answer is not much better than random guessing. First, let's approximate $e^\epsilon \approx 1 + \epsilon$. Then, the probability of a correct guess for $x$ is $$\begin{align*} \Pr [B(A(x)) = x] &\leq (1 + \epsilon) \Pr [B(A(x')) = x] \\ &= (1+\epsilon) (1-\Pr[B(A(x')) = x']) \\ &= (1+\epsilon) - (1+\epsilon)\Pr [B(A(x')) = x'] \end{align*}.$$

Then, adding up the probability of correct guesses for both $x$ and $x'$ gives us $$\Pr[B(A(x)) = x] + \Pr[B(A(x')) = x'] \leq 1 + \epsilon - \epsilon \Pr[B(A(x')) = x'].$$ The right hand side is close to $1$. However, a perfect predictor $B^*$ would have each of these correct probabilities be $1$, meaning its sum would be $2$. The right hand side's upper bound of $\approx 1$ thus shows that the best $B$ can do is close to random guessing.

# Compositional Weaknesses
Though differential privacy protects against post-processing, the paired output of two parallel $\epsilon_1$-DP and $\epsilon_2$-DP algorithms is $\epsilon_1 + \epsilon_2$-DP. Generally, if there are $k$ datasets, each processed with an $\epsilon$-DP algorithm, then their composition is $k\epsilon$-DP.