import { useLang } from '../context/LangContext.jsx';
import Logo from '../components/Logo.jsx';
import { contact } from '../data/contact.js';

export default function Contact({ embedded = false }) {
  const Heading = embedded ? 'h2' : 'h1';
  const { t } = useLang();
  const media = location.protocol === 'file:' ? 'preview/site/media/' : '/media/';
  return (
    <section className="reach" id="contact">
      <div className="container reach__inner" data-reveal="zoom">
        <Logo size={128} className="logo--pulse" />
        <Heading>{t('reach.title')}</Heading>
        <p>{t('reach.intro')}</p>
        <div className="reach__buttons">
          <a className="btn btn--gold" href={'tel:' + contact.phone}>{t('reach.call')} 70101 24244</a>
          <a className="btn btn--ghost" href={contact.whatsapp} target="_blank" rel="noreferrer">{t('reach.whatsapp')}</a>
          <a className="btn btn--ghost" href={'mailto:' + contact.email}>{t('reach.email')}</a>
        </div>
        <a className="reach__instagram" href={contact.instagram} target="_blank" rel="noreferrer">
          <img src={media + 'instagram-qr.png'} width="128" height="128" alt="" />
          <span><small>{t('reach.follow')}</small><strong>{contact.handle}</strong></span>
        </a>
      </div>
    </section>
  );
}
