SystemVerilog is a hardware description language used to build hardware systems using constructs at the gate and transistor level. While the code itself may look similar to normal programming languages, the effect is very different—it builds a circuit, not a sequentially-executing program!

The following is an overview of the language:
1. Code is organized into modules, which can be replicated.
2. The basic primitive is a wire. The order of assignment doesn't matter, and we can't "reuse" a wire by assigning it twice. Wires are unsigned by default, but they can be set as signed.
4. Wire vectors (arrays) allow us to organize them into groups; for example, `wire [7:0] w1` is a byte, with `w1[7]` as the MSB.
5. Logic is an alternative to wire; it can be stateful, making it convenient for certain cases. The complier will automatically figure out if we need it to be stateful or stateless.
6. Operations include `& | ^ ~` and `?` (ternary) as well as arithmetic operations `+ * / %`, comparisons `== != < >`, and shifts `>> << >>>`.
7. To reduce repetition, we can use a `for` loop to perform "copy-paste" operations. Remember that this is not a software for loop!

# Mux
To make decisions in hardware, we need a mux. This follows the template below:
```
logic out;
always_comb begin
	out = DEFAULT_VALUE;
	if (CONDITION) begin
		out = ANOTHER_VALUE;
	end
end
```

The `always_comb` block indicates that we're doing combinational logic (no state).

# Flip Flop
To hold state, we can use a wire as follows:
```
logic [NUM_BITS-1:0] state;
assign out = state;

always_ff @(posedge clk) begin
	if (rst) state <= RESET;
	else if (we) state <= in;
end
```

The `always_ff` block indicates that we want a flip flop (state)