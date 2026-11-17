import { useLang } from '../context/LangContext.jsx';
import { getLoadedContent } from '../lib/content.js';

const LOCALES = { en: 'en-IN', ta: 'ta-IN', te: 'te-IN', hi: 'hi-IN' };

function formatDate(value, lang) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(LOCALES[lang] ?? 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * The seasonal offers block, always shown right below the hero.
 * Whatever the owner posts under “Seasonal offer” in the dashboard appears here.
 */
export default function SeasonalOffer() {
  const { t, lang } = useLang();
  const content = getLoadedContent();
  const offers = (content.offers ?? [content.offer]).filter((offer) => offer?.image && offer.active !== false);

  return (
    <section className="section seasonal" id="seasonal-offer">
      <div className="container seasonal__inner">
        <p className="seasonal__label">{t('seasonal.label')}</p>
        {offers.map((offer) => (
          <article key={offer.id ?? offer.image} className="seasonal__entry">
            <h2 className="seasonal__title">{offer.title || t('seasonal.title')}</h2>
            <div className="seasonal__card" data-reveal="zoom">
              <div className="seasonal__media">
                <img src={offer.image} alt={offer.title || t('seasonal.title')} loading="lazy" />
              </div>
              <div className="seasonal__text">
                {offer.percent > 0 && <p className="seasonal__percent">{offer.percent}% OFF</p>}
                {(offer.from || offer.to) && <p className="seasonal__dates">
                  <strong>{t('seasonal.valid')}:</strong> {formatDate(offer.from, lang) || '—'} – {formatDate(offer.to, lang) || '—'}
                </p>}
                {offer.message && <p className="seasonal__intro">{offer.message}</p>}
              </div>
            </div>
          </article>
        ))}
        {!offers.length && <>
          <h2 className="seasonal__title">{t('seasonal.title')}</h2>
          <p className="seasonal__intro">{t('seasonal.intro')}</p>
          <p className="seasonal__empty">{t('seasonal.empty')}</p>
        </>}
      </div>
    </section>
  );
}
