// DNS resolution flow animation
export function createDNSAnimation(container) {
  return {
    steps: [
      'Check browser cache',
      'Check OS cache',
      'Query recursive resolver',
      'Resolver queries root server',
      'Root refers to TLD server',
      'Resolver queries TLD server',
      'TLD refers to authoritative server',
      'Resolver queries authoritative server',
      'Authoritative returns IP address',
      'Resolver caches and returns IP'
    ]
  };
}
