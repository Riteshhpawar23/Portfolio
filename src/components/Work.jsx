import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { GitHubIcon } from './Icons.jsx';
import ProjectCard, { followCursor } from './ProjectCard.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Work() {
  // With a single project the heading shares the row, so two cards don't leave a gap
  const layout = projects.length === 1 ? 'shell work-split' : 'shell';
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className={layout}>
        <SectionHead id="work-title" label="Work">Built to <em>understand</em> how it works.</SectionHead>
        <div className="work-grid">
          {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
          <Reveal as="article" className="project project-profile" onPointerMove={followCursor}>
            <div className="project-main">
              <div className="project-cover">
                <GitHubIcon size={60} />
                <span className="label project-type">Profile</span>
              </div>
              <div className="project-info">
                <h3>More on GitHub</h3>
                <p>Browse my other repositories, experiments and code.</p>
                <p className="tech project-tech">@Riteshhpawar23</p>
              </div>
            </div>
            <a className="project-link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={22} />
              <span>Open my GitHub profile</span>
              <ArrowUpRight className="go" size={20} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
