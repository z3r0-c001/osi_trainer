// Dashboard landing page
import { store } from '../store.js';
import { router } from '../router.js';
import { findFirstIncompleteStep, getOverallPlanProgress } from './planner.js';
import { auth } from '../auth.js';
import { showAuthModal } from '../components/auth-modal.js';

export function renderHome(container) {
  const progress = store.get('progress');
  const scores = store.get('quizScores');
  const overallProgress = store.getOverallProgress();

  container.innerHTML = `
    <div class="animate-fade-in">
      <div style="text-align: center; margin-bottom: var(--space-2xl);">
        <h1 class="section-title" style="font-size: var(--fs-3xl);">Welcome to OSI Trainer</h1>
        <p class="section-subtitle" style="max-width: 600px; margin: var(--space-sm) auto 0;">
          Master the OSI 7-Layer Model and TCP/IP Model through interactive exploration, visualizations, and quizzes.
        </p>
      </div>

      <!-- Progress Overview -->
      <div class="card" style="margin-bottom: var(--space-xl); padding: var(--space-xl);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
          <h2 style="font-size: var(--fs-lg);">Your Progress</h2>
          <span class="badge badge-primary">${overallProgress}%</span>
        </div>
        <div class="progress-bar-container" style="height: 12px;">
          <div class="progress-bar-fill" style="width: ${overallProgress}%;"></div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-top: var(--space-lg);" class="home-stats-grid">
          <div class="stat-card card">
            <div class="stat-value">${progress.layersViewed.length}/7</div>
            <div class="stat-label">Layers Explored</div>
          </div>
          <div class="stat-card card">
            <div class="stat-value">${progress.protocolsViewed.length}</div>
            <div class="stat-label">Protocols Studied</div>
          </div>
          <div class="stat-card card">
            <div class="stat-value">${progress.scenariosCompleted.length}</div>
            <div class="stat-label">Scenarios Done</div>
          </div>
          <div class="stat-card card">
            <div class="stat-value">${progress.quizzesCompleted.length}</div>
            <div class="stat-label">Quizzes Passed</div>
          </div>
        </div>
      </div>

      <!-- Auth CTA -->
      ${!auth.isAuthenticated ? `
        <div class="card" style="margin-bottom: var(--space-xl); padding: var(--space-lg); border-left: 3px solid var(--accent); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:var(--space-md);">
          <div>
            <h3 style="font-size: var(--fs-md); font-weight: var(--fw-semibold); margin-bottom: 2px;">Sync your progress</h3>
            <p style="font-size: var(--fs-sm); color: var(--text-secondary);">Log in to save progress across devices and join classrooms.</p>
          </div>
          <button class="btn btn-primary btn-sm" id="home-login-cta">Log In</button>
        </div>
      ` : ''}

      <!-- Continue Learning Plan -->
      ${(() => {
        const next = findFirstIncompleteStep();
        const planProgress = getOverallPlanProgress();
        if (next) {
          return `
            <div class="card card-clickable" data-nav="/planner/${next.moduleId}/${next.lessonId}" style="margin-bottom: var(--space-xl); padding: var(--space-lg); border-left: 3px solid var(--accent);">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-md);">
                <div>
                  <div style="font-size: var(--fs-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-xs);">Learning Plan</div>
                  <h3 style="font-size: var(--fs-md); font-weight: var(--fw-semibold); margin-bottom: 2px;">Continue: ${next.step.title}</h3>
                  <p style="font-size: var(--fs-sm); color: var(--text-secondary);">${planProgress.done}/${planProgress.total} steps complete</p>
                </div>
                <span class="btn btn-primary btn-sm">Continue</span>
              </div>
              <div class="progress-bar-container" style="height: 4px; margin-top: var(--space-md);">
                <div class="progress-bar-fill" style="width: ${planProgress.percent}%;"></div>
              </div>
            </div>
          `;
        } else if (planProgress.total > 0 && planProgress.done === planProgress.total) {
          return `
            <div class="card" style="margin-bottom: var(--space-xl); padding: var(--space-lg); border-left: 3px solid var(--success, #22c55e);">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-md);">
                <div>
                  <div style="font-size: var(--fs-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-xs);">Learning Plan</div>
                  <h3 style="font-size: var(--fs-md); font-weight: var(--fw-semibold);">All lessons complete!</h3>
                </div>
                <span class="badge badge-success">100%</span>
              </div>
            </div>
          `;
        }
        return `
          <div class="card card-clickable" data-nav="/planner" style="margin-bottom: var(--space-xl); padding: var(--space-lg); border-left: 3px solid var(--accent);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-md);">
              <div>
                <div style="font-size: var(--fs-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-xs);">Learning Plan</div>
                <h3 style="font-size: var(--fs-md); font-weight: var(--fw-semibold);">Start your guided learning path</h3>
                <p style="font-size: var(--fs-sm); color: var(--text-secondary);">5 modules from beginner to mastery</p>
              </div>
              <span class="btn btn-primary btn-sm">Get Started</span>
            </div>
          </div>
        `;
      })()}

      <!-- Quick Navigation -->
      <h2 style="font-size: var(--fs-lg); margin-bottom: var(--space-md);">Start Learning</h2>
      <div class="grid-3 stagger-children" style="margin-bottom: var(--space-xl);">
        <div class="card card-clickable" data-nav="/layers">
          <div style="font-size: 2rem; margin-bottom: var(--space-sm);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <h3 class="card-title">Layer Explorer</h3>
          <p class="card-body">Dive deep into each of the 7 OSI layers with comprehensive content, protocols, and devices.</p>
        </div>

        <div class="card card-clickable" data-nav="/comparison">
          <div style="font-size: 2rem; margin-bottom: var(--space-sm);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <h3 class="card-title">OSI vs TCP/IP</h3>
          <p class="card-body">Compare the OSI and TCP/IP models side by side with interactive mapping visualization.</p>
        </div>

        <div class="card card-clickable" data-nav="/simulator">
          <div style="font-size: 2rem; margin-bottom: var(--space-sm);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h3 class="card-title">Data Flow Simulator</h3>
          <p class="card-body">Watch data travel through all 7 layers with animated encapsulation and decapsulation.</p>
        </div>

        <div class="card card-clickable" data-nav="/encapsulation">
          <div style="font-size: 2rem; margin-bottom: var(--space-sm);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <h3 class="card-title">Encapsulation</h3>
          <p class="card-body">Visualize how data is wrapped with headers at each layer from application to physical.</p>
        </div>

        <div class="card card-clickable" data-nav="/protocols">
          <div style="font-size: 2rem; margin-bottom: var(--space-sm);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h3 class="card-title">Protocol Deep-Dives</h3>
          <p class="card-body">Explore ~30 protocols with header diagrams, animations, and step-by-step explanations.</p>
        </div>

        <div class="card card-clickable" data-nav="/quiz">
          <div style="font-size: 2rem; margin-bottom: var(--space-sm);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3 class="card-title">Quizzes</h3>
          <p class="card-body">Test your knowledge with multiple choice, true/false, matching, and ordering questions.</p>
        </div>
      </div>

      <!-- OSI Layer Quick Reference -->
      <h2 style="font-size: var(--fs-lg); margin-bottom: var(--space-md);">OSI Model Quick Reference</h2>
      <div class="card" style="padding: var(--space-lg);">
        <div class="layer-stack stagger-children" id="home-layer-stack">
          ${[7,6,5,4,3,2,1].map(n => {
            const names = ['','Physical','Data Link','Network','Transport','Session','Presentation','Application'];
            const pdus = ['','Bits','Frames','Packets','Segments','Data','Data','Data'];
            return `
              <div class="layer-stack-item layer-${n}-bg" data-nav="/layer/${n}">
                <span class="layer-num">${n}</span>
                <span class="layer-name">${names[n]}</span>
                <span class="layer-pdu">PDU: ${pdus[n]}</span>
              </div>
            `;
          }).join('')}
        </div>
        <p style="text-align: center; margin-top: var(--space-md); font-size: var(--fs-sm); color: var(--text-muted);">
          Mnemonic: <strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way
        </p>
      </div>
    </div>
  `;

  // Navigation click handlers
  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      router.navigate(el.dataset.nav);
    });
  });

  // Auth CTA
  const loginCta = container.querySelector('#home-login-cta');
  if (loginCta) {
    loginCta.addEventListener('click', () => showAuthModal('login'));
  }

  return {};
}
