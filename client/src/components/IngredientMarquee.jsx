import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { ingredientGroups, localized } from '../data/ingredients.js';

// A running ribbon with the names of all the herbs (13 in the hair oil + 3 in the roll-on).
export default function IngredientMarquee() {
  const { lang, t } = useLang();
  const names = ingredientGroups.flatMap((g) => g.entries.map((e) => localized(e[1], lang)));
  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {names.map((name, i) => (
        <li key={i}>
          <Link to="/ingredients" tabIndex={hidden ? -1 : undefined}>{name}</Link>
          <span className="marquee__dot" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="marquee" aria-label={t('nav.ingredients')}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
