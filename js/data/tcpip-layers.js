// TCP/IP four-layer model data
export const tcpipLayers = [
  {
    number: 1,
    name: 'Network Access',
    description:
      'The Network Access layer handles the physical transmission of data over a specific network medium and the framing, addressing, and error detection required to move frames between directly connected nodes.',
    fullDescription:
      'The Network Access layer is the foundation of the TCP/IP model, combining the responsibilities that the OSI model splits across its Physical and Data Link layers. At the physical level, this layer defines the electrical, optical, or radio signaling used to transmit raw bits over a medium such as copper cable, fiber optics, or wireless radio frequencies. It encompasses connector specifications, voltage levels, modulation schemes, and bit-rate capabilities that ensure hardware from different manufacturers can interoperate on the same network segment.\n\n'
      + 'At the data-link level, this layer organizes raw bits into frames, attaches source and destination MAC addresses, and performs error detection through mechanisms like the Frame Check Sequence (FCS). It governs media access control to coordinate how multiple devices share the same physical medium, whether through CSMA/CD in traditional Ethernet, CSMA/CA in Wi-Fi, or token-passing in legacy Token Ring networks. Protocols such as Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), and PPP all operate here.\n\n'
      + 'Because the TCP/IP model was designed with protocol independence in mind, the Network Access layer is intentionally broad. It allows any underlying network technology to serve as the transport substrate for IP packets. This flexibility is a key reason TCP/IP became the dominant internetworking architecture: higher layers do not need to know whether the data traveled over Ethernet, a cellular link, or a satellite connection, as long as this layer delivers frames reliably between adjacent nodes.',
    osiMapping: [1, 2],
    osiLayerNames: ['Physical', 'Data Link'],
    protocols: [
      'ethernet',
      'wifi',
      'ppp',
      'arp',
      'frame-relay',
      'atm',
      'bluetooth',
      'dsl'
    ],
    keyFunctions: [
      'Physical signaling and bit transmission over network media',
      'Frame creation with MAC addressing and error detection',
      'Media access control and collision management',
      'Hardware addressing using MAC addresses',
      'Conversion between frames and raw electrical, optical, or radio signals'
    ],
    keywords: [
      'Ethernet',
      'Wi-Fi',
      'MAC address',
      'frame',
      'NIC',
      'switch',
      'hub',
      'cable',
      'fiber optics',
      'CSMA/CD',
      'CSMA/CA',
      'ARP',
      'PPP',
      'physical medium',
      'IEEE 802.3',
      'IEEE 802.11',
      'bit transmission',
      'frame check sequence'
    ]
  },
  {
    number: 2,
    name: 'Internet',
    description:
      'The Internet layer is responsible for logical addressing, routing, and forwarding of packets across network boundaries, enabling end-to-end communication between hosts on different networks.',
    fullDescription:
      'The Internet layer is the cornerstone of the TCP/IP architecture and maps directly to the OSI Network layer. Its primary responsibility is to provide a uniform addressing scheme — IP addressing — that allows any device on any network to be uniquely identified and reached. By abstracting away the details of the underlying network hardware, this layer makes it possible for data to traverse multiple heterogeneous networks on its journey from source to destination, a process known as internetworking.\n\n'
      + 'Routing is the central function of this layer. Routers examine the destination IP address in each packet and consult their routing tables, which are populated by protocols such as OSPF, BGP, and RIP, to determine the best next hop toward the destination. The Internet Protocol (IP) itself comes in two versions: IPv4, which uses 32-bit addresses and remains the most widely deployed, and IPv6, which uses 128-bit addresses to accommodate the explosive growth of internet-connected devices. ICMP operates alongside IP to provide diagnostic and error-reporting capabilities, powering tools like ping and traceroute.\n\n'
      + 'This layer also handles packet fragmentation and reassembly when a datagram exceeds the Maximum Transmission Unit (MTU) of a link along its path. It operates on a best-effort, connectionless delivery model — there are no guarantees of delivery, ordering, or duplicate prevention at this layer. Those reliability concerns are deliberately delegated to the Transport layer above. This separation of concerns keeps the Internet layer lean and scalable, which has been critical to the growth of the global internet.',
    osiMapping: [3],
    osiLayerNames: ['Network'],
    protocols: [
      'ipv4',
      'ipv6',
      'icmp',
      'ipsec',
      'ospf',
      'bgp',
      'rip',
      'igmp'
    ],
    keyFunctions: [
      'Logical addressing with IP addresses (IPv4 and IPv6)',
      'Routing and forwarding packets across interconnected networks',
      'Packet fragmentation and reassembly based on MTU',
      'Best-effort, connectionless delivery of datagrams',
      'Error reporting and network diagnostics via ICMP',
      'Path selection using routing protocols (OSPF, BGP, RIP)'
    ],
    keywords: [
      'IP address',
      'IPv4',
      'IPv6',
      'router',
      'routing table',
      'packet',
      'datagram',
      'ICMP',
      'ping',
      'traceroute',
      'subnet',
      'CIDR',
      'TTL',
      'MTU',
      'fragmentation',
      'best-effort delivery',
      'OSPF',
      'BGP',
      'next hop',
      'internetworking'
    ]
  },
  {
    number: 3,
    name: 'Transport',
    description:
      'The Transport layer provides end-to-end communication services between applications, offering either reliable, connection-oriented delivery via TCP or fast, connectionless delivery via UDP.',
    fullDescription:
      'The Transport layer maps directly to the OSI Transport layer and serves as the critical bridge between the network-oriented layers below and the application-oriented layer above. Its fundamental role is to provide process-to-process communication by using port numbers to multiplex and demultiplex data streams, allowing multiple applications on a single host to communicate over the network simultaneously. Without this layer, the Internet layer would only be able to deliver data to a host, not to a specific application running on that host.\n\n'
      + 'The two primary protocols at this layer are TCP and UDP. TCP (Transmission Control Protocol) is connection-oriented: it establishes a session through a three-way handshake, guarantees in-order delivery, retransmits lost segments, and implements flow control through sliding windows and congestion control algorithms like slow start and congestion avoidance. This makes TCP suitable for applications that require reliability, such as web browsing, email, and file transfers. UDP (User Datagram Protocol), by contrast, is connectionless and offers no delivery guarantees, making it lightweight and fast — ideal for real-time applications like video streaming, online gaming, VoIP, and DNS lookups where occasional packet loss is acceptable.\n\n'
      + 'Beyond TCP and UDP, newer protocols like QUIC have emerged at this layer to address the head-of-line blocking and connection setup latency inherent in TCP. Note that TLS (Transport Layer Security), despite its name, operates above the Transport layer — it sits between Transport (L4) and Application (L7), providing encryption, authentication, and integrity for protocols like HTTPS. Concepts such as socket pairs (source IP, source port, destination IP, destination port) are central to how this layer identifies and manages individual communication sessions.',
    osiMapping: [4],
    osiLayerNames: ['Transport'],
    protocols: [
      'tcp',
      'udp',
      'quic',
      'sctp',
      'dccp'
    ],
    keyFunctions: [
      'Port-based multiplexing and demultiplexing for process-to-process delivery',
      'Reliable, ordered data delivery with error recovery (TCP)',
      'Lightweight, connectionless messaging for real-time applications (UDP)',
      'Flow control and congestion control to prevent network overload',
      'Connection establishment and teardown (TCP three-way handshake)',
      'Segmentation of application data into transport-layer segments'
    ],
    keywords: [
      'TCP',
      'UDP',
      'port number',
      'segment',
      'socket',
      'three-way handshake',
      'SYN',
      'ACK',
      'flow control',
      'congestion control',
      'sliding window',
      'retransmission',
      'reliable delivery',
      'connectionless',
      'connection-oriented',
      'multiplexing',
      'QUIC',
      'TLS',
      'well-known ports',
      'ephemeral ports'
    ]
  },
  {
    number: 4,
    name: 'Application',
    description:
      'The Application layer encompasses all protocols and services that interact directly with end-user applications, handling session management, data representation, and application-level communication.',
    fullDescription:
      'The Application layer in the TCP/IP model consolidates the responsibilities of three OSI layers — Session, Presentation, and Application — into a single, pragmatic layer. This design reflects the TCP/IP philosophy of keeping the model simple and letting application developers handle higher-level concerns within their protocols. At this layer, software interacts directly with network services to send and receive data, whether a user is browsing the web, sending email, transferring files, or querying a database. Protocols like HTTP, FTP, SMTP, DNS, and SSH all reside here.\n\n'
      + 'The session management responsibilities absorbed from the OSI Session layer include establishing, maintaining, and terminating communication sessions between applications. Many application-layer protocols handle this internally; for example, HTTP/1.1 uses persistent connections with keep-alive headers, while SSH maintains an encrypted interactive session over a single TCP connection. The presentation concerns — data encoding, encryption, and compression — are likewise handled within application protocols or by companion libraries. HTTPS relies on TLS for encryption, MIME types define how email attachments are encoded, and formats like JSON, XML, and Protocol Buffers govern how structured data is serialized for transmission.\n\n'
      + 'DNS deserves special mention as the backbone of human-friendly internet navigation, translating domain names into IP addresses. DHCP automates network configuration, assigning IP addresses, subnet masks, and default gateways to hosts. Application-layer protocols continue to evolve: HTTP has progressed from HTTP/1.0 through HTTP/1.1 and HTTP/2 to HTTP/3, which runs over QUIC for improved performance. This layer is where innovation happens most rapidly, as new protocols and APIs are designed to meet the demands of modern distributed applications, cloud computing, microservices, and the Internet of Things.',
    osiMapping: [5, 6, 7],
    osiLayerNames: ['Session', 'Presentation', 'Application'],
    protocols: [
      'http',
      'https',
      'ftp',
      'smtp',
      'dns',
      'dhcp',
      'ssh',
      'snmp',
      'pop3',
      'imap',
      'telnet',
      'ntp',
      'ldap',
      'sip',
      'mqtt'
    ],
    keyFunctions: [
      'Providing network services directly to end-user applications',
      'Domain name resolution and network configuration (DNS, DHCP)',
      'Session establishment, maintenance, and termination',
      'Data formatting, encoding, serialization, and encryption',
      'Application-specific communication (web, email, file transfer, remote access)'
    ],
    keywords: [
      'HTTP',
      'HTTPS',
      'DNS',
      'DHCP',
      'FTP',
      'SMTP',
      'SSH',
      'IMAP',
      'POP3',
      'SNMP',
      'API',
      'URL',
      'domain name',
      'web browser',
      'email client',
      'JSON',
      'XML',
      'MIME',
      'session',
      'REST',
      'request-response',
      'client-server'
    ]
  }
];
