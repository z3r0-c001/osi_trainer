// Quiz engine + UI
import { quizQuestions } from '../data/quiz-questions.js';
import { store } from '../store.js';
import { router } from '../router.js';

const QUIZ_TARGETS = [
  { id: 'layer1', label: 'Layer 1: Physical', icon: '1', color: 'layer-1' },
  { id: 'layer2', label: 'Layer 2: Data Link', icon: '2', color: 'layer-2' },
  { id: 'layer3', label: 'Layer 3: Network', icon: '3', color: 'layer-3' },
  { id: 'layer4', label: 'Layer 4: Transport', icon: '4', color: 'layer-4' },
  { id: 'layer5', label: 'Layer 5: Session', icon: '5', color: 'layer-5' },
  { id: 'layer6', label: 'Layer 6: Presentation', icon: '6', color: 'layer-6' },
  { id: 'layer7', label: 'Layer 7: Application', icon: '7', color: 'layer-7' },
  { id: 'comprehensive', label: 'Comprehensive Final', icon: 'F', color: 'accent' }
];

export function renderQuiz(container) {
  const scores = store.get('quizScores');

  container.innerHTML = `
    <div class="animate-fade-in">
      <h1 class="section-title">Quiz Center</h1>
      <p class="section-subtitle">Test your knowledge with per-layer quizzes or take the comprehensive final exam.</p>

      <div class="quiz-grid stagger-children">
        ${QUIZ_TARGETS.map(t => {
          const questions = quizQuestions[t.id];
          const score = scores[t.id];
          const qCount = questions ? questions.length : 0;
          return `
            <div class="quiz-card" data-quiz="${t.id}">
              <div class="quiz-card-icon">
                <span style="display: inline-flex; width: 48px; height: 48px; border-radius: 50%; align-items: center; justify-content: center; font-weight: var(--fw-bold); font-size: var(--fs-lg); color: #fff;" class="${t.color === 'accent' ? '' : t.color + '-bg'}" ${t.color === 'accent' ? 'style="background: var(--accent); display: inline-flex; width: 48px; height: 48px; border-radius: 50%; align-items: center; justify-content: center; font-weight: var(--fw-bold); font-size: var(--fs-lg); color: #fff;"' : ''}>
                  ${t.icon}
                </span>
              </div>
              <h3>${t.label}</h3>
              <p>${qCount} questions</p>
              ${score ? `<div class="quiz-score">${score.score}/${score.total} (${Math.round(score.score / score.total * 100)}%)</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.quiz-card').forEach(el => {
    el.addEventListener('click', () => router.navigate(`/quiz/${el.dataset.quiz}`));
  });

  return {};
}

export function renderQuizTarget(container, { target }) {
  const questions = quizQuestions[target];
  if (!questions || questions.length === 0) {
    container.innerHTML = '<p>Quiz not found.</p>';
    return {};
  }

  const targetInfo = QUIZ_TARGETS.find(t => t.id === target);
  let currentQuestion = 0;
  let answers = {};
  let showingResults = false;
  let matchingState = { selectedLeft: null, pairs: [] };

  function render() {
    if (showingResults) {
      renderResults();
      return;
    }

    const q = questions[currentQuestion];
    const answered = answers[currentQuestion] !== undefined;
    const progressPct = ((currentQuestion + 1) / questions.length) * 100;

    container.innerHTML = `
      <div class="animate-fade-in quiz-container">
        <!-- Header -->
        <div class="quiz-header">
          <div class="breadcrumb">
            <span class="breadcrumb-item"><a href="#/quiz">Quizzes</a></span>
            <span class="breadcrumb-sep"></span>
            <span class="breadcrumb-item">${targetInfo ? targetInfo.label : target}</span>
          </div>
          <div class="quiz-progress">
            <span class="quiz-progress-text">${currentQuestion + 1} / ${questions.length}</span>
            <div class="progress-bar-container quiz-progress-bar">
              <div class="progress-bar-fill" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </div>

        <!-- Question -->
        <div class="question-card">
          <div class="question-number">
            Question ${currentQuestion + 1}
            <span class="question-difficulty badge ${q.difficulty === 'easy' ? 'badge-success' : q.difficulty === 'hard' ? 'badge-error' : 'badge-warning'}">${q.difficulty}</span>
          </div>
          <div class="question-text">${q.question}</div>

          ${renderQuestionBody(q, currentQuestion, answered)}

          ${answered ? `
            <div class="explanation ${isCorrect(q, answers[currentQuestion]) ? 'correct' : 'incorrect'}">
              <div class="explanation-title">${isCorrect(q, answers[currentQuestion]) ? 'Correct!' : 'Incorrect'}</div>
              ${q.explanation}
            </div>
          ` : ''}
        </div>

        <!-- Navigation -->
        <div class="quiz-nav">
          <button class="btn btn-outline" id="quiz-prev" ${currentQuestion === 0 ? 'disabled style="opacity:0.5;pointer-events:none;"' : ''}>&larr; Previous</button>
          ${answered ? (currentQuestion < questions.length - 1 ?
            '<button class="btn btn-primary" id="quiz-next">Next &rarr;</button>' :
            '<button class="btn btn-primary" id="quiz-finish" style="background: var(--success);">See Results</button>'
          ) : '<div></div>'}
        </div>
      </div>
    `;

    bindQuestionHandlers(q, currentQuestion);

    const prevBtn = container.querySelector('#quiz-prev');
    if (prevBtn) prevBtn.addEventListener('click', () => { currentQuestion--; render(); });

    const nextBtn = container.querySelector('#quiz-next');
    if (nextBtn) nextBtn.addEventListener('click', () => { currentQuestion++; matchingState = { selectedLeft: null, pairs: [] }; render(); });

    const finishBtn = container.querySelector('#quiz-finish');
    if (finishBtn) finishBtn.addEventListener('click', () => { showingResults = true; render(); });
  }

  function renderQuestionBody(q, qIndex, answered) {
    switch (q.type) {
      case 'multiple-choice':
        return `
          <div class="options-list">
            ${q.options.map((opt, i) => {
              const letters = 'ABCDEFGH';
              let cls = 'option-btn';
              if (answered) {
                cls += ' disabled';
                if (i === q.correctAnswer) cls += ' correct';
                else if (i === answers[qIndex]) cls += ' incorrect';
              }
              return `
                <button class="${cls}" data-answer="${i}">
                  <span class="option-letter">${letters[i]}</span>
                  <span>${opt}</span>
                </button>
              `;
            }).join('')}
          </div>
        `;

      case 'true-false':
        return `
          <div class="tf-options">
            ${[true, false].map(val => {
              let cls = 'tf-btn';
              if (answered) {
                cls += ' disabled';
                if (val === q.correctAnswer) cls += ' correct';
                else if (val === answers[qIndex]) cls += ' incorrect';
              }
              return `<button class="${cls}" data-answer="${val}">
                ${val ? 'True' : 'False'}
              </button>`;
            }).join('')}
          </div>
        `;

      case 'ordering':
        const items = answered && answers[qIndex] ? answers[qIndex] : shuffleArray([...q.options]);
        if (!answered && !answers[`${qIndex}_order`]) {
          answers[`${qIndex}_order`] = items;
        }
        const orderItems = answered ? (answers[qIndex] || items) : (answers[`${qIndex}_order`] || items);
        return `
          <div class="ordering-list" id="ordering-list">
            ${orderItems.map((item, i) => {
              let cls = 'ordering-item';
              if (answered) {
                cls += i === q.correctAnswer.indexOf(item) && q.correctAnswer[i] === item ? ' correct-position' : ' wrong-position';
                if (q.correctAnswer[i] === item) cls = 'ordering-item correct-position';
              }
              return `
                <div class="${cls}" draggable="${!answered}" data-index="${i}">
                  <span class="drag-handle">${answered ? (q.correctAnswer[i] === item ? '✓' : '✗') : '⠿'}</span>
                  <span>${item}</span>
                </div>
              `;
            }).join('')}
          </div>
          ${!answered ? '<button class="btn btn-primary" id="submit-order" style="margin-top: var(--space-md);">Submit Order</button>' : ''}
          ${answered ? `<div style="margin-top: var(--space-sm); font-size: var(--fs-xs); color: var(--text-muted);">Correct order: ${q.correctAnswer.map((item, i) => `${i+1}. ${item}`).join(' → ')}</div>` : ''}
        `;

      case 'matching':
        return `
          <div style="margin-bottom: var(--space-sm); font-size: var(--fs-sm); color: var(--text-muted);">
            ${answered ? 'Matching complete!' : 'Click an item on the left, then click its match on the right.'}
          </div>
          <div class="matching-container">
            <div class="matching-column">
              <div style="font-weight: var(--fw-semibold); margin-bottom: var(--space-sm); font-size: var(--fs-sm);">Terms</div>
              ${q.options.map((opt, i) => {
                const isPaired = matchingState.pairs.some(p => p.leftIndex === i);
                const isSelected = matchingState.selectedLeft === i;
                let cls = 'matching-item';
                if (isPaired) cls += ' matched';
                if (isSelected) cls += ' selected';
                if (answered) {
                  const pair = (answers[qIndex] || []).find(p => p.leftIndex === i);
                  if (pair) {
                    const correctRight = q.correctAnswer.find(c => c.left === opt.left);
                    cls = correctRight && correctRight.right === q.options[pair.rightIndex].right ? 'matching-item matched' : 'matching-item wrong';
                  }
                }
                return `<div class="${cls}" data-left="${i}" ${isPaired || answered ? '' : 'style="cursor:pointer"'}>${opt.left}</div>`;
              }).join('')}
            </div>
            <div class="matching-column">
              <div style="font-weight: var(--fw-semibold); margin-bottom: var(--space-sm); font-size: var(--fs-sm);">Definitions</div>
              ${shuffleWithSeed(q.options.map((opt, i) => ({ ...opt, origIndex: i })), qIndex).map((opt) => {
                const isPaired = matchingState.pairs.some(p => p.rightIndex === opt.origIndex);
                let cls = 'matching-item';
                if (isPaired) cls += ' matched';
                return `<div class="${cls}" data-right="${opt.origIndex}" ${isPaired || answered ? '' : 'style="cursor:pointer"'}>${opt.right}</div>`;
              }).join('')}
            </div>
          </div>
          ${!answered && matchingState.pairs.length === q.options.length ?
            '<button class="btn btn-primary" id="submit-matching" style="margin-top: var(--space-md);">Submit Matches</button>' : ''}
        `;

      default:
        return '<p>Unknown question type.</p>';
    }
  }

  function bindQuestionHandlers(q, qIndex) {
    const answered = answers[qIndex] !== undefined;
    if (answered) return;

    if (q.type === 'multiple-choice') {
      container.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          answers[qIndex] = parseInt(btn.dataset.answer);
          render();
        });
      });
    }

    if (q.type === 'true-false') {
      container.querySelectorAll('.tf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          answers[qIndex] = btn.dataset.answer === 'true';
          render();
        });
      });
    }

    if (q.type === 'ordering') {
      const list = container.querySelector('#ordering-list');
      if (list) {
        let dragIndex = null;
        list.querySelectorAll('.ordering-item').forEach(item => {
          item.addEventListener('dragstart', (e) => {
            dragIndex = parseInt(item.dataset.index);
            item.classList.add('dragging');
          });
          item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
          });
          item.addEventListener('dragover', (e) => {
            e.preventDefault();
            item.classList.add('drag-over');
          });
          item.addEventListener('dragleave', () => {
            item.classList.remove('drag-over');
          });
          item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.classList.remove('drag-over');
            const dropIndex = parseInt(item.dataset.index);
            if (dragIndex !== null && dragIndex !== dropIndex) {
              const order = answers[`${qIndex}_order`];
              const temp = order[dragIndex];
              order[dragIndex] = order[dropIndex];
              order[dropIndex] = temp;
              render();
            }
          });
        });
      }

      const submitBtn = container.querySelector('#submit-order');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          answers[qIndex] = [...(answers[`${qIndex}_order`] || [])];
          render();
        });
      }
    }

    if (q.type === 'matching') {
      container.querySelectorAll('[data-left]').forEach(el => {
        if (!matchingState.pairs.some(p => p.leftIndex === parseInt(el.dataset.left))) {
          el.addEventListener('click', () => {
            matchingState.selectedLeft = parseInt(el.dataset.left);
            render();
          });
        }
      });
      container.querySelectorAll('[data-right]').forEach(el => {
        if (!matchingState.pairs.some(p => p.rightIndex === parseInt(el.dataset.right))) {
          el.addEventListener('click', () => {
            if (matchingState.selectedLeft !== null) {
              matchingState.pairs.push({
                leftIndex: matchingState.selectedLeft,
                rightIndex: parseInt(el.dataset.right)
              });
              matchingState.selectedLeft = null;
              render();
            }
          });
        }
      });
      const submitBtn = container.querySelector('#submit-matching');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          answers[qIndex] = [...matchingState.pairs];
          render();
        });
      }
    }
  }

  function isCorrect(q, answer) {
    if (answer === undefined) return false;
    switch (q.type) {
      case 'multiple-choice':
        return answer === q.correctAnswer;
      case 'true-false':
        return answer === q.correctAnswer;
      case 'ordering':
        return Array.isArray(answer) && answer.every((item, i) => item === q.correctAnswer[i]);
      case 'matching':
        if (!Array.isArray(answer)) return false;
        return answer.every(pair => {
          const leftItem = q.options[pair.leftIndex];
          const correctRight = q.correctAnswer.find(c => c.left === leftItem.left);
          return correctRight && correctRight.right === q.options[pair.rightIndex].right;
        });
      default:
        return false;
    }
  }

  function renderResults() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (isCorrect(q, answers[i])) correct++;
    });
    const total = questions.length;
    const pct = Math.round(correct / total * 100);
    const grade = pct >= 90 ? 'excellent' : pct >= 70 ? 'good' : pct >= 50 ? 'fair' : 'poor';

    store.saveQuizScore(target, correct, total);

    container.innerHTML = `
      <div class="quiz-container animate-fade-in">
        <div class="quiz-results">
          <h2>Quiz Complete!</h2>
          <div class="quiz-score-display ${grade}">${pct}%</div>
          <p>${correct} out of ${total} correct</p>
          <p style="font-size: var(--fs-sm); color: var(--text-muted);">
            ${pct >= 90 ? 'Excellent work! You have a strong understanding.' :
              pct >= 70 ? 'Good job! Review the topics you missed.' :
              pct >= 50 ? 'Fair performance. Consider reviewing the material.' :
              'Keep studying! Review the layers and try again.'}
          </p>
          <div class="quiz-actions">
            <button class="btn btn-primary" id="retry-quiz">Retry Quiz</button>
            <a href="#/quiz" class="btn btn-outline">All Quizzes</a>
            <a href="#/layers" class="btn btn-outline">Review Layers</a>
          </div>
        </div>

        <div style="margin-top: var(--space-xl);">
          <h3 style="margin-bottom: var(--space-md);">Review Answers</h3>
          ${questions.map((q, i) => {
            const correct = isCorrect(q, answers[i]);
            return `
              <div class="card" style="margin-bottom: var(--space-sm); border-left: 4px solid ${correct ? 'var(--success)' : 'var(--error)'};">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                  <div>
                    <span style="font-size: var(--fs-xs); color: var(--text-muted);">Q${i + 1}</span>
                    <span class="badge ${correct ? 'badge-success' : 'badge-error'}" style="margin-left: var(--space-xs);">${correct ? 'Correct' : 'Incorrect'}</span>
                  </div>
                </div>
                <p style="font-size: var(--fs-sm); margin-top: var(--space-xs);">${q.question}</p>
                <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: var(--space-xs);">${q.explanation}</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.querySelector('#retry-quiz').addEventListener('click', () => {
      answers = {};
      currentQuestion = 0;
      showingResults = false;
      matchingState = { selectedLeft: null, pairs: [] };
      render();
    });
  }

  render();
  return {};
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleWithSeed(arr, seed) {
  const a = [...arr];
  let s = seed + 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
