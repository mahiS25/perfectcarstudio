import Breadcrumbs from '../components/Breadcrumbs';
import { businessConfig } from '../config';

export default function PrivacyPolicy() {
  return (
    <div className="container-page py-8 lg:py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-charcoal-700/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-sm max-w-none text-charcoal-700/80 space-y-6">
        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Overview</h2>
          <p>{businessConfig.businessName} respects your privacy. This policy explains what information we collect when you use our website and how it is used.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Information You Provide</h2>
          <p>When you place an order, you may provide your name, mobile number, delivery address (if applicable), and special instructions. This information is used solely to prepare and fulfil your order request.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">WhatsApp Ordering</h2>
          <p>Orders are sent via WhatsApp to the store's WhatsApp number. Your order details and contact information are shared with the store owner through WhatsApp to process your request. Please review WhatsApp's own privacy policy for how they handle messages.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Local Storage</h2>
          <p>Your cart is saved in your browser's local storage so it persists as you navigate the site. This data stays on your device and is not sent to any server unless you place an order.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Contact Information</h2>
          <p>If you have questions about this policy, you can reach us through the contact details on our Contact page.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-2">Updates</h2>
          <p>This policy may be updated from time to time. Please check this page for the latest version.</p>
        </section>
      </div>
    </div>
  );
}
