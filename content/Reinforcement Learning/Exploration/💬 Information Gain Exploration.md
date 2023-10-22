Exploration via information gain chooses the action that maximizes our information gain for parameters $\theta$ of our state dynamics $p(s' \vert s, a)$. However, directly optimizing this is intractable.

A close substitute is prediction gain, defined as 
$$
\log p_{\theta'}(s) - \log_\theta(s)
$$
 where $p_{\theta'}$ is the density including our new state. Intuitively, if our state density changed a lot, the our state $s$ is novel. This method is closely related to [[🤩 Optimistic Exploration#Density Modeling]].

Alternatively, we can use variational inference. Our information gain is 
$$
IG((s_t, a_t, s_{t+1})) = D_{KL}(p(\theta \vert h, s_t, a_t, s_{t+1}) \Vert p(\theta \vert h))
$$
 where $h$ is a history of all prior transitions. If we introduce a tractable distribution 
$$
q(\theta \vert \phi) \approx p(\theta \vert h),
$$
 we can optimize its parameters $\phi$ via the [[🧬 Evidence Lower Bound]] 
$$
D_{KL}(q(\theta \vert \phi) \Vert p(h \vert \theta)p(\theta)).
$$
 
Then, given a new transition $(s, a, s')$, we update $\phi$ to get $\phi'$ and use 
$$
D_{KL}(q(\theta \vert \phi') \Vert q(\theta \vert \phi))
$$
 as our approximate bonus on top of the actual reward.