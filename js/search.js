// Global search across all data
import { osiLayers } from './data/osi-layers.js';
import { tcpipLayers } from './data/tcpip-layers.js';
import { protocols } from './data/protocols.js';
import { devices } from './data/devices.js';
import { glossary } from './data/glossary.js';
import { router } from './router.js';

function buildSearchIndex() {
  const index = [];

  // Layers
  osiLayers.forEach(l => {
    index.push({
      title: `Layer ${l.number}: ${l.name}`,
      category: 'OSI Layer',
      text: `${l.name} ${l.description} ${l.keywords.join(' ')}`,
      route: `/layer/${l.number}`
    });
  });

  // TCP/IP
  tcpipLayers.forEach(l => {
    index.push({
      title: `${l.name} (TCP/IP)`,
      category: 'TCP/IP Layer',
      text: `${l.name} ${l.description}`,
      route: '/comparison'
    });
  });

  // Protocols
  protocols.forEach(p => {
    index.push({
      title: p.name,
      category: 'Protocol',
      text: `${p.name} ${p.fullName || ''} ${p.description} ${p.layer}`,
      route: `/protocol/${p.id}`
    });
  });

  // Devices
  devices.forEach(d => {
    index.push({
      title: d.name,
      category: 'Device',
      text: `${d.name} ${d.description} layer ${d.layer}`,
      route: '/devices'
    });
  });

  // Glossary
  glossary.forEach(g => {
    index.push({
      title: g.term,
      category: 'Glossary',
      text: `${g.term} ${g.definition}`,
      route: '/glossary'
    });
  });

  return index;
}

let _index = null;
function getIndex() {
  if (!_index) _index = buildSearchIndex();
  return _index;
}

export function search(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const index = getIndex();
  return index
    .filter(item => item.text.toLowerCase().includes(q))
    .slice(0, 20)
    .map(({ title, category, route }) => ({ title, category, route }));
}

export function navigateToResult(result) {
  router.navigate(result.route);
}
