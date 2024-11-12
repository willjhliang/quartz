Verification, also called validation, is about checking whether a design meets its specification. This can be done via testing, assertions, or formal verification.

# Testing
Test cases is the simplest way to verify a hardware module; given these inputs, are the outputs correct? The main problem, however, is that there are usually way too many possible inputs, and it's not possible to test all of them for *complete behavior coverage*.

In practice, we use alternative forms of coverage, with design-specific coverage metrics.

# Assertions
Assertions within the HDL code identifies invariants that should always hold, and simulation of the hardware will fail if the assertion is violated. They're removed during synthesis to real hardware and are used along with testing.

# Formal Verification
Formal verification builds a mathematical model of the hardware and checks all possible inputs—without test cases—for assertion violations. While these problems are NP-complete in general, in practice there are significant acceleration that can allow verification to finish in a reasonable amount of time.