import { Phone, MessageCircle, MapPin, Clock, Mail, Navigation } from 'lucide-react';
import { businessConfig } from '../config';
import { buildSupportUrl } from '../whatsapp';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Contact() {
  const cards = [
    { icon: MapPin, title: 'Address', value: businessConfig.address },
    { icon: Phone, title: 'Phone', value: businessConfig.phone },
    { icon: MessageCircle, title: 'WhatsApp', value: `+${businessConfig.whatsapp}` },
    { icon: Clock, title: 'Opening Hours', value: businessConfig.openingHours.map((h) => `${h.days}: ${h.hours}`).join('\n') },
  ].filter((c) => c.value);

  return (
    <div className="container-page py-8 lg:py-12">
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal-900">Visit Nimbeswar Idli Vada</h1>
        <p className="mt-3 text-charcoal-700/70 text-lg">We'd love to serve you. Reach out or drop by.</p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <a href={`tel:${businessConfig.phone}`} className="btn-primary">
          <Phone className="w-5 h-5" /> Call Now
        </a>
        <a href={buildSupportUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
        <a href={businessConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          <Navigation className="w-5 h-5" /> Get Directions
        </a>
      </div>

      {/* Info cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card, i) => (
          <div key={i} className="card p-5">
            <div className="w-10 h-10 rounded-xl bg-saffron-100 flex items-center justify-center mb-3">
              <card.icon className="w-5 h-5 text-saffron-600" />
            </div>
            <h3 className="font-display font-semibold text-charcoal-900">{card.title}</h3>
            <p className="mt-1.5 text-sm text-charcoal-700/70 whitespace-pre-line">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-3xl overflow-hidden shadow-card aspect-video bg-cream-200">
        <iframe
          title="Store location"
          src={businessConfig.mapsUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Opening hours card */}
      <div className="mt-10 max-w-md mx-auto card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-saffron-600" />
          <h2 className="font-display text-xl font-semibold text-charcoal-900">Opening Hours</h2>
        </div>
        <div className="space-y-3">
          {businessConfig.openingHours.map((h, i) => (
            <div key={i} className="flex items-center justify-between text-sm border-b border-cream-100 pb-2 last:border-0">
              <span className="text-charcoal-700/70">{h.days}</span>
              <span className="font-medium text-charcoal-900">{h.hours}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-charcoal-700/50">Timings shown are placeholders and can be updated by the owner.</p>
      </div>
    </div>
  );
}
