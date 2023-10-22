A pipe is a unidirectional data channel for inter-process communication. It's defined by two [[📁 File Descriptor]]s, one specifying the reading end and the other for the writing end.

The pipe provides a buffer for processes to write data and another process to read the data. When a process reads from the pipe, it'll wait until an `EOF` is detected; this occurs either when it reads something that finishes or when all write ends of the pipe are closed.

In the unix shell, a pipe can be easily created between two commands, `cmd1 | cmd 2`, so that the `stdout` of the first command is redirected to `stdin` of the second.