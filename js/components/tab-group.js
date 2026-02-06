// Tab switching component
export function initTabs(container) {
  const tabBtns = container.querySelectorAll('.tab-btn');
  const tabContents = container.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = container.querySelector(`#tab-${btn.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });
}
