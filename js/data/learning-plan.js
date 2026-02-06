// Structured learning plan — 5 modules, ~15 lessons, ~50 steps
// Maps to existing views and tracks progress via store.progress

export const learningPlan = {
  modules: [
    {
      id: 'fundamentals',
      title: 'Networking Fundamentals',
      description: 'Build a solid foundation by understanding why layered network models exist, then explore each of the 7 OSI layers from top to bottom.',
      difficulty: 'beginner',
      icon: 'foundation',
      lessons: [
        {
          id: 'intro-models',
          title: 'Introduction to Network Models',
          description: 'Understand why we use layered models to describe how networks work, and see how OSI compares to TCP/IP.',
          steps: [
            { title: 'OSI vs TCP/IP Overview', type: 'explore', route: '/comparison', trackType: null, trackId: null },
            { title: 'Explore the Application Layer', type: 'explore', route: '/layer/7', trackType: 'layer', trackId: 7 },
            { title: 'Explore the Presentation Layer', type: 'explore', route: '/layer/6', trackType: 'layer', trackId: 6 },
            { title: 'Explore the Session Layer', type: 'explore', route: '/layer/5', trackType: 'layer', trackId: 5 }
          ]
        },
        {
          id: 'lower-layers',
          title: 'The Lower Layers',
          description: 'Continue your journey down through Transport, Network, Data Link, and Physical layers.',
          steps: [
            { title: 'Explore the Transport Layer', type: 'explore', route: '/layer/4', trackType: 'layer', trackId: 4 },
            { title: 'Explore the Network Layer', type: 'explore', route: '/layer/3', trackType: 'layer', trackId: 3 },
            { title: 'Explore the Data Link Layer', type: 'explore', route: '/layer/2', trackType: 'layer', trackId: 2 },
            { title: 'Explore the Physical Layer', type: 'explore', route: '/layer/1', trackType: 'layer', trackId: 1 }
          ]
        },
        {
          id: 'first-quizzes',
          title: 'Check Your Understanding',
          description: 'Test what you\'ve learned about the top and bottom layers of the OSI model.',
          steps: [
            { title: 'Application Layer Quiz', type: 'quiz', route: '/quiz/layer7', trackType: 'quiz', trackId: 'layer7' },
            { title: 'Physical Layer Quiz', type: 'quiz', route: '/quiz/layer1', trackType: 'quiz', trackId: 'layer1' }
          ]
        }
      ]
    },
    {
      id: 'data-in-motion',
      title: 'Data in Motion',
      description: 'See how data actually moves through the layers — from encapsulation and headers to real-world scenarios like visiting a website.',
      difficulty: 'beginner-int',
      icon: 'activity',
      lessons: [
        {
          id: 'flow-and-encap',
          title: 'Data Flow & Encapsulation',
          description: 'Watch data travel through all 7 layers and understand how each layer wraps the data with its own header.',
          steps: [
            { title: 'Data Flow Simulator', type: 'explore', route: '/simulator', trackType: null, trackId: null },
            { title: 'Encapsulation Visualizer', type: 'explore', route: '/encapsulation', trackType: null, trackId: null }
          ]
        },
        {
          id: 'first-scenarios',
          title: 'Your First Scenarios',
          description: 'Walk through two real-world networking scenarios to see the full stack in action.',
          steps: [
            { title: 'Scenario: Visit a Website', type: 'scenario', route: '/scenarios', trackType: 'scenario', trackId: 'visit-website' },
            { title: 'Scenario: Ping a Server', type: 'scenario', route: '/scenarios', trackType: 'scenario', trackId: 'ping-server' }
          ]
        }
      ]
    },
    {
      id: 'core-protocols',
      title: 'Core Protocols',
      description: 'Dive deep into the most important protocols at the Network, Transport, and Application layers.',
      difficulty: 'intermediate',
      icon: 'file-text',
      lessons: [
        {
          id: 'network-protocols',
          title: 'Network Layer Protocols',
          description: 'Master IP addressing, ICMP for diagnostics, and ARP for address resolution.',
          steps: [
            { title: 'Internet Protocol (IP)', type: 'explore', route: '/protocol/ip', trackType: 'protocol', trackId: 'ip' },
            { title: 'IPv6', type: 'explore', route: '/protocol/ipv6', trackType: 'protocol', trackId: 'ipv6' },
            { title: 'ICMP', type: 'explore', route: '/protocol/icmp', trackType: 'protocol', trackId: 'icmp' },
            { title: 'ARP', type: 'explore', route: '/protocol/arp', trackType: 'protocol', trackId: 'arp' },
            { title: 'Network Layer Quiz', type: 'quiz', route: '/quiz/layer3', trackType: 'quiz', trackId: 'layer3' }
          ]
        },
        {
          id: 'transport-protocols',
          title: 'Transport Layer Protocols',
          description: 'Understand TCP\'s reliability and UDP\'s speed — the two workhorses of data delivery.',
          steps: [
            { title: 'TCP', type: 'explore', route: '/protocol/tcp', trackType: 'protocol', trackId: 'tcp' },
            { title: 'UDP', type: 'explore', route: '/protocol/udp', trackType: 'protocol', trackId: 'udp' },
            { title: 'Transport Layer Quiz', type: 'quiz', route: '/quiz/layer4', trackType: 'quiz', trackId: 'layer4' }
          ]
        },
        {
          id: 'app-protocols',
          title: 'Application Layer Protocols',
          description: 'Explore HTTP, DNS, and DHCP — the protocols you interact with every day.',
          steps: [
            { title: 'HTTP & HTTPS', type: 'explore', route: '/protocol/http', trackType: 'protocol', trackId: 'http' },
            { title: 'HTTPS (TLS)', type: 'explore', route: '/protocol/https', trackType: 'protocol', trackId: 'https' },
            { title: 'DNS', type: 'explore', route: '/protocol/dns', trackType: 'protocol', trackId: 'dns' },
            { title: 'DHCP', type: 'explore', route: '/protocol/dhcp', trackType: 'protocol', trackId: 'dhcp' },
            { title: 'Application Layer Quiz', type: 'quiz', route: '/quiz/layer7', trackType: 'quiz', trackId: 'layer7' }
          ]
        }
      ]
    },
    {
      id: 'deep-dives',
      title: 'Deep Dives',
      description: 'Go beyond the basics — email & file transfer protocols, Layer 2 switching, security, and wireless networking.',
      difficulty: 'advanced',
      icon: 'package',
      lessons: [
        {
          id: 'email-file-transfer',
          title: 'Email & File Transfer',
          description: 'Learn how email is sent, received, and stored, plus how files move across networks.',
          steps: [
            { title: 'SMTP', type: 'explore', route: '/protocol/smtp', trackType: 'protocol', trackId: 'smtp' },
            { title: 'POP3', type: 'explore', route: '/protocol/pop3', trackType: 'protocol', trackId: 'pop3' },
            { title: 'IMAP', type: 'explore', route: '/protocol/imap', trackType: 'protocol', trackId: 'imap' },
            { title: 'FTP', type: 'explore', route: '/protocol/ftp', trackType: 'protocol', trackId: 'ftp' },
            { title: 'Scenario: Send an Email', type: 'scenario', route: '/scenarios', trackType: 'scenario', trackId: 'send-email' },
            { title: 'Scenario: FTP File Transfer', type: 'scenario', route: '/scenarios', trackType: 'scenario', trackId: 'ftp-transfer' }
          ]
        },
        {
          id: 'layer2-deep-dive',
          title: 'Data Link Layer Deep Dive',
          description: 'Explore Ethernet, Spanning Tree Protocol, and understand Layer 2 switching.',
          steps: [
            { title: 'Ethernet', type: 'explore', route: '/protocol/ethernet', trackType: 'protocol', trackId: 'ethernet' },
            { title: 'Spanning Tree Protocol', type: 'explore', route: '/protocol/stp', trackType: 'protocol', trackId: 'stp' },
            { title: 'Data Link Layer Quiz', type: 'quiz', route: '/quiz/layer2', trackType: 'quiz', trackId: 'layer2' }
          ]
        },
        {
          id: 'security-wireless',
          title: 'Security & Wireless',
          description: 'Understand TLS encryption, SSH remote access, Wi-Fi standards, and more.',
          steps: [
            { title: 'SSL/TLS', type: 'explore', route: '/protocol/ssl-tls', trackType: 'protocol', trackId: 'ssl-tls' },
            { title: 'SSH', type: 'explore', route: '/protocol/ssh', trackType: 'protocol', trackId: 'ssh' },
            { title: 'Wi-Fi', type: 'explore', route: '/protocol/wifi', trackType: 'protocol', trackId: 'wifi' },
            { title: 'Session Layer Quiz', type: 'quiz', route: '/quiz/layer5', trackType: 'quiz', trackId: 'layer5' },
            { title: 'Presentation Layer Quiz', type: 'quiz', route: '/quiz/layer6', trackType: 'quiz', trackId: 'layer6' }
          ]
        }
      ]
    },
    {
      id: 'mastery',
      title: 'Mastery',
      description: 'Cover remaining protocols and scenarios, then prove your knowledge with the comprehensive final assessment.',
      difficulty: 'assessment',
      icon: 'check-circle',
      lessons: [
        {
          id: 'remaining-topics',
          title: 'Remaining Protocols & Scenarios',
          description: 'Explore the remaining protocols and complete the final scenario challenges.',
          steps: [
            { title: 'SNMP', type: 'explore', route: '/protocol/snmp', trackType: 'protocol', trackId: 'snmp' },
            { title: 'Telnet', type: 'explore', route: '/protocol/telnet', trackType: 'protocol', trackId: 'telnet' },
            { title: 'MIME', type: 'explore', route: '/protocol/mime', trackType: 'protocol', trackId: 'mime' },
            { title: 'NetBIOS', type: 'explore', route: '/protocol/netbios', trackType: 'protocol', trackId: 'netbios' },
            { title: 'RPC', type: 'explore', route: '/protocol/rpc', trackType: 'protocol', trackId: 'rpc' },
            { title: 'Routing: OSPF, BGP, RIP', type: 'explore', route: '/protocol/ospf', trackType: 'protocol', trackId: 'ospf' },
            { title: 'Scenario: Video Streaming', type: 'scenario', route: '/scenarios', trackType: 'scenario', trackId: 'video-stream' }
          ]
        },
        {
          id: 'final-assessment',
          title: 'Final Assessment',
          description: 'Take the comprehensive quiz covering all layers and protocols. Good luck!',
          steps: [
            { title: 'Comprehensive Final Quiz', type: 'quiz', route: '/quiz/comprehensive', trackType: 'quiz', trackId: 'comprehensive' }
          ]
        }
      ]
    }
  ]
};
