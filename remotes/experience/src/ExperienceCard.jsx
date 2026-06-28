import React from 'react';

export function ExperienceCard({ experience, index }) {
  const { company, period, current, stack, projects, summary } = experience;

  return (
    <article
      className={`experience-card anim-item ${current ? 'is-current' : ''}`}
      style={{ '--i': 1 + index }}
    >
      <span className="timeline-dot" aria-hidden="true" />
      <div className="experience-card-inner">
        <header className="experience-header">
          <div>
            <h3>{company}</h3>
            {projects.length > 0 ? (
              <p className="experience-projects">{projects.join(' · ')}</p>
            ) : null}
          </div>
          <span className={`period-pill ${current ? 'is-current' : ''}`}>{period}</span>
        </header>

        <p className="experience-summary">{summary}</p>

        <ul className="stack-tags" aria-label={`Technologies at ${company}`}>
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
