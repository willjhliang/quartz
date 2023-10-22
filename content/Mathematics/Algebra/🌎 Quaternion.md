Quaternions are a four-dimensional number system of the form $$q = a + bi + cj + dk$$ where the basis is $\{ 1, i, j, k \}$. It can also be seen as the sum of a scalar component $a$ and vector $bi + cj + dk$.

This structure is an an extension of complex numbers, and we define conjugate and magnitude similarly: $$\begin{align*} \bar{q} &= a - bi - cj - dk \\  \Vert q \Vert &= \sqrt{q\bar{q}} = \sqrt{a^2 + b^2 + c^2 + d^2} \end{align*}$$

We also define the inverse $q^{-1} = 1/q$, which follows the formula $$q^{-1} = \frac{\bar{q}}{q\bar{q}}.$$

Quaternion algebra has component-wise addition and scalar multiplication, and like complex numbers, has the following rule for multiplying bases: $$\begin{align*} i^2 = j^2 = k^2 &= -1 \\ ij = -ji &= k \\ jk = -kj &= i \\ ki = -ik &= j \end{align*}$$

# 3D Rotations
Quaternions are most commonly used in [[👁️ Computer Vision]] or [[🦾 Robotics]] to compute 3D rotations. This is analogous to how multiplying by a complex number $\cos \theta + i \sin \theta$ with unit magnitude rotates points in the complex plane.

## Visualizing Quaternion Rotation
Since a quaternion $q$ lies in 4D space, we can't visualize its effect directly. However, we can see the unit quaternion in 3D via stereographic projection where the projection of $q$ is the intersection of a line through $-1$ and $q$ with the imaginary hyperplane.

![[20230729123317.png#invert|400]]

The function $f(p)$ is a multiplication of a rotation quaternion $q$ with a unit quaternion $p$. Each of the points is a key-point on the 4D unit hypersphere, and the two perpendicular circles are two chosen spheres on the hypersphere; note that the yellow line is still a circle, but one of its points is at infinity. Below is another visualization that transforms the yellow sphere so it can be projected as a circle instead of a line.

![[20230729123317-1.png#invert|600]]

In this visualization, multiplying $p$ with a rotation $q$ rotates these two circles. For examples, if we let $$q = \cos \theta + i \sin\theta + (0j + 0k),$$ $f(1)$ moves to $f(i)$ in the yellow circle, and $f(j)$ moves to $f(k)$ in the red circle, both completing 90-degree rotations. More generally, for multiplication with any quaternion $q$ that uses all four bases $$q = \cos \theta + \sin \theta (xi + yj + zk),$$ our projected sphere both rotates and expands into a plane as our real component $\cos\theta$ decreases.

![[20230729123317.gif#invert]]

*More visualizations and further explanations can be found [here](https://eater.net/quaternions) thanks to Ben Eater and 3B1B.*

## Application in Engineering
To use quaternions for rotations, we usually want to isolate rotations and avoid the synced double-rotations observed above. Let $$\begin{align*} q_1 &= \cos(\theta) + \sin(\theta) (xi + yj + zk) \\ q_2 &= \cos(-\theta) + \sin(-\theta)(xi + yj + zk) \end{align*}$$

For the simple case where $x = z = 0$ and $y = 1$, we observe that if we visualize $q_1 \cdot p$ and $p \cdot q_2$, the circle defined by $f(1)$ and $f(j)$ rotates in opposite directions while the other circle defined by $f(i)$ and $f(k)$ rotates in the same direction. Combining them together and noting that $q_2 = \bar{q_1} = q^{-1}$ (since $q_1$ is unit), we arrive at the general rotation formula $$f(p) = q \cdot p \cdot q_1^{-1}.$$ These multiplications result in the former circle's rotation cancelling out and the latter circle's rotation compounding; visually, the first multiplication "bubbles" the projected sphere outwards and the second multiplication "shrinks" it back, but both are rotating the sphere's equator perpendicular to the $y$ axis.

This property holds for any unit axis of rotation $xi + yj + zk$. Our function $f(p)$ thus gives a general method for rotating around axes in 3D by negating the rotation in the extra fourth (real) dimension, and it can be implemented as simple quaternion multiplication following the rules above.