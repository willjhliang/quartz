# OSI Model
Computers communicate with each other over networks. The OSI model is a standardized method of communication, organized into an hierarchy of layers:
1. Physical: actual bits (10base-T).
2. Data link: data frames on a direct link (Ethernet MAC).
3. Network: addressing and routing (IP).
4. Transport: reliability, ACK, multiplexing (TCP, UDP).
5. Session: application state across connections (RPC).
6. Presentation: character encoding, crypto (TLS).
7. Application: high-level APIs and protocols (HTTP, SMTP).

End-to-end communication is across layer 7, but for two machines to talk, there are lower-layer devices that move the message (switches and routers).

Informally, the internet model merges some layers based on their protocol:
1. Net access and physical (layer 1, 2): LAN, packet radio.
2. Internet (layer 3): IP.
3. Transport (layer 4): TCP, UDP.
4. Application (layer 5, 6, 7): Telnet, FTP, DNS.

The internet protocols are based on IP addresses, which identifies a machine—called host. A machine can have multiple IPs, and for each IP, there are multiple ports; different ports are used for different purposes.

# Endianness
Layer 2 is a byte-granular interface, and a question arises: for 16/32/64-bit data, which byte should come first? Little endian puts the lower-order bytes first, while big endian puts the higher-order bytes first. It's possible for the sender and receiver to have different endianness, so the network protocol specifies the byte order—historically, big endian is used. Then, on the machines, programs use `hton` and `ntoh` macros to translate values between network and local endianness.