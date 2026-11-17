import { useLang } from '../context/LangContext.jsx';

// Illustrated badges — one custom picture per promise (no emoji, no ingredient photos).
const Ring = () => (
  <>
    <circle cx="48" cy="48" r="44" className="why-art__bg" />
    <circle cx="48" cy="48" r="44" fill="none" className="why-art__ring" strokeWidth="1.5" strokeDasharray="3 5" />
  </>
);

const Nature = () => (
  <svg className="why-art" viewBox="0 0 96 96" aria-hidden="true">
    <defs>
      <linearGradient id="why-g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9cb85a" /><stop offset="1" stopColor="#4f6b25" /></linearGradient>
      <linearGradient id="why-g1b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c3d68a" /><stop offset="1" stopColor="#7d9a3f" /></linearGradient>
    </defs>
    <Ring />
    <ellipse cx="48" cy="80" rx="20" ry="4" fill="#000" opacity=".08" />
    <g className="why-art__sway">
      <path d="M48 80 C48 64 47 50 49 34" stroke="#4f6b25" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M48 58 C34 58 24 48 24 34 C38 34 48 44 48 58Z" fill="url(#why-g1b)" />
      <path d="M49 48 C49 32 58 20 74 18 C74 34 64 46 49 48Z" fill="url(#why-g1)" />
      <path d="M49 48 C56 38 63 30 71 22" stroke="#e8f0c8" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".8" />
      <path d="M47 57 C40 50 33 44 27 37" stroke="#f3f7df" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".8" />
      <circle cx="49" cy="33" r="4" fill="#d4b46a" />
    </g>
  </svg>
);

const Everyday = () => (
  <svg className="why-art" viewBox="0 0 96 96" aria-hidden="true">
    <defs>
      <radialGradient id="why-g2s" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#ffe7a3" /><stop offset="1" stopColor="#e0a93b" /></radialGradient>
      <linearGradient id="why-g2d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a5c46a" /><stop offset="1" stopColor="#557330" /></linearGradient>
    </defs>
    <Ring />
    <g stroke="#e0a93b" strokeWidth="3" strokeLinecap="round" opacity=".9">
      <line x1="34" y1="12" x2="34" y2="18" /><line x1="16" y1="30" x2="22" y2="30" />
      <line x1="21" y1="17" x2="25" y2="21" /><line x1="47" y1="17" x2="43" y2="21" />
      <line x1="21" y1="43" x2="25" y2="39" />
    </g>
    <circle cx="34" cy="30" r="10" fill="url(#why-g2s)" />
    <ellipse cx="56" cy="82" rx="17" ry="3.5" fill="#000" opacity=".08" />
    <g className="why-art__sway">
      <path d="M56 30 C64 42 72 52 72 62 A16 16 0 0 1 40 62 C40 52 48 42 56 30Z" fill="url(#why-g2d)" />
      <path d="M48 60 C48 54 51 49 54 45" stroke="#f3f7df" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".75" />
      <path d="M56 74 C56 66 60 61 64 59" stroke="#e8f0c8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity=".6" />
    </g>
  </svg>
);

const Tradition = () => (
  <svg className="why-art" viewBox="0 0 96 96" aria-hidden="true">
    <defs>
      <linearGradient id="why-g3p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbf1d6" /><stop offset="1" stopColor="#e3cf9c" /></linearGradient>
      <linearGradient id="why-g3r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c79a45" /><stop offset="1" stopColor="#8a6624" /></linearGradient>
    </defs>
    <Ring />
    <ellipse cx="48" cy="80" rx="24" ry="4" fill="#000" opacity=".08" />
    <rect x="26" y="24" width="44" height="50" rx="3" fill="url(#why-g3p)" stroke="#b8954a" strokeWidth="1.2" />
    <rect x="22" y="20" width="52" height="8" rx="4" fill="url(#why-g3r)" />
    <rect x="22" y="70" width="52" height="8" rx="4" fill="url(#why-g3r)" />
    <g stroke="#b8954a" strokeWidth="1.8" strokeLinecap="round" opacity=".7">
      <line x1="33" y1="36" x2="55" y2="36" /><line x1="33" y1="43" x2="50" y2="43" />
    </g>
    <g className="why-art__sway">
      <path d="M48 66 C48 60 49 55 51 51" stroke="#4f6b25" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M50 56 C50 48 56 44 63 44 C62 51 57 56 50 56Z" fill="#7d9a3f" />
      <path d="M48 61 C47 54 41 51 35 52 C36 58 41 62 48 61Z" fill="#9cb85a" />
    </g>
  </svg>
);

const Doorstep = () => (
  <svg className="why-art" viewBox="0 0 96 96" aria-hidden="true">
    <defs>
      <linearGradient id="why-g4h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e9a07a" /><stop offset="1" stopColor="#b8583a" /></linearGradient>
      <linearGradient id="why-g4p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9cb85a" /><stop offset="1" stopColor="#5b7a2c" /></linearGradient>
    </defs>
    <Ring />
    <ellipse cx="48" cy="82" rx="24" ry="3.5" fill="#000" opacity=".08" />
    <g className="why-art__sway">
      <path d="M48 28 C40 20 28 22 28 32 C28 40 38 45 48 52 C58 45 68 40 68 32 C68 22 56 20 48 28Z" fill="url(#why-g4h)" />
      <path d="M34 32 C34 28 37 26 40 26" stroke="#fde3d3" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".8" />
    </g>
    <path d="M18 66 C24 62 30 60 38 62 L52 64 C56 65 56 70 52 70 L42 70 M18 78 L30 74 C36 76 46 80 54 78 L74 68 C78 66 76 60 71 62 L58 67" fill="none" stroke="url(#why-g4p)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = [Nature, Everyday, Tradition, Doorstep];

export default function About({ embedded = false }) {
  const { t } = useLang();
  const Heading = embedded ? 'h2' : 'h1';
  return (
    <section className="section about-story" id="about">
      <div className="container">
        <p className="about-story__label" data-reveal="">{t('about.title')}</p>
        <Heading className="section__title" data-reveal="">{t('home.whyTitle')}</Heading>
        <p className="about-story__intro" data-reveal="">{t('about.body')}</p>

        <ol className="why-cards">
          {t('home.why').map((point, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <li className="why-card" key={point.t} data-reveal="up" style={{ '--d': index * 110 + 'ms' }}>
                <span className="why-card__num">0{index + 1}</span>
                <Icon />
                <h3>{point.t}</h3>
                <p>{point.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
