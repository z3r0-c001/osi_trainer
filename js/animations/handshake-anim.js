// TCP 3-way handshake animation
export function createHandshakeAnimation(container) {
  // Animation is rendered inline in protocol-deep-dive.js
  // This module provides utility functions
  return {
    steps: [
      { label: 'SYN', direction: 'right', desc: 'Client initiates with SYN flag, seq=x' },
      { label: 'SYN-ACK', direction: 'left', desc: 'Server responds with SYN-ACK, seq=y, ack=x+1' },
      { label: 'ACK', direction: 'right', desc: 'Client confirms with ACK, ack=y+1' }
    ]
  };
}
