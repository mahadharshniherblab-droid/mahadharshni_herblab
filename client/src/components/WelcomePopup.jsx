import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { MEDIA } from '../lib/media.js';
import { leafBurst } from '../lib/effects.js';

const KEY = 'mh-offer-popup-seen';

// First-order offer pop-up, shown once per visit a few seconds after the intro.
export default function WelcomePopup({ ready }) {
  const { t } = useLang();
  const { topOffer, cartCount } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dialog = useRef(null);
  const [shown, setShown] = useState(() => {
    try { return !!sessionStorage.getItem(KEY); } catch { return true; }
  });
  const off = topOffer.percent;

  useEffect(() => {
    if (!off || !ready || shown || pathname === '/cart' || cartCount > 0) return;
    const timer = setTimeout(() => {
      try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ }
      setShown(true);
      dialog.current?.showModal();
      const r = dialog.current?.getBoundingClientRect();
      if (r) leafBurst(r.left + r.width / 2, r.top + 40, 16);
    }, 2500);
    return () => clearTimeout(timer);
  }, [off, ready, shown, pathname, cartCount]);

  const close = () => dialog.current?.close();
  const grab = () => { close(); navigate('/shop'); };

  return (
    <dialog className="welcome" ref={dialog} aria-labelledby="welcome-title"
      onClick={(e) => { if (e.target === dialog.current) close(); }}>
      <div className="welcome__card">
        <button className="welcome__x" onClick={close} aria-label={t('fx.close')}>×</button>
        <div className="welcome__badge"><span>{off}%</span><small>OFF</small></div>
        <img className="welcome__logo" src={MEDIA + 'logo.png'} alt="" width="96" height="96" />
        <h2 id="welcome-title">{t('fx.welcomeTitle')}</h2>
        <p>{t('fx.firstOrder')} · {t('fx.offerTitle', { off })}</p>
        <div className="welcome__price"><strong>₹{topOffer.price}</strong><s>₹{topOffer.mrp}</s></div>
        <div className="welcome__actions">
          <button className="btn btn--gold btn--lg" onClick={grab}>{t('fx.welcomeCta')} →</button>
          <button className="link-btn" onClick={close}>{t('fx.welcomeLater')}</button>
        </div>
      </div>
    </dialog>
  );
}
