import { useStore } from '../context/StoreContext.jsx';

export default function Price({ large = false, regular }) {
  const { pricing } = useStore();
  return <div className={`price ${large ? 'price--large' : ''}`}><strong className="price__offer">₹{regular ?? pricing.regular}</strong></div>;
}
