import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { menu, categories, formatPrice } from '../data';
import type { CategorySlug } from '../types';
import FoodCard from '../components/FoodCard';
import Breadcrumbs from '../components/Breadcrumbs';

type Filter = 'all' | 'bestseller' | 'spicy' | 'mild' | 'under-100';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<'all' | CategorySlug>('all');
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let items = menu;
    if (activeCategory !== 'all') {
      items = items.filter((m) => m.category === activeCategory);
    }
    if (filter === 'bestseller') items = items.filter((m) => m.bestseller || m.popular);
    if (filter === 'spicy') items = items.filter((m) => m.spicy);
    if (filter === 'mild') items = items.filter((m) => !m.spicy);
    if (filter === 'under-100') items = items.filter((m) => m.price < 100);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q) || m.category.includes(q)
      );
    }
    return items;
  }, [activeCategory, filter, query]);

  const tabs: { label: string; value: 'all' | CategorySlug }[] = [
    { label: 'All', value: 'all' },
    ...categories.map((c) => ({ label: c.shortName, value: c.slug })),
  ];

  const filters: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Bestseller', value: 'bestseller' },
    { label: 'Spicy', value: 'spicy' },
    { label: 'Mild', value: 'mild' },
    { label: 'Under ₹100', value: 'under-100' },
  ];

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={[{ label: 'Menu' }]} />

      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal-900">Our Menu</h1>
        <p className="mt-3 text-charcoal-700/70 text-lg">Fresh favourites for every craving.</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes..."
            className="input pl-11"
            aria-label="Search dishes"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-4 justify-start sm:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveCategory(tab.value)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap ${
              activeCategory === tab.value
                ? 'bg-saffron-500 text-white shadow-soft'
                : 'bg-white text-charcoal-800 border border-cream-300 hover:bg-cream-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 justify-start sm:justify-center">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition whitespace-nowrap ${
              filter === f.value
                ? 'bg-charcoal-900 text-cream-50'
                : 'bg-cream-100 text-charcoal-700/70 hover:bg-cream-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="font-display text-2xl font-bold text-charcoal-900">No dishes found</h2>
          <p className="mt-2 text-charcoal-700/70">Try a different search or browse all menu categories.</p>
          <button
            type="button"
            onClick={() => { setQuery(''); setActiveCategory('all'); setFilter('all'); }}
            className="btn-secondary mt-5"
          >
            View Full Menu
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-charcoal-700/60 mb-4">{filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
