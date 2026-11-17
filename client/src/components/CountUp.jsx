import { useEffect, useRef, useState } from 'react';
import { reducedMotion } from '../lib/effects.js';

// Counts from 0 up to `to` when it first scrolls into view.
export default function CountUp({ to, suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(reducedMotion() ? to : 0);
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) { setValue(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{value}{suffix}</span>;
}
