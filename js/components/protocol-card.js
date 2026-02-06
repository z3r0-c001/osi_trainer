// Protocol detail card component
export function createProtocolCard(proto) {
  const card = document.createElement('div');
  card.className = `card card-clickable layer-${proto.layer}-border`;
  card.dataset.proto = proto.id;
  card.innerHTML = `
    <div class="card-header">
      <span class="card-title">${proto.name}</span>
      <span class="badge layer-${proto.layer}-bg" style="color: #fff;">L${proto.layer}</span>
    </div>
    <div style="font-size: var(--fs-xs); color: var(--text-muted); margin-bottom: var(--space-sm);">${proto.fullName}</div>
    <p class="card-body">${proto.description}</p>
    <div class="card-footer" style="display: flex; gap: var(--space-xs);">
      ${proto.port ? `<span class="badge badge-primary">Port ${proto.port}</span>` : ''}
      ${proto.animated ? '<span class="badge badge-warning">Animated</span>' : ''}
    </div>
  `;
  return card;
}
