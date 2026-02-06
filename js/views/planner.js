// Lesson Planner views — module list, lesson list, step checklist
import { store } from '../store.js';
import { router } from '../router.js';
import { learningPlan } from '../data/learning-plan.js';

// --- Helpers ---

function getStepComplete(step) {
  const p = store.get('progress');
  switch (step.trackType) {
    case 'layer': return p.layersViewed.includes(step.trackId);
    case 'protocol': return p.protocolsViewed.includes(step.trackId);
    case 'scenario': return p.scenariosCompleted.includes(step.trackId);
    case 'quiz': return p.quizzesCompleted.includes(step.trackId);
    default: return false;
  }
}

function getLessonProgress(lesson) {
  const tracked = lesson.steps.filter(s => s.trackType !== null);
  if (tracked.length === 0) return { done: 0, total: 0, percent: 100 };
  const done = tracked.filter(getStepComplete).length;
  return { done, total: tracked.length, percent: Math.round((done / tracked.length) * 100) };
}

function getModuleProgress(mod) {
  const lessons = mod.lessons.map(getLessonProgress);
  const done = lessons.reduce((s, l) => s + l.done, 0);
  const total = lessons.reduce((s, l) => s + l.total, 0);
  return { done, total, percent: total ? Math.round((done / total) * 100) : 100 };
}

function getOverallPlanProgress() {
  let done = 0, total = 0;
  for (const mod of learningPlan.modules) {
    const p = getModuleProgress(mod);
    done += p.done;
    total += p.total;
  }
  return { done, total, percent: total ? Math.round((done / total) * 100) : 100 };
}

function findFirstIncompleteStep() {
  for (const mod of learningPlan.modules) {
    for (const lesson of mod.lessons) {
      for (const step of lesson.steps) {
        if (step.trackType !== null && !getStepComplete(step)) {
          return { moduleId: mod.id, lessonId: lesson.id, step };
        }
      }
    }
  }
  return null;
}

const DIFFICULTY_COLORS = {
  'beginner': 'var(--success, #22c55e)',
  'beginner-int': 'var(--accent, #3b82f6)',
  'intermediate': 'var(--accent, #3b82f6)',
  'advanced': '#a855f7',
  'assessment': 'var(--warning, #f59e0b)'
};

const DIFFICULTY_LABELS = {
  'beginner': 'Beginner',
  'beginner-int': 'Beginner-Int',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced',
  'assessment': 'Assessment'
};

const TYPE_LABELS = {
  explore: 'Explore',
  quiz: 'Quiz',
  scenario: 'Scenario'
};

function difficultyBadge(difficulty) {
  const color = DIFFICULTY_COLORS[difficulty] || 'var(--text-muted)';
  const label = DIFFICULTY_LABELS[difficulty] || difficulty;
  return `<span class="difficulty-badge" style="--diff-color: ${color}">${label}</span>`;
}

function typeBadge(type) {
  return `<span class="badge badge-primary" style="font-size: var(--fs-xs);">${TYPE_LABELS[type] || type}</span>`;
}

// --- renderPlanner: Module list ---

