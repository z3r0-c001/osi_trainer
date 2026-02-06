// Encapsulation Visualizer
import { osiLayers } from '../data/osi-layers.js';

const ENCAP_STAGES = [
  {
    label: 'Application Data',
    layerNum: 7,
    pdu: 'Data',
    headers: [],
    description: 'The user creates data at the Application layer (e.g., an HTTP request, email message, or file).',
    fields: [
      { name: 'Payload', desc: 'The actual user data — message body, web page request, file contents' }
    ]
  },
  {
    label: 'Presentation Formatted',
    layerNum: 6,
    pdu: 'Data',
    headers: ['L6'],
    description: 'The Presentation layer formats, encrypts, and/or compresses the data for transmission.',
    fields: [
      { name: 'Encryption', desc: 'SSL/TLS encryption applied if needed' },
      { name: 'Encoding', desc: 'Character encoding (UTF-8) and data format (JPEG, ASCII)' },
      { name: 'Compression', desc: 'Data compression to reduce size' }
    ]
  },
  {
    label: 'Session Tagged',
    layerNum: 5,
    pdu: 'Data',
    headers: ['L5', 'L6'],
    description: 'The Session layer adds session management information — checkpoints, synchronization, and dialog control.',
    fields: [
      { name: 'Session ID', desc: 'Unique identifier for this communication session' },
      { name: 'Sync Points', desc: 'Checkpoints for resuming interrupted transfers' },
      { name: 'Dialog Control', desc: 'Half-duplex or full-duplex mode indication' }
    ]
  },
  {
    label: 'Segment',
    layerNum: 4,
    pdu: 'Segment',
    headers: ['TCP/UDP', 'L5', 'L6'],
    description: 'The Transport layer segments the data and adds a TCP or UDP header with port numbers for process-to-process delivery.',
    fields: [
      { name: 'Source Port', desc: 'Sender\'s port number (e.g., 49152 — ephemeral)' },
      { name: 'Dest Port', desc: 'Receiver\'s port number (e.g., 80 for HTTP, 443 for HTTPS)' },
      { name: 'Sequence #', desc: 'Ordering number for reassembly (TCP only)' },
      { name: 'Ack #', desc: 'Acknowledgment of received data (TCP only)' },
      { name: 'Flags', desc: 'SYN, ACK, FIN, RST control flags (TCP only)' },
      { name: 'Checksum', desc: 'Error detection for the segment' }
    ]
  },
  {
    label: 'Packet',
    layerNum: 3,
    pdu: 'Packet',
    headers: ['IP', 'TCP/UDP', 'L5', 'L6'],
    description: 'The Network layer adds an IP header with source and destination IP addresses for host-to-host (logical) delivery.',
    fields: [
      { name: 'Version', desc: 'IPv4 or IPv6' },
      { name: 'Source IP', desc: 'Sender\'s IP address (e.g., 192.168.1.100)' },
      { name: 'Dest IP', desc: 'Receiver\'s IP address (e.g., 142.250.80.46)' },
      { name: 'TTL', desc: 'Time To Live — max hops before packet is discarded' },
      { name: 'Protocol', desc: 'Upper layer protocol (6=TCP, 17=UDP)' },
      { name: 'Header Checksum', desc: 'Error detection for the IP header' }
    ]
  },
  {
    label: 'Frame',
    layerNum: 2,
    pdu: 'Frame',
    headers: ['Eth', 'IP', 'TCP/UDP', 'L5', 'L6', 'FCS'],
    description: 'The Data Link layer wraps the packet in a frame with a header (MAC addresses) and trailer (FCS) for node-to-node delivery on the local network.',
    fields: [
      { name: 'Dest MAC', desc: 'Next-hop device MAC address (e.g., AA:BB:CC:DD:EE:FF)' },
      { name: 'Source MAC', desc: 'Sender\'s MAC address' },
      { name: 'EtherType', desc: 'Protocol identifier (0x0800=IPv4, 0x86DD=IPv6)' },
      { name: 'FCS (Trailer)', desc: 'Frame Check Sequence — CRC-32 error detection' }
    ]
  },
  {
    label: 'Bits',
    layerNum: 1,
    pdu: 'Bits',
    headers: [],
    description: 'The Physical layer converts the entire frame into a stream of bits (1s and 0s) encoded as electrical signals, light pulses, or radio waves for transmission over the physical medium.',
    fields: [
      { name: 'Encoding', desc: 'NRZ, Manchester, 4B/5B encoding scheme' },
      { name: 'Signaling', desc: 'Electrical voltage, light intensity, or radio frequency' },
      { name: 'Medium', desc: 'Copper cable, fiber optic, wireless (air)' }
    ]
  }
];

