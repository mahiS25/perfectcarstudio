import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../cart';
import { businessConfig } from '../config';
import { formatPrice } from '../data';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, setSpecialInstructions, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-charcoal-700/40" />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal-900">Your Cart Is Empty</h1>
          <p className="mt-3 text-charcoal-700/70">Looks like you haven't added anything delicious yet.</p>
          <Link to="/menu" className="btn-primary mt-6">Browse Menu</Link>
        </div>
      </div>
    );
  }

  const packaging = businessConfig.packagingCharge;
  const delivery = businessConfig.deliveryCharge;
  const total = subtotal + packaging + delivery;

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={[{ label: 'Cart' }]} />

      <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="card p-4 flex gap-4">
              <Link to={`/dish/${item.slug}`} className="shrink-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to={`/dish/${item.slug}`}>
                      <h3 className="font-display text-lg font-semibold text-charcoal-900 hover:text-saffron-600 transition">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-charcoal-700/60 mt-0.5">{formatPrice(item.price)} each</p>
                  </div>
                  <button type="button" onClick={() => removeItem(item.productId)} aria-label={`Remove ${item.name}`} className="text-charcoal-700/40 hover:text-red-500 transition shrink-0">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-1 rounded-full border border-cream-300 bg-white p-1">
                    <button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)} aria-label="Decrease" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-100 active:scale-95 transition">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="min-w-[1.5rem] text-center font-semibold" aria-live="polite">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1)} aria-label="Increase" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-100 active:scale-95 transition">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-display text-lg font-bold text-charcoal-900">{formatPrice(item.price * item.quantity)}</span>
                </div>

                {/* Special instructions */}
                <input
                  type="text"
                  value={item.specialInstructions ?? ''}
                  onChange={(e) => setSpecialInstructions(item.productId, e.target.value)}
                  placeholder="Add special instructions (e.g. less spicy, extra chutney)"
                  className="mt-3 w-full text-sm rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-1 focus:ring-saffron-400"
                  aria-label={`Special instructions for ${item.name}`}
                />
              </div>
            </div>
          ))}

          <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-saffron-600 font-medium hover:gap-3 transition-all mt-4">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 card p-6">
            <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">Order Summary</h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-700/70">Items ({itemCount})</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              {packaging > 0 && (
                <div className="flex justify-between">
                  <span className="text-charcoal-700/70">Packaging</span>
                  <span className="font-medium">{formatPrice(packaging)}</span>
                </div>
              )}
              {delivery > 0 && (
                <div className="flex justify-between">
                  <span className="text-charcoal-700/70">Delivery</span>
                  <span className="font-medium">{formatPrice(delivery)}</span>
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-cream-200 flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-charcoal-900">Total</span>
              <span className="font-display text-2xl font-bold text-saffron-700">{formatPrice(total)}</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full mt-5">
              Proceed to Order <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
