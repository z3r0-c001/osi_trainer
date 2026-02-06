// OSI Layer Explorer — overview + detail views
import { osiLayers } from '../data/osi-layers.js';
import { protocols } from '../data/protocols.js';
import { devices } from '../data/devices.js';
import { analogies } from '../data/analogies.js';
import { store } from '../store.js';
import { router } from '../router.js';

export function renderLayerExplorer(container) {
  container.innerHTML = `
    <div class="animate-fade-in">
      <h1 class="section-title">OSI Layer Explorer</h1>
      <p class="section-subtitle">Click any layer to explore its protocols, devices, and functions in detail.</p>

      <div class="card" style="padding: var(--space-xl); margin-bottom: var(--space-xl);">
        <div class="layer-stack stagger-children">
          ${osiLayers.slice().reverse().map(layer => `
            <div class="layer-stack-item layer-${layer.number}-bg" data-layer="${layer.number}">
              <span class="layer-num">${layer.number}</span>
              <span class="layer-name">${layer.name}</span>
              <span class="layer-pdu">PDU: ${layer.pdu}</span>
              <span style="font-size: var(--fs-xs); opacity: 0.8;">${layer.mnemonicWord}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <h2 style="font-size: var(--fs-lg); margin-bottom: var(--space-md);">Layer Overview Cards</h2>
      <div class="grid-2 stagger-children">
        ${osiLayers.map(layer => `
          <div class="card card-clickable layer-${layer.number}-border" data-layer="${layer.number}">
            <div class="card-header">
              <div>
                <span class="badge layer-${layer.number}-bg" style="color:#fff;">Layer ${layer.number}</span>
                <span class="card-title" style="margin-left: var(--space-sm);">${layer.name}</span>
              </div>
              <span style="font-size: var(--fs-xs); color: var(--text-muted);">TCP/IP: ${layer.tcpipMapping}</span>
            </div>
            <p class="card-body">${layer.description}</p>
            <div class="card-footer">
              <div class="tag-list">
                ${layer.keywords.slice(0, 5).map(k => `<span class="tag">${k}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-layer]').forEach(el => {
    el.addEventListener('click', () => {
      router.navigate(`/layer/${el.dataset.layer}`);
    });
  });

  return {};
}

