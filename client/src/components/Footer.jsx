import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext.jsx';
import { contact } from '../data/contact.js';
import Logo from './Logo.jsx';

export default function Footer() {
  const { t } = useLang();
  const siteUrl = 'https://mozhitech.vercel.app';
  const [beforeLink, afterLink] = t('reach.websiteInvite').split('{brand}');
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <Link to="/" className="footer__brand">
              <Logo size={54} alt="" />
              <span className="footer__brand-text">
                <strong>Mahadharshni</strong>
                <small>Herblab</small>
              </span>
            </Link>
            <p className="footer__disclaimer">{t('footer.disclaimer')}</p>
          </div>
          <nav aria-label={t('reach.explore')}>
            <h2>{t('reach.explore')}</h2>
            {['shop', 'ingredients', 'about', 'contact'].map(path =>
              <Link key={path} to={'/' + path}>{t('nav.' + path)}</Link>)}
          </nav>
          <div className="footer__channels">
            <h2>{t('nav.contact')}</h2>
            <a href={'tel:' + contact.phone}>{contact.phoneLabel}</a>
            <a href={'mailto:' + contact.email}>{contact.email}</a>
            <a href={contact.whatsapp}>{t('reach.whatsapp')}</a>
            <a href={contact.instagram}>{t('reach.instagram')} · {contact.handle}</a>
          </div>
        </div>
        <div className="footer__bottom">
          <small>© {new Date().getFullYear()} Mahadharshni Herblab. {t('footer.rights')}</small>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('reach.top')} ↑</button>
        </div>
        <div className="footer__credit">{t('reach.credit')} <a href={siteUrl}>MozhiTech Solutions ↗</a></div>
        <p className="footer__invite">{beforeLink}<a href={siteUrl}><strong>MozhiTech Solutions</strong></a>{afterLink}</p>
      </div>
    </footer>
  );
}