export function renderPlanner(container) {
  const overall = getOverallPlanProgress();
  const next = findFirstIncompleteStep();

  container.innerHTML = `
    <div class="animate-fade-in">
      <div style="text-align: center; margin-bottom: var(--space-xl);">
        <h1 class="section-title">Lesson Planner</h1>
        <p class="section-subtitle" style="max-width: 600px; margin: var(--space-sm) auto 0;">
          A guided path through all content — from networking fundamentals to mastery. All content is always freely accessible.
        </p>
      </div>

      <div class="card" style="margin-bottom: var(--space-xl); padding: var(--space-lg);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md); flex-wrap: wrap; gap: var(--space-sm);">
          <h2 style="font-size: var(--fs-lg);">Overall Progress</h2>
          <div style="display: flex; align-items: center; gap: var(--space-md); flex-wrap: wrap;">
            <span class="badge badge-primary">${overall.done}/${overall.total} steps</span>
            ${next ? `<a href="#/planner/${next.moduleId}/${next.lessonId}" class="btn btn-primary btn-sm">Continue Learning</a>` : '<span class="badge badge-success">All Complete!</span>'}
          </div>
        </div>
        <div class="progress-bar-container" style="height: 10px;">
          <div class="progress-bar-fill" style="width: ${overall.percent}%;"></div>
        </div>
      </div>

      <div class="grid-2 stagger-children" id="planner-modules">
        ${learningPlan.modules.map((mod, i) => {
          const mp = getModuleProgress(mod);
          const lessonCount = mod.lessons.length;
          const isComplete = mp.percent === 100 && mp.total > 0;
          return `
            <div class="card card-clickable" data-nav="/planner/${mod.id}">
              <div class="module-card-header">
                <span style="font-size: var(--fs-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Module ${i + 1}</span>
                ${difficultyBadge(mod.difficulty)}
              </div>
              <h3 class="card-title" style="margin: var(--space-sm) 0 var(--space-xs);">${mod.title}</h3>
              <p class="card-body" style="margin-bottom: var(--space-md);">${mod.description}</p>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-sm); font-size: var(--fs-sm); color: var(--text-secondary);">
                <span>${lessonCount} lesson${lessonCount !== 1 ? 's' : ''}</span>
                <span>${isComplete ? 'Complete' : `${mp.done}/${mp.total} steps`}</span>
              </div>
              <div class="progress-bar-container" style="height: 6px;">
                <div class="progress-bar-fill" style="width: ${mp.percent}%;${isComplete ? ' background: var(--success, #22c55e);' : ''}"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => router.navigate(el.dataset.nav));
  });

  return {};
}

// --- renderPlannerModule: Lesson list ---

