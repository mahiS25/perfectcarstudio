import { Link } from 'react-router-dom';
import { Leaf, UtensilsCrossed, Sparkles, ArrowRight } from 'lucide-react';
import { businessConfig } from '../config';
import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-100">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-saffron-200/30 blur-3xl" />
        <div className="relative container-page py-16 lg:py-24 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold text-saffron-700 tracking-wide uppercase shadow-soft">
            <Sparkles className="w-3.5 h-3.5" /> About Us
          </span>
          <h1 className="mt-5 font-display text-4xl lg:text-5xl font-bold text-charcoal-900">Made for People Who Love Good Food</h1>
          <p className="mt-5 text-charcoal-700/80 text-lg">Simple, satisfying South Indian meals — prepared fresh and served with care.</p>
        </div>
      </section>

      <div className="container-page py-12 lg:py-16">
        <Breadcrumbs items={[{ label: 'About' }]} />

        {/* About */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          <div className="rounded-3xl overflow-hidden shadow-card aspect-[4/3]">
            <img src="https://images.pexels.com/photos/35539315/pexels-photo-35539315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="South Indian food spread" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-charcoal-900">About Nimbeswar Idli Vada</h2>
            <p className="mt-4 text-charcoal-700/80 leading-relaxed">
              Nimbeswar Idli Vada is focused on serving satisfying South Indian favourites and snacks with taste, freshness and a welcoming experience.
            </p>
            <p className="mt-3 text-charcoal-700/80 leading-relaxed">
              From soft idlis and crispy vadas to golden dosas and hearty uttapam, every dish is made fresh to order. We also offer a selection of Indian chaat and snacks for a quick, tasty bite.
            </p>
          </div>
        </div>

        {/* Our Food */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="card p-6">
            <div className="w-12 h-12 rounded-2xl bg-saffron-100 flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-6 h-6 text-saffron-600" />
            </div>
            <h3 className="font-display text-lg font-semibold text-charcoal-900">Our Food</h3>
            <p className="mt-2 text-sm text-charcoal-700/70">Classic South Indian favourites prepared for customers who enjoy simple, satisfying meals.</p>
          </div>
          <div className="card p-6">
            <div className="w-12 h-12 rounded-2xl bg-leaf-100 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-leaf-600" />
            </div>
            <h3 className="font-display text-lg font-semibold text-charcoal-900">Our Focus</h3>
            <p className="mt-2 text-sm text-charcoal-700/70">Taste, consistency, cleanliness and friendly service.</p>
          </div>
          <div className="card p-6">
            <div className="w-12 h-12 rounded-2xl bg-saffron-100 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-saffron-600" />
            </div>
            <h3 className="font-display text-lg font-semibold text-charcoal-900">Our Promise</h3>
            <p className="mt-2 text-sm text-charcoal-700/70">Freshly prepared food, served with a smile, at a fair price.</p>
          </div>
        </div>

        {/* Our Kitchen */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-3xl font-bold text-charcoal-900">Our Kitchen</h2>
            <p className="mt-4 text-charcoal-700/80 leading-relaxed">
              Our kitchen is where the magic happens — batter ground fresh, dosas poured on hot griddles, and chutneys made daily. Actual kitchen photographs can be uploaded here once available.
            </p>
          </div>
          <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-card aspect-[4/3]">
            <img src="https://images.pexels.com/photos/12436185/pexels-photo-12436185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Kitchen" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-saffron-500 px-6 py-12 text-center">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white">Ready to Eat?</h2>
            <p className="mt-3 text-white/90 max-w-md mx-auto">Browse our menu and place your order on WhatsApp in minutes.</p>
            <Link to="/menu" className="mt-6 inline-flex btn bg-white text-saffron-600 px-7 py-3.5 hover:bg-cream-100 active:scale-[0.98] shadow-soft">
              View Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