export function renderEncapsulation(container) {
  let activeStage = null;

  function render() {
    container.innerHTML = `
      <div class="animate-fade-in">
        <h1 class="section-title">Encapsulation & Decapsulation</h1>
        <p class="section-subtitle">See how data is wrapped with headers at each layer as it travels down the OSI model. Click any stage to see header field details.</p>

        <div class="encap-container">
          ${ENCAP_STAGES.map((stage, i) => `
            <div>
              ${i > 0 ? `
                <div class="encap-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                  </svg>
                </div>
              ` : ''}
              <div class="encap-stage ${activeStage === i ? 'active' : ''}" data-stage="${i}"
                   style="background: var(--layer-${stage.layerNum}-light); border: 2px solid ${activeStage === i ? `var(--layer-${stage.layerNum})` : 'transparent'}; border-radius: var(--border-radius);">
                ${stage.layerNum === 1 ? `
                  <div class="encap-data" style="font-family: var(--font-mono); font-size: var(--fs-xs); letter-spacing: 2px;">10110011 01001010 11100101...</div>
                ` : `
                  ${stage.headers.map((h, hi) => {
                    const colors = { 'Eth': `var(--layer-2)`, 'IP': `var(--layer-3)`, 'TCP/UDP': `var(--layer-4)`, 'L5': `var(--layer-5)`, 'L6': `var(--layer-6)`, 'FCS': `var(--layer-2-dark)` };
                    return `<div class="encap-header" style="background: ${colors[h] || 'var(--accent)'};">${h}</div>`;
                  }).join('')}
                  <div class="encap-data">${stage.headers.length === 0 ? 'User Data' : 'Data'}</div>
                  ${stage.headers.includes('FCS') ? '' : ''}
                `}
              </div>
              <div class="encap-label layer-${stage.layerNum}-text">
                Layer ${stage.layerNum}: ${stage.label} (${stage.pdu})
              </div>
            </div>
          `).join('')}
        </div>

        ${activeStage !== null ? `
          <div class="encap-detail-panel animate-fade-in-up" style="margin-top: var(--space-xl);">
            <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-md);">
              <span class="badge layer-${ENCAP_STAGES[activeStage].layerNum}-bg" style="color: #fff;">Layer ${ENCAP_STAGES[activeStage].layerNum}</span>
              <h4>${ENCAP_STAGES[activeStage].label}</h4>
            </div>
            <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: var(--space-lg);">
              ${ENCAP_STAGES[activeStage].description}
            </p>
            <h5 style="margin-bottom: var(--space-sm);">Header/Trailer Fields:</h5>
            <div class="encap-field-list">
              ${ENCAP_STAGES[activeStage].fields.map(f => `
                <span class="encap-field-name">${f.name}</span>
                <span class="encap-field-desc">${f.desc}</span>
              `).join('')}
            </div>
          </div>
        ` : `
          <div style="text-align: center; margin-top: var(--space-xl); color: var(--text-muted); font-size: var(--fs-sm);">
            Click any encapsulation stage above to see header field details.
          </div>
        `}

        <!-- Signal Wave at Physical Layer -->
        <div class="card" style="margin-top: var(--space-xl); padding: var(--space-lg);">
          <h3 style="margin-bottom: var(--space-md);">Physical Layer Signal</h3>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: var(--space-md);">
            At the Physical layer, frames become electrical signals, light pulses, or radio waves:
          </p>
          <div class="signal-wave" style="background: var(--layer-1-light); border-radius: var(--border-radius);">
            <svg viewBox="0 0 400 50" preserveAspectRatio="none">
              <path d="M0,25 L10,25 L10,10 L30,10 L30,40 L50,40 L50,10 L70,10 L70,40 L80,40 L80,25 L90,25 L90,10 L110,10 L110,40 L130,40 L130,10 L150,10 L150,25 L160,25 L160,40 L180,40 L180,10 L200,10 L200,40 L210,40 L210,25 L220,25 L220,10 L240,10 L240,40 L260,40 L260,10 L280,10 L280,40 L290,40 L290,25 L300,25 L300,10 L320,10 L320,40 L340,40 L340,10 L360,10 L360,25 L370,25 L370,40 L390,40 L390,10 L400,10"
                    fill="none" stroke="var(--layer-1)" stroke-width="2"/>
            </svg>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: var(--space-sm); font-size: var(--fs-xs); color: var(--text-muted);">
            <span>Digital Signal (NRZ encoding)</span>
            <span>1 0 1 1 0 0 1 1 0 1 0 1 1 0 ...</span>
          </div>
        </div>

        <!-- Key Concepts -->
        <div class="grid-2" style="margin-top: var(--space-xl);">
          <div class="card">
            <h4 style="color: var(--success); margin-bottom: var(--space-sm);">Encapsulation (Sending)</h4>
            <p class="card-body">As data moves <strong>down</strong> the OSI model from Layer 7 to Layer 1, each layer adds its own header (and sometimes trailer) to the data from the layer above. This process wraps the data like nesting envelopes.</p>
            <div style="margin-top: var(--space-sm); font-size: var(--fs-xs); color: var(--text-muted);">
              Data &rarr; Segment &rarr; Packet &rarr; Frame &rarr; Bits
            </div>
          </div>
          <div class="card">
            <h4 style="color: var(--info); margin-bottom: var(--space-sm);">Decapsulation (Receiving)</h4>
            <p class="card-body">As data moves <strong>up</strong> the OSI model from Layer 1 to Layer 7, each layer strips off its header, reads the control information, and passes the payload to the layer above. The original data is reconstructed.</p>
            <div style="margin-top: var(--space-sm); font-size: var(--fs-xs); color: var(--text-muted);">
              Bits &rarr; Frame &rarr; Packet &rarr; Segment &rarr; Data
            </div>
          </div>
        </div>
      </div>
    `;

    // Click handlers for stages
    container.querySelectorAll('.encap-stage').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.stage);
        activeStage = activeStage === idx ? null : idx;
        render();
      });
    });
  }

  render();
  return {};
}
