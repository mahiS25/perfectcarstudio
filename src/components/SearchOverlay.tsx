import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { menu, formatPrice } from '../data';
import VegIndicator from './VegIndicator';

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const results = query.trim()
    ? menu.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative mx-auto mt-20 max-w-2xl px-4">
        <div className="bg-cream-50 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-cream-200">
            <Search className="w-5 h-5 text-charcoal-700/50" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              className="flex-1 bg-transparent text-charcoal-900 placeholder:text-charcoal-700/40 focus:outline-none text-base"
            />
            <button type="button" onClick={onClose} aria-label="Close search" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() && results.length === 0 && (
              <div className="px-5 py-12 text-center">
                <p className="text-charcoal-800 font-medium">No dishes found</p>
                <p className="text-sm text-charcoal-700/60 mt-1">Try a different search or browse all menu categories.</p>
                <button type="button" onClick={() => { onClose(); navigate('/menu'); }} className="btn-secondary mt-4 text-sm">
                  View Full Menu
                </button>
              </div>
            )}
            {results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { onClose(); navigate(`/dish/${item.slug}`); }}
                className="flex items-center gap-3 w-full px-5 py-3 hover:bg-cream-100 transition text-left"
              >
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <VegIndicator vegetarian={item.vegetarian} />
                    <span className="font-medium text-charcoal-900 truncate">{item.name}</span>
                  </div>
                  <p className="text-xs text-charcoal-700/60 truncate">{item.description}</p>
                </div>
                <span className="font-semibold text-saffron-700">{formatPrice(item.price)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
