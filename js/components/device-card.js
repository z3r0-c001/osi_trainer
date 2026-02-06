// Device card component
export function createDeviceCard(device) {
  const card = document.createElement('div');
  card.className = `card layer-${device.layer}-border`;
  card.innerHTML = `
    <div class="card-header">
      <h3 class="card-title">${device.name}</h3>
      <span class="badge layer-${device.layer}-bg" style="color: #fff;">Layer ${device.layer}</span>
    </div>
    <p class="card-body">${device.description}</p>
  `;
  return card;
}
