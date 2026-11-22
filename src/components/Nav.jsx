import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/profile.js';
import ResumeLink from './ResumeLink.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  ['experience', 'Experience'],
  ['work', 'Work'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const header = useRef(null);
  const menuButton = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -54% 0px' },
    );
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const key = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButton.current.focus();
    };
    const outside = (event) => !header.current.contains(event.target) && setOpen(false);
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    return () => {
      document.removeEventListener('keydown', key);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
    };
  }, [open]);

  return (
    <header className="nav" ref={header}>
      <div className="nav-pill">
        <a className="nav-name" href="#top" onClick={() => setOpen(false)}>{profile.name}</a>
        <nav id="site-menu" className="nav-menu" data-open={open} aria-label="Main">
          {LINKS.map(([id, text]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{text}</a>
          ))}
          <ResumeLink className="nav-menu-resume" onClick={() => setOpen(false)}>Resume</ResumeLink>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <ResumeLink className="button button-small nav-resume">Resume</ResumeLink>
          <button
            ref={menuButton}
            type="button"
            className="icon-button nav-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
