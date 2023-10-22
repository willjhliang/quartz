Sequence-to-sequence models are used for translation, outputting a sequence from an input sequence. It uses [[💬 Recurrent Neural Network]]s, [[🎥 Long Short-Term Memory]], or [[⛩️ Gated Recurrent Unit]]s to encode the sequence into a hidden state and then decode it into another sequence.

The core idea is that the encoder's output summarizes the entire sequence, and the decoder can use this summary to generate a response. This architecture is pictured below.

![[20221229171943.png#invert|500]]

## Attention
One core problem with the standard Seq2Seq approach is that it struggles with long sequences as information earlier in the sequence tend to get lost. The[[🚨 Attention]] mechanism addresses this weakness by passing on the hidden states as well.

We add a step between the encoder and decoder that utilizes all hidden states from the encoder to figure out which hidden states are most relevant to each decoding time-step. In this application, the query is analogous to the previous decoder output $s_{t-1}$ and the keys and values are both analogous to the hidden states $h_i$.

Then, instead of passing the encoder output directly to the decoder, we instead compute a weighted average of all hidden encoder states at each decoder time-step. At time $t$ of the decoding process, we perform the following.
1. For each encoder hidden state $h_i$ and previous decoder output $s_{t-1}$, use a feed-forward neural network to compute the $i$th alignment score $e_{t, i}$.
2. Then, calculate a softmax over all scores to get the weights $\alpha_{t,i}$.
3. Generate the context vector $c_t = \sum_{i=1}^p \alpha_{t,i} h_i$.

The context vector and previous decoder output are concatenated and given to the decoder to produce an output.