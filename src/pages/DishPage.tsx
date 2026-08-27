import { useParams, Navigate, Link, useOutletContext } from 'react-router-dom';
import { Plus, Minus, Flame, Leaf, ShoppingBag, MessageCircle, ArrowLeft, Check } from 'lucide-react';
import { getItemBySlug, getRelatedItems, formatPrice, categories } from '../data';
import { useCart } from '../cart';
import { useToast } from '../toast';
import { buildSupportUrl } from '../whatsapp';
import VegIndicator from '../components/VegIndicator';
import Badge from '../components/Badge';
import Breadcrumbs from '../components/Breadcrumbs';
import FoodCard from '../components/FoodCard';

interface OutletCtx {
  openCart: () => void;
}

export default function DishPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getItemBySlug(slug) : undefined;
  const { addItem, getQuantity, updateQuantity } = useCart();
  const { showToast } = useToast();
  const { openCart } = useOutletContext<OutletCtx>();

  if (!item) return <Navigate to="/menu" replace />;

  const qty = getQuantity(item.id);
  const soldOut = item.available !== 'available';
  const related = getRelatedItems(item, 3);
  const cat = categories.find((c) => c.slug === item.category);

  const handleAdd = () => {
    addItem(item, 1);
    showToast(`${item.name} added to cart`, 'View Cart', '/cart');
  };

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={[
        { label: 'Menu', to: '/menu' },
        { label: cat?.name ?? 'Menu', to: `/menu/${item.category}` },
        { label: item.name },
      ]} />

      <Link to={`/menu/${item.category}`} className="inline-flex items-center gap-1.5 text-sm text-charcoal-700/70 hover:text-saffron-600 transition mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to {cat?.name}
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-cardHover aspect-[4/3]">
            <img src={item.image} alt={item.name} className={`w-full h-full object-cover ${soldOut ? 'grayscale opacity-70' : ''}`} />
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur rounded-full p-1.5">
              <VegIndicator vegetarian={item.vegetarian} />
            </div>
            <Badge bestseller={item.bestseller} popular={item.popular} isNew={item.isNew} spicy={item.spicy} />
          </div>
          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-charcoal-900/80 text-white px-5 py-2 font-semibold">
                {item.available === 'soon' ? 'Available Soon' : 'Sold Out'}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-900">{item.name}</h1>
          <p className="mt-4 text-charcoal-700/80 leading-relaxed text-lg">{item.description}</p>

          <div className="mt-5 flex items-center gap-4">
            <span className="font-display text-3xl font-bold text-saffron-700">{formatPrice(item.price)}</span>
            {item.serves && <span className="text-sm text-charcoal-700/60">Serves: {item.serves}</span>}
          </div>

          {/* Spice level */}
          {item.spiceLevel && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="text-charcoal-700/70">Spice level:</span>
              <span className="font-medium capitalize text-charcoal-900">{item.spiceLevel}</span>
            </div>
          )}

          {/* What's included */}
          {item.includes && item.includes.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold text-charcoal-900 mb-3">What's Included</h2>
              <ul className="space-y-2">
                {item.includes.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-charcoal-700/80">
                    <Check className="w-4 h-4 text-leaf-600 shrink-0" /> {inc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {soldOut ? (
              <span className="btn bg-cream-200 text-charcoal-700/50 px-6 py-3 cursor-not-allowed">
                {item.available === 'soon' ? 'Available Soon' : 'Sold Out'}
              </span>
            ) : qty > 0 ? (
              <div className="inline-flex items-center gap-1 rounded-full border border-saffron-300 bg-saffron-50 p-1.5">
                <button type="button" onClick={() => updateQuantity(item.id, qty - 1)} aria-label="Decrease" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-saffron-100 active:scale-95 transition">
                  <Minus className="w-5 h-5 text-saffron-700" />
                </button>
                <span className="min-w-[2rem] text-center font-semibold text-lg text-saffron-800" aria-live="polite">{qty}</span>
                <button type="button" onClick={() => updateQuantity(item.id, qty + 1)} aria-label="Increase" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-saffron-100 active:scale-95 transition">
                  <Plus className="w-5 h-5 text-saffron-700" />
                </button>
              </div>
            ) : (
              <button type="button" onClick={handleAdd} className="btn-primary text-base">
                <Plus className="w-5 h-5" /> Add to Cart
              </button>
            )}

            {!soldOut && (
              <button type="button" onClick={openCart} className="btn-secondary text-base">
                <ShoppingBag className="w-5 h-5" /> View Cart
              </button>
            )}
          </div>

          {/* Quick WhatsApp */}
          <a href={buildSupportUrl()} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-leaf-700 hover:text-leaf-600 transition">
            <MessageCircle className="w-4 h-4" /> Ask about this dish on WhatsApp
          </a>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-cream-200">
          <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => (
              <FoodCard key={r.id} item={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
