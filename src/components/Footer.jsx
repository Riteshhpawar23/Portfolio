import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.name}</p>
        <a href="#top">Back to top <ArrowUp size={16} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
