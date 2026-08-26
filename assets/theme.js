/* VitiKit 主题切换 — 全站通用（每个页面 <script src> 引入） */
(function () {
  const KEY = 'vitikit_theme';

  // 尽早应用，防闪烁
  function apply(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }
  const saved = localStorage.getItem(KEY);
  if (saved) apply(saved);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) apply('dark');

  // DOM 就绪后注入切换按钮
  function init() {
    const nav = document.querySelector('nav.main');
    if (!nav || document.getElementById('themeToggle')) return;
    const btn = document.createElement('button');
    btn.id = 'themeToggle';
    btn.className = 'theme-toggle';
    btn.title = 'Toggle dark mode';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    const setIcon = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.textContent = dark ? '☀️' : '🌙';
    };
    setIcon();
    btn.addEventListener('click', () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = dark ? 'light' : 'dark';
      apply(next);
      localStorage.setItem(KEY, next);
      setIcon();
    });
    nav.appendChild(btn);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
