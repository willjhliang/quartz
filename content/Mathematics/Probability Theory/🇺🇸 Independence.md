Two random variables $X$ and $Y$ are independent if and only if 
$$
p(x, y) = p(x)p(y).
$$
 Intuitively, this is saying that if we know $y$, $x$ does not change. Using this equation, we also get the following properties.
1. 
$$
p(y \vert x) = p(y)
$$

2. 
$$
p(x \vert y) = p(x)
$$

3. 
$$
\mathbb{V}[x + y] = \mathbb{V}[x] + \mathbb{V}[y]
$$

4. 
$$
\text{Cov}[x, y] = 0
$$

> [!note]
> Note that the last condition does not hold in converse. Covariance only measures linear dependence, so if two random variables are nonlinearly dependent, they can still have zero covariance.

By a similar definition, two random variables are conditionally independent if and only if, 
$$
p(x, y \vert z) = p(x \vert z)p(y \vert z).
$$
 We can interpret this as saying given knowledge of $z$, knowing more about $x$ doesn't influence $y$.

# Inner Products
If we have independent random variables $X$ and $Y$, imagine them as vectors in vector space, and observe that 
$$
\mathbb{V}[x + y] = \mathbb{V}[x] + \mathbb{V}[y]
$$
 looks like the Pythagorean theorem. If we define [[🎳 Inner Product]] 
$$
\langle X, Y \rangle = \text{Cov}[x, y],
$$
 then we get that the length of a random variable 
$$
\Vert X \Vert = \sqrt{\text{Cov}[x, x]} = \sigma[x].
$$
 Furthermore, the angle $\theta$ between $X$ and $Y$ satisfies 
$$
\cos\theta = \frac{\langle X, Y \rangle}{\Vert X \Vert \Vert Y \Vert} = \frac{\text{Cov}[x, y]}{\sqrt{\mathbb{V}[x]\mathbb{V}[y]}} = \text{corr}[x, y].
$$
