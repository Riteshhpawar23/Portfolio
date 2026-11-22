import { profile } from '../data/profile.js';
import ParticleWords from './ParticleWords.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function WhatIDo() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-side">
          <SectionHead id="about-title" label="What I do">Models are the start. <em>Useful</em> is the goal.</SectionHead>
          <ParticleWords />
        </div>
        <ul className="capabilities">
          {profile.capabilities.map((item) => (
            <Reveal as="li" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <p className="tech">{item.tools.join(' / ')}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
