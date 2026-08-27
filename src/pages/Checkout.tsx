import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MessageCircle, ArrowLeft, Check, Info } from 'lucide-react';
import { useCart } from '../cart';
import { businessConfig } from '../config';
import { formatPrice } from '../data';
import { buildOrderMessage, buildWhatsAppUrl, type OrderDetails } from '../whatsapp';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Checkout() {
  const { items, subtotal, itemCount } = useCart();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [orderType, setOrderType] = useState<string>(businessConfig.defaultOrderType);
  const [instructions, setInstructions] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  if (items.length === 0 && !sent) {
    return <Navigate to="/cart" replace />;
  }

  const packaging = businessConfig.packagingCharge;
  const delivery = businessConfig.deliveryCharge;
  const total = subtotal + packaging + delivery;

  const availableTypes: string[] = [];
  if (businessConfig.orderTypes.pickup) availableTypes.push('Pickup');
  if (businessConfig.orderTypes.delivery) availableTypes.push('Delivery');

  const showAddress = businessConfig.orderTypes.delivery && orderType === 'Delivery';

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    if (!mobile.trim()) e.mobile = 'Please enter your mobile number.';
    else if (!/^[0-9+\-\s]{7,15}$/.test(mobile.trim())) e.mobile = 'Please enter a valid mobile number.';
    if (showAddress && !address.trim()) e.address = 'Please enter your delivery address.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    const details: OrderDetails = {
      customerName: name.trim(),
      mobile: mobile.trim(),
      orderType,
      specialInstructions: instructions.trim(),
      address: showAddress ? address.trim() : undefined,
    };

    const message = buildOrderMessage(items, details, subtotal, packaging, delivery);
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-leaf-100 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-leaf-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal-900">Order Ready to Send</h1>
          <p className="mt-4 text-charcoal-700/80">
            WhatsApp opened with your order details. Send the message to complete your order request.
          </p>
          <p className="mt-2 text-sm text-charcoal-700/60">
            The shop owner will confirm your order on WhatsApp. Your cart is kept intact in case you need to return.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/menu" className="btn-secondary">Continue Shopping</Link>
            <Link to="/cart" className="btn-primary">View Cart</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

      <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-8">Complete Your Order</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer details */}
          <div className="card p-6">
            <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">Your Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal-800 mb-1.5">Customer Name <span className="text-red-500">*</span></label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="input" />
                {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-charcoal-800 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                <input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Your mobile number" className="input" />
                {errors.mobile && <p className="mt-1.5 text-sm text-red-500">{errors.mobile}</p>}
              </div>
            </div>
          </div>

          {/* Order type */}
          {availableTypes.length > 1 && (
            <div className="card p-6">
              <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">How would you like your order?</h2>
              <div className="flex gap-3">
                {availableTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`flex-1 rounded-xl border-2 px-4 py-3 text-center font-medium transition ${
                      orderType === type ? 'border-saffron-500 bg-saffron-50 text-saffron-700' : 'border-cream-300 bg-white text-charcoal-700 hover:border-cream-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Delivery address */}
          {showAddress && (
            <div className="card p-6">
              <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-charcoal-800 mb-1.5">Address <span className="text-red-500">*</span></label>
                  <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no, street, area" rows={3} className="input" />
                  {errors.address && <p className="mt-1.5 text-sm text-red-500">{errors.address}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Special instructions */}
          <div className="card p-6">
            <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">Special Instructions</h2>
            <label htmlFor="instructions" className="block text-sm font-medium text-charcoal-800 mb-1.5">Anything we should know? (optional)</label>
            <textarea id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Less spicy, extra chutney, no onion, etc." rows={3} className="input" />
          </div>
        </div>

        {/* Order review */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 card p-6">
            <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">Your Order</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.productId} className="flex items-start gap-3 text-sm">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-charcoal-900 leading-tight">{item.name}</p>
                    <p className="text-charcoal-700/60 text-xs">{formatPrice(item.price)} × {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-charcoal-900 shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-cream-200 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-charcoal-700/70">Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
              {packaging > 0 && <div className="flex justify-between"><span className="text-charcoal-700/70">Packaging</span><span className="font-medium">{formatPrice(packaging)}</span></div>}
              {delivery > 0 && <div className="flex justify-between"><span className="text-charcoal-700/70">Delivery</span><span className="font-medium">{formatPrice(delivery)}</span></div>}
            </div>
            <div className="mt-3 pt-3 border-t border-cream-200 flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-charcoal-900">Total</span>
              <span className="font-display text-2xl font-bold text-saffron-700">{formatPrice(total)}</span>
            </div>

            <button type="button" onClick={handlePlaceOrder} className="btn-whatsapp w-full mt-5 text-base">
              <MessageCircle className="w-5 h-5" /> Place Order on WhatsApp
            </button>

            <div className="mt-4 flex items-start gap-2 text-xs text-charcoal-700/60 bg-cream-100 rounded-lg p-3">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-saffron-500" />
              <p>Placing this order opens WhatsApp with your details. Send the message to request your order — the shop owner will confirm it on chat.</p>
            </div>

            <Link to="/cart" className="mt-4 inline-flex items-center gap-2 text-sm text-saffron-600 font-medium hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
