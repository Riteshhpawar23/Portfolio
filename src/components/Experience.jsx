import { experience } from '../data/experience.js';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHead id="experience-title" label="Experience">Where I've <em>worked</em>.</SectionHead>
        <ol className="timeline">
          {experience.map((job) => (
            <Reveal as="li" key={job.company} className={job.current ? 'job is-current' : 'job'}>
              <p className="label job-dates">{job.dates}</p>
              <div className="job-title">
                <h3>{job.role}</h3>
                <p>{job.company}</p>
              </div>
              <ul className="job-points">
                {job.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
