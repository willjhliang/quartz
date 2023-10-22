Machine learning problems get more difficult in higher dimensions. The exponential increase in the number of distinct variable configurations is known as the curse of dimensionality.

![[20230219153301.png#invert|500]]

One significant challenge is that our dataset sizes simply cannot compare with the dimension size. For example, if our image has size $256 \times 256$, we have $256^2 \cdot 3 = 196608$ (assuming RGB pixels) different dimensions. It's impossible for our dataset to cover the huge space of possible images, and this causes many simpler models to perform badly.

Fortunately for empirical settings, dimensionality is reduced in the [[🪐 Manifold Hypothesis]], which assumes that our data lies on a lower-dimensional manifold in high-dimensional space.