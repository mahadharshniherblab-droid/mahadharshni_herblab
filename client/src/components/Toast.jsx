import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';

export default function Toast() {
  const { t } = useLang();
  const { toast, dismissToast, topOffer } = useStore();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismissToast, 3600);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;
  return (
    <div className="toast" key={toast.id} role="status">
      {toast.img && <img src={toast.img} alt="" />}
      <div className="toast__body">
        <strong><span className="toast__check" aria-hidden="true">✓</span> {toast.text}</strong>
        {topOffer.percent > 0 && <small>{t('fx.offerTitle', { off: topOffer.percent })} · {t('fx.firstOrder')}</small>}
        <Link to="/cart" onClick={dismissToast}>{t('fx.viewCart')} →</Link>
      </div>
      <button className="toast__close" onClick={dismissToast} aria-label={t('fx.close')}>×</button>
      <span className="toast__timer" aria-hidden="true" />
    </div>
  );
}
