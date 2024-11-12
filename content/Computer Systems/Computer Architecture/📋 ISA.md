On the lowest-level, we can think of a computer as a finite state machine consisting of registers, memory, and the program counter (pointing to the next instruction to execute); the computer changes state by executing instructions—fetching it from memory, decoding, reading inputs, executing, writing outputs, and moving to the next instruction.

The Instruction Set Architecture (ISA) is an interface detailing what instructions our hardware implements. It's a "contract" between hardware and software defining what the computer can do.

# RISC-V
RISC-V (RV) is a popular open-source ISA. It has two variants, RV32I and RV64I—either 32-bit or 64-bit, which defines the size of pointers, registers, and address space. There are also extensions such as multiply/divide, atomics, and support for a full OS.

## RV32IM
In the RV32IM variant, we have a 32-bit base with multiply/divide instructions; we're also ignoring a few instructions for cycle/time/instruction counting. We have 32-bit PC, 32 32-bit registers (x0 to x31), and 32-bit instructions.

## Hardware Details
RV is byte-addressable, meaning we can't directly manipulate smaller units. Each address points to a byte of data.

All storage devices have some internal structure, and so memory is divided into chunks (almost always power of 2). With a memory access at address `addr` of `size` bytes, the access is aligned if `addr % size == 0`; otherwise, access is misaligned and may require multiple physical memory accesses. (Note that by this definition, some accesses can still be misaligned but be within a chunk; every access that satisfies the condition, though, is guaranteed to be within the chunk, given that the access size isn't bigger than the chunk size.) RISC-V handles this transparently, making it easier for programming at the cost of extra hardware complexity.

Endianness is the arrangement of bytes in a multi-byte number (within a byte, LSB is always position 0).
1. Big-endian: MSB first in memory, which is how we would naturally write the number.
2. Little-endian: LSB first in memory. This is done because it makes integer casts "free," since the first memory location, if manipulated, would correctly translate into the LSB of the integer. This is the endianness used in RV.

## Signed Arithmetic
Addition and subtraction with [[💕 Two's Complement]] is the same for both unsigned and signed integers, but multiplication and division are different.

### Multiplication
With multiplication, the product of 2 $k$-bit integers may need $2k$ bits to represent. However, the lower $k$ bits are the same regardless of sign, while the upper $k$ bits differ.

In RV32M, the `mul` instruction gets the bottom 32 bits while the `mulh`, `mulhsu`, and the `mulhu` instructions get the upper 32 bits for signed-signed, signed-unsigned, and unsigned-unsigned multiplications.

### Division
Signed integer division is always the floor of the quotient, and the result depends on the sign. It can be helpful to first treat it as unsigned, then convert quotient to negative if the inputs have different signs.