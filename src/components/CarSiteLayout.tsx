import { ArrowRight, CalendarDays, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { businessConfig } from '../config';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Our approach', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function CarSiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const whatsappLink = `https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(businessConfig.supportMessage)}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <Link to="/" className="brand" aria-label="Perfect Car Studio home">
          <img src="/assets/images/PCS_LOGO.jpg" alt="Perfect Car Studio" />
          <span>PERFECT <b>CAR STUDIO</b></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
        </nav>
        <Link className="button button-accent nav-cta" to="/book">Book a service <ArrowRight size={16} /></Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {menuOpen && <div className="mobile-menu">
        <nav>{navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}<ArrowRight size={16} /></Link>)}</nav>
        <Link className="button button-accent" to="/book">Book a service <ArrowRight size={16} /></Link>
      </div>}
      <main><Outlet /></main>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand"><img src="/assets/images/PCS_LOGO.jpg" alt="Perfect Car Studio" /><span>PERFECT <b>CAR STUDIO</b></span></Link>
            <p>Premium washing, interior care and detailing for the vehicle you choose every day.</p>
          </div>
          <div><p className="footer-label">Explore</p><Link to="/services">Services</Link><Link to="/about">Our approach</Link><Link to="/gallery">Gallery</Link><Link to="/contact">Contact</Link></div>
          <div><p className="footer-label">Contact</p><a href={`tel:${businessConfig.phone.replace(/\s/g, '')}`}>{businessConfig.phone}</a><a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp us</a><Link to="/contact">Mon-Sat / 09:00-20:00</Link></div>
          <div><p className="footer-label">Ready when you are</p><p className="footer-note">Choose a service and request a visit at a time that works for you.</p><Link className="text-link" to="/book">Start a booking <CalendarDays size={16} /></Link></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Perfect Car Studio</span><span>Built around care & detail</span></div>
      </footer>
      <a href={whatsappLink} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp"><MessageCircle size={22} /></a>
      <div className="mobile-actions"><a href={`tel:${businessConfig.phone.replace(/\s/g, '')}`}><Phone size={16} /> Call</a><a href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a><Link to="/book"><CalendarDays size={16} /> Book now</Link></div>
    </div>
  );
}
