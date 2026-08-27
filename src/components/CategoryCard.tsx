import { Link } from 'react-router-dom';
import type { Category } from '../types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/menu/${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl shadow-card hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/5] overflow-hidden bg-cream-100">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-xl font-semibold text-white">{category.name}</h3>
        <p className="mt-1 text-sm text-white/80 line-clamp-2">{category.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-saffron-200 text-sm font-medium group-hover:gap-2 transition-all">
          Explore <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
