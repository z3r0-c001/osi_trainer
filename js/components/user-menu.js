// User menu: header dropdown (profile, logout, classroom)
import { auth } from '../auth.js';
import { router } from '../router.js';
import { showAuthModal } from './auth-modal.js';

export function renderUserMenu(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'user-menu-wrapper';
  wrapper.id = 'user-menu-wrapper';
  container.appendChild(wrapper);

  function update() {
    if (auth.isAuthenticated) {
      const user = auth.user;
      const initials = (user.displayName || user.email || '?').substring(0, 2).toUpperCase();
      wrapper.innerHTML = `
        <button class="user-menu-trigger" aria-label="User menu" aria-haspopup="true">
          <span class="user-avatar">${initials}</span>
        </button>
        <div class="user-menu-dropdown" role="menu">
          <div class="user-menu-header">
            <div class="user-menu-name">${escapeHtml(user.displayName)}</div>
            <div class="user-menu-email">${escapeHtml(user.email)}</div>
          </div>
          <div class="user-menu-divider"></div>
          <a href="#/profile" class="user-menu-item" role="menuitem">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Profile
          </a>
          ${user.role === 'teacher' ? `
            <a href="#/dashboard" class="user-menu-item" role="menuitem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Teacher Dashboard
            </a>
          ` : ''}
          <div class="user-menu-divider"></div>
          <button class="user-menu-item user-menu-logout" role="menuitem">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log Out
          </button>
        </div>
      `;

      // Toggle dropdown
      const trigger = wrapper.querySelector('.user-menu-trigger');
      const dropdown = wrapper.querySelector('.user-menu-dropdown');

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });

      // Close on outside click
      document.addEventListener('click', () => {
        dropdown.classList.remove('active');
      });

      // Close on menu item click
      dropdown.querySelectorAll('.user-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          dropdown.classList.remove('active');
        });
      });

      // Logout
      wrapper.querySelector('.user-menu-logout').addEventListener('click', async () => {
        await auth.logout();
      });
    } else {
      wrapper.innerHTML = `
        <button class="btn btn-primary btn-sm user-login-btn">Log In</button>
      `;
      wrapper.querySelector('.user-login-btn').addEventListener('click', () => {
        showAuthModal('login');
      });
    }
  }

  // Listen for auth state changes
  auth.onChange(update);
  update();

  return wrapper;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
