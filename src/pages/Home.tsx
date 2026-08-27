import { Link } from 'react-router-dom';
import { Leaf, Clock, MessageCircle, ArrowRight, Sparkles, UtensilsCrossed, Heart } from 'lucide-react';
import { categories, getPopularItems, menu, formatPrice } from '../data';
import { businessConfig } from '../config';
import { buildSupportUrl } from '../whatsapp';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import VegIndicator from '../components/VegIndicator';

export default function Home() {
  const popular = getPopularItems(8);
  const featured = menu.find((m) => m.slug === 'masala-dosa')!;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-saffron-50" />
        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-saffron-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-leaf-200/20 blur-3xl" />

        <div className="relative container-page py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-saffron-700 tracking-wider uppercase shadow-soft">
                <Sparkles className="w-3.5 h-3.5" /> Fresh • Tasty • Authentic
              </span>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 leading-[1.1]">
                Authentic South Indian Taste, <span className="text-saffron-600">Made Fresh</span>
              </h1>
              <p className="mt-5 text-base lg:text-lg text-charcoal-700/80 max-w-md leading-relaxed">
                Enjoy freshly prepared idli, crispy vada, delicious dosa, uttapam and your favourite snacks at Nimbeswar Idli Vada.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/menu" className="btn-primary text-base">
                  View Menu <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={buildSupportUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">
                  <MessageCircle className="w-5 h-5" /> Order on WhatsApp
                </a>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-charcoal-700/70">
                <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-leaf-600" /> Freshly Prepared</span>
                <span className="flex items-center gap-1.5"><UtensilsCrossed className="w-4 h-4 text-saffron-600" /> Vegetarian</span>
                <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-leaf-600" /> Easy WhatsApp Ordering</span>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-cardHover aspect-[4/3] lg:aspect-square">
                <img
                  src="https://images.pexels.com/photos/35539315/pexels-photo-35539315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Authentic South Indian breakfast spread with dosa, idli and chutneys"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent" />
              </div>
              {/* Floating price card */}
              <div className="absolute -bottom-4 -left-2 sm:left-6 bg-white rounded-2xl shadow-cardHover px-5 py-3.5 flex items-center gap-3 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-saffron-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-saffron-600 fill-saffron-500" />
                </div>
                <div>
                  <p className="text-xs text-charcoal-700/60">Customer Favourite</p>
                  <p className="font-display font-semibold text-charcoal-900">Masala Dosa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Explorer */}
      <section className="container-page py-14 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-900">What Would You Like Today?</h2>
          <p className="mt-3 text-charcoal-700/70">Pick a category and explore our freshly made dishes.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Customer Favourites */}
      <section className="bg-cream-100/60 py-14 lg:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-900">Customer Favourites</h2>
              <p className="mt-2 text-charcoal-700/70">The dishes our customers come back for again and again.</p>
            </div>
            <Link to="/menu" className="hidden sm:inline-flex items-center gap-1 text-saffron-600 font-medium hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popular.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dish */}
      <section className="container-page py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-cardHover aspect-[4/3]">
              <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -right-2 sm:right-4 bg-saffron-500 text-white rounded-2xl px-4 py-2 shadow-cardHover">
              <span className="text-xs font-semibold tracking-wide uppercase">Customer Favourite</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <VegIndicator vegetarian={featured.vegetarian} />
              <span className="text-sm text-charcoal-700/60">Bestseller</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-900">{featured.name}</h2>
            <p className="mt-4 text-charcoal-700/80 leading-relaxed">{featured.description}</p>
            <p className="mt-6 font-display text-3xl font-bold text-saffron-700">{formatPrice(featured.price)}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to={`/dish/${featured.slug}`} className="btn-primary">View Details</Link>
              <Link to="/menu/dosa" className="btn-secondary">More Dosa</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why order here */}
      <section className="bg-cream-100/60 py-14 lg:py-20">
        <div className="container-page">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-900 text-center mb-10">Why Customers Enjoy Ordering Here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Freshly Prepared', desc: 'Every dish is made fresh to order with quality ingredients.' },
              { icon: MessageCircle, title: 'Easy Ordering', desc: 'Add to cart and send your order on WhatsApp in seconds.' },
              { icon: UtensilsCrossed, title: 'South Indian Favourites', desc: 'Idli, vada, dosa, uttapam and more — all in one place.' },
              { icon: Clock, title: 'Quick WhatsApp Ordering', desc: 'No login or payment needed. Just order and confirm on chat.' },
            ].map((f, i) => (
              <div key={i} className="card p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-saffron-100 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-saffron-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal-900">{f.title}</h3>
                <p className="mt-2 text-sm text-charcoal-700/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="container-page py-14 lg:py-20">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-900">A Taste of Our Kitchen</h2>
            <p className="mt-2 text-charcoal-700/70">See the food that keeps customers coming back.</p>
          </div>
          <Link to="/gallery" className="hidden sm:inline-flex items-center gap-1 text-saffron-600 font-medium hover:gap-2 transition-all">
            View Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {[
            'https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            'https://images.pexels.com/photos/8312083/pexels-photo-8312083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            'https://images.pexels.com/photos/37421009/pexels-photo-37421009.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            'https://images.pexels.com/photos/38201891/pexels-photo-38201891.png?auto=compress&cs=tinysrgb&h=650&w=940',
          ].map((src, i) => (
            <Link to="/gallery" key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
              <img src={src} alt="Gallery preview" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition" />
            </Link>
          ))}
        </div>
      </section>

      {/* Visit / Contact preview */}
      <section className="bg-cream-100/60 py-14 lg:py-20">
        <div className="container-page">
          <div className="card p-8 lg:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-900">Visit Nimbeswar Idli Vada</h2>
              <p className="mt-3 text-charcoal-700/80">Come enjoy fresh South Indian food or order ahead on WhatsApp for a quick pickup.</p>
              <div className="mt-6 space-y-3 text-sm">
                <p className="flex items-start gap-2.5"><Clock className="w-4 h-4 mt-0.5 text-saffron-600 shrink-0" /> {businessConfig.openingHours[0].days}: {businessConfig.openingHours[0].hours}</p>
                <p className="flex items-start gap-2.5"><Clock className="w-4 h-4 mt-0.5 text-saffron-600 shrink-0" /> {businessConfig.openingHours[1].days}: {businessConfig.openingHours[1].hours}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">Get in Touch</Link>
                <Link to="/menu" className="btn-secondary">Browse Menu</Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video bg-cream-200">
              <iframe
                title="Map"
                src={businessConfig.mapsUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page py-14 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-saffron-500 px-6 py-12 lg:py-16 text-center">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Hungry? Let's Get You Fed.</h2>
            <p className="mt-3 text-white/90 max-w-md mx-auto">Browse the menu, add your favourites to the cart, and place your order on WhatsApp in minutes.</p>
            <Link to="/menu" className="mt-7 inline-flex btn bg-white text-saffron-600 px-7 py-3.5 text-base hover:bg-cream-100 active:scale-[0.98] shadow-soft">
              Start Your Order <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
