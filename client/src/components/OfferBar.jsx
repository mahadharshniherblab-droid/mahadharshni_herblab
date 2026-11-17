import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';

export default function OfferBar() {
  const { t } = useLang();
  const { topOffer } = useStore();
  const off = topOffer.percent;
  if (!off) return null;
  return (
    <div className="offer-bar" role="note">
      <div className="offer-bar__inner">
        <span className="offer-bar__leaf" aria-hidden="true">🌿</span>
        <span className="offer-bar__tag">{t('fx.offerTitle', { off })}</span>
        <span className="offer-bar__text">{t('fx.firstOrder')}</span>
        <span className="offer-bar__off" aria-hidden="true">{t('fx.offerTitle', { off })}</span>
        <Link to="/shop" className="offer-bar__cta">{t('fx.cta')} <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
