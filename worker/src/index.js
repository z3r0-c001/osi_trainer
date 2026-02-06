// Worker entry point: route dispatch
import { Router, json } from './router.js';
import { corsMiddleware, withCors } from './middleware/cors.js';
import { authMiddleware } from './middleware/auth.js';
import { rateLimitMiddleware } from './middleware/rate-limit.js';

// Handlers
import { handleSignup, handleLogin, handleVerify2fa, handleLogout } from './handlers/auth.js';
import { handleSetupTotp, handleVerifyTotpSetup } from './handlers/totp.js';
import { handleRequestEmailOtp, handleSetupEmailOtp, handleVerifyEmailSetup } from './handlers/email-otp.js';
import { handleGetProgress, handlePutProgress } from './handlers/progress.js';
import { handleGetProfile, handleUpdateProfile, handleChangePassword } from './handlers/user.js';
import {
  handleCreateClassroom, handleListClassrooms, handleGetClassroom,
  handleUpdateClassroom, handleDeleteClassroom, handleJoinClassroom,
  handleRemoveMember, handleClassroomStats, handleClassroomExport
} from './handlers/classroom.js';

const router = new Router();

// Global middleware
router.use(corsMiddleware);
router.use(rateLimitMiddleware);
router.use(authMiddleware);

// Health check
router.get('/api/health', () => json({ ok: true }));

// Auth (public — allowed by authMiddleware)
router.post('/api/auth/signup', handleSignup);
router.post('/api/auth/login', handleLogin);
router.post('/api/auth/verify-2fa', handleVerify2fa);
router.post('/api/auth/request-email-otp', handleRequestEmailOtp);

// Auth (authenticated)
router.post('/api/auth/logout', handleLogout);
router.post('/api/auth/setup-totp', handleSetupTotp);
router.post('/api/auth/verify-totp-setup', handleVerifyTotpSetup);
router.post('/api/auth/setup-email-otp', handleSetupEmailOtp);
router.post('/api/auth/verify-email-setup', handleVerifyEmailSetup);

// Progress
router.get('/api/progress', handleGetProgress);
router.put('/api/progress', handlePutProgress);

// User
router.get('/api/user/profile', handleGetProfile);
router.put('/api/user/profile', handleUpdateProfile);
router.put('/api/user/password', handleChangePassword);

// Classrooms (static routes before parameterized routes)
router.post('/api/classrooms', handleCreateClassroom);
router.get('/api/classrooms', handleListClassrooms);
router.post('/api/classrooms/join', handleJoinClassroom);
router.get('/api/classrooms/:id', handleGetClassroom);
router.put('/api/classrooms/:id', handleUpdateClassroom);
router.delete('/api/classrooms/:id', handleDeleteClassroom);
router.delete('/api/classrooms/:id/members/:userId', handleRemoveMember);
router.get('/api/classrooms/:id/stats', handleClassroomStats);
router.get('/api/classrooms/:id/export', handleClassroomExport);

export default {
  async fetch(request, env, ctx) {
    try {
      const response = await router.handle(request, env, ctx);
      // Add CORS headers in dev
      const origin = request.headers.get('Origin');
      if (origin) {
        return withCors(response, origin);
      }
      return response;
    } catch (err) {
      console.error('Worker error:', err.stack || err.message || err);
      return json({ error: 'Internal server error', detail: err.message }, 500);
    }
  }
};
