import { ADMIN_ONLY_PAGES } from '../core/constants.js';

export function isAdminMode() {
  // Admin mode ONLY via URL param ?admin=1
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('admin') === '1';
  } catch {
    return false;
  }
}

export function applyAdminOnlyUI() {
  const admin = isAdminMode();

  // Hide nav links & their <li> wrappers if their data-page is admin-only.
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    const page = (link.getAttribute('data-page') || '').trim();
    if (!page) return;
    if (ADMIN_ONLY_PAGES.includes(page)) {
      const li = link.closest('li');
      (li || link).style.display = admin ? '' : 'none';
    }
  });
}

export function guardAdminOnlyNavigation(page, onBlocked) {
  if (!page) return true;
  if (ADMIN_ONLY_PAGES.includes(page) && !isAdminMode()) {
    if (typeof onBlocked === 'function') onBlocked(page);
    return false;
  }
  return true;
}
