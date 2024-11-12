The siamese network is a special architecture originally used for signature verification and one-shot classification. To perform this task, it predicts whether two images are in the same class.

![[20230823135823.png#invert]]

As indicated in the diagram above, the two images go through the same network with identical architecture and weights. Their highest-level representations can then be processed in two ways:
1. Concatenate them and use another neural module to predict probability of the same class. This can be trained with [[💧 Cross Entropy]] loss.
2. Directly compute their similarity via some distance metric and train with one of the [[🪩 Representation Learning#Contrastive Objectives]].