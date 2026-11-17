import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { contact } from '../data/contact.js';

// Scroll progress bar, back-to-top button with a progress ring, and a WhatsApp chat bubble.
export default function FloatingActions() {
  const { t } = useLang();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);
        document.documentElement.toggleAttribute('data-scrolled', scrollY > 24);
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);

  const circumference = 2 * Math.PI * 22;
  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="fab-stack">
        <a className="fab fab--wa" href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label={t('reach.whatsapp')}>
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z"/></svg>
          <span className="fab__tip">{t('reach.whatsapp')}</span>
        </a>
        <button className={'fab fab--top' + (progress > 0.08 ? ' is-on' : '')} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('reach.top')} tabIndex={progress > 0.08 ? 0 : -1}>
          <svg className="fab__ring" viewBox="0 0 50 50" aria-hidden="true">
            <circle cx="25" cy="25" r="22" />
            <circle cx="25" cy="25" r="22" className="fab__ring-fill" style={{ strokeDasharray: circumference, strokeDashoffset: circumference * (1 - progress) }} />
          </svg>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </>
  );
}
