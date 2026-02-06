// ARP broadcast/reply animation
export function createARPAnimation(container) {
  return {
    steps: [
      'Device needs MAC for target IP',
      'Check ARP cache — miss',
      'Broadcast ARP request (FF:FF:FF:FF:FF:FF)',
      'All hosts on subnet receive broadcast',
      'Target host sends unicast ARP reply',
      'Source updates ARP cache',
      'Communication can proceed with MAC address'
    ]
  };
}
