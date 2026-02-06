// Real-world scenario walkthroughs
import { scenarios } from '../data/scenarios.js';
import { store } from '../store.js';
import { router } from '../router.js';

const SCENARIO_ICONS = {
  globe: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  mail: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  file: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  video: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  chat: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
};

export function renderScenarios(container) {
  let activeScenario = null;
  let activeStep = 0;

  function render() {
    if (activeScenario === null) {
      renderScenarioList();
    } else {
      renderScenarioWalkthrough();
    }
  }

  function renderScenarioList() {
    container.innerHTML = `
      <div class="animate-fade-in">
        <h1 class="section-title">Real-World Scenarios</h1>
        <p class="section-subtitle">Walk through common networking scenarios step by step, seeing how data flows through the OSI layers.</p>

        <div class="grid-2 stagger-children">
          ${scenarios.map((s, i) => {
            const isCompleted = store.get('progress').scenariosCompleted.includes(s.id);
            return `
              <div class="card card-clickable" data-scenario="${i}">
                <div style="display: flex; align-items: start; gap: var(--space-md);">
                  <div style="color: var(--accent); flex-shrink: 0;">
                    ${SCENARIO_ICONS[s.icon] || SCENARIO_ICONS.globe}
                  </div>
                  <div style="flex: 1;">
                    <h3 class="card-title">${s.title}</h3>
                    <p class="card-body" style="margin-top: var(--space-xs);">${s.description}</p>
                    <div style="margin-top: var(--space-sm); display: flex; gap: var(--space-sm); align-items: center;">
                      <span class="badge badge-primary">${s.steps.length} steps</span>
                      ${isCompleted ? '<span class="badge badge-success">Completed</span>' : ''}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('[data-scenario]').forEach(el => {
      el.addEventListener('click', () => {
        activeScenario = parseInt(el.dataset.scenario);
        activeStep = 0;
        render();
      });
    });
  }

  function renderScenarioWalkthrough() {
    const scenario = scenarios[activeScenario];
    const step = scenario.steps[activeStep];
    const totalSteps = scenario.steps.length;

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Breadcrumb -->
        <div class="breadcrumb" style="margin-bottom: var(--space-lg);">
          <span class="breadcrumb-item"><a href="#" id="back-to-list">Scenarios</a></span>
          <span class="breadcrumb-sep"></span>
          <span class="breadcrumb-item">${scenario.title}</span>
        </div>

        <h1 class="section-title">${scenario.title}</h1>
        <p class="section-subtitle">${scenario.description}</p>

        <!-- Progress -->
        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-xl);">
          <span style="font-size: var(--fs-sm); color: var(--text-muted);">Step ${activeStep + 1} of ${totalSteps}</span>
          <div class="progress-bar-container" style="flex: 1; height: 6px;">
            <div class="progress-bar-fill" style="width: ${((activeStep + 1) / totalSteps) * 100}%;"></div>
          </div>
        </div>

        <!-- Step display -->
        <div class="card" style="padding: var(--space-xl); margin-bottom: var(--space-lg);">
          <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
            <span class="badge layer-${step.layer}-bg" style="color: #fff; font-size: var(--fs-sm); padding: var(--space-xs) var(--space-md);">
              Layer ${step.layer}: ${step.layerName}
            </span>
            <span style="font-size: var(--fs-xs); color: var(--text-muted);">
              Direction: ${step.direction === 'down' ? '⬇ Down (Encapsulation)' : step.direction === 'up' ? '⬆ Up (Decapsulation)' : '↔ Across (Transmission)'}
            </span>
          </div>

          <h3 style="margin-bottom: var(--space-sm);">${step.title}</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--space-lg);">${step.description}</p>

          <!-- Protocols used -->
          ${step.protocols && step.protocols.length > 0 ? `
            <div style="margin-bottom: var(--space-md);">
              <h5 style="font-size: var(--fs-xs); color: var(--text-muted); margin-bottom: var(--space-xs);">Protocols involved:</h5>
              <div class="tag-list">
                ${step.protocols.map(p => `<a href="#/protocol/${p}" class="tag" style="color: var(--accent); cursor: pointer;">${p.toUpperCase()}</a>`).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Technical details -->
          ${step.details && step.details.length > 0 ? `
            <div style="background: var(--bg-primary); border-radius: var(--border-radius); padding: var(--space-md); margin-top: var(--space-md);">
              <h5 style="font-size: var(--fs-xs); color: var(--text-muted); margin-bottom: var(--space-sm);">Technical Details:</h5>
              <ul style="font-size: var(--fs-sm); color: var(--text-secondary);">
                ${step.details.map(d => `<li style="margin-bottom: 4px; padding-left: var(--space-sm); border-left: 2px solid var(--layer-${step.layer}); margin-left: var(--space-xs);">${d}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- Mini layer stack showing which layer is active -->
        <div class="card" style="padding: var(--space-md); margin-bottom: var(--space-lg);">
          <div style="display: flex; gap: 4px;">
            ${[7,6,5,4,3,2,1].map(n => `
              <div style="flex: 1; padding: var(--space-xs); text-align: center; border-radius: var(--border-radius-sm); font-size: 10px; font-weight: var(--fw-bold); color: #fff; opacity: ${n === step.layer ? 1 : 0.3}; transition: opacity 0.3s;" class="layer-${n}-bg">
                L${n}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Navigation -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn-outline" id="step-prev" ${activeStep === 0 ? 'disabled style="opacity:0.5;pointer-events:none;"' : ''}>
            &larr; Previous
          </button>
          <div class="step-indicator">
            ${scenario.steps.map((_, i) => `
              <span class="step-dot ${i < activeStep ? 'completed' : ''} ${i === activeStep ? 'active' : ''}"></span>
            `).join('')}
          </div>
          ${activeStep < totalSteps - 1 ? `
            <button class="btn btn-primary" id="step-next">Next &rarr;</button>
          ` : `
            <button class="btn btn-primary" id="step-finish" style="background: var(--success);">Complete</button>
          `}
        </div>
      </div>
    `;

    // Back to list
    container.querySelector('#back-to-list').addEventListener('click', (e) => {
      e.preventDefault();
      activeScenario = null;
      render();
    });

    // Step navigation
    const prevBtn = container.querySelector('#step-prev');
    if (prevBtn && activeStep > 0) {
      prevBtn.addEventListener('click', () => { activeStep--; render(); });
    }

    const nextBtn = container.querySelector('#step-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => { activeStep++; render(); });
    }

    const finishBtn = container.querySelector('#step-finish');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        store.markScenarioCompleted(scenario.id);
        activeScenario = null;
        render();
      });
    }
  }

  render();
  return {};
}
