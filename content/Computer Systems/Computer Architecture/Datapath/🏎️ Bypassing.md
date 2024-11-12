In a pipelined [[🚗 Datapath]], detecting dependencies and stalling fixes data hazards, but it makes execution slower. We can actually do better by bypassing: reading a value from an intermediate source instead of waiting for it to be available in its primary source. For example, we can bypass the register file by getting the value from the M-stage.

Bypassing requires some invariants:
1. Producer instruction is older than the consumer instruction.
2. Producer must have a valid value the consumer needs.
3. Consumer must be ready to use the producer's value.
4. Producer's value must not arrive "too late."

Forms of bypassing include:
1. MX bypass: value from M-stage (memory) is used in X-stage (execution). ![[20240513194425.png#invert]]
2. WX bypass: value from W-stage (writeback) is used in X-stage (execution). ![[20240513194451.png#invert]]
3. WM bypass: value from W-stage (writeback) is used in M-stage (memory); only valid if the value is used as data input, not address input (due to missing the offset calculation). ![[20240513194748.png#invert]]

The bypass logic is hardcoded into muxes within the stage that check the current input register and the past instructions' (later stages') registers. Note that bypasses can't protect against all data hazards.

## Load-To-Use Dependencies
Load-to-use dependencies occur when an instruction depends on a value loaded from memory from the previous instruction, which is only available by the W-stage. Bypassing alone can't fix this dependency, and we must inject a stall cycle to protect against it. We can also use the compiler to reduce the frequency of this dependency using the same techniques as software interlocks.

Note that one exception to load-to-use is load-to-store, where we load a value and store it in the next instruction. This is the WM bypass above.