export function renderLayerDetail(container, { num }) {
  const layerNum = parseInt(num);
  const layer = osiLayers.find(l => l.number === layerNum);
  if (!layer) {
    container.innerHTML = '<p>Layer not found.</p>';
    return {};
  }

  store.markLayerViewed(layerNum);

  const layerProtocols = protocols.filter(p => p.layer === layerNum);
  const layerDevices = devices.filter(d => d.layer === layerNum);
  const layerAnalogy = analogies.find(a => a.layer === layerNum);

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Breadcrumb -->
      <div class="breadcrumb" style="margin-bottom: var(--space-lg);">
        <span class="breadcrumb-item"><a href="#/layers">Layers</a></span>
        <span class="breadcrumb-sep"></span>
        <span class="breadcrumb-item">Layer ${layer.number}: ${layer.name}</span>
      </div>

      <!-- Layer Detail Header -->
      <div class="layer-detail" style="margin-bottom: var(--space-xl);">
        <div class="layer-detail-header layer-${layer.number}-bg">
          <div style="display: flex; align-items: center; gap: var(--space-md);">
            <span style="font-size: var(--fs-3xl); font-weight: var(--fw-bold); opacity: 0.3;">L${layer.number}</span>
            <div>
              <h2>Layer ${layer.number}: ${layer.name}</h2>
              <p>${layer.description}</p>
            </div>
          </div>
          <div style="display: flex; gap: var(--space-lg); margin-top: var(--space-md);">
            <div><strong>PDU:</strong> ${layer.pdu}</div>
            <div><strong>TCP/IP:</strong> ${layer.tcpipMapping}</div>
            <div><strong>Mnemonic:</strong> ${layer.mnemonicWord}</div>
          </div>
        </div>
        <div class="layer-detail-body">
          <!-- Tabs -->
          <div class="tab-group" id="layer-tabs">
            <button class="tab-btn active" data-tab="overview">Overview</button>
            <button class="tab-btn" data-tab="protocols">Protocols (${layerProtocols.length})</button>
            <button class="tab-btn" data-tab="devices">Devices (${layerDevices.length})</button>
            <button class="tab-btn" data-tab="analogy">Analogies</button>
            <button class="tab-btn" data-tab="functions">Key Functions</button>
          </div>

          <!-- Overview Tab -->
          <div class="tab-content active" id="tab-overview">
            <div style="white-space: pre-line; color: var(--text-secondary); line-height: 1.8; font-size: var(--fs-sm);">
              ${layer.fullDescription}
            </div>
            <div style="margin-top: var(--space-lg);">
              <h4 style="margin-bottom: var(--space-sm);">Key Terms</h4>
              <div class="tag-list">
                ${layer.keywords.map(k => `<span class="tag">${k}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Protocols Tab -->
          <div class="tab-content" id="tab-protocols">
            ${layerProtocols.length === 0 ? '<p class="empty-state">No specific protocols at this layer.</p>' : `
              <div class="grid-2">
                ${layerProtocols.map(p => `
                  <div class="card card-clickable" data-proto="${p.id}">
                    <div class="card-header">
                      <span class="card-title">${p.name}</span>
                      ${p.port ? `<span class="badge badge-primary">Port ${p.port}</span>` : ''}
                    </div>
                    <p class="card-body">${p.description}</p>
                    ${p.animated ? '<span class="badge badge-warning" style="margin-top: var(--space-sm);">Has Animation</span>' : ''}
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Devices Tab -->
          <div class="tab-content" id="tab-devices">
            ${layerDevices.length === 0 ? '<p class="empty-state">No specific devices at this layer.</p>' : `
              <div class="grid-2">
                ${layerDevices.map(d => `
                  <div class="card">
                    <h4 class="card-title">${d.name}</h4>
                    <p class="card-body">${d.description}</p>
                    <div style="margin-top: var(--space-sm);">
                      <span class="badge badge-primary">Layer ${d.layer}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Analogy Tab -->
          <div class="tab-content" id="tab-analogy">
            ${layerAnalogy ? `
              <div class="card" style="margin-bottom: var(--space-lg);">
                <h4 class="card-title">${layerAnalogy.mainAnalogy.title}</h4>
                <p class="card-body" style="margin: var(--space-md) 0;">${layerAnalogy.mainAnalogy.description}</p>
                <div style="display: grid; grid-template-columns: auto 1fr; gap: var(--space-xs) var(--space-lg);">
                  ${layerAnalogy.mainAnalogy.mapping.map(m => `
                    <span style="font-weight: var(--fw-semibold); color: var(--accent);">${m.concept}</span>
                    <span style="color: var(--text-secondary);">${m.realWorld}</span>
                  `).join('')}
                </div>
              </div>
              <h4 style="margin-bottom: var(--space-sm);">Alternative Analogies</h4>
              ${layerAnalogy.alternativeAnalogies.map(a => `
                <div class="card" style="margin-bottom: var(--space-sm);">
                  <h5 style="font-weight: var(--fw-semibold);">${a.title}</h5>
                  <p class="card-body">${a.description}</p>
                </div>
              `).join('')}
              <div style="margin-top: var(--space-lg); padding: var(--space-md); background: var(--info-bg); border-radius: var(--border-radius); border-left: 4px solid var(--info);">
                <strong>Memory Tip:</strong> ${layerAnalogy.memoryTip}
              </div>
            ` : '<p class="empty-state">No analogies available.</p>'}
          </div>

          <!-- Key Functions Tab -->
          <div class="tab-content" id="tab-functions">
            <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
              ${layer.keyFunctions.map((fn, i) => `
                <div class="card" style="display: flex; align-items: flex-start; gap: var(--space-md);">
                  <span style="width: 28px; height: 28px; border-radius: 50%; background: var(--layer-${layer.number}); color: #fff; display: flex; align-items: center; justify-content: center; font-size: var(--fs-xs); font-weight: var(--fw-bold); flex-shrink: 0;">${i + 1}</span>
                  <p class="card-body" style="margin: 0;">${fn}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div style="display: flex; justify-content: space-between;">
        ${layerNum > 1 ? `<a href="#/layer/${layerNum - 1}" class="btn btn-outline">&larr; Layer ${layerNum - 1}</a>` : '<div></div>'}
        ${layerNum < 7 ? `<a href="#/layer/${layerNum + 1}" class="btn btn-outline">Layer ${layerNum + 1} &rarr;</a>` : '<div></div>'}
      </div>
    </div>
  `;

  // Tab switching
  const tabBtns = container.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      container.querySelector(`#tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  // Protocol click handlers
  container.querySelectorAll('[data-proto]').forEach(el => {
    el.addEventListener('click', () => router.navigate(`/protocol/${el.dataset.proto}`));
  });

  return {};
}
