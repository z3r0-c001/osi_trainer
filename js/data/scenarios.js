// Real-world scenarios demonstrating data traversal through the OSI model
export const scenarios = [
  // ── 1. Visiting a Website ──────────────────────────────────────────────
  {
    id: 'visit-website',
    title: 'What Happens When You Visit google.com',
    description:
      'Trace the full journey from typing a URL in your browser to seeing a rendered web page, covering DNS resolution, TCP handshakes, HTTP requests, and the return trip back up the OSI stack.',
    icon: 'globe',
    steps: [
      // ---- Sending: Application layer initiates ----
      {
        layer: 7,
        layerName: 'Application',
        title: 'URL Entry & DNS Query',
        description:
          'You type "google.com" into your browser. The browser first checks its local cache for the IP address. If not found, it constructs a DNS query to resolve the domain name into an IP address. This query is an application-layer request using the DNS protocol on port 53.',
        protocols: ['dns'],
        details: [
          'Browser checks local DNS cache, then OS resolver cache',
          'If no cache hit, a recursive DNS query is sent to the configured DNS server',
          'The DNS response maps google.com to an IP address such as 142.250.80.46',
          'Browser now knows the destination IP and can begin connecting'
        ],
        direction: 'down'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'TCP Three-Way Handshake',
        description:
          'Before any data can be sent, TCP establishes a reliable connection to port 443 (HTTPS) on the server via a three-way handshake: SYN, SYN-ACK, ACK. The browser selects an ephemeral source port, and both sides agree on initial sequence numbers, window sizes, and options like MSS and SACK.',
        protocols: ['tcp'],
        details: [
          'Client sends SYN with a random initial sequence number (ISN)',
          'Server responds with SYN-ACK, its own ISN, and acknowledges the client ISN+1',
          'Client completes with ACK; TCP connection is ESTABLISHED',
          'This connection must exist before TLS or HTTP can begin'
        ],
        direction: 'down'
      },
      {
        layer: 5,
        layerName: 'Session',
        title: 'TLS Handshake & Session Setup',
        description:
          'With the TCP connection established, a TLS handshake begins. The client sends a Client Hello with supported cipher suites, the server responds with its certificate and chosen cipher. A session is established with session IDs or tickets for resumption.',
        protocols: ['tls'],
        details: [
          'TLS Client Hello lists supported cipher suites and TLS version',
          'Server replies with Server Hello, certificate, and chosen cipher suite',
          'Key exchange establishes a shared symmetric key for encryption',
          'TLS session state is initialized with session ID and master secret'
        ],
        direction: 'down'
      },
      {
        layer: 6,
        layerName: 'Presentation',
        title: 'Data Formatting & Encryption',
        description:
          'The Presentation layer handles character encoding (UTF-8), data compression (gzip/brotli if negotiated), and encryption. Once the TLS session is active, the HTTP request will be encrypted into an opaque ciphertext block that only the server can decrypt.',
        protocols: ['tls'],
        details: [
          'HTTP payload is encoded as UTF-8 text',
          'TLS encrypts the plaintext HTTP request using the negotiated symmetric key',
          'Content-Encoding negotiation determines whether compression is applied'
        ],
        direction: 'down'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'HTTP Request Sent',
        description:
          'The browser sends an HTTP GET request for the root resource "/" through the encrypted TLS tunnel. The request includes headers such as Host, User-Agent, Accept, and Accept-Encoding. This encrypted data is then segmented by TCP at Layer 4 for transmission.',
        protocols: ['http', 'https'],
        details: [
          'HTTP method is GET, resource path is /',
          'Headers include Host: google.com, Accept: text/html, and caching directives',
          'The HTTP request is encrypted inside the TLS tunnel before reaching Layer 4',
          'TCP segments the encrypted data and assigns sequence numbers for reliable delivery'
        ],
        direction: 'down'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'IP Packet Creation',
        description:
          'The TCP segment is encapsulated in an IP packet. The source IP is your device address and the destination IP is the resolved server address. The TTL field is set, and the packet is prepared for routing across potentially many networks.',
        protocols: ['ipv4', 'ipv6'],
        details: [
          'IP header includes source IP (e.g. 192.168.1.100) and destination IP (142.250.80.46)',
          'TTL is set to a default value (typically 64 or 128) to prevent infinite routing loops',
          'If the packet exceeds the path MTU, fragmentation may occur',
          'The router examines the destination IP to determine the next hop'
        ],
        direction: 'down'
      },
      {
        layer: 2,
        layerName: 'Data Link',
        title: 'Frame Encapsulation',
        description:
          'The IP packet is wrapped in an Ethernet frame. The source MAC address is your NIC and the destination MAC address is your default gateway (router). ARP may be used to resolve the gateway IP to its MAC address if not already cached.',
        protocols: ['ethernet', 'arp'],
        details: [
          'ARP request resolves the gateway IP to a MAC address if not in cache',
          'Ethernet frame header includes source and destination MAC addresses',
          'An FCS (Frame Check Sequence) is appended for error detection',
          'Frame type field indicates the payload is an IPv4 or IPv6 packet'
        ],
        direction: 'down'
      },
      {
        layer: 1,
        layerName: 'Physical',
        title: 'Bit Transmission',
        description:
          'The Ethernet frame is converted into electrical signals (copper), light pulses (fiber), or radio waves (Wi-Fi) and transmitted onto the physical medium. The bits travel through cables, switches, and routers toward the destination server, potentially crossing multiple autonomous systems.',
        protocols: ['ethernet', 'wifi'],
        details: [
          'NIC converts the frame into the appropriate signal for the medium',
          'Signals travel through patch cables, wall jacks, switches, and uplinks',
          'Routers at each hop decapsulate to Layer 3, make forwarding decisions, and re-encapsulate'
        ],
        direction: 'across'
      },
      // ---- Receiving: server processes and responds ----
      {
        layer: 1,
        layerName: 'Physical',
        title: 'Signal Reception at Server',
        description:
          'The server NIC receives the electrical or optical signals and converts them back into a stream of bits. Clock recovery and signal decoding reconstruct the original bitstream from the physical medium.',
        protocols: ['ethernet'],
        details: [
          'Server NIC detects the preamble and synchronizes its clock',
          'Analog signals are decoded back into a digital bitstream',
          'The NIC verifies signal integrity before passing data up the stack'
        ],
        direction: 'up'
      },
      {
        layer: 2,
        layerName: 'Data Link',
        title: 'Frame Validation',
        description:
          'The server checks the Ethernet frame: the destination MAC address matches its NIC, and the FCS confirms no bit errors occurred during transmission. The Ethernet header is stripped, and the IP packet is extracted.',
        protocols: ['ethernet'],
        details: [
          'Destination MAC is verified against the server NIC address',
          'FCS is recalculated and compared to detect any transmission errors',
          'Ethernet header and trailer are removed, exposing the IP packet'
        ],
        direction: 'up'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'IP Processing',
        description:
          'The server verifies the destination IP matches one of its interfaces. It checks the header checksum, decrements TTL, and reassembles fragments if any. The IP header is stripped and the TCP segment is passed to the transport layer.',
        protocols: ['ipv4', 'ipv6'],
        details: [
          'Destination IP is confirmed as belonging to this server',
          'Header checksum is validated for integrity',
          'If fragments were received, they are reassembled into the full datagram'
        ],
        direction: 'up'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'TCP Segment Processing',
        description:
          'TCP on the server matches the segment to the correct socket using the destination port (443) and source port. It acknowledges received data, checks sequence numbers for ordering, and reassembles the byte stream for the application.',
        protocols: ['tcp'],
        details: [
          'Segment is demultiplexed to the listening socket on port 443',
          'Sequence numbers ensure data is delivered in order',
          'An ACK is sent back to the client confirming receipt',
          'TCP sliding window adjusts to manage flow control'
        ],
        direction: 'up'
      },
      {
        layer: 5,
        layerName: 'Session',
        title: 'Session & TLS Decryption',
        description:
          'The TLS session state is used to decrypt the incoming data. The server uses its private key (during the initial handshake) and the shared symmetric key (for application data) to recover the plaintext HTTP request.',
        protocols: ['tls'],
        details: [
          'TLS record layer decrypts the ciphertext using the session symmetric key',
          'Message authentication code (MAC) is verified to ensure integrity',
          'The plaintext HTTP request is now available to the web server application'
        ],
        direction: 'up'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'HTTP Response & Rendering',
        description:
          'The web server processes the HTTP GET request, generates an HTML response (status 200 OK), and sends it back down through all seven layers. The browser receives the response, parses the HTML, fetches additional resources (CSS, JS, images), and renders the page.',
        protocols: ['http', 'https'],
        details: [
          'Server returns HTTP 200 OK with Content-Type: text/html',
          'Response headers include caching directives, content length, and encoding',
          'The response travels back down layers 7-1 on the server, across the network, and up layers 1-7 on the client',
          'Browser parses HTML, triggers additional requests for linked resources, and renders the DOM'
        ],
        direction: 'up'
      }
    ]
  },

  // ── 2. Sending an Email ────────────────────────────────────────────────
  {
    id: 'send-email',
    title: 'Sending an Email from Compose to Inbox',
    description:
      'Follow an email from the moment you hit Send, through SMTP relay servers, DNS MX lookups, and final delivery via IMAP or POP3 to the recipient\'s mailbox.',
    icon: 'mail',
    steps: [
      {
        layer: 7,
        layerName: 'Application',
        title: 'Composing & Sending',
        description:
          'You compose an email in your mail client (e.g. Gmail, Outlook) and click Send. The client formats the message with headers (From, To, Subject, Date) and a MIME-encoded body, then initiates an SMTP connection to the outgoing mail server on port 587.',
        protocols: ['smtp'],
        details: [
          'Email headers are constructed: From, To, Subject, Date, Message-ID',
          'Attachments are Base64-encoded and wrapped in MIME multipart boundaries',
          'SMTP EHLO command is sent to greet the outgoing mail server',
          'STARTTLS is negotiated to upgrade the connection to encrypted'
        ],
        direction: 'down'
      },
      {
        layer: 6,
        layerName: 'Presentation',
        title: 'MIME Encoding & Encryption',
        description:
          'The email body and attachments are encoded using MIME standards. Character sets are specified (UTF-8), binary attachments are Base64-encoded, and TLS encrypts the entire SMTP conversation to protect the message in transit.',
        protocols: ['tls'],
        details: [
          'Content-Type headers specify text/plain, text/html, or multipart/mixed',
          'Binary attachments are converted to ASCII-safe Base64 representation',
          'TLS encrypts the SMTP dialogue so credentials and message content are protected'
        ],
        direction: 'down'
      },
      {
        layer: 5,
        layerName: 'Session',
        title: 'SMTP Session Management',
        description:
          'An SMTP session is established with the outgoing mail server. The session follows a strict command-response dialogue: EHLO, AUTH, MAIL FROM, RCPT TO, DATA, and QUIT. Each command must receive a positive reply before the next is sent.',
        protocols: ['smtp', 'tls'],
        details: [
          'SMTP session begins with EHLO and server capability advertisement',
          'Authentication is performed via AUTH LOGIN or AUTH PLAIN',
          'MAIL FROM and RCPT TO commands specify the envelope sender and recipient'
        ],
        direction: 'down'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'TCP Connection to Mail Server',
        description:
          'A TCP connection is established to the outgoing mail server on port 587 (submission) or 465 (SMTPS). TCP ensures the entire email conversation is delivered reliably and in order, retransmitting any lost segments.',
        protocols: ['tcp'],
        details: [
          'Three-way handshake establishes TCP connection to port 587',
          'TCP segments carry SMTP commands and email data reliably',
          'Flow control prevents the client from overwhelming the server'
        ],
        direction: 'down'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'DNS MX Lookup',
        description:
          'The outgoing mail server performs a DNS MX (Mail Exchanger) lookup to find the recipient\'s mail server. DNS is an application-layer protocol (port 53) that returns the mail exchange server hostname and its IP address for the recipient\'s domain.',
        protocols: ['dns'],
        details: [
          'DNS MX query returns the mail exchange server for the recipient domain (e.g., mx.gmail.com)',
          'A follow-up DNS A/AAAA query resolves the MX hostname to an IP address',
          'The mail server now knows where to deliver the message via SMTP'
        ],
        direction: 'down'
      },
      {
        layer: 2,
        layerName: 'Data Link',
        title: 'Frame Encapsulation',
        description:
          'IP packets are encapsulated in Ethernet frames with source and destination MAC addresses. At each hop, the frame is stripped, the routing decision is made at Layer 3, and a new frame is created for the next link segment.',
        protocols: ['ethernet', 'arp'],
        details: [
          'ARP resolves the next-hop IP to a MAC address at each link',
          'Ethernet frames carry the IP packets between directly connected devices',
          'FCS ensures no bit errors occurred on each link segment'
        ],
        direction: 'down'
      },
      {
        layer: 1,
        layerName: 'Physical',
        title: 'Physical Transmission',
        description:
          'Frames are converted to electrical, optical, or radio signals and transmitted across physical media. The email data may traverse local Ethernet, fiber backbone links, undersea cables, and data center interconnects before reaching the recipient\'s mail server.',
        protocols: ['ethernet', 'wifi'],
        details: [
          'Data is converted to signals appropriate for each physical medium',
          'Signals traverse LAN switches, ISP routers, and backbone infrastructure'
        ],
        direction: 'across'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'Arrival at Recipient Mail Server',
        description:
          'The IP packets arrive at the recipient\'s MX server. The server verifies the destination IP, reassembles any fragmented packets, and passes the TCP segments up to the transport layer.',
        protocols: ['ipv4', 'ipv6'],
        details: [
          'Recipient MX server confirms the destination IP matches its interface',
          'Fragmented packets are reassembled into complete datagrams',
          'IP header is stripped and the payload is handed to TCP'
        ],
        direction: 'up'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'TCP Delivery to Mail Service',
        description:
          'TCP on the receiving server reassembles the byte stream, verifies sequence numbers, and delivers the SMTP data to the mail server process listening on port 25. Acknowledgments are sent back to the sending server.',
        protocols: ['tcp'],
        details: [
          'Segments are reordered by sequence number if they arrived out of order',
          'ACKs confirm successful receipt to the sending mail server',
          'The complete SMTP conversation is delivered to the mail daemon'
        ],
        direction: 'up'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'Server-Side SMTP Processing',
        description:
          'The recipient mail server receives the email via SMTP, performs spam filtering and virus scanning, validates SPF/DKIM/DMARC records, and stores the message in the recipient\'s mailbox on disk.',
        protocols: ['smtp', 'dns'],
        details: [
          'SMTP server accepts the message with a 250 OK response',
          'Spam filters and antivirus scanners inspect the message content',
          'SPF, DKIM, and DMARC are checked against DNS records for authentication',
          'The email is stored in the recipient mailbox (Maildir or database)'
        ],
        direction: 'up'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'Recipient Retrieval via IMAP',
        description:
          'The recipient opens their mail client, which connects to the mail server via IMAP (port 993 with TLS) or POP3 (port 995 with TLS). The client synchronizes the mailbox, downloads new message headers and bodies, and displays the email.',
        protocols: ['imap', 'pop3', 'tls'],
        details: [
          'IMAP FETCH command retrieves message headers and body from the server',
          'IMAP keeps messages on the server, allowing access from multiple devices',
          'POP3 alternatively downloads and optionally deletes messages from the server',
          'The mail client renders HTML content and displays attachments'
        ],
        direction: 'up'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'TCP Session for Retrieval',
        description:
          'A separate TCP connection is established between the recipient\'s mail client and the mail server for the IMAP/POP3 session. This ensures the mailbox synchronization data is delivered reliably.',
        protocols: ['tcp', 'tls'],
        details: [
          'TCP handshake connects the mail client to port 993 (IMAPS) or 995 (POP3S)',
          'TLS secures the retrieval session end-to-end',
          'TCP guarantees all mailbox data is delivered completely and in order'
        ],
        direction: 'down'
      }
    ]
  },

  // ── 3. File Transfer via FTP ───────────────────────────────────────────
  {
    id: 'ftp-transfer',
    title: 'Transferring a File via FTP',
    description:
      'Follow a file upload from FTP client authentication through the dual-channel architecture of control and data connections, all the way down to bits on the wire and back.',
    icon: 'file',
    steps: [
      {
        layer: 7,
        layerName: 'Application',
        title: 'FTP Connection & Authentication',
        description:
          'The FTP client connects to the server on port 21 (control channel) and authenticates with a username and password. The server responds with status codes indicating successful login. The user then issues commands like LIST, RETR, or STOR.',
        protocols: ['ftp'],
        details: [
          'Client sends USER and PASS commands for authentication',
          'Server responds with 230 (Login successful) or 530 (Login failed)',
          'Control channel remains open for commands throughout the session',
          'PASV or PORT command negotiates how the data channel will be established'
        ],
        direction: 'down'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'File Transfer Command (STOR)',
        description:
          'The client issues a STOR command on the control channel to upload a file. The server opens a data connection (passive or active mode) on a separate port. The file contents are streamed over this second channel while the control channel monitors progress.',
        protocols: ['ftp'],
        details: [
          'PASV mode: server listens on a random high port and tells the client where to connect',
          'Active mode: client listens and the server connects back (often blocked by firewalls)',
          'STOR filename.txt tells the server to expect incoming file data',
          'Binary (TYPE I) or ASCII (TYPE A) transfer mode is set before sending'
        ],
        direction: 'down'
      },
      {
        layer: 6,
        layerName: 'Presentation',
        title: 'Data Representation',
        description:
          'The Presentation layer handles the transfer mode encoding. In ASCII mode, line endings are converted between platforms (CRLF vs. LF). In binary mode, the file is sent as raw bytes with no transformation, preserving exact file contents.',
        protocols: ['ftp'],
        details: [
          'ASCII mode converts line endings for cross-platform text compatibility',
          'Binary mode transmits files byte-for-byte with no modification',
          'Character encoding mismatches can corrupt text files if the wrong mode is used'
        ],
        direction: 'down'
      },
      {
        layer: 5,
        layerName: 'Session',
        title: 'Dual-Channel Session Management',
        description:
          'FTP uniquely uses two simultaneous sessions: a persistent control connection for commands and responses, and a transient data connection for file content. The session layer coordinates these parallel channels and manages connection state.',
        protocols: ['ftp'],
        details: [
          'Control connection (port 21) stays open for the entire FTP session',
          'Data connection is established on demand and closed after each transfer',
          'Session state tracks current directory, transfer mode, and authentication status'
        ],
        direction: 'down'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'TCP Connections for Control & Data',
        description:
          'Two separate TCP connections are used: one to port 21 for control commands and another on a negotiated port for data transfer. TCP ensures the file data is delivered completely and in the correct order, retransmitting any lost segments.',
        protocols: ['tcp'],
        details: [
          'Control connection: TCP handshake to server port 21',
          'Data connection: TCP handshake to the port specified in PASV response',
          'TCP sliding window and congestion control optimize throughput for large files',
          'Segment checksums detect any corruption introduced during transit'
        ],
        direction: 'down'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'IP Routing to FTP Server',
        description:
          'TCP segments are encapsulated in IP packets with source and destination addresses. Routers along the path forward each packet toward the FTP server, making independent routing decisions at each hop based on the destination IP.',
        protocols: ['ipv4', 'ipv6'],
        details: [
          'Each IP packet carries a portion of the file data inside a TCP segment',
          'Routers consult their routing tables to determine the next hop',
          'TTL prevents packets from circulating indefinitely if a routing loop exists'
        ],
        direction: 'down'
      },
      {
        layer: 2,
        layerName: 'Data Link',
        title: 'Frame Construction',
        description:
          'IP packets are placed inside Ethernet frames for transmission on each network segment. At every router hop, the Ethernet frame is discarded and a new one is built with updated MAC addresses for the next link.',
        protocols: ['ethernet', 'arp'],
        details: [
          'Source MAC is the sending interface; destination MAC is the next-hop router or server',
          'ARP resolves IP addresses to MAC addresses on each local segment',
          'FCS provides hop-by-hop error detection for each frame'
        ],
        direction: 'down'
      },
      {
        layer: 1,
        layerName: 'Physical',
        title: 'Bit-Level Transmission',
        description:
          'Ethernet frames are encoded into electrical signals on copper, light pulses on fiber, or radio waves on wireless links. The file data physically traverses network infrastructure: switches, routers, and backbone links connecting the client to the server.',
        protocols: ['ethernet', 'wifi'],
        details: [
          'Encoding schemes like Manchester or 8b/10b convert bits to physical signals',
          'Repeaters and amplifiers boost signals over long distances'
        ],
        direction: 'across'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'Server TCP Receives File Data',
        description:
          'The FTP server\'s TCP stack receives segments on the data connection port, reorders them by sequence number, and delivers the complete byte stream to the FTP server application. Acknowledgments flow back to the client to confirm receipt.',
        protocols: ['tcp'],
        details: [
          'TCP reassembles the file data from potentially out-of-order segments',
          'Cumulative ACKs confirm how much data has been successfully received',
          'Receive buffer manages incoming data until the application reads it'
        ],
        direction: 'up'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'File Written to Server',
        description:
          'The FTP server application writes the received byte stream to the destination file on the server filesystem. Once the data connection closes, the server sends a "226 Transfer complete" response on the control channel to confirm success.',
        protocols: ['ftp'],
        details: [
          'Server writes incoming bytes to the specified filename on disk',
          'Data connection is closed by the sender after all bytes are transmitted',
          'Server sends 226 Transfer complete on the control channel',
          'Client can verify the transfer with a SIZE command or directory listing'
        ],
        direction: 'up'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'Session Termination',
        description:
          'The user issues a QUIT command to close the FTP session. The server responds with 221 (Goodbye) and the control connection is gracefully closed. Both TCP connections complete their four-way teardown (FIN-ACK sequence).',
        protocols: ['ftp'],
        details: [
          'QUIT command signals the client is done with the session',
          'Server responds with 221 Service closing control connection',
          'TCP FIN-ACK sequence gracefully closes both control and data connections'
        ],
        direction: 'up'
      }
    ]
  },

  // ── 4. Video Streaming ─────────────────────────────────────────────────
  {
    id: 'video-stream',
    title: 'Streaming a Video on YouTube',
    description:
      'See how adaptive bitrate streaming works: from DNS resolution and TLS-secured HTTP connections to chunked video delivery, buffering, and real-time playback using modern streaming protocols.',
    icon: 'video',
    steps: [
      {
        layer: 7,
        layerName: 'Application',
        title: 'DNS Resolution & Page Load',
        description:
          'You click a video link on YouTube. The browser resolves the domain via DNS, likely hitting a CDN (Content Delivery Network) node geographically close to you. The page HTML and JavaScript player are loaded first over HTTPS.',
        protocols: ['dns', 'https'],
        details: [
          'DNS resolves youtube.com to the nearest CDN edge server IP',
          'CDN selection is based on geographic proximity and server load',
          'The HTML page and JavaScript video player are fetched via HTTPS',
          'The player initializes and requests the video manifest file'
        ],
        direction: 'down'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'Manifest & Adaptive Streaming',
        description:
          'The video player downloads a manifest file (DASH MPD or HLS M3U8 playlist) that lists available quality levels, codecs, and chunk URLs. The adaptive bitrate algorithm selects an initial quality based on estimated bandwidth and begins requesting video segments.',
        protocols: ['https', 'http'],
        details: [
          'DASH (Dynamic Adaptive Streaming over HTTP) or HLS manifest is fetched',
          'Manifest lists multiple bitrate tiers: 360p, 720p, 1080p, 4K',
          'Each tier provides URLs for sequential video and audio chunks (2-10 seconds each)',
          'ABR algorithm starts conservatively and ramps up quality as bandwidth is measured'
        ],
        direction: 'down'
      },
      {
        layer: 6,
        layerName: 'Presentation',
        title: 'Video Codec & Encryption',
        description:
          'Video segments are encoded with codecs like H.264, VP9, or AV1, and audio with AAC or Opus. For DRM-protected content, Widevine or FairPlay decryption is applied. TLS encrypts all data in transit between the CDN and the browser.',
        protocols: ['tls'],
        details: [
          'Video codecs compress raw frames into efficient bitstreams (H.264, VP9, AV1)',
          'Audio is separately encoded (AAC, Opus) and muxed with video during playback',
          'DRM systems decrypt protected content using license keys fetched from a license server',
          'TLS ensures all segment data is encrypted during transit'
        ],
        direction: 'down'
      },
      {
        layer: 5,
        layerName: 'Session',
        title: 'Persistent HTTP Sessions',
        description:
          'The player maintains persistent HTTP/2 or HTTP/3 connections to the CDN edge server. These sessions multiplex many chunk requests over a single connection, reducing latency. Session keepalive ensures the connection stays open during the entire viewing session.',
        protocols: ['https', 'tls'],
        details: [
          'HTTP/2 multiplexes multiple video chunk requests over one TCP connection',
          'HTTP/3 (QUIC) eliminates head-of-line blocking with independent streams',
          'TLS session resumption avoids full handshakes when reconnecting to the CDN'
        ],
        direction: 'down'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'TCP/QUIC Segment Delivery',
        description:
          'Video chunks are delivered over TCP (HTTP/2) or QUIC/UDP (HTTP/3). TCP ensures reliable, ordered delivery but can suffer head-of-line blocking. QUIC multiplexes independent streams over UDP, so a lost packet in one stream does not stall others.',
        protocols: ['tcp', 'udp', 'quic'],
        details: [
          'TCP provides reliable delivery but head-of-line blocking can cause stalls',
          'QUIC runs over UDP and provides per-stream flow control',
          'Congestion control algorithms (BBR, CUBIC) optimize throughput',
          'Each video chunk is typically 1-10 MB and spans many transport segments'
        ],
        direction: 'down'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'CDN Routing & IP Delivery',
        description:
          'IP packets are routed from the CDN edge server to your device. Anycast routing may direct traffic to the nearest CDN node. The packets traverse the ISP network and potentially multiple peering points before reaching your local network.',
        protocols: ['ipv4', 'ipv6'],
        details: [
          'CDN uses anycast or DNS-based routing to select the closest edge node',
          'IP packets traverse ISP networks, IXPs (Internet Exchange Points), and peering links',
          'Low-latency paths are preferred to minimize buffering'
        ],
        direction: 'down'
      },
      {
        layer: 2,
        layerName: 'Data Link',
        title: 'Frame Delivery on Local Network',
        description:
          'On your local network, IP packets are encapsulated in Ethernet or Wi-Fi frames. Your home router receives frames from the ISP uplink, performs NAT translation, and forwards them to your device using its local MAC address.',
        protocols: ['ethernet', 'wifi', 'arp'],
        details: [
          'Home router performs NAT, mapping the public IP to your device private IP',
          'Wi-Fi frames use CSMA/CA to avoid collisions on the shared wireless medium',
          'Ethernet switches forward frames based on MAC address tables'
        ],
        direction: 'down'
      },
      {
        layer: 1,
        layerName: 'Physical',
        title: 'Signal Reception',
        description:
          'Your device receives the physical signals: radio waves from a Wi-Fi access point or electrical signals from an Ethernet cable. The NIC demodulates and decodes these signals back into digital bits representing video chunk data.',
        protocols: ['wifi', 'ethernet'],
        details: [
          'Wi-Fi NIC demodulates RF signals using OFDM modulation (802.11ac/ax)',
          'High-throughput modes (MU-MIMO, 160MHz channels) support video bandwidth needs',
          'Physical layer bit rate must exceed the video bitrate to prevent buffering'
        ],
        direction: 'up'
      },
      {
        layer: 4,
        layerName: 'Transport',
        title: 'Reassembly & Buffer Fill',
        description:
          'TCP or QUIC on your device reassembles the incoming segments into complete video chunks. The data is delivered to the browser which fills a playback buffer. The buffer typically maintains 10-30 seconds of video ahead of the current playback position.',
        protocols: ['tcp', 'udp', 'quic'],
        details: [
          'Transport layer reassembles segments into complete HTTP responses (video chunks)',
          'Out-of-order segments are reordered before delivery to the application',
          'The playback buffer absorbs network jitter and short interruptions'
        ],
        direction: 'up'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'Decoding & Playback',
        description:
          'The video player decodes each chunk using hardware or software decoders, composites video frames and audio samples, and renders them to the screen and speakers in real time. The ABR algorithm continuously monitors throughput and adjusts quality up or down.',
        protocols: ['https'],
        details: [
          'Hardware decoder (GPU) efficiently decodes H.264/VP9/AV1 video frames',
          'Audio and video streams are synchronized using presentation timestamps (PTS)',
          'ABR algorithm switches quality tiers based on measured download speed and buffer level',
          'Player pre-fetches upcoming chunks to maintain smooth playback'
        ],
        direction: 'up'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'Continuous Adaptation',
        description:
          'Throughout playback, the player continuously adapts. If bandwidth drops, it switches to a lower quality tier. If the user seeks to a new position, the buffer is flushed and new chunks are requested. Analytics data is sent back to YouTube for quality-of-experience monitoring.',
        protocols: ['https'],
        details: [
          'Quality switches happen seamlessly at chunk boundaries',
          'Seek operations cancel pending requests and fetch new chunks from the seek position',
          'Telemetry reports buffer health, rebuffering events, and chosen bitrate to analytics servers'
        ],
        direction: 'down'
      }
    ]
  },

  // ── 5. Pinging a Server ────────────────────────────────────────────────
  {
    id: 'ping-server',
    title: 'Pinging a Server with ICMP',
    description:
      'Trace the path of an ICMP Echo Request from your terminal through every OSI layer to the target server and back, revealing how the simplest network diagnostic tool works under the hood.',
    icon: 'chat',
    steps: [
      {
        layer: 7,
        layerName: 'Application',
        title: 'Ping Command Initiated',
        description:
          'You type "ping 8.8.8.8" in your terminal. The ping utility is an application-layer tool that constructs an ICMP Echo Request message with a unique identifier, sequence number, and optional payload data. Unlike most network tools, ping bypasses the transport layer entirely since ICMP is a Layer 3 (Network) protocol.',
        protocols: ['dns'],
        details: [
          'If a hostname is given instead of an IP, DNS resolution occurs first at Layer 7',
          'The ping utility prepares parameters for an ICMP Echo Request (type=8, code=0)',
          'A unique identifier and incrementing sequence number are included',
          'ICMP itself operates at Layer 3, not Layer 7 — the application just invokes it'
        ],
        direction: 'down'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'ICMP Encapsulated in IP',
        description:
          'The ICMP Echo Request is encapsulated directly inside an IP packet — there is no TCP or UDP header. The IP header specifies protocol number 1 (ICMP), sets the source IP as your device, and the destination IP as the target server (8.8.8.8). TTL is set to the OS default.',
        protocols: ['icmp', 'ipv4'],
        details: [
          'IP protocol field is set to 1, indicating ICMP payload',
          'Source IP is your device address; destination IP is 8.8.8.8',
          'TTL is set to the OS default (64 on Linux, 128 on Windows)',
          'No transport layer (TCP/UDP) is involved — ICMP sits directly on IP'
        ],
        direction: 'down'
      },
      {
        layer: 2,
        layerName: 'Data Link',
        title: 'Ethernet Frame for Gateway',
        description:
          'Since 8.8.8.8 is on a remote network, the IP packet must be sent to the default gateway. ARP is used to resolve the gateway IP to its MAC address. The ICMP packet is wrapped in an Ethernet frame destined for the router.',
        protocols: ['ethernet', 'arp'],
        details: [
          'Routing table lookup determines the packet must go to the default gateway',
          'ARP resolves the gateway IP (e.g. 192.168.1.1) to its MAC address',
          'Ethernet frame: source MAC = your NIC, destination MAC = gateway NIC',
          'EtherType field is set to 0x0800 (IPv4)'
        ],
        direction: 'down'
      },
      {
        layer: 1,
        layerName: 'Physical',
        title: 'Electrical/Optical Transmission',
        description:
          'The Ethernet frame is converted into physical signals and sent out through your network interface. The bits travel through cables to your switch, then to your router, which forwards the packet toward 8.8.8.8 via the ISP network.',
        protocols: ['ethernet', 'wifi'],
        details: [
          'NIC transmits the frame as electrical signals (copper) or radio waves (Wi-Fi)',
          'The frame traverses local switches to reach the default gateway router',
          'The router decapsulates the Ethernet frame, reads the IP destination, and re-encapsulates for the WAN interface'
        ],
        direction: 'across'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'Hop-by-Hop Routing',
        description:
          'The IP packet is forwarded hop by hop through multiple routers across the internet. At each hop, the router decrements the TTL by 1, consults its routing table, and forwards the packet toward the destination. If TTL reaches 0, the packet is dropped and an ICMP Time Exceeded message is sent back.',
        protocols: ['ipv4', 'icmp'],
        details: [
          'Each router decrements TTL and checks if it has reached 0',
          'Routing decisions use longest-prefix matching on the destination IP',
          'The packet may traverse 10-20 hops across multiple ISPs and backbone networks',
          'TTL expiration is what makes traceroute work — each hop reveals itself'
        ],
        direction: 'across'
      },
      {
        layer: 1,
        layerName: 'Physical',
        title: 'Arrival at Destination Server',
        description:
          'The final Ethernet (or other link-layer) frame arrives at the destination server\'s NIC. The physical signals are decoded back into bits, and the frame is passed up to the Data Link layer for validation.',
        protocols: ['ethernet'],
        details: [
          'Server NIC receives the physical signals and recovers the bitstream',
          'Preamble and SFD (Start Frame Delimiter) synchronize the receiver',
          'The frame is handed to the Data Link layer for processing'
        ],
        direction: 'up'
      },
      {
        layer: 2,
        layerName: 'Data Link',
        title: 'Frame Validation at Server',
        description:
          'The destination server validates the Ethernet frame: the destination MAC matches, and the FCS checksum confirms no errors. The Ethernet headers are stripped, revealing the IP packet inside.',
        protocols: ['ethernet'],
        details: [
          'Destination MAC address is verified against the server NIC',
          'FCS is checked to confirm frame integrity',
          'Ethernet header is removed and the IP packet is passed up'
        ],
        direction: 'up'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'ICMP Echo Request Processing',
        description:
          'The server IP stack receives the packet, verifies the destination IP, and identifies the payload as ICMP (protocol=1). The ICMP module reads the Echo Request (type=8) and immediately constructs an Echo Reply (type=0) with the same identifier, sequence number, and payload data.',
        protocols: ['icmp', 'ipv4'],
        details: [
          'IP layer confirms the destination IP matches this server',
          'ICMP type=8 (Echo Request) triggers the kernel to generate a reply',
          'Echo Reply (type=0) copies the identifier, sequence number, and payload from the request',
          'Source and destination IPs are swapped for the reply packet'
        ],
        direction: 'up'
      },
      {
        layer: 1,
        layerName: 'Physical',
        title: 'Reply Transmission',
        description:
          'The ICMP Echo Reply is encapsulated in a new IP packet, wrapped in an Ethernet frame, and transmitted back across the internet. It follows the reverse path (or a potentially different route) through routers back to your device.',
        protocols: ['ethernet', 'ipv4', 'icmp'],
        details: [
          'Reply packet is encapsulated and sent back through the network',
          'Return path may differ from the forward path due to asymmetric routing',
          'Each hop decrements the reply TTL as it routes back'
        ],
        direction: 'across'
      },
      {
        layer: 3,
        layerName: 'Network',
        title: 'Reply Arrives at Your Device',
        description:
          'Your device receives the ICMP Echo Reply. The IP layer verifies the packet is addressed to your IP. The ICMP module matches the reply to the original request using the identifier and sequence number, and calculates the round-trip time (RTT).',
        protocols: ['icmp', 'ipv4'],
        details: [
          'Destination IP matches your device — the packet is accepted',
          'ICMP identifier and sequence number match the outstanding request',
          'RTT is calculated: time of reply arrival minus time of request departure',
          'TTL in the reply reveals the server OS (64 = Linux, 128 = Windows, 255 = network device)'
        ],
        direction: 'up'
      },
      {
        layer: 7,
        layerName: 'Application',
        title: 'Results Displayed',
        description:
          'The ping utility displays the result: "64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.3 ms". It shows the payload size, source IP, sequence number, remaining TTL, and the round-trip time. This process repeats for each ping in the sequence.',
        protocols: ['icmp'],
        details: [
          'Output shows bytes received, source IP, sequence number, TTL, and RTT',
          'Subsequent pings increment the sequence number',
          'Statistics are accumulated: min/avg/max/stddev RTT and packet loss percentage',
          'Ctrl+C stops the ping and displays the final summary'
        ],
        direction: 'up'
      }
    ]
  }
];
