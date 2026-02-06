export const devices = [
  {
    id: 'hub',
    name: 'Hub',
    layer: 1,
    description:
      'A hub is a basic Layer 1 device that connects multiple Ethernet devices on the same network segment, making them act as a single collision domain. It receives electrical signals on one port and blindly rebroadcasts them out every other port, with no awareness of MAC addresses or frames.',
    keyFunctions: [
      'Rebroadcasts incoming electrical signals to all ports except the source',
      'Operates entirely in half-duplex mode, sharing bandwidth among all ports',
      'Creates a single collision domain across all connected devices',
      'Regenerates weakened signals to extend physical reach (similar to a repeater)',
      'Provides a simple, low-cost way to connect a small number of hosts'
    ],
    howItWorks:
      'When a hub receives an electrical signal on any one of its ports, it amplifies and copies that signal out to every other port. It has no understanding of frames, MAC addresses, or any higher-level data structure — it simply deals in raw voltage on the wire.\n\nBecause every port shares the same collision domain, only one device can transmit at a time. If two devices transmit simultaneously, a collision occurs, and both must back off and retry using the CSMA/CD algorithm. This severely limits throughput as the number of connected devices grows, which is why hubs have been almost entirely replaced by switches in modern networks.',
    protocols: ['ethernet'],
    icon: 'hub',
    realWorldAnalogy:
      'A hub is like a person with a megaphone in a room — when one person speaks into it, everyone in the room hears the message, whether it was meant for them or not.',
    commonBrands: ['Netgear', 'D-Link', 'TP-Link']
  },
  {
    id: 'repeater',
    name: 'Repeater',
    layer: 1,
    description:
      'A repeater is the simplest network device, operating at the Physical layer to regenerate and retransmit electrical, optical, or wireless signals. Its sole purpose is to extend the maximum distance a signal can travel before it degrades beyond recognition.',
    keyFunctions: [
      'Receives a weakened or attenuated signal on one port',
      'Regenerates the signal to its original strength and timing',
      'Retransmits the clean signal out the other port',
      'Extends the usable cable length beyond the standard maximum (e.g., 100 m for Cat5e)',
      'Operates transparently — higher layers are completely unaware of its presence'
    ],
    howItWorks:
      'As an electrical or optical signal travels through a cable, it gradually loses strength (attenuation) and picks up noise. A repeater sits between two cable segments, captures the incoming degraded signal, reconstructs a clean copy, and sends it onward. It has no concept of addresses, frames, or packets — it works purely at the level of voltage, light, or radio waves.\n\nModern fiber-optic networks use optical repeaters (or optical amplifiers) to span distances of hundreds of kilometers. In wireless networking, Wi-Fi range extenders are essentially repeaters that receive and retransmit radio signals to cover dead zones.',
    protocols: [],
    icon: 'repeater',
    realWorldAnalogy:
      'A repeater is like a relay runner passing a baton — it receives the signal, refreshes it, and passes it along so it can travel further than it could on its own.',
    commonBrands: ['Netgear', 'TP-Link', 'Cisco']
  },
  {
    id: 'modem',
    name: 'Modem',
    layer: 1,
    description:
      'A modem (modulator-demodulator) converts digital signals from a computer into analog signals suitable for transmission over telephone lines, cable systems, or fiber, and vice versa. It bridges the gap between a local digital network and an analog or differently-encoded carrier medium.',
    keyFunctions: [
      'Modulates digital data into analog signals for transmission over the carrier medium',
      'Demodulates incoming analog signals back into digital data the network can use',
      'Handles line encoding, error correction, and signal negotiation with the ISP',
      'Establishes and maintains the physical connection to the service provider',
      'Supports various modulation standards (DOCSIS for cable, ADSL/VDSL for DSL, GPON for fiber)'
    ],
    howItWorks:
      'When your computer sends data, the modem takes the digital bit stream and encodes it onto a carrier wave using techniques like QAM (Quadrature Amplitude Modulation) or OFDM (Orthogonal Frequency-Division Multiplexing). This modulated signal is then transmitted over the physical medium — copper phone line, coaxial cable, or fiber strand — to the ISP.\n\nIn the receive direction, the modem captures the analog signal from the medium, filters out noise, and demodulates it back into a clean digital bit stream. Modern cable modems using DOCSIS 3.1 can achieve multi-gigabit speeds by bonding many channels together, while fiber ONTs (Optical Network Terminals) convert between light pulses and electrical signals.',
    protocols: ['docsis', 'ppp'],
    icon: 'modem',
    realWorldAnalogy:
      'A modem is like a translator at a border crossing — it converts information from one "language" (digital) into another (analog) so it can travel through foreign territory, then converts it back on arrival.',
    commonBrands: ['Motorola', 'ARRIS', 'Netgear']
  },
  {
    id: 'bridge',
    name: 'Bridge',
    layer: 2,
    description:
      'A bridge is a Layer 2 device that connects two or more network segments and selectively forwards frames between them based on MAC addresses. It reduces collision domains by learning which addresses reside on which segment, forwarding only the traffic that needs to cross.',
    keyFunctions: [
      'Learns MAC addresses by inspecting the source address of incoming frames',
      'Builds and maintains a MAC address table mapping addresses to ports',
      'Forwards frames only to the segment where the destination host resides',
      'Filters traffic that does not need to cross between segments, reducing unnecessary load',
      'Divides a single collision domain into multiple smaller ones, improving performance'
    ],
    howItWorks:
      'When a bridge receives a frame, it reads the source MAC address and records which port it arrived on in its forwarding table. It then looks up the destination MAC address. If the destination is on the same segment as the source, the bridge filters (drops) the frame because it does not need to cross. If the destination is on a different segment, or if the address is unknown, the bridge forwards the frame to the appropriate port (or floods it to all ports if unknown).\n\nBridges were historically used to connect different physical media types (e.g., Ethernet to Token Ring) or to split a single large collision domain into smaller ones. Today, their functionality has been absorbed into switches, which are essentially multi-port bridges with hardware-accelerated forwarding.',
    protocols: ['ethernet', 'stp'],
    icon: 'bridge',
    realWorldAnalogy:
      'A bridge is like a receptionist in a building with two wings — they only send a visitor to the other wing if the person they are looking for is actually over there, keeping foot traffic down in each wing.',
    commonBrands: ['Cisco', 'Juniper', 'HP Networking']
  },
  {
    id: 'switch',
    name: 'Switch',
    layer: 2,
    description:
      'A switch is a multiport Layer 2 device that forwards Ethernet frames based on MAC addresses. Unlike a hub, it creates a dedicated collision domain per port and uses a MAC address table to deliver frames only to the specific port where the destination host is connected.',
    keyFunctions: [
      'Learns source MAC addresses and maps them to physical ports automatically',
      'Forwards frames only to the port associated with the destination MAC address',
      'Supports full-duplex communication, eliminating collisions on each port',
      'Provides dedicated bandwidth to each connected device rather than sharing it',
      'Supports VLANs to logically segment traffic within the same physical switch',
      'Implements Spanning Tree Protocol (STP) to prevent Layer 2 loops'
    ],
    howItWorks:
      'When a switch receives a frame, it examines the source MAC address and stores it in its MAC address table along with the ingress port number. It then looks up the destination MAC address. If found, the frame is forwarded only to that specific port — this is called unicast forwarding. If the destination is unknown, the switch floods the frame to all ports except the source, and learns the address when the destination replies.\n\nSwitches use application-specific integrated circuits (ASICs) to perform forwarding decisions in hardware at wire speed, making them extremely fast. Advanced managed switches also support VLANs, quality of service (QoS), port security, link aggregation, and SNMP monitoring, making them the backbone of modern enterprise LANs.',
    protocols: ['ethernet', 'stp', 'vlan'],
    icon: 'switch',
    realWorldAnalogy:
      'A switch is like a smart mail sorter at a post office — it reads the address on each letter and places it directly into the correct mailbox, rather than making copies for everyone.',
    commonBrands: ['Cisco Catalyst', 'Juniper EX', 'Aruba']
  },
  {
    id: 'wap',
    name: 'Wireless Access Point',
    layer: 2,
    description:
      'A wireless access point (WAP) bridges wireless clients onto a wired Ethernet network at Layer 2. It manages radio communication using the IEEE 802.11 standards and translates between the 802.11 wireless frame format and the 802.3 wired Ethernet frame format.',
    keyFunctions: [
      'Transmits and receives radio signals using the 802.11 (Wi-Fi) protocol family',
      'Bridges wireless frames onto the wired LAN by converting between 802.11 and 802.3 formats',
      'Manages client authentication and encryption (WPA2/WPA3)',
      'Handles channel selection, power adjustment, and roaming between access points',
      'Supports multiple SSIDs to provide separate logical networks over the same radio',
      'Coordinates shared airtime among clients using CSMA/CA to avoid collisions'
    ],
    howItWorks:
      'A WAP advertises one or more SSIDs via beacon frames. When a wireless client wants to connect, it goes through an association and authentication process. Once connected, the client sends 802.11 frames over the air. The access point receives these, strips the wireless header, re-encapsulates the payload into a standard 802.3 Ethernet frame, and forwards it onto the wired network — and vice versa for traffic heading to the wireless client.\n\nEnterprise deployments use centralized wireless LAN controllers (WLCs) to manage dozens or hundreds of access points, coordinating channel assignments, power levels, and seamless roaming. Modern Wi-Fi 6 (802.11ax) and Wi-Fi 7 (802.11be) access points use technologies like OFDMA and MU-MIMO to serve many clients simultaneously with higher efficiency.',
    protocols: ['ethernet', 'wifi'],
    icon: 'wap',
    realWorldAnalogy:
      'A wireless access point is like a bilingual interpreter at a conference — it listens to speakers using one language (wireless) and restates everything in another (wired Ethernet) so that both sides can communicate seamlessly.',
    commonBrands: ['Ubiquiti UniFi', 'Cisco Meraki', 'Aruba']
  },
  {
    id: 'router',
    name: 'Router',
    layer: 3,
    description:
      'A router is a Layer 3 device that forwards packets between different IP networks by examining destination IP addresses and consulting its routing table. It is the fundamental device that connects separate broadcast domains and enables communication across the internet.',
    keyFunctions: [
      'Forwards IP packets between different networks based on destination IP address',
      'Maintains a routing table built from static routes or dynamic routing protocols (OSPF, BGP, EIGRP)',
      'Separates broadcast domains — broadcasts do not cross router boundaries',
      'Performs NAT (Network Address Translation) to map private IPs to public IPs',
      'Decrements TTL (Time to Live) on each packet to prevent routing loops',
      'Can apply access control lists (ACLs) to filter traffic based on IP addresses and ports'
    ],
    howItWorks:
      'When a router receives a packet, it strips the Layer 2 header and examines the destination IP address in the Layer 3 header. It performs a longest-prefix match against its routing table to determine the next-hop IP address and the exit interface. It then decrements the TTL field, recalculates the IP header checksum, encapsulates the packet in a new Layer 2 frame appropriate for the outgoing interface, and transmits it.\n\nRouters build their routing tables through static configuration, or dynamically via protocols like OSPF (for internal networks), BGP (for inter-domain internet routing), or EIGRP. In home networks, a consumer "router" typically combines routing, NAT, DHCP, DNS forwarding, a switch, and a wireless access point into a single device. In enterprise and service-provider networks, routers are dedicated high-performance devices handling millions of packets per second.',
    protocols: ['ip', 'ospf', 'bgp', 'nat', 'icmp'],
    icon: 'router',
    realWorldAnalogy:
      'A router is like an international postal hub — it reads the country and city on each package and decides which route to send it down to reach its destination, even if the package must cross many networks to get there.',
    commonBrands: ['Cisco ISR', 'Juniper MX', 'MikroTik']
  },
  {
    id: 'l3-switch',
    name: 'Layer 3 Switch',
    layer: 3,
    description:
      'A Layer 3 switch combines the high-speed MAC-based forwarding of a traditional switch with the IP routing capabilities of a router, all implemented in hardware ASICs. It can route traffic between VLANs at wire speed without needing an external router.',
    keyFunctions: [
      'Performs standard Layer 2 switching within each VLAN using MAC address tables',
      'Routes IP packets between VLANs using hardware-based routing (inter-VLAN routing)',
      'Supports dynamic routing protocols such as OSPF and EIGRP',
      'Achieves wire-speed routing throughput because forwarding decisions are made in ASICs, not CPU',
      'Reduces the need for a separate router for internal VLAN-to-VLAN traffic',
      'Supports advanced features like policy-based routing, DHCP relay, and multicast routing'
    ],
    howItWorks:
      'A Layer 3 switch operates as a normal switch for intra-VLAN traffic, forwarding frames based on MAC addresses at line rate. When a packet needs to travel from one VLAN to another, the switch acts as a router: it examines the destination IP, looks up its routing table (stored in high-speed hardware tables called TCAM), determines the next hop, rewrites the Layer 2 headers, and forwards the packet — all without sending it to a software-based CPU.\n\nThis hardware-based routing makes Layer 3 switches significantly faster than traditional routers for internal traffic. They are the standard distribution and core layer device in enterprise campus networks, where hundreds of VLANs need to communicate with each other at multi-gigabit speeds. External routers are then used only for WAN connectivity and internet edge functions.',
    protocols: ['ip', 'ospf', 'vlan', 'stp'],
    icon: 'l3-switch',
    realWorldAnalogy:
      'A Layer 3 switch is like a large office building with a built-in elevator system — people on the same floor (VLAN) just walk to each other, while the elevators quickly move people between floors without needing to go outside to a separate building (router).',
    commonBrands: ['Cisco Catalyst 9000', 'Arista', 'Juniper EX']
  },
  {
    id: 'firewall',
    name: 'Firewall',
    layer: 3,
    description:
      'A firewall is a security device that monitors and controls network traffic based on a defined set of rules. Basic packet-filtering firewalls operate at Layer 3, stateful firewalls inspect at Layer 4, and next-generation firewalls (NGFWs) perform deep packet inspection up through Layer 7. The layer assignment varies by firewall type.',
    keyFunctions: [
      'Filters packets based on source/destination IP addresses, ports, and protocols (stateless filtering)',
      'Tracks the state of active connections and permits only legitimate return traffic (stateful inspection)',
      'Performs deep packet inspection (DPI) to detect application-layer threats and malware',
      'Enforces network segmentation by controlling traffic between security zones (e.g., DMZ, internal, external)',
      'Provides VPN termination for encrypted site-to-site and remote-access tunnels',
      'Logs all permitted and denied traffic for auditing and forensic analysis'
    ],
    howItWorks:
      'A basic stateless firewall examines each packet independently against an ordered rule set (ACL), checking fields like source IP, destination IP, protocol, and port number. A stateful firewall goes further by maintaining a connection table that tracks the state of every active session (TCP handshake progress, UDP pseudo-connections). Only packets belonging to a known, legitimate session or matching an explicit allow rule are permitted.\n\nNext-generation firewalls (NGFWs) add application awareness and deep packet inspection. They can identify specific applications (e.g., distinguishing YouTube from general HTTPS), detect intrusion signatures, block malware, and enforce user-identity-based policies. NGFWs essentially unify traditional firewalling, intrusion prevention (IPS), antivirus, and application control into a single device positioned at network boundaries.',
    protocols: ['ip', 'tcp', 'udp', 'tls', 'ipsec'],
    icon: 'firewall',
    realWorldAnalogy:
      'A firewall is like a security checkpoint at a building entrance — guards check everyone\'s ID and credentials, only letting in authorized visitors while logging every entry and blocking anyone who appears suspicious.',
    commonBrands: ['Palo Alto Networks', 'Fortinet FortiGate', 'Cisco Firepower']
  },
  {
    id: 'load-balancer',
    name: 'Load Balancer',
    layer: 4,
    description:
      'A load balancer distributes incoming network traffic across multiple backend servers to optimize resource utilization, maximize throughput, and ensure high availability. It operates at Layer 4 (transport) or Layer 7 (application) depending on the depth of its traffic inspection.',
    keyFunctions: [
      'Distributes client requests across a pool of backend servers using algorithms like round-robin, least connections, or IP hash',
      'Monitors the health of each server and automatically removes failed servers from the pool',
      'Terminates TLS/SSL connections on behalf of backend servers, offloading encryption overhead',
      'Provides session persistence (sticky sessions) to route returning clients to the same server',
      'At Layer 7, can make routing decisions based on HTTP headers, URLs, or cookies',
      'Enables horizontal scaling by abstracting the server pool behind a single virtual IP address'
    ],
    howItWorks:
      'A Layer 4 load balancer makes forwarding decisions based on transport-layer information — the source and destination IP addresses and TCP/UDP port numbers — without inspecting the payload. It is extremely fast because it simply directs the TCP connection or UDP flow to a chosen backend server. A Layer 7 load balancer fully terminates the client connection, parses the application-layer content (e.g., HTTP request URL, Host header, cookies), and then opens a separate connection to the most appropriate backend.\n\nLoad balancers continuously send health probes (TCP connects, HTTP requests, or custom checks) to each backend. When a server fails its health check, the load balancer stops routing new connections to it until it recovers. This provides automatic failover and high availability. In cloud environments, load balancers are often provided as managed services that can auto-scale the number of backends based on demand.',
    protocols: ['tcp', 'udp', 'http', 'tls'],
    icon: 'load-balancer',
    realWorldAnalogy:
      'A load balancer is like a host at a busy restaurant — they keep track of which tables (servers) have room, direct each new party to the least-crowded table, and stop seating people at a table that is being cleaned (unhealthy).',
    commonBrands: ['F5 BIG-IP', 'Citrix ADC', 'HAProxy']
  },
  {
    id: 'gateway',
    name: 'Gateway',
    layer: 7,
    description:
      'A gateway is a device or software system that translates between different network architectures, protocols, or data formats. While a "default gateway" is a Layer 3 routing concept, protocol gateways (VoIP, IoT, API) operate up to Layer 7, performing full protocol conversion so that fundamentally different systems can communicate.',
    keyFunctions: [
      'Translates between incompatible network protocols (e.g., TCP/IP to SNA, or MQTT to HTTP)',
      'Converts data formats and encoding schemes so different systems can exchange information',
      'Serves as the entry/exit point between a local network and the outside world (default gateway)',
      'Can operate at any OSI layer depending on the translation being performed',
      'Bridges legacy systems with modern network infrastructure',
      'In VoIP, media gateways convert between traditional phone signaling (SS7/ISDN) and SIP/RTP'
    ],
    howItWorks:
      'A gateway receives data formatted according to one protocol, fully decodes it, and re-encodes it using the destination protocol before forwarding it onward. This is fundamentally different from routing, which only swaps Layer 2 headers while leaving the packet intact. A gateway may need to transform data all the way up to the Application layer, restructuring messages, converting character encodings, or mapping between entirely different API formats.\n\nThe most common everyday use of the term is "default gateway," which is simply the router IP address a host sends packets to when the destination is outside its local subnet. However, true protocol gateways remain critical in enterprise environments — for example, an IoT gateway that translates MQTT messages from sensors into RESTful API calls for a cloud platform, or a VoIP gateway that connects a traditional PBX phone system to a SIP-based network.',
    protocols: ['ip', 'tcp', 'sip', 'http'],
    icon: 'gateway',
    realWorldAnalogy:
      'A gateway is like an embassy that translates not just languages but entire legal and cultural systems — it takes a document formatted for one country\'s bureaucracy and completely restructures it for another\'s.',
    commonBrands: ['Cisco', 'Juniper', 'Audiocodes']
  },
  {
    id: 'proxy',
    name: 'Proxy Server',
    layer: 7,
    description:
      'A proxy server is a Layer 7 intermediary that sits between clients and servers, making requests on behalf of clients. It fully terminates and re-initiates connections at the Application layer, enabling caching, content filtering, anonymity, and security inspection.',
    keyFunctions: [
      'Intercepts client requests and forwards them to the target server on the client\'s behalf',
      'Caches frequently requested content to reduce bandwidth usage and improve response times',
      'Filters content by blocking access to specific URLs, domains, or content categories',
      'Masks client IP addresses, providing anonymity and privacy for internal users',
      'Performs TLS inspection by decrypting, scanning, and re-encrypting HTTPS traffic',
      'Logs all user requests for compliance auditing and usage monitoring'
    ],
    howItWorks:
      'A forward proxy sits in front of clients. When a user makes a web request, the browser sends it to the proxy instead of directly to the internet. The proxy evaluates the request against its rules (allowed sites, content policies, authentication requirements), and if permitted, opens its own connection to the destination server, fetches the response, optionally caches it, and returns it to the client. The destination server sees only the proxy\'s IP address, not the client\'s.\n\nA reverse proxy sits in front of servers. External clients connect to the reverse proxy, which then forwards requests to internal backend servers. This provides load distribution, SSL offloading, caching, and an additional security layer that hides backend infrastructure. Popular reverse proxies like Nginx and HAProxy are fundamental components of modern web architecture, often deployed alongside CDNs and web application firewalls.',
    protocols: ['http', 'tls', 'dns', 'ftp'],
    icon: 'proxy',
    realWorldAnalogy:
      'A proxy server is like a personal assistant who makes phone calls on your behalf — the person on the other end only knows the assistant, your requests can be screened before they go out, and common answers can be kept on file for faster future reference.',
    commonBrands: ['Squid', 'Nginx', 'Cloudflare']
  }
];
