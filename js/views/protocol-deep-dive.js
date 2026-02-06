// Protocol listing + detail views
import { protocols } from '../data/protocols.js';
import { osiLayers } from '../data/osi-layers.js';
import { store } from '../store.js';
import { router } from '../router.js';

export function renderProtocolDeepDive(container) {
  let filterLayer = 0; // 0 = all

  function render() {
    const filtered = filterLayer === 0 ? protocols : protocols.filter(p => p.layer === filterLayer);

    container.innerHTML = `
      <div class="animate-fade-in">
        <h1 class="section-title">Protocol Deep-Dives</h1>
        <p class="section-subtitle">Explore ${protocols.length} protocols across all OSI layers. Click any protocol for detailed information.</p>

        <!-- Layer Filter -->
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-xs); margin-bottom: var(--space-xl);">
          <button class="btn btn-sm ${filterLayer === 0 ? 'btn-primary' : 'btn-outline'}" data-filter="0">All</button>
          ${[7,6,5,4,3,2,1].map(n => {
            const names = ['','Physical','Data Link','Network','Transport','Session','Presentation','Application'];
            return `<button class="btn btn-sm ${filterLayer === n ? 'btn-primary' : 'btn-outline'}" data-filter="${n}">L${n} ${names[n]}</button>`;
          }).join('')}
        </div>

        <!-- Protocol Grid -->
        <div class="grid-3 stagger-children">
          ${filtered.map(p => `
            <div class="card card-clickable layer-${p.layer}-border" data-proto="${p.id}">
              <div class="card-header">
                <span class="card-title">${p.name}</span>
                <span class="badge layer-${p.layer}-bg" style="color: #fff;">L${p.layer}</span>
              </div>
              <div style="font-size: var(--fs-xs); color: var(--text-muted); margin-bottom: var(--space-sm);">${p.fullName}</div>
              <p class="card-body">${p.description}</p>
              <div class="card-footer" style="display: flex; gap: var(--space-xs); align-items: center;">
                ${p.port ? `<span class="badge badge-primary">Port ${p.port}</span>` : ''}
                ${p.animated ? '<span class="badge badge-warning">Animated</span>' : ''}
              </div>
            </div>
          `).join('')}
        </div>

        ${filtered.length === 0 ? '<p class="empty-state">No protocols found for this layer.</p>' : ''}
      </div>
    `;

    // Filter buttons
    container.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterLayer = parseInt(btn.dataset.filter);
        render();
      });
    });

    // Protocol click
    container.querySelectorAll('[data-proto]').forEach(el => {
      el.addEventListener('click', () => router.navigate(`/protocol/${el.dataset.proto}`));
    });
  }

  render();
  return {};
}

