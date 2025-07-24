document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'prefers-dark';
  const classNameDark = 'dark';
  const body = document.body;

  const setClass = (dark) => {
    dark ? body.classList.add(classNameDark) : body.classList.remove(classNameDark);
  };

  // Initial
  const storedPref = localStorage.getItem(storageKey);
  const prefersDark = storedPref !== null ? storedPref === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  setClass(prefersDark);

  // Create toggle button
  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.innerHTML = prefersDark ? '☀' : '🌙';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    const isDark = body.classList.toggle(classNameDark);
    localStorage.setItem(storageKey, isDark);
    btn.innerHTML = isDark ? '☀' : '🌙';
  });
});
