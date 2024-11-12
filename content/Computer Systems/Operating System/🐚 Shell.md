The shell is a user-level [[💼 Process]] that reads in commands to execute; this is the terminal we use to run stuff. The shell keeps track of jobs—commands started interactively—that can either be in the foreground or background. Each job is associated with a process group.

# Session
A session is a collection of process groups either attached to a terminal or not attached to any terminal (daemon's). Within a session, there are foreground and background processes.

Foreground jobs read from terminal input `stdin` and also receive signals from the keyboard. Background jobs can't read `stdin` and will receive a signal if it tries to do so. Both types of jobs can write to `stdout`.