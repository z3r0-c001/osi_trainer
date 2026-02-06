// Search bar with dropdown results
import { search, navigateToResult } from '../search.js';

export function renderSearchBar(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'search-container';
  wrapper.innerHTML = `
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <input type="text" class="search-input" placeholder="Search layers, protocols, devices..." aria-label="Search">
    <div class="search-results" id="search-results"></div>
  `;

  const input = wrapper.querySelector('.search-input');
  const results = wrapper.querySelector('.search-results');

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = input.value.trim();
      const items = search(query);
      if (items.length === 0) {
        results.classList.remove('active');
        return;
      }
      results.innerHTML = items.map(item => `
        <div class="search-result-item" data-route="${item.route}">
          <span class="search-result-category badge badge-primary">${item.category}</span>
          <span>${item.title}</span>
        </div>
      `).join('');
      results.classList.add('active');
    }, 200);
  });

  results.addEventListener('click', (e) => {
    const item = e.target.closest('.search-result-item');
    if (item) {
      const route = item.dataset.route;
      navigateToResult({ route });
      input.value = '';
      results.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      results.classList.remove('active');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      results.classList.remove('active');
      input.blur();
    }
  });

  container.appendChild(wrapper);
  return wrapper;
}
