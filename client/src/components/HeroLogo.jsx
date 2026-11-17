import { useRef, useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { MEDIA } from '../lib/media.js';
import { leafBurst } from '../lib/effects.js';

// The big round logo: a subtle dashed ring spinning slowly around it,
// a 3D tilt that follows the mouse, and a leaf burst + spin when tapped.
export default function HeroLogo() {
  const { t } = useLang();
  const box = useRef(null);
  const [spin, setSpin] = useState(0);
  const [hint, setHint] = useState(false);

  const tilt = (e) => {
    const r = box.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    box.current.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg');
    box.current.style.setProperty('--rx', (-y * 14).toFixed(2) + 'deg');
    box.current.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%');
    box.current.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
  };
  const reset = () => {
    box.current.style.setProperty('--rx', '0deg');
    box.current.style.setProperty('--ry', '0deg');
  };
  const tap = (e) => {
    setSpin((s) => s + 1);
    setHint(true);
    setTimeout(() => setHint(false), 2200);
    const r = e.currentTarget.getBoundingClientRect();
    leafBurst(r.left + r.width / 2, r.top + r.height / 2, 18);
  };

  return (
    <div className="hero__visual" ref={box} onPointerMove={tilt} onPointerLeave={reset}>
      <span className="hero__ring hero__ring--dashed" aria-hidden="true" />
      <button type="button" className="hero__logo-btn" onClick={tap} aria-label="Mahadharshni Herblab">
        <img key={spin} className={spin ? 'is-spinning' : ''} src={MEDIA + 'logo.png'} alt="Mahadharshni Herblab" fetchPriority="high" />
        <span className="hero__glare" aria-hidden="true" />
      </button>
      <span className={'hero__bubble' + (hint ? ' is-on' : '')} aria-live="polite">{hint ? '✨ ' + t('tagline') : ''}</span>
    </div>
  );
}
