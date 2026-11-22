import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile.js';
import ResumeLink from './ResumeLink.jsx';
import SocialLinks from './SocialLinks.jsx';

export default function Hero() {
  const { role, location, name, company, stats, resume } = profile;
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="label hero-label"><span className="dot" aria-hidden="true" />{role} · {location}</p>
          <h1 id="hero-title">
            <span className="line">I build LLM apps,</span>{' '}
            <span className="line"><em>agents</em> and</span>{' '}
            <span className="line">RAG systems.</span>
          </h1>
          <p className="hero-intro">
            I'm <strong>{name}</strong>, currently an {role} at {company}. I take language models from experiments to
            applications people use at work.
          </p>
          <div className="hero-actions">
            <a className="button" href="#work">View work <ArrowDown size={18} aria-hidden="true" /></a>
            <ResumeLink className="button button-ghost">
              {resume.download ? 'Download resume' : 'View resume'} <ArrowUpRight size={18} aria-hidden="true" />
            </ResumeLink>
          </div>
          <SocialLinks />
        </div>
        <figure className="portrait">
          <img
            src={`${import.meta.env.BASE_URL}portrait-full.jpg`}
            width="660"
            height="644"
            fetchpriority="high"
            alt={name}
          />
        </figure>
      </div>
      {stats.length > 0 && (
        <dl className="shell stats">
          {stats.map((stat) => (
            <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
          ))}
        </dl>
      )}
    </section>
  );
}
