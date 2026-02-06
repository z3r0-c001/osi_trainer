// Prepared statement helpers for D1

export const queries = {
  // Users
  createUser: (db, { id, email, displayName, passwordHash, role }) =>
    db.prepare(
      'INSERT INTO users (id, email, display_name, password_hash, role) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, email, displayName, passwordHash, role),

  getUserByEmail: (db, email) =>
    db.prepare('SELECT * FROM users WHERE email = ?').bind(email),

  getUserById: (db, id) =>
    db.prepare('SELECT * FROM users WHERE id = ?').bind(id),

  updateUser: (db, id, { displayName }) =>
    db.prepare(
      'UPDATE users SET display_name = ?, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind(displayName, id),

  updatePassword: (db, id, passwordHash) =>
    db.prepare(
      'UPDATE users SET password_hash = ?, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind(passwordHash, id),

  updateTfaMethod: (db, id, method) =>
    db.prepare(
      'UPDATE users SET tfa_method = ?, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind(method, id),

  setTfaVerified: (db, id) =>
    db.prepare(
      'UPDATE users SET tfa_verified = 1, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind(id),

  updateUserRole: (db, id, role) =>
    db.prepare(
      'UPDATE users SET role = ?, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind(role, id),

  // Sessions
  createSession: (db, { id, userId, expiresAt, ipAddress, userAgent }) =>
    db.prepare(
      'INSERT INTO sessions (id, user_id, expires_at, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, userId, expiresAt, ipAddress, userAgent),

  getSession: (db, id) =>
    db.prepare(
      'SELECT s.*, u.email, u.display_name, u.role, u.tfa_method, u.tfa_verified FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = ? AND s.expires_at > datetime(\'now\')'
    ).bind(id),

  deleteSession: (db, id) =>
    db.prepare('DELETE FROM sessions WHERE id = ?').bind(id),

  deleteUserSessions: (db, userId, exceptId) =>
    db.prepare('DELETE FROM sessions WHERE user_id = ? AND id != ?').bind(userId, exceptId),

  deleteExpiredSessions: (db) =>
    db.prepare('DELETE FROM sessions WHERE expires_at <= datetime(\'now\')'),

  // TOTP
  saveTotpSecret: (db, { userId, secret, backupCodes }) =>
    db.prepare(
      'INSERT OR REPLACE INTO totp_secrets (user_id, secret, backup_codes) VALUES (?, ?, ?)'
    ).bind(userId, secret, backupCodes),

  getTotpSecret: (db, userId) =>
    db.prepare('SELECT * FROM totp_secrets WHERE user_id = ?').bind(userId),

  // Email OTP
  createEmailOtp: (db, { id, userId, code, purpose, expiresAt }) =>
    db.prepare(
      'INSERT INTO email_otps (id, user_id, code, purpose, expires_at) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, userId, code, purpose, expiresAt),

  getActiveEmailOtp: (db, userId, purpose) =>
    db.prepare(
      'SELECT * FROM email_otps WHERE user_id = ? AND purpose = ? AND used = 0 AND expires_at > datetime(\'now\') ORDER BY created_at DESC LIMIT 1'
    ).bind(userId, purpose),

  markEmailOtpUsed: (db, id) =>
    db.prepare('UPDATE email_otps SET used = 1 WHERE id = ?').bind(id),

  // Progress
  getProgress: (db, userId) =>
    db.prepare('SELECT * FROM user_progress WHERE user_id = ?').bind(userId),

  upsertProgress: (db, { userId, progressData, quizScores, version }) =>
    db.prepare(
      'INSERT INTO user_progress (user_id, progress_data, quiz_scores, version, updated_at) VALUES (?, ?, ?, ?, datetime(\'now\')) ON CONFLICT(user_id) DO UPDATE SET progress_data = ?, quiz_scores = ?, version = ?, updated_at = datetime(\'now\')'
    ).bind(userId, progressData, quizScores, version, progressData, quizScores, version),

  // Classrooms
  createClassroom: (db, { id, teacherId, name, description, joinCode }) =>
    db.prepare(
      'INSERT INTO classrooms (id, teacher_id, name, description, join_code) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, teacherId, name, description, joinCode),

  getClassroom: (db, id) =>
    db.prepare('SELECT * FROM classrooms WHERE id = ? AND is_active = 1').bind(id),

  getClassroomByCode: (db, code) =>
    db.prepare('SELECT * FROM classrooms WHERE join_code = ? AND is_active = 1').bind(code),

  getTeacherClassrooms: (db, teacherId) =>
    db.prepare('SELECT * FROM classrooms WHERE teacher_id = ? AND is_active = 1 ORDER BY created_at DESC').bind(teacherId),

  getStudentClassrooms: (db, studentId) =>
    db.prepare(
      'SELECT c.* FROM classrooms c JOIN classroom_memberships cm ON c.id = cm.classroom_id WHERE cm.student_id = ? AND cm.removed_at IS NULL AND c.is_active = 1 ORDER BY cm.joined_at DESC'
    ).bind(studentId),

  updateClassroom: (db, id, { name, description, maxStudents }) =>
    db.prepare(
      'UPDATE classrooms SET name = ?, description = ?, max_students = ? WHERE id = ?'
    ).bind(name, description, maxStudents, id),

  deactivateClassroom: (db, id) =>
    db.prepare('UPDATE classrooms SET is_active = 0 WHERE id = ?').bind(id),

  // Memberships
  joinClassroom: (db, { id, classroomId, studentId }) =>
    db.prepare(
      'INSERT INTO classroom_memberships (id, classroom_id, student_id) VALUES (?, ?, ?)'
    ).bind(id, classroomId, studentId),

  getClassroomMembers: (db, classroomId) =>
    db.prepare(
      'SELECT cm.*, u.display_name, u.email FROM classroom_memberships cm JOIN users u ON cm.student_id = u.id WHERE cm.classroom_id = ? AND cm.removed_at IS NULL ORDER BY cm.joined_at'
    ).bind(classroomId),

  getClassroomMemberCount: (db, classroomId) =>
    db.prepare(
      'SELECT COUNT(*) as count FROM classroom_memberships WHERE classroom_id = ? AND removed_at IS NULL'
    ).bind(classroomId),

  removeMember: (db, classroomId, studentId) =>
    db.prepare(
      'UPDATE classroom_memberships SET removed_at = datetime(\'now\') WHERE classroom_id = ? AND student_id = ? AND removed_at IS NULL'
    ).bind(classroomId, studentId),

  getMembership: (db, classroomId, studentId) =>
    db.prepare(
      'SELECT * FROM classroom_memberships WHERE classroom_id = ? AND student_id = ? AND removed_at IS NULL'
    ).bind(classroomId, studentId),

  // Stats
  getClassroomProgress: (db, classroomId) =>
    db.prepare(
      'SELECT u.display_name, u.email, up.progress_data, up.quiz_scores, up.updated_at FROM classroom_memberships cm JOIN users u ON cm.student_id = u.id LEFT JOIN user_progress up ON cm.student_id = up.user_id WHERE cm.classroom_id = ? AND cm.removed_at IS NULL ORDER BY u.display_name'
    ).bind(classroomId)
};
