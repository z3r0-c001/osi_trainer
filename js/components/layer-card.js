// Layer info card component
export function createLayerCard(layer) {
  const card = document.createElement('div');
  card.className = `card card-clickable layer-${layer.number}-border`;
  card.innerHTML = `
    <div class="card-header">
      <div>
        <span class="badge layer-${layer.number}-bg" style="color:#fff;">Layer ${layer.number}</span>
        <span class="card-title" style="margin-left: var(--space-sm);">${layer.name}</span>
      </div>
      <span style="font-size: var(--fs-xs); color: var(--text-muted);">${layer.pdu}</span>
    </div>
    <p class="card-body">${layer.description}</p>
    <div class="card-footer">
      <div class="tag-list">
        ${layer.keywords.slice(0, 4).map(k => `<span class="tag">${k}</span>`).join('')}
      </div>
    </div>
  `;
  return card;
}
