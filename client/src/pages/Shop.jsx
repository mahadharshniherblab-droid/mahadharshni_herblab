import { useLang } from '../context/LangContext.jsx';
import { PRODUCT_ORDER } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Shop({ embedded = false }) {
  const Heading = embedded ? 'h2' : 'h1';
  const { t } = useLang();
  return (
    <section className="section shop-section" id="shop">
      <div className="container">
        <Heading className="section__title" data-reveal="">{t('home.productsTitle')}</Heading>
        <p className="shipping-note shop-shipping" data-reveal="">{t('shippingPolicy')}</p>
        <div className="grid">
          {PRODUCT_ORDER.map((id, i) => <ProductCard key={id} id={id} index={i} />)}
        </div>
      </div>
    </section>
  );
}
