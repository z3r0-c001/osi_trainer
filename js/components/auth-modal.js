// Auth modal: login, signup, 2FA choice, TOTP setup (QR), email OTP verify, 2FA verify
import { auth } from '../auth.js';
import { generateQrSvg } from '../qr.js';

let modalEl = null;
let currentScreen = 'login';
let totpData = null; // { totpUri, secret, backupCodes }

export function showAuthModal(screen = 'login') {
  currentScreen = screen;
  if (!modalEl) {
    createModal();
  }
  renderScreen();
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function hideAuthModal() {
  if (modalEl) {
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function createModal() {
  modalEl = document.createElement('div');
  modalEl.className = 'modal-backdrop auth-modal-backdrop';
  modalEl.innerHTML = `<div class="modal auth-modal"><div class="auth-modal-content"></div></div>`;
  document.body.appendChild(modalEl);

  // Close on backdrop click (not on modal itself)
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) hideAuthModal();
  });
}

function renderScreen() {
  const content = modalEl.querySelector('.auth-modal-content');

  switch (currentScreen) {
    case 'login':
      content.innerHTML = renderLogin();
      bindLogin(content);
      break;
    case 'signup':
      content.innerHTML = renderSignup();
      bindSignup(content);
      break;
    case '2fa-choice':
      content.innerHTML = render2faChoice();
      bind2faChoice(content);
      break;
    case 'totp-setup':
      content.innerHTML = renderTotpSetup();
      bindTotpSetup(content);
      break;
    case 'email-otp-verify':
      content.innerHTML = renderEmailOtpVerify();
      bindEmailOtpVerify(content);
      break;
    case '2fa-verify':
      content.innerHTML = render2faVerify();
      bind2faVerify(content);
      break;
  }
}

function setError(content, msg) {
  const errEl = content.querySelector('.auth-error');
  if (errEl) {
    errEl.textContent = msg;
    errEl.style.display = msg ? 'block' : 'none';
  }
}

function setLoading(content, loading) {
  const btn = content.querySelector('.auth-submit');
  if (btn) {
    btn.disabled = loading;
    btn.textContent = loading ? 'Please wait...' : btn.dataset.label;
  }
}

// ─── Login Screen ─────────────────────────────────────
function renderLogin() {
  return `
    <div class="modal-header">
      <h2 class="modal-title">Log In</h2>
      <button class="modal-close auth-close">&times;</button>
    </div>
    <div class="auth-error" style="display:none;"></div>
    <form class="auth-form" autocomplete="on">
      <div class="auth-field">
        <label for="auth-email">Email</label>
        <input type="email" id="auth-email" required autocomplete="email" placeholder="you@example.com">
      </div>
      <div class="auth-field">
        <label for="auth-password">Password</label>
        <input type="password" id="auth-password" required autocomplete="current-password" placeholder="Your password">
      </div>
      <button type="submit" class="btn btn-primary btn-lg auth-submit" data-label="Log In" style="width:100%;">Log In</button>
    </form>
    <div class="auth-switch">
      Don't have an account? <a href="#" class="auth-link" data-screen="signup">Sign Up</a>
    </div>
  `;
}

function bindLogin(content) {
  content.querySelector('.auth-close').addEventListener('click', hideAuthModal);
  content.querySelector('.auth-link').addEventListener('click', (e) => {
    e.preventDefault();
    currentScreen = 'signup';
    renderScreen();
  });

  content.querySelector('.auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = content.querySelector('#auth-email').value;
    const password = content.querySelector('#auth-password').value;

    setError(content, '');
    setLoading(content, true);

    try {
      const data = await auth.login({ email, password });
      if (data.requiresTfa) {
        currentScreen = '2fa-verify';
        renderScreen();
      } else if (data.requiresTfaSetup) {
        currentScreen = data.tfaMethod ? (data.tfaMethod === 'totp' ? 'totp-setup' : 'email-otp-verify') : '2fa-choice';
        renderScreen();
      }
    } catch (err) {
      setLoading(content, false);
      setError(content, err.message || 'Login failed');
    }
  });
}

