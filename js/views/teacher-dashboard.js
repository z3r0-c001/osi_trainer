// Teacher dashboard: classroom management, student progress, stats, CSV export
import { auth } from '../auth.js';
import { api } from '../api.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';

export function renderTeacherDashboard(container) {
  if (!auth.isAuthenticated || auth.user.role !== 'teacher') {
    router.navigate('/');
    return {};
  }

  container.innerHTML = `
    <div class="animate-fade-in teacher-dashboard">
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:var(--space-md); margin-bottom:var(--space-xl);">
        <div>
          <h1 class="section-title">Teacher Dashboard</h1>
          <p class="section-subtitle" style="margin-bottom:0;">Manage classrooms and track student progress</p>
        </div>
        <button class="btn btn-primary" id="create-classroom-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Classroom
        </button>
      </div>

      <div id="create-classroom-form" style="display:none;" class="card" style="margin-bottom:var(--space-lg);">
        <h3 style="margin-bottom:var(--space-md);">Create Classroom</h3>
        <form id="new-classroom-form">
          <div class="profile-field">
            <label for="classroom-name">Name</label>
            <input type="text" id="classroom-name" required maxlength="100" placeholder="e.g. Network Fundamentals — Fall 2026">
          </div>
          <div class="profile-field">
            <label for="classroom-desc">Description (optional)</label>
            <input type="text" id="classroom-desc" maxlength="500" placeholder="Brief description">
          </div>
          <div style="display:flex; gap:var(--space-sm);">
            <button type="submit" class="btn btn-primary btn-sm">Create</button>
            <button type="button" class="btn btn-secondary btn-sm" id="cancel-create">Cancel</button>
          </div>
        </form>
      </div>

      <div id="classrooms-list">
        <div class="empty-state"><p>Loading classrooms...</p></div>
      </div>
    </div>
  `;

  // Toggle create form
  const createBtn = container.querySelector('#create-classroom-btn');
  const createForm = container.querySelector('#create-classroom-form');
  createBtn.addEventListener('click', () => {
    createForm.style.display = createForm.style.display === 'none' ? 'block' : 'none';
  });
  container.querySelector('#cancel-create').addEventListener('click', () => {
    createForm.style.display = 'none';
  });

  // Create classroom
  container.querySelector('#new-classroom-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = container.querySelector('#classroom-name').value.trim();
    const description = container.querySelector('#classroom-desc').value.trim();
    if (!name) return;

    try {
      const data = await api.createClassroom({ name, description });
      showToast(`Classroom created! Code: ${data.joinCode}`, 'success', 5000);
      createForm.style.display = 'none';
      container.querySelector('#classroom-name').value = '';
      container.querySelector('#classroom-desc').value = '';
      loadClassrooms();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // Load classrooms
  async function loadClassrooms() {
    const listEl = container.querySelector('#classrooms-list');
    try {
      const data = await api.listClassrooms();
      if (!data.classrooms || data.classrooms.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state">
            <p>No classrooms yet. Create one to get started!</p>
          </div>
        `;
        return;
      }

      listEl.innerHTML = data.classrooms.map(c => `
        <div class="card classroom-card" style="margin-bottom:var(--space-md); padding:var(--space-lg);" data-id="${c.id}">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:var(--space-sm);">
            <div>
              <h3 style="font-size:var(--fs-lg); font-weight:var(--fw-semibold);">${escapeHtml(c.name)}</h3>
              ${c.description ? `<p style="font-size:var(--fs-sm); color:var(--text-secondary);">${escapeHtml(c.description)}</p>` : ''}
            </div>
            <div style="display:flex; align-items:center; gap:var(--space-md);">
              <span class="badge badge-primary">${c.memberCount || 0} students</span>
              <span class="classroom-join-code">${c.join_code}</span>
            </div>
          </div>
          <div style="display:flex; gap:var(--space-sm); margin-top:var(--space-md);">
            <button class="btn btn-sm btn-primary view-stats-btn" data-id="${c.id}">View Progress</button>
            <button class="btn btn-sm btn-outline export-btn" data-id="${c.id}" data-name="${escapeAttr(c.name)}">Export CSV</button>
            <button class="btn btn-sm btn-outline delete-btn" data-id="${c.id}" style="margin-left:auto;">Delete</button>
          </div>
        </div>
      `).join('');

      // Bind classroom actions
      listEl.querySelectorAll('.view-stats-btn').forEach(btn => {
        btn.addEventListener('click', () => loadStats(btn.dataset.id));
      });

      listEl.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', () => exportCsv(btn.dataset.id, btn.dataset.name));
      });

      listEl.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Delete this classroom? Students will be removed.')) return;
          try {
            await api.deleteClassroom(btn.dataset.id);
            showToast('Classroom deleted', 'success');
            loadClassrooms();
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      });
    } catch (err) {
      listEl.innerHTML = `<div class="empty-state"><p>Failed to load classrooms</p></div>`;
    }
  }

  // Load stats for a classroom
  async function loadStats(classroomId) {
    const listEl = container.querySelector('#classrooms-list');
    try {
      const data = await api.getClassroomStats(classroomId);
      const { students, stats } = data;

      // Find the classroom card and expand it with stats
      const card = listEl.querySelector(`[data-id="${classroomId}"]`);
      let statsEl = card.querySelector('.classroom-stats');
      if (statsEl) {
        statsEl.remove();
        return; // toggle off
      }

      statsEl = document.createElement('div');
      statsEl.className = 'classroom-stats';
      statsEl.style.marginTop = 'var(--space-lg)';
      statsEl.style.borderTop = '1px solid var(--border-color)';
      statsEl.style.paddingTop = 'var(--space-lg)';

      if (students.length === 0) {
        statsEl.innerHTML = '<p style="color:var(--text-muted); font-size:var(--fs-sm);">No students have joined yet.</p>';
      } else {
        statsEl.innerHTML = `
          <div style="display:flex; gap:var(--space-lg); margin-bottom:var(--space-md);">
            <div class="stat-card card" style="flex:1; padding:var(--space-md);">
              <div class="stat-value">${stats.totalStudents}</div>
              <div class="stat-label">Students</div>
            </div>
            <div class="stat-card card" style="flex:1; padding:var(--space-md);">
              <div class="stat-value">${stats.avgProgress}%</div>
              <div class="stat-label">Avg Progress</div>
            </div>
          </div>
          <table class="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Layers</th>
                <th>Protocols</th>
                <th>Scenarios</th>
                <th>Quizzes</th>
                <th>Overall</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(s => {
                const p = s.progress || {};
                const layers = p.layersViewed?.length || 0;
                const protocols = p.protocolsViewed?.length || 0;
                const scenarios = p.scenariosCompleted?.length || 0;
                const quizzes = p.quizzesCompleted?.length || 0;
                const overall = Math.round(((layers + protocols + scenarios + quizzes) / 45) * 100);
                return `
                  <tr>
                    <td><strong>${escapeHtml(s.displayName)}</strong><br><span style="font-size:var(--fs-xs);color:var(--text-muted);">${escapeHtml(s.email)}</span></td>
                    <td>${layers}/7</td>
                    <td>${protocols}/25</td>
                    <td>${scenarios}/5</td>
                    <td>${quizzes}/8</td>
                    <td><span class="badge ${overall >= 80 ? 'badge-success' : overall >= 40 ? 'badge-primary' : 'badge-warning'}">${overall}%</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `;
      }

      card.appendChild(statsEl);
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  // Export CSV
  async function exportCsv(classroomId, classroomName) {
    try {
      const blob = await api.exportClassroom(classroomId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${classroomName}-progress.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('CSV downloaded', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  loadClassrooms();
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
