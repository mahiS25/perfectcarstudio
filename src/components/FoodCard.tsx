import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../types';
import { useCart } from '../cart';
import { useToast } from '../toast';
import { formatPrice } from '../data';
import VegIndicator from './VegIndicator';
import Badge from './Badge';

export default function FoodCard({ item }: { item: MenuItem }) {
  const { getQuantity, addItem, updateQuantity } = useCart();
  const { showToast } = useToast();
  const qty = getQuantity(item.id);

  const soldOut = item.available !== 'available';

  const handleAdd = () => {
    addItem(item, 1);
    showToast(`${item.name} added to cart`, 'View Cart', '/cart');
  };

  return (
    <div className="card group overflow-hidden hover:shadow-cardHover hover:-translate-y-1 flex flex-col">
      <Link to={`/dish/${item.slug}`} className="relative block overflow-hidden rounded-t-2xl">
        <div className="aspect-[4/3] overflow-hidden bg-cream-100">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${soldOut ? 'grayscale opacity-60' : ''}`}
          />
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <VegIndicator vegetarian={item.vegetarian} className="bg-white/90 backdrop-blur-sm p-0.5" />
        </div>
        <div className="absolute top-3 right-3">
          <Badge bestseller={item.bestseller} popular={item.popular} isNew={item.isNew} spicy={item.spicy} />
        </div>
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-charcoal-900/80 text-white px-4 py-1.5 text-sm font-semibold">
              {item.available === 'soon' ? 'Available Soon' : 'Sold Out'}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <Link to={`/dish/${item.slug}`}>
          <h3 className="font-display text-lg font-semibold text-charcoal-900 hover:text-saffron-600 transition-colors">
            {item.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-charcoal-700/70 line-clamp-2 flex-1">{item.description}</p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-display text-xl font-bold text-saffron-700">{formatPrice(item.price)}</span>

          {soldOut ? (
            <span className="btn bg-cream-200 text-charcoal-700/50 px-5 py-2.5 cursor-not-allowed">
              {item.available === 'soon' ? 'Soon' : 'Sold Out'}
            </span>
          ) : qty > 0 ? (
            <div className="inline-flex items-center gap-1 rounded-full border border-saffron-300 bg-saffron-50 p-1">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, qty - 1)}
                aria-label={`Decrease ${item.name} quantity`}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-saffron-100 active:scale-95 transition"
              >
                <Minus className="w-4 h-4 text-saffron-700" />
              </button>
              <span className="min-w-[1.5rem] text-center font-semibold text-saffron-800" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, qty + 1)}
                aria-label={`Increase ${item.name} quantity`}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-saffron-100 active:scale-95 transition"
              >
                <Plus className="w-4 h-4 text-saffron-700" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="btn-primary px-5 py-2.5 text-sm"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