// ─── Signup Screen ────────────────────────────────────
function renderSignup() {
  return `
    <div class="modal-header">
      <h2 class="modal-title">Create Account</h2>
      <button class="modal-close auth-close">&times;</button>
    </div>
    <div class="auth-error" style="display:none;"></div>
    <form class="auth-form" autocomplete="on">
      <div class="auth-field">
        <label for="auth-name">Display Name</label>
        <input type="text" id="auth-name" required autocomplete="name" placeholder="Your name" maxlength="100">
      </div>
      <div class="auth-field">
        <label for="auth-email">Email</label>
        <input type="email" id="auth-email" required autocomplete="email" placeholder="you@example.com">
      </div>
      <div class="auth-field">
        <label for="auth-password">Password</label>
        <input type="password" id="auth-password" required autocomplete="new-password" placeholder="At least 8 characters" minlength="8">
      </div>
      <div class="auth-field">
        <label for="auth-role">I am a</label>
        <select id="auth-role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-lg auth-submit" data-label="Create Account" style="width:100%;">Create Account</button>
    </form>
    <div class="auth-switch">
      Already have an account? <a href="#" class="auth-link" data-screen="login">Log In</a>
    </div>
  `;
}

function bindSignup(content) {
  content.querySelector('.auth-close').addEventListener('click', hideAuthModal);
  content.querySelector('.auth-link').addEventListener('click', (e) => {
    e.preventDefault();
    currentScreen = 'login';
    renderScreen();
  });

  content.querySelector('.auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const displayName = content.querySelector('#auth-name').value;
    const email = content.querySelector('#auth-email').value;
    const password = content.querySelector('#auth-password').value;
    const role = content.querySelector('#auth-role').value;

    setError(content, '');
    setLoading(content, true);

    try {
      await auth.signup({ email, password, displayName, role });
      currentScreen = '2fa-choice';
      renderScreen();
    } catch (err) {
      setLoading(content, false);
      setError(content, err.message || 'Signup failed');
    }
  });
}

// ─── 2FA Choice Screen ────────────────────────────────
function render2faChoice() {
  return `
    <div class="modal-header">
      <h2 class="modal-title">Set Up 2FA</h2>
    </div>
    <p class="auth-subtitle">Two-factor authentication is required to protect your account. Choose your preferred method:</p>
    <div class="auth-error" style="display:none;"></div>
    <div class="auth-2fa-options">
      <button class="card card-clickable auth-2fa-option" data-method="totp">
        <div class="auth-2fa-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12" y2="18"/>
          </svg>
        </div>
        <h3>Authenticator App</h3>
        <p>Use Google Authenticator, Authy, or similar apps to generate codes.</p>
      </button>
      <button class="card card-clickable auth-2fa-option" data-method="email">
        <div class="auth-2fa-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <h3>Email Code</h3>
        <p>Receive a 6-digit code via email each time you log in.</p>
      </button>
    </div>
  `;
}

function bind2faChoice(content) {
  content.querySelectorAll('.auth-2fa-option').forEach(btn => {
    btn.addEventListener('click', async () => {
      const method = btn.dataset.method;
      setError(content, '');

      try {
        if (method === 'totp') {
          totpData = await auth.setupTotp();
          currentScreen = 'totp-setup';
        } else {
          await auth.setupEmailOtp();
          currentScreen = 'email-otp-verify';
        }
        renderScreen();
      } catch (err) {
        setError(content, err.message || 'Failed to set up 2FA');
      }
    });
  });
}

// ─── TOTP Setup Screen ────────────────────────────────
function renderTotpSetup() {
  const qrSvg = totpData ? generateQrSvg(totpData.totpUri) : '';
  const secret = totpData?.secret || '';
  const backupCodes = totpData?.backupCodes || [];

  return `
    <div class="modal-header">
      <h2 class="modal-title">Set Up Authenticator</h2>
    </div>
    <div class="auth-error" style="display:none;"></div>
    <div class="auth-totp-steps">
      <div class="auth-totp-step">
        <span class="auth-step-num">1</span>
        <p>Scan this QR code with your authenticator app:</p>
      </div>
      <div class="auth-qr-container">${qrSvg}</div>
      <div class="auth-totp-step">
        <span class="auth-step-num">2</span>
        <p>Or enter this key manually:</p>
      </div>
      <div class="auth-secret-display">
        <code>${secret.match(/.{1,4}/g)?.join(' ') || secret}</code>
      </div>
      <div class="auth-totp-step">
        <span class="auth-step-num">3</span>
        <p>Enter the 6-digit code from your app to verify:</p>
      </div>
      <form class="auth-form">
        <div class="auth-field">
          <input type="text" id="auth-totp-code" required placeholder="000000" maxlength="6" pattern="[0-9]{6}" inputmode="numeric" autocomplete="one-time-code" class="auth-otp-input">
        </div>
        <button type="submit" class="btn btn-primary btn-lg auth-submit" data-label="Verify & Continue" style="width:100%;">Verify & Continue</button>
      </form>
      <details class="auth-backup-codes" style="margin-top: var(--space-md);">
        <summary>Save backup codes (important!)</summary>
        <p class="auth-subtitle">Store these codes safely. Each can be used once if you lose your authenticator:</p>
        <div class="auth-backup-grid">
          ${backupCodes.map(c => `<code>${c}</code>`).join('')}
        </div>
      </details>
    </div>
  `;
}

