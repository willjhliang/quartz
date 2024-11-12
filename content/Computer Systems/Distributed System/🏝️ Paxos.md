Paxos is an algorithm for [[❤️‍🩹 Fault Tolerance#Consensus]]. The goal is to maintain a replicated, consistent append-only log; in practice, this log can record the sequence of operations, allowing all nodes to have the same processing order.

The Paxos algorithm guarantees safety—only a single proposed value can be chosen—but not liveness—some proposed value is eventually chosen, and all nodes learn of it. The method operates with a lossy, asynchronous network on nodes that can crash.

Paxos organizes nodes into three roles: proposers, acceptors, and learners. Proposers propose a new entry to append, and acceptors accept these proposals; if a proposal is accepted by a majority, it's decided as the final value and send to the learners. We can organize this procedure into two phases: prepare and accept.

# Prepare
In the first phase, suppose node $A$ wants to propose value $X$ for entry $e$. Then, $A$ chooses a new proposal number $n$ and sends $\text{Prepare}(n)$ to a majority quorum of other nodes; this message is asking the nodes if $A$ can make a proposal for $e$ with number $n$, and if so, to suggest a value that $A$ can use.

Then, if node $B$ receives $\text{Prepare}(n)$ from $A$:
1. If it already acknowledge a $\text{Prepare}(n')$ with $n' > n$, then do nothing.
2. If it previously accepted proposals for this entry, respond with $\text{Ack}(n, n', X')$ where $n'$ is the highest proposal number it has accepted, and $X'$ is the corresponding value.
3. Otherwise, respond with $\text{Ack}(n, \cdot, \cdot)$

Here, $\text{Ack}$ means that $B$ lets $A$ make the proposal; if $X'$ is given, $A$ should choose $X'$.

# Accept
In the second phase, if $A$ receives $\text{Ack}$ from a majority of other nodes, it sends $\text{Accept}(n, X^*)$ where $X^*$ is the value of $\text{Ack}$ with highest proposal number (or original $X$ if none had values).

When $B$ receives $\text{Accept}(n, X^*)$:
1. If $B$ already acknowledged $\text{Prepare}(n')$ with $n' > n$, then do nothing.
2. Otherwise, $B$ accepts the proposal and sends $\text{Accept}(n, X^*)$ to all learners.

When a learner $L$ receives $\text{Accept}(n, X^*)$ from majority of acceptors, it decides $X^*$. It then sends $\text{Decide}(X^*)$ to all other learners, causing them to also decide $X^*$ for entry $e$.