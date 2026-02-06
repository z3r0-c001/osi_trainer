// Classroom CRUD, join, stats, CSV export
import { json, parseBody } from '../router.js';
import { generateJoinCode } from '../services/crypto.js';
import { queries } from '../db/queries.js';

export async function handleCreateClassroom(reqCtx) {
  if (reqCtx.user.role !== 'teacher') {
    return json({ error: 'Only teachers can create classrooms' }, 403);
  }

  const body = await parseBody(reqCtx.request);
  if (!body || !body.name) {
    return json({ error: 'Classroom name is required' }, 400);
  }

  if (body.name.length > 100) {
    return json({ error: 'Name must be 100 characters or less' }, 400);
  }

  const id = crypto.randomUUID();
  const joinCode = generateJoinCode();

  await queries.createClassroom(reqCtx.env.DB, {
    id,
    teacherId: reqCtx.user.id,
    name: body.name.trim(),
    description: (body.description || '').substring(0, 500),
    joinCode
  }).run();

  return json({ id, joinCode, name: body.name.trim() }, 201);
}

export async function handleListClassrooms(reqCtx) {
  const user = reqCtx.user;
  let classrooms;

  if (user.role === 'teacher') {
    const result = await queries.getTeacherClassrooms(reqCtx.env.DB, user.id).all();
    classrooms = result.results || [];
    // Add member counts
    for (const c of classrooms) {
      const count = await queries.getClassroomMemberCount(reqCtx.env.DB, c.id).first();
      c.memberCount = count?.count || 0;
    }
  } else {
    const result = await queries.getStudentClassrooms(reqCtx.env.DB, user.id).all();
    classrooms = result.results || [];
  }

  return json({ classrooms });
}

export async function handleGetClassroom(reqCtx) {
  const { id } = reqCtx.params;
  const classroom = await queries.getClassroom(reqCtx.env.DB, id).first();
  if (!classroom) {
    return json({ error: 'Classroom not found' }, 404);
  }

  const user = reqCtx.user;
  const isTeacher = classroom.teacher_id === user.id;
  const isStudent = !isTeacher;

  if (isStudent) {
    // Verify membership
    const membership = await queries.getMembership(reqCtx.env.DB, id, user.id).first();
    if (!membership) {
      return json({ error: 'Not a member of this classroom' }, 403);
    }
  }

  const response = {
    id: classroom.id,
    name: classroom.name,
    description: classroom.description,
    joinCode: isTeacher ? classroom.join_code : undefined,
    isTeacher,
    createdAt: classroom.created_at
  };

  if (isTeacher) {
    const members = await queries.getClassroomMembers(reqCtx.env.DB, id).all();
    response.students = (members.results || []).map(m => ({
      id: m.student_id,
      displayName: m.display_name,
      email: m.email,
      joinedAt: m.joined_at
    }));
  }

  return json(response);
}

export async function handleUpdateClassroom(reqCtx) {
  const { id } = reqCtx.params;
  const classroom = await queries.getClassroom(reqCtx.env.DB, id).first();
  if (!classroom) {
    return json({ error: 'Classroom not found' }, 404);
  }
  if (classroom.teacher_id !== reqCtx.user.id) {
    return json({ error: 'Not authorized' }, 403);
  }

  const body = await parseBody(reqCtx.request);
  if (!body) return json({ error: 'Invalid request body' }, 400);

  await queries.updateClassroom(reqCtx.env.DB, id, {
    name: (body.name || classroom.name).substring(0, 100),
    description: (body.description !== undefined ? body.description : classroom.description || '').substring(0, 500),
    maxStudents: body.maxStudents || classroom.max_students
  }).run();

  return json({ ok: true });
}

export async function handleDeleteClassroom(reqCtx) {
  const { id } = reqCtx.params;
  const classroom = await queries.getClassroom(reqCtx.env.DB, id).first();
  if (!classroom) {
    return json({ error: 'Classroom not found' }, 404);
  }
  if (classroom.teacher_id !== reqCtx.user.id) {
    return json({ error: 'Not authorized' }, 403);
  }

  await queries.deactivateClassroom(reqCtx.env.DB, id).run();
  return json({ ok: true });
}

