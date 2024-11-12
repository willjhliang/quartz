In practice many parts of the [[🗼 Networking#OSI Model]] are implemented in the kernel, namely the physical, data link, network, and transport. An application can access these tools using the socket abstraction, bridging the application and transport layers.

A socket is an endpoint of a connection, identified by an IP address, port number, and protocol. The kernel provides can API to interact with sockets, including creation, connection, listening, and sending and receiving data.

There are two types of sockets: stream and datagram.
1. Stream sockets are connection-oriented, provide reliable, ordered delivery, and act as a stream—no need to packetize data. Its protocol is TCP, and typical applications are SSH and HTTP.
2. Datagram sockets are connectionless, sending individual messages that aren't reliable nor ordered. Its protocol is UDP, and a typical application is telephony.

# Stream Socket
A typical sequence of actions for a stream socket is below:
![[20240309194145.png#invert|500]]

Connections are established and closed explicitly, and the server binds to a port and the client connects to it.

# Datagram Socket
With datagram sockets, data is sent as messages, not a stream. Thus, there's no need to establish and terminate a connection. Also, messages can be dropped (without attempts to resend), and they can arrive out of order. While these seem disadvantageous, datagram sockets have low latency and reduced overhead, making it used for applications like VoIP (Voice over Internet Protocol).