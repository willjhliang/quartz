
![[20230401225102.png#invert|600]]

Instruct-NeRF2NeRF edits an existing [[🌞 NeRF]] with a language prompt to produce a new NeRF following the directions. To do this, it takes in the current NeRF, training data, and text prompt; it then alternates between two steps in a process called iterative dataset update:
1. Perform $d$ image updates by replacing original images from the dataset with ones generated from InstructPix2Pix. Specifically, InstructPix2Pix takes in a noisy version of the current render, conditions the generation (attention masks) on the original dataset image, and moves in the direction of the text prompt; conditioning on the original image ensures that the result is grounded, and starting with a noisy render ensures consistency with the current NeRF.
2. Perform $n$ NeRF updates using the whole dataset, which contains both old and new data.