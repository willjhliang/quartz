# Queue Problem
Maintain a set of key-value pairs with quick insertion and quick retrieval of the highest priority pair, evaluated by some function on the key.

# Theory
If we define priority by the magnitude of the key, we can build a max-[[🗻 Heap]], which automatically gives us the functions we need. Other definitions for priority may require other approaches to ordering.