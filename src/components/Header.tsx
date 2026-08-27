import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import { businessConfig } from '../config';
import { useCart } from '../cart';
import { formatPrice } from '../data';

export default function Header({ onOpenSearch, onOpenCart }: { onOpenSearch: () => void; onOpenCart: () => void }) {
  const { itemCount, subtotal } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Menu', to: '/menu' },
    { label: 'About', to: '/about' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream-50/95 backdrop-blur-md shadow-soft' : 'bg-cream-50/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setMobileOpen(false)}>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-saffron-500 text-white font-display font-bold text-lg shadow-soft">
                N
              </div>
              <div className="leading-none">
                <div className="font-display font-semibold text-charcoal-900 text-base sm:text-lg">Nimbeswar</div>
                <div className="text-[10px] sm:text-xs text-saffron-600 font-medium tracking-wide uppercase">Idli Vada</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-charcoal-800 hover:text-saffron-600 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron-500 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search dishes"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream-200 transition"
              >
                <Search className="w-5 h-5 text-charcoal-800" />
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                aria-label={`Cart with ${itemCount} items`}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream-200 transition"
              >
                <ShoppingBag className="w-5 h-5 text-charcoal-800" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-saffron-500 text-white text-[10px] font-bold animate-toast-in">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link to="/menu" className="hidden sm:inline-flex btn-primary px-5 py-2.5 text-sm ml-1">
                Order Now
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream-200 transition"
              >
                <Menu className="w-6 h-6 text-charcoal-800" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-cream-50 shadow-xl animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-cream-200">
              <span className="font-display text-lg font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col p-5 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-charcoal-800 font-medium hover:bg-cream-100 transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-cream-200 space-y-3">
              <button
                type="button"
                onClick={() => { setMobileOpen(false); navigate('/menu'); }}
                className="btn-primary w-full"
              >
                Order Now
              </button>
              <p className="text-center text-xs text-charcoal-700/60">{businessConfig.businessName}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
