import { useEffect, useRef } from 'react';

/** Spider-web hubs: x/y as 0–1 viewport, radius as fraction of min(w,h) */
const WEBS = [
  { x: 0.5, y: 0.42, radius: 0.58, spokes: 18, rings: 14, rotSpeed: 0.035, phase: 0 },
  { x: 0.14, y: 0.18, radius: 0.3, spokes: 14, rings: 9, rotSpeed: -0.028, phase: 1.2 },
  { x: 0.86, y: 0.22, radius: 0.34, spokes: 15, rings: 10, rotSpeed: 0.032, phase: 2.4 },
  { x: 0.18, y: 0.82, radius: 0.32, spokes: 13, rings: 9, rotSpeed: -0.025, phase: 3.6 },
  { x: 0.84, y: 0.76, radius: 0.36, spokes: 14, rings: 10, rotSpeed: 0.03, phase: 4.8 },
];

function drawSpiderWeb(ctx, cx, cy, maxR, spokes, rings, rotation, time, phase) {
  const pulse = 1 + Math.sin(time * 1.2 + phase) * 0.03;

  ctx.lineWidth = 0.75;
  ctx.strokeStyle = 'rgba(107, 127, 215, 0.14)';

  for (let i = 0; i < spokes; i++) {
    const angle = rotation + (i / spokes) * Math.PI * 2;
    const wobble = Math.sin(time * 0.8 + i * 0.5 + phase) * maxR * 0.015;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + Math.cos(angle) * (maxR + wobble) * pulse,
      cy + Math.sin(angle) * (maxR + wobble) * pulse
    );
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(155, 143, 217, 0.11)';
  ctx.lineWidth = 0.65;

  for (let ring = 1; ring <= rings; ring++) {
    const t = ring / rings;
    const baseR = maxR * t * pulse;
    ctx.beginPath();

    for (let i = 0; i <= spokes; i++) {
      const angle = rotation + (i / spokes) * Math.PI * 2;
      const sag = Math.sin(i * 1.7 + ring * 0.9 + time * 1.1 + phase) * maxR * 0.028 * t;
      const r = baseR + sag;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(107, 127, 215, 0.18)';
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

export default function WebTextureCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let hidden = document.hidden;

    const onMotionChange = (e) => {
      reducedMotion = e.matches;
    };
    const onVisibility = () => {
      hidden = document.hidden;
    };

    motionQuery.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibility);

    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = 0.6;
      canvas.width = Math.max(1, Math.floor(width * scale));
      canvas.height = Math.max(1, Math.floor(height * scale));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const draw = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      const sx = cw / width;
      const sy = ch / height;
      const base = Math.min(width, height);

      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.scale(sx, sy);

      const breathe = 0.98 + Math.sin(time * 0.5) * 0.02;

      for (const web of WEBS) {
        const cx = web.x * width;
        const cy = web.y * height;
        const maxR = web.radius * base * breathe;
        const rotation = reducedMotion
          ? web.phase * 0.3
          : time * web.rotSpeed + web.phase;

        drawSpiderWeb(ctx, cx, cy, maxR, web.spokes, web.rings, rotation, time, web.phase);
      }

      ctx.restore();
    };

    const tick = () => {
      if (!hidden) {
        draw();
        if (!reducedMotion) time += 0.012;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      motionQuery.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="neu-web-texture neu-spider-web" aria-hidden="true" />;
}
