import { useParams, Navigate, Link } from 'react-router-dom';
import { categories, getItemsByCategory } from '../data';
import FoodCard from '../components/FoodCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const cat = categories.find((c) => c.slug === category);

  if (!cat) return <Navigate to="/menu" replace />;

  const items = getItemsByCategory(cat.slug);

  return (
    <div>
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/85 via-charcoal-900/70 to-charcoal-900/50" />
        </div>
        <div className="relative container-page py-16 lg:py-24">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white">{cat.name}</h1>
            <p className="mt-4 text-white/80 text-lg">{cat.tagline}</p>
            <Link to="/menu" className="mt-6 inline-flex btn bg-white/20 backdrop-blur text-white px-5 py-2.5 text-sm hover:bg-white/30">
              ← Back to Menu
            </Link>
          </div>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <Breadcrumbs items={[{ label: 'Menu', to: '/menu' }, { label: cat.name }]} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

        {/* Other categories */}
        <div className="mt-14 pt-10 border-t border-cream-200">
          <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-6">Explore Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.filter((c) => c.slug !== cat.slug).map((c) => (
              <Link
                key={c.slug}
                to={`/menu/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-cream-300 px-4 py-2 text-sm font-medium text-charcoal-800 hover:bg-cream-100 hover:border-saffron-300 transition"
              >
                {c.shortName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
