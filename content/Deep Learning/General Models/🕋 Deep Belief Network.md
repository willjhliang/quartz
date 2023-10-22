> [!warning]
> Sorry, this note is under construction. Feel free to take a look at what I've got so far, and please come back later!

> [!info]
> Deep belief networks were one of the first deep learning successes, beating kernelized SVMs on the MNIST dataset and demonstrating that deep architectures can be successful too.

Deep belief networks are generative models structured as a layer of visible units and layers of latent variables. Connections go between neighboring layers; the deepest two are undirected, and the others and directed toward the visible layer, as shown below.

![[20230221234517.png#invert|200]]

For $l$ hidden layers, we maintain $l$ weight matrices $W^{(1)}, \ldots, W^{(l)}$ and $l + 1$ bias vectors, $b^{(0)}, \ldots, b^{(l)}$ with the first for the visible layer. Similar to [[🚫 Restricted Boltzmann Machine]]s, we our probability distributions are: $$\begin{align*} p(h^{(l)}, h^{(l - 1)}) &\propto \exp \left\{ {b^{(l)}}^\top h^{(l)} + {b^{(l - 1)}}^\top h^{(l - 1)} + {h^{(l - 1)}}^\top W^{(l)}h^{(l)} \right\} \\ p(h_i^{(k)} \vert h^{(k + 1)}) &= \sigma\left(b_i^{(k)} + {w_i ^{(k+1)}}^\top h^{(k + 1)}\right) \text{ for $k = 1, \ldots, l - 2$} \\ p(v_i = 1 \vert h^{(1)}) &= \sigma\left(b_i^{(0)} + {w_i^{(1)}}^\top h^{(1)}\right) \end{align*}$$