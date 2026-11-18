import { useRef, useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { ingredientGroups, localized } from '../data/ingredients.js';

const media = location.protocol === 'file:' ? 'preview/site/media/ingredients/' : '/media/ingredients/';

export default function Ingredients({ embedded = false }) {
  const Heading = embedded ? 'h2' : 'h1';
  const { t, lang } = useLang();
  const [selected, setSelected] = useState(null);
  const [hairPage, setHairPage] = useState(0);
  const dialog = useRef(null);

  function enlarge(entry) {
    setSelected(entry);
    dialog.current.showModal();
  }

  return (
    <section className="ingredients container" id="ingredients">
      <Heading className="section__title" data-reveal="">{t('nav.ingredients')}</Heading>
      {ingredientGroups.map(({ key, product, label, entries }) => {
        // The owner sets this short kind in the dashboard; older groups fall back to the built-in wording.
        const kind = label ? localized(label, lang) : t('ingredientGroups.' + key);
        const isHair = key === 'hair';
        const showIntro = isHair;
        const pageCount = 1 + Math.ceil(Math.max(0, entries.length - 3) / 5);
        const activePage = Math.min(hairPage, pageCount - 1);
        return (
          <section className="ingredient-group" key={key} aria-labelledby={key + '-title'} data-reveal="">
            <header className="ingredient-head">
              <h2 id={key + '-title'}>{product}{kind ? <span> {kind}</span> : null}</h2>
            {isHair && pageCount > 1 && <nav className="slide-controls ingredient-pagination" aria-label="Ingredient pages">
              <button aria-label="Previous ingredients" disabled={activePage === 0} onClick={() => setHairPage(activePage - 1)}>←</button>
              <span className="ingredient-page-number" aria-live="polite" aria-label={`Page ${activePage + 1} of ${pageCount}`}>{activePage + 1}</span>
              <button aria-label="Next ingredients" disabled={activePage === pageCount - 1} onClick={() => setHairPage(activePage + 1)}>→</button>
            </nav>}
            </header>
            {/* Desktop pages; the complete swipeable ingredient row is preserved on mobile. */}
            <div className={'ingredient-spread' + (showIntro ? ' with-intro' : '')}>
              {showIntro && <div className="nature-intro">
                <h3>{t('nature.title')}</h3>
                <p>{t('nature.body')}</p>
              </div>}
              <ul className={'specimens' + (entries.length > 3 ? ' five' : '') + (isHair ? ' desktop-paged page-' + activePage : '')}>
                {entries.map((entry, i) => (
                  <li key={entry[0]} className={isHair && (i < 3 ? 0 : 1 + Math.floor((i - 3) / 5)) !== activePage ? 'desktop-hidden' : ''} style={{ '--d': i * 70 + 'ms' }}>
                    <button className="specimen" aria-haspopup="dialog" onClick={() => enlarge(entry)}>
                      {entry[3] !== '' && <img src={entry[3] || media + entry[0] + '.jpg'} alt="" />}
                      <span><strong>{localized(entry[1], lang)}</strong>
                        <small>{localized(entry[2], lang)}</small></span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </section>
        );
      })}
      <dialog className="botanical-detail" ref={dialog} aria-labelledby="ingredient-detail-name"
        onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
        {selected && <article>
          <form method="dialog"><button aria-label={t('closeIngredient')}>×</button></form>
          {selected[3] !== '' && <img src={selected[3] || media + selected[0] + '.jpg'} alt="" />}
          <div className="botanical-caption">
            <h2 id="ingredient-detail-name">{localized(selected[1], lang)}</h2>
            <p>{localized(selected[2], lang)}</p>
          </div>
        </article>}
      </dialog>
    </section>
  );
}
