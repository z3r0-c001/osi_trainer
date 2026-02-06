// Hover tooltips component
export function initTooltips(container) {
  container.querySelectorAll('[data-tooltip]').forEach(el => {
    el.classList.add('tooltip-trigger');
    const tip = document.createElement('span');
    tip.className = 'tooltip';
    tip.textContent = el.dataset.tooltip;
    el.appendChild(tip);
  });
}
