import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { useStore } from '../context/StoreContext.jsx';

export default function OfferBar() {
  const { t } = useLang();
  const { pricing } = useStore();
  // The top strip has its own percentage (Price tab), separate from the product prices.
  const off = pricing.topOfferPercent ?? pricing.discountPercent;
  return (
    <div className="offer-bar" role="note">
      <div className="offer-bar__inner">
        <span className="offer-bar__leaf" aria-hidden="true">🌿</span>
        <span className="offer-bar__tag">{t('fx.offerTitle', { off })}</span>
        <span className="offer-bar__text">{t('fx.every')}</span>
        <strong className="offer-bar__price">{t('fx.from')} ₹{pricing.offer}</strong>
        {t('fx.only') && <span className="offer-bar__text">{t('fx.only')}</span>}
        <span className="offer-bar__mrp">MRP <s>₹{pricing.regular}</s></span>
        <span className="offer-bar__off">{off}% OFF</span>
        <Link to="/shop" className="offer-bar__cta">{t('fx.cta')} <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
