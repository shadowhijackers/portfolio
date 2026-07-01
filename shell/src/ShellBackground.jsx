import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import WebTextureCanvas from './WebTextureCanvas';

const FLOATING_PARTICLES = [
  { top: '14%', left: '10%', size: 5, delay: 0, duration: 16 },
  { top: '32%', left: '82%', size: 4, delay: 1.5, duration: 20 },
  { top: '58%', left: '6%', size: 3, delay: 3, duration: 18 },
  { top: '72%', left: '88%', size: 5, delay: 0.8, duration: 22 },
  { top: '22%', left: '48%', size: 3, delay: 2.2, duration: 15 },
  { top: '84%', left: '42%', size: 4, delay: 4, duration: 19 },
  { top: '46%', left: '92%', size: 3, delay: 1, duration: 17 },
  { top: '8%', left: '62%', size: 4, delay: 2.8, duration: 21 },
  { top: '38%', left: '24%', size: 3, delay: 1.8, duration: 23 },
  { top: '65%', left: '55%', size: 4, delay: 3.5, duration: 17 },
];

const FLOATING_RINGS = [
  { top: '18%', left: '72%', size: 120, delay: 0, duration: 24 },
  { top: '55%', left: '14%', size: 90, delay: 2, duration: 20 },
  { top: '78%', left: '68%', size: 70, delay: 4, duration: 26 },
  { top: '35%', left: '38%', size: 55, delay: 1, duration: 18 },
];

const AURORA_BANDS = [
  { className: 'neu-aurora neu-aurora-1' },
  { className: 'neu-aurora neu-aurora-2' },
  { className: 'neu-aurora neu-aurora-3' },
];

export function ShellBackground() {
  useEffect(() => {
    let scrollRaf = 0;
    let pointerRaf = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;

    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll-y', String(window.scrollY));
      });
    };

    const onPointerMove = (event) => {
      pointerX = event.clientX / window.innerWidth;
      pointerY = event.clientY / window.innerHeight;

      cancelAnimationFrame(pointerRaf);
      pointerRaf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', String(pointerX));
        document.documentElement.style.setProperty('--mouse-y', String(pointerY));
      });
    };

    onScroll();
    document.documentElement.style.setProperty('--mouse-x', '0.5');
    document.documentElement.style.setProperty('--mouse-y', '0.5');

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(pointerRaf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return createPortal(
    <div className="neu-bg" aria-hidden="true">
      <div className="neu-bg-mesh" />
      {AURORA_BANDS.map((band) => (
        <span key={band.className} className={band.className} />
      ))}
      <WebTextureCanvas />
      <span className="neu-blob neu-blob-1" />
      <span className="neu-blob neu-blob-2" />
      <span className="neu-blob neu-blob-3" />
      <span className="neu-blob neu-blob-4" />
      <span className="neu-blob neu-blob-5" />
      <span className="neu-blob neu-blob-6" />
      {FLOATING_RINGS.map((ring, index) => (
        <span
          key={`ring-${index}`}
          className="neu-ring"
          style={{
            top: ring.top,
            left: ring.left,
            width: ring.size,
            height: ring.size,
            animationDelay: `${ring.delay}s`,
            animationDuration: `${ring.duration}s`,
          }}
        />
      ))}
      {FLOATING_PARTICLES.map((particle, index) => (
        <span
          key={`particle-${index}`}
          className="neu-particle"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>,
    document.body
  );
}
