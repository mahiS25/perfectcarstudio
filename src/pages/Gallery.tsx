import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: 'https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Masala dosa', category: 'Dosa' },
  { src: 'https://images.pexels.com/photos/20422133/pexels-photo-20422133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Crispy dosa', category: 'Dosa' },
  { src: 'https://images.pexels.com/photos/20422121/pexels-photo-20422121.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Cone dosa', category: 'Dosa' },
  { src: 'https://images.pexels.com/photos/39104603/pexels-photo-39104603.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Dosa platter', category: 'Dosa' },
  { src: 'https://images.pexels.com/photos/35514447/pexels-photo-35514447.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Idli sambar', category: 'Idli & Vada' },
  { src: 'https://images.pexels.com/photos/8312083/pexels-photo-8312083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Idli vada plate', category: 'Idli & Vada' },
  { src: 'https://images.pexels.com/photos/37421009/pexels-photo-37421009.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Medu vada', category: 'Idli & Vada' },
  { src: 'https://images.pexels.com/photos/37867687/pexels-photo-37867687.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Idli vada combo', category: 'Idli & Vada' },
  { src: 'https://images.pexels.com/photos/14477873/pexels-photo-14477873.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Samosa', category: 'Snacks' },
  { src: 'https://images.pexels.com/photos/35213277/pexels-photo-35213277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Bhel puri', category: 'Snacks' },
  { src: 'https://images.pexels.com/photos/12436185/pexels-photo-12436185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Indian food stall', category: 'Shop' },
  { src: 'https://images.pexels.com/photos/37708443/pexels-photo-37708443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Restaurant kitchen', category: 'Kitchen' },
  { src: 'https://images.pexels.com/photos/36870973/pexels-photo-36870973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Chef cooking', category: 'Kitchen' },
  { src: 'https://images.pexels.com/photos/38201891/pexels-photo-38201891.png?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Filter coffee', category: 'Shop' },
];

const filters = ['All', 'Dosa', 'Idli & Vada', 'Snacks', 'Shop', 'Kitchen'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filtered.length));
  }, [filtered.length]);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={[{ label: 'Gallery' }]} />

      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal-900">Gallery</h1>
        <p className="mt-3 text-charcoal-700/70 text-lg">A visual taste of what's cooking at Nimbeswar Idli Vada.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 justify-start sm:justify-center">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap ${
              activeFilter === f ? 'bg-saffron-500 text-white shadow-soft' : 'bg-white text-charcoal-800 border border-cream-300 hover:bg-cream-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
        {filtered.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl break-inside-avoid"
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition flex items-end p-3">
              <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">{img.category}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal-900/90 backdrop-blur-sm animate-fade-in" onClick={closeLightbox}>
          <button type="button" aria-label="Close" onClick={closeLightbox} className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition">
            <X className="w-6 h-6" />
          </button>
          <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 sm:left-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <figure className="max-w-4xl max-h-[80vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].alt} className="max-w-full max-h-[80vh] rounded-2xl object-contain" />
            <figcaption className="text-center text-white/80 text-sm mt-3">{filtered[lightboxIndex].alt} — {filtered[lightboxIndex].category}</figcaption>
          </figure>
          <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 sm:right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
