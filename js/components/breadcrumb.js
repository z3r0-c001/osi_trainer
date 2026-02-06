// Breadcrumb navigation component
export function createBreadcrumb(items) {
  const nav = document.createElement('nav');
  nav.className = 'breadcrumb';
  nav.innerHTML = items.map((item, i) => {
    const isLast = i === items.length - 1;
    if (isLast) {
      return `<span class="breadcrumb-item">${item.label}</span>`;
    }
    return `<span class="breadcrumb-item"><a href="${item.href}">${item.label}</a></span><span class="breadcrumb-sep"></span>`;
  }).join('');
  return nav;
}
