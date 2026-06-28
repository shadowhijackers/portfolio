import React from 'react';
import { experienceContent } from './content';
import { ExperienceCard } from './ExperienceCard';
import { useInView } from './useInView';
import './App.css';

export default function App() {
  const [sectionRef, visible] = useInView(0.06);
  const { sectionTag, title, subtitle, experiences } = experienceContent;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`experience-mfe ${visible ? 'is-visible' : ''}`}
    >
      <div className="section-head anim-item" style={{ '--i': 0 }}>
        <span className="section-tag">{sectionTag}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="experience-timeline">
        <span className="timeline-rail" aria-hidden="true" />
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.company} experience={experience} index={index} />
        ))}
      </div>
    </section>
  );
}
