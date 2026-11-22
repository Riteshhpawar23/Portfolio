import { skills } from '../data/skills.js';
import LogoRow from './LogoRow.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHead id="skills-title" label="Skills">Tools I <em>reach</em> for.</SectionHead>
        <Reveal as="dl" className="skill-list">
          {skills.map(({ group, items }) => (
            <div key={group}>
              <dt className="label">{group}</dt>
              <dd>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </dd>
            </div>
          ))}
        </Reveal>
        <LogoRow />
      </div>
    </section>
  );
}
