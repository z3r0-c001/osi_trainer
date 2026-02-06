// Bootstrap, route registration, init
import { router } from './router.js';
import { store } from './store.js';
import { initTheme, createThemeToggle } from './theme.js';
import { renderSidebar, updateSidebarProgress } from './components/sidebar.js';
import { renderSearchBar } from './components/search-bar.js';
import { renderUserMenu } from './components/user-menu.js';
import { auth } from './auth.js';
import { initSync } from './sync.js';
import { showAuthModal } from './components/auth-modal.js';

// View imports
import { renderHome } from './views/home.js';
import { renderLayerExplorer, renderLayerDetail } from './views/layer-explorer.js';
import { renderComparison } from './views/comparison.js';
import { renderDataFlow } from './views/data-flow.js';
import { renderEncapsulation } from './views/encapsulation.js';
import { renderProtocolDeepDive, renderProtocolDetail } from './views/protocol-deep-dive.js';
import { renderDeviceGallery } from './views/device-gallery.js';
import { renderScenarios } from './views/scenarios.js';
import { renderQuiz, renderQuizTarget } from './views/quiz.js';
import { renderGlossary } from './views/glossary.js';
import { renderPlanner, renderPlannerModule, renderPlannerLesson } from './views/planner.js';
import { renderProfile } from './views/profile.js';
import { renderTeacherDashboard } from './views/teacher-dashboard.js';

function init() {
  const app = document.getElementById('app');

  // Render sidebar
  renderSidebar(app);

  // Setup main content area
  const main = document.querySelector('.main-content');
  const headerLeft = main.querySelector('.main-header-left');
  const headerRight = main.querySelector('.main-header-right');

  // Search bar in header
  renderSearchBar(headerLeft);

  // Theme toggle in header
  headerRight.appendChild(createThemeToggle());

  // User menu in header
  renderUserMenu(headerRight);

  // Mobile menu toggle
  const menuBtn = main.querySelector('.menu-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  menuBtn.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('mobile-open');
    overlay.classList.toggle('active');
  });
  overlay.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('mobile-open');
    overlay.classList.remove('active');
  });

  // Initialize theme
  initTheme();

  // View container
  const viewContainer = main.querySelector('.view-container');
  router.setContainer(viewContainer);

  // Register routes
  router.on('/', renderHome);
  router.on('/layers', renderLayerExplorer);
  router.on('/layer/:num', renderLayerDetail);
  router.on('/comparison', renderComparison);
  router.on('/simulator', renderDataFlow);
  router.on('/encapsulation', renderEncapsulation);
  router.on('/protocols', renderProtocolDeepDive);
  router.on('/protocol/:id', renderProtocolDetail);
  router.on('/devices', renderDeviceGallery);
  router.on('/scenarios', renderScenarios);
  router.on('/quiz', renderQuiz);
  router.on('/quiz/:target', renderQuizTarget);
  router.on('/glossary', renderGlossary);
  router.on('/planner', renderPlanner);
  router.on('/planner/:moduleId', renderPlannerModule);
  router.on('/planner/:moduleId/:lessonId', renderPlannerLesson);
  router.on('/profile', requireAuth(renderProfile));
  router.on('/dashboard', requireAuth(renderTeacherDashboard));

  // Update sidebar progress after each navigation
  router.afterEach(() => {
    const progress = store.getOverallProgress();
    updateSidebarProgress(progress);
  });

  // Close mobile sidebar on navigation
  router.beforeEach(() => {
    document.getElementById('sidebar').classList.remove('mobile-open');
    overlay.classList.remove('active');
  });

  // Start router
  router.start();

  // Initial progress update
  updateSidebarProgress(store.getOverallProgress());

  // Initialize auth — check existing session
  auth.checkSession();

  // Initialize progress sync
  initSync();

  // Listen for session expiry
  window.addEventListener('auth:session-expired', () => {
    showAuthModal('login');
  });
}

// Route guard: requires auth, shows modal if not logged in
function requireAuth(handler) {
  return (container, params) => {
    if (!auth.isAuthenticated) {
      showAuthModal('login');
      router.navigate('/');
      return {};
    }
    return handler(container, params);
  };
}

document.addEventListener('DOMContentLoaded', init);
