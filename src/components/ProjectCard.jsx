import { ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from './Icons.jsx';
import Reveal from './Reveal.jsx';

// The highlight on the border follows the cursor
export function followCursor(event) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--x', `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty('--y', `${event.clientY - box.top}px`);
}

export default function ProjectCard({ project }) {
  const { name, label, image, text, tech, code } = project;
  return (
    <Reveal as="article" className="project" onPointerMove={followCursor}>
      <div className="project-main">
        <div className="project-cover" style={{ background: image?.background }}>
          {image && (
            <img src={`${import.meta.env.BASE_URL}${image.file}`} width={image.width} height={image.height} loading="lazy" decoding="async" alt={image.alt} />
          )}
          {label && <span className="label project-type">{label}</span>}
        </div>
        <div className="project-info">
          <h3>{name}</h3>
          <p>{text}</p>
          <p className="tech project-tech">{tech.join(' / ')}</p>
        </div>
      </div>
      {code && (
        <a className="project-link" href={code} target="_blank" rel="noopener noreferrer">
          <GitHubIcon size={22} />
          <span>View code on GitHub<span className="sr-only">: {name}</span></span>
          <ArrowUpRight className="go" size={20} aria-hidden="true" />
        </a>
      )}
    </Reveal>
  );
}
