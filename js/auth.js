// Auth state machine
// States: anonymous → awaiting-2fa / awaiting-2fa-setup → authenticated
import { api, ApiError } from './api.js';

class AuthManager {
  constructor() {
    this.state = 'anonymous'; // anonymous | awaiting-2fa | awaiting-2fa-setup | authenticated
    this.user = null;
    this._pendingUserId = null;
    this._pendingTfaMethod = null;
    this.listeners = new Set();
  }

  // Subscribe to auth state changes
  onChange(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  _notify() {
    for (const fn of this.listeners) {
      fn(this.state, this.user);
    }
  }

  _setState(state, user = this.user) {
    this.state = state;
    this.user = user;
    this._notify();
  }

  get isAuthenticated() {
    return this.state === 'authenticated' && this.user !== null;
  }

  // Check existing session on app load
  async checkSession() {
    try {
      const data = await api.getProfile();
      this._setState('authenticated', data.user);
      return true;
    } catch {
      this._setState('anonymous', null);
      return false;
    }
  }

  // Sign up
  async signup({ email, password, displayName, role }) {
    const data = await api.signup({ email, password, displayName, role });
    this._pendingUserId = data.userId;
    this._pendingTfaMethod = null;
    this._setState('awaiting-2fa-setup');
    return data;
  }

  // Log in
  async login({ email, password }) {
    const data = await api.login({ email, password });
    this._pendingUserId = data.userId;

    if (data.requiresTfa) {
      this._pendingTfaMethod = data.tfaMethod;
      this._setState('awaiting-2fa');

      // Auto-send email OTP if method is email
      if (data.tfaMethod === 'email') {
        await api.requestEmailOtp({ userId: data.userId });
      }
      return data;
    }

    if (data.requiresTfaSetup) {
      this._pendingTfaMethod = data.tfaMethod || null;
      this._setState('awaiting-2fa-setup');
      return data;
    }

    // No 2FA required (shouldn't happen in normal flow)
    this._setState('awaiting-2fa-setup');
    return data;
  }

  // Verify 2FA code (during login)
  async verify2fa(code) {
    const data = await api.verify2fa({
      userId: this._pendingUserId,
      code,
      method: this._pendingTfaMethod
    });
    this._pendingUserId = null;
    this._pendingTfaMethod = null;
    this._setState('authenticated', data.user);
    window.dispatchEvent(new CustomEvent('auth:login'));
    return data;
  }

  // Set up TOTP
  async setupTotp() {
    return await api.setupTotp();
  }

  // Verify TOTP setup (confirm user can generate valid codes)
  async verifyTotpSetup(code) {
    const result = await api.verifyTotpSetup({ code });
    // After verifying TOTP setup, create session
    const data = await api.verify2fa({
      userId: this._pendingUserId,
      code,
      method: 'totp'
    });
    this._pendingUserId = null;
    this._pendingTfaMethod = 'totp';
    this._setState('authenticated', data.user);
    window.dispatchEvent(new CustomEvent('auth:login'));
    return data;
  }

  // Set up email OTP
  async setupEmailOtp() {
    return await api.setupEmailOtp();
  }

  // Verify email OTP setup
  async verifyEmailSetup(code) {
    const result = await api.verifyEmailSetup({ code });
    // After verifying email setup, create session
    const data = await api.verify2fa({
      userId: this._pendingUserId,
      code,
      method: 'email'
    });
    this._pendingUserId = null;
    this._pendingTfaMethod = 'email';
    this._setState('authenticated', data.user);
    window.dispatchEvent(new CustomEvent('auth:login'));
    return data;
  }

  // Request email OTP resend
  async requestEmailOtp(purpose = 'login') {
    return await api.requestEmailOtp({ userId: this._pendingUserId, purpose });
  }

  // Log out
  async logout() {
    try {
      await api.logout();
    } catch {
      // Ignore errors — clear local state regardless
    }
    this._pendingUserId = null;
    this._pendingTfaMethod = null;
    this._setState('anonymous', null);
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }

  get pendingUserId() {
    return this._pendingUserId;
  }

  get pendingTfaMethod() {
    return this._pendingTfaMethod;
  }
}

export const auth = new AuthManager();
