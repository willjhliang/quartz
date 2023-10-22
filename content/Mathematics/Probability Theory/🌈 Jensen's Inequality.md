For random variable $X$, if $\varphi$ is a convex function, we have $$\varphi(\mathbb{E}(X)) \leq \mathbb{E}(\varphi(X))$$
In other words, applying the function to the expectation after gives us a smaller value than applying it first. If we apply this to two possible values $x_1$ and $x_2$ with weights $t$ and $(1-t)$, we can view it as the difference between the middle point on the pink versus black lines. The pink represents applying the average after $\varphi$, and the black represents finding the average before.

![[20230209085548.png#invert]]

Jensen's inequality works for concave functions too, with the inequality sign flipped: $$\varphi(\mathbb{E}(X)) \geq \mathbb{E}(\varphi(X)).$$ This inequality is commonly used with the logarithm, giving us $$\log(\mathbb{E}(X)) \geq \mathbb{E}(\log(X)).$$