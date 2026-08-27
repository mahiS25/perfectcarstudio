import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../cart';
import { formatPrice } from '../data';
import { ShoppingBag } from 'lucide-react';

export default function FloatingCartBar() {
  const { itemCount, subtotal } = useCart();
  const location = useLocation();

  // Hide on cart and checkout pages
  if (itemCount === 0) return null;
  if (location.pathname === '/cart' || location.pathname === '/checkout') return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md sm:hidden animate-slide-up">
      <Link
        to="/cart"
        className="flex items-center justify-between gap-3 rounded-2xl bg-saffron-500 text-white px-5 py-3.5 shadow-xl active:scale-[0.98] transition"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-white text-saffron-600 text-[10px] font-bold">
              {itemCount}
            </span>
          </div>
          <span className="text-sm font-medium">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display font-bold">{formatPrice(subtotal)}</span>
          <span className="text-sm">View Cart →</span>
        </div>
      </Link>
    </div>
  );
}
