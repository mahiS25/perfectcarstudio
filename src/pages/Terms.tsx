import Breadcrumbs from '../components/Breadcrumbs';
import { businessConfig } from '../config';

export default function Terms() {
  return (
    <div className="container-page py-8 lg:py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

      <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-6">Terms & Conditions</h1>
      <p className="text-sm text-charcoal-700/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-sm max-w-none text-charcoal-700/80 space-y-6">
        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Menu & Prices</h2>
          <p>Menu items, prices and availability are subject to change without prior notice. Prices displayed on the website at the time of ordering apply to your order.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Order Requests</h2>
          <p>Placing an order through this website sends a request to {businessConfig.businessName} via WhatsApp. This is a request, not a confirmed order.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Order Confirmation</h2>
          <p>Your order is confirmed only when the shop owner confirms it with you directly on WhatsApp. The website cannot guarantee order acceptance on its own.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Pickup & Delivery</h2>
          <p>Available order types (pickup or delivery) are shown at checkout based on what the shop currently offers. Delivery, if available, may be limited to certain areas.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Cancellations</h2>
          <p>Since orders are confirmed manually on WhatsApp, please inform the shop as early as possible if you need to cancel or modify your order.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">WhatsApp Communication</h2>
          <p>By placing an order, you agree to be contacted on the mobile number you provide via WhatsApp for order-related communication.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Payments</h2>
          <p>This website does not process online payments. Any payment, if applicable, is handled directly between you and the shop.</p>
        </section>
      </div>
    </div>
  );
}
