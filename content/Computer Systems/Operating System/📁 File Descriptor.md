Files are "non-volatile storage" that are external to [[💼 Process]]es; they persist beyond process lifetimes and can be accessed by multiple processes.

A file descriptor is an integer id that refers to a file or file-like thing (like terminal I/O, network connections, and pipes) for system calls.

When a program starts, it has `stdin`, `stdout`, and `stderr` file descriptors by default. More can be created by opening files, pipes, or connections.

# File Descriptor Table
A process stores file descriptors in a process-specific table where the integer id is the index and the value is a point to the actual file or file-like thing. This table can be manipulated manually to redirect certain entries. For example, `stdout` can be redirected to point to an opened file instead of terminal output.