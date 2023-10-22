Two-view metrology deals with two projections of the same scene $\pi$ from different projection centers, $C$ and $C'$.

![[20230227094001.png#invert|400]]

Because the transformation from $\pi$ to $C$ and $\pi$ to $C'$ are homographies, going from $C$ to $C'$ is a homography as well. Specifically, for $\begin{pmatrix}u_1 & v_1 & w_1\end{pmatrix}^\top$ in the left image, $\begin{pmatrix}u_2 & v_2 & w_2\end{pmatrix}^\top$ in the right image, and $\begin{pmatrix}X & Y & W\end{pmatrix}^\top$ in the scene plane, we have the following: 
$$
\begin{align*} \begin{pmatrix}u_1 \\ v_1 \\ w_1\end{pmatrix} &\sim H_1 \begin{pmatrix}X \\ Y \\ W\end{pmatrix} \\ \begin{pmatrix}u_2 \\ v_2 \\ w_2\end{pmatrix} &\sim H_2 \begin{pmatrix}X \\ Y \\ W\end{pmatrix} \\ \begin{pmatrix}u_1 \\ v_1 \\ w_1\end{pmatrix} &\sim H_1 H_2^{-1} \begin{pmatrix}u_2 \\ v_2 \\ w_2\end{pmatrix} \end{align*}
$$


# Zooming
A trivial case of two views is zooming. With 
$$
\begin{align*} K_1 &= \begin{pmatrix}f_1 & 0 & u_{01} \\ 0 & f_1 & v_{01} \\ 0 & 0 & 1\end{pmatrix} \\ K_2 &= \begin{pmatrix}f_2 & 0 & u_{02} \\ 0 & f_2 & v_{02} \\ 0 & 0 & 1\end{pmatrix} \end{align*},
$$
 we have 
$$
\begin{pmatrix}u_2 \\ v_2 \\ w_2\end{pmatrix} \sim K_2K_1^{-1} \begin{pmatrix}u_1 \\ v_1 \\ w_1\end{pmatrix}.
$$


# Vanishing Points
If we have two views, our vanishing points are only related by camera intrinsics and rotation, not by translation. Formally, we have the following: 
$$
\begin{align*} \begin{pmatrix}u_1 \\ v_1 \\ 1\end{pmatrix} &\sim K\begin{pmatrix}R & T\end{pmatrix}\begin{pmatrix}1 \\ 0 \\ 0 \\0\end{pmatrix} = KR \begin{pmatrix}1 \\ 0 \\ 0\end{pmatrix} \\ \begin{pmatrix}u_1' \\ v_1' \\ 1\end{pmatrix} &\sim K\begin{pmatrix}R' & T'\end{pmatrix} \begin{pmatrix}1 \\ 0 \\ 0 \\ 0\end{pmatrix} =KR' \begin{pmatrix}1 \\ 0 \\ 0\end{pmatrix} \\ \begin{pmatrix}u_1 \\ v_1 \\ 1\end{pmatrix} &\sim KRR'^\top K^{-1} \begin{pmatrix}u_1' \\ v_1' \\ 1\end{pmatrix} = H\begin{pmatrix}u_1' \\ v_1' \\ 1\end{pmatrix} \end{align*}
$$


Note that this can be applied to the two other vanishing points as well.