export function renderPlannerModule(container, { moduleId }) {
  const mod = learningPlan.modules.find(m => m.id === moduleId);
  if (!mod) { router.navigate('/planner'); return {}; }

  const mp = getModuleProgress(mod);
  const modIndex = learningPlan.modules.indexOf(mod);

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="breadcrumb" style="margin-bottom: var(--space-lg);">
        <span class="breadcrumb-item"><a href="#/planner">Lesson Planner</a></span>
        <span class="breadcrumb-sep"></span>
        <span class="breadcrumb-item">${mod.title}</span>
      </div>

      <div style="margin-bottom: var(--space-xl);">
        <div class="module-card-header" style="margin-bottom: var(--space-sm);">
          <span style="font-size: var(--fs-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Module ${modIndex + 1}</span>
          ${difficultyBadge(mod.difficulty)}
        </div>
        <h1 class="section-title">${mod.title}</h1>
        <p class="section-subtitle" style="margin-bottom: var(--space-md);">${mod.description}</p>
        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-sm); flex-wrap: wrap;">
          <span class="badge badge-primary">${mp.done}/${mp.total} steps complete</span>
        </div>
        <div class="progress-bar-container" style="height: 8px; max-width: 400px;">
          <div class="progress-bar-fill" style="width: ${mp.percent}%;"></div>
        </div>
      </div>

      <div class="stagger-children" style="display: flex; flex-direction: column; gap: var(--space-md);">
        ${mod.lessons.map((lesson, li) => {
          const lp = getLessonProgress(lesson);
          const isComplete = lp.percent === 100 && lp.total > 0;
          return `
            <div class="card card-clickable" data-nav="/planner/${mod.id}/${lesson.id}">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-sm);">
                <div style="display: flex; align-items: center; gap: var(--space-md);">
                  <div class="step-icon ${isComplete ? 'completed' : ''}" style="flex-shrink: 0;">
                    ${isComplete
                      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'
                      : `<span>${li + 1}</span>`}
                  </div>
                  <div>
                    <h3 style="font-size: var(--fs-md); font-weight: var(--fw-semibold);">${lesson.title}</h3>
                    <p style="font-size: var(--fs-sm); color: var(--text-secondary); margin-top: 2px;">${lesson.description}</p>
                  </div>
                </div>
                <div style="text-align: right; min-width: 100px;">
                  <div style="font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: var(--space-xs);">${lp.total > 0 ? `${lp.done}/${lp.total}` : 'Overview'}</div>
                  ${lp.total > 0 ? `<div class="progress-bar-container" style="height: 4px; width: 100px;"><div class="progress-bar-fill" style="width: ${lp.percent}%;${isComplete ? ' background: var(--success, #22c55e);' : ''}"></div></div>` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: var(--space-xl);">
        ${modIndex > 0
          ? `<a href="#/planner/${learningPlan.modules[modIndex - 1].id}" class="btn btn-secondary btn-sm">Previous Module</a>`
          : '<span></span>'}
        ${modIndex < learningPlan.modules.length - 1
          ? `<a href="#/planner/${learningPlan.modules[modIndex + 1].id}" class="btn btn-secondary btn-sm">Next Module</a>`
          : '<span></span>'}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => router.navigate(el.dataset.nav));
  });

  return {};
}

// --- renderPlannerLesson: Step checklist ---

export function renderPlannerLesson(container, { moduleId, lessonId }) {
  const mod = learningPlan.modules.find(m => m.id === moduleId);
  if (!mod) { router.navigate('/planner'); return {}; }
  const lesson = mod.lessons.find(l => l.id === lessonId);
  if (!lesson) { router.navigate(`/planner/${moduleId}`); return {}; }

  const lessonIndex = mod.lessons.indexOf(lesson);
  const lp = getLessonProgress(lesson);

  // Find first incomplete tracked step for "current" highlight
  const currentIdx = lesson.steps.findIndex(s => s.trackType !== null && !getStepComplete(s));

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="breadcrumb" style="margin-bottom: var(--space-lg);">
        <span class="breadcrumb-item"><a href="#/planner">Lesson Planner</a></span>
        <span class="breadcrumb-sep"></span>
        <span class="breadcrumb-item"><a href="#/planner/${mod.id}">${mod.title}</a></span>
        <span class="breadcrumb-sep"></span>
        <span class="breadcrumb-item">${lesson.title}</span>
      </div>

      <h1 class="section-title">${lesson.title}</h1>
      <p class="section-subtitle">${lesson.description}</p>

      ${lp.total > 0 ? `
        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-xl);">
          <div class="progress-bar-container" style="height: 8px; flex: 1; max-width: 300px;">
            <div class="progress-bar-fill" style="width: ${lp.percent}%;"></div>
          </div>
          <span style="font-size: var(--fs-sm); color: var(--text-secondary);">${lp.done}/${lp.total} complete</span>
        </div>
      ` : ''}

      <div class="step-list">
        ${lesson.steps.map((step, i) => {
          const done = getStepComplete(step);
          const isCurrent = i === currentIdx;
          const stateClass = done ? 'completed' : (isCurrent ? 'current' : '');
          return `
            <div class="step-item ${stateClass}">
              <div class="step-icon ${stateClass}">
                ${done
                  ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'
                  : `<span>${i + 1}</span>`}
              </div>
              <div class="step-content">
                <div class="step-title">${step.title}</div>
                ${typeBadge(step.type)}
              </div>
              <a href="#${step.route}" class="btn btn-sm ${isCurrent ? 'btn-primary' : 'btn-outline'}">Go</a>
            </div>
          `;
        }).join('')}
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: var(--space-xl);">
        ${lessonIndex > 0
          ? `<a href="#/planner/${mod.id}/${mod.lessons[lessonIndex - 1].id}" class="btn btn-secondary btn-sm">Previous Lesson</a>`
          : `<a href="#/planner/${mod.id}" class="btn btn-secondary btn-sm">Back to Module</a>`}
        ${lessonIndex < mod.lessons.length - 1
          ? `<a href="#/planner/${mod.id}/${mod.lessons[lessonIndex + 1].id}" class="btn btn-secondary btn-sm">Next Lesson</a>`
          : `<a href="#/planner/${mod.id}" class="btn btn-secondary btn-sm">Back to Module</a>`}
      </div>
    </div>
  `;

  return {};
}

// Exported for use by home.js "Continue Learning" card
export { findFirstIncompleteStep, getOverallPlanProgress };
