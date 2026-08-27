import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-charcoal-700/60 mb-6">
      <Link to="/" className="flex items-center gap-1 hover:text-saffron-600 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-700/30" />
          {item.to ? (
            <Link to={item.to} className="hover:text-saffron-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
