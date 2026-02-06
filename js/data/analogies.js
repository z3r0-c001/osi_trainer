export const analogies = [
  {
    layer: 1,
    layerName: 'Physical',
    mainAnalogy: {
      title: 'Roads, Trucks, and the Delivery Fleet',
      description:
        'The Physical layer is the raw transportation infrastructure of the postal system — the highways, delivery trucks, sorting conveyor belts, and even the fuel that powers them. Without roads and vehicles, no letter could ever move from one place to another, no matter how perfectly it was addressed. This layer doesn\'t care what\'s inside the packages; it only cares about physically moving things from point A to point B. Just as a pothole or a closed highway disrupts all mail delivery regardless of content, a damaged cable or faulty network card disrupts all network communication. The Physical layer converts data into actual signals — electrical pulses on copper wire, light pulses through fiber optics, or radio waves through the air — much like choosing whether mail travels by truck, airplane, or boat.',
      mapping: [
        { concept: 'Cables (Ethernet, fiber)', realWorld: 'Roads and highways connecting cities' },
        { concept: 'Network interface card (NIC)', realWorld: 'The loading dock where trucks pick up and deliver mail' },
        { concept: 'Electrical/optical signals', realWorld: 'The fuel and engine power that physically moves the trucks' },
        { concept: 'Hub or repeater', realWorld: 'A rest stop or fuel station that boosts a truck\'s ability to keep going' },
        { concept: 'Bit transmission (0s and 1s)', realWorld: 'Individual packages loaded one at a time onto the conveyor belt' },
        { concept: 'Bandwidth', realWorld: 'The number of lanes on the highway — more lanes means more trucks at once' }
      ]
    },
    alternativeAnalogies: [
      {
        title: 'The Restaurant Kitchen Utilities',
        description:
          'Think of the gas lines, electrical wiring, and water pipes that supply a restaurant kitchen. Without these raw utilities, no dish can be cooked — they are invisible to diners but absolutely essential.'
      },
      {
        title: 'Airport Runways and Taxiways',
        description:
          'The Physical layer is like the actual runway tarmac, taxiways, and terminal jet bridges at an airport. Planes need a solid surface to land on and a physical connection to the gate before passengers can do anything else.'
      },
      {
        title: 'The Building\'s Foundation and Wiring',
        description:
          'In an office building, this is the concrete foundation, the copper wiring in the walls, and the elevator shafts. No office work happens without a structurally sound building and working electrical infrastructure.'
      }
    ],
    memoryTip:
      'Physical = "Physical stuff you can touch." If you can stub your toe on it — cables, connectors, radio antennas — it belongs to Layer 1.'
  },
  {
    layer: 2,
    layerName: 'Data Link',
    mainAnalogy: {
      title: 'Your Local Mail Carrier and the Neighborhood Route',
      description:
        'The Data Link layer is your local postal carrier — the person who knows every house on the street and delivers mail directly within your neighborhood. They don\'t worry about how a letter got from across the country to the local post office; they only handle the final hop from the local sorting room to your specific mailbox. Each mailbox has a unique number on it, just like every network device has a unique MAC address. The carrier checks these numbers to make sure each letter reaches the correct house, and if two carriers accidentally try to deliver on the same street at the same time, they have rules to avoid collisions. This layer also detects if a letter got damaged during that last leg of delivery — a torn envelope or smeared address — and can request it be re-sent from the local office.',
      mapping: [
        { concept: 'MAC address', realWorld: 'The unique house number on each mailbox in the neighborhood' },
        { concept: 'Ethernet frame', realWorld: 'A letter bundled with a local delivery slip showing sender and receiver house numbers' },
        { concept: 'Switch', realWorld: 'The neighborhood post office that reads house numbers and sends carriers to the right doors' },
        { concept: 'Error detection (CRC)', realWorld: 'The carrier checking that the envelope isn\'t torn or the address isn\'t smeared before delivery' },
        { concept: 'Collision handling (CSMA/CD)', realWorld: 'Two carriers approaching the same mailbox — one waits politely for the other to finish' }
      ]
    },
    alternativeAnalogies: [
      {
        title: 'The Restaurant Host Seating Guests',
        description:
          'The host checks your reservation name (MAC address) and walks you directly to your specific table. They manage the flow at the entrance so two parties don\'t collide trying to sit at the same table simultaneously.'
      },
      {
        title: 'Airport Gate Agents',
        description:
          'Gate agents handle the direct, local connection between passengers and a specific aircraft. They check boarding passes (frame addresses) and manage the orderly flow of people down the jet bridge to prevent bottlenecks.'
      }
    ],
    memoryTip:
      'Data Link = "Direct Link." It handles direct, local delivery using physical (MAC) addresses — think of it as the last-mile carrier who knows your exact door.'
  },
  {
    layer: 3,
    layerName: 'Network',
    mainAnalogy: {
      title: 'The Address System and Sorting Facilities',
      description:
        'The Network layer is the entire addressing and routing infrastructure of the postal system — ZIP codes, city names, state abbreviations, and the massive regional sorting centers that decide which truck goes where. When you write "123 Main St, Springfield, IL 62704" on a letter, you are giving it a Layer 3 address (like an IP address) that allows sorting facilities across the country to relay it step by step toward its destination. Each sorting facility reads the destination address, consults its routing tables, and forwards the letter to the next facility closer to the target city. The letter might pass through three or four different sorting centers on its journey, each one making an independent decision about where to send it next. This is exactly how routers work — they examine the destination IP address and forward packets hop by hop across the internet.',
      mapping: [
        { concept: 'IP address', realWorld: 'The full mailing address (street, city, state, ZIP) written on the envelope' },
        { concept: 'Router', realWorld: 'A regional mail sorting facility that reads addresses and forwards letters toward the right city' },
        { concept: 'Routing table', realWorld: 'The sorting facility\'s master list of which truck routes go to which regions' },
        { concept: 'Packet', realWorld: 'An individual letter with a full destination and return address stamped on it' },
        { concept: 'TTL (Time to Live)', realWorld: 'A rule saying "if this letter passes through more than 30 sorting centers, throw it away — it\'s lost"' },
        { concept: 'Subnetting', realWorld: 'Dividing a large city into postal zones so each zone\'s mail is handled by a dedicated local office' }
      ]
    },
    alternativeAnalogies: [
      {
        title: 'The Restaurant Delivery App Routing',
        description:
          'When you order delivery, the app calculates the best route from the restaurant to your home, navigating through streets and intersections. Each intersection is a router making a forwarding decision about which road to take next.'
      },
      {
        title: 'Airport Flight Routing with Layovers',
        description:
          'Flying from New York to Tokyo might route you through Chicago and then Seoul. Each airport is a router — it reads your final destination on the boarding pass and puts you on the next connecting flight that gets you closer.'
      },
      {
        title: 'Office Building Floor Directory',
        description:
          'The lobby directory maps department names to floor numbers. When a visitor arrives, the directory tells them which floor (subnet) to go to, and the elevator (router) delivers them to the correct level.'
      }
    ],
    memoryTip:
      'Network = "Navigation." Layer 3 is the GPS of the network — it figures out the best path across multiple hops to get your data from source to destination using logical (IP) addresses.'
  },
  {
    layer: 4,
    layerName: 'Transport',
    mainAnalogy: {
      title: 'Delivery Service Guarantees — Certified vs. Standard Mail',
      description:
        'The Transport layer is the service level you choose at the post office counter. Do you want certified mail with tracking, delivery confirmation, and a signature on arrival (TCP)? Or is a cheap, fast postcard with no guarantees good enough (UDP)? Certified mail ensures your letter arrives intact and in order — if you send five pages of a contract, they arrive as pages 1 through 5, not jumbled or missing page 3. The post office tracks each piece, the recipient signs for it, and if something goes missing, it gets re-sent automatically. Standard mail, on the other hand, is faster and cheaper but comes with no promises — your postcard might arrive, might not, might arrive after one you sent later. The Transport layer also handles flow control: if you are flooding the recipient\'s tiny mailbox with 50 certified letters a day, this layer tells you to slow down.',
      mapping: [
        { concept: 'TCP (Transmission Control Protocol)', realWorld: 'Certified mail with tracking, delivery confirmation, and guaranteed order' },
        { concept: 'UDP (User Datagram Protocol)', realWorld: 'A postcard tossed in the mailbox — fast and cheap but no guarantees it arrives' },
        { concept: 'Port numbers', realWorld: 'Apartment numbers within a building — mail goes to 123 Main St, Apt 80 (port 80)' },
        { concept: 'Sequence numbers', realWorld: 'Numbering pages "1 of 5, 2 of 5..." so the recipient can reassemble them in order' },
        { concept: 'Flow control', realWorld: 'Asking the recipient "is your mailbox full?" before sending more letters' },
        { concept: 'Retransmission', realWorld: 'Re-sending a certified letter that the tracking system shows was lost in transit' }
      ]
    },
    alternativeAnalogies: [
      {
        title: 'Restaurant Order Accuracy',
        description:
          'TCP is like a sit-down restaurant where the waiter repeats your order back, confirms each dish as it\'s served, and replaces anything wrong. UDP is like a fast-food counter where they call your number and hope you grabbed the right bag.'
      },
      {
        title: 'Airport Baggage Handling',
        description:
          'The baggage system tags each suitcase (sequence number), tracks it through the system, and confirms it made it onto your flight. If a bag is lost, they trace and redeliver it — that\'s TCP. Carry-on luggage is UDP: you manage it yourself with no guarantees from the airline.'
      }
    ],
    memoryTip:
      'Transport = "Trust level." Layer 4 decides whether your data gets the VIP certified treatment (TCP) or the toss-it-and-hope approach (UDP). Remember: "TCP = Total Certainty Protocol, UDP = Unreliable but Darn fast Protocol."'
  },
  {
    layer: 5,
    layerName: 'Session',
    mainAnalogy: {
      title: 'The Phone Call — Dialing, Talking, and Hanging Up',
      description:
        'The Session layer manages the conversation itself — starting it, keeping it alive, pausing it, and ending it gracefully. Think of making a phone call: you dial the number (establish a session), the other person picks up and says hello (session established), you have a back-and-forth conversation (active session), you might put each other on hold for a moment (session pause and resume), and eventually one of you says goodbye and hangs up (session termination). If the call drops unexpectedly, this layer is responsible for recognizing that the conversation was interrupted and either reconnecting or cleaning up. In network terms, this is the layer that manages login sessions, keeps track of whose turn it is to talk in a half-duplex connection, and inserts checkpoints so a large file transfer can resume from where it left off rather than starting over after a disruption.',
      mapping: [
        { concept: 'Session establishment', realWorld: 'Dialing the phone number and hearing the other person say "hello"' },
        { concept: 'Session termination', realWorld: 'Saying "goodbye" and both parties hanging up the phone' },
        { concept: 'Session checkpointing', realWorld: 'Bookmarking your place in a long conversation so you can resume after a break' },
        { concept: 'Half-duplex communication', realWorld: 'A walkie-talkie conversation where only one person talks at a time, ending with "over"' },
        { concept: 'Full-duplex communication', realWorld: 'A normal phone call where both people can speak and listen simultaneously' }
      ]
    },
    alternativeAnalogies: [
      {
        title: 'Restaurant Reservation and Dining Session',
        description:
          'Making a reservation opens the session. Being seated activates it. Pausing between courses is like a session checkpoint. Asking for the check and leaving terminates the session gracefully.'
      },
      {
        title: 'Airport Check-In to Boarding',
        description:
          'Your travel session begins at check-in and ends when you deplane. If your flight is delayed, the session is suspended. If it\'s cancelled, the session terminates and you must establish a new one by rebooking.'
      },
      {
        title: 'Office Meeting Scheduling',
        description:
          'Booking a conference room opens the session, the meeting itself is the active session, and closing the meeting and releasing the room terminates it. If someone steps out for a call, the session is paused and resumed when they return.'
      }
    ],
    memoryTip:
      'Session = "Sustained conversation." Layer 5 is the manager who opens the meeting, keeps it on track, handles interruptions, and formally closes it. No session, no dialogue.'
  },
  {
    layer: 6,
    layerName: 'Presentation',
    mainAnalogy: {
      title: 'Translation, Packaging, and Gift Wrapping',
      description:
        'The Presentation layer is the translator and packager of the postal world. Imagine you write a letter in English to a friend in Japan — before it can be understood, someone must translate it into Japanese. That translation step is exactly what Layer 6 does: it converts data from one format to another so both sides can understand it. But this layer does more than translate — it also handles packaging and compression. Just as you might vacuum-seal a bulky sweater into a flat bag to save shipping space (compression), or place a valuable necklace in a locked security box before mailing it (encryption), the Presentation layer compresses data to save bandwidth and encrypts it for security. When the package arrives, this layer unpacks, decrypts, and converts everything back into a format the recipient can use.',
      mapping: [
        { concept: 'Data format conversion (e.g., EBCDIC to ASCII)', realWorld: 'Translating a letter from English to Japanese so the recipient can read it' },
        { concept: 'Encryption (SSL/TLS)', realWorld: 'Sealing a confidential document in a locked security box before mailing' },
        { concept: 'Compression (gzip, JPEG)', realWorld: 'Vacuum-sealing a bulky item into a flat bag to save shipping space and cost' },
        { concept: 'Character encoding (UTF-8)', realWorld: 'Agreeing on which alphabet to use so both parties can read the letter' },
        { concept: 'Serialization (JSON, XML)', realWorld: 'Organizing loose documents into a standardized folder layout that any office can file correctly' }
      ]
    },
    alternativeAnalogies: [
      {
        title: 'Restaurant Kitchen Plating',
        description:
          'The chef\'s raw cooked food (data) is arranged and garnished on a plate (formatted) before being presented to the diner. The same chicken dish looks completely different depending on whether it\'s plated for fine dining or boxed for takeout — same data, different presentation.'
      },
      {
        title: 'Airport Customs and Declarations',
        description:
          'When crossing international borders, your documents and currency must be converted to local standards. Customs inspects sealed packages (decryption check), and you exchange dollars for yen (format conversion). Layer 6 is the customs desk of the network.'
      }
    ],
    memoryTip:
      'Presentation = "Prettify and Protect." Layer 6 handles the three big Ps: it Presents data in the right format, Packs it down with compression, and Protects it with encryption.'
  },
  {
    layer: 7,
    layerName: 'Application',
    mainAnalogy: {
      title: 'The Letter Itself — What You Actually Write and Read',
      description:
        'The Application layer is the content of the letter — the actual words, the meaning, the purpose of the entire postal journey. Everything below this layer exists to serve one goal: getting your message from your mind to the recipient\'s mind. When you sit down and write "Dear Grandma, thank you for the birthday gift," that human-meaningful content is Layer 7. It is the only layer the end user truly interacts with. Your web browser, email client, file transfer tool, and chat application all live here. They generate the content that all the lower layers work together to deliver. Just as a letter\'s content might be a birthday greeting, a legal contract, or a love note — the application determines the purpose and meaning of the communication, while every layer below is just logistics.',
      mapping: [
        { concept: 'HTTP (web browsing)', realWorld: 'Writing and reading a letter — the actual message content you create and consume' },
        { concept: 'SMTP (email)', realWorld: 'Composing a formal letter to a colleague with a subject line, greeting, and body' },
        { concept: 'FTP (file transfer)', realWorld: 'Mailing a physical package with documents or goods inside — the actual items being shipped' },
        { concept: 'DNS (domain names)', realWorld: 'Looking up someone\'s mailing address in a contacts book by their name rather than memorizing the address' },
        { concept: 'Web browser / email client', realWorld: 'The pen and paper you use to write the letter, and the reading glasses you use to read it' }
      ]
    },
    alternativeAnalogies: [
      {
        title: 'The Restaurant Menu and Your Meal',
        description:
          'Layer 7 is the menu you browse, the order you place, and the meal you eat. Everything else in the restaurant — the kitchen, the ingredients supply chain, the building itself — exists so you can enjoy that plate of food.'
      },
      {
        title: 'The Airport\'s Destination Experience',
        description:
          'Layer 7 is the reason you flew in the first place: the business meeting, the vacation on the beach, the visit to family. Runways, flights, and baggage systems are just the infrastructure that gets you to the experience itself.'
      },
      {
        title: 'The Office Work Product',
        description:
          'Layer 7 is the actual report you write, the spreadsheet you analyze, and the presentation you deliver. The building, the elevator, the electrical wiring — all lower layers — exist solely so you can sit at your desk and produce meaningful work.'
      }
    ],
    memoryTip:
      'Application = "App you actually use." Layer 7 is the only layer humans directly see and touch — your browser, your email, your chat. If you can click on it, it\'s Layer 7.'
  }
];
