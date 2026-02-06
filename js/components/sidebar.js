// Sidebar navigation component
import { router } from '../router.js';
import { auth } from '../auth.js';

const NAV_ITEMS = [
  {
    section: 'Learn',
    items: [
      { label: 'Dashboard', icon: 'home', route: '/' },
      { label: 'Lesson Planner', icon: 'map', route: '/planner' },
      { label: 'Layer Explorer', icon: 'layers', route: '/layers' },
      { label: 'OSI vs TCP/IP', icon: 'compare', route: '/comparison' },
      { label: 'Data Flow Simulator', icon: 'activity', route: '/simulator' },
      { label: 'Encapsulation', icon: 'package', route: '/encapsulation' },
    ]
  },
  {
    section: 'Reference',
    items: [
      { label: 'Protocols', icon: 'file-text', route: '/protocols' },
      { label: 'Devices', icon: 'cpu', route: '/devices' },
      { label: 'Scenarios', icon: 'play-circle', route: '/scenarios' },
    ]
  },
  {
    section: 'Practice',
    items: [
      { label: 'Quiz', icon: 'check-circle', route: '/quiz' },
      { label: 'Glossary', icon: 'book', route: '/glossary' },
    ]
  }
];

const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  compare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'package': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  'file-text': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  'play-circle': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  'check-circle': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`
};

export function renderSidebar(container) {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="logo">
        <svg viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="var(--accent)"/>
          <path d="M8 8h16v3H8zM8 13h16v3H8zM8 18h16v3H8zM8 23h16v3H8z" fill="white" opacity="0.9"/>
          <path d="M8 13h16v3H8z" fill="white"/>
          <path d="M8 18h16v3H8z" fill="white" opacity="0.7"/>
        </svg>
      </div>
      <div>
        <h1>OSI Trainer</h1>
        <span class="subtitle">Network Models Interactive Guide</span>
      </div>
    </div>
    <nav class="sidebar-nav" id="sidebar-nav"></nav>
    <div class="sidebar-footer">
      <div class="progress-bar-container">
        <div class="progress-bar-fill" id="global-progress" style="width: 0%"></div>
      </div>
      <div style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: var(--space-xs); text-align: center;">
        <span id="progress-text">0%</span> complete
      </div>
    </div>
  `;

  const nav = sidebar.querySelector('#sidebar-nav');
  NAV_ITEMS.forEach(section => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'nav-section';
    sectionEl.innerHTML = `<div class="nav-section-title">${section.section}</div>`;
    section.items.forEach(item => {
      const link = document.createElement('a');
      link.className = 'nav-item';
      link.href = `#${item.route}`;
      link.dataset.route = item.route;
      link.innerHTML = `
        <span class="nav-icon">${ICONS[item.icon] || ''}</span>
        <span>${item.label}</span>
      `;
      sectionEl.appendChild(link);
    });
    nav.appendChild(sectionEl);
  });

  container.prepend(sidebar);

  // Render auth-dependent nav items
  function renderAuthNav() {
    let authSection = nav.querySelector('#sidebar-auth-section');
    if (authSection) authSection.remove();

    if (auth.isAuthenticated) {
      authSection = document.createElement('div');
      authSection.className = 'nav-section';
      authSection.id = 'sidebar-auth-section';
      authSection.innerHTML = `<div class="nav-section-title">Account</div>`;

      const items = [
        { label: 'Profile', icon: 'profile', route: '/profile' }
      ];

      if (auth.user?.role === 'teacher') {
        items.push({ label: 'Teacher Dashboard', icon: 'dashboard', route: '/dashboard' });
      }

      const AUTH_ICONS = {
        profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
      };

      for (const item of items) {
        const link = document.createElement('a');
        link.className = 'nav-item';
        link.href = `#${item.route}`;
        link.dataset.route = item.route;
        link.innerHTML = `
          <span class="nav-icon">${AUTH_ICONS[item.icon] || ''}</span>
          <span>${item.label}</span>
        `;
        authSection.appendChild(link);
      }

      nav.appendChild(authSection);
    }

    updateActive();
  }

  auth.onChange(renderAuthNav);
  renderAuthNav();

  // Update active state on navigation
  function updateActive() {
    const hash = window.location.hash.slice(1) || '/';
    nav.querySelectorAll('.nav-item').forEach(item => {
      const route = item.dataset.route;
      const isActive = hash === route || (route !== '/' && hash.startsWith(route));
      item.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('hashchange', updateActive);
  updateActive();

  return sidebar;
}

export function updateSidebarProgress(percent) {
  const bar = document.getElementById('global-progress');
  const text = document.getElementById('progress-text');
  if (bar) bar.style.width = `${percent}%`;
  if (text) text.textContent = `${percent}%`;
}
