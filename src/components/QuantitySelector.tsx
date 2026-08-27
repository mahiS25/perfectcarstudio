import { Minus, Plus } from 'lucide-react';

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease, size = 'md', disabled }: Props) {
  const btn = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';
  const text = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-cream-300 bg-white p-1">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled}
        aria-label="Decrease quantity"
        className={`${btn} flex items-center justify-center rounded-full hover:bg-cream-100 active:scale-95 transition disabled:opacity-40`}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className={`min-w-[1.5rem] text-center font-semibold ${text}`} aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        aria-label="Increase quantity"
        className={`${btn} flex items-center justify-center rounded-full hover:bg-cream-100 active:scale-95 transition disabled:opacity-40`}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
