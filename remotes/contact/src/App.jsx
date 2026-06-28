import React, { useState } from 'react';
import { useInView } from './useInView';
import './App.css';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/shadowhijackers', icon: '⌘' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nagaraj-ravi-0b853b112', icon: 'in' },
  { label: 'Email', href: 'mailto:shakthipav@gmail.com', icon: '@' }
];

const SERVICES = [
  'Product UI engineering',
  'Design system builds',
  'Micro-frontend architecture',
  'Performance audits',
];

const WORKSPACE_IMG =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=520&fit=crop&auto=format';

export default function App() {
  const [status, setStatus] = useState('idle');
  const [sectionRef, visible] = useInView(0.08);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('sent');
    e.target.reset();
    setTimeout(() => setStatus('idle'), 4000);
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-mfe ${visible ? 'is-visible' : ''}`}
    >
      <div className="contact-layout">
        <div className="contact-info">
          <div className="anim-item" style={{ '--i': 0 }}>
            <span className="section-tag">Contact</span>
            <h2>Let&apos;s build something electric</h2>
            <p>
              Open to freelance, contract, and full-time frontend roles and full stack roles also. Typical response within
              24 hours.
            </p>
          </div>

          <div className="availability anim-item" style={{ '--i': 1 }}>
            <span className="pulse-ring" aria-hidden="true" />
            <div>
              <strong>Currently available</strong>
              <span>Starting new projects · Remote-friendly</span>
            </div>
          </div>

          <ul className="services anim-item" style={{ '--i': 2 }} aria-label="Services">
            {SERVICES.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>

          <ul className="social-links anim-item" style={{ '--i': 3 }}>
            {LINKS.map(({ label, href, icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">{icon}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <figure className="workspace-preview anim-item" style={{ '--i': 4 }}>
            <img
              src={WORKSPACE_IMG}
              alt="Developer workspace with laptop and code on screen"
              loading="lazy"
              width={900}
              height={520}
            />
            <figcaption>Based in India · Working globally</figcaption>
          </figure>
        </div>

        <form className="contact-form anim-item" style={{ '--i': 2 }} onSubmit={handleSubmit}>
          <h3 className="form-title">Send a message</h3>
          <label>
            Name
            <input name="name" type="text" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required placeholder="you@email.com" />
          </label>
          <label>
            Project type
            <select name="type" defaultValue="freelance">
              <option value="freelance">Freelance</option>
              <option value="fulltime">Full-time</option>
              <option value="consulting">Consulting</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Tell me about timelines, stack, and goals…"
            />
          </label>
          <button type="submit" className="submit-btn">
            <span>Send message</span>
          </button>
          {status === 'sent' && (
            <p className="form-success" role="status">
              Message saved locally — connect a backend to deliver it for real.
            </p>
          )}
        </form>
      </div>

      <footer className="site-footer anim-item" style={{ '--i': 5 }}>
        <p>© {new Date().getFullYear()} Nagaraj Ravi · React Micro Frontends · Neon Plasma Theme</p>
      </footer>
    </section>
  );
}
