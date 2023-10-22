# Theory
GRUs tackle the vanishing gradient problem in [[💬 Recurrent Neural Network]]s by selecting which parts of the hidden state to modify; its idea is similar to [[🎥 Long Short-Term Memory]], but it maintains only the hidden state and no long-term cell state.

GRUs modify the hidden state using two gates.
1. Reset gate uses $h_{t-1}$ and $x_t$ to choose parts of $h_{t-1}$ to zero out.
2. Update gate uses $h_{t-1}$ and $x_t$ to select how much of the past information from $h_{t-1}$ to keep.

# Model
The model structure is depicted below.

![[20221229172408.png#invert|400]]
Note that sigmoids (in red) are used for selection since they're bounded from $0$ to $1$, and tanh (in blue) is used for activations.