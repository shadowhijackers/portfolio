import { useEffect, useRef } from 'react';

const STREAM_COUNT = 42;
const NODE_COUNT = 36;

const streamSeeds = Array.from({ length: STREAM_COUNT }, (_, index) => ({
  x: ((index * 73.17) % 100) / 100,
  y: ((index * 41.29 + 17) % 100) / 100,
  phase: index * 1.37,
  length: 0.45 + (index % 5) * 0.08,
  curl: 0.6 + (index % 4) * 0.25,
}));

const nodeSeeds = Array.from({ length: NODE_COUNT }, (_, index) => ({
  x: ((index * 59.11) % 100) / 100,
  y: ((index * 83.07 + 9) % 100) / 100,
  phase: index * 0.93,
  size: 1.1 + (index % 4) * 0.35,
}));

function flowAngle(x, y, time, reducedMotion) {
  const t = reducedMotion ? 0 : time;
  return (
    Math.sin(x * 2.4 + t * 0.55) * 1.2 +
    Math.cos(y * 2.1 - t * 0.45) * 1.1 +
    Math.sin((x + y) * 1.6 + t * 0.35) * 0.8
  );
}

function drawStreamlines(ctx, width, height, time, reducedMotion) {
  const step = 7;
  const maxSteps = Math.floor((Math.min(width, height) * 0.55) / step);

  for (const seed of streamSeeds) {
    let x = seed.x * width;
    let y = seed.y * height;
    const path = [{ x, y }];

    for (let i = 0; i < maxSteps * seed.length; i++) {
      const nx = x / width;
      const ny = y / height;
      const angle = flowAngle(nx * Math.PI * 2, ny * Math.PI * 2, time + seed.phase, reducedMotion);
      const curl = seed.curl * (reducedMotion ? 0 : 1);

      x += Math.cos(angle) * step * curl;
      y += Math.sin(angle) * step * curl;

      if (x < -20 || x > width + 20 || y < -20 || y > height + 20) break;
      path.push({ x, y });
    }

    if (path.length < 4) continue;

    const alpha = 0.06 + (seed.phase % 1) * 0.05;
    ctx.strokeStyle = `rgba(107, 127, 215, ${alpha})`;
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    path.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    const head = path[path.length - 1];
    const tail = path[Math.max(0, path.length - 6)];
    const dx = head.x - tail.x;
    const dy = head.y - tail.y;
    const mag = Math.hypot(dx, dy) || 1;
    const pulse = reducedMotion ? 0.5 : 0.35 + Math.sin(time * 1.6 + seed.phase) * 0.25;

    ctx.fillStyle = `rgba(155, 143, 217, ${0.2 * pulse})`;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 1.6 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawNodes(ctx, width, height, time, reducedMotion) {
  const positions = [];

  for (const node of nodeSeeds) {
    const drift = reducedMotion ? 0 : 1;
    const x =
      node.x * width +
      Math.sin(time * 0.5 + node.phase) * 22 * drift;
    const y =
      node.y * height +
      Math.cos(time * 0.42 + node.phase * 1.1) * 18 * drift;
    const pulse = reducedMotion
      ? 0.55
      : 0.4 + Math.sin(time * 1.2 + node.phase) * 0.3;

    positions.push({ x, y, pulse });

    ctx.fillStyle = `rgba(107, 127, 215, ${0.18 * pulse})`;
    ctx.beginPath();
    ctx.arc(x, y, node.size * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(199, 125, 160, ${0.12 * pulse})`;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(x, y, node.size * pulse * 2.8, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (reducedMotion) return;

  ctx.lineWidth = 0.45;
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const a = positions[i];
      const b = positions[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist > 160) continue;

      const alpha = (1 - dist / 160) * 0.1;
      ctx.strokeStyle = `rgba(155, 143, 217, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
}

function drawRipples(ctx, width, height, time, reducedMotion) {
  const centers = [
    { x: 0.22, y: 0.28, phase: 0 },
    { x: 0.78, y: 0.34, phase: 1.4 },
    { x: 0.54, y: 0.72, phase: 2.8 },
  ];

  for (const center of centers) {
    const cx = center.x * width;
    const cy = center.y * height;
    const rings = 4;

    for (let ring = 0; ring < rings; ring++) {
      const progress = reducedMotion
        ? ring / rings
        : (ring / rings + (time * 0.08 + center.phase) % 1) % 1;
      const radius = progress * Math.min(width, height) * 0.22;
      const alpha = (1 - progress) * 0.09;

      ctx.strokeStyle = `rgba(107, 127, 215, ${alpha})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

export function TextureCanvas() {
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

    const onMotionChange = (event) => {
      reducedMotion = event.matches;
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
      const scale = 0.65;
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

      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.scale(sx, sy);

      drawRipples(ctx, width, height, time, reducedMotion);
      drawStreamlines(ctx, width, height, time, reducedMotion);
      drawNodes(ctx, width, height, time, reducedMotion);

      ctx.restore();
    };

    const tick = () => {
      if (!hidden) {
        draw();
        if (!reducedMotion) time += 0.011;
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

  return <canvas ref={canvasRef} className="neu-texture-canvas" aria-hidden="true" />;
}

export default TextureCanvas;
