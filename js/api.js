// HTTP client with cookie auth for API calls

const BASE = '/api';

async function request(path, options = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const config = {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE}${path}`, config);

  // Handle 401 — emit session expired event
  if (response.status === 401) {
    window.dispatchEvent(new CustomEvent('auth:session-expired'));
    throw new ApiError('Session expired', 401);
  }

  // Parse response
  const contentType = response.headers.get('Content-Type') || '';
  let data;
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else if (contentType.includes('text/csv')) {
    data = await response.blob();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new ApiError(data?.error || 'Request failed', response.status, data);
  }

  return data;
}

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const api = {
  // Auth
  signup: (body) => request('/auth/signup', { method: 'POST', body }),
  login: (body) => request('/auth/login', { method: 'POST', body }),
  verify2fa: (body) => request('/auth/verify-2fa', { method: 'POST', body }),
  requestEmailOtp: (body) => request('/auth/request-email-otp', { method: 'POST', body }),
  logout: () => request('/auth/logout', { method: 'POST' }),

  // 2FA setup
  setupTotp: () => request('/auth/setup-totp', { method: 'POST' }),
  verifyTotpSetup: (body) => request('/auth/verify-totp-setup', { method: 'POST', body }),
  setupEmailOtp: () => request('/auth/setup-email-otp', { method: 'POST' }),
  verifyEmailSetup: (body) => request('/auth/verify-email-setup', { method: 'POST', body }),

  // Profile
  getProfile: () => request('/user/profile'),
  updateProfile: (body) => request('/user/profile', { method: 'PUT', body }),
  changePassword: (body) => request('/user/password', { method: 'PUT', body }),

  // Progress
  getProgress: () => request('/progress'),
  putProgress: (body) => request('/progress', { method: 'PUT', body }),

  // Classrooms
  createClassroom: (body) => request('/classrooms', { method: 'POST', body }),
  listClassrooms: () => request('/classrooms'),
  getClassroom: (id) => request(`/classrooms/${id}`),
  updateClassroom: (id, body) => request(`/classrooms/${id}`, { method: 'PUT', body }),
  deleteClassroom: (id) => request(`/classrooms/${id}`, { method: 'DELETE' }),
  joinClassroom: (body) => request('/classrooms/join', { method: 'POST', body }),
  removeMember: (classroomId, userId) => request(`/classrooms/${classroomId}/members/${userId}`, { method: 'DELETE' }),
  getClassroomStats: (id) => request(`/classrooms/${id}/stats`),
  exportClassroom: (id) => request(`/classrooms/${id}/export`),

  // Health
  health: () => request('/health')
};
