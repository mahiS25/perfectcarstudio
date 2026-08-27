import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { businessConfig } from '../config';
import { buildSupportUrl } from '../whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-cream-100 mt-16">
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-saffron-500 text-white font-display font-bold text-lg">
                N
              </div>
              <div className="leading-none">
                <div className="font-display font-semibold text-cream-50 text-lg">Nimbeswar</div>
                <div className="text-[10px] text-saffron-300 font-medium tracking-wide uppercase">Idli Vada</div>
              </div>
            </div>
            <p className="text-sm text-cream-200/70 max-w-xs">
              Fresh South Indian favourites and delicious snacks at Nimbeswar Idli Vada.
            </p>
            {(businessConfig.instagram || businessConfig.facebook) && (
              <div className="flex items-center gap-3 mt-4">
                {businessConfig.instagram && (
                  <a href={businessConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-saffron-500 transition">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {businessConfig.facebook && (
                  <a href={businessConfig.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-saffron-500 transition">
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-display font-semibold text-cream-50 mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-cream-200/70 hover:text-saffron-300 transition">Home</Link></li>
              <li><Link to="/menu" className="text-cream-200/70 hover:text-saffron-300 transition">Menu</Link></li>
              <li><Link to="/about" className="text-cream-200/70 hover:text-saffron-300 transition">About</Link></li>
              <li><Link to="/gallery" className="text-cream-200/70 hover:text-saffron-300 transition">Gallery</Link></li>
              <li><Link to="/contact" className="text-cream-200/70 hover:text-saffron-300 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-display font-semibold text-cream-50 mb-4">Menu</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/menu/idli-vada" className="text-cream-200/70 hover:text-saffron-300 transition">Idli & Vada</Link></li>
              <li><Link to="/menu/dosa" className="text-cream-200/70 hover:text-saffron-300 transition">Dosa</Link></li>
              <li><Link to="/menu/uttapam" className="text-cream-200/70 hover:text-saffron-300 transition">Uttapam</Link></li>
              <li><Link to="/menu/chaat" className="text-cream-200/70 hover:text-saffron-300 transition">Chaat & Snacks</Link></li>
              <li><Link to="/menu/beverages" className="text-cream-200/70 hover:text-saffron-300 transition">Beverages</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-cream-50 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-cream-200/70">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-saffron-300 shrink-0" />
                <span>{businessConfig.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 mt-0.5 text-saffron-300 shrink-0" />
                <a href={buildSupportUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-saffron-300 transition">WhatsApp</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-saffron-300 shrink-0" />
                <span>{businessConfig.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-saffron-300 shrink-0" />
                <span>{businessConfig.openingHours[0]?.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-200/50">© {year} {businessConfig.businessName}. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            <Link to="/privacy-policy" className="text-cream-200/50 hover:text-saffron-300 transition">Privacy Policy</Link>
            <Link to="/terms" className="text-cream-200/50 hover:text-saffron-300 transition">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
