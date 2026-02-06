// OSI vs TCP/IP side-by-side comparison
import { osiLayers } from '../data/osi-layers.js';
import { tcpipLayers } from '../data/tcpip-layers.js';
import { router } from '../router.js';

const OSI_TO_TCPIP = {
  1: 1, 2: 1,  // Physical + Data Link → Network Access
  3: 2,         // Network → Internet
  4: 3,         // Transport → Transport
  5: 4, 6: 4, 7: 4  // Session + Presentation + Application → Application
};

export function renderComparison(container) {
  container.innerHTML = `
    <div class="animate-fade-in">
      <h1 class="section-title">OSI vs TCP/IP Model</h1>
      <p class="section-subtitle">Click on any layer to see how the two models correspond. The OSI model has 7 layers while TCP/IP condenses them into 4.</p>

      <div class="comparison-container" id="comparison-view">
        <!-- OSI Column -->
        <div class="comparison-column">
          <h3>OSI Model <span class="badge badge-primary">7 Layers</span></h3>
          ${osiLayers.slice().reverse().map(layer => `
            <div class="comparison-item layer-${layer.number}-bg layer-${layer.number}-text"
                 style="color: #fff;"
                 data-osi="${layer.number}"
                 data-tcpip="${OSI_TO_TCPIP[layer.number]}">
              <div style="font-weight: var(--fw-bold);">${layer.number}. ${layer.name}</div>
              <div style="font-size: var(--fs-xs); opacity: 0.8;">${layer.pdu}</div>
            </div>
          `).join('')}
        </div>

        <!-- Mapping Lines (SVG) -->
        <div class="comparison-lines" id="comparison-lines">
          <svg width="80" height="100%" id="mapping-svg" style="overflow: visible;">
          </svg>
        </div>

        <!-- TCP/IP Column -->
        <div class="comparison-column">
          <h3>TCP/IP Model <span class="badge badge-primary">4 Layers</span></h3>
          ${tcpipLayers.slice().reverse().map(layer => {
            const heights = { 4: 3, 3: 1, 2: 1, 1: 2 }; // Relative heights
            const colors = { 1: 'var(--tcpip-1)', 2: 'var(--tcpip-2)', 3: 'var(--tcpip-3)', 4: 'var(--tcpip-4)' };
            return `
              <div class="comparison-item"
                   style="background: ${colors[layer.number]}; color: #fff; min-height: ${heights[layer.number] * 52 + (heights[layer.number] - 1) * 4}px; display: flex; flex-direction: column; justify-content: center;"
                   data-tcpip-col="${layer.number}">
                <div style="font-weight: var(--fw-bold);">${layer.number}. ${layer.name}</div>
                <div style="font-size: var(--fs-xs); opacity: 0.85;">OSI: ${layer.osiLayerNames.join(', ')}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Detail Panel -->
      <div id="comparison-detail" class="card" style="margin-top: var(--space-xl); display: none;">
        <div id="comparison-detail-content"></div>
      </div>

      <!-- Comparison Table -->
      <div class="card" style="margin-top: var(--space-xl); overflow-x: auto;">
        <h3 style="margin-bottom: var(--space-md);">Key Differences</h3>
        <table>
          <thead>
            <tr style="text-align: left;">
              <th style="padding: var(--space-sm) var(--space-md); border-bottom: 2px solid var(--border-color);">Aspect</th>
              <th style="padding: var(--space-sm) var(--space-md); border-bottom: 2px solid var(--border-color);">OSI Model</th>
              <th style="padding: var(--space-sm) var(--space-md); border-bottom: 2px solid var(--border-color);">TCP/IP Model</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['Layers', '7 layers', '4 layers'],
              ['Development', 'Developed by ISO', 'Developed by DoD/DARPA'],
              ['Approach', 'Theoretical/reference model', 'Practical/implementation model'],
              ['Transport', 'Connection-oriented only', 'Both connection-oriented and connectionless'],
              ['Session/Presentation', 'Separate layers', 'Combined into Application layer'],
              ['Network Access', 'Physical and Data Link separate', 'Combined as Network Access'],
              ['Protocol Independence', 'Generic, protocol-independent', 'Based on standard protocols (TCP, IP)'],
              ['Usage', 'Teaching and reference', 'Real-world implementation'],
            ].map(([aspect, osi, tcpip]) => `
              <tr>
                <td style="padding: var(--space-sm) var(--space-md); border-bottom: 1px solid var(--border-color); font-weight: var(--fw-semibold);">${aspect}</td>
                <td style="padding: var(--space-sm) var(--space-md); border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: var(--fs-sm);">${osi}</td>
                <td style="padding: var(--space-sm) var(--space-md); border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: var(--fs-sm);">${tcpip}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Interactive highlighting
  const osiItems = container.querySelectorAll('[data-osi]');
  const tcpipItems = container.querySelectorAll('[data-tcpip-col]');
  const detailPanel = container.querySelector('#comparison-detail');
  const detailContent = container.querySelector('#comparison-detail-content');

  function clearHighlights() {
    osiItems.forEach(el => el.classList.remove('highlight'));
    tcpipItems.forEach(el => el.classList.remove('highlight'));
  }

  // Click OSI layer → highlight corresponding TCP/IP
  osiItems.forEach(item => {
    item.addEventListener('click', () => {
      clearHighlights();
      const osiNum = parseInt(item.dataset.osi);
      const tcpipNum = parseInt(item.dataset.tcpip);
      item.classList.add('highlight');

      // Highlight all OSI layers mapping to same TCP/IP layer
      osiItems.forEach(el => {
        if (parseInt(el.dataset.tcpip) === tcpipNum) {
          el.classList.add('highlight');
        }
      });

      // Highlight TCP/IP layer
      tcpipItems.forEach(el => {
        if (parseInt(el.dataset.tcpipCol) === tcpipNum) {
          el.classList.add('highlight');
        }
      });

      // Show detail
      const osiLayer = osiLayers.find(l => l.number === osiNum);
      const tcpipLayer = tcpipLayers.find(l => l.number === tcpipNum);
      detailContent.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg);">
          <div>
            <h4 class="layer-${osiNum}-text">OSI Layer ${osiNum}: ${osiLayer.name}</h4>
            <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-top: var(--space-sm);">${osiLayer.description}</p>
            <div class="tag-list" style="margin-top: var(--space-sm);">
              ${osiLayer.keywords.slice(0, 4).map(k => `<span class="tag">${k}</span>`).join('')}
            </div>
            <a href="#/layer/${osiNum}" class="btn btn-sm btn-outline" style="margin-top: var(--space-md);">Explore Layer ${osiNum} &rarr;</a>
          </div>
          <div>
            <h4 style="color: var(--tcpip-${tcpipNum});">TCP/IP Layer ${tcpipNum}: ${tcpipLayer.name}</h4>
            <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-top: var(--space-sm);">${tcpipLayer.description}</p>
            <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: var(--space-sm);">Maps to OSI: ${tcpipLayer.osiLayerNames.join(', ')}</p>
          </div>
        </div>
      `;
      detailPanel.style.display = 'block';
    });
  });

  // Click TCP/IP layer → highlight corresponding OSI
  tcpipItems.forEach(item => {
    item.addEventListener('click', () => {
      clearHighlights();
      const tcpipNum = parseInt(item.dataset.tcpipCol);
      item.classList.add('highlight');

      osiItems.forEach(el => {
        if (parseInt(el.dataset.tcpip) === tcpipNum) {
          el.classList.add('highlight');
        }
      });

      const tcpipLayer = tcpipLayers.find(l => l.number === tcpipNum);
      detailContent.innerHTML = `
        <h4 style="color: var(--tcpip-${tcpipNum});">TCP/IP: ${tcpipLayer.name}</h4>
        <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-top: var(--space-sm);">${tcpipLayer.description}</p>
        <p style="margin-top: var(--space-sm); font-size: var(--fs-sm);"><strong>Corresponds to OSI layers:</strong> ${tcpipLayer.osiLayerNames.join(', ')}</p>
        <div class="tag-list" style="margin-top: var(--space-sm);">
          ${tcpipLayer.keywords.map(k => `<span class="tag">${k}</span>`).join('')}
        </div>
      `;
      detailPanel.style.display = 'block';
    });
  });

  return {};
}
