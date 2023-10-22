Hough transform is a feature extraction technique that detects patterns in parameter space. That is, it transforms the data into the space of parameters that define such patterns so that patterns present in the data are "noticeable" in the parameter space.

In the simplest case, Hough transform can be used to detect lines from datapoints. Unlike [[🎲 RANSAC]], which finds a single line that best fits the points, Hough much more generally measures the "goodness" of any possible line.

To do so, we first note that the standard line parameterization, $y = mx + b$, cannot directly represent vertical lines. Thus, we'll instead use $$r = x \cos\theta + y\sin\theta$$ where $r$ is the distance from the line to the origin and $\theta$ is the angle of the normal. Now, any line can be represented by a unique $(r, \theta)$ pair, which is a coordinate in Hough space.

For a point $(x^{(i)}, y^{(i)})$, any line that passes through $(x, y)$ can be expressed via the equation above for fixed $x = x^{(i)}$ and $y = y^{(i)}$ and any $r$ and $\theta$. We then have the equation of a sinusoidal curve in Hough space, $$r = x^{(i)} \cos \theta + y^{(i)} \sin \theta$$ for the $i$th datapoint. The key insight of Hough is that a line that passes through two points would have $(r, \theta)$ that satisfies the equation above for both points. That is, this line would be at the intersection of the two sinusoidal curves defined by the points.

Generalizing to multiple points, we can then measure the "goodness" of a line, defined as coordinate $(r, \theta)$ in Hough space, as the number of sinusoidal curves that go through it. The Hough transform discretizes the Hough space, then generates curves for each datapoint, adding a "vote" to each discrete cell its curve passes through. The cells with the most votes are the best lines that fit the data.

![[20230421235529.png#invert|500]]