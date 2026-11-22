import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { profile } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import SocialLinks from './SocialLinks.jsx';

export default function Contact() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(''), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="shell">
        <SectionHead id="contact-title" label="Contact">Let's <em>talk</em>.</SectionHead>
        <p className="contact-intro">Hiring for an AI role or have something to build? Email is the quickest way to reach me.</p>
        <div className="contact-actions">
          <a className="button button-large" href={`mailto:${profile.email}`}>
            <span className="email">{profile.email}</span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
          <button type="button" className="button button-ghost button-large" onClick={copy}>
            {status === 'copied' ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
            {status === 'copied' ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <p className="copy-status" role="status">
          {status === 'copied' && 'Email address copied.'}
          {status === 'failed' && `Copy was blocked. The address is ${profile.email}`}
        </p>
        <div className="contact-foot">
          <SocialLinks email={false} />
          <p className="label">{profile.location}, India</p>
        </div>
      </div>
    </section>
  );
}
