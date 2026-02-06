export const osiLayers = [
  {
    number: 1,
    name: "Physical",
    description:
      "The Physical layer transmits raw bitstreams over a physical medium. It defines the electrical, optical, and mechanical specifications for activating, maintaining, and deactivating physical connections.",
    fullDescription:
      "The Physical layer is the foundation of the OSI model, responsible for the actual transmission of raw, unstructured data bits across a physical medium such as copper cabling, fiber optics, or wireless radio frequencies. It defines the hardware-level specifications including voltage levels, pin layouts, cable types (Cat5e, Cat6, coaxial, single-mode and multimode fiber), and connector standards like RJ-45 for Ethernet and SC/LC connectors for fiber optic links. Every piece of data that traverses a network ultimately passes through this layer as electrical signals, light pulses, or radio waves.\n\nSignaling and encoding schemes are central to Physical layer operation. Line coding techniques such as Non-Return-to-Zero (NRZ), Manchester encoding, and 4B/5B translate binary data into signal patterns suitable for the transmission medium. Modulation techniques like amplitude, frequency, and phase modulation allow data to be carried over analog channels, which is essential for wireless standards including the IEEE 802.11 family (Wi-Fi). The layer also governs data rates, synchronization of bits between sender and receiver, and the physical topology of the network.\n\nCommunication modes defined at this layer include simplex (one-direction only), half-duplex (bidirectional but one direction at a time), and full-duplex (simultaneous bidirectional communication). Devices operating at the Physical layer, such as hubs and repeaters, simply regenerate and forward electrical signals without inspecting any addressing or framing information. Understanding this layer is critical because every higher-layer protocol ultimately depends on the reliable transmission of bits across the physical medium.",
    pdu: "Bits",
    keywords: [
      "cables",
      "connectors",
      "signaling",
      "encoding",
      "modulation",
      "voltage",
      "frequency",
      "bandwidth",
      "throughput",
      "topology",
      "duplex",
      "attenuation"
    ],
    keyFunctions: [
      "Transmitting raw bitstreams over the physical medium",
      "Defining electrical, optical, and mechanical interface specifications",
      "Encoding and signaling bits using schemes like NRZ and Manchester encoding",
      "Establishing and terminating physical connections between devices",
      "Managing simplex, half-duplex, and full-duplex communication modes",
      "Determining physical topology layout (bus, star, ring, mesh)"
    ],
    protocols: [
      "ethernet-physical",
      "dsl",
      "isdn",
      "sonet",
      "802.11-phy",
      "bluetooth-phy",
      "usb",
      "t1",
      "e1"
    ],
    devices: [
      "Hubs",
      "Repeaters",
      "Network cables (Cat5e, Cat6, fiber optic, coaxial)",
      "Connectors (RJ-45, SC, LC, ST)",
      "Transceivers",
      "Wireless access point radios",
      "Media converters"
    ],
    realWorldAnalogy:
      "The Physical layer is like the road system itself — the asphalt, lane markings, and bridges. It does not decide where a car is going or what it carries; it simply provides the physical path for vehicles to travel on.",
    mnemonicWord: "Please",
    tcpipMapping: "Network Access"
  },
  {
    number: 2,
    name: "Data Link",
    description:
      "The Data Link layer provides node-to-node data transfer and handles error detection for the Physical layer. It packages raw bits into frames and manages access to the shared physical medium.",
    fullDescription:
      "The Data Link layer serves as the bridge between the raw transmission capabilities of the Physical layer and the logical addressing of the Network layer. Its primary role is to take the bitstream from Layer 1 and organize it into structured units called frames. Each frame includes source and destination MAC (Media Access Control) addresses — 48-bit hardware addresses burned into network interface cards — which enable communication between devices on the same local network segment. The layer is divided into two sublayers: the LLC (Logical Link Control) sublayer, which interfaces with the Network layer and provides flow control and multiplexing, and the MAC sublayer, which governs how devices access the physical medium and handles frame addressing.\n\nEthernet, defined by the IEEE 802.3 standard, is the dominant Data Link protocol. Switches operate at this layer, building MAC address tables by learning which MAC addresses are reachable on which ports, then forwarding frames only to the appropriate destination port rather than flooding all ports as a hub would. The Address Resolution Protocol (ARP) operates at the boundary of Layers 2 and 3, resolving known IP addresses to their corresponding MAC addresses so that frames can be properly addressed. Error detection is accomplished through Cyclic Redundancy Check (CRC) values stored in the Frame Check Sequence (FCS) field at the end of each frame.\n\nAdditional critical functions at this layer include VLANs (Virtual Local Area Networks) configured via IEEE 802.1Q tagging, which logically segment a physical switch into multiple broadcast domains. The Spanning Tree Protocol (STP) prevents broadcast storms by detecting and disabling redundant loop paths in switched networks. Media access control methods such as CSMA/CD (Carrier Sense Multiple Access with Collision Detection) for wired Ethernet and CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) for wireless networks ensure orderly shared access to the transmission medium.",
    pdu: "Frames",
    keywords: [
      "MAC address",
      "Ethernet",
      "switch",
      "frame",
      "ARP",
      "VLAN",
      "STP",
      "CRC",
      "FCS",
      "LLC",
      "CSMA/CD",
      "broadcast domain"
    ],
    keyFunctions: [
      "Framing raw bits into structured data link frames with headers and trailers",
      "Physical (MAC) addressing to identify source and destination on the local segment",
      "Error detection using CRC and Frame Check Sequence fields",
      "Media access control via CSMA/CD (wired) and CSMA/CA (wireless)",
      "Switching and MAC table-based frame forwarding",
      "VLAN segmentation and Spanning Tree loop prevention"
    ],
    protocols: [
      "ethernet",
      "802.1q",
      "arp",
      "stp",
      "ppp",
      "hdlc",
      "frame-relay",
      "lldp",
      "lacp",
      "802.11-mac"
    ],
    devices: [
      "Switches",
      "Bridges",
      "Network Interface Cards (NICs)",
      "Wireless access points (MAC layer)"
    ],
    realWorldAnalogy:
      "The Data Link layer is like the postal sorting office in your local neighborhood. It reads the house address (MAC address) on each envelope (frame), checks for damage (CRC), and delivers it to the correct house on the same street — but it cannot route mail to another city.",
    mnemonicWord: "Do",
    tcpipMapping: "Network Access"
  },
  {
    number: 3,
    name: "Network",
    description:
      "The Network layer handles logical addressing and routing, determining the best path for data to travel across interconnected networks from source to destination.",
    fullDescription:
      "The Network layer is responsible for logical addressing and routing — the process of determining how packets travel across multiple interconnected networks (internetworks) from a source host to a destination host. Unlike the Data Link layer's MAC addresses, which operate only within a local segment, Network layer addresses — primarily IPv4 (32-bit) and IPv6 (128-bit) — are hierarchical and routable, enabling end-to-end communication across the global internet. Subnetting and CIDR (Classless Inter-Domain Routing) notation allow administrators to divide IP address spaces into efficient, right-sized network blocks, conserving addresses and defining broadcast boundaries.\n\nRouters are the defining devices of this layer. They examine the destination IP address of each incoming packet, consult their routing tables, and forward the packet toward its destination via the most appropriate next hop. Routing can be configured statically (manual entries) or learned dynamically through routing protocols such as OSPF (Open Shortest Path First), BGP (Border Gateway Protocol), and RIP (Routing Information Protocol). Each of these protocols uses different algorithms and metrics — OSPF uses link-state and cost, RIP uses hop count, and BGP uses path attributes and policy — to build and maintain accurate routing tables across complex network topologies.\n\nOther essential Network layer functions include ICMP (Internet Control Message Protocol), which provides diagnostic and error-reporting capabilities used by tools like ping and traceroute. NAT (Network Address Translation) and PAT (Port Address Translation) allow multiple private hosts to share a single public IP address, which has been critical for extending the life of the IPv4 address space. The TTL (Time to Live) field in the IP header prevents packets from looping infinitely by decrementing at each hop and discarding the packet when it reaches zero. Fragmentation and reassembly allow oversized packets to be broken into smaller units to fit the Maximum Transmission Unit (MTU) of a given link.",
    pdu: "Packets",
    keywords: [
      "IP address",
      "routing",
      "subnetting",
      "CIDR",
      "router",
      "ICMP",
      "NAT",
      "TTL",
      "OSPF",
      "BGP",
      "fragmentation",
      "gateway"
    ],
    keyFunctions: [
      "Logical addressing using IPv4 and IPv6",
      "Routing packets across multiple networks using static and dynamic routing protocols",
      "Subnetting and CIDR for efficient IP address allocation",
      "NAT/PAT translation between private and public address spaces",
      "ICMP-based diagnostics and error reporting (ping, traceroute)",
      "Packet fragmentation and reassembly based on MTU constraints"
    ],
    protocols: [
      "ipv4",
      "ipv6",
      "icmp",
      "ospf",
      "bgp",
      "rip",
      "eigrp",
      "ipsec",
      "igmp",
      "nat"
    ],
    devices: [
      "Routers",
      "Layer 3 switches",
      "Firewalls (network layer filtering)"
    ],
    realWorldAnalogy:
      "The Network layer is like the GPS navigation system planning a road trip. It knows your starting city and destination city, calculates the best route through multiple highways and interchanges, and makes decisions at each junction about which direction to send you next — without caring what is inside your car.",
    mnemonicWord: "Not",
    tcpipMapping: "Internet"
  },
  {
    number: 4,
    name: "Transport",
    description:
      "The Transport layer provides end-to-end communication services, including reliable data delivery via TCP and fast, connectionless delivery via UDP. It handles segmentation, flow control, and error recovery.",
    fullDescription:
      "The Transport layer is the critical dividing line in the OSI model: layers below it (1-3) focus on network delivery, while layers above it (5-7) focus on application-level concerns. This layer provides end-to-end communication between processes running on different hosts, primarily through two protocols. TCP (Transmission Control Protocol) is connection-oriented and reliable — it establishes a session using the three-way handshake (SYN, SYN-ACK, ACK), guarantees in-order delivery, retransmits lost segments, and tears down connections gracefully with a four-way process (FIN, ACK, FIN, ACK). UDP (User Datagram Protocol) is connectionless and unreliable by design, providing minimal overhead for applications like real-time video, VoIP, and DNS queries where speed matters more than guaranteed delivery.\n\nPort numbers are the addressing mechanism at this layer, identifying specific application processes on a host. Well-known ports (0-1023) are assigned to standard services such as HTTP (80), HTTPS (443), SSH (22), and DNS (53). Registered ports (1024-49151) are used by vendor applications, and ephemeral (dynamic) ports (49152-65535) are temporarily assigned to client-side connections. The combination of an IP address and a port number forms a socket, and a pair of sockets uniquely identifies every network conversation.\n\nFlow control ensures a fast sender does not overwhelm a slow receiver. TCP implements this through a sliding window mechanism, where the receiver advertises how much buffer space it has available (the window size), and the sender limits its unacknowledged in-flight data accordingly. Congestion control algorithms — including Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery — dynamically adjust the sender's transmission rate to avoid overwhelming the network itself. Segmentation at this layer breaks large application data streams into appropriately sized segments (TCP) or datagrams (UDP) for handoff to the Network layer.",
    pdu: "Segments / Datagrams",
    keywords: [
      "TCP",
      "UDP",
      "port number",
      "three-way handshake",
      "flow control",
      "sliding window",
      "congestion control",
      "segmentation",
      "socket",
      "reliability",
      "retransmission",
      "multiplexing"
    ],
    keyFunctions: [
      "Segmenting application data into transport-layer units (segments or datagrams)",
      "Providing reliable, ordered delivery via TCP with acknowledgments and retransmission",
      "Providing fast, connectionless delivery via UDP for latency-sensitive applications",
      "Port-based multiplexing and demultiplexing to direct data to the correct process",
      "Flow control through the TCP sliding window mechanism",
      "Congestion control using Slow Start, Congestion Avoidance, and Fast Recovery algorithms"
    ],
    protocols: [
      "tcp",
      "udp",
      "sctp",
      "dccp",
      "quic"
    ],
    devices: [
      "Firewalls (stateful inspection)",
      "Load balancers",
      "Gateways"
    ],
    realWorldAnalogy:
      "The Transport layer is like a courier service. TCP is the registered-mail courier who gets a signature on delivery, tracks every package, resends lost ones, and guarantees everything arrives in order. UDP is the leaflet distributor who tosses flyers at every door as fast as possible — fast and cheap, but no guarantee that every house gets one.",
    mnemonicWord: "Throw",
    tcpipMapping: "Transport"
  },
  {
    number: 5,
    name: "Session",
    description:
      "The Session layer establishes, manages, and terminates communication sessions between applications. It handles dialog control, synchronization, and checkpointing.",
    fullDescription:
      "The Session layer is responsible for establishing, maintaining, and terminating sessions — logical connections between two communicating application processes. While the Transport layer provides a raw data pipe, the Session layer adds structure to the conversation by managing dialog control, which determines whether communication is half-duplex (taking turns) or full-duplex (simultaneous). It coordinates the opening and orderly closing of sessions, ensuring that both sides agree on the parameters of their interaction before data begins to flow and that resources are properly released when the conversation ends.\n\nOne of the Session layer's most valuable features is checkpointing and synchronization. In long data transfers, the Session layer can insert synchronization points (checkpoints) into the data stream. If a failure or interruption occurs, the transfer can resume from the last successful checkpoint rather than restarting from the beginning. This is especially important for large file transfers and database transactions where restarting from scratch would be costly. Authentication and authorization handshakes that establish a user's identity and permissions for a particular session are also logically associated with this layer.\n\nPractical protocols and services that embody Session layer functions include NetBIOS (Network Basic Input/Output System), which provides session services for name resolution and communication on local networks; RPC (Remote Procedure Call), which allows a program to execute a procedure on a remote host as if it were local by managing the session context; and NFS (Network File System), which maintains session state to allow transparent remote file access. In modern networking, Session layer functionality is often integrated directly into application-layer protocols (for example, HTTP session cookies or TLS session resumption), which is why Layers 5 through 7 are sometimes treated as a single combined layer in the TCP/IP model.",
    pdu: "Data",
    keywords: [
      "session",
      "dialog control",
      "synchronization",
      "checkpoint",
      "authentication",
      "NetBIOS",
      "RPC",
      "NFS",
      "establishment",
      "teardown"
    ],
    keyFunctions: [
      "Establishing, maintaining, and terminating sessions between applications",
      "Managing dialog control (simplex, half-duplex, full-duplex turn-taking)",
      "Inserting synchronization points and checkpoints for recovery after failures",
      "Coordinating authentication and authorization exchanges at session setup",
      "Enabling session resumption and reconnection after interruptions"
    ],
    protocols: [
      "netbios",
      "rpc",
      "nfs",
      "pptp",
      "l2tp",
      "sip",
      "socks"
    ],
    devices: [
      "Gateways",
      "Firewalls (application-aware / proxy-based)",
      "Session border controllers"
    ],
    realWorldAnalogy:
      "The Session layer is like the chairperson of a meeting. They open the meeting, decide who speaks when (dialog control), call for breaks and note where the discussion left off (checkpointing), and formally close the meeting — ensuring the conversation is orderly from start to finish.",
    mnemonicWord: "Sausage",
    tcpipMapping: "Application"
  },
  {
    number: 6,
    name: "Presentation",
    description:
      "The Presentation layer translates, encrypts, and compresses data so that information sent by one system's application layer can be understood by another. It acts as the network's data translator.",
    fullDescription:
      "The Presentation layer acts as the translator and formatter of the network, ensuring that data exchanged between applications on different systems is in a mutually understandable format. When a sending application encodes data in one format, the Presentation layer on the receiving side converts it into the format expected by the local application. Character encoding standards like ASCII, UTF-8, and Unicode are handled here, as are data serialization formats such as JSON, XML, and ASN.1 (Abstract Syntax Notation One), which provide structured, platform-independent representations of complex data objects. MIME (Multipurpose Internet Mail Extensions) types, which identify the format of email attachments and HTTP content, are also a Presentation layer concern.\n\nEncryption and decryption are among the most critical functions of this layer. Symmetric encryption algorithms (such as AES) use a single shared key for both encryption and decryption and are efficient for bulk data. Asymmetric encryption (such as RSA and elliptic-curve cryptography) uses a public/private key pair and is typically used for key exchange and digital signatures. SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) straddle the Presentation and Session layers, providing encrypted tunnels that protect data confidentiality and integrity during transit. The TLS handshake negotiates cipher suites, exchanges keys, and verifies certificates before any application data is sent.\n\nData compression is the third major function, reducing the size of data to improve transmission efficiency and reduce bandwidth consumption. Lossless compression (such as gzip, deflate, and zlib) preserves all original data and is used for text and executables. Lossy compression (such as JPEG for images and MP3/AAC for audio) sacrifices some fidelity for dramatically smaller file sizes, suitable for media where minor quality loss is acceptable. The Presentation layer ensures that both sides of a communication agree on the compression method and can correctly decompress received data.",
    pdu: "Data",
    keywords: [
      "encryption",
      "decryption",
      "SSL",
      "TLS",
      "compression",
      "character encoding",
      "ASCII",
      "UTF-8",
      "serialization",
      "MIME",
      "ASN.1",
      "formatting"
    ],
    keyFunctions: [
      "Translating data between application formats and network-standard representations",
      "Encrypting and decrypting data using symmetric (AES) and asymmetric (RSA) algorithms",
      "Managing SSL/TLS handshake negotiation for secure communication",
      "Compressing and decompressing data (lossless and lossy) to optimize bandwidth",
      "Handling character encoding conversion (ASCII, UTF-8, Unicode)"
    ],
    protocols: [
      "ssl",
      "tls",
      "mime",
      "asn.1",
      "jpeg",
      "mpeg",
      "gif",
      "png"
    ],
    devices: [
      "SSL/TLS offload appliances",
      "Encryption gateways",
      "Application delivery controllers"
    ],
    realWorldAnalogy:
      "The Presentation layer is like a professional interpreter at an international conference. One speaker talks in Japanese, another in French — the interpreter translates between them, ensures documents are in the right format, encrypts confidential notes so only authorized delegates can read them, and compresses lengthy reports into executive summaries.",
    mnemonicWord: "Pizza",
    tcpipMapping: "Application"
  },
  {
    number: 7,
    name: "Application",
    description:
      "The Application layer is the interface between the network and end-user software. It provides network services directly to user applications such as web browsers, email clients, and file transfer tools.",
    fullDescription:
      "The Application layer is the topmost layer of the OSI model and the one closest to the end user. It does not refer to applications themselves (such as a web browser or email client) but rather to the network protocols and services those applications rely on to communicate over the network. When you type a URL into a browser, the browser uses HTTP (Hypertext Transfer Protocol) or HTTPS (HTTP over TLS) at this layer to request web pages from a server. DNS (Domain Name System) translates human-readable domain names into IP addresses, serving as the internet's phonebook. FTP (File Transfer Protocol) enables file uploads and downloads, while SMTP (Simple Mail Transfer Protocol) handles sending email.\n\nEmail retrieval is managed by POP3 (Post Office Protocol version 3), which downloads messages to a local client and typically deletes them from the server, and IMAP (Internet Message Access Protocol), which synchronizes messages across multiple devices by keeping them on the server. DHCP (Dynamic Host Configuration Protocol) automates network configuration by assigning IP addresses, subnet masks, default gateways, and DNS servers to hosts when they join a network. SNMP (Simple Network Management Protocol) allows network administrators to monitor and manage network devices such as routers, switches, and servers by polling for status data and receiving alerts (traps). SSH (Secure Shell) provides encrypted remote command-line access to network devices and servers, replacing the older, unencrypted Telnet protocol.\n\nThe Application layer is where network services are most visible and tangible to users. It defines the syntax and semantics of application-level messages, the rules for initiating and responding to requests, and the error-handling behaviors that applications must support. Because it is the entry point for all user-generated network traffic, it is also a primary target for security threats — phishing, malware delivery, DNS spoofing, and application-level denial-of-service attacks all operate at this layer. Firewalls with deep packet inspection, web application firewalls (WAFs), and intrusion detection/prevention systems frequently analyze Layer 7 traffic to detect and block malicious activity.",
    pdu: "Data",
    keywords: [
      "HTTP",
      "DNS",
      "SMTP",
      "FTP",
      "DHCP",
      "SNMP",
      "SSH",
      "API",
      "web browser",
      "email",
      "Telnet",
      "application protocol"
    ],
    keyFunctions: [
      "Providing network services to end-user applications (web, email, file transfer)",
      "Translating domain names to IP addresses via DNS",
      "Automating network configuration via DHCP address assignment",
      "Enabling remote administration through SSH and SNMP",
      "Defining application-level message formats, request/response rules, and error handling",
      "Serving as the entry point for user-facing network security controls"
    ],
    protocols: [
      "http",
      "https",
      "dns",
      "ftp",
      "smtp",
      "pop3",
      "imap",
      "dhcp",
      "snmp",
      "ssh",
      "telnet",
      "tftp",
      "ntp",
      "ldap"
    ],
    devices: [
      "Web application firewalls (WAFs)",
      "Proxy servers",
      "Load balancers (Layer 7 / application-aware)",
      "Intrusion detection/prevention systems (IDS/IPS)"
    ],
    realWorldAnalogy:
      "The Application layer is like the front desk of a hotel. It is the point of direct interaction — guests (users) make requests, ask for services, and receive responses. Behind the desk, a vast operation (the lower layers) handles logistics, routing, and delivery, but the guest only sees and interacts with the welcoming interface at the top.",
    mnemonicWord: "Away",
    tcpipMapping: "Application"
  }
];
