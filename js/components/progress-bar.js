// Animated progress bar component
export function createProgressBar({ value = 0, max = 100, color = 'var(--accent)', height = '8px' } = {}) {
  const pct = Math.round((value / max) * 100);
  const el = document.createElement('div');
  el.className = 'progress-bar-container';
  el.style.height = height;
  el.innerHTML = `<div class="progress-bar-fill" style="width: ${pct}%; background: ${color};"></div>`;
  return el;
}

export function updateProgressBar(el, value, max = 100) {
  const fill = el.querySelector('.progress-bar-fill');
  if (fill) {
    fill.style.width = `${Math.round((value / max) * 100)}%`;
  }
}
