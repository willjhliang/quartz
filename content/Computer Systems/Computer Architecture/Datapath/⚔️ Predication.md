Predication is an alternative to [[🕊️ Branch Prediction]] that frames branches in a different way. Rather than jumping the PC, we'll associate a predicate bit for each instruction; this bit indicates some condition, and it causes the instruction to run as normal or become NOP.

For example, with `p1` as our predicate bit, we can perform addition or subtraction like:
```
slt p1, x1, x2
add.!p1 x3, x3, x4
sub.p1 x3, x3, x5
```

Predication introduces additional instructions, but it can be faster than prediction if this overhead is better than the misprediction penalty.