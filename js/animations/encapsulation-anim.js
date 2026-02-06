// Header add/remove animations
export function animateHeaderAttach(element) {
  element.style.transform = 'scaleX(0)';
  element.style.opacity = '0';
  requestAnimationFrame(() => {
    element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    element.style.transform = 'scaleX(1)';
    element.style.opacity = '1';
  });
}

export function animateHeaderDetach(element) {
  element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  element.style.transform = 'scaleX(0)';
  element.style.opacity = '0';
}
