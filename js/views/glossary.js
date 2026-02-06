// Searchable glossary
import { glossary } from '../data/glossary.js';

const CATEGORIES = ['all', 'general', 'protocol', 'addressing', 'device', 'security', 'routing', 'switching', 'wireless', 'encoding'];

export function renderGlossary(container) {
  let searchTerm = '';
  let activeCategory = 'all';
  let expandedTerm = null;

  function render() {
    let filtered = glossary;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(g => g.category === activeCategory);
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(g =>
        g.term.toLowerCase().includes(q) ||
        g.definition.toLowerCase().includes(q)
      );
    }

    // Group by first letter
    const grouped = {};
    filtered.forEach(g => {
      const letter = g.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(g);
    });

    container.innerHTML = `
      <div class="animate-fade-in">
        <h1 class="section-title">Networking Glossary</h1>
        <p class="section-subtitle">${glossary.length} terms covering all aspects of networking and the OSI model.</p>

        <!-- Search and Filter -->
        <div style="display: flex; gap: var(--space-md); margin-bottom: var(--space-lg); flex-wrap: wrap;">
          <div class="search-container" style="flex: 1; min-width: 200px;">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" class="search-input" placeholder="Search terms..." value="${searchTerm}" id="glossary-search">
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: var(--space-xs); margin-bottom: var(--space-lg);">
          ${CATEGORIES.map(cat => `
            <button class="btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}" data-cat="${cat}">
              ${cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          `).join('')}
        </div>

        <div style="font-size: var(--fs-sm); color: var(--text-muted); margin-bottom: var(--space-md);">
          Showing ${filtered.length} of ${glossary.length} terms
        </div>

        <!-- Glossary List -->
        ${Object.keys(grouped).sort().map(letter => `
          <div style="margin-bottom: var(--space-lg);">
            <div style="font-size: var(--fs-2xl); font-weight: var(--fw-bold); color: var(--accent); margin-bottom: var(--space-sm); border-bottom: 2px solid var(--border-color); padding-bottom: var(--space-xs);">
              ${letter}
            </div>
            <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
              ${grouped[letter].map(g => `
                <div class="card" style="cursor: pointer; padding: var(--space-md);" data-term="${g.term}">
                  <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                      <div style="display: flex; align-items: center; gap: var(--space-sm);">
                        <strong style="font-size: var(--fs-base);">${g.term}</strong>
                        <span class="badge badge-primary" style="font-size: 10px;">${g.category}</span>
                        ${g.relatedLayer ? `<span class="badge" style="font-size: 10px; background: var(--bg-tertiary);">Layer ${Array.isArray(g.relatedLayer) ? g.relatedLayer.join(',') : g.relatedLayer}</span>` : ''}
                      </div>
                      <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-top: var(--space-xs); line-height: 1.6;">
                        ${g.definition}
                      </p>
                      ${expandedTerm === g.term && g.relatedTerms && g.relatedTerms.length > 0 ? `
                        <div style="margin-top: var(--space-sm);">
                          <span style="font-size: var(--fs-xs); color: var(--text-muted);">Related terms:</span>
                          <div class="tag-list" style="margin-top: 4px;">
                            ${g.relatedTerms.map(rt => `<span class="tag" style="cursor: pointer;" data-search="${rt}">${rt}</span>`).join('')}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                    <span style="color: var(--text-muted); font-size: var(--fs-sm); transform: rotate(${expandedTerm === g.term ? '180deg' : '0'}); transition: transform 0.2s;">▾</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        ${filtered.length === 0 ? '<p class="empty-state">No matching terms found.</p>' : ''}
      </div>
    `;

    // Search input
    const searchInput = container.querySelector('#glossary-search');
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      render();
    });
    searchInput.focus();

    // Category filters
    container.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        render();
      });
    });

    // Expand/collapse terms
    container.querySelectorAll('[data-term]').forEach(el => {
      el.addEventListener('click', () => {
        expandedTerm = expandedTerm === el.dataset.term ? null : el.dataset.term;
        render();
      });
    });

    // Related term search
    container.querySelectorAll('[data-search]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        searchTerm = el.dataset.search;
        expandedTerm = null;
        render();
      });
    });
  }

  render();
  return {};
}
