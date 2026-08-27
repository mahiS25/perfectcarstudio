import { Leaf } from 'lucide-react';

export default function VegIndicator({ vegetarian, className = '' }: { vegetarian: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 rounded-[3px] border-2 ${vegetarian ? 'border-leaf-600' : 'border-red-600'} ${className}`}
      title={vegetarian ? 'Vegetarian' : 'Non-vegetarian'}
      aria-label={vegetarian ? 'Vegetarian' : 'Non-vegetarian'}
    >
      {vegetarian ? (
        <span className="w-2 h-2 rounded-full bg-leaf-600" />
      ) : (
        <span className="w-2 h-2 rounded-full bg-red-600" />
      )}
    </span>
  );
}
