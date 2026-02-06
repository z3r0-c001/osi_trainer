export const quizQuestions = {

  // ─────────────────────────────────────────────
  //  LAYER 1 — Physical
  // ─────────────────────────────────────────────
  layer1: [
    {
      id: 'l1-001',
      type: 'multiple-choice',
      question: 'Which cable type supports the longest maximum segment length without a repeater?',
      options: [
        'Cat 5e UTP',
        'Single-mode fiber',
        'Multimode fiber',
        'Coaxial (RG-58)'
      ],
      correctAnswer: 1,
      explanation: 'Single-mode fiber can carry signals over distances exceeding 40 km (and much farther with amplification), far surpassing multimode fiber (~2 km), UTP (100 m), and thin coax (185 m). It achieves this by using a very small core diameter (8-10 microns) that allows only one light mode to propagate, eliminating modal dispersion.',
      difficulty: 'medium'
    },
    {
      id: 'l1-002',
      type: 'true-false',
      question: 'Full-duplex communication allows data to be sent and received simultaneously on the same medium.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Full-duplex mode permits simultaneous two-way communication. In Ethernet, this is achieved by using separate wire pairs (or wavelengths in fiber) for transmit and receive, which also eliminates collisions. Half-duplex, by contrast, allows communication in both directions but only one direction at a time.',
      difficulty: 'easy'
    },
    {
      id: 'l1-003',
      type: 'multiple-choice',
      question: 'What is the maximum cable length for a Cat 6a UTP Ethernet segment?',
      options: ['55 meters', '100 meters', '185 meters', '500 meters'],
      correctAnswer: 1,
      explanation: 'All standard copper Ethernet categories (Cat 5e, Cat 6, Cat 6a) share the same 100-meter maximum segment length as defined by TIA/EIA-568 standards. This limit includes up to 90 meters of permanent link cabling plus 10 meters of patch cords. Cat 6a\'s advantage over Cat 6 is its support for 10GBASE-T at the full 100 m distance.',
      difficulty: 'easy'
    },
    {
      id: 'l1-004',
      type: 'multiple-choice',
      question: 'Which encoding scheme is used by 100BASE-TX Fast Ethernet?',
      options: ['Manchester encoding', '4B/5B with MLT-3', '8B/10B', 'NRZ-I'],
      correctAnswer: 1,
      explanation: '100BASE-TX uses 4B/5B encoding (mapping 4-bit data nibbles to 5-bit code groups to ensure sufficient signal transitions) combined with MLT-3 line coding (which cycles through three voltage levels: +V, 0, -V). This reduces the signaling frequency to 31.25 MHz instead of the 125 MHz that would be needed with NRZ, helping meet EMI requirements for Cat 5 cable.',
      difficulty: 'hard'
    },
    {
      id: 'l1-005',
      type: 'true-false',
      question: 'A hub operates at Layer 2 of the OSI model because it connects multiple Ethernet devices.',
      options: ['True', 'False'],
      correctAnswer: false,
      explanation: 'A hub is a Layer 1 (Physical) device. It simply regenerates and repeats electrical signals out every port except the one that received the signal. It has no understanding of MAC addresses or frames (Layer 2 concepts). A switch is the Layer 2 device that makes forwarding decisions based on MAC addresses.',
      difficulty: 'easy'
    },
    {
      id: 'l1-006',
      type: 'multiple-choice',
      question: 'Which connector type is most commonly used with single-mode fiber in enterprise networks?',
      options: ['RJ-45', 'SC or LC', 'BNC', 'DB-9'],
      correctAnswer: 1,
      explanation: 'SC (Subscriber Connector) and LC (Lucent Connector) are the standard connectors for fiber optic cabling. LC connectors, being smaller, are especially popular in high-density environments. RJ-45 is for copper Ethernet, BNC is for coaxial cable, and DB-9 is a legacy serial connector.',
      difficulty: 'medium'
    },
    {
      id: 'l1-007',
      type: 'multiple-choice',
      question: 'What is the primary purpose of a crossover cable?',
      options: [
        'Connecting a device to a patch panel',
        'Connecting two similar devices directly (e.g., switch to switch)',
        'Extending cable length beyond 100 meters',
        'Providing Power over Ethernet'
      ],
      correctAnswer: 1,
      explanation: 'A crossover cable swaps the transmit and receive pairs so that two similar devices (switch-to-switch, PC-to-PC) can communicate directly. In a straight-through cable both ends are wired identically, which works for dissimilar devices (PC-to-switch). Modern devices with Auto-MDI/MDIX detect and adjust automatically, making crossover cables largely unnecessary today.',
      difficulty: 'easy'
    },
    {
      id: 'l1-008',
      type: 'matching',
      question: 'Match each cable standard to its maximum data rate.',
      options: [
        { left: 'Cat 5e', right: '1 Gbps' },
        { left: 'Cat 6', right: '10 Gbps (55 m)' },
        { left: 'Cat 6a', right: '10 Gbps (100 m)' },
        { left: 'Cat 8', right: '25/40 Gbps' }
      ],
      correctAnswer: [
        { left: 'Cat 5e', right: '1 Gbps' },
        { left: 'Cat 6', right: '10 Gbps (55 m)' },
        { left: 'Cat 6a', right: '10 Gbps (100 m)' },
        { left: 'Cat 8', right: '25/40 Gbps' }
      ],
      explanation: 'Cat 5e supports up to 1 Gbps. Cat 6 supports 10 Gbps but only to 55 meters due to increased crosstalk at higher frequencies. Cat 6a adds improved shielding/separation to support 10 Gbps at the full 100 m. Cat 8 is designed for data-center short-reach links at 25 or 40 Gbps up to 30 m.',
      difficulty: 'medium'
    },
    {
      id: 'l1-009',
      type: 'true-false',
      question: 'Multimode fiber uses an LED or VCSEL light source, while single-mode fiber typically uses a laser diode.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Multimode fiber has a larger core (50 or 62.5 microns) that can accept light from inexpensive LEDs or VCSELs (Vertical-Cavity Surface-Emitting Lasers). Single-mode fiber\'s tiny core (8-10 microns) requires the precision of a laser diode to efficiently inject light. This is one reason single-mode transceivers cost more than multimode.',
      difficulty: 'medium'
    },
    {
      id: 'l1-010',
      type: 'multiple-choice',
      question: 'What does the TIA/EIA-568B wiring standard specify for pins 1 and 2 of an RJ-45 connector?',
      options: [
        'Green pair (pins 3 and 6)',
        'Orange pair (white-orange on pin 1, orange on pin 2)',
        'Blue pair (pins 4 and 5)',
        'Brown pair (pins 7 and 8)'
      ],
      correctAnswer: 1,
      explanation: 'In the T568B pinout, pins 1 and 2 use the orange pair: pin 1 is white-orange, pin 2 is orange. Pins 3 and 6 use the green pair. This is the most common pinout in North America. T568A swaps the orange and green pairs, placing green on pins 1-2 and orange on pins 3-6.',
      difficulty: 'medium'
    },
    {
      id: 'l1-011',
      type: 'ordering',
      question: 'Arrange these Ethernet standards from slowest to fastest maximum data rate.',
      options: ['10BASE-T', '100BASE-TX', '1000BASE-T', '10GBASE-T'],
      correctAnswer: ['10BASE-T', '100BASE-TX', '1000BASE-T', '10GBASE-T'],
      explanation: '10BASE-T operates at 10 Mbps (the original Ethernet over twisted pair). 100BASE-TX (Fast Ethernet) runs at 100 Mbps. 1000BASE-T (Gigabit Ethernet) provides 1 Gbps using all four pairs. 10GBASE-T delivers 10 Gbps over Cat 6a or Cat 7 cabling.',
      difficulty: 'easy'
    },
    {
      id: 'l1-012',
      type: 'multiple-choice',
      question: 'Which Physical layer signaling method does 1000BASE-T use to achieve gigabit speeds over Cat 5e?',
      options: [
        'Sends data over a single pair at 1 Gbps',
        'Uses all four pairs simultaneously, each at 250 Mbps with PAM-5 encoding',
        'Uses frequency-division multiplexing on two pairs',
        'Uses 64B/66B encoding on two pairs'
      ],
      correctAnswer: 1,
      explanation: '1000BASE-T transmits and receives on all four pairs simultaneously using PAM-5 (Pulse Amplitude Modulation with 5 levels) encoding. Each pair carries 250 Mbps, and the use of echo cancellation allows full-duplex on every pair. This clever design lets gigabit Ethernet run on existing Cat 5e infrastructure.',
      difficulty: 'hard'
    },
    {
      id: 'l1-013',
      type: 'true-false',
      question: 'Electromagnetic interference (EMI) affects fiber optic cables in the same way it affects copper cables.',
      options: ['True', 'False'],
      correctAnswer: false,
      explanation: 'Fiber optic cables transmit data as light pulses through glass or plastic strands and are completely immune to electromagnetic interference. This is one of the key advantages of fiber over copper, making it ideal for environments with high EMI such as factory floors, near power lines, or between buildings.',
      difficulty: 'easy'
    },
    {
      id: 'l1-014',
      type: 'multiple-choice',
      question: 'What device operates at Layer 1 to extend the distance a signal can travel by regenerating it?',
      options: ['Switch', 'Router', 'Repeater', 'Firewall'],
      correctAnswer: 2,
      explanation: 'A repeater is a Layer 1 device that receives a degraded signal, regenerates it, and retransmits it. This extends the maximum cable distance. A hub is essentially a multiport repeater. Switches operate at Layer 2, and routers at Layer 3.',
      difficulty: 'easy'
    }
  ],

  // ─────────────────────────────────────────────
  //  LAYER 2 — Data Link
  // ─────────────────────────────────────────────
  layer2: [
    {
      id: 'l2-001',
      type: 'multiple-choice',
      question: 'How many bits make up a MAC address?',
      options: ['32 bits', '48 bits', '64 bits', '128 bits'],
      correctAnswer: 1,
      explanation: 'A MAC (Media Access Control) address is 48 bits (6 bytes), typically written as six pairs of hexadecimal digits (e.g., AA:BB:CC:DD:EE:FF). The first 24 bits are the OUI (Organizationally Unique Identifier) assigned by IEEE to the manufacturer, and the last 24 bits are assigned by the manufacturer to uniquely identify the NIC.',
      difficulty: 'easy'
    },
    {
      id: 'l2-002',
      type: 'true-false',
      question: 'A switch builds its MAC address table by examining the source MAC address of incoming frames.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'When a switch receives a frame, it reads the source MAC address and records which port that address was learned on, along with a timestamp. This process is called backward learning. When forwarding, the switch looks up the destination MAC address in the table. If the destination is unknown, the switch floods the frame out all ports except the source port.',
      difficulty: 'easy'
    },
    {
      id: 'l2-003',
      type: 'multiple-choice',
      question: 'What is the minimum size of an Ethernet II frame (excluding the preamble and SFD)?',
      options: ['46 bytes', '64 bytes', '128 bytes', '1518 bytes'],
      correctAnswer: 1,
      explanation: 'The minimum Ethernet II frame size is 64 bytes: 6 bytes destination MAC + 6 bytes source MAC + 2 bytes EtherType + 46 bytes minimum payload + 4 bytes FCS (Frame Check Sequence). If the payload is less than 46 bytes, padding is added. This minimum size ensures that collisions are detected in half-duplex Ethernet before the entire frame is transmitted.',
      difficulty: 'medium'
    },
    {
      id: 'l2-004',
      type: 'multiple-choice',
      question: 'What protocol does a host use to discover the MAC address associated with a known IP address on the local network?',
      options: ['DNS', 'ARP', 'DHCP', 'ICMP'],
      correctAnswer: 1,
      explanation: 'ARP (Address Resolution Protocol) maps IP addresses to MAC addresses on a local network segment. The host sends an ARP Request as a broadcast (destination MAC FF:FF:FF:FF:FF:FF) asking "Who has IP x.x.x.x?" The device with that IP replies with an ARP Reply containing its MAC address. The result is cached in the ARP table to avoid repeated broadcasts.',
      difficulty: 'easy'
    },
    {
      id: 'l2-005',
      type: 'true-false',
      question: 'VLANs require a router (or Layer 3 switch) to forward traffic between them.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'VLANs create separate broadcast domains at Layer 2. Because devices in different VLANs are logically on different networks, a Layer 3 device (router or Layer 3 switch performing inter-VLAN routing) is required to route packets between them. Without it, hosts in different VLANs cannot communicate, even if they are on the same physical switch.',
      difficulty: 'medium'
    },
    {
      id: 'l2-006',
      type: 'multiple-choice',
      question: 'Which field in an IEEE 802.1Q VLAN tag identifies the VLAN?',
      options: [
        'TPID (Tag Protocol Identifier)',
        'PCP (Priority Code Point)',
        'DEI (Drop Eligible Indicator)',
        'VID (VLAN Identifier)'
      ],
      correctAnswer: 3,
      explanation: 'The 802.1Q tag inserts 4 bytes into the Ethernet frame. Within that tag, the 12-bit VID (VLAN Identifier) field specifies the VLAN, supporting up to 4094 usable VLANs (0 and 4095 are reserved). TPID identifies the frame as 802.1Q tagged (value 0x8100). PCP is used for Class of Service priority, and DEI indicates frames eligible to be dropped during congestion.',
      difficulty: 'medium'
    },
    {
      id: 'l2-007',
      type: 'multiple-choice',
      question: 'What is the purpose of the Spanning Tree Protocol (STP)?',
      options: [
        'To encrypt Layer 2 frames',
        'To prevent switching loops by creating a loop-free logical topology',
        'To assign IP addresses to switches',
        'To balance traffic across multiple VLANs'
      ],
      correctAnswer: 1,
      explanation: 'STP (IEEE 802.1D) prevents broadcast storms and MAC address table instability caused by redundant Layer 2 paths. It elects a root bridge, calculates the shortest path to it from each switch, and places redundant ports into a blocking state. If an active link fails, STP reconverges and activates a previously blocked port. RSTP (802.1w) improves convergence time significantly.',
      difficulty: 'medium'
    },
    {
      id: 'l2-008',
      type: 'matching',
      question: 'Match each Layer 2 concept to its description.',
      options: [
        { left: 'Trunk port', right: 'Carries traffic for multiple VLANs using 802.1Q tags' },
        { left: 'Access port', right: 'Belongs to a single VLAN and connects to end devices' },
        { left: 'Native VLAN', right: 'VLAN whose traffic is sent untagged on a trunk' },
        { left: 'EtherChannel', right: 'Bundles multiple physical links into one logical link' }
      ],
      correctAnswer: [
        { left: 'Trunk port', right: 'Carries traffic for multiple VLANs using 802.1Q tags' },
        { left: 'Access port', right: 'Belongs to a single VLAN and connects to end devices' },
        { left: 'Native VLAN', right: 'VLAN whose traffic is sent untagged on a trunk' },
        { left: 'EtherChannel', right: 'Bundles multiple physical links into one logical link' }
      ],
      explanation: 'Trunk ports tag frames with 802.1Q headers to carry multiple VLANs over a single link. Access ports strip VLAN information and connect end devices to a single VLAN. The native VLAN is a special trunk concept where traffic is sent without a tag (must match on both sides to avoid VLAN hopping). EtherChannel (or link aggregation) combines parallel links for increased bandwidth and redundancy.',
      difficulty: 'medium'
    },
    {
      id: 'l2-009',
      type: 'true-false',
      question: 'A Layer 2 switch forwards broadcast frames out of all ports including the port the frame was received on.',
      options: ['True', 'False'],
      correctAnswer: false,
      explanation: 'A switch forwards broadcast frames out of all ports in the same VLAN EXCEPT the port on which the frame was received. This is a fundamental switching behavior: the switch never sends a frame back out the port it came in on because the sending device already has the data.',
      difficulty: 'easy'
    },
    {
      id: 'l2-010',
      type: 'multiple-choice',
      question: 'Which sublayer of the Data Link layer is responsible for media access control and physical addressing?',
      options: [
        'LLC (Logical Link Control)',
        'MAC (Media Access Control)',
        'NIC (Network Interface Controller)',
        'PHY (Physical sublayer)'
      ],
      correctAnswer: 1,
      explanation: 'The Data Link layer is divided into two sublayers: the upper LLC sublayer (IEEE 802.2), which interfaces with the Network layer and provides flow control and error identification, and the lower MAC sublayer, which handles physical addressing (MAC addresses) and controls how devices access the shared medium (e.g., CSMA/CD for Ethernet).',
      difficulty: 'medium'
    },
    {
      id: 'l2-011',
      type: 'multiple-choice',
      question: 'What happens when a switch receives a frame with a destination MAC address not in its MAC address table?',
      options: [
        'The frame is dropped silently',
        'The switch sends an ARP request to find the destination',
        'The switch floods the frame out all ports in the VLAN except the source port',
        'The switch sends an ICMP Destination Unreachable message'
      ],
      correctAnswer: 2,
      explanation: 'When the destination MAC is unknown (not in the CAM/MAC address table), the switch performs unknown unicast flooding: it sends copies of the frame out every port in the same VLAN except the port it arrived on. When the destination device replies, the switch learns its MAC address and port, and future frames to that destination are forwarded only to the correct port.',
      difficulty: 'easy'
    },
    {
      id: 'l2-012',
      type: 'ordering',
      question: 'Place the fields of an Ethernet II frame in order from first transmitted to last transmitted.',
      options: ['Preamble/SFD', 'Destination MAC', 'Source MAC', 'EtherType', 'Payload', 'FCS'],
      correctAnswer: ['Preamble/SFD', 'Destination MAC', 'Source MAC', 'EtherType', 'Payload', 'FCS'],
      explanation: 'An Ethernet II frame begins with the Preamble (7 bytes) and Start Frame Delimiter (1 byte) for clock synchronization. Next comes the Destination MAC (6 bytes), then Source MAC (6 bytes), followed by the 2-byte EtherType field identifying the upper-layer protocol (e.g., 0x0800 for IPv4). The Payload (46-1500 bytes) carries the data, and the FCS (4 bytes) at the end provides error detection via CRC-32.',
      difficulty: 'medium'
    },
    {
      id: 'l2-013',
      type: 'true-false',
      question: 'A bridge and a switch both operate at Layer 2, but a switch is essentially a multiport bridge with hardware-based forwarding.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Both bridges and switches make forwarding decisions based on MAC addresses. A traditional bridge typically has fewer ports and uses software-based forwarding. A modern switch is essentially a multiport bridge that uses ASICs (Application-Specific Integrated Circuits) for hardware-based, wire-speed frame forwarding, offering much higher performance and port density.',
      difficulty: 'easy'
    },
    {
      id: 'l2-014',
      type: 'multiple-choice',
      question: 'In CSMA/CD, what does a device do when it detects a collision?',
      options: [
        'Immediately retransmits the frame',
        'Sends a jam signal, then waits a random backoff time before retransmitting',
        'Drops the frame and notifies the application',
        'Switches to full-duplex mode'
      ],
      correctAnswer: 1,
      explanation: 'When a collision is detected in CSMA/CD (Carrier Sense Multiple Access with Collision Detection), the transmitting device sends a 32-bit jam signal to ensure all devices on the segment recognize the collision. It then waits a random time determined by the truncated binary exponential backoff algorithm before attempting retransmission. After 16 consecutive collisions, the frame is dropped.',
      difficulty: 'medium'
    },
    {
      id: 'l2-015',
      type: 'multiple-choice',
      question: 'What is the broadcast MAC address?',
      options: [
        '00:00:00:00:00:00',
        'FF:FF:FF:FF:FF:FF',
        '01:00:5E:00:00:00',
        '255.255.255.255'
      ],
      correctAnswer: 1,
      explanation: 'The Layer 2 broadcast MAC address is FF:FF:FF:FF:FF:FF (all 48 bits set to 1). Any frame sent to this address is delivered to all devices on the local network segment or VLAN. The address 00:00:00:00:00:00 is a null/unspecified address. 01:00:5E:xx:xx:xx is the multicast MAC OUI range. 255.255.255.255 is a Layer 3 IP broadcast address, not a MAC address.',
      difficulty: 'easy'
    }
  ],

  // ─────────────────────────────────────────────
  //  LAYER 3 — Network
  // ─────────────────────────────────────────────
  layer3: [
    {
      id: 'l3-001',
      type: 'multiple-choice',
      question: 'How many usable host addresses are in a /26 subnet?',
      options: ['26', '30', '62', '64'],
      correctAnswer: 2,
      explanation: 'A /26 subnet has 6 host bits (32 - 26 = 6), giving 2^6 = 64 total addresses. Subtract 2 for the network address and the broadcast address, leaving 62 usable host addresses. Remembering the formula: usable hosts = 2^(host bits) - 2.',
      difficulty: 'medium'
    },
    {
      id: 'l3-002',
      type: 'true-false',
      question: 'A router decrements the TTL (Time to Live) field of an IP packet by 1 each time it forwards the packet.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Each router that forwards an IP packet decrements the TTL field by 1. When TTL reaches 0, the packet is discarded and the router sends an ICMP Time Exceeded message (Type 11) back to the source. This mechanism prevents packets from looping endlessly in the network. The traceroute utility exploits this behavior to map the path packets take.',
      difficulty: 'easy'
    },
    {
      id: 'l3-003',
      type: 'multiple-choice',
      question: 'Which routing protocol uses the Dijkstra (Shortest Path First) algorithm?',
      options: ['RIP', 'OSPF', 'BGP', 'EIGRP'],
      correctAnswer: 1,
      explanation: 'OSPF (Open Shortest Path First) is a link-state routing protocol that uses Dijkstra\'s SPF algorithm to calculate the shortest path to every destination in its link-state database. RIP is a distance-vector protocol using hop count. BGP is a path-vector protocol. EIGRP is an advanced distance-vector (sometimes called hybrid) protocol using the DUAL algorithm.',
      difficulty: 'medium'
    },
    {
      id: 'l3-004',
      type: 'multiple-choice',
      question: 'What is the purpose of NAT (Network Address Translation)?',
      options: [
        'To encrypt IP packets for secure transmission',
        'To translate private IP addresses to public IP addresses for internet access',
        'To assign IP addresses dynamically to hosts',
        'To resolve domain names to IP addresses'
      ],
      correctAnswer: 1,
      explanation: 'NAT translates private (RFC 1918) IP addresses to public IP addresses, allowing multiple internal devices to share one or a few public addresses for internet access. PAT (Port Address Translation), also called NAT overload, extends this by using different source port numbers to track multiple internal hosts through a single public IP. NAT also provides a degree of security by hiding internal addressing.',
      difficulty: 'easy'
    },
    {
      id: 'l3-005',
      type: 'multiple-choice',
      question: 'Which ICMP message type is used by the ping utility?',
      options: [
        'Type 3 — Destination Unreachable',
        'Type 8 — Echo Request and Type 0 — Echo Reply',
        'Type 11 — Time Exceeded',
        'Type 5 — Redirect'
      ],
      correctAnswer: 1,
      explanation: 'Ping sends ICMP Echo Request (Type 8) messages to a target and listens for ICMP Echo Reply (Type 0) messages. A successful reply indicates the destination is reachable. Type 3 is Destination Unreachable, Type 11 is Time Exceeded (used by traceroute), and Type 5 is Redirect (used by routers to inform hosts of a better route).',
      difficulty: 'easy'
    },
    {
      id: 'l3-006',
      type: 'true-false',
      question: 'The IP address 172.16.0.1 is a publicly routable IP address.',
      options: ['True', 'False'],
      correctAnswer: false,
      explanation: 'The address 172.16.0.1 falls within the RFC 1918 private address range 172.16.0.0 - 172.31.255.255 (172.16.0.0/12). Private addresses are not routable on the public internet. The three RFC 1918 private ranges are: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.',
      difficulty: 'easy'
    },
    {
      id: 'l3-007',
      type: 'multiple-choice',
      question: 'What is the subnet mask for a /20 network?',
      options: [
        '255.255.240.0',
        '255.255.248.0',
        '255.255.224.0',
        '255.255.252.0'
      ],
      correctAnswer: 0,
      explanation: 'A /20 prefix means 20 bits are set to 1 in the mask: the first two octets are all 1s (255.255), then 4 more bits in the third octet are 1s, giving 11110000 in binary = 240. So the mask is 255.255.240.0. This provides 12 host bits, yielding 4094 usable host addresses per subnet.',
      difficulty: 'medium'
    },
    {
      id: 'l3-008',
      type: 'matching',
      question: 'Match each routing protocol to its type.',
      options: [
        { left: 'OSPF', right: 'Link-state' },
        { left: 'RIP', right: 'Distance-vector' },
        { left: 'BGP', right: 'Path-vector' },
        { left: 'IS-IS', right: 'Link-state' }
      ],
      correctAnswer: [
        { left: 'OSPF', right: 'Link-state' },
        { left: 'RIP', right: 'Distance-vector' },
        { left: 'BGP', right: 'Path-vector' },
        { left: 'IS-IS', right: 'Link-state' }
      ],
      explanation: 'OSPF and IS-IS are both link-state protocols that build a complete topology map using SPF algorithm. RIP is a simple distance-vector protocol that shares its entire routing table with neighbors and uses hop count as its metric (max 15 hops). BGP is a path-vector protocol used for inter-AS routing on the internet, using AS-path attributes to prevent loops and make policy-based routing decisions.',
      difficulty: 'medium'
    },
    {
      id: 'l3-009',
      type: 'multiple-choice',
      question: 'Which IPv4 header field is used to reassemble fragmented packets?',
      options: [
        'TTL',
        'Protocol',
        'Identification, Flags, and Fragment Offset',
        'Header Checksum'
      ],
      correctAnswer: 2,
      explanation: 'When a packet is fragmented, the Identification field (16-bit value, same for all fragments), Flags (including the More Fragments bit), and Fragment Offset (indicating where this fragment fits in the original data) work together to allow the destination host to reassemble the fragments into the original packet. TTL prevents routing loops, Protocol identifies the upper-layer protocol, and the checksum validates the header.',
      difficulty: 'hard'
    },
    {
      id: 'l3-010',
      type: 'true-false',
      question: 'A default gateway is the router interface address that a host uses when sending packets to destinations outside its local subnet.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'When a host wants to communicate with a device on a different network, it forwards the packet to its default gateway (typically the IP address of the local router interface). The router then consults its routing table to determine the next hop toward the destination. Without a default gateway, a host can only communicate with other devices on the same local subnet.',
      difficulty: 'easy'
    },
    {
      id: 'l3-011',
      type: 'multiple-choice',
      question: 'What is the administrative distance of a directly connected network in Cisco routing?',
      options: ['0', '1', '90', '120'],
      correctAnswer: 0,
      explanation: 'Directly connected networks have an administrative distance (AD) of 0, meaning they are the most trusted route source. Static routes have AD of 1, EIGRP internal routes have AD of 90, OSPF has AD of 110, and RIP has AD of 120. When multiple routing sources know a route to the same destination, the route with the lowest AD is preferred.',
      difficulty: 'medium'
    },
    {
      id: 'l3-012',
      type: 'ordering',
      question: 'Place these IPv4 address classes in order from the smallest to the largest default network size.',
      options: ['Class C (/24)', 'Class B (/16)', 'Class A (/8)'],
      correctAnswer: ['Class C (/24)', 'Class B (/16)', 'Class A (/8)'],
      explanation: 'Class C has a /24 default mask (254 hosts), Class B has /16 (65,534 hosts), and Class A has /8 (16,777,214 hosts). Classful addressing has been superseded by CIDR (Classless Inter-Domain Routing), but understanding the classes is still important for subnetting concepts and legacy configurations.',
      difficulty: 'easy'
    },
    {
      id: 'l3-013',
      type: 'multiple-choice',
      question: 'Which protocol number in the IPv4 header identifies TCP?',
      options: ['1 (ICMP)', '6 (TCP)', '17 (UDP)', '47 (GRE)'],
      correctAnswer: 1,
      explanation: 'The Protocol field in the IPv4 header uses the value 6 to indicate that the payload is a TCP segment. Protocol 1 is ICMP, 17 is UDP, and 47 is GRE (Generic Routing Encapsulation). This field is essential so the receiving host knows which transport-layer protocol to hand the data up to.',
      difficulty: 'medium'
    },
    {
      id: 'l3-014',
      type: 'true-false',
      question: 'IPv6 addresses are 64 bits long, double the length of IPv4 addresses.',
      options: ['True', 'False'],
      correctAnswer: false,
      explanation: 'IPv6 addresses are 128 bits long, which is four times the length of IPv4 (32 bits), not double. This provides approximately 3.4 x 10^38 unique addresses. IPv6 addresses are written as eight groups of four hexadecimal digits separated by colons (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334).',
      difficulty: 'easy'
    },
    {
      id: 'l3-015',
      type: 'multiple-choice',
      question: 'What does CIDR notation /28 mean in terms of available subnets from a Class C network?',
      options: [
        '4 subnets with 62 hosts each',
        '8 subnets with 30 hosts each',
        '16 subnets with 14 hosts each',
        '32 subnets with 6 hosts each'
      ],
      correctAnswer: 2,
      explanation: 'A /28 borrows 4 bits from the host portion of a /24 Class C, creating 2^4 = 16 subnets. Each subnet has 4 host bits, yielding 2^4 - 2 = 14 usable host addresses. The subnet mask is 255.255.255.240. This is commonly used for small point-to-point links or management VLANs where few host addresses are needed.',
      difficulty: 'medium'
    }
  ],

  // ─────────────────────────────────────────────
  //  LAYER 4 — Transport  (placeholder, extended next)
  // ─────────────────────────────────────────────
  layer4: [
    {
      id: 'l4-001',
      type: 'multiple-choice',
      question: 'Which Transport layer protocol provides reliable, connection-oriented delivery?',
      options: ['UDP', 'TCP', 'ICMP', 'ARP'],
      correctAnswer: 1,
      explanation: 'TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery through mechanisms such as sequence numbers, acknowledgments, retransmission, and flow control. UDP provides unreliable, connectionless delivery with minimal overhead. ICMP and ARP are not transport-layer protocols.',
      difficulty: 'easy'
    },
    {
      id: 'l4-002',
      type: 'ordering',
      question: 'Place the steps of the TCP three-way handshake in the correct order.',
      options: [
        'Client sends SYN',
        'Server responds with SYN-ACK',
        'Client sends ACK'
      ],
      correctAnswer: [
        'Client sends SYN',
        'Server responds with SYN-ACK',
        'Client sends ACK'
      ],
      explanation: 'The TCP three-way handshake establishes a connection: (1) The client sends a SYN segment with an initial sequence number. (2) The server responds with SYN-ACK, acknowledging the client\'s SYN and providing its own initial sequence number. (3) The client sends an ACK acknowledging the server\'s SYN. After these three messages, both sides have agreed on sequence numbers and the connection is established.',
      difficulty: 'easy'
    },
    {
      id: 'l4-003',
      type: 'multiple-choice',
      question: 'What is the range of well-known (system) port numbers?',
      options: ['0 – 255', '0 – 1023', '1024 – 49151', '49152 – 65535'],
      correctAnswer: 1,
      explanation: 'Well-known ports range from 0 to 1023 and are assigned by IANA to common services (e.g., HTTP on port 80, HTTPS on 443, SSH on 22). Registered ports are 1024-49151, used by applications that register with IANA. Dynamic/ephemeral ports are 49152-65535, used as temporary source ports by clients.',
      difficulty: 'easy'
    },
    {
      id: 'l4-004',
      type: 'true-false',
      question: 'UDP includes a mechanism for retransmitting lost segments.',
      options: ['True', 'False'],
      correctAnswer: false,
      explanation: 'UDP (User Datagram Protocol) is connectionless and does not provide retransmission, sequencing, or acknowledgment mechanisms. If reliability is needed over UDP, it must be implemented at the application layer. This lack of overhead makes UDP faster and is preferred for time-sensitive applications like VoIP, video streaming, and DNS queries.',
      difficulty: 'easy'
    },
    {
      id: 'l4-005',
      type: 'multiple-choice',
      question: 'What TCP mechanism prevents a fast sender from overwhelming a slow receiver?',
      options: [
        'Congestion control',
        'Flow control using the sliding window',
        'Port multiplexing',
        'Segmentation'
      ],
      correctAnswer: 1,
      explanation: 'TCP flow control uses a sliding window mechanism where the receiver advertises a window size in each ACK, telling the sender how many bytes it can accept before its buffer fills. The sender must not send more than this amount without receiving an acknowledgment. This is distinct from congestion control (which prevents overwhelming the network), though both use window-based approaches.',
      difficulty: 'medium'
    },
    {
      id: 'l4-006',
      type: 'matching',
      question: 'Match each well-known port to its protocol/service.',
      options: [
        { left: 'Port 22', right: 'SSH' },
        { left: 'Port 53', right: 'DNS' },
        { left: 'Port 80', right: 'HTTP' },
        { left: 'Port 443', right: 'HTTPS' }
      ],
      correctAnswer: [
        { left: 'Port 22', right: 'SSH' },
        { left: 'Port 53', right: 'DNS' },
        { left: 'Port 80', right: 'HTTP' },
        { left: 'Port 443', right: 'HTTPS' }
      ],
      explanation: 'SSH (Secure Shell) uses TCP port 22 for encrypted remote administration. DNS uses port 53 (UDP for standard queries, TCP for zone transfers and large responses). HTTP uses TCP port 80 for unencrypted web traffic. HTTPS uses TCP port 443 for TLS-encrypted web traffic. Knowing common ports is essential for firewall configuration, troubleshooting, and security analysis.',
      difficulty: 'easy'
    },
    {
      id: 'l4-007',
      type: 'multiple-choice',
      question: 'How does TCP detect that a segment has been corrupted during transmission?',
      options: [
        'Sequence numbers',
        'Checksum field in the TCP header',
        'TTL field in the IP header',
        'Window size field'
      ],
      correctAnswer: 1,
      explanation: 'The TCP header includes a 16-bit checksum that covers the TCP header, payload, and a pseudo-header (containing source/destination IP addresses). The receiver recalculates the checksum and compares it to the one in the header. If they differ, the segment is considered corrupt and is discarded. The sender will eventually retransmit it when no ACK is received.',
      difficulty: 'medium'
    },
    {
      id: 'l4-008',
      type: 'true-false',
      question: 'TCP uses a four-way handshake (FIN, ACK, FIN, ACK) to gracefully terminate a connection.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'TCP connection termination uses four segments: (1) one side sends FIN, (2) the other side sends ACK, (3) the other side then sends its own FIN, (4) the first side sends ACK. This four-way process is necessary because TCP connections are full-duplex — each direction must be closed independently. The side that initiated the close enters a TIME_WAIT state to handle any delayed segments.',
      difficulty: 'medium'
    },
    {
      id: 'l4-009',
      type: 'multiple-choice',
      question: 'What is the maximum size of data a single TCP segment can carry, assuming a standard MTU of 1500 bytes and no IP or TCP options?',
      options: ['1460 bytes', '1480 bytes', '1500 bytes', '65535 bytes'],
      correctAnswer: 0,
      explanation: 'With a 1500-byte Ethernet MTU, the IP header takes 20 bytes and the TCP header takes 20 bytes (without options), leaving 1500 - 20 - 20 = 1460 bytes for the TCP payload. This value is called the MSS (Maximum Segment Size) and is negotiated during the TCP three-way handshake so both sides know the maximum payload each segment can carry.',
      difficulty: 'medium'
    },
    {
      id: 'l4-010',
      type: 'multiple-choice',
      question: 'Which of the following is NOT a TCP congestion control algorithm?',
      options: [
        'Slow Start',
        'Congestion Avoidance',
        'Fast Retransmit',
        'Sliding Window Broadcast'
      ],
      correctAnswer: 3,
      explanation: 'Slow Start, Congestion Avoidance, and Fast Retransmit are all real TCP congestion control mechanisms. Slow Start exponentially increases the congestion window from 1 MSS. Congestion Avoidance increases it linearly after a threshold. Fast Retransmit triggers retransmission after three duplicate ACKs without waiting for a timeout. "Sliding Window Broadcast" is not a real TCP mechanism.',
      difficulty: 'hard'
    },
    {
      id: 'l4-011',
      type: 'true-false',
      question: 'A socket is defined by the combination of an IP address and a port number.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'A socket is an endpoint identified by an IP address and a port number (e.g., 192.168.1.10:80). A TCP connection is uniquely identified by a pair of sockets: source IP:port and destination IP:port. This means a single server port (like port 80) can handle many simultaneous connections because each connection has a unique combination of source IP and source port.',
      difficulty: 'easy'
    },
    {
      id: 'l4-012',
      type: 'multiple-choice',
      question: 'Which flag in the TCP header is used to immediately terminate a connection without a graceful shutdown?',
      options: ['FIN', 'SYN', 'RST', 'PSH'],
      correctAnswer: 2,
      explanation: 'The RST (Reset) flag causes an immediate, ungraceful connection termination. When a host receives a RST, it immediately closes the connection without sending any further acknowledgments. This is used when a connection is in an invalid state, when a service is not available, or as a security measure. FIN is for graceful termination, SYN initiates connections, and PSH forces immediate delivery to the application.',
      difficulty: 'medium'
    },
    {
      id: 'l4-013',
      type: 'multiple-choice',
      question: 'Why would a developer choose UDP over TCP for a real-time video streaming application?',
      options: [
        'UDP guarantees packet delivery',
        'UDP has lower overhead and latency since it skips connection setup and retransmission',
        'UDP encrypts data automatically',
        'UDP supports larger packet sizes than TCP'
      ],
      correctAnswer: 1,
      explanation: 'UDP is preferred for real-time streaming because its lack of connection setup (no three-way handshake), acknowledgments, and retransmission means lower latency and overhead. For live video, a retransmitted packet would arrive too late to be useful, so the application simply skips lost frames. The slight data loss is preferable to the delays that TCP\'s reliability mechanisms would introduce.',
      difficulty: 'easy'
    },
    {
      id: 'l4-014',
      type: 'ordering',
      question: 'Order the TCP connection states from initial connection establishment to fully closed.',
      options: ['SYN_SENT', 'ESTABLISHED', 'FIN_WAIT_1', 'TIME_WAIT', 'CLOSED'],
      correctAnswer: ['SYN_SENT', 'ESTABLISHED', 'FIN_WAIT_1', 'TIME_WAIT', 'CLOSED'],
      explanation: 'A TCP client transitions through: SYN_SENT (after sending SYN), ESTABLISHED (connection open, data flowing), FIN_WAIT_1 (after sending FIN to initiate close), TIME_WAIT (waiting to ensure the last ACK was received, typically lasts 2x MSL), and finally CLOSED. Understanding these states is essential for troubleshooting connection issues with tools like netstat.',
      difficulty: 'hard'
    }
  ],

  // ─────────────────────────────────────────────
  //  LAYER 5 — Session  (placeholder, extended next)
  // ─────────────────────────────────────────────
  layer5: [
    {
      id: 'l5-001',
      type: 'multiple-choice',
      question: 'What is the primary role of the Session layer in the OSI model?',
      options: [
        'Routing packets between networks',
        'Establishing, managing, and terminating sessions between applications',
        'Encrypting data for secure transmission',
        'Converting data formats between systems'
      ],
      correctAnswer: 1,
      explanation: 'The Session layer (Layer 5) is responsible for establishing, managing, and terminating communication sessions between applications. It handles session setup (authentication, authorization), maintenance (including synchronization and checkpointing), and teardown. It ensures that data exchange between two devices is properly coordinated and organized.',
      difficulty: 'easy'
    },
    {
      id: 'l5-002',
      type: 'true-false',
      question: 'NetBIOS provides session-layer services for name resolution and session management on Windows networks.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'NetBIOS (Network Basic Input/Output System) operates at the Session layer, providing three services: Name Service (name registration and resolution on UDP port 137), Datagram Service (connectionless communication on UDP port 138), and Session Service (connection-oriented communication on TCP port 139). While largely replaced by DNS and direct TCP/IP, NetBIOS remains relevant in legacy Windows networking.',
      difficulty: 'medium'
    },
    {
      id: 'l5-003',
      type: 'multiple-choice',
      question: 'Which dialog control mode allows both parties to transmit simultaneously?',
      options: [
        'Simplex',
        'Half-duplex',
        'Full-duplex',
        'Multiplex'
      ],
      correctAnswer: 2,
      explanation: 'Full-duplex dialog control allows both communicating parties to send and receive data simultaneously, like a telephone conversation. Half-duplex allows both parties to communicate but only one at a time (like a walkie-talkie). Simplex is one-way only (like a broadcast). The Session layer manages which mode is used for a given communication session.',
      difficulty: 'easy'
    },
    {
      id: 'l5-004',
      type: 'multiple-choice',
      question: 'What is the purpose of session checkpointing (synchronization points)?',
      options: [
        'To encrypt session data at regular intervals',
        'To allow a long data transfer to resume from the last checkpoint after a failure',
        'To compress data more efficiently',
        'To monitor network bandwidth usage'
      ],
      correctAnswer: 1,
      explanation: 'Session checkpointing inserts synchronization points into the data stream during a transfer. If a failure occurs, the session can be resumed from the last successful checkpoint rather than restarting from the beginning. This is especially valuable for large file transfers. For example, if a 500 MB file transfer fails at 400 MB, checkpointing allows resumption from the last sync point near 400 MB.',
      difficulty: 'medium'
    },
    {
      id: 'l5-005',
      type: 'true-false',
      question: 'RPC (Remote Procedure Call) is a Session layer protocol that allows a program to execute procedures on a remote server.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'RPC operates at the Session layer, allowing a client application to call a procedure (function) on a remote server as if it were a local call. The RPC runtime handles the session details: marshalling parameters, transmitting them, executing the remote procedure, and returning results. Technologies like Sun RPC, DCE/RPC, and gRPC are built on this concept.',
      difficulty: 'medium'
    },
    {
      id: 'l5-006',
      type: 'multiple-choice',
      question: 'Which protocol provides Session layer functions for establishing and managing remote procedure calls between applications?',
      options: [
        'SMTP',
        'RPC (Remote Procedure Call)',
        'SNMP',
        'FTP'
      ],
      correctAnswer: 1,
      explanation: 'RPC (Remote Procedure Call) is a Session layer protocol that allows a program to execute a procedure on a remote server as if it were local. RPC handles session establishment, parameter marshalling, and response coordination. SMTP is an application-layer email protocol, SNMP is for network management, and FTP is a file transfer protocol — all are application-layer protocols.',
      difficulty: 'hard'
    },
    {
      id: 'l5-007',
      type: 'matching',
      question: 'Match each Session layer concept to its description.',
      options: [
        { left: 'Session establishment', right: 'Negotiating parameters and authenticating before data exchange' },
        { left: 'Session maintenance', right: 'Keeping the connection alive with keepalives and synchronization' },
        { left: 'Session termination', right: 'Gracefully closing the session and releasing resources' },
        { left: 'Token management', right: 'Controlling which side may transmit at a given time' }
      ],
      correctAnswer: [
        { left: 'Session establishment', right: 'Negotiating parameters and authenticating before data exchange' },
        { left: 'Session maintenance', right: 'Keeping the connection alive with keepalives and synchronization' },
        { left: 'Session termination', right: 'Gracefully closing the session and releasing resources' },
        { left: 'Token management', right: 'Controlling which side may transmit at a given time' }
      ],
      explanation: 'Session establishment involves negotiation and authentication before data flows. Session maintenance involves keepalive messages, synchronization points, and activity management. Session termination gracefully ends the dialog and frees resources. Token management is a dialog control mechanism where a "token" determines which party has the right to transmit, preventing collisions in half-duplex scenarios.',
      difficulty: 'medium'
    },
    {
      id: 'l5-008',
      type: 'multiple-choice',
      question: 'In the OSI model, which type of synchronization point allows the session to be rolled back only to that point, not to an earlier one?',
      options: [
        'Major synchronization point',
        'Minor synchronization point',
        'Activity synchronization point',
        'Checkpoint marker'
      ],
      correctAnswer: 0,
      explanation: 'A major synchronization point is a confirmed checkpoint — both sides agree on it, and the session can only be rolled back to the most recent major sync point (not beyond it). Minor synchronization points are unconfirmed and allow rollback to any previous minor point since the last major one. This two-level scheme balances recovery granularity with overhead.',
      difficulty: 'hard'
    },
    {
      id: 'l5-009',
      type: 'true-false',
      question: 'The Session layer can manage multiple simultaneous sessions between the same two hosts.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'The Session layer can manage multiple concurrent sessions between two hosts. For example, a user might have an active file transfer session and an interactive login session running simultaneously to the same server. Each session is independently established, maintained, and terminated. The Session layer keeps them separate and properly coordinated.',
      difficulty: 'easy'
    },
    {
      id: 'l5-010',
      type: 'multiple-choice',
      question: 'Which of the following best describes the concept of "dialog separation" at the Session layer?',
      options: [
        'Encrypting each dialog with a different key',
        'Inserting markers to separate logical units of data exchange within a session',
        'Splitting data across multiple network paths',
        'Compressing dialog headers for efficiency'
      ],
      correctAnswer: 1,
      explanation: 'Dialog separation involves inserting synchronization markers (sync points) into the data stream to create logical boundaries within a session. These boundaries define units of work that can be independently acknowledged and, if necessary, retransmitted. This is critical for structured data exchanges like database transactions where partial completion must be trackable.',
      difficulty: 'medium'
    },
    {
      id: 'l5-011',
      type: 'multiple-choice',
      question: 'Which Session layer mechanism enables a web server to recognize returning users across multiple HTTP requests?',
      options: [
        'MAC address tracking',
        'Session cookies and session IDs',
        'IP header options',
        'DNS caching'
      ],
      correctAnswer: 1,
      explanation: 'Session cookies and session IDs are application-level implementations of Session layer concepts. Since HTTP is stateless, session management is implemented via cookies containing a session ID. The server maps this ID to stored session state, enabling continuity across multiple requests. This is a practical example of session-layer functionality applied to modern web communication.',
      difficulty: 'easy'
    },
    {
      id: 'l5-012',
      type: 'true-false',
      question: 'SIP (Session Initiation Protocol) is used to establish and manage multimedia communication sessions such as VoIP calls.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'SIP is a signaling protocol that operates at the Session layer to create, modify, and terminate multimedia sessions including VoIP calls, video conferences, and instant messaging. SIP handles the session signaling (INVITE, ACK, BYE) while the actual media is carried by RTP (Real-time Transport Protocol). SIP is a core protocol in modern unified communications.',
      difficulty: 'medium'
    },
    {
      id: 'l5-013',
      type: 'multiple-choice',
      question: 'What is the Session layer PDU (Protocol Data Unit) called in the OSI model?',
      options: [
        'Segment',
        'Packet',
        'Data (or Session PDU)',
        'Frame'
      ],
      correctAnswer: 2,
      explanation: 'Layers 5 through 7 (Session, Presentation, Application) all work with generic "data" as their PDU in the OSI model. Formal OSI documentation may refer to Session Protocol Data Units (SPDUs). By contrast, Layer 4 uses segments (TCP) or datagrams (UDP), Layer 3 uses packets, Layer 2 uses frames, and Layer 1 uses bits.',
      difficulty: 'medium'
    }
  ],

  // ─────────────────────────────────────────────
  //  LAYER 6 — Presentation  (placeholder, extended next)
  // ─────────────────────────────────────────────
  layer6: [
    {
      id: 'l6-001',
      type: 'multiple-choice',
      question: 'What is the primary function of the Presentation layer?',
      options: [
        'Establishing sessions between applications',
        'Translating data formats, encryption/decryption, and compression/decompression',
        'Routing packets between networks',
        'Providing reliable data delivery'
      ],
      correctAnswer: 1,
      explanation: 'The Presentation layer (Layer 6) acts as a translator between the network format and the application format. Its three main functions are: (1) data translation/formatting — ensuring both sides use compatible data representations, (2) encryption/decryption — securing data in transit, and (3) compression/decompression — reducing data size for efficient transmission.',
      difficulty: 'easy'
    },
    {
      id: 'l6-002',
      type: 'true-false',
      question: 'SSL/TLS encryption operates at the Presentation layer of the OSI model.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'SSL/TLS is commonly mapped to the Presentation layer (Layer 6) because it handles encryption and decryption of data between the application and transport layers. In practice, TLS sits between the Application and Transport layers, encrypting application data before it is handed to TCP. Some models place it at the Session layer due to its handshake process, but its encryption function aligns best with Layer 6.',
      difficulty: 'medium'
    },
    {
      id: 'l6-003',
      type: 'multiple-choice',
      question: 'Which data format standard defines rules for encoding structured data using tag-length-value (TLV) and is used heavily in X.509 certificates?',
      options: [
        'ASCII',
        'JPEG',
        'ASN.1 (Abstract Syntax Notation One)',
        'MPEG'
      ],
      correctAnswer: 2,
      explanation: 'ASN.1 is a standard notation for defining data structures that can be serialized and deserialized across different platforms. It uses encoding rules like BER (Basic Encoding Rules) and DER (Distinguished Encoding Rules) to represent data in TLV format. ASN.1 is fundamental to X.509 certificates, SNMP MIBs, and many telecom protocols, making it a key Presentation layer standard.',
      difficulty: 'hard'
    },
    {
      id: 'l6-004',
      type: 'matching',
      question: 'Match each Presentation layer function to an example technology.',
      options: [
        { left: 'Data translation', right: 'Converting EBCDIC to ASCII' },
        { left: 'Encryption', right: 'TLS/SSL' },
        { left: 'Compression', right: 'gzip, DEFLATE' },
        { left: 'Serialization', right: 'JSON, XML, ASN.1' }
      ],
      correctAnswer: [
        { left: 'Data translation', right: 'Converting EBCDIC to ASCII' },
        { left: 'Encryption', right: 'TLS/SSL' },
        { left: 'Compression', right: 'gzip, DEFLATE' },
        { left: 'Serialization', right: 'JSON, XML, ASN.1' }
      ],
      explanation: 'Data translation converts between character encoding schemes (e.g., EBCDIC used on IBM mainframes to ASCII used on PCs). Encryption protocols like TLS secure data. Compression algorithms like gzip and DEFLATE reduce payload size. Serialization formats like JSON, XML, and ASN.1 define how structured data is encoded for transmission, ensuring both sides can parse the data correctly.',
      difficulty: 'medium'
    },
    {
      id: 'l6-005',
      type: 'multiple-choice',
      question: 'What is the difference between symmetric and asymmetric encryption?',
      options: [
        'Symmetric uses one key for both encryption and decryption; asymmetric uses a key pair',
        'Symmetric is slower than asymmetric',
        'Asymmetric uses a single shared secret; symmetric uses a public/private key pair',
        'There is no difference; they are the same'
      ],
      correctAnswer: 0,
      explanation: 'Symmetric encryption (e.g., AES, 3DES) uses a single shared key for both encryption and decryption — fast but requires secure key exchange. Asymmetric encryption (e.g., RSA, ECC) uses a public key for encryption and a private key for decryption (or vice versa for signing). In practice, TLS uses asymmetric encryption to securely exchange a symmetric session key, then symmetric encryption for the bulk data transfer.',
      difficulty: 'medium'
    },
    {
      id: 'l6-006',
      type: 'true-false',
      question: 'JPEG and GIF are examples of data formats handled at the Presentation layer.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Image formats like JPEG (lossy compression) and GIF (lossless with limited palette) are Presentation layer concerns because they define how visual data is encoded, compressed, and represented. The Presentation layer ensures that an image encoded by one system can be correctly decoded and displayed by another, regardless of the underlying hardware or operating system differences.',
      difficulty: 'easy'
    },
    {
      id: 'l6-007',
      type: 'multiple-choice',
      question: 'Which of the following is an example of lossy compression?',
      options: [
        'ZIP file compression',
        'JPEG image compression',
        'Gzip text compression',
        'LZ77 algorithm'
      ],
      correctAnswer: 1,
      explanation: 'JPEG uses lossy compression, meaning some data is permanently discarded to achieve smaller file sizes. The human eye cannot perceive the lost detail at reasonable quality settings. ZIP, gzip, and LZ77 are lossless compression methods where the original data can be perfectly reconstructed. Lossy compression is acceptable for media (images, audio, video) but not for text, code, or executables.',
      difficulty: 'easy'
    },
    {
      id: 'l6-008',
      type: 'multiple-choice',
      question: 'What character encoding standard uses variable-length encoding (1-4 bytes) and can represent virtually every character from every writing system?',
      options: [
        'ASCII (7-bit)',
        'EBCDIC',
        'UTF-8',
        'ISO 8859-1 (Latin-1)'
      ],
      correctAnswer: 2,
      explanation: 'UTF-8 is a variable-length Unicode encoding that uses 1 byte for ASCII characters (backward compatible), 2 bytes for most Latin/Greek/Cyrillic, 3 bytes for most Asian characters, and 4 bytes for rare characters and emoji. It can represent all 1,112,064 valid Unicode code points. UTF-8 is the dominant encoding on the web, used by over 98% of websites.',
      difficulty: 'medium'
    },
    {
      id: 'l6-009',
      type: 'true-false',
      question: 'The Presentation layer handles byte-order (endianness) conversion between systems that use different byte ordering.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Different computer architectures may store multi-byte values in different byte orders: big-endian (most significant byte first, as in network byte order) or little-endian (least significant byte first, as in x86 processors). The Presentation layer is responsible for translating between these formats so that data is correctly interpreted by the receiving system.',
      difficulty: 'medium'
    },
    {
      id: 'l6-010',
      type: 'multiple-choice',
      question: 'Which multimedia standard defines video compression used in streaming, Blu-ray, and video conferencing?',
      options: [
        'MIME',
        'H.264 / MPEG-4 AVC',
        'SMTP',
        'IMAP'
      ],
      correctAnswer: 1,
      explanation: 'H.264 (also known as MPEG-4 Part 10 / AVC) is a video compression standard that is a Presentation layer concern. It defines how video data is encoded and decoded, enabling efficient streaming and storage. Its successor, H.265 (HEVC), provides roughly double the compression efficiency. MIME is a standard for multimedia email attachments, and SMTP/IMAP are application-layer email protocols.',
      difficulty: 'medium'
    },
    {
      id: 'l6-011',
      type: 'ordering',
      question: 'Order these encryption algorithms from oldest to newest introduction.',
      options: ['DES (1977)', '3DES (1998)', 'AES (2001)', 'ChaCha20 (2014)'],
      correctAnswer: ['DES (1977)', '3DES (1998)', 'AES (2001)', 'ChaCha20 (2014)'],
      explanation: 'DES (Data Encryption Standard) was adopted in 1977 with a 56-bit key. 3DES applied DES three times for stronger security (1998). AES (Advanced Encryption Standard) replaced DES in 2001 with 128/192/256-bit keys. ChaCha20 was standardized in RFC 7539 in 2014 (originally designed by Daniel J. Bernstein in 2008) and is a modern stream cipher used in TLS as an alternative to AES on devices without hardware AES acceleration.',
      difficulty: 'hard'
    },
    {
      id: 'l6-012',
      type: 'multiple-choice',
      question: 'What does MIME (Multipurpose Internet Mail Extensions) accomplish at the Presentation layer?',
      options: [
        'Routes email messages between servers',
        'Defines how non-ASCII data (attachments, images, rich text) is encoded for email',
        'Encrypts email communications end-to-end',
        'Assigns IP addresses to mail servers'
      ],
      correctAnswer: 1,
      explanation: 'MIME extends email to support non-ASCII text, attachments, and multimedia content. It uses headers (Content-Type, Content-Transfer-Encoding) and encoding schemes like Base64 and quoted-printable to represent binary data as ASCII text suitable for transmission via SMTP. MIME types (e.g., text/html, image/png) are also used extensively in HTTP to identify content types.',
      difficulty: 'medium'
    },
    {
      id: 'l6-013',
      type: 'true-false',
      question: 'XDR (External Data Representation) is a Presentation layer standard used by NFS to ensure data is interpreted consistently across different architectures.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'XDR, defined in RFC 4506, is a standard for encoding data in a platform-independent format. It is used by Sun RPC and NFS (Network File System) to ensure that data exchanged between systems with different architectures (different byte orders, integer sizes, floating-point formats) is correctly interpreted. XDR defines a canonical big-endian format that all systems translate to and from.',
      difficulty: 'hard'
    }
  ],

  // ─────────────────────────────────────────────
  //  LAYER 7 — Application  (placeholder, extended next)
  // ─────────────────────────────────────────────
  layer7: [
    {
      id: 'l7-001',
      type: 'multiple-choice',
      question: 'Which DNS record type maps a domain name to an IPv4 address?',
      options: ['AAAA', 'CNAME', 'A', 'MX'],
      correctAnswer: 2,
      explanation: 'An A (Address) record maps a hostname to a 32-bit IPv4 address (e.g., example.com -> 93.184.216.34). AAAA records map to IPv6 addresses. CNAME (Canonical Name) creates an alias from one domain to another. MX (Mail Exchange) records specify the mail servers responsible for receiving email for a domain.',
      difficulty: 'easy'
    },
    {
      id: 'l7-002',
      type: 'matching',
      question: 'Match each Application layer protocol to its default port number.',
      options: [
        { left: 'FTP (data)', right: 'TCP 20' },
        { left: 'FTP (control)', right: 'TCP 21' },
        { left: 'SMTP', right: 'TCP 25' },
        { left: 'DNS', right: 'UDP/TCP 53' }
      ],
      correctAnswer: [
        { left: 'FTP (data)', right: 'TCP 20' },
        { left: 'FTP (control)', right: 'TCP 21' },
        { left: 'SMTP', right: 'TCP 25' },
        { left: 'DNS', right: 'UDP/TCP 53' }
      ],
      explanation: 'FTP uses two ports: TCP 20 for data transfer (in active mode) and TCP 21 for control commands. SMTP (Simple Mail Transfer Protocol) uses TCP port 25 for server-to-server email relay (port 587 for authenticated client submission). DNS uses UDP port 53 for standard queries (fast, small responses) and TCP port 53 for zone transfers and responses exceeding 512 bytes.',
      difficulty: 'medium'
    },
    {
      id: 'l7-003',
      type: 'multiple-choice',
      question: 'Which HTTP method is used to send data to a server to create or update a resource?',
      options: ['GET', 'POST', 'DELETE', 'HEAD'],
      correctAnswer: 1,
      explanation: 'POST sends data to the server, typically to create a new resource or submit form data. GET retrieves a resource without modifying it. DELETE removes a specified resource. HEAD is identical to GET but returns only the headers (no body), useful for checking if a resource exists or has been modified. PUT is also used to update/replace a resource, but POST is more commonly used for creation.',
      difficulty: 'easy'
    },
    {
      id: 'l7-004',
      type: 'true-false',
      question: 'DHCP uses a four-step process: Discover, Offer, Request, Acknowledge (DORA).',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'DHCP (Dynamic Host Configuration Protocol) uses the DORA process: (1) Discover — client broadcasts to find DHCP servers, (2) Offer — servers respond with an available IP address, (3) Request — client requests the offered address, (4) Acknowledge — server confirms the lease. The client also receives subnet mask, default gateway, DNS servers, and lease duration. Discover and Request are broadcasts; Offer and Acknowledge are typically unicast.',
      difficulty: 'easy'
    },
    {
      id: 'l7-005',
      type: 'multiple-choice',
      question: 'What is the difference between IMAP and POP3 for email retrieval?',
      options: [
        'POP3 keeps mail on the server; IMAP downloads and deletes it',
        'IMAP keeps mail on the server and syncs across devices; POP3 typically downloads and removes it',
        'They are identical protocols with different names',
        'IMAP only works with encrypted connections; POP3 does not support encryption'
      ],
      correctAnswer: 1,
      explanation: 'IMAP (Internet Message Access Protocol, port 143/993) keeps email on the server and synchronizes mailbox state across multiple devices. POP3 (Post Office Protocol v3, port 110/995) traditionally downloads email to a single device and removes it from the server (though a "leave on server" option exists). IMAP is preferred for users who access email from multiple devices.',
      difficulty: 'medium'
    },
    {
      id: 'l7-006',
      type: 'multiple-choice',
      question: 'Which HTTP status code indicates that the requested resource was not found?',
      options: ['200 OK', '301 Moved Permanently', '404 Not Found', '500 Internal Server Error'],
      correctAnswer: 2,
      explanation: 'HTTP 404 means the server could not find the requested resource at the specified URL. 200 indicates success. 301 indicates the resource has been permanently moved to a new URL (the response includes the new location). 500 indicates an unexpected server-side error. Status codes are grouped: 2xx = success, 3xx = redirection, 4xx = client error, 5xx = server error.',
      difficulty: 'easy'
    },
    {
      id: 'l7-007',
      type: 'true-false',
      question: 'SNMP (Simple Network Management Protocol) is used to monitor and manage network devices such as routers, switches, and servers.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'SNMP allows network administrators to monitor device health, performance, and configuration remotely. It uses a manager-agent architecture: the SNMP manager polls agents running on devices, which respond with data from their MIB (Management Information Base). SNMPv3 adds authentication and encryption. SNMP typically uses UDP ports 161 (queries) and 162 (traps — unsolicited alerts from agents).',
      difficulty: 'easy'
    },
    {
      id: 'l7-008',
      type: 'multiple-choice',
      question: 'Which protocol transfers files using an encrypted SSH tunnel?',
      options: ['FTP', 'TFTP', 'SFTP', 'HTTP'],
      correctAnswer: 2,
      explanation: 'SFTP (SSH File Transfer Protocol) provides secure file transfer over an SSH (Secure Shell) connection on TCP port 22. It encrypts both commands and data. FTP (ports 20/21) sends credentials and data in plaintext. TFTP (UDP port 69) is a simple, unauthenticated file transfer protocol used for PXE booting and firmware updates. FTPS (FTP Secure) is a different protocol that adds TLS to FTP.',
      difficulty: 'easy'
    },
    {
      id: 'l7-009',
      type: 'ordering',
      question: 'Order the DNS resolution process from start to finish when a client queries a domain name for the first time.',
      options: [
        'Client queries local DNS resolver',
        'Resolver queries root DNS server',
        'Root server refers to TLD server',
        'TLD server refers to authoritative name server',
        'Authoritative server returns the IP address'
      ],
      correctAnswer: [
        'Client queries local DNS resolver',
        'Resolver queries root DNS server',
        'Root server refers to TLD server',
        'TLD server refers to authoritative name server',
        'Authoritative server returns the IP address'
      ],
      explanation: 'DNS resolution follows a hierarchical process: (1) the client asks its configured DNS resolver (recursive resolver). (2) If not cached, the resolver queries a root DNS server. (3) The root server responds with the address of the appropriate TLD (Top-Level Domain) server (e.g., .com). (4) The TLD server refers to the authoritative name server for the specific domain. (5) The authoritative server returns the actual IP address. The resolver caches the result based on TTL.',
      difficulty: 'medium'
    },
    {
      id: 'l7-010',
      type: 'multiple-choice',
      question: 'What does the Telnet protocol lack that makes it unsuitable for secure remote administration?',
      options: [
        'Support for remote command execution',
        'Encryption — all data including passwords is sent in plaintext',
        'Support for multiple concurrent sessions',
        'Ability to connect to network devices'
      ],
      correctAnswer: 1,
      explanation: 'Telnet (TCP port 23) transmits everything in plaintext, including usernames and passwords, making it vulnerable to packet sniffing. SSH (TCP port 22) replaced Telnet by providing encrypted communication, strong authentication, and additional features like port forwarding and SFTP. Telnet should never be used over untrusted networks.',
      difficulty: 'easy'
    },
    {
      id: 'l7-011',
      type: 'matching',
      question: 'Match each DNS record type to its function.',
      options: [
        { left: 'A', right: 'Maps a domain to an IPv4 address' },
        { left: 'AAAA', right: 'Maps a domain to an IPv6 address' },
        { left: 'MX', right: 'Specifies mail servers for a domain' },
        { left: 'CNAME', right: 'Creates an alias pointing to another domain name' }
      ],
      correctAnswer: [
        { left: 'A', right: 'Maps a domain to an IPv4 address' },
        { left: 'AAAA', right: 'Maps a domain to an IPv6 address' },
        { left: 'MX', right: 'Specifies mail servers for a domain' },
        { left: 'CNAME', right: 'Creates an alias pointing to another domain name' }
      ],
      explanation: 'A records resolve domains to IPv4 addresses. AAAA records (called "quad-A") resolve to 128-bit IPv6 addresses. MX records define the mail server(s) for a domain, with priority values (lower = preferred). CNAME records create aliases — when you look up the alias, DNS follows the chain to the canonical name. Other important types include NS (name server), PTR (reverse lookup), TXT (text data, used for SPF/DKIM), and SOA (start of authority).',
      difficulty: 'easy'
    },
    {
      id: 'l7-012',
      type: 'true-false',
      question: 'HTTP/2 allows multiplexing multiple requests over a single TCP connection.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'HTTP/2 introduces multiplexing, allowing multiple request/response streams to be interleaved over a single TCP connection. This eliminates the head-of-line blocking problem in HTTP/1.1, where requests had to complete in order. HTTP/2 also adds header compression (HPACK), server push, and stream prioritization, significantly improving web performance.',
      difficulty: 'medium'
    },
    {
      id: 'l7-013',
      type: 'multiple-choice',
      question: 'Which protocol would you use to synchronize time across network devices?',
      options: ['SNMP', 'NTP', 'LDAP', 'RDP'],
      correctAnswer: 1,
      explanation: 'NTP (Network Time Protocol, UDP port 123) synchronizes clocks of network devices to a reference time source with millisecond-level accuracy. Accurate time is critical for log correlation, authentication protocols (Kerberos requires clocks within 5 minutes), digital certificates, and forensic analysis. NTP uses a hierarchical system of stratum levels, where stratum 0 is an atomic clock and each level below adds a small amount of error.',
      difficulty: 'easy'
    },
    {
      id: 'l7-014',
      type: 'multiple-choice',
      question: 'What is the primary purpose of LDAP (Lightweight Directory Access Protocol)?',
      options: [
        'Transferring files between servers',
        'Querying and modifying directory services (like Active Directory)',
        'Encrypting email messages',
        'Managing VLAN configurations'
      ],
      correctAnswer: 1,
      explanation: 'LDAP (TCP/UDP port 389, LDAPS on port 636) is used to access and manage directory services — hierarchical databases storing user accounts, groups, computers, and organizational information. Microsoft Active Directory is the most widely known LDAP-based directory. LDAP enables centralized authentication and authorization across an organization\'s network resources.',
      difficulty: 'medium'
    },
    {
      id: 'l7-015',
      type: 'multiple-choice',
      question: 'Which HTTP header is used by the server to specify how long a browser should cache a response?',
      options: [
        'Content-Type',
        'Cache-Control',
        'Authorization',
        'Accept-Encoding'
      ],
      correctAnswer: 1,
      explanation: 'The Cache-Control header directs caching behavior with directives like max-age (seconds to cache), no-cache (must revalidate), no-store (do not cache at all), and public/private (who may cache). Content-Type specifies the media type of the response. Authorization carries client credentials. Accept-Encoding tells the server which compression formats the client supports (e.g., gzip, br).',
      difficulty: 'medium'
    }
  ],

  // ─────────────────────────────────────────────
  //  COMPREHENSIVE  (placeholder, extended next)
  // ─────────────────────────────────────────────
  comprehensive: [
    // --- Layer 1 questions (1-7) ---
    {
      id: 'comp-001',
      type: 'multiple-choice',
      question: 'Which Physical layer standard defines Ethernet over fiber at 10 Gbps?',
      options: ['10BASE-T', '100BASE-TX', '10GBASE-SR', '1000BASE-T'],
      correctAnswer: 2,
      explanation: '10GBASE-SR (Short Range) defines 10 Gbps Ethernet over multimode fiber using 850 nm wavelength, reaching up to 300 m on OM3 fiber. 10BASE-T is 10 Mbps over copper, 100BASE-TX is Fast Ethernet over copper, and 1000BASE-T is Gigabit Ethernet over copper.',
      difficulty: 'medium'
    },
    {
      id: 'comp-002',
      type: 'true-false',
      question: 'Manchester encoding guarantees a transition in the middle of every bit period, which is used for clock recovery.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Manchester encoding (used by 10BASE-T Ethernet) represents each bit with a transition in the middle of the bit period: a high-to-low transition for a 1, and low-to-high for a 0 (or vice versa depending on convention). This guaranteed transition allows the receiver to synchronize its clock with the sender, eliminating the need for a separate clock signal.',
      difficulty: 'medium'
    },
    {
      id: 'comp-003',
      type: 'multiple-choice',
      question: 'What type of fiber optic connector is smallest and commonly used in high-density data center patch panels?',
      options: ['SC', 'ST', 'LC', 'FC'],
      correctAnswer: 2,
      explanation: 'The LC (Lucent Connector) has a small form factor (1.25 mm ferrule vs 2.5 mm for SC/ST) making it ideal for high-density environments. Its small size allows twice the port density compared to SC connectors. SC connectors use a push-pull design. ST uses a bayonet twist-lock. FC uses a threaded coupling, common in telecom.',
      difficulty: 'medium'
    },
    {
      id: 'comp-004',
      type: 'multiple-choice',
      question: 'STP (Shielded Twisted Pair) cable differs from UTP primarily in that STP:',
      options: [
        'Supports faster speeds than UTP',
        'Has metallic shielding around pairs to reduce EMI',
        'Uses fiber optic strands instead of copper',
        'Does not require RJ-45 connectors'
      ],
      correctAnswer: 1,
      explanation: 'STP cable wraps each pair (or all pairs together, or both) in metallic foil or braided shielding to reduce electromagnetic interference and crosstalk. This is beneficial in electrically noisy environments (factories, near motors). UTP relies solely on the twist rate of each pair to cancel interference. STP requires proper grounding; if not grounded, the shield can actually act as an antenna and increase interference.',
      difficulty: 'easy'
    },
    {
      id: 'comp-005',
      type: 'true-false',
      question: 'Power over Ethernet (PoE) delivers both data and electrical power over the same Cat 5e or better cable.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'PoE (IEEE 802.3af/at/bt) sends DC power alongside data over standard Ethernet cabling. 802.3af provides up to 15.4W, 802.3at (PoE+) up to 30W, and 802.3bt (PoE++) up to 60-90W per port. This powers devices like IP phones, wireless access points, and security cameras without separate power cables. The PSE (Power Sourcing Equipment, typically a switch) detects PoE-capable devices before supplying power.',
      difficulty: 'easy'
    },
    {
      id: 'comp-006',
      type: 'multiple-choice',
      question: 'What is the primary function of a media converter at the Physical layer?',
      options: [
        'Converting IP addresses between IPv4 and IPv6',
        'Converting signals between different physical media (e.g., copper to fiber)',
        'Translating between different network protocols',
        'Encrypting data as it passes between segments'
      ],
      correctAnswer: 1,
      explanation: 'A media converter is a Layer 1 device that converts signals between different physical media types, most commonly between copper (electrical signals) and fiber optic (light signals). This allows networks to extend beyond copper distance limits or to interconnect legacy copper segments with newer fiber infrastructure without replacing switches or routers.',
      difficulty: 'easy'
    },
    {
      id: 'comp-007',
      type: 'multiple-choice',
      question: 'What is the primary advantage of using fiber optic cable in a backbone network connecting buildings?',
      options: [
        'Lower cost than copper per meter',
        'Immunity to EMI and support for long distances at high bandwidth',
        'Easier to terminate than copper cable',
        'Built-in Power over Ethernet support'
      ],
      correctAnswer: 1,
      explanation: 'Fiber optic cable is ideal for building-to-building backbones because it is completely immune to electromagnetic interference (critical for outdoor runs near power lines), supports much longer distances than copper (hundreds of meters to many kilometers), and provides very high bandwidth. While more expensive per meter and harder to terminate, these advantages are critical for backbone infrastructure.',
      difficulty: 'easy'
    },
    // --- Layer 2 questions (8-14) ---
    {
      id: 'comp-008',
      type: 'multiple-choice',
      question: 'What is the purpose of the FCS (Frame Check Sequence) field in an Ethernet frame?',
      options: [
        'To identify the VLAN the frame belongs to',
        'To detect bit errors in the frame using CRC',
        'To specify the upper-layer protocol',
        'To indicate the frame\'s priority level'
      ],
      correctAnswer: 1,
      explanation: 'The FCS is a 4-byte field at the end of every Ethernet frame containing a CRC-32 (Cyclic Redundancy Check) value. The sender calculates the CRC over the entire frame (excluding preamble and FCS itself) and appends it. The receiver recalculates the CRC and compares. If they differ, the frame is silently discarded. Note: FCS detects errors but does not correct them or request retransmission — that is left to upper layers.',
      difficulty: 'medium'
    },
    {
      id: 'comp-009',
      type: 'true-false',
      question: 'ARP spoofing is an attack where a malicious device sends fake ARP replies to associate its MAC address with a legitimate IP address.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'ARP spoofing (or ARP poisoning) exploits the fact that ARP has no authentication. An attacker sends gratuitous ARP replies claiming their MAC address maps to the default gateway\'s IP (or another target\'s IP). Other hosts update their ARP caches with the false mapping, sending traffic to the attacker instead. This enables man-in-the-middle attacks. Dynamic ARP Inspection (DAI) on managed switches is a countermeasure.',
      difficulty: 'medium'
    },
    {
      id: 'comp-010',
      type: 'multiple-choice',
      question: 'What is the maximum number of VLANs supported by the 802.1Q standard?',
      options: ['256', '1024', '4094', '65535'],
      correctAnswer: 2,
      explanation: 'The 802.1Q VID (VLAN Identifier) field is 12 bits, theoretically allowing 4096 values (0-4095). However, VLANs 0 and 4095 are reserved, so 4094 usable VLANs are available. For environments needing more VLANs, technologies like VXLAN (Virtual Extensible LAN) use a 24-bit identifier, supporting over 16 million logical networks.',
      difficulty: 'medium'
    },
    {
      id: 'comp-011',
      type: 'multiple-choice',
      question: 'What is the difference between a store-and-forward switch and a cut-through switch?',
      options: [
        'Store-and-forward is faster because it sends frames immediately',
        'Cut-through starts forwarding as soon as it reads the destination MAC, while store-and-forward waits for the entire frame and checks FCS',
        'Store-and-forward operates at Layer 3 while cut-through operates at Layer 2',
        'There is no functional difference'
      ],
      correctAnswer: 1,
      explanation: 'A cut-through switch begins forwarding a frame as soon as it has read the destination MAC address (first 6 bytes after preamble), resulting in very low latency. A store-and-forward switch receives the entire frame, calculates the FCS to verify integrity, and only then forwards it. Store-and-forward is more reliable (catches corrupt frames), while cut-through is faster. Fragment-free switching is a compromise that checks the first 64 bytes.',
      difficulty: 'medium'
    },
    {
      id: 'comp-012',
      type: 'ordering',
      question: 'Order the STP (Spanning Tree Protocol) port states from initial to fully operational.',
      options: ['Blocking', 'Listening', 'Learning', 'Forwarding'],
      correctAnswer: ['Blocking', 'Listening', 'Learning', 'Forwarding'],
      explanation: 'STP ports transition through: Blocking (receives BPDUs only, no data forwarding — 20 sec max age timer), Listening (participates in STP election, no data — 15 sec forward delay), Learning (populates MAC address table but does not forward data — 15 sec forward delay), and Forwarding (fully operational, forwarding data). Total convergence takes about 50 seconds in classic STP, which RSTP (802.1w) reduces to seconds.',
      difficulty: 'hard'
    },
    {
      id: 'comp-013',
      type: 'true-false',
      question: 'A Layer 2 switch can segment collision domains but not broadcast domains.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Each port on a Layer 2 switch is its own collision domain (unlike a hub where all ports share one collision domain). However, all ports in the same VLAN share a single broadcast domain. Only a Layer 3 device (router or Layer 3 switch with inter-VLAN routing) can segment broadcast domains. VLANs on a Layer 2 switch create separate broadcast domains, but traffic between them still requires Layer 3.',
      difficulty: 'medium'
    },
    {
      id: 'comp-014',
      type: 'multiple-choice',
      question: 'What EtherType value in an Ethernet frame indicates that the payload is an IPv4 packet?',
      options: ['0x0800', '0x0806', '0x86DD', '0x8100'],
      correctAnswer: 0,
      explanation: '0x0800 identifies IPv4 in the EtherType field. 0x0806 is ARP, 0x86DD is IPv6, and 0x8100 is the 802.1Q VLAN tag TPID (Tag Protocol Identifier). The EtherType field allows the receiving device to know which network-layer protocol should process the frame\'s payload.',
      difficulty: 'hard'
    },
    // --- Layer 3 questions (15-21) ---
    {
      id: 'comp-015',
      type: 'multiple-choice',
      question: 'What is the purpose of the DF (Don\'t Fragment) flag in the IPv4 header?',
      options: [
        'Enables encryption for the packet',
        'Tells routers not to fragment the packet; if it exceeds MTU, drop it and send ICMP error',
        'Indicates the packet is a duplicate',
        'Prioritizes the packet for faster routing'
      ],
      correctAnswer: 1,
      explanation: 'When the DF flag is set, routers must not fragment the packet. If the packet is larger than the next-hop MTU, the router drops it and sends an ICMP "Fragmentation Needed" (Type 3, Code 4) message back to the source. This mechanism is used in Path MTU Discovery, which finds the smallest MTU along a path so the sender can adjust segment sizes accordingly.',
      difficulty: 'hard'
    },
    {
      id: 'comp-016',
      type: 'true-false',
      question: 'OSPF routers in the same area share a common link-state database.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'All OSPF routers within the same area maintain an identical LSDB (Link-State Database) through the exchange of LSAs (Link-State Advertisements). Each router then independently runs the SPF (Dijkstra) algorithm on this database to calculate the best paths. This common database ensures consistent, loop-free routing within the area. Area 0 (backbone) connects all other areas.',
      difficulty: 'medium'
    },
    {
      id: 'comp-017',
      type: 'multiple-choice',
      question: 'Which of the following is a valid IPv6 address representation?',
      options: [
        '192.168.1.1',
        '2001:0db8::1',
        'FE:80:00:01',
        '10.0.0.256'
      ],
      correctAnswer: 1,
      explanation: '2001:0db8::1 is a valid IPv6 address. The :: notation represents one or more groups of consecutive zeros (it can only appear once in an address). This expands to 2001:0db8:0000:0000:0000:0000:0000:0001. 192.168.1.1 is IPv4. FE:80:00:01 has only 4 groups instead of 8 and wrong format. 10.0.0.256 is invalid because 256 exceeds the 0-255 range per octet in IPv4.',
      difficulty: 'easy'
    },
    {
      id: 'comp-018',
      type: 'matching',
      question: 'Match each IPv4 address range to its RFC 1918 private class.',
      options: [
        { left: '10.0.0.0/8', right: 'Class A private range' },
        { left: '172.16.0.0/12', right: 'Class B private range' },
        { left: '192.168.0.0/16', right: 'Class C private range' },
        { left: '169.254.0.0/16', right: 'APIPA (link-local, not RFC 1918)' }
      ],
      correctAnswer: [
        { left: '10.0.0.0/8', right: 'Class A private range' },
        { left: '172.16.0.0/12', right: 'Class B private range' },
        { left: '192.168.0.0/16', right: 'Class C private range' },
        { left: '169.254.0.0/16', right: 'APIPA (link-local, not RFC 1918)' }
      ],
      explanation: 'RFC 1918 defines three private ranges: 10.0.0.0/8 (one Class A network), 172.16.0.0/12 (16 contiguous Class B networks: 172.16-31.x.x), and 192.168.0.0/16 (256 Class C networks). 169.254.0.0/16 is NOT an RFC 1918 private range — it is the APIPA (Automatic Private IP Addressing) link-local range used when DHCP is unavailable, defined by RFC 3927.',
      difficulty: 'medium'
    },
    {
      id: 'comp-019',
      type: 'multiple-choice',
      question: 'What is the loopback address in IPv4?',
      options: ['0.0.0.0', '127.0.0.1', '255.255.255.255', '192.168.0.1'],
      correctAnswer: 1,
      explanation: 'The IPv4 loopback address is 127.0.0.1 (the entire 127.0.0.0/8 block is reserved for loopback). Traffic sent to 127.0.0.1 never leaves the host — it is routed internally back to the device. This is used for testing TCP/IP stack functionality. In IPv6, the loopback address is ::1. 0.0.0.0 represents "any address" or "unspecified." 255.255.255.255 is the limited broadcast address.',
      difficulty: 'easy'
    },
    {
      id: 'comp-020',
      type: 'multiple-choice',
      question: 'What type of NAT maps one private IP address to one public IP address permanently?',
      options: [
        'Static NAT',
        'Dynamic NAT',
        'PAT (Port Address Translation)',
        'Reverse NAT'
      ],
      correctAnswer: 0,
      explanation: 'Static NAT creates a permanent one-to-one mapping between a private IP and a public IP. This is used when an internal server (like a web server) must be accessible from the internet using a consistent public IP. Dynamic NAT maps private addresses to a pool of public addresses on a first-come basis. PAT (NAT overload) allows many private addresses to share one public address by differentiating connections via port numbers.',
      difficulty: 'medium'
    },
    {
      id: 'comp-021',
      type: 'true-false',
      question: 'BGP (Border Gateway Protocol) is the primary routing protocol used to route traffic between autonomous systems on the internet.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'BGP is the "routing protocol of the internet," responsible for exchanging routing information between autonomous systems (AS). eBGP runs between different ASes, while iBGP distributes routes within an AS. BGP uses path attributes (AS-PATH, local preference, MED, etc.) to make routing decisions, supporting complex policies. It runs over TCP port 179 and converges slowly by design to maintain stability.',
      difficulty: 'medium'
    },
    // --- Layer 4 questions (22-28) ---
    {
      id: 'comp-022',
      type: 'multiple-choice',
      question: 'What does the TCP window size field control?',
      options: [
        'The maximum number of hops a packet can traverse',
        'The amount of data (in bytes) the sender can transmit before receiving an acknowledgment',
        'The size of the TCP header',
        'The number of retransmission attempts before giving up'
      ],
      correctAnswer: 1,
      explanation: 'The TCP window size field (16 bits in the standard header, expandable via Window Scale option to 30 bits) advertises how many bytes of data the receiver can buffer. The sender must not have more than this amount of unacknowledged data in flight. A larger window allows more data to be in transit, improving throughput on high-bandwidth, high-latency links. A window size of 0 means the receiver\'s buffer is full.',
      difficulty: 'medium'
    },
    {
      id: 'comp-023',
      type: 'true-false',
      question: 'TCP guarantees that data arrives at the receiver in the same order it was sent.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'TCP uses sequence numbers to reassemble data in the correct order at the receiver, regardless of the order packets arrive. Each byte of data is assigned a sequence number, and the receiver uses these to place data in the correct order before delivering it to the application. If segments arrive out of order, TCP buffers them until the missing segments arrive.',
      difficulty: 'easy'
    },
    {
      id: 'comp-024',
      type: 'multiple-choice',
      question: 'Which TCP flag indicates that data should be pushed to the application immediately rather than being buffered?',
      options: ['URG', 'PSH', 'RST', 'ECE'],
      correctAnswer: 1,
      explanation: 'The PSH (Push) flag tells the receiving TCP stack to deliver data to the application immediately without waiting for the buffer to fill. This is important for interactive applications like SSH or Telnet where even small amounts of data (e.g., a single keystroke) should be delivered promptly. URG marks urgent data. RST resets the connection. ECE is used for Explicit Congestion Notification.',
      difficulty: 'medium'
    },
    {
      id: 'comp-025',
      type: 'multiple-choice',
      question: 'A client initiates a connection to a web server on port 443. What type of port does the client use as its source port?',
      options: [
        'Well-known port (0-1023)',
        'Registered port (1024-49151)',
        'Dynamic/ephemeral port (49152-65535)',
        'The same port as the destination (443)'
      ],
      correctAnswer: 2,
      explanation: 'The client uses a dynamically assigned ephemeral port (49152-65535 per IANA, though many OSes use ports starting from 1024 or 32768) as its source port. This randomly chosen high port, combined with the client\'s IP address, uniquely identifies the client-side socket. The server listens on well-known port 443, but each client connection uses a different ephemeral source port.',
      difficulty: 'easy'
    },
    {
      id: 'comp-026',
      type: 'ordering',
      question: 'Order the TCP four-way connection termination process.',
      options: [
        'Initiator sends FIN',
        'Receiver sends ACK for the FIN',
        'Receiver sends its own FIN',
        'Initiator sends ACK for the receiver\'s FIN'
      ],
      correctAnswer: [
        'Initiator sends FIN',
        'Receiver sends ACK for the FIN',
        'Receiver sends its own FIN',
        'Initiator sends ACK for the receiver\'s FIN'
      ],
      explanation: 'TCP termination is a four-step process because each direction closes independently: (1) The initiator sends FIN to signal it is done sending. (2) The receiver ACKs the FIN. (3) When the receiver is also done, it sends its own FIN. (4) The initiator ACKs this final FIN. The initiator then enters TIME_WAIT (typically 2x MSL = 60 seconds) to ensure delayed packets are handled.',
      difficulty: 'medium'
    },
    {
      id: 'comp-027',
      type: 'true-false',
      question: 'UDP has a smaller header (8 bytes) compared to TCP (minimum 20 bytes), which contributes to its lower overhead.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'The UDP header is only 8 bytes: source port (2), destination port (2), length (2), and checksum (2). The TCP header is a minimum of 20 bytes (up to 60 with options), containing additional fields for sequence numbers, acknowledgment numbers, window size, flags, and more. This difference in header size, plus the absence of connection setup and acknowledgment mechanisms, is why UDP has lower overhead.',
      difficulty: 'easy'
    },
    {
      id: 'comp-028',
      type: 'multiple-choice',
      question: 'What is a SYN flood attack?',
      options: [
        'An attack that fills a switch\'s MAC address table',
        'An attack that sends many TCP SYN packets without completing the handshake, exhausting server resources',
        'An attack that corrupts ARP tables',
        'An attack that overwhelms DNS servers with queries'
      ],
      correctAnswer: 1,
      explanation: 'A SYN flood is a denial-of-service attack where the attacker sends a large number of TCP SYN packets (often with spoofed source IPs) without completing the three-way handshake. The server allocates resources for each half-open connection (SYN_RECEIVED state), eventually exhausting its connection table. SYN cookies and rate limiting are common defenses against this attack.',
      difficulty: 'medium'
    },
    // --- Layer 5 questions (29-33) ---
    {
      id: 'comp-029',
      type: 'multiple-choice',
      question: 'Which protocol provides Session layer functionality for establishing multimedia sessions, such as voice and video calls?',
      options: ['RTP', 'SIP', 'SRTP', 'H.264'],
      correctAnswer: 1,
      explanation: 'SIP (Session Initiation Protocol) handles the signaling needed to establish, modify, and terminate multimedia communication sessions. It uses methods like INVITE (initiate), ACK (confirm), BYE (terminate), and REGISTER (register location). The actual media transport is handled by RTP (Real-time Transport Protocol). SRTP is the encrypted version of RTP. H.264 is a video codec.',
      difficulty: 'medium'
    },
    {
      id: 'comp-030',
      type: 'true-false',
      question: 'The Session layer is responsible for dialog control, which determines whether communication is simplex, half-duplex, or full-duplex.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'Dialog control is a core Session layer function that manages the mode of communication between two parties. Simplex is one-way only, half-duplex allows both directions but one at a time (using token passing to control turns), and full-duplex allows simultaneous bidirectional communication. The Session layer negotiates which mode is used when establishing the session.',
      difficulty: 'easy'
    },
    {
      id: 'comp-031',
      type: 'multiple-choice',
      question: 'Which protocol operates at the Session layer to provide authentication services in Windows domains?',
      options: ['HTTP', 'Kerberos', 'OSPF', 'SNMP'],
      correctAnswer: 1,
      explanation: 'Kerberos is an authentication protocol that provides Session layer services for secure identity verification in Windows Active Directory environments. It uses a ticket-based system: the client obtains a Ticket Granting Ticket (TGT) from the Key Distribution Center (KDC), then uses it to request service tickets for specific resources, all without transmitting passwords over the network.',
      difficulty: 'medium'
    },
    {
      id: 'comp-032',
      type: 'multiple-choice',
      question: 'What mechanism does NetBIOS use to resolve NetBIOS names to IP addresses when WINS is not available?',
      options: [
        'DNS queries',
        'Broadcast-based name resolution',
        'ARP requests',
        'DHCP lease negotiation'
      ],
      correctAnswer: 1,
      explanation: 'Without a WINS (Windows Internet Name Service) server, NetBIOS resolves names through broadcast-based queries (NetBIOS Name Query packets sent to the local broadcast address on UDP port 137). Every device on the segment receives the broadcast, and the device with the matching name responds. This method does not work across subnets, which is why WINS or DNS integration was introduced.',
      difficulty: 'hard'
    },
    {
      id: 'comp-033',
      type: 'true-false',
      question: 'PAP (Password Authentication Protocol) is considered insecure because it sends credentials in cleartext during session authentication.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'PAP transmits the username and password in plaintext, making it vulnerable to packet sniffing. CHAP (Challenge Handshake Authentication Protocol) is a more secure alternative that uses a three-way challenge-response mechanism with hashed credentials, never sending the actual password. MS-CHAPv2 and EAP-based methods provide even stronger authentication for modern networks.',
      difficulty: 'easy'
    },
    // --- Layer 6 questions (34-39) ---
    {
      id: 'comp-034',
      type: 'multiple-choice',
      question: 'Which encryption algorithm is the current standard recommended by NIST for symmetric encryption?',
      options: ['DES', '3DES', 'AES', 'RC4'],
      correctAnswer: 2,
      explanation: 'AES (Advanced Encryption Standard) was selected by NIST in 2001 to replace DES. It supports key sizes of 128, 192, and 256 bits and is considered secure, efficient, and fast (especially with hardware acceleration in modern CPUs). DES (56-bit key) is broken. 3DES is deprecated as of 2023. RC4 is a stream cipher with known vulnerabilities and is prohibited in TLS.',
      difficulty: 'easy'
    },
    {
      id: 'comp-035',
      type: 'true-false',
      question: 'Base64 is an encryption algorithm that secures data during transmission.',
      options: ['True', 'False'],
      correctAnswer: false,
      explanation: 'Base64 is an encoding scheme, not encryption. It converts binary data into a set of 64 ASCII characters, making binary data safe for transmission over text-based protocols like email (MIME) and HTTP. Base64 is completely reversible by anyone — it provides zero confidentiality. It increases data size by about 33%. Common uses include encoding email attachments and embedding images in HTML/CSS.',
      difficulty: 'easy'
    },
    {
      id: 'comp-036',
      type: 'multiple-choice',
      question: 'In the TLS handshake, what is the purpose of the digital certificate sent by the server?',
      options: [
        'To compress the session data',
        'To prove the server\'s identity and provide its public key',
        'To assign the client an IP address',
        'To establish the MTU for the connection'
      ],
      correctAnswer: 1,
      explanation: 'The server\'s digital certificate (X.509) serves two purposes: it proves the server\'s identity (authenticated by a trusted Certificate Authority\'s signature) and it provides the server\'s public key. The client uses this public key to securely exchange a pre-master secret, from which both sides derive the symmetric session keys used to encrypt the actual data transfer.',
      difficulty: 'medium'
    },
    {
      id: 'comp-037',
      type: 'multiple-choice',
      question: 'Which of the following is a lossless image format?',
      options: ['JPEG', 'MP3', 'PNG', 'AAC'],
      correctAnswer: 2,
      explanation: 'PNG (Portable Network Graphics) uses lossless compression (DEFLATE algorithm), preserving every pixel of the original image exactly. JPEG uses lossy compression, discarding visual detail the human eye is less sensitive to. MP3 and AAC are lossy audio formats. Lossless formats are preferred for graphics, screenshots, and images requiring exact reproduction; lossy formats are better for photographs where small quality loss is acceptable.',
      difficulty: 'easy'
    },
    {
      id: 'comp-038',
      type: 'matching',
      question: 'Match each data format to its primary content type.',
      options: [
        { left: 'MPEG-4', right: 'Video' },
        { left: 'MP3', right: 'Audio' },
        { left: 'JPEG', right: 'Image' },
        { left: 'ASCII', right: 'Text' }
      ],
      correctAnswer: [
        { left: 'MPEG-4', right: 'Video' },
        { left: 'MP3', right: 'Audio' },
        { left: 'JPEG', right: 'Image' },
        { left: 'ASCII', right: 'Text' }
      ],
      explanation: 'MPEG-4 (and its H.264/AVC profile) is a video compression standard. MP3 (MPEG-1 Audio Layer III) is an audio compression format. JPEG (Joint Photographic Experts Group) is an image compression format. ASCII (American Standard Code for Information Interchange) is a 7-bit character encoding for text. Understanding these formats is key to Presentation layer concepts of data representation and translation.',
      difficulty: 'easy'
    },
    {
      id: 'comp-039',
      type: 'multiple-choice',
      question: 'What is the purpose of a hashing algorithm like SHA-256 at the Presentation layer?',
      options: [
        'To encrypt data so it cannot be read without a key',
        'To compress data for faster transmission',
        'To produce a fixed-size digest that verifies data integrity',
        'To translate between different character encodings'
      ],
      correctAnswer: 2,
      explanation: 'SHA-256 produces a 256-bit hash (digest) from any input. Even a single-bit change in the input produces a completely different hash (avalanche effect). Hashing is a one-way function — you cannot reverse the hash to get the original data. It is used for data integrity verification, digital signatures, password storage, and certificate validation. Unlike encryption, hashing does not provide confidentiality.',
      difficulty: 'medium'
    },
    // --- Layer 7 questions (40-46) ---
    {
      id: 'comp-040',
      type: 'multiple-choice',
      question: 'Which protocol is used to automatically assign IP addresses, subnet masks, default gateways, and DNS server addresses to clients?',
      options: ['DNS', 'ARP', 'DHCP', 'NAT'],
      correctAnswer: 2,
      explanation: 'DHCP (Dynamic Host Configuration Protocol) automatically configures network settings for clients using the DORA process. It assigns not only the IP address but also the subnet mask, default gateway, DNS servers, domain name, lease duration, and optionally TFTP server (for PXE boot), NTP server, and other options. DHCP uses UDP ports 67 (server) and 68 (client).',
      difficulty: 'easy'
    },
    {
      id: 'comp-041',
      type: 'true-false',
      question: 'HTTPS uses TLS to encrypt HTTP traffic and typically runs on TCP port 443.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'HTTPS (HTTP Secure) layers HTTP over TLS (Transport Layer Security) to provide encryption, authentication, and integrity for web traffic. It runs on TCP port 443 by default (vs. port 80 for unencrypted HTTP). The TLS handshake occurs before any HTTP data is exchanged, establishing encrypted session keys. Modern browsers mark HTTP sites as "Not Secure" to encourage universal HTTPS adoption.',
      difficulty: 'easy'
    },
    {
      id: 'comp-042',
      type: 'multiple-choice',
      question: 'What type of DNS record is used to implement email sender authentication by specifying which mail servers are authorized to send email for a domain?',
      options: ['A record', 'CNAME record', 'TXT record (SPF)', 'PTR record'],
      correctAnswer: 2,
      explanation: 'SPF (Sender Policy Framework) is published as a TXT record in DNS. It lists the IP addresses and domains authorized to send email on behalf of the domain (e.g., "v=spf1 include:_spf.google.com -all"). Receiving mail servers check SPF records to detect spoofed sender addresses. DKIM and DMARC are complementary email authentication standards also using TXT records.',
      difficulty: 'hard'
    },
    {
      id: 'comp-043',
      type: 'multiple-choice',
      question: 'Which Application layer protocol uses TCP port 3389 and is commonly used for remote desktop access in Windows?',
      options: ['VNC', 'SSH', 'RDP', 'Telnet'],
      correctAnswer: 2,
      explanation: 'RDP (Remote Desktop Protocol) uses TCP port 3389 (and optionally UDP 3389 for performance) to provide graphical remote access to Windows systems. VNC (Virtual Network Computing) typically uses ports 5900+. SSH uses port 22 for text-based remote access (and tunneling). Telnet uses port 23 for unencrypted text-based access. RDP supports encryption, audio redirection, drive mapping, and multi-monitor support.',
      difficulty: 'medium'
    },
    {
      id: 'comp-044',
      type: 'matching',
      question: 'Match each HTTP status code to its meaning.',
      options: [
        { left: '200', right: 'OK — request succeeded' },
        { left: '301', right: 'Moved Permanently — resource has a new URL' },
        { left: '403', right: 'Forbidden — server refuses the request' },
        { left: '503', right: 'Service Unavailable — server temporarily overloaded' }
      ],
      correctAnswer: [
        { left: '200', right: 'OK — request succeeded' },
        { left: '301', right: 'Moved Permanently — resource has a new URL' },
        { left: '403', right: 'Forbidden — server refuses the request' },
        { left: '503', right: 'Service Unavailable — server temporarily overloaded' }
      ],
      explanation: 'HTTP status codes are grouped by category: 2xx = success (200 OK is the standard success response), 3xx = redirection (301 tells the client to use a new permanent URL, important for SEO), 4xx = client error (403 means the server understood the request but refuses to authorize it), 5xx = server error (503 means the server is temporarily unable to handle the request, often due to overload or maintenance).',
      difficulty: 'medium'
    },
    {
      id: 'comp-045',
      type: 'true-false',
      question: 'REST APIs typically use HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'REST (Representational State Transfer) APIs map HTTP methods to CRUD operations: GET = Read, POST = Create, PUT = Update (full replacement), PATCH = Update (partial), DELETE = Delete. Resources are identified by URLs, and responses typically use JSON or XML. REST is stateless — each request contains all information needed to process it, with no server-side session state between requests.',
      difficulty: 'easy'
    },
    {
      id: 'comp-046',
      type: 'multiple-choice',
      question: 'Which Application layer protocol uses a hierarchical distributed database to translate domain names to IP addresses?',
      options: ['DHCP', 'FTP', 'DNS', 'SMTP'],
      correctAnswer: 2,
      explanation: 'DNS (Domain Name System) uses a hierarchical, distributed database spread across root servers, TLD servers, and authoritative name servers worldwide. This distributed architecture provides redundancy and scalability for the billions of DNS queries made daily. DNS caching at multiple levels (local resolver, ISP resolver, OS cache) reduces query load and improves response times.',
      difficulty: 'easy'
    },
    // --- Cross-layer / synthesis questions (47-50) ---
    {
      id: 'comp-047',
      type: 'ordering',
      question: 'Order the OSI layers from bottom (closest to the physical medium) to top (closest to the user).',
      options: [
        'Physical',
        'Data Link',
        'Network',
        'Transport',
        'Session',
        'Presentation',
        'Application'
      ],
      correctAnswer: [
        'Physical',
        'Data Link',
        'Network',
        'Transport',
        'Session',
        'Presentation',
        'Application'
      ],
      explanation: 'The OSI model layers from bottom to top are: Layer 1 Physical (bits, cables, signals), Layer 2 Data Link (frames, MAC addresses, switches), Layer 3 Network (packets, IP addresses, routers), Layer 4 Transport (segments, TCP/UDP, ports), Layer 5 Session (session management), Layer 6 Presentation (encryption, encoding, compression), Layer 7 Application (user-facing protocols like HTTP, DNS, SMTP).',
      difficulty: 'easy'
    },
    {
      id: 'comp-048',
      type: 'matching',
      question: 'Match each PDU (Protocol Data Unit) name to its OSI layer.',
      options: [
        { left: 'Bits', right: 'Layer 1 — Physical' },
        { left: 'Frames', right: 'Layer 2 — Data Link' },
        { left: 'Packets', right: 'Layer 3 — Network' },
        { left: 'Segments', right: 'Layer 4 — Transport' }
      ],
      correctAnswer: [
        { left: 'Bits', right: 'Layer 1 — Physical' },
        { left: 'Frames', right: 'Layer 2 — Data Link' },
        { left: 'Packets', right: 'Layer 3 — Network' },
        { left: 'Segments', right: 'Layer 4 — Transport' }
      ],
      explanation: 'Each OSI layer has a specific PDU name: Layer 1 works with bits (raw 1s and 0s). Layer 2 encapsulates data into frames (with MAC headers and FCS). Layer 3 encapsulates segments into packets (with IP headers). Layer 4 breaks application data into segments (TCP) or datagrams (UDP). Layers 5-7 all work with generic "data." Understanding PDU names is essential for discussing encapsulation and troubleshooting.',
      difficulty: 'easy'
    },
    {
      id: 'comp-049',
      type: 'multiple-choice',
      question: 'When a user types "https://www.example.com" in a browser, which is the correct order of operations?',
      options: [
        'TCP handshake -> DNS resolution -> TLS handshake -> HTTP GET',
        'DNS resolution -> TCP handshake -> TLS handshake -> HTTP GET',
        'HTTP GET -> DNS resolution -> TCP handshake -> TLS handshake',
        'TLS handshake -> DNS resolution -> HTTP GET -> TCP handshake'
      ],
      correctAnswer: 1,
      explanation: 'The correct sequence is: (1) DNS resolution — the browser resolves www.example.com to an IP address. (2) TCP three-way handshake — the browser establishes a TCP connection to the server on port 443. (3) TLS handshake — the client and server negotiate encryption parameters and exchange keys. (4) HTTP GET — the browser sends the encrypted HTTP request for the page. Each step depends on the previous one completing first.',
      difficulty: 'medium'
    },
    {
      id: 'comp-050',
      type: 'multiple-choice',
      question: 'A network technician captures traffic and sees an Ethernet frame containing an IP packet containing a TCP segment destined for port 80. Which layers of the OSI model are involved in this description?',
      options: [
        'Layers 1, 2, and 3 only',
        'Layers 2, 3, and 4 only',
        'Layers 1 through 4 (and effectively up to 7)',
        'Layers 3, 4, and 7 only'
      ],
      correctAnswer: 2,
      explanation: 'This description touches all layers: the Ethernet frame is Layer 2 (Data Link), the IP packet is Layer 3 (Network), the TCP segment is Layer 4 (Transport), and port 80 implies HTTP at Layer 7 (Application). The bits on the wire are Layer 1 (Physical). Layers 5 and 6 (Session, Presentation) would be involved in the actual HTTP session and any encoding/encryption. The entire OSI stack is engaged when data traverses a network.',
      difficulty: 'medium'
    }
  ]
};
