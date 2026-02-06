export const protocols = [
  // ─── Layer 7: Application ────────────────────────────────────────────
  {
    id: 'http',
    name: 'HTTP',
    fullName: 'Hypertext Transfer Protocol',
    layer: 7,
    tcpipLayer: 'Application',
    port: 80,
    description:
      'HTTP is the foundation of data communication on the World Wide Web. It operates as a request-response protocol between clients and servers, using methods such as GET, POST, PUT, and DELETE to manipulate resources. HTTP is stateless, meaning each request is independent of any previous request.',
    keyFeatures: [
      'Stateless request-response protocol',
      'Supports multiple methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS',
      'Human-readable headers in plain text',
      'Extensible via custom headers and content types',
      'Persistent connections with keep-alive (HTTP/1.1+)',
      'Multiplexed streams and server push (HTTP/2+)'
    ],
    headerFields: [
      'Method',
      'URI',
      'Version',
      'Host',
      'Content-Type',
      'Content-Length',
      'Accept',
      'Authorization',
      'Cache-Control',
      'Connection'
    ],
    useCases: [
      'Web page retrieval and browsing',
      'RESTful API communication',
      'File downloads from web servers',
      'Webhook delivery between services',
      'Streaming media delivery'
    ],
    related: ['https', 'tcp', 'dns', 'ssl-tls'],
    animated: false
  },
  {
    id: 'https',
    name: 'HTTPS',
    fullName: 'Hypertext Transfer Protocol Secure',
    layer: 7,
    tcpipLayer: 'Application',
    port: 443,
    description:
      'HTTPS is the secure version of HTTP, encrypting communication between client and server using TLS. It provides authentication, data integrity, and confidentiality, preventing eavesdropping and man-in-the-middle attacks. HTTPS is now the default for virtually all web traffic.',
    keyFeatures: [
      'End-to-end encryption via TLS',
      'Server authentication through X.509 certificates',
      'Data integrity protection against tampering',
      'Same HTTP semantics wrapped in a secure tunnel',
      'Required for modern web features (service workers, geolocation)',
      'Certificate transparency and pinning support'
    ],
    headerFields: [
      'Method',
      'URI',
      'Version',
      'Host',
      'Strict-Transport-Security',
      'Content-Type',
      'Content-Length',
      'Accept',
      'Authorization',
      'Cache-Control'
    ],
    useCases: [
      'Secure web browsing and e-commerce',
      'Online banking and financial transactions',
      'API authentication and secure data exchange',
      'Email web clients',
      'Any web communication requiring privacy'
    ],
    related: ['http', 'ssl-tls', 'tcp', 'dns'],
    animated: false
  },
  {
    id: 'dns',
    name: 'DNS',
    fullName: 'Domain Name System',
    layer: 7,
    tcpipLayer: 'Application',
    port: 53,
    description:
      'DNS translates human-readable domain names into IP addresses, functioning as the internet\'s distributed directory service. It uses a hierarchical namespace with root servers, TLD servers, and authoritative nameservers to resolve queries. DNS supports both UDP for standard queries and TCP for zone transfers and large responses.',
    keyFeatures: [
      'Hierarchical distributed database',
      'Caching at multiple levels (local, resolver, authoritative)',
      'Supports multiple record types: A, AAAA, CNAME, MX, NS, TXT, SRV',
      'Recursive and iterative query resolution',
      'DNSSEC for cryptographic authentication of responses',
      'UDP for queries (< 512 bytes), TCP for zone transfers'
    ],
    headerFields: [
      'Transaction ID',
      'Flags (QR, Opcode, AA, TC, RD, RA, RCODE)',
      'Question Count',
      'Answer Count',
      'Authority Count',
      'Additional Count',
      'Query Name',
      'Query Type',
      'Query Class'
    ],
    useCases: [
      'Resolving domain names to IP addresses for web browsing',
      'Email routing via MX records',
      'Service discovery using SRV records',
      'Load balancing through round-robin DNS',
      'Content delivery network steering'
    ],
    related: ['udp', 'tcp', 'http', 'dhcp'],
    animated: true
  },
  {
    id: 'ftp',
    name: 'FTP',
    fullName: 'File Transfer Protocol',
    layer: 7,
    tcpipLayer: 'Application',
    port: 21,
    description:
      'FTP is a standard protocol for transferring files between a client and server over a TCP network. It uses separate control (port 21) and data (port 20 or dynamic) connections. FTP supports both active and passive modes for data transfer, and authentication via username and password.',
    keyFeatures: [
      'Separate control and data channels',
      'Active and passive transfer modes',
      'ASCII and binary transfer types',
      'Directory listing and navigation',
      'Resume support for interrupted transfers',
      'Anonymous access capability'
    ],
    headerFields: [
      'Command Code',
      'Command Argument',
      'Reply Code (3-digit)',
      'Reply Text',
      'Transfer Mode',
      'Data Type'
    ],
    useCases: [
      'Bulk file transfers between servers',
      'Website content deployment',
      'Firmware updates for network devices',
      'Sharing large datasets',
      'Legacy system file exchange'
    ],
    related: ['tcp', 'ssh', 'ssl-tls'],
    animated: false
  },
  {
    id: 'smtp',
    name: 'SMTP',
    fullName: 'Simple Mail Transfer Protocol',
    layer: 7,
    tcpipLayer: 'Application',
    port: 25,
    description:
      'SMTP is the standard protocol for sending email messages between mail servers and from clients to servers. It uses a store-and-forward model, relaying messages through one or more MTAs until they reach the destination. SMTP operates over TCP and uses port 587 for authenticated submission and port 465 for implicit TLS.',
    keyFeatures: [
      'Store-and-forward message delivery',
      'EHLO-based capability negotiation',
      'STARTTLS for opportunistic encryption',
      'Authentication via SASL mechanisms',
      'Support for MIME multipart messages',
      'Delivery status notifications (DSN)'
    ],
    headerFields: [
      'HELO/EHLO',
      'MAIL FROM',
      'RCPT TO',
      'DATA',
      'From',
      'To',
      'Subject',
      'Date',
      'Message-ID',
      'MIME-Version'
    ],
    useCases: [
      'Sending outbound email from clients',
      'Relaying email between mail servers',
      'Automated notification and alert systems',
      'Marketing and transactional email delivery',
      'Inter-organization email exchange'
    ],
    related: ['tcp', 'pop3', 'imap', 'dns', 'ssl-tls'],
    animated: false
  },
  {
    id: 'pop3',
    name: 'POP3',
    fullName: 'Post Office Protocol version 3',
    layer: 7,
    tcpipLayer: 'Application',
    port: 110,
    description:
      'POP3 is a protocol used by email clients to retrieve messages from a mail server. It downloads messages to the local device and typically deletes them from the server, making it suited for single-device access. POP3 operates over TCP and supports SSL/TLS encryption on port 995.',
    keyFeatures: [
      'Downloads email to local client storage',
      'Simple command set: USER, PASS, LIST, RETR, DELE, QUIT',
      'Optional leave-on-server mode',
      'Single mailbox access (inbox only)',
      'Lightweight server resource usage',
      'SSL/TLS support on port 995'
    ],
    headerFields: [
      'Command',
      'Argument',
      'Status Indicator (+OK / -ERR)',
      'Message Number',
      'Message Size',
      'Response Text'
    ],
    useCases: [
      'Downloading email for offline reading',
      'Simple single-device email access',
      'Low-bandwidth email retrieval',
      'Archiving email locally',
      'Legacy email client support'
    ],
    related: ['smtp', 'imap', 'tcp', 'ssl-tls'],
    animated: false
  },
  {
    id: 'imap',
    name: 'IMAP',
    fullName: 'Internet Message Access Protocol',
    layer: 7,
    tcpipLayer: 'Application',
    port: 143,
    description:
      'IMAP allows email clients to access and manage messages stored on a remote mail server. Unlike POP3, IMAP keeps messages on the server, enabling multi-device synchronization of mailboxes, folders, and message flags. IMAP supports SSL/TLS encryption on port 993.',
    keyFeatures: [
      'Server-side message storage and management',
      'Multi-device synchronization of mail state',
      'Folder hierarchy and mailbox management',
      'Partial message fetching (headers only, body parts)',
      'Server-side search capabilities',
      'IDLE command for real-time push notifications'
    ],
    headerFields: [
      'Tag',
      'Command',
      'Arguments',
      'Status Response (OK, NO, BAD)',
      'Mailbox Name',
      'Message Sequence Number',
      'UID',
      'Flags'
    ],
    useCases: [
      'Multi-device email access and synchronization',
      'Corporate email systems with shared folders',
      'Webmail backend access',
      'Mobile email client connectivity',
      'Email archival with server-side retention'
    ],
    related: ['smtp', 'pop3', 'tcp', 'ssl-tls'],
    animated: false
  },
  {
    id: 'dhcp',
    name: 'DHCP',
    fullName: 'Dynamic Host Configuration Protocol',
    layer: 7,
    tcpipLayer: 'Application',
    port: '67/68',
    description:
      'DHCP automatically assigns IP addresses and network configuration parameters to devices on a network. It uses a four-step DORA process (Discover, Offer, Request, Acknowledge) to lease addresses from a pool. DHCP operates over UDP, with servers on port 67 and clients on port 68.',
    keyFeatures: [
      'Automatic IP address allocation from a defined pool',
      'DORA handshake: Discover, Offer, Request, Acknowledge',
      'Lease-based address assignment with renewal timers',
      'Distributes subnet mask, gateway, DNS, and other options',
      'Relay agent support for cross-subnet operation',
      'Address conflict detection via gratuitous ARP'
    ],
    headerFields: [
      'Op (Request/Reply)',
      'Hardware Type',
      'Hardware Address Length',
      'Hops',
      'Transaction ID',
      'Seconds Elapsed',
      'Flags',
      'Client IP Address',
      'Your IP Address',
      'Server IP Address',
      'Gateway IP Address',
      'Client Hardware Address',
      'Options (variable)'
    ],
    useCases: [
      'Automatic network configuration for workstations',
      'Guest Wi-Fi network address management',
      'ISP customer address provisioning',
      'Data center VM network bootstrapping',
      'IoT device network onboarding'
    ],
    related: ['udp', 'arp', 'ip', 'dns'],
    animated: true
  },
  {
    id: 'snmp',
    name: 'SNMP',
    fullName: 'Simple Network Management Protocol',
    layer: 7,
    tcpipLayer: 'Application',
    port: 161,
    description:
      'SNMP is used to monitor and manage network devices such as routers, switches, servers, and printers. It uses a manager-agent architecture where agents expose device data through a Management Information Base (MIB). SNMPv3 adds authentication and encryption for secure management.',
    keyFeatures: [
      'Manager-agent architecture with polling and traps',
      'Hierarchical MIB with OID-based data addressing',
      'GET, SET, GETNEXT, GETBULK, and TRAP operations',
      'Community-string authentication (v1/v2c)',
      'SNMPv3 provides encryption, authentication, and access control',
      'Trap and inform notifications for asynchronous alerts'
    ],
    headerFields: [
      'Version',
      'Community String (v1/v2c) or Security Parameters (v3)',
      'PDU Type',
      'Request ID',
      'Error Status',
      'Error Index',
      'Variable Bindings (OID-Value pairs)'
    ],
    useCases: [
      'Network device monitoring and health checks',
      'Bandwidth and traffic utilization tracking',
      'Automated alerting on device failures',
      'Configuration management of network infrastructure',
      'Capacity planning data collection'
    ],
    related: ['udp', 'tcp', 'ip'],
    animated: false
  },
  {
    id: 'ssh',
    name: 'SSH',
    fullName: 'Secure Shell Protocol',
    layer: 7,
    tcpipLayer: 'Application',
    port: 22,
    description:
      'SSH provides encrypted remote login, command execution, and tunneling over an unsecured network. It replaced insecure protocols like Telnet and rlogin by offering strong authentication and encrypted communication. SSH supports public key, password, and certificate-based authentication methods.',
    keyFeatures: [
      'Encrypted channel for remote command execution',
      'Public key and password authentication',
      'Port forwarding and secure tunneling (local, remote, dynamic)',
      'SCP and SFTP for secure file transfers',
      'Agent forwarding for key chain management',
      'X11 forwarding for remote GUI applications'
    ],
    headerFields: [
      'Packet Length',
      'Padding Length',
      'Payload',
      'Padding',
      'MAC (Message Authentication Code)',
      'Protocol Version',
      'Key Exchange Algorithm',
      'Encryption Algorithm'
    ],
    useCases: [
      'Secure remote server administration',
      'Automated deployment and CI/CD pipelines',
      'Secure file transfer via SCP/SFTP',
      'VPN tunneling through SSH port forwarding',
      'Git repository access over SSH'
    ],
    related: ['tcp', 'telnet', 'ssl-tls'],
    animated: false
  },
  {
    id: 'telnet',
    name: 'Telnet',
    fullName: 'Teletype Network Protocol',
    layer: 7,
    tcpipLayer: 'Application',
    port: 23,
    description:
      'Telnet provides bidirectional interactive text-based communication over a TCP connection. It was originally designed for remote terminal access but transmits all data, including credentials, in plaintext. Telnet has been largely replaced by SSH for remote administration due to its lack of encryption.',
    keyFeatures: [
      'Bidirectional plaintext terminal communication',
      'Network Virtual Terminal (NVT) abstraction',
      'Option negotiation via WILL, WONT, DO, DONT commands',
      'Character-at-a-time and line-at-a-time modes',
      'Simple protocol with minimal overhead',
      'Still used for debugging network services'
    ],
    headerFields: [
      'IAC (Interpret As Command)',
      'Command Code',
      'Option Code',
      'Subnegotiation Data',
      'Data Bytes'
    ],
    useCases: [
      'Legacy network device configuration',
      'Testing and debugging TCP services',
      'MUD and text-based game access',
      'Embedded system console access',
      'Quick connectivity testing to specific ports'
    ],
    related: ['tcp', 'ssh'],
    animated: false
  },

  // ─── Layer 6: Presentation ───────────────────────────────────────────
  {
    id: 'ssl-tls',
    name: 'SSL/TLS',
    fullName: 'Secure Sockets Layer / Transport Layer Security',
    layer: 6,
    tcpipLayer: 'Application',
    port: null,
    description:
      'TLS (successor to SSL) provides cryptographic security for communications over a network. It establishes an encrypted session through a handshake involving cipher suite negotiation, certificate exchange, and key derivation. TLS is used by HTTPS, SMTPS, IMAPS, and many other protocols to secure data in transit.',
    keyFeatures: [
      'Handshake protocol for session establishment and cipher negotiation',
      'X.509 certificate-based server and optional client authentication',
      'Symmetric encryption for bulk data (AES-GCM, ChaCha20-Poly1305)',
      'Perfect forward secrecy via ephemeral key exchange (ECDHE)',
      'TLS 1.3 reduces handshake to one round trip (1-RTT or 0-RTT)',
      'AEAD ciphers for combined encryption and integrity'
    ],
    headerFields: [
      'Content Type',
      'Protocol Version',
      'Length',
      'Handshake Type',
      'Cipher Suite',
      'Session ID',
      'Certificate',
      'Key Exchange Parameters',
      'Finished Verify Data'
    ],
    useCases: [
      'Securing HTTPS web traffic',
      'Encrypted email transport (STARTTLS)',
      'VPN tunnel establishment',
      'Secure API communication',
      'Database connection encryption'
    ],
    related: ['https', 'http', 'tcp', 'smtp'],
    animated: false
  },
  {
    id: 'mime',
    name: 'MIME',
    fullName: 'Multipurpose Internet Mail Extensions',
    layer: 6,
    tcpipLayer: 'Application',
    port: null,
    description:
      'MIME extends the format of email messages to support text in character sets other than ASCII, non-text attachments, multi-part message bodies, and header information in non-ASCII character sets. It is also widely used in HTTP to specify content types. MIME defines content type headers that identify the format of message bodies and attachments.',
    keyFeatures: [
      'Content-Type system for identifying data formats (type/subtype)',
      'Base64 and quoted-printable content transfer encodings',
      'Multipart message body support for attachments',
      'Character set specification beyond ASCII',
      'Extensible type registry maintained by IANA',
      'Used by both email (SMTP) and web (HTTP) protocols'
    ],
    headerFields: [
      'MIME-Version',
      'Content-Type',
      'Content-Transfer-Encoding',
      'Content-Disposition',
      'Content-ID',
      'Boundary (multipart)'
    ],
    useCases: [
      'Email attachments and multimedia messages',
      'HTTP response body type identification',
      'File upload content type specification',
      'S/MIME for encrypted and signed email',
      'Data format negotiation in APIs'
    ],
    related: ['smtp', 'http', 'pop3', 'imap'],
    animated: false
  },

  // ─── Layer 5: Session ────────────────────────────────────────────────
  {
    id: 'netbios',
    name: 'NetBIOS',
    fullName: 'Network Basic Input/Output System',
    layer: 5,
    tcpipLayer: 'Application',
    port: 139,
    description:
      'NetBIOS provides services for session establishment, name registration and resolution, and datagram distribution on local area networks. It operates over TCP/IP (NBT) using ports 137-139 and was fundamental to Windows networking. NetBIOS allows applications to communicate over a LAN using a simple name-based addressing scheme.',
    keyFeatures: [
      'Name service for registration and resolution (port 137)',
      'Datagram distribution service for connectionless messaging (port 138)',
      'Session service for connection-oriented communication (port 139)',
      'Flat 16-character namespace for network resources',
      'Broadcast-based name resolution on local segments',
      'WINS integration for cross-subnet name resolution'
    ],
    headerFields: [
      'Name Length',
      'Name (16 bytes)',
      'Name Type',
      'Scope ID',
      'Session Type',
      'Flags',
      'Data Length',
      'Packet Type'
    ],
    useCases: [
      'Windows file and printer sharing (legacy)',
      'Network neighborhood discovery',
      'SMB/CIFS transport for file sharing',
      'Legacy application communication on LANs',
      'Windows domain name resolution'
    ],
    related: ['tcp', 'udp', 'ip'],
    animated: false
  },
  {
    id: 'rpc',
    name: 'RPC',
    fullName: 'Remote Procedure Call',
    layer: 5,
    tcpipLayer: 'Application',
    port: 111,
    description:
      'RPC enables a program to execute a procedure on a remote server as if it were a local call. The client sends a request with procedure parameters, and the server returns the result. Sun RPC (ONC RPC) uses portmapper on port 111, while DCE/RPC and modern variants like gRPC operate on different transports.',
    keyFeatures: [
      'Transparent remote procedure invocation',
      'XDR (External Data Representation) for data serialization',
      'Portmapper/rpcbind for dynamic port assignment',
      'Both TCP and UDP transport support',
      'Authentication via AUTH_SYS, AUTH_DES, RPCSEC_GSS',
      'Foundation for NFS, NIS, and other distributed services'
    ],
    headerFields: [
      'Transaction ID (XID)',
      'Message Type (Call/Reply)',
      'RPC Version',
      'Program Number',
      'Program Version',
      'Procedure Number',
      'Credentials',
      'Verifier',
      'Call/Reply Body'
    ],
    useCases: [
      'NFS file system access across networks',
      'NIS/YP directory service queries',
      'Distributed computing coordination',
      'Microservice inter-process communication (gRPC)',
      'Windows DCOM and ActiveX remoting'
    ],
    related: ['tcp', 'udp', 'ip'],
    animated: false
  },

  // ─── Layer 4: Transport ──────────────────────────────────────────────
  {
    id: 'tcp',
    name: 'TCP',
    fullName: 'Transmission Control Protocol',
    layer: 4,
    tcpipLayer: 'Transport',
    port: null,
    description:
      'TCP provides reliable, ordered, and error-checked delivery of data between applications over an IP network. It establishes connections using a three-way handshake (SYN, SYN-ACK, ACK) and guarantees delivery through sequence numbers, acknowledgments, and retransmission. TCP includes flow control via sliding window and congestion control mechanisms.',
    keyFeatures: [
      'Connection-oriented with three-way handshake (SYN, SYN-ACK, ACK)',
      'Reliable delivery via sequence numbers and acknowledgments',
      'Flow control using sliding window mechanism',
      'Congestion control (slow start, congestion avoidance, fast recovery)',
      'In-order data delivery with reassembly',
      'Graceful connection termination with four-way FIN handshake'
    ],
    headerFields: [
      'Source Port',
      'Destination Port',
      'Sequence Number',
      'Acknowledgment Number',
      'Data Offset',
      'Flags (SYN, ACK, FIN, RST, PSH, URG)',
      'Window Size',
      'Checksum',
      'Urgent Pointer',
      'Options (MSS, Window Scale, SACK, Timestamps)'
    ],
    useCases: [
      'Web browsing (HTTP/HTTPS)',
      'Email delivery (SMTP, IMAP, POP3)',
      'File transfer (FTP, SFTP)',
      'Remote administration (SSH)',
      'Database client-server communication'
    ],
    related: ['ip', 'udp', 'http', 'https', 'ssh'],
    animated: true
  },
  {
    id: 'udp',
    name: 'UDP',
    fullName: 'User Datagram Protocol',
    layer: 4,
    tcpipLayer: 'Transport',
    port: null,
    description:
      'UDP is a connectionless transport protocol that provides a minimal, best-effort delivery service without guarantees of ordering, reliability, or duplicate protection. Its low overhead makes it ideal for time-sensitive applications where occasional packet loss is acceptable. UDP adds only source port, destination port, length, and checksum to IP datagrams.',
    keyFeatures: [
      'Connectionless with no handshake required',
      'Minimal 8-byte header overhead',
      'No delivery guarantees, ordering, or retransmission',
      'Supports broadcast and multicast transmission',
      'Low latency suitable for real-time applications',
      'Application-level reliability when needed (QUIC, DTLS)'
    ],
    headerFields: [
      'Source Port',
      'Destination Port',
      'Length',
      'Checksum'
    ],
    useCases: [
      'DNS query resolution',
      'VoIP and video conferencing (RTP)',
      'Online gaming with real-time state updates',
      'DHCP address assignment',
      'Streaming media and live broadcasts'
    ],
    related: ['ip', 'tcp', 'dns', 'dhcp'],
    animated: false
  },

  // ─── Layer 3: Network ────────────────────────────────────────────────
  {
    id: 'ip',
    name: 'IPv4',
    fullName: 'Internet Protocol version 4',
    layer: 3,
    tcpipLayer: 'Internet',
    port: null,
    description:
      'IPv4 is the fourth version of the Internet Protocol and the first widely deployed version that forms the basis of internet communication. It routes packets between networks using 32-bit addresses, providing approximately 4.3 billion unique addresses. IPv4 is connectionless and best-effort, relying on upper-layer protocols for reliability.',
    keyFeatures: [
      '32-bit addressing (dotted decimal notation, e.g. 192.168.1.1)',
      'Packet fragmentation and reassembly',
      'Time to Live (TTL) to prevent routing loops',
      'Header checksum for integrity verification',
      'Type of Service (ToS) / DSCP for QoS marking',
      'Options field for source routing, record route, timestamps'
    ],
    headerFields: [
      'Version',
      'IHL (Header Length)',
      'DSCP / ECN',
      'Total Length',
      'Identification',
      'Flags (DF, MF)',
      'Fragment Offset',
      'TTL',
      'Protocol',
      'Header Checksum',
      'Source Address',
      'Destination Address',
      'Options'
    ],
    useCases: [
      'Global internet packet routing',
      'LAN and WAN communication',
      'VPN tunneling (IPsec)',
      'Subnetting and VLSM network design',
      'NAT for address conservation'
    ],
    related: ['ipv6', 'tcp', 'udp', 'icmp', 'arp'],
    animated: false
  },
  {
    id: 'ipv6',
    name: 'IPv6',
    fullName: 'Internet Protocol version 6',
    layer: 3,
    tcpipLayer: 'Internet',
    port: null,
    description:
      'IPv6 is the successor to IPv4, designed to address the exhaustion of IPv4 addresses with a 128-bit address space providing approximately 3.4 x 10^38 unique addresses. It features a simplified fixed-length header, built-in IPsec support, and eliminates the need for NAT. IPv6 uses extension headers for optional features instead of a variable-length options field.',
    keyFeatures: [
      '128-bit addressing with hexadecimal colon notation',
      'Simplified fixed 40-byte header for faster processing',
      'Extension headers for optional features (routing, fragmentation, security)',
      'Stateless Address Autoconfiguration (SLAAC)',
      'Built-in IPsec support for end-to-end security',
      'No broadcast; uses multicast and anycast instead'
    ],
    headerFields: [
      'Version',
      'Traffic Class',
      'Flow Label',
      'Payload Length',
      'Next Header',
      'Hop Limit',
      'Source Address (128-bit)',
      'Destination Address (128-bit)'
    ],
    useCases: [
      'Large-scale IoT device addressing',
      'Mobile network connectivity (mobile IPv6)',
      'End-to-end connectivity without NAT',
      'Dual-stack transition from IPv4',
      'Data center and cloud infrastructure'
    ],
    related: ['ip', 'icmp', 'tcp', 'udp'],
    animated: false
  },
  {
    id: 'icmp',
    name: 'ICMP',
    fullName: 'Internet Control Message Protocol',
    layer: 3,
    tcpipLayer: 'Internet',
    port: null,
    description:
      'ICMP is a supporting protocol in the IP suite used for sending error messages and operational information about network conditions. It is used by network devices to report that a requested service is unavailable, that a host cannot be reached, or that a router has a better route. ICMP is integral to the ping and traceroute diagnostic tools.',
    keyFeatures: [
      'Error reporting for unreachable destinations and time exceeded',
      'Echo request/reply for connectivity testing (ping)',
      'Redirect messages for optimal route notification',
      'Source quench for primitive flow control (deprecated)',
      'Timestamp and address mask requests',
      'ICMPv6 extends functionality for IPv6 (NDP, MLD)'
    ],
    headerFields: [
      'Type',
      'Code',
      'Checksum',
      'Rest of Header (varies by type)',
      'Data / Original Datagram'
    ],
    useCases: [
      'Network connectivity testing with ping',
      'Path discovery and latency measurement with traceroute',
      'MTU path discovery (Packet Too Big messages)',
      'Router advertisement and solicitation',
      'Network troubleshooting and diagnostics'
    ],
    related: ['ip', 'ipv6', 'tcp', 'udp'],
    animated: false
  },
  {
    id: 'ospf',
    name: 'OSPF',
    fullName: 'Open Shortest Path First',
    layer: 3,
    tcpipLayer: 'Internet',
    port: null,
    description:
      'OSPF is a link-state interior gateway routing protocol that uses Dijkstra\'s shortest path first algorithm to calculate optimal routes. It runs directly over IP using protocol number 89 (not TCP or UDP). Routers build a complete topology map of the network by exchanging link-state advertisements (LSAs). OSPF supports hierarchical routing through areas, with Area 0 serving as the backbone.',
    keyFeatures: [
      'Link-state protocol using Dijkstra\'s SPF algorithm',
      'Fast convergence with triggered updates',
      'Hierarchical area design with backbone Area 0',
      'Equal-cost multi-path (ECMP) routing',
      'Authentication support (plaintext, MD5, SHA)',
      'Designated Router (DR) election for multi-access networks'
    ],
    headerFields: [
      'Version',
      'Type (Hello, DBD, LSR, LSU, LSAck)',
      'Packet Length',
      'Router ID',
      'Area ID',
      'Checksum',
      'Auth Type',
      'Authentication Data'
    ],
    useCases: [
      'Enterprise campus network routing',
      'Data center internal routing',
      'Service provider backbone routing',
      'Multi-area large network design',
      'Redundant path failover'
    ],
    related: ['ip', 'bgp', 'rip'],
    animated: false
  },
  {
    id: 'bgp',
    name: 'BGP',
    fullName: 'Border Gateway Protocol',
    layer: 3,
    tcpipLayer: 'Internet',
    port: 179,
    description:
      'BGP is the path-vector routing protocol that makes the global internet work by exchanging routing information between autonomous systems (ASes). It selects routes based on path attributes, policies, and rule sets rather than simple metrics. BGP is considered the "glue" of the internet, managing over 900,000 routes in the global routing table.',
    keyFeatures: [
      'Path-vector protocol operating between autonomous systems',
      'Policy-based routing with extensive attribute manipulation',
      'Incremental updates rather than periodic full-table exchanges',
      'TCP-based peering sessions (port 179)',
      'iBGP and eBGP for internal and external routing',
      'Route filtering, aggregation, and community tagging'
    ],
    headerFields: [
      'Marker',
      'Length',
      'Type (OPEN, UPDATE, NOTIFICATION, KEEPALIVE)',
      'AS Path',
      'Next Hop',
      'Local Preference',
      'MED (Multi-Exit Discriminator)',
      'Community',
      'NLRI (Network Layer Reachability Information)'
    ],
    useCases: [
      'Internet-wide inter-AS route exchange',
      'Multi-homed enterprise internet connectivity',
      'ISP peering and transit relationships',
      'Traffic engineering across WAN links',
      'MPLS VPN route distribution'
    ],
    related: ['ip', 'tcp', 'ospf', 'rip'],
    animated: false
  },
  {
    id: 'rip',
    name: 'RIP',
    fullName: 'Routing Information Protocol',
    layer: 3,
    tcpipLayer: 'Internet',
    port: 520,
    description:
      'RIP is one of the oldest distance-vector routing protocols, using hop count as its sole metric to determine the best path. It has a maximum of 15 hops, making it suitable only for small networks. RIP broadcasts its entire routing table to neighbors every 30 seconds, which results in slow convergence compared to modern protocols.',
    keyFeatures: [
      'Distance-vector algorithm with hop count metric',
      'Maximum of 15 hops (16 = unreachable)',
      'Periodic full routing table broadcasts every 30 seconds',
      'Split horizon and poison reverse for loop prevention',
      'RIPv2 adds VLSM, CIDR, and multicast updates',
      'RIPng extends support for IPv6 networks'
    ],
    headerFields: [
      'Command (Request/Response)',
      'Version',
      'Address Family Identifier',
      'Route Tag (RIPv2)',
      'IP Address',
      'Subnet Mask (RIPv2)',
      'Next Hop (RIPv2)',
      'Metric (hop count)'
    ],
    useCases: [
      'Small office/home office network routing',
      'Simple stub network routing',
      'Legacy network environments',
      'Educational and lab routing exercises',
      'Backup routing protocol with redistribution'
    ],
    related: ['ip', 'udp', 'ospf', 'bgp'],
    animated: false
  },

  // ─── Layer 2: Data Link ──────────────────────────────────────────────
  {
    id: 'arp',
    name: 'ARP',
    fullName: 'Address Resolution Protocol',
    layer: 2,
    tcpipLayer: 'Network Access',
    port: null,
    description:
      'ARP resolves IPv4 addresses to MAC (hardware) addresses on a local network segment. When a host needs to send a frame to a known IP address, it broadcasts an ARP request; the target host responds with its MAC address. ARP maintains a cache of recent mappings to reduce broadcast traffic.',
    keyFeatures: [
      'Broadcast-based IPv4-to-MAC address resolution',
      'Dynamic ARP cache with timeout-based expiration',
      'Gratuitous ARP for address conflict detection and failover',
      'Proxy ARP for routing between subnets',
      'Static ARP entries for security-sensitive environments',
      'Vulnerable to ARP spoofing/poisoning attacks'
    ],
    headerFields: [
      'Hardware Type',
      'Protocol Type',
      'Hardware Address Length',
      'Protocol Address Length',
      'Operation (Request = 1, Reply = 2)',
      'Sender Hardware Address',
      'Sender Protocol Address',
      'Target Hardware Address',
      'Target Protocol Address'
    ],
    useCases: [
      'Resolving IP addresses to MAC addresses on LANs',
      'VRRP/HSRP virtual IP failover announcements',
      'Duplicate IP address detection',
      'Layer 2 network troubleshooting',
      'Network scanning and host discovery'
    ],
    related: ['ip', 'ethernet', 'dhcp'],
    animated: true
  },
  {
    id: 'ethernet',
    name: 'Ethernet',
    fullName: 'IEEE 802.3 Ethernet',
    layer: 2,
    tcpipLayer: 'Network Access',
    port: null,
    description:
      'Ethernet is the most widely deployed LAN technology, defining wiring and signaling standards for the physical layer and frame format for the data link layer. It uses MAC addresses for frame delivery and CSMA/CD (half-duplex) or full-duplex switching for media access. Modern Ethernet supports speeds from 10 Mbps to 400 Gbps.',
    keyFeatures: [
      '48-bit MAC addressing for unique device identification',
      'Frame-based data encapsulation with preamble and FCS',
      'CSMA/CD for half-duplex and full-duplex switching',
      'VLAN tagging (802.1Q) for logical network segmentation',
      'Auto-negotiation of speed and duplex settings',
      'Jumbo frames for reduced overhead on high-speed networks'
    ],
    headerFields: [
      'Preamble (7 bytes)',
      'Start Frame Delimiter (1 byte)',
      'Destination MAC Address',
      'Source MAC Address',
      '802.1Q Tag (optional)',
      'EtherType / Length',
      'Payload (46-1500 bytes)',
      'Frame Check Sequence (CRC-32)'
    ],
    useCases: [
      'Local area network connectivity',
      'Data center server interconnection',
      'Industrial and automotive networking',
      'Metropolitan area network backbones',
      'Storage area networking (FCoE)'
    ],
    related: ['arp', 'ip', 'stp', 'wifi'],
    animated: false
  },
  {
    id: 'stp',
    name: 'STP',
    fullName: 'Spanning Tree Protocol',
    layer: 2,
    tcpipLayer: 'Network Access',
    port: null,
    description:
      'STP prevents broadcast storms and loops in bridged/switched Ethernet networks by creating a loop-free logical topology. It elects a root bridge and calculates the shortest path from every switch to the root, blocking redundant links. RSTP (802.1w) and MSTP (802.1s) provide faster convergence and multi-instance support.',
    keyFeatures: [
      'Root bridge election based on lowest bridge ID',
      'Port roles: Root, Designated, Blocked/Alternate',
      'Port states: Blocking, Listening, Learning, Forwarding',
      'BPDU (Bridge Protocol Data Unit) exchange for topology calculation',
      'RSTP (802.1w) converges in seconds instead of 30-50 seconds',
      'MSTP (802.1s) supports multiple spanning tree instances per VLAN group'
    ],
    headerFields: [
      'Protocol Identifier',
      'Protocol Version',
      'BPDU Type',
      'Flags',
      'Root Bridge ID',
      'Root Path Cost',
      'Sender Bridge ID',
      'Port ID',
      'Message Age',
      'Max Age',
      'Hello Time',
      'Forward Delay'
    ],
    useCases: [
      'Loop prevention in redundant switch topologies',
      'Enterprise campus network resilience',
      'Data center layer 2 redundancy',
      'Ensuring single active path for broadcast domains',
      'Automatic failover when primary links fail'
    ],
    related: ['ethernet', 'arp'],
    animated: false
  },

  // ─── Layer 1: Physical ───────────────────────────────────────────────
  {
    id: 'wifi',
    name: 'Wi-Fi',
    fullName: 'IEEE 802.11 Wireless LAN',
    layer: 1,
    tcpipLayer: 'Network Access',
    port: null,
    description:
      'IEEE 802.11 (Wi-Fi) defines the standards for wireless local area networking using radio frequencies in the 2.4 GHz, 5 GHz, and 6 GHz bands. It specifies both the physical layer (modulation, channel widths, MIMO) and the MAC layer (CSMA/CA, frame formats, association). Wi-Fi generations range from 802.11b (11 Mbps) to 802.11be Wi-Fi 7 (up to 46 Gbps).',
    keyFeatures: [
      'CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)',
      'Multiple frequency bands: 2.4 GHz, 5 GHz, 6 GHz',
      'MIMO and MU-MIMO for spatial multiplexing',
      'OFDM and OFDMA for efficient spectrum usage',
      'WPA3 security with SAE (Simultaneous Authentication of Equals)',
      'Beamforming for directional signal transmission'
    ],
    headerFields: [
      'Frame Control',
      'Duration / ID',
      'Address 1 (Receiver)',
      'Address 2 (Transmitter)',
      'Address 3 (BSSID or Destination)',
      'Sequence Control',
      'Address 4 (optional, WDS)',
      'QoS Control (optional)',
      'HT/VHT/HE Control (optional)',
      'Frame Body',
      'FCS'
    ],
    useCases: [
      'Wireless internet access in homes and offices',
      'Public hotspot connectivity',
      'IoT device wireless communication',
      'Enterprise wireless campus deployments',
      'Wireless backhaul for mesh networks'
    ],
    related: ['ethernet', 'ip', 'arp', 'dhcp'],
    animated: false
  }
];
