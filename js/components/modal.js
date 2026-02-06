// Modal dialog component
export function showModal({ title, content, onClose }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop active';
  backdrop.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">${content}</div>
    </div>
  `;

  function close() {
    backdrop.classList.remove('active');
    setTimeout(() => backdrop.remove(), 250);
    if (onClose) onClose();
  }

  backdrop.querySelector('.modal-close').addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', handler);
    }
  });

  document.body.appendChild(backdrop);
  return { close };
}
