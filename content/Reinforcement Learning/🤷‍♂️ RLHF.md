Reinforcement learning from human feedback (RLHF) is a method for fine-tuning a model to better reflect human preferences. Abstractly, it consists of two parts: the target model we want to fine-tune and a preference model trained to produce a reward from the target model's inputs and outputs.

The preference model should accurately reflect human preference, assigning high scalars to good outputs and low scalars to bad ones. To train this model, we commonly follow a comparison ELO system: given an input and two outputs (with a label of which one's better), update the preference model to assign higher scalar to the better output.

Then, we fine-tune the target model using [[♟️ Reinforcement Learning]] algorithms (like [[📪 Proximal Policy Optimization]]), updating its weights by treating the preference model's output as our reward. To avoid the target model from "gaming" the reward by exploiting unintended outputs, we can also incorporate a divergence loss to keep the fine-tuned output similar to the original output; this gives us a reward function 
$$
r = r_\theta - \lambda r_{KL}.
$$


# LLMs
One of the most impactful applications of RLHF is in training [[🎤 Large Language Models]]. Both the target and preference models are usually some pre-trained model; the input is the prompt, and the output is the generated text.