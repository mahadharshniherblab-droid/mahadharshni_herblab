import { useLang } from '../context/LangContext.jsx';

const media = location.protocol === 'file:' ? 'preview/site/media/ingredients/' : '/media/ingredients/';

// Hand-drawn line icons (no emoji) so each promise has its own illustration.
const HerbSprig = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 41V17" />
    <path d="M24 27c-6.5 0-10-4.2-10-9.5 6.5 0 10 4.2 10 9.5Z" />
    <path d="M24 27c6.5 0 10-4.2 10-9.5-6.5 0-10 4.2-10 9.5Z" />
    <path d="M24 18.5c-4.6 0-7-3-7-6.8 4.6 0 7 3 7 6.8Z" />
    <path d="M24 18.5c4.6 0 7-3 7-6.8-4.6 0-7 3-7 6.8Z" />
  </svg>
);

const Mortar = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 22h26l-2.6 9.4a5.2 5.2 0 0 1-5 3.9H18.6a5.2 5.2 0 0 1-5-3.9L11 22Z" />
    <path d="M7.5 22h33" />
    <path d="M16.5 39.5h15" />
    <path d="M28.5 20.5 35.8 9.2" />
    <path d="M33.6 6.4l4.4 3-2.6 3.8-4.4-3 2.6-3.8Z" />
  </svg>
);

const Magnifier = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="21" cy="21" r="11.5" />
    <path d="M29.5 29.5 39 39" />
    <path d="M21 25.4c-3.8 0-5.9-2.5-5.9-6 3.8 0 5.9 2.5 5.9 6Z" />
    <path d="M21 25.4c3.8 0 5.9-2.5 5.9-6-3.8 0-5.9 2.5-5.9 6Z" />
  </svg>
);

const ShieldLeaf = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 6.5 37 11.5v11.2c0 9.4-6.6 15.6-13 18.8-6.4-3.2-13-9.4-13-18.8V11.5l13-5Z" />
    <path d="M18 23.6l4.4 4.4 7.9-8.6" />
  </svg>
);

const ICONS = [HerbSprig, Mortar, Magnifier, ShieldLeaf];

export default function About({ embedded = false }) {
  const { t } = useLang();
  const Heading = embedded ? 'h2' : 'h1';
  return (
    <section className="section about-story" id="about">
      <div className="container">
        <p className="about-story__label" data-reveal="">{t('about.title')}</p>
        <Heading data-reveal="">{t('home.whyTitle')}</Heading>
        <p className="about-story__intro" data-reveal="">{t('about.body')}</p>

        <div className="about-story__bottom">
          <div className="about-story__media" data-reveal="up" aria-hidden="true">
            <img className="about-story__photo about-story__photo--a" src={media + "hibiscus.jpg"} alt="" loading="lazy" />
            <img className="about-story__photo about-story__photo--b" src={media + "neem.jpg"} alt="" loading="lazy" />
            <img className="about-story__photo about-story__photo--c" src={media + "fenugreek.jpg"} alt="" loading="lazy" />
            <p className="about-story__badge"><strong>{t('home.whyEyebrow')}</strong><span>{t('home.whyIntro')}</span></p>
          </div>

          <ol className="why">
            {t('home.why').map((point, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <li className="why__item" key={point.t} data-reveal="up" style={{ '--d': index * 110 + 'ms' }}>
                  <span className="why__icon"><Icon /></span>
                  <div className="why__text">
                    <span className="why__num">0{index + 1}</span>
                    <h3>{point.t}</h3>
                    <p>{point.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