export async function handleJoinClassroom(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body || !body.code) {
    return json({ error: 'Join code is required' }, 400);
  }

  const classroom = await queries.getClassroomByCode(reqCtx.env.DB, body.code.toUpperCase()).first();
  if (!classroom) {
    return json({ error: 'Invalid join code' }, 404);
  }

  // Check if already a member
  const existing = await queries.getMembership(reqCtx.env.DB, classroom.id, reqCtx.user.id).first();
  if (existing) {
    return json({ error: 'Already a member of this classroom' }, 409);
  }

  // Check capacity
  const count = await queries.getClassroomMemberCount(reqCtx.env.DB, classroom.id).first();
  if ((count?.count || 0) >= classroom.max_students) {
    return json({ error: 'Classroom is full' }, 409);
  }

  await queries.joinClassroom(reqCtx.env.DB, {
    id: crypto.randomUUID(),
    classroomId: classroom.id,
    studentId: reqCtx.user.id
  }).run();

  return json({
    classroomId: classroom.id,
    name: classroom.name,
    message: `Joined "${classroom.name}" successfully`
  });
}

export async function handleRemoveMember(reqCtx) {
  const { id, userId } = reqCtx.params;
  const classroom = await queries.getClassroom(reqCtx.env.DB, id).first();
  if (!classroom) {
    return json({ error: 'Classroom not found' }, 404);
  }

  const isTeacher = classroom.teacher_id === reqCtx.user.id;
  const isSelf = userId === reqCtx.user.id;

  if (!isTeacher && !isSelf) {
    return json({ error: 'Not authorized' }, 403);
  }

  await queries.removeMember(reqCtx.env.DB, id, userId).run();
  return json({ ok: true });
}

export async function handleClassroomStats(reqCtx) {
  const { id } = reqCtx.params;
  const classroom = await queries.getClassroom(reqCtx.env.DB, id).first();
  if (!classroom || classroom.teacher_id !== reqCtx.user.id) {
    return json({ error: 'Not authorized' }, 403);
  }

  const result = await queries.getClassroomProgress(reqCtx.env.DB, id).all();
  const students = (result.results || []).map(row => {
    const progress = row.progress_data ? JSON.parse(row.progress_data) : {};
    const scores = row.quiz_scores ? JSON.parse(row.quiz_scores) : {};
    return {
      displayName: row.display_name,
      email: row.email,
      progress,
      quizScores: scores,
      lastActive: row.updated_at
    };
  });

  // Aggregate stats
  const totalStudents = students.length;
  const totalItems = 7 + 25 + 5 + 8;
  const avgProgress = totalStudents > 0
    ? Math.round(students.reduce((sum, s) => {
        const p = s.progress;
        const completed = (p.layersViewed?.length || 0) + (p.protocolsViewed?.length || 0) +
          (p.scenariosCompleted?.length || 0) + (p.quizzesCompleted?.length || 0);
        return sum + (completed / totalItems) * 100;
      }, 0) / totalStudents)
    : 0;

  return json({ students, stats: { totalStudents, avgProgress } });
}

export async function handleClassroomExport(reqCtx) {
  const { id } = reqCtx.params;
  const classroom = await queries.getClassroom(reqCtx.env.DB, id).first();
  if (!classroom || classroom.teacher_id !== reqCtx.user.id) {
    return json({ error: 'Not authorized' }, 403);
  }

  const result = await queries.getClassroomProgress(reqCtx.env.DB, id).all();
  const rows = result.results || [];

  // Build CSV
  const headers = ['Student Name', 'Email', 'Layers Viewed', 'Protocols Viewed', 'Scenarios Done', 'Quizzes Done', 'Overall %', 'Last Active'];
  const csvRows = [headers.join(',')];
  const totalItems = 7 + 25 + 5 + 8;

  for (const row of rows) {
    const progress = row.progress_data ? JSON.parse(row.progress_data) : {};
    const layers = progress.layersViewed?.length || 0;
    const protocols = progress.protocolsViewed?.length || 0;
    const scenarios = progress.scenariosCompleted?.length || 0;
    const quizzes = progress.quizzesCompleted?.length || 0;
    const overall = Math.round(((layers + protocols + scenarios + quizzes) / totalItems) * 100);

    csvRows.push([
      `"${(row.display_name || '').replace(/"/g, '""')}"`,
      `"${(row.email || '').replace(/"/g, '""')}"`,
      layers,
      protocols,
      scenarios,
      quizzes,
      overall,
      `"${row.updated_at || 'Never'}"`
    ].join(','));
  }

  return new Response(csvRows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${classroom.name}-progress.csv"`
    }
  });
}
