A register is a hardware component that can read and write a saved state. Its implemented as a D-flip-flop, which itself uses latches.

# SR-Latch
The SR-latch (set-reset) puts two `NOR` gates together to maintain a state `Q`. The set signal sets `Q` to 1, and `R` resets it to 0. If both are `0`, then `Q` is unchanged; if both are `1`, there's undefined behavior.
![[20240311105124.png#invert|200]]

# D-Latch
The D-latch (data) extends the SR latch by providing a easier interface to work with: `D` is saved into the state as long as `E` is 1.
![[20240311105428.png#invert|300]]

However, the D-latch is level-triggered, meaning it is open for writing as long as `E` is 1. It would be much easier to control if it's edge-triggered, which only writes on an `E` transition (from 0 to 1 or 1 to 0), so there's no need to worry about fluctuations in `D`.

# D-Flip-Flop
The D-flip-flop implements the edge-triggered idea above. Using two sequential D-latches enabled by inverse signals, the input `D` will only be saved if `E` changes in the middle of the two latches—thereby achieving our desired effect. In this setup, `E` is commonly set as the clock signal, so `D` will periodically update on every clock tick.
![[20240311105936.png#invert|300]]

To add an extra write-enable `WE` control to the flip flop, we can use a mux to decide the input: the state value if `WE` is 0 and `D` if `WE` is 1.
![[20240311110126.png#invert|500]]

Putting $N$ of these flip flops together with a shared `WE` wire, we get an `N`-bit register. The input is saved only on the clock edge when `WE` is 1.
![[20240311110226.png#invert|500]]