export function renderProtocolDetail(container, { id }) {
  const proto = protocols.find(p => p.id === id);
  if (!proto) {
    container.innerHTML = '<p>Protocol not found.</p>';
    return {};
  }

  store.markProtocolViewed(id);
  const relatedProtos = proto.related.map(rid => protocols.find(p => p.id === rid)).filter(Boolean);

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Breadcrumb -->
      <div class="breadcrumb" style="margin-bottom: var(--space-lg);">
        <span class="breadcrumb-item"><a href="#/protocols">Protocols</a></span>
        <span class="breadcrumb-sep"></span>
        <span class="breadcrumb-item">${proto.name}</span>
      </div>

      <!-- Header -->
      <div class="card" style="margin-bottom: var(--space-xl);">
        <div style="padding: var(--space-lg); background: var(--layer-${proto.layer}-light); border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0; margin: calc(-1 * var(--space-lg)); margin-bottom: var(--space-lg);">
          <div style="display: flex; align-items: center; gap: var(--space-md); flex-wrap: wrap;">
            <h1 style="font-size: var(--fs-2xl);">${proto.name}</h1>
            <span class="badge layer-${proto.layer}-bg" style="color: #fff;">Layer ${proto.layer}</span>
            ${proto.port ? `<span class="badge badge-primary">Port ${proto.port}</span>` : ''}
            ${proto.animated ? '<span class="badge badge-warning">Animated</span>' : ''}
          </div>
          <p style="font-size: var(--fs-md); color: var(--text-secondary); margin-top: var(--space-xs);">${proto.fullName}</p>
        </div>

        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--space-lg);">${proto.description}</p>

        <!-- Tabs -->
        <div class="tab-group" id="proto-tabs">
          <button class="tab-btn active" data-tab="features">Key Features</button>
          <button class="tab-btn" data-tab="header">Header Fields</button>
          <button class="tab-btn" data-tab="usecases">Use Cases</button>
          ${proto.animated ? '<button class="tab-btn" data-tab="animation">Animation</button>' : ''}
        </div>

        <!-- Features Tab -->
        <div class="tab-content active" id="tab-features">
          <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
            ${proto.keyFeatures.map(f => `
              <div style="display: flex; align-items: flex-start; gap: var(--space-sm);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" style="flex-shrink: 0; margin-top: 4px;">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style="color: var(--text-secondary); font-size: var(--fs-sm);">${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Header Fields Tab -->
        <div class="tab-content" id="tab-header">
          <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--fs-sm);">
            <div style="text-align: center; font-weight: var(--fw-bold); margin-bottom: var(--space-md); color: var(--accent);">${proto.name} Header</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 4px;">
              ${proto.headerFields.map(field => `
                <div style="background: var(--layer-${proto.layer}-light); border: 1px solid var(--layer-${proto.layer}); padding: var(--space-xs) var(--space-sm); border-radius: var(--border-radius-sm); text-align: center; font-size: var(--fs-xs);">
                  ${field}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Use Cases Tab -->
        <div class="tab-content" id="tab-usecases">
          <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
            ${proto.useCases.map(uc => `
              <div class="card" style="padding: var(--space-md);">
                <p class="card-body">${uc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Animation Tab (if applicable) -->
        ${proto.animated ? `
          <div class="tab-content" id="tab-animation">
            <div id="proto-animation-area" style="min-height: 300px;"></div>
          </div>
        ` : ''}
      </div>

      <!-- Related Protocols -->
      ${relatedProtos.length > 0 ? `
        <h3 style="margin-bottom: var(--space-md);">Related Protocols</h3>
        <div class="grid-3">
          ${relatedProtos.map(rp => `
            <div class="card card-clickable layer-${rp.layer}-border" data-proto="${rp.id}">
              <div class="card-header">
                <span class="card-title">${rp.name}</span>
                <span class="badge layer-${rp.layer}-bg" style="color: #fff;">L${rp.layer}</span>
              </div>
              <p class="card-body">${rp.description.substring(0, 100)}...</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Navigation -->
      <div style="margin-top: var(--space-xl);">
        <a href="#/layer/${proto.layer}" class="btn btn-outline">View Layer ${proto.layer} &rarr;</a>
      </div>
    </div>
  `;

  // Tab switching
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      container.querySelector(`#tab-${btn.dataset.tab}`).classList.add('active');

      // Load animation if needed
      if (btn.dataset.tab === 'animation') {
        loadProtocolAnimation(proto.id, container.querySelector('#proto-animation-area'));
      }
    });
  });

  // Related protocol clicks
  container.querySelectorAll('[data-proto]').forEach(el => {
    el.addEventListener('click', () => router.navigate(`/protocol/${el.dataset.proto}`));
  });

  return {};
}

async function loadProtocolAnimation(protoId, area) {
  if (!area) return;

  const animations = {
    tcp: renderTCPHandshake,
    dns: renderDNSResolution,
    arp: renderARPAnimation,
    dhcp: renderDHCPAnimation
  };

  const renderer = animations[protoId];
  if (renderer) {
    renderer(area);
  } else {
    area.innerHTML = '<p class="empty-state">Animation not available for this protocol.</p>';
  }
}

function renderTCPHandshake(area) {
  let step = 0;
  const steps = [
    { label: 'SYN', from: 'client', desc: 'Client sends SYN (seq=100) to initiate connection', arrow: 'right' },
    { label: 'SYN-ACK', from: 'server', desc: 'Server responds with SYN-ACK (seq=300, ack=101)', arrow: 'left' },
    { label: 'ACK', from: 'client', desc: 'Client sends ACK (ack=301) — connection established!', arrow: 'right' },
  ];

  function render() {
    area.innerHTML = `
      <div style="text-align: center; margin-bottom: var(--space-lg);">
        <h4>TCP 3-Way Handshake</h4>
        <p style="color: var(--text-muted); font-size: var(--fs-sm);">Click "Next Step" to see each stage of the handshake</p>
      </div>
      <div style="display: grid; grid-template-columns: 100px 1fr 100px; gap: var(--space-md); align-items: start;">
        <div style="text-align: center; padding: var(--space-md); background: var(--layer-4-light); border-radius: var(--border-radius); border: 2px solid var(--layer-4);">
          <strong>Client</strong>
          <div style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 4px;">192.168.1.10</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-md); padding-top: var(--space-md);">
          ${steps.map((s, i) => `
            <div style="display: flex; align-items: center; gap: var(--space-sm); opacity: ${i < step ? 1 : i === step ? 1 : 0.2}; transition: opacity 0.3s;">
              ${s.arrow === 'right' ? `
                <div style="flex:1; height: 2px; background: var(--layer-4); position: relative;">
                  <div style="position: absolute; right: -6px; top: -4px; border: 5px solid transparent; border-left-color: var(--layer-4);"></div>
                </div>
              ` : `
                <div style="flex:1; height: 2px; background: var(--layer-4); position: relative;">
                  <div style="position: absolute; left: -6px; top: -4px; border: 5px solid transparent; border-right-color: var(--layer-4);"></div>
                </div>
              `}
              <span class="badge layer-4-bg" style="color: #fff; position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap;">${s.label}</span>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center; padding: var(--space-md); background: var(--layer-4-light); border-radius: var(--border-radius); border: 2px solid var(--layer-4);">
          <strong>Server</strong>
          <div style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 4px;">142.250.80.46</div>
        </div>
      </div>
      ${step < steps.length ? `
        <div style="text-align: center; margin-top: var(--space-lg);">
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: var(--space-md);">
            <strong>Step ${step + 1}:</strong> ${steps[step].desc}
          </p>
          <button class="btn btn-primary" id="tcp-next">Next Step</button>
        </div>
      ` : `
        <div style="text-align: center; margin-top: var(--space-lg);">
          <p style="color: var(--success); font-weight: var(--fw-semibold);">Connection Established! Data can now flow.</p>
          <button class="btn btn-secondary" id="tcp-reset" style="margin-top: var(--space-sm);">Reset</button>
        </div>
      `}
    `;

    const nextBtn = area.querySelector('#tcp-next');
    if (nextBtn) nextBtn.addEventListener('click', () => { step++; render(); });
    const resetBtn = area.querySelector('#tcp-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => { step = 0; render(); });
  }

  render();
}

function renderDNSResolution(area) {
  let step = 0;
  const steps = [
    'User types "www.example.com" in browser',
    'Browser checks local DNS cache — not found',
    'OS sends query to configured DNS resolver (e.g., 8.8.8.8)',
    'Resolver queries root DNS server (.)',
    'Root server responds: "Try .com TLD server"',
    'Resolver queries .com TLD server',
    'TLD responds: "Try example.com authoritative server"',
    'Resolver queries authoritative server for example.com',
    'Authoritative server responds: "A record = 93.184.216.34"',
    'Resolver caches result and returns IP to client',
    'Browser connects to 93.184.216.34'
  ];

  function render() {
    area.innerHTML = `
      <div style="text-align: center; margin-bottom: var(--space-lg);">
        <h4>DNS Resolution Process</h4>
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
        ${steps.map((s, i) => `
          <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm) var(--space-md); border-radius: var(--border-radius-sm); background: ${i <= step ? 'var(--layer-7-light)' : 'var(--bg-primary)'}; border-left: 3px solid ${i <= step ? 'var(--layer-7)' : 'var(--border-color)'}; opacity: ${i <= step ? 1 : 0.4}; transition: all 0.3s;">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: ${i < step ? 'var(--success)' : i === step ? 'var(--layer-7)' : 'var(--bg-tertiary)'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: var(--fs-xs); font-weight: var(--fw-bold); flex-shrink: 0;">${i + 1}</span>
            <span style="font-size: var(--fs-sm); color: var(--text-secondary);">${s}</span>
          </div>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: var(--space-lg);">
        ${step < steps.length - 1 ? `
          <button class="btn btn-primary" id="dns-next">Next Step</button>
        ` : `
          <p style="color: var(--success); font-weight: var(--fw-semibold);">DNS resolution complete!</p>
          <button class="btn btn-secondary" id="dns-reset" style="margin-top: var(--space-sm);">Reset</button>
        `}
      </div>
    `;

    const nextBtn = area.querySelector('#dns-next');
    if (nextBtn) nextBtn.addEventListener('click', () => { step++; render(); });
    const resetBtn = area.querySelector('#dns-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => { step = 0; render(); });
  }

  render();
}

function renderARPAnimation(area) {
  let step = 0;
  const steps = [
    'Device A (192.168.1.10) wants to send data to Device B (192.168.1.20)',
    'Device A checks ARP cache — no entry for 192.168.1.20',
    'Device A broadcasts ARP Request: "Who has 192.168.1.20? Tell 192.168.1.10"',
    'All devices on the subnet receive the broadcast',
    'Device B recognizes its IP and sends ARP Reply: "192.168.1.20 is at AA:BB:CC:DD:EE:FF"',
    'Device A receives reply and updates ARP cache',
    'Device A can now send frames directly to Device B using MAC address'
  ];

  function render() {
    area.innerHTML = `
      <div style="text-align: center; margin-bottom: var(--space-lg);"><h4>ARP Resolution</h4></div>
      <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
        ${steps.map((s, i) => `
          <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm) var(--space-md); border-radius: var(--border-radius-sm); background: ${i <= step ? 'var(--layer-2-light)' : 'var(--bg-primary)'}; border-left: 3px solid ${i <= step ? 'var(--layer-2)' : 'var(--border-color)'}; opacity: ${i <= step ? 1 : 0.4}; transition: all 0.3s;">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: ${i < step ? 'var(--success)' : i === step ? 'var(--layer-2)' : 'var(--bg-tertiary)'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: var(--fs-xs); font-weight: var(--fw-bold); flex-shrink: 0;">${i + 1}</span>
            <span style="font-size: var(--fs-sm); color: var(--text-secondary);">${s}</span>
          </div>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: var(--space-lg);">
        ${step < steps.length - 1 ? `<button class="btn btn-primary" id="arp-next">Next Step</button>` :
          `<p style="color: var(--success); font-weight: var(--fw-semibold);">ARP resolution complete!</p><button class="btn btn-secondary" id="arp-reset" style="margin-top: var(--space-sm);">Reset</button>`}
      </div>
    `;
    const nextBtn = area.querySelector('#arp-next');
    if (nextBtn) nextBtn.addEventListener('click', () => { step++; render(); });
    const resetBtn = area.querySelector('#arp-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => { step = 0; render(); });
  }
  render();
}

function renderDHCPAnimation(area) {
  let step = 0;
  const steps = [
    'DISCOVER: Client broadcasts "I need an IP address!" (src: 0.0.0.0, dst: 255.255.255.255)',
    'OFFER: DHCP server responds with an available IP address offer (e.g., 192.168.1.50)',
    'REQUEST: Client broadcasts acceptance of the offered IP address',
    'ACKNOWLEDGE: Server confirms the lease — client now has IP 192.168.1.50 for the lease duration'
  ];

  function render() {
    area.innerHTML = `
      <div style="text-align: center; margin-bottom: var(--space-lg);"><h4>DHCP DORA Process</h4></div>
      <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
        ${steps.map((s, i) => `
          <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm) var(--space-md); border-radius: var(--border-radius-sm); background: ${i <= step ? 'var(--layer-7-light)' : 'var(--bg-primary)'}; border-left: 3px solid ${i <= step ? 'var(--layer-7)' : 'var(--border-color)'}; opacity: ${i <= step ? 1 : 0.4}; transition: all 0.3s;">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: ${i < step ? 'var(--success)' : i === step ? 'var(--layer-7)' : 'var(--bg-tertiary)'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: var(--fs-xs); font-weight: var(--fw-bold); flex-shrink: 0;">${['D','O','R','A'][i]}</span>
            <span style="font-size: var(--fs-sm); color: var(--text-secondary);">${s}</span>
          </div>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: var(--space-lg);">
        ${step < steps.length - 1 ? `<button class="btn btn-primary" id="dhcp-next">Next Step</button>` :
          `<p style="color: var(--success); font-weight: var(--fw-semibold);">DHCP process complete! Client has an IP address.</p><button class="btn btn-secondary" id="dhcp-reset" style="margin-top: var(--space-sm);">Reset</button>`}
      </div>
    `;
    const nextBtn = area.querySelector('#dhcp-next');
    if (nextBtn) nextBtn.addEventListener('click', () => { step++; render(); });
    const resetBtn = area.querySelector('#dhcp-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => { step = 0; render(); });
  }
  render();
}
