Feature-wise linear modulation (FiLM) is a general technique for influencing a neural network's output via some external conditioning input. A FiLM layer allows us to inject conditioning into the intermediate activations by using conditioning to perform an affine transformation on the features.

Formally, FiLM learns a "generator" consisting of two functions $f$ and $h$ that output 
$$
\gamma = f(x),\ \beta = h(x).
$$
 Then, for a network's activations $F$, the film layer performs 
$$
\text{FiLM}(F \vert \gamma, \beta) = \gamma F + \beta.
$$
 $f$ and $h$ are generally unique to each feature map (in the case of CNNs) or feature, so this allows extreme flexibility in influencing the activations.

![[20230402105900.png#invert|200]]

Notably, empirical results show that FiLM doesn't require $F$ to be normalized pre-transformation. FiLM thus generalizes all prior [[✂️ Normalization#Conditional Normalization]] approaches under this simple framework.

# VQA Model
FiLM is especially effective with vision-language tasks due to the multimodal input capability. Specifically, for visual question-answer problems, we have a [[👁️ Convolutional Neural Network]] visual pipeline with FiLM layers and a [[⛩️ Gated Recurrent Unit]] generator. The GRU is responsible for processing the question semantics, and injecting this information into the CNN allows us to perform accurate answer predictions.