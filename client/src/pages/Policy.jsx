import { Link } from 'react-router-dom';
import { contact } from '../data/contact.js';

export const policies = [
  { slug: 'privacy-policy', title: 'Privacy Policy', sections: [
    ['Information we collect', 'When you contact us or submit checkout details, we collect the information you provide, such as your name, phone number, delivery address, enquiry and order details.'],
    ['How we use information', 'We use this information to respond to enquiries, calculate order eligibility, arrange delivery and provide order support. Delivery details may be shared with the delivery provider for fulfilment. Our store uses hosting and data services to operate the website and store order records.'],
    ['Browser storage', 'The website uses browser storage to remember your cart and preferences. You can clear this data in your browser settings.'],
    ['Privacy enquiries', 'Contact us to ask about your information or request a correction or deletion. We will review your request, including any records needed for ongoing orders or applicable record-keeping requirements.']
  ]},
  { slug: 'terms-and-conditions', title: 'Terms & Conditions', sections: [
    ['Shopping with us', 'These terms describe shopping with Mahadharshni Herblab. Please review the product information, quantity, delivery address and final price before proceeding with an order.'],
    ['Products and pricing', 'Product pages show product details, sizes and prices in Indian rupees. Applicable discounts and shipping charges are shown in the cart and checkout. Availability and offers may change; the final order summary shows the amount for your order.'],
    ['Checkout and payment', 'Submitting an address creates a pending checkout; it does not by itself confirm payment. Check your payment status and contact us if a payment is debited without confirmation before attempting another payment.'],
    ['Product use', 'Read the product label and directions before use. Contact us with product questions before ordering. Website information does not replace individual advice from a qualified healthcare professional.'],
    ['Order support', 'Our Shipping Policy and Cancellation & Refund Policy explain how to contact us about delivery, cancellation and order issues.']
  ]},
  { slug: 'shipping-policy', title: 'Shipping Policy', sections: [
    ['Shipping charges', 'Free shipping above ₹1,000 | ₹80 shipping below ₹1,000.'],
    ['How shipping is calculated', 'Shipping is calculated on the merchandise subtotal after discounts. At exactly ₹1,000, the shipping charge is ₹80. Your checkout summary displays the applicable charge before payment.'],
    ['Delivery address', 'Please provide a complete address, correct PIN code and reachable phone number. Contact us promptly if an address needs correction.'],
    ['Dispatch and delivery', 'Contact us before ordering to confirm service availability and the expected dispatch and delivery time for your location. Delivery timing depends on availability, location and the delivery provider.'],
    ['Delayed or damaged deliveries', 'For a delivery delay, missing parcel or damage, contact us with your order reference and relevant details so we can investigate.']
  ]},
  { slug: 'cancellation-refund-policy', title: 'Cancellation & Refund Policy', sections: [
    ['Requesting cancellation', 'Contact us as soon as possible with your order reference to request cancellation. We will check the current order and dispatch status and confirm whether cancellation is possible.'],
    ['Damaged, incorrect or missing items', 'Contact us promptly with your order reference, a description of the issue and photographs where relevant. Keep the product and packaging while we review the issue.'],
    ['Returns and eligibility', 'Please contact us before sending a product back. We will confirm the applicable return eligibility, instructions and available resolution for your order. If a return window or condition affects your purchase decision, confirm it with us before ordering.'],
    ['Refunds', 'If a refund is approved, we will confirm its amount, method and expected processing time directly with you. The time for a credit to appear can depend on the payment provider and bank. Contact us if a confirmed refund has not arrived within the communicated time.']
  ]}
];

export default function Policy({ slug }) {
  const policy = policies.find(item => item.slug === slug);
  return <section className="section container policy-page" lang="en">
    <p className="policy-eyebrow">Mahadharshni Herblab · Customer care</p>
    <h1>{policy.title}</h1>
    <div className="policy-layout">
      <nav className="policy-nav" aria-label="Customer information">
        {policies.map(item => <Link key={item.slug} to={'/' + item.slug} aria-current={item.slug === slug ? 'page' : undefined}>{item.title}</Link>)}
      </nav>
      <article className="policy-content">
        {policy.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
        <section className="policy-contact"><h2>Contact us</h2><p>For questions about this policy or your order:</p><a href={'mailto:' + contact.email}>{contact.email}</a><br /><a href={'tel:' + contact.phone}>{contact.phoneLabel}</a><p><Link to="/contact">Contact Us</Link> · <Link to="/shop">Product details and pricing</Link></p></section>
      </article>
    </div>
  </section>;
}
