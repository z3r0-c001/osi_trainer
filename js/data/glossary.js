// Networking glossary data for OSI training application
export const glossary = [
  {
    term: '802.11',
    definition:
      'A family of IEEE standards for wireless local area networking (Wi-Fi). Different amendments such as 802.11a, 802.11n, 802.11ac, and 802.11ax define varying frequencies, modulation schemes, and maximum data rates.',
    relatedLayer: [1, 2],
    relatedTerms: ['SSID', 'WPA/WPA2/WPA3', 'Frequency Band'],
    category: 'wireless'
  },
  {
    term: 'ARP',
    definition:
      'Address Resolution Protocol resolves a known IP address to a MAC address on a local network segment. A host broadcasts an ARP request, and the device with the matching IP replies with its MAC address.',
    relatedLayer: 2,
    relatedTerms: ['MAC Address', 'IP Address', 'Broadcast Address'],
    category: 'protocol'
  },
  {
    term: 'ASCII',
    definition:
      'American Standard Code for Information Interchange is a character encoding standard that maps 128 characters, including English letters, digits, and control codes, to 7-bit numeric values. It forms the foundation of many modern encoding schemes.',
    relatedLayer: 6,
    relatedTerms: ['UTF-8', 'Base64', 'Encoding'],
    category: 'encoding'
  },
  {
    term: 'AS (Autonomous System)',
    definition:
      'A collection of IP networks and routers under the control of a single organization that presents a unified routing policy to the internet. Each AS is identified by a unique AS Number (ASN) and exchanges routing information with other ASes using BGP.',
    relatedLayer: 3,
    relatedTerms: ['BGP', 'Router', 'Dynamic Route'],
    category: 'routing'
  },
  {
    term: 'Asymmetric Encryption',
    definition:
      'A cryptographic method that uses a mathematically related key pair: a public key for encryption and a private key for decryption. It enables secure key exchange and digital signatures without requiring a shared secret.',
    relatedLayer: 6,
    relatedTerms: ['Symmetric Encryption', 'PKI', 'TLS/SSL'],
    category: 'security'
  },
  {
    term: 'Authentication',
    definition:
      'The process of verifying the identity of a user, device, or system before granting access to network resources. Common methods include passwords, certificates, multi-factor authentication, and biometric verification.',
    relatedLayer: null,
    relatedTerms: ['Encryption', 'PKI', 'Certificate'],
    category: 'security'
  },
  {
    term: 'Bandwidth',
    definition:
      'The maximum rate at which data can be transferred over a network link, typically measured in bits per second (bps). Higher bandwidth means greater data-carrying capacity, though actual throughput may be lower due to overhead and congestion.',
    relatedLayer: 1,
    relatedTerms: ['Throughput', 'Latency', 'QoS'],
    category: 'general'
  },
  {
    term: 'Base64',
    definition:
      'A binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters. It is commonly used to embed binary content such as images or certificates within text-based formats like email (MIME) and JSON.',
    relatedLayer: 6,
    relatedTerms: ['ASCII', 'UTF-8', 'Encoding'],
    category: 'encoding'
  },
  {
    term: 'BGP',
    definition:
      'Border Gateway Protocol is the path-vector routing protocol that exchanges routing information between autonomous systems on the internet. It selects routes based on policies, network rules, and path attributes rather than simple metrics.',
    relatedLayer: 3,
    relatedTerms: ['AS (Autonomous System)', 'OSPF', 'Routing Table'],
    category: 'routing'
  },
  {
    term: 'Bridge',
    definition:
      'A Layer 2 device that connects two or more network segments and forwards frames based on MAC addresses. Bridges reduce collision domains and are the conceptual predecessors of modern network switches.',
    relatedLayer: 2,
    relatedTerms: ['Switch', 'Hub', 'MAC Address'],
    category: 'device'
  },
  {
    term: 'Broadcast Address',
    definition:
      'A special address used to send a packet to all devices on a network segment simultaneously. In IPv4, the broadcast address is derived by setting all host bits to 1 within a given subnet.',
    relatedLayer: 3,
    relatedTerms: ['IP Address', 'Subnet Mask', 'ARP'],
    category: 'addressing'
  },
  {
    term: 'Certificate',
    definition:
      'A digital document, typically following the X.509 standard, that binds a public key to an identity and is signed by a trusted Certificate Authority. Certificates enable TLS/SSL encryption and authenticate servers and clients.',
    relatedLayer: [5, 6],
    relatedTerms: ['PKI', 'TLS/SSL', 'Asymmetric Encryption'],
    category: 'security'
  },
  {
    term: 'Channel',
    definition:
      'A specific frequency range within a wireless frequency band used for data transmission. Overlapping channels can cause interference, so proper channel selection and planning are essential for optimal Wi-Fi performance.',
    relatedLayer: 1,
    relatedTerms: ['Frequency Band', '802.11', 'SSID'],
    category: 'wireless'
  },
  {
    term: 'CIDR',
    definition:
      'Classless Inter-Domain Routing is a method of IP address allocation and routing that replaces the older classful addressing system. CIDR uses variable-length subnet masks expressed in slash notation (e.g., /24) to create subnets of flexible size.',
    relatedLayer: 3,
    relatedTerms: ['Subnet Mask', 'IP Address', 'Routing Table'],
    category: 'addressing'
  },
  {
    term: 'Decapsulation',
    definition:
      'The process of removing protocol headers and trailers as data moves up through the layers of the network model at the receiving host. Each layer strips its own header to extract the payload for the layer above.',
    relatedLayer: null,
    relatedTerms: ['Encapsulation', 'PDU', 'OSI Model'],
    category: 'general'
  },
  {
    term: 'Default Gateway',
    definition:
      'The router interface on a local network that serves as the exit point for traffic destined for hosts outside the local subnet. When a device cannot find the destination on its own network, it forwards the packet to the default gateway.',
    relatedLayer: 3,
    relatedTerms: ['Router', 'IP Address', 'Subnet Mask'],
    category: 'addressing'
  },
  {
    term: 'DHCP',
    definition:
      'Dynamic Host Configuration Protocol automatically assigns IP addresses, subnet masks, default gateways, and other network parameters to devices on a network. This eliminates the need for manual configuration and prevents address conflicts.',
    relatedLayer: 7,
    relatedTerms: ['IP Address', 'Subnet Mask', 'Default Gateway'],
    category: 'protocol'
  },
  {
    term: 'DNS',
    definition:
      'The Domain Name System translates human-readable domain names (e.g., example.com) into IP addresses that network devices use to route traffic. It operates as a distributed, hierarchical database and is essential to internet navigation.',
    relatedLayer: 7,
    relatedTerms: ['IP Address', 'HTTP', 'UDP'],
    category: 'protocol'
  },
  {
    term: 'Dynamic Route',
    definition:
      'A route learned automatically through routing protocols such as OSPF, BGP, or RIP. Dynamic routing adapts to network topology changes, recalculating paths when links fail or new routes become available.',
    relatedLayer: 3,
    relatedTerms: ['Static Route', 'Routing Table', 'OSPF'],
    category: 'routing'
  },
  {
    term: 'Encapsulation',
    definition:
      'The process of wrapping data with protocol headers (and sometimes trailers) as it moves down through the layers of the network model. Each layer adds its own control information to form the protocol data unit for that layer.',
    relatedLayer: null,
    relatedTerms: ['Decapsulation', 'PDU', 'OSI Model'],
    category: 'general'
  },
  {
    term: 'Encryption',
    definition:
      'The process of converting plaintext data into an unreadable ciphertext format using a cryptographic algorithm and key. Encryption protects data confidentiality during storage and transmission across networks.',
    relatedLayer: 6,
    relatedTerms: ['Symmetric Encryption', 'Asymmetric Encryption', 'TLS/SSL'],
    category: 'security'
  },
  {
    term: 'Firewall',
    definition:
      'A network security device or software that monitors and filters incoming and outgoing traffic based on predefined rules. Firewalls can operate at multiple OSI layers, inspecting packets, segments, or application data to enforce access policies.',
    relatedLayer: [3, 4, 7],
    relatedTerms: ['IDS/IPS', 'VPN', 'Router'],
    category: 'security'
  },
  {
    term: 'Frequency Band',
    definition:
      'A range of radio frequencies allocated for wireless communication. Wi-Fi commonly uses the 2.4 GHz band for longer range and the 5 GHz and 6 GHz bands for higher throughput with shorter range.',
    relatedLayer: 1,
    relatedTerms: ['Channel', '802.11', 'SSID'],
    category: 'wireless'
  },
  {
    term: 'FTP',
    definition:
      'File Transfer Protocol is used to transfer files between a client and a server over a TCP connection. FTP uses separate control (port 21) and data (port 20) connections but transmits credentials in plaintext, making SFTP or FTPS preferred for secure transfers.',
    relatedLayer: 7,
    relatedTerms: ['TCP', 'SSH', 'Port Number'],
    category: 'protocol'
  },
  {
    term: 'Gateway',
    definition:
      'A network device or software that serves as a translation point between two networks using different protocols or architectures. In common usage, the term often refers to a default gateway, which is the router that forwards traffic off the local subnet.',
    relatedLayer: [3, 7],
    relatedTerms: ['Router', 'Default Gateway', 'Firewall'],
    category: 'device'
  },
  {
    term: 'Hop Count',
    definition:
      'The number of intermediate routers a packet must pass through to reach its destination. Hop count is used as a routing metric by protocols like RIP, where a lower hop count indicates a preferred path.',
    relatedLayer: 3,
    relatedTerms: ['TTL', 'Router', 'Metric'],
    category: 'routing'
  },
  {
    term: 'HTTP',
    definition:
      'Hypertext Transfer Protocol is the foundation of data communication on the World Wide Web. It defines a request-response model where clients send requests (GET, POST, etc.) and servers return responses containing status codes and content.',
    relatedLayer: 7,
    relatedTerms: ['HTTPS', 'TCP', 'DNS'],
    category: 'protocol'
  },
  {
    term: 'HTTPS',
    definition:
      'HTTP Secure is the encrypted version of HTTP that uses TLS to protect data in transit. HTTPS authenticates the server, encrypts the communication channel, and ensures data integrity between the browser and the web server.',
    relatedLayer: 7,
    relatedTerms: ['HTTP', 'TLS/SSL', 'Certificate'],
    category: 'protocol'
  },
  {
    term: 'Hub',
    definition:
      'A Layer 1 device that connects multiple Ethernet devices into a single network segment by repeating incoming electrical signals out all other ports. Hubs create a single collision domain and have been largely replaced by switches.',
    relatedLayer: 1,
    relatedTerms: ['Switch', 'Repeater', 'Bridge'],
    category: 'device'
  },
  {
    term: 'ICMP',
    definition:
      'Internet Control Message Protocol is used for diagnostic and error-reporting purposes in IP networks. Tools such as ping and traceroute rely on ICMP messages to test reachability and trace the path to a destination.',
    relatedLayer: 3,
    relatedTerms: ['IP Address', 'Router', 'TTL'],
    category: 'protocol'
  },
  {
    term: 'IDS/IPS',
    definition:
      'An Intrusion Detection System monitors network traffic for suspicious activity and generates alerts. An Intrusion Prevention System goes further by actively blocking or mitigating detected threats in real time.',
    relatedLayer: null,
    relatedTerms: ['Firewall', 'VPN', 'Encryption'],
    category: 'security'
  },
  {
    term: 'IP Address',
    definition:
      'A logical address assigned to a network interface for identification and communication. IPv4 addresses are 32 bits (e.g., 192.168.1.1) and IPv6 addresses are 128 bits (e.g., 2001:db8::1), providing a hierarchical addressing scheme for routing.',
    relatedLayer: 3,
    relatedTerms: ['MAC Address', 'Subnet Mask', 'CIDR'],
    category: 'addressing'
  },
  {
    term: 'Jitter',
    definition:
      'The variation in packet arrival times, or delay between successive packets. High jitter is particularly disruptive to real-time applications like VoIP and video conferencing, where consistent timing is critical for quality.',
    relatedLayer: null,
    relatedTerms: ['Latency', 'QoS', 'Throughput'],
    category: 'general'
  },
  {
    term: 'Latency',
    definition:
      'The time delay for a packet to travel from its source to its destination, typically measured in milliseconds. Latency is affected by propagation delay, transmission delay, queuing, and processing at intermediate devices.',
    relatedLayer: null,
    relatedTerms: ['Bandwidth', 'Throughput', 'Jitter'],
    category: 'general'
  },
  {
    term: 'Load Balancer',
    definition:
      'A device or software that distributes incoming network traffic across multiple servers to optimize resource utilization, maximize throughput, and ensure high availability. Load balancers can operate at Layer 4 (transport) or Layer 7 (application).',
    relatedLayer: [4, 7],
    relatedTerms: ['Proxy', 'Router', 'Throughput'],
    category: 'device'
  },
  {
    term: 'Loopback',
    definition:
      'A virtual network interface used by a host to send traffic to itself for testing and inter-process communication. The IPv4 loopback address range is 127.0.0.0/8, with 127.0.0.1 being the most commonly used address.',
    relatedLayer: 3,
    relatedTerms: ['IP Address', 'ICMP', 'Port Number'],
    category: 'addressing'
  },
  {
    term: 'MAC Address',
    definition:
      'A 48-bit hardware address permanently assigned to a network interface card, expressed as six pairs of hexadecimal digits (e.g., AA:BB:CC:DD:EE:FF). MAC addresses uniquely identify devices on a local network segment and operate at Layer 2.',
    relatedLayer: 2,
    relatedTerms: ['IP Address', 'ARP', 'MAC Table'],
    category: 'addressing'
  },
  {
    term: 'MAC Table',
    definition:
      'A table maintained by a switch that maps MAC addresses to the physical ports where those addresses were learned. The switch consults this table to forward frames only to the correct port rather than flooding all ports.',
    relatedLayer: 2,
    relatedTerms: ['Switch', 'MAC Address', 'VLAN'],
    category: 'switching'
  },
  {
    term: 'Manchester Encoding',
    definition:
      'A line coding method in which each bit is represented by a transition in the middle of the bit period: a low-to-high transition encodes a 1, and a high-to-low transition encodes a 0 (per IEEE convention). This guarantees clock synchronization since every bit contains a signal change.',
    relatedLayer: 1,
    relatedTerms: ['NRZ', 'Bandwidth', 'Encoding'],
    category: 'encoding'
  },
  {
    term: 'Metric',
    definition:
      'A value used by routing protocols to determine the best path to a destination. Different protocols use different metrics: RIP uses hop count, OSPF uses cost based on bandwidth, and BGP uses path attributes and policies.',
    relatedLayer: 3,
    relatedTerms: ['Hop Count', 'Routing Table', 'OSPF'],
    category: 'routing'
  },
  {
    term: 'Modem',
    definition:
      'A device that modulates digital signals into analog form for transmission over telephone lines, cable, or fiber, and demodulates received analog signals back into digital data. Modems bridge the gap between digital networks and analog transmission media.',
    relatedLayer: 1,
    relatedTerms: ['Router', 'Bandwidth', 'Encoding'],
    category: 'device'
  },
  {
    term: 'NAT',
    definition:
      'Network Address Translation translates private IP addresses to public IP addresses at a network boundary, enabling multiple devices on a private network to share a single public IP address. Port Address Translation (PAT), also called NAT overload, extends this by mapping multiple private IPs to one public IP using unique port numbers.',
    relatedLayer: 3,
    relatedTerms: ['IP Address', 'Router', 'Port Number'],
    category: 'addressing'
  },
  {
    term: 'NRZ',
    definition:
      'Non-Return-to-Zero is a binary line coding scheme in which the signal level directly represents the bit value, with one voltage level for 0 and another for 1, without returning to a zero or neutral level between bits. It is simple but can cause synchronization issues during long runs of identical bits.',
    relatedLayer: 1,
    relatedTerms: ['Manchester Encoding', 'Bandwidth', 'Encoding'],
    category: 'encoding'
  },
  {
    term: 'OSI Model',
    definition:
      'The Open Systems Interconnection model is a seven-layer conceptual framework that standardizes network communication functions. Its layers, from bottom to top, are Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
    relatedLayer: null,
    relatedTerms: ['TCP/IP Model', 'Encapsulation', 'PDU'],
    category: 'general'
  },
  {
    term: 'OSPF',
    definition:
      'Open Shortest Path First is a link-state interior gateway routing protocol that uses Dijkstra\'s algorithm to compute the shortest path to each destination. OSPF supports hierarchical areas, fast convergence, and scales well in large enterprise networks.',
    relatedLayer: 3,
    relatedTerms: ['BGP', 'RIP', 'Routing Table'],
    category: 'routing'
  },
  {
    term: 'PDU',
    definition:
      'A Protocol Data Unit is the unit of data at a specific layer of the network model. PDUs have layer-specific names: bits (Layer 1), frames (Layer 2), packets (Layer 3), segments or datagrams (Layer 4), and data (Layers 5-7).',
    relatedLayer: null,
    relatedTerms: ['Encapsulation', 'Decapsulation', 'OSI Model'],
    category: 'general'
  },
  {
    term: 'PKI',
    definition:
      'Public Key Infrastructure is a framework of policies, hardware, software, and procedures for creating, managing, distributing, and revoking digital certificates. PKI enables secure communication by establishing a chain of trust through Certificate Authorities.',
    relatedLayer: null,
    relatedTerms: ['Certificate', 'Asymmetric Encryption', 'TLS/SSL'],
    category: 'security'
  },
  {
    term: 'Port Mirroring',
    definition:
      'A switch feature that copies all traffic from one or more ports to a designated monitoring port. Network administrators use port mirroring to capture and analyze traffic for troubleshooting, performance monitoring, or intrusion detection.',
    relatedLayer: 2,
    relatedTerms: ['Switch', 'VLAN', 'IDS/IPS'],
    category: 'switching'
  },
  {
    term: 'Port Number',
    definition:
      'A 16-bit integer (0-65535) that identifies a specific application or service on a host. Well-known ports (0-1023) are assigned to common services like HTTP (80) and SSH (22), while ephemeral ports (49152-65535) are used for client-side connections.',
    relatedLayer: 4,
    relatedTerms: ['TCP', 'UDP', 'IP Address'],
    category: 'addressing'
  },
  {
    term: 'Proxy',
    definition:
      'An intermediary server that sits between a client and a destination server, forwarding requests on the client\'s behalf. Proxies can provide caching, content filtering, access control, and anonymity for users on a network.',
    relatedLayer: 7,
    relatedTerms: ['Firewall', 'Load Balancer', 'HTTP'],
    category: 'device'
  },
  {
    term: 'QoS',
    definition:
      'Quality of Service is a set of techniques for managing network resources by prioritizing certain types of traffic. QoS mechanisms include traffic shaping, bandwidth reservation, and packet marking to ensure reliable performance for latency-sensitive applications.',
    relatedLayer: null,
    relatedTerms: ['Bandwidth', 'Latency', 'Jitter'],
    category: 'general'
  },
  {
    term: 'Repeater',
    definition:
      'A Layer 1 device that receives a weakened or degraded signal, regenerates it, and retransmits it at full strength to extend the range of a network segment. Repeaters do not inspect or filter traffic.',
    relatedLayer: 1,
    relatedTerms: ['Hub', 'Modem', 'Bandwidth'],
    category: 'device'
  },
  {
    term: 'RIP',
    definition:
      'Routing Information Protocol is a distance-vector routing protocol that uses hop count as its sole metric, with a maximum of 15 hops. RIP is simple to configure but converges slowly and is best suited for small networks.',
    relatedLayer: 3,
    relatedTerms: ['OSPF', 'BGP', 'Hop Count'],
    category: 'routing'
  },
  {
    term: 'Router',
    definition:
      'A Layer 3 device that forwards packets between different networks based on destination IP addresses and routing tables. Routers determine the best path for traffic using static routes or dynamic routing protocols.',
    relatedLayer: 3,
    relatedTerms: ['Switch', 'Routing Table', 'Default Gateway'],
    category: 'device'
  },
  {
    term: 'Routing Table',
    definition:
      'A data structure stored in a router that lists known network destinations, the next hop for each, and associated metrics. Routing tables are populated by static configuration, directly connected networks, and dynamic routing protocols.',
    relatedLayer: 3,
    relatedTerms: ['Router', 'Static Route', 'Dynamic Route'],
    category: 'routing'
  },
  {
    term: 'SMTP',
    definition:
      'Simple Mail Transfer Protocol is the standard protocol for sending email messages between mail servers over TCP port 25. SMTP handles the transfer and relay of outgoing mail, while protocols like IMAP and POP3 handle retrieval.',
    relatedLayer: 7,
    relatedTerms: ['TCP', 'DNS', 'Port Number'],
    category: 'protocol'
  },
  {
    term: 'SNMP',
    definition:
      'Simple Network Management Protocol is used to monitor and manage network devices such as routers, switches, and servers. SNMP agents on devices report status data to a management station through a structured hierarchy of management information (MIBs).',
    relatedLayer: 7,
    relatedTerms: ['Router', 'Switch', 'UDP'],
    category: 'protocol'
  },
  {
    term: 'SSH',
    definition:
      'Secure Shell is a cryptographic protocol for secure remote login, command execution, and file transfer over an unsecured network. SSH encrypts all traffic, replacing insecure protocols like Telnet and rlogin, and typically operates on TCP port 22.',
    relatedLayer: 7,
    relatedTerms: ['TLS/SSL', 'Encryption', 'Port Number'],
    category: 'protocol'
  },
  {
    term: 'SSID',
    definition:
      'Service Set Identifier is the human-readable name assigned to a wireless network that allows clients to identify and connect to a specific access point. SSIDs can be broadcast openly or hidden to require manual configuration.',
    relatedLayer: 2,
    relatedTerms: ['802.11', 'WPA/WPA2/WPA3', 'Channel'],
    category: 'wireless'
  },
  {
    term: 'Static Route',
    definition:
      'A manually configured routing entry that defines a fixed path for traffic to a specific destination network. Static routes are simple and predictable but do not adapt to topology changes and require manual updates when the network changes.',
    relatedLayer: 3,
    relatedTerms: ['Dynamic Route', 'Routing Table', 'Router'],
    category: 'routing'
  },
  {
    term: 'STP',
    definition:
      'Spanning Tree Protocol prevents switching loops in networks with redundant links by placing certain ports into a blocking state. STP builds a loop-free logical topology by electing a root bridge and calculating the shortest path from each switch to the root.',
    relatedLayer: 2,
    relatedTerms: ['Switch', 'VLAN', 'Trunking'],
    category: 'switching'
  },
  {
    term: 'Subnet Mask',
    definition:
      'A 32-bit value that divides an IP address into a network portion and a host portion. The subnet mask determines which bits identify the network and which identify individual hosts, enabling the creation of subnetworks within a larger address space.',
    relatedLayer: 3,
    relatedTerms: ['IP Address', 'CIDR', 'Default Gateway'],
    category: 'addressing'
  },
  {
    term: 'Switch',
    definition:
      'A Layer 2 device that forwards frames based on destination MAC addresses using its MAC address table. Switches create separate collision domains per port and are the primary building blocks of modern Ethernet LANs.',
    relatedLayer: 2,
    relatedTerms: ['Hub', 'Bridge', 'VLAN'],
    category: 'device'
  },
  {
    term: 'Symmetric Encryption',
    definition:
      'A cryptographic method where the same secret key is used for both encryption and decryption. Symmetric algorithms like AES are fast and efficient for bulk data encryption but require a secure method to exchange the shared key.',
    relatedLayer: 6,
    relatedTerms: ['Asymmetric Encryption', 'Encryption', 'TLS/SSL'],
    category: 'security'
  },
  {
    term: 'TCP',
    definition:
      'Transmission Control Protocol is a connection-oriented transport protocol that provides reliable, ordered delivery of data between applications. TCP uses a three-way handshake for connection setup, sequence numbers for ordering, and acknowledgments with retransmission for reliability.',
    relatedLayer: 4,
    relatedTerms: ['UDP', 'Port Number', 'HTTP'],
    category: 'protocol'
  },
  {
    term: 'TCP/IP Model',
    definition:
      'A four-layer networking model (Network Access, Internet, Transport, Application) that describes how data is transmitted across the internet. It is more practical and widely implemented than the OSI model and forms the basis of modern internet communication.',
    relatedLayer: null,
    relatedTerms: ['OSI Model', 'Encapsulation', 'PDU'],
    category: 'general'
  },
  {
    term: 'Throughput',
    definition:
      'The actual rate of successful data delivery over a network, measured over a specific time period. Throughput is typically lower than bandwidth due to protocol overhead, congestion, errors, and retransmissions.',
    relatedLayer: null,
    relatedTerms: ['Bandwidth', 'Latency', 'QoS'],
    category: 'general'
  },
  {
    term: 'TLS/SSL',
    definition:
      'Transport Layer Security (and its predecessor Secure Sockets Layer) provides encryption, authentication, and integrity for network communications. TLS is most commonly used to secure HTTP traffic as HTTPS and operates between the transport and application layers.',
    relatedLayer: [5, 6],
    relatedTerms: ['HTTPS', 'Certificate', 'Encryption'],
    category: 'protocol'
  },
  {
    term: 'Trunking',
    definition:
      'The practice of carrying traffic for multiple VLANs over a single physical link between switches using tagging protocols such as IEEE 802.1Q. Trunk ports tag each frame with its VLAN ID so the receiving switch can direct it to the correct VLAN.',
    relatedLayer: 2,
    relatedTerms: ['VLAN', 'Switch', 'STP'],
    category: 'switching'
  },
  {
    term: 'TTL',
    definition:
      'Time to Live is a field in the IP packet header that limits the lifespan of a packet by specifying the maximum number of router hops it can traverse. Each router decrements the TTL by one, and the packet is discarded when TTL reaches zero, preventing routing loops.',
    relatedLayer: 3,
    relatedTerms: ['Hop Count', 'Router', 'ICMP'],
    category: 'routing'
  },
  {
    term: 'UDP',
    definition:
      'User Datagram Protocol is a connectionless transport protocol that provides fast, low-overhead delivery without guarantees of ordering or reliability. UDP is used by latency-sensitive applications like DNS queries, streaming media, VoIP, and online gaming.',
    relatedLayer: 4,
    relatedTerms: ['TCP', 'Port Number', 'DNS'],
    category: 'protocol'
  },
  {
    term: 'UTF-8',
    definition:
      'A variable-width character encoding capable of representing every Unicode character. UTF-8 uses one to four bytes per character, is backward-compatible with ASCII, and is the dominant encoding on the web.',
    relatedLayer: 6,
    relatedTerms: ['ASCII', 'Base64', 'Encoding'],
    category: 'encoding'
  },
  {
    term: 'VLAN',
    definition:
      'A Virtual Local Area Network logically segments a physical switch into separate broadcast domains, isolating traffic between groups of ports without requiring separate hardware. VLANs improve security, reduce broadcast traffic, and simplify network management.',
    relatedLayer: 2,
    relatedTerms: ['Trunking', 'Switch', 'STP'],
    category: 'switching'
  },
  {
    term: 'VPN',
    definition:
      'A Virtual Private Network creates an encrypted tunnel over a public network such as the internet, allowing remote users or sites to communicate securely as if they were on the same private network. Common VPN protocols include IPsec, OpenVPN, and WireGuard.',
    relatedLayer: [3, 4],
    relatedTerms: ['Encryption', 'Firewall', 'TLS/SSL'],
    category: 'security'
  },
  {
    term: 'WPA/WPA2/WPA3',
    definition:
      'Wi-Fi Protected Access standards provide authentication and encryption for wireless networks. WPA2 uses AES-CCMP encryption and remains widely deployed, while WPA3 adds stronger protections including Simultaneous Authentication of Equals (SAE) and forward secrecy.',
    relatedLayer: 2,
    relatedTerms: ['SSID', '802.11', 'Encryption'],
    category: 'wireless'
  }
];
