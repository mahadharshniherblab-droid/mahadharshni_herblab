import { useRef, useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { ingredientGroups, localized } from '../data/ingredients.js';

const media = location.protocol === 'file:' ? 'preview/site/media/ingredients/' : '/media/ingredients/';

export default function Ingredients({ embedded = false }) {
  const Heading = embedded ? 'h2' : 'h1';
  const { t, lang } = useLang();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);

  function enlarge(entry) {
    setSelected(entry);
    dialog.current.showModal();
  }

  return (
    <section className="ingredients container" id="ingredients">
      <Heading data-reveal="">{t('nav.ingredients')}</Heading>
      {ingredientGroups.map(({ key, product, label, entries }) => {
        // The owner sets this short kind in the dashboard; older groups fall back to the built-in wording.
        const kind = label ? localized(label, lang) : t('ingredientGroups.' + key);
        const isHair = key === 'hair';
        const slides = isHair ? [entries.slice(0, 3), entries.slice(3, 8), entries.slice(8)] : [entries];
        const current = isHair ? page : 0;
        const showIntro = isHair && current === 0;
        return (
          <section className="ingredient-group" key={key} aria-labelledby={key + '-title'} data-reveal="">
            <header className="ingredient-head">
              <h2 id={key + '-title'}>{product}{kind ? <span> {kind}</span> : null}</h2>
              {slides.length > 1 && <div className="slide-controls">
                <button aria-label={t('nature.previous')} disabled={current === 0}
                  onClick={() => setPage(current - 1)}>←</button>
                <span aria-live="polite">{current + 1} / {slides.length}</span>
                <button aria-label={t('nature.next')} disabled={current === slides.length - 1}
                  onClick={() => setPage(current + 1)}>→</button>
              </div>}
            </header>
            <div key={current} className={'ingredient-spread' + (showIntro ? ' with-intro' : '')}>
              {showIntro && <div className="nature-intro">
                <h3>{t('nature.title')}</h3>
                <p>{t('nature.body')}</p>
              </div>}
              <ul className={'specimens' + (slides[current].length > 3 ? ' five' : '')}>
                {slides[current].map((entry, i) => (
                  <li key={entry[0]} style={{ '--d': i * 70 + 'ms' }}>
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
