import React, { useEffect, useState } from 'react';
import { useIsMobile } from './useIsMobile';
import './App.css';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function HeaderApp() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 24);
      setScrollPct(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  function scrollToSection(id) {
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const headerClass = [
    'header-mfe',
    scrolled && 'is-scrolled',
    isMobile && 'is-mobile',
    menuOpen && 'menu-open',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollPct / 100})` }}
        aria-hidden="true"
      />

      <div className="header-inner">
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="logo-mark">NR</span>
          <span className="logo-text">Nagaraj Ravi</span>
        </a>

        {!isMobile && (
          <nav id="primary-nav" aria-label="Primary">
            <ul>
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {isMobile && (
          <>
            <a
              href="#contact"
              className={`header-quick-link ${active === 'contact' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="header-cta header-cta--mobile"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Hire me
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-bar" aria-hidden="true" />
              <span className="menu-bar" aria-hidden="true" />
              <span className="menu-bar" aria-hidden="true" />
            </button>
          </>
        )}

        {!isMobile && (
          <a
            href="#contact"
            className="header-cta header-cta--desktop"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            <span className="cta-dot" aria-hidden="true" />
            Hire me
          </a>
        )}
      </div>

      {isMobile && menuOpen && (
        <>
          <button
            type="button"
            className="menu-backdrop"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav id="mobile-nav" className="mobile-nav is-open" aria-label="Primary">
            <ul>
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

export default HeaderApp;
