import React from 'react';
import { aboutContent } from './content';
import { useInView } from './useInView';
import { SkillsBlock } from './SkillsBlock';
import './App.css';

export default function App() {
  const [sectionRef, visible] = useInView(0.08);
  const {
    portrait,
    portraitAlt,
    eyebrow,
    headline,
    headlineAccent,
    headlineLine2,
    lead,
    leadSecondary,
    badges,
    stats,
    highlights,
    skillsTitle,
    skills,
    secondarySkillsTitle,
    secondarySkills,
    exploringTitle,
    exploringSkills,
  } = aboutContent;

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about-mfe ${visible ? 'is-visible' : ''}`}
    >
      <div className="about-inner">
        <div className="hero-grid neu-panel">
          <div className="hero-copy">
            <p className="eyebrow anim-item" style={{ '--i': 0 }}>
              <span className="status-dot" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 className="anim-item" style={{ '--i': 1 }}>
              {headline}
              <span className="gradient"> {headlineAccent}</span>
              <br />
              {headlineLine2}
            </h1>
            <p className="lead anim-item" style={{ '--i': 2 }}>
              {lead}
            </p>
            {leadSecondary ? (
              <p className="lead-secondary anim-item" style={{ '--i': 3 }}>
                {leadSecondary}
              </p>
            ) : null}
            <div className="about-actions anim-item" style={{ '--i': 4 }}>
              <a href="#projects" className="btn primary">
                View projects
              </a>
              <a
                href="/resume.pdf"
                className="btn ghost"
                onClick={(e) => e.preventDefault()}
                title="Add resume.pdf to shell/public"
              >
                Download résumé
              </a>
            </div>
          </div>

          <div className="hero-visual anim-item" style={{ '--i': 2 }}>
            <div className="hero-image-frame">
              <span className="hero-image-ring" aria-hidden="true" />
              <img
                src={portrait}
                alt={portraitAlt}
                className="hero-image"
                width={320}
                height={380}
                loading="eager"
              />
            </div>
            {badges.map((label, index) => (
              <span
                key={label}
                className={`float-badge badge-${index + 1} anim-badge`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <ul className="stats anim-item" style={{ '--i': 5 }} aria-label="Career highlights">
          {stats.map(({ value, label }) => (
            <li key={label}>
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </li>
          ))}
        </ul>

        <div className="highlights-grid">
          {highlights.map(({ title, text }, index) => (
            <article
              key={title}
              className="highlight-card anim-item"
              style={{ '--i': 6 + index }}
            >
              <span className="highlight-num">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="skills-sections">
          <SkillsBlock
            title={skillsTitle}
            skills={skills}
            animIndex={9}
            ariaLabel="Primary skills"
          />
          <SkillsBlock
            title={secondarySkillsTitle}
            skills={secondarySkills}
            animIndex={10}
            ariaLabel="Secondary skills"
          />
          <SkillsBlock
            title={exploringTitle}
            skills={exploringSkills}
            animIndex={11}
            variant="exploring"
            ariaLabel="Actively exploring"
          />
        </div>
      </div>
    </section>
  );
}
