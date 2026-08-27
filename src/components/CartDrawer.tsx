import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../cart';
import { formatPrice } from '../data';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, itemCount, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream-50 shadow-xl animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-saffron-600" />
            <span className="font-display text-lg font-semibold">Your Cart</span>
            {itemCount > 0 && <span className="text-sm text-charcoal-700/60">({itemCount})</span>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close cart" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-charcoal-700/40" />
            </div>
            <h3 className="font-display text-lg font-semibold text-charcoal-900">Your cart is empty</h3>
            <p className="text-sm text-charcoal-700/60 mt-1 mb-4">Add some delicious dishes to get started.</p>
            <button type="button" onClick={() => go('/menu')} className="btn-primary">Browse Menu</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-charcoal-900 text-sm leading-tight">{item.name}</h4>
                      <button type="button" onClick={() => removeItem(item.productId)} aria-label={`Remove ${item.name}`} className="text-charcoal-700/40 hover:text-red-500 transition shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-saffron-700 font-semibold mt-0.5">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center gap-1 rounded-full border border-cream-300 bg-white p-0.5">
                        <button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)} aria-label="Decrease" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-cream-100">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="min-w-[1.25rem] text-center text-sm font-semibold">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1)} aria-label="Increase" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-cream-100">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-charcoal-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-cream-200 space-y-3 bg-cream-100/50">
              <div className="flex items-center justify-between">
                <span className="text-charcoal-700">Subtotal</span>
                <span className="font-display text-lg font-bold text-charcoal-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => go('/cart')} className="btn-secondary text-sm">View Cart</button>
                <button type="button" onClick={() => go('/checkout')} className="btn-primary text-sm">Order Now</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
