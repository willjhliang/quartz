A hierarchical model captures grouped data with multiple levels of variation, organized in a hierarchy. The datapoint $y_{ij}$ is observation $i$ within group $j$. We assume that there are $J$ groups, each with $n$ observations.

The key is that we want to allow *variation between groups*. Extending the [[🛎️ Normal Model]], we have 
$$
y_{ij} \sim \text{Normal}(\mu_j, \sigma^2)
$$
 where the mean $\mu_j$ comes from 
$$
\mu_j \sim \text{Normal}(\mu_0, \tau^2).
$$
 This accounts for variation within each group with $\sigma^2$ and variation between groups with $\tau^2$.

# Known Variance
First, let's assume $\sigma^2$ is known. Our remaining parameters are 
$$
\theta = (\mu_1, \mu_2, \ldots, \mu_J, \mu_0, \tau^2).
$$


The prior for $\mu_1, \ldots, \mu_j$ is already $\mu_j \sim \text{Normal}(\mu_0, \tau^2)$, so we just need priors for $\mu_0$ and $\tau^2$. We'll use a non-informative prior $p(\mu_0) \propto 1$ and *slightly different* $p(\tau^2) \propto 1/\tau$, which is less informative than $p(\tau^2) \propto 1/\tau$. Note that this is different than the simple Normal model!

With these priors, our joint posterior is 
$$
p(\mu_j, \mu_0, \tau^2 \vert y) \propto \exp \left\{ -\frac{1}{2\sigma^2} \sum_j \sum_n (y_{ij} - \mu_j)^2 \right\} \cdot (\tau^2)^{-(J+1)/2} \exp \left\{ -\frac{1}{2\tau^2} \sum_j (\mu_j - \mu_0)^2 \right\}.
$$
 Breaking this down, the group means' conditional posterior is 
$$
\mu_j \vert \mu_0, \tau^2, y \sim \text{Normal}\left( \frac{n/\sigma^2 \cdot \bar{y}_j + 1/\tau^2 \cdot \mu_0}{n/\sigma^2 + 1/\tau^2}, \frac{1}{n/\sigma^2 + 1/\tau^2} \right)
$$
 where $\bar{y}_j$ is the mean of group $j$.

The conditional posterior for global mean is 
$$
\mu_0 \vert \tau^2, y \sim \text{Normal}\left(\bar{y}, \frac{\sigma^2}{nJ} + \frac{\tau^2}{J} \right).
$$


Finally, the marginal posterior for $\tau^2$ is non-standard and simplifies to 
$$
p(\tau^2 \vert y) \propto (\tau^2)^{-1/2} \left( \frac{\sigma^2}{nJ} + \frac{\tau^2}{J} \right)^{1/2} \left( \frac{\sigma^2}{n} + \tau^2 \right)^{-J/2} \exp \left\{ -\frac{1}{2} \frac{\sum_j (\bar{y}_j - \bar{y})^2}{\sigma^2/n + \tau^2}  \right\},
$$
 which requires [[🧱 Grid Sampling]].

## Interpretation
The group means $\mu_j$ are a compromise between the group's data mean $\bar{y}_j$ and global prior mean $\mu_0$. The between-group variance $\tau^2$ is important here because if $\tau^2 \rightarrow \infty$, the prior mean is ignored and we have 
$$
\mu_j \vert \mu_0, \tau^2, y \sim \text{Normal}(\bar{y}_j, \sigma^2 / n).
$$
 On the other hand, with $\tau^2 \rightarrow 0$, there is no variation between groups, so $\mu_j \rightarrow \mu_0$.

## Sampling
To sample from this hierarchical model, we perform the steps below:
1. Select grid of values for $\tau^2$.
2. Calculate $m(\tau^2) = p(\tau^2 \vert y) / \sum p(\tau^2 \vert y)$ for each grid value.
3. Sample grid value with probability $m(\tau^2)$.
4. Sample $\mu_0 \sim \text{Normal}(\bar{y}, \ldots)$.
5. For each group $j$, sample $\mu_j \sim \text{Normal}(\ldots)$.
6. If we want posterior predictions for group $j$, sample $y^* \sim \text{Normal}(\mu_j, \sigma^2)$.
7. If we want a new group, sample $\mu_{j^*} \sim \text{Normal}(\mu_0, \tau^2)$ and $y^* \sim \text{Normal}(\mu_{j^*} , \sigma^2)$.