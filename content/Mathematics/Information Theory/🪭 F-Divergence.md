$f$-divergence is a method for comparing the similarity between two distributions. Formally, 
$$
D_f(P \Vert Q) = \int_x q(x) f\left(\frac{p(x)}{q(x)}\right)dx
$$
 for certain convex functions $f$ that satisfy $f(1) = 0$. If $P$ and $Q$ are the same distribution, then $D_f(Q \Vert P) = 0$.

The most common form for $f$ is 
$$
f(u) = u\log u,
$$
 which gives us [[✂️ KL Divergence]], 
$$
D_{KL}(P \Vert Q) = \int_x p(x) (\log p(x) - \log q(x)) dx.
$$
