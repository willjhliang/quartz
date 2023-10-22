Score-based models model the data distribution $p(x)$ by seeking to learn its score, 
$$
s_\theta(x) = \nabla_x p(x).
$$
 This allows us to capture an extremely broad class of distributions indirectly and avoid the intractable partition problem that many other models face.

To train a model, we can use [[🎼 Score Matching]]. We can then sample from our distribution using [[☄️ Langevin Dynamics]], which only requires the score function.