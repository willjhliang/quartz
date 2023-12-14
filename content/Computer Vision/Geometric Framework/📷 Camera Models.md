# Lens Model
Our camera contains sensors and a lens. The lens serves to focus light rays from an object and forms an image behind the lens.

![[20230206195556.png#invert]]

We can find the point's image at the intersection of a ray going from the object point through the lens center and a ray going parallel to the lens, then through the focal focal point, which is focal length $f$ away from the lens center. $f$ is a property of the lens curvature.

If $a$ is the distance from the object to the lens and $b$ is the distance from the lens to the image, we have the following relation: 
$$
1/f = 1/a + 1/b
$$


Moreover, if $Y$ is the distance of the object point to the optical axis and $y$ is the distance of the image point to the optical axis, with triangle similarity we get that $\frac{Y}{a} = \frac{y}{b}$, so 
$$
y = b\frac{Y}{a}.
$$


Note that in a lens model, we must focus the image by placing the image plane exactly $b$ away from the lens. Otherwise, if it's too forward or backward, the image of that object is blurry. Thus, choosing where we place the image plane is how we focus on foreground or background.

# Pinhole Model
The pinhole model simplifies the lens model by assuming that our lens is infinitely small (like a pinhole), only big enough for one ray the travel through the center. Then, there's no need for focusing, so we let $b = f$.

Assuming we place the image plane in front (so the image is upright), if $Z$ is the distance from the object point to the lens (equivalent to $a$ above), we have that 
$$
x = f\frac{X}{Z}, \ y = f\frac{Y}{Z}.
$$


Thus, we can zoom in (increase $x$ or $y$) by either decreasing $Z$ (moving the object closer) or increasing $f$ (changing the focal length).

# Perspective Effects
When projecting the world only our image plane, camera models gives us a variety of interesting perspective effects.

## Distortion
Perspective distortion occurs with close objects causing parallel lines in the world to be less parallel the closer they get to the camera.

![[20230206200615.png#invert]]

Conversely, parallel lines look parallel if the object is far from the camera. If we then zoom in by increasing $f$, our box will have the same size as the one above but with parallel edges.

## Dolly Zoom

![[20230206200616.gif|300]]

Dolly zoom is a special application of perspective distortion. It keeps the object size constant while shrinking or stretching the background.
1. If parallel lines aren't parallel, we have small $Z$ and small $f$. In other words, we're close to the object with a small focal length.
2. If parallel lines are parallel, we have large $Z$ and $f$. In other words, we're far from the object with a large focal length.

If the background shrinks (we see more of it), we're transitioning from (2) to (1), moving closer to the object while zooming out. Conversely, if the background stretches, we go from (1) to (2), moving farther while zooming in.

## Parallelism
In the real world, parallel lines don't intersect. However, due to the projection onto the image, parallel lines may intersect at vanishing points on the image. On the other hand, intersecting lines in the real world may appear parallel in an image. Both cases are illustrated below.

![[20230206205902.png#invert|300]]
The vanishing point of two real-world parallel lines is the intersection of a parallel ray from the camera to the image plane.

![[20230206205945.png#invert|300]]
Real-world intersecting lines appear parallel when their intersection cannot be projected onto the image plane. In other words, they intersect at a point at infinity, and the ray from the camera to the point is parallel to the image plane.