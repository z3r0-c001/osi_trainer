// User profile: name, password, 2FA management, join classroom
import { auth } from '../auth.js';
import { api } from '../api.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';

export function renderProfile(container) {
  if (!auth.isAuthenticated) {
    router.navigate('/');
    return {};
  }

  const user = auth.user;

  container.innerHTML = `
    <div class="animate-fade-in" style="max-width: 640px;">
      <h1 class="section-title">Profile</h1>
      <p class="section-subtitle">Manage your account settings</p>

      <!-- Display Name -->
      <div class="card profile-section">
        <h3>Display Name</h3>
        <form id="profile-name-form">
          <div class="profile-field">
            <label for="profile-name">Name</label>
            <input type="text" id="profile-name" value="${escapeAttr(user.displayName)}" maxlength="100" required>
          </div>
          <button type="submit" class="btn btn-primary btn-sm">Save Name</button>
        </form>
      </div>

      <!-- Role -->
      <div class="card profile-section">
        <h3>Account Type</h3>
        <p style="font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          You are currently a <strong>${user.role}</strong>.
        </p>
        ${user.role === 'student' ? `
          <button class="btn btn-outline btn-sm" id="profile-upgrade-teacher">Switch to Teacher</button>
        ` : `
          <button class="btn btn-outline btn-sm" id="profile-downgrade-student">Switch to Student</button>
        `}
      </div>

      <!-- Join Classroom -->
      <div class="card profile-section">
        <h3>Join a Classroom</h3>
        <p style="font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          Enter a 6-character code provided by your teacher.
        </p>
        <form id="profile-join-form" style="display:flex; gap: var(--space-sm); align-items: flex-end;">
          <div class="profile-field" style="flex:1; margin-bottom:0;">
            <label for="profile-join-code">Class Code</label>
            <input type="text" id="profile-join-code" placeholder="ABCDEF" maxlength="6" style="text-transform:uppercase; font-family:'JetBrains Mono',monospace; letter-spacing:0.1em;">
          </div>
          <button type="submit" class="btn btn-primary btn-sm" style="margin-bottom:0;">Join</button>
        </form>
      </div>

      <!-- Change Password -->
      <div class="card profile-section">
        <h3>Change Password</h3>
        <form id="profile-password-form">
          <div class="profile-field">
            <label for="profile-current-pw">Current Password</label>
            <input type="password" id="profile-current-pw" required autocomplete="current-password">
          </div>
          <div class="profile-field">
            <label for="profile-new-pw">New Password</label>
            <input type="password" id="profile-new-pw" required minlength="8" autocomplete="new-password" placeholder="At least 8 characters">
          </div>
          <button type="submit" class="btn btn-primary btn-sm">Change Password</button>
        </form>
      </div>

      <!-- 2FA -->
      <div class="card profile-section">
        <h3>Two-Factor Authentication</h3>
        <p style="font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: var(--space-sm);">
          Method: <strong>${user.tfaMethod === 'totp' ? 'Authenticator App' : user.tfaMethod === 'email' ? 'Email Code' : 'Not set up'}</strong>
        </p>
        <span class="badge ${user.tfaVerified ? 'badge-success' : 'badge-warning'}">${user.tfaVerified ? 'Verified' : 'Not verified'}</span>
      </div>

      <!-- Account Info -->
      <div class="card profile-section" style="opacity:0.7;">
        <p style="font-size: var(--fs-xs); color: var(--text-muted);">
          Email: ${escapeHtml(user.email)} &bull; User ID: ${user.id.substring(0, 8)}...
        </p>
      </div>
    </div>
  `;

  // Name form
  container.querySelector('#profile-name-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = container.querySelector('#profile-name').value.trim();
    if (!name) return;
    try {
      await api.updateProfile({ displayName: name });
      auth.user.displayName = name;
      auth._notify();
      showToast('Name updated', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // Role switch
  const upgradeBtn = container.querySelector('#profile-upgrade-teacher');
  const downgradeBtn = container.querySelector('#profile-downgrade-student');
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', async () => {
      try {
        await api.updateProfile({ role: 'teacher' });
        auth.user.role = 'teacher';
        auth._notify();
        showToast('Switched to teacher', 'success');
        renderProfile(container); // re-render
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }
  if (downgradeBtn) {
    downgradeBtn.addEventListener('click', async () => {
      try {
        await api.updateProfile({ role: 'student' });
        auth.user.role = 'student';
        auth._notify();
        showToast('Switched to student', 'success');
        renderProfile(container);
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  // Join classroom
  container.querySelector('#profile-join-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = container.querySelector('#profile-join-code').value.trim().toUpperCase();
    if (!code || code.length !== 6) {
      showToast('Enter a 6-character code', 'warning');
      return;
    }
    try {
      const data = await api.joinClassroom({ code });
      showToast(data.message || 'Joined classroom!', 'success');
      container.querySelector('#profile-join-code').value = '';
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // Password form
  container.querySelector('#profile-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = container.querySelector('#profile-current-pw').value;
    const newPassword = container.querySelector('#profile-new-pw').value;
    try {
      await api.changePassword({ currentPassword, newPassword });
      showToast('Password changed', 'success');
      container.querySelector('#profile-current-pw').value = '';
      container.querySelector('#profile-new-pw').value = '';
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  return {};
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function escapeAttr(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
