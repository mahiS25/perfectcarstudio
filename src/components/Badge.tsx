import { Star, Flame, Sparkles } from 'lucide-react';

interface Props {
  bestseller?: boolean;
  popular?: boolean;
  isNew?: boolean;
  spicy?: boolean;
  className?: string;
}

export default function Badge({ bestseller, popular, isNew, spicy, className = '' }: Props) {
  if (bestseller) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-saffron-500 text-white text-xs font-semibold px-2.5 py-1 ${className}`}>
        <Star className="w-3 h-3 fill-white" /> Bestseller
      </span>
    );
  }
  if (popular) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-semibold px-2.5 py-1 ${className}`}>
        <Sparkles className="w-3 h-3" /> Popular
      </span>
    );
  }
  if (isNew) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-semibold px-2.5 py-1 ${className}`}>
        <Sparkles className="w-3 h-3" /> New
      </span>
    );
  }
  if (spicy) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 ${className}`}>
        <Flame className="w-3 h-3" /> Spicy
      </span>
    );
  }
  return null;
}
