Distributed commit is the problem of making sure an operation is performed by every node in a distributed system or none at all.

# One-Phase Commit
The simplest solution is to elect one node as the coordinator, which tells all other nodes (subordinates) whether to commit or abort a transaction. However, this leaves us with two problems:
1. A subordinate can't independently abort the transaction if there's a problem.
2. The coordinator might crash, leaving the system in an undefined state.

# Two-Phase Commit (2PC)
To address these issues, we'll use two rounds of communication.
1. Voting: first, the coordinator sends a "prepare" message to each subordinate, and they respond with "yes" or "no" depending on whether they're able to commit. During this, if locks are required, the subordinate acquires the locks.
2. Decision: if all subordinates say "yes," the coordinator tells them to commit; otherwise, it tells them to abort. Finally, subordinates reply with "ack."

This allows any subordinate to abort a transaction. To safeguard against crashes, each node can keep a log of messages it sent and received—each of these is a decision it needs to remember; these provide enough information for the node's recovery procedure.

The only issue is that if the coordinator crashes after subordinates send "yes," the subordinates are blocked until the coordinator restarts and responds. The key issue here is that receiving a decision and executing the transactions is done in the same second stage; for example, if the coordinator only sends a message to one subordinate before crashing, the others cannot distinguish that action the subordinate took and can only wait.

# Three-Phase Commit (3PC)
Three-phase commit fixes this by making sure all subordinates know the decision before executing anything:
1. Voting: like before, subordinates respond to a "prepare" with "yes" or "no."
2. Precommit: if there is a "no," coordinator sends "abort." Otherwise, it sends "precommit" to at least $k$ subordinates, and each subordinate responds with "ack."
3. Commit: after receiving $k$ "acks," the coordinator sends "commit" to each subordinate. Subordinates reply with "ack."

Now, if the coordinator crashes before it sends its decision to subordinates, the subordinates can safety abort because it knows no subordinates have already executed the transaction (unless more than $k$ nodes fail).