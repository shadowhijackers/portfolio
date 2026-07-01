import React from 'react';
import { useInView } from './useInView';
import './App.css';

const CONTACT_EMAIL = 'shakthipav@gmail.com';
const CONTACT_PHONE = '+91 80988 27964';
const CONTACT_PHONE_HREF = 'tel:+918098827964';

const CONTACT_CHANNELS = [
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    hint: 'Best for project briefs',
  },
  {
    label: 'Mobile',
    value: CONTACT_PHONE,
    href: CONTACT_PHONE_HREF,
    hint: 'India · WhatsApp friendly',
  },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/shadowhijackers', handle: '@shadowhijackers' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nagaraj-ravi-0b853b112',
    handle: 'Nagaraj Ravi',
  },
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
  const [sectionRef, visible] = useInView(0.08);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-mfe ${visible ? 'is-visible' : ''}`}
    >
      <div className="contact-inner">
        <header className="section-head anim-item" style={{ '--i': 0 }}>
          <span className="section-tag">Contact</span>
          <h2>Let&apos;s build something electric</h2>
          <p>
            Open to freelance, contract, and full-time frontend and full-stack roles.
            I usually reply within 24 hours.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-panel anim-item" style={{ '--i': 1 }}>
            <div className="availability">
              <span className="pulse-ring" aria-hidden="true" />
              <div>
                <strong>Currently available</strong>
                <span>Starting new projects · Remote-friendly</span>
              </div>
            </div>

            <div className="contact-channels" aria-label="Contact channels">
              {CONTACT_CHANNELS.map(({ label, value, href, hint }) => (
                <a key={label} className="contact-channel" href={href}>
                  <span className="contact-channel-top">
                    <span className="contact-channel-label">{label}</span>
                    <span className="contact-channel-arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                  <span className="contact-channel-value">{value}</span>
                  <span className="contact-channel-hint">{hint}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-panel anim-item" style={{ '--i': 2 }}>
            <div className="contact-block">
              <h3 className="contact-block-title">How I can help</h3>
              <ul className="service-chips" aria-label="Services">
                {SERVICES.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            <div className="contact-block">
              <h3 className="contact-block-title">Connect online</h3>
              <ul className="social-cards">
                {SOCIAL_LINKS.map(({ label, href, handle }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <span className="social-card-label">{label}</span>
                      <span className="social-card-handle">{handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer anim-item" style={{ '--i': 3 }}>
        <p>© {new Date().getFullYear()} Nagaraj Ravi · React Micro Frontends</p>
      </footer>
    </section>
  );
}
