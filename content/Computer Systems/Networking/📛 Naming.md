To find something on the internet, we need to either know *where* (address or location), *what* (content-based addressing), or what it's *called* (names, like DNS name)—with a name, we can map it to an address via name resolution.

To use names, we need to define a namespace—flat or hierarchical, specifying what kind of names we can use. A flat namespace allows all identifiers to exist in a global space, and nodes often get to choose their own name. A hierarchical namespace, in contrast, organizes the space into a tree-like structure, which we see in the [[📇 Domain Name System]].

Aside from the namespace, we also need to decide how names are assigned and how we resolve names into IP addresses.

# Directories
A directory within a network can centralize name resolution by storing the mappings. An architecture can be directory-less or directory-based:
1. In a directory-less system, resolution is done by flooding the network. Examples include ARP, which asks for the MAC address behind each port, and Gnutella, which provides P2P file sharing by flooding searches through neighbors. While flooding is very expensive, it is fairly robust.
2. In a directory-based system, the directory handles all lookups. While this makes resolution more efficient, it makes the directory a vulnerable source of failure in the system. An example is Napster, which supported P2P music storage with a central directory.
