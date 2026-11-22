import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const KEY = 'portfolio-theme';

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0E0E0C' : '#F6F4EF';
}

function saved() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
    const system = matchMedia('(prefers-color-scheme: dark)');
    const follow = (event) => {
      if (saved()) return;
      apply(event.matches ? 'dark' : 'light');
      setDark(event.matches);
    };
    system.addEventListener('change', follow);
    return () => system.removeEventListener('change', follow);
  }, []);

  function toggle() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    setDark(next === 'dark');
    try { localStorage.setItem(KEY, next); } catch { /* storage can be blocked */ }
  }

  return (
    <button type="button" className="icon-button" onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
      <Moon className="when-light" size={18} aria-hidden="true" />
      <Sun className="when-dark" size={18} aria-hidden="true" />
    </button>
  );
}
