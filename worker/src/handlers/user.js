// User profile handlers
import { json, parseBody } from '../router.js';
import { hashPassword, verifyPassword } from '../services/password.js';
import { queries } from '../db/queries.js';

export async function handleGetProfile(reqCtx) {
  const user = reqCtx.user;

  // Get classrooms
  let classrooms = [];
  if (user.role === 'teacher') {
    const result = await queries.getTeacherClassrooms(reqCtx.env.DB, user.id).all();
    classrooms = result.results || [];
  } else {
    const result = await queries.getStudentClassrooms(reqCtx.env.DB, user.id).all();
    classrooms = result.results || [];
  }

  return json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      tfaMethod: user.tfaMethod,
      tfaVerified: !!user.tfaVerified
    },
    classrooms
  });
}

export async function handleUpdateProfile(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body) return json({ error: 'Invalid request body' }, 400);

  const { displayName, role } = body;

  if (displayName !== undefined) {
    if (!displayName.trim() || displayName.length > 100) {
      return json({ error: 'Display name must be 1-100 characters' }, 400);
    }
    await queries.updateUser(reqCtx.env.DB, reqCtx.user.id, {
      displayName: displayName.trim()
    }).run();
  }

  if (role !== undefined && (role === 'teacher' || role === 'student')) {
    await queries.updateUserRole(reqCtx.env.DB, reqCtx.user.id, role).run();
  }

  return json({ ok: true });
}

export async function handleChangePassword(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body) return json({ error: 'Invalid request body' }, 400);

  const { currentPassword, newPassword } = body;
  if (!currentPassword || !newPassword) {
    return json({ error: 'Current and new passwords are required' }, 400);
  }
  if (newPassword.length < 8) {
    return json({ error: 'New password must be at least 8 characters' }, 400);
  }

  // Verify current password
  const user = await queries.getUserById(reqCtx.env.DB, reqCtx.user.id).first();
  const pepper = reqCtx.env.PASSWORD_PEPPER || '';
  const valid = await verifyPassword(currentPassword, user.password_hash, pepper);
  if (!valid) {
    return json({ error: 'Current password is incorrect' }, 401);
  }

  // Hash new password
  const newHash = await hashPassword(newPassword, pepper);
  await queries.updatePassword(reqCtx.env.DB, reqCtx.user.id, newHash).run();

  // Invalidate other sessions
  await queries.deleteUserSessions(reqCtx.env.DB, reqCtx.user.id, reqCtx.session.id).run();

  return json({ ok: true, message: 'Password changed. Other sessions have been logged out.' });
}
