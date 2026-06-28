import React from 'react';
import { projectsContent } from './content';
import { useInView } from './useInView';
import './App.css';

export default function App() {
  const [sectionRef, visible] = useInView(0.06);
  const { sectionTag, title, subtitle, projects } = projectsContent;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`projects-mfe ${visible ? 'is-visible' : ''}`}
    >
      <div className="section-head anim-item" style={{ '--i': 0 }}>
        <span className="section-tag">{sectionTag}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`project-card anim-item ${project.featured ? 'featured' : ''}`}
            style={{ '--i': 1 + index }}
          >
            <div className="card-accent" aria-hidden="true" />
            <div className="card-media">
              <img
                src={project.image}
                alt=""
                loading="lazy"
                width={640}
                height={360}
              />
              <div className="card-media-overlay" aria-hidden="true" />
              {project.featured && <span className="featured-pill">Featured</span>}
              <span className="year-pill">{project.year}</span>
            </div>
            <div className="card-body">
              <h3>{project.title}</h3>
              <p className="metric">{project.metric}</p>
              <p className="desc">{project.description}</p>
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a
                href={project.link}
                className="card-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit site →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
