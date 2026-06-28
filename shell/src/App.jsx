import React, { lazy } from 'react';
import { RemoteBoundary } from './RemoteBoundary';
import WebTextureCanvas from './WebTextureCanvas';

const HeaderApp = lazy(() => import('header/App'));
const AboutApp = lazy(() => import('about/App'));
const ExperienceApp = lazy(() => import('experience/App'));
const ProjectsApp = lazy(() => import('projects/App'));
const ContactApp = lazy(() => import('contact/App'));

export default function App() {
  return (
    <div className="neu-shell">
      <div className="neu-bg" aria-hidden="true">
        <WebTextureCanvas />
        <span className="neu-blob neu-blob-1" />
        <span className="neu-blob neu-blob-2" />
        <span className="neu-blob neu-blob-3" />
        <span className="neu-blob neu-blob-4" />
      </div>
      <div className="header-slot">
        <RemoteBoundary label="Header">
          <HeaderApp />
        </RemoteBoundary>
      </div>

      <main>
        <RemoteBoundary label="About">
          <AboutApp />
        </RemoteBoundary>

        <RemoteBoundary label="Experience">
          <ExperienceApp />
        </RemoteBoundary>

        <RemoteBoundary label="Projects">
          <ProjectsApp />
        </RemoteBoundary>

        <RemoteBoundary label="Contact">
          <ContactApp />
        </RemoteBoundary>
      </main>
    </div>
  );
}
