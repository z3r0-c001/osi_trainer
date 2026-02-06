// Device gallery with layer filtering
import { devices } from '../data/devices.js';
import { router } from '../router.js';

export function renderDeviceGallery(container) {
  let filterLayer = 0;

  function render() {
    const filtered = filterLayer === 0 ? devices : devices.filter(d => d.layer === filterLayer);

    container.innerHTML = `
      <div class="animate-fade-in">
        <h1 class="section-title">Network Devices</h1>
        <p class="section-subtitle">Explore network devices and learn which OSI layer they operate at.</p>

        <!-- Layer Filter -->
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-xs); margin-bottom: var(--space-xl);">
          <button class="btn btn-sm ${filterLayer === 0 ? 'btn-primary' : 'btn-outline'}" data-filter="0">All Layers</button>
          ${[1,2,3,4,7].map(n => {
            const names = ['','Physical','Data Link','Network','Transport','','','Application'];
            const count = devices.filter(d => d.layer === n).length;
            return count > 0 ? `<button class="btn btn-sm ${filterLayer === n ? 'btn-primary' : 'btn-outline'}" data-filter="${n}">L${n} ${names[n]} (${count})</button>` : '';
          }).join('')}
        </div>

        <!-- Device Grid -->
        <div class="grid-2 stagger-children">
          ${filtered.map(d => `
            <div class="card layer-${d.layer}-border" data-device="${d.id}">
              <div class="card-header">
                <div style="display: flex; align-items: center; gap: var(--space-sm);">
                  <div style="width: 40px; height: 40px; border-radius: var(--border-radius); background: var(--layer-${d.layer}-light); display: flex; align-items: center; justify-content: center;">
                    ${getDeviceIcon(d.icon)}
                  </div>
                  <div>
                    <h3 class="card-title">${d.name}</h3>
                    <span class="badge layer-${d.layer}-bg" style="color: #fff; font-size: 10px;">Layer ${d.layer}</span>
                  </div>
                </div>
              </div>
              <p class="card-body">${d.description}</p>

              <div style="margin-top: var(--space-md);">
                <h5 style="font-size: var(--fs-xs); color: var(--text-muted); margin-bottom: var(--space-xs);">Key Functions:</h5>
                <ul style="font-size: var(--fs-xs); color: var(--text-secondary);">
                  ${d.keyFunctions.slice(0, 3).map(f => `<li style="margin-bottom: 2px; padding-left: var(--space-sm); border-left: 2px solid var(--layer-${d.layer}); margin-left: var(--space-xs);">${f}</li>`).join('')}
                </ul>
              </div>

              <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: var(--fs-xs); color: var(--text-muted);">${d.realWorldAnalogy}</div>
                <button class="btn btn-sm btn-outline expand-btn" data-device-id="${d.id}">Details</button>
              </div>

              <div class="device-detail" id="detail-${d.id}" style="display: none; margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--border-color);">
                <h5 style="margin-bottom: var(--space-sm);">How It Works</h5>
                <p style="color: var(--text-secondary); font-size: var(--fs-sm); line-height: 1.6;">${d.howItWorks}</p>
                <h5 style="margin: var(--space-md) 0 var(--space-sm);">All Functions:</h5>
                <ul style="font-size: var(--fs-xs); color: var(--text-secondary);">
                  ${d.keyFunctions.map(f => `<li style="margin-bottom: 4px; padding-left: var(--space-sm); border-left: 2px solid var(--layer-${d.layer}); margin-left: var(--space-xs);">${f}</li>`).join('')}
                </ul>
                ${d.commonBrands ? `
                  <h5 style="margin: var(--space-md) 0 var(--space-xs);">Common Brands:</h5>
                  <div class="tag-list">
                    ${d.commonBrands.map(b => `<span class="tag">${b}</span>`).join('')}
                  </div>
                ` : ''}
                ${d.protocols && d.protocols.length > 0 ? `
                  <h5 style="margin: var(--space-md) 0 var(--space-xs);">Related Protocols:</h5>
                  <div class="tag-list">
                    ${d.protocols.map(p => `<a href="#/protocol/${p}" class="tag" style="cursor: pointer; color: var(--accent);">${p.toUpperCase()}</a>`).join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        ${filtered.length === 0 ? '<p class="empty-state">No devices at this layer.</p>' : ''}
      </div>
    `;

    // Filter buttons
    container.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterLayer = parseInt(btn.dataset.filter);
        render();
      });
    });

    // Expand/collapse device details
    container.querySelectorAll('.expand-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.deviceId;
        const detail = container.querySelector(`#detail-${id}`);
        if (detail) {
          const isVisible = detail.style.display !== 'none';
          detail.style.display = isVisible ? 'none' : 'block';
          btn.textContent = isVisible ? 'Details' : 'Hide';
        }
      });
    });
  }

  render();
  return {};
}

function getDeviceIcon(iconName) {
  const icons = {
    hub: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg>`,
    repeater: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
    bridge: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="7" height="10" rx="1"/><rect x="15" y="7" width="7" height="10" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/></svg>`,
    switch: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/><line x1="14" y1="10" x2="14" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/></svg>`,
    router: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="8" width="20" height="8" rx="2"/><line x1="6" y1="8" x2="6" y2="4"/><circle cx="6" cy="3" r="1"/><line x1="12" y1="8" x2="12" y2="4"/><circle cx="12" cy="3" r="1"/></svg>`,
    firewall: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    'load-balancer': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/></svg>`,
    wap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>`,
    modem: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="10" rx="2"/><polyline points="7 8 7 4 17 4 17 8"/><circle cx="8" cy="13" r="1" fill="currentColor"/><circle cx="12" cy="13" r="1" fill="currentColor"/></svg>`,
    gateway: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/><line x1="11" y1="7" x2="13" y2="7"/><line x1="17" y1="11" x2="17" y2="13"/><path d="M11 7h3v6"/></svg>`,
    'l3-switch': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/><line x1="14" y1="10" x2="14" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/><text x="12" y="5" text-anchor="middle" font-size="6" fill="currentColor">L3</text></svg>`,
    proxy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/><rect x="10" y="9" width="4" height="6" rx="1"/></svg>`
  };
  return icons[iconName] || icons.hub;
}