function bindTotpSetup(content) {
  content.querySelector('.auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = content.querySelector('#auth-totp-code').value;

    setError(content, '');
    setLoading(content, true);

    try {
      await auth.verifyTotpSetup(code);
      hideAuthModal();
    } catch (err) {
      setLoading(content, false);
      setError(content, err.message || 'Invalid code. Try again.');
    }
  });
}

// ─── Email OTP Verify Screen ──────────────────────────
function renderEmailOtpVerify() {
  return `
    <div class="modal-header">
      <h2 class="modal-title">Verify Email</h2>
    </div>
    <p class="auth-subtitle">We've sent a 6-digit code to your email. Enter it below to complete setup:</p>
    <div class="auth-error" style="display:none;"></div>
    <form class="auth-form">
      <div class="auth-field">
        <input type="text" id="auth-otp-code" required placeholder="000000" maxlength="6" pattern="[0-9]{6}" inputmode="numeric" autocomplete="one-time-code" class="auth-otp-input">
      </div>
      <button type="submit" class="btn btn-primary btn-lg auth-submit" data-label="Verify" style="width:100%;">Verify</button>
    </form>
    <div class="auth-switch">
      Didn't receive it? <a href="#" class="auth-resend">Resend code</a>
    </div>
  `;
}

function bindEmailOtpVerify(content) {
  content.querySelector('.auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = content.querySelector('#auth-otp-code').value;

    setError(content, '');
    setLoading(content, true);

    try {
      await auth.verifyEmailSetup(code);
      hideAuthModal();
    } catch (err) {
      setLoading(content, false);
      setError(content, err.message || 'Invalid code');
    }
  });

  content.querySelector('.auth-resend').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await auth.requestEmailOtp('setup');
      setError(content, '');
      const resendEl = content.querySelector('.auth-resend');
      resendEl.textContent = 'Code sent!';
      setTimeout(() => { resendEl.textContent = 'Resend code'; }, 3000);
    } catch (err) {
      setError(content, err.message || 'Failed to resend');
    }
  });
}

// ─── 2FA Verify Screen (login) ────────────────────────
function render2faVerify() {
  const method = auth.pendingTfaMethod;
  const isEmail = method === 'email';

  return `
    <div class="modal-header">
      <h2 class="modal-title">Two-Factor Verification</h2>
    </div>
    <p class="auth-subtitle">${isEmail
      ? 'Enter the 6-digit code sent to your email:'
      : 'Enter the 6-digit code from your authenticator app:'
    }</p>
    <div class="auth-error" style="display:none;"></div>
    <form class="auth-form">
      <div class="auth-field">
        <input type="text" id="auth-2fa-code" required placeholder="000000" maxlength="6" pattern="[0-9a-fA-F]{6,8}" inputmode="numeric" autocomplete="one-time-code" class="auth-otp-input">
      </div>
      <button type="submit" class="btn btn-primary btn-lg auth-submit" data-label="Verify" style="width:100%;">Verify</button>
    </form>
    ${isEmail ? `
      <div class="auth-switch">
        Didn't receive it? <a href="#" class="auth-resend">Resend code</a>
      </div>
    ` : `
      <div class="auth-switch">
        Lost your authenticator? <a href="#" class="auth-backup-link">Use a backup code</a>
      </div>
    `}
  `;
}

function bind2faVerify(content) {
  content.querySelector('.auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = content.querySelector('#auth-2fa-code').value;

    setError(content, '');
    setLoading(content, true);

    try {
      await auth.verify2fa(code);
      hideAuthModal();
    } catch (err) {
      setLoading(content, false);
      setError(content, err.message || 'Invalid code');
    }
  });

  const resendBtn = content.querySelector('.auth-resend');
  if (resendBtn) {
    resendBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await auth.requestEmailOtp('login');
        resendBtn.textContent = 'Code sent!';
        setTimeout(() => { resendBtn.textContent = 'Resend code'; }, 3000);
      } catch (err) {
        setError(content, err.message || 'Failed to resend');
      }
    });
  }

  const backupLink = content.querySelector('.auth-backup-link');
  if (backupLink) {
    backupLink.addEventListener('click', (e) => {
      e.preventDefault();
      const input = content.querySelector('#auth-2fa-code');
      input.placeholder = 'Enter backup code';
      input.pattern = '[0-9a-fA-F]{8}';
      input.maxLength = 8;
      backupLink.parentElement.innerHTML = '<span style="color: var(--text-muted);">Enter one of your 8-character backup codes above.</span>';
    });
  }
}
