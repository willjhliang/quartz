# Theory
LSTM improves on the standard [[💬 Recurrent Neural Network]] by keeping two separate recurrence tracks for long-term and short-term memory. This avoids the problems that RNNs face with failing to retrieve information that occurred early in the sequence.

The short-term information $h_t$ is passed along similar to how RNNs maintain memory whereas the long-term information $C_t$, known as the cell state, is maintained separately. The flow of information is maintained through gates.
1. Forget gate uses $h_{t-1}$ and $x_t$ to choose parts of $C_{t-1}$ to "forget," or set to zero.
2. Input gate again uses $h_{t-1}$ and $x_t$ to choose parts of $C_{t-1}$ to update, forming $C_t$.
3. Output gate uses $h_{t-1}$ and $x_t$ to select parts of an activated $C_t$ to output as $h_t$.

# Model
The model structure is depicted below.

![[20221229172549.png#invert|400]]

Note that sigmoids (in red) are used for selection since they're bounded from $0$ to $1$, and tanh (in blue) is used for activations. We "choose" parts of $C_{t-1}$ or $C_t$ by multiplying with a tensor consisting of values between $0$ and $1$.