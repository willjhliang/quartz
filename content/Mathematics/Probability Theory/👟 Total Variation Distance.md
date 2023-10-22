Total variation distance is a distance measure for two probability distributions. Formally, for distributions $P$ and $Q$, total variation distance 
$$
\delta(P, Q) = \sup_{A \in \mathcal{F}} \vert p(x) - q(x)\vert
$$
 where $A$ is an event in the event space $\mathcal{F}$. Intuitively, this is the largest possible difference between probabilities for an event.

Thus, we can also interpret this distance as 
$$
\delta(P, Q) = \frac{1}{2} \Vert P - Q \Vert_1 = \frac{1}{2}\sum_{w \in \Omega} \vert p(w) - q(w) \vert
$$
 where $\Omega$ is the sample space.

Finally, by Pinsker's inequality, we have a relationship with [[✂️ KL Divergence]]: 
$$
\delta(P, Q) \leq \sqrt{\frac{1}{2}D_{KL}(P \Vert Q)}
$$
