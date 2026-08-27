import { ArrowRight, Car, Check, CircleCheck, Clock3, Droplets, MapPin, ShieldCheck, Sparkles, Star, Wrench, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { businessConfig } from '../config';

const images = {
  wash: 'https://images.pexels.com/photos/6873078/pexels-photo-6873078.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  interior: 'https://images.pexels.com/photos/5233285/pexels-photo-5233285.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  deep: 'https://images.pexels.com/photos/6873103/pexels-photo-6873103.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  detail: 'https://images.pexels.com/photos/6870296/pexels-photo-6870296.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  polish: 'https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  wheel: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  finish: 'https://images.pexels.com/photos/6870277/pexels-photo-6870277.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  exterior: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
};

const services = [
  { title: 'Car Wash', eyebrow: '01 / Exterior', description: 'A meticulous exterior reset that lifts away road film and restores a clean, confident finish.', image: images.wash, icon: Droplets, tags: ['Foam wash', 'Wheel clean', 'Dry finish'], duration: '45-60 min', bestFor: 'Regular weekly or fortnightly care' },
  { title: 'Interior Cleaning', eyebrow: '02 / Cabin care', description: 'A considered clean for seats, surfaces, mats and every detail you spend time with.', image: images.interior, icon: Sparkles, tags: ['Vacuum', 'Dashboard', 'Seat care'], duration: '60-90 min', bestFor: 'Freshening up an everyday cabin' },
  { title: 'Deep Interior Cleaning', eyebrow: '03 / Full refresh', description: 'A deeper treatment for tired interiors, stubborn marks and a cabin that needs a complete refresh.', image: images.deep, icon: ShieldCheck, tags: ['Deep vacuum', 'Carpet care', 'Stain lift'], duration: '2-3 hours', bestFor: 'Spills, stains and neglected interiors' },
  { title: 'Car Detailing', eyebrow: '04 / Studio finish', description: 'Precision-led detailing for those who expect more from the final finish of their vehicle.', image: images.detail, icon: Car, tags: ['Polish', 'Hard-to-reach', 'Final finish'], duration: '3-5 hours', bestFor: 'A complete presentation-ready finish' },
];

const galleryItems = [
  { image: images.wash, category: 'Exterior', title: 'Foam & finesse', text: 'A careful reset for the paint, wheels and details that frame the car.' },
  { image: images.interior, category: 'Interior', title: 'Cabin reset', text: 'Clean surfaces, fresh mats and a quieter feeling behind the wheel.' },
  { image: images.deep, category: 'Deep clean', title: 'The full refresh', text: 'A patient process for the jobs that need more time and attention.' },
  { image: images.detail, category: 'Detailing', title: 'The final pass', text: 'The finishing touches that make the result feel complete.' },
  { image: images.polish, category: 'Paint care', title: 'Polish & clarity', text: 'A cleaner reflection and a finish ready for daylight.' },
  { image: images.wheel, category: 'Wheel care', title: 'Every corner counts', text: 'Wheels and lower panels receive the same considered attention.' },
  { image: images.finish, category: 'Studio finish', title: 'Ready to drive', text: 'The last inspection before your keys are back in your hand.' },
  { image: images.exterior, category: 'Exterior', title: 'A clean first impression', text: 'A sharper outside finish for the everyday journeys ahead.' },
];

function FeatureStrip({ items }: { items: { icon: typeof Clock3; title: string; text: string }[] }) {
  return <div className="feature-strip">{items.map(({ icon: Icon, title, text }) => <div className="feature-strip-item" key={title}><Icon size={21} /><div><strong>{title}</strong><span>{text}</span></div></div>)}</div>;
}

function SplitStory({ image, eyebrow, title, children }: { image: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="split-story"><div className="split-story-image"><img src={image} alt="" /></div><div className="split-story-copy"><p className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</p><h2>{title}</h2>{children}</div></div>;
}

function PageIntro({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro: string }) {
  return <section className="page-hero section-dark"><div className="container page-hero-content"><p className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>;
}

export function ServicesPage() {
  return <><PageIntro eyebrow="Our services" title={<>Care that goes<br /><em>beyond clean.</em></>} intro="Thoughtful washing, interior care and detailing for every kind of everyday drive." /><FeatureStrip items={[{ icon: Clock3, title: 'Flexible visits', text: 'Mon-Sat, 9:00-20:00' }, { icon: Wrench, title: 'Careful process', text: 'The right treatment for your car' }, { icon: ShieldCheck, title: 'Clear handover', text: 'We walk you through the result' }]} /><section className="section section-surface"><div className="container"><div className="service-grid">{services.map(({ title, eyebrow, description, image, icon: Icon, tags, duration, bestFor }) => <article className="service-card" key={title}><div className="service-card-image"><img src={image} alt={title} /><span className="image-arrow"><ArrowRight size={18} /></span></div><div className="service-card-body"><div className="service-card-title"><div><p className="card-eyebrow">{eyebrow}</p><h3>{title}</h3></div><Icon size={20} strokeWidth={1.3} /></div><p>{description}</p><div className="service-meta"><span>{duration}</span><span>{bestFor}</span></div><div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="card-link" to="/book">Book this service <ArrowRight size={15} /></Link></div></article>)}</div></div></section><section className="section process-section"><div className="container"><SplitStory image={images.detail} eyebrow="Choosing your service" title={<>Start with what your car<br /><em>needs today.</em></>}><p>Not sure which option is right? Tell us what you are noticing, how long it has been since the last clean and how much time you have. We can recommend the right starting point when we confirm your visit.</p><ul className="check-list"><li><Check size={16} /> Everyday maintenance or a full reset</li><li><Check size={16} /> Clear time expectations before we begin</li><li><Check size={16} /> Optional add-ons discussed in advance</li></ul><Link className="button button-accent" to="/book">Ask for a recommendation <ArrowRight size={16} /></Link></SplitStory></div></section></>;
}

export function AboutPage() {
  return <><PageIntro eyebrow="Why Perfect Car Studio" title={<>A better standard<br />of <em>car care.</em></>} intro="We keep the experience clear, the work precise and the result worth coming back for." /><section className="section section-surface"><div className="container"><SplitStory image={images.interior} eyebrow="The studio idea" title={<>Care should feel<br /><em>considered.</em></>}><p>Perfect Car Studio was built around a simple belief: looking after your car should not feel rushed or opaque. Every visit starts with listening, continues with a methodical process and ends with a clear handover.</p><p>Whether you need a quick reset or a deep refresh, our job is to make the experience calm and the difference visible.</p><Link className="text-link" to="/services">Explore the services <ArrowRight size={16} /></Link></SplitStory></div></section><section className="section approach-section"><div className="container"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> Our standard</p><h2>Small details.<br /><em>Properly done.</em></h2></div><div className="heading-side"><p>Good car care is a sequence of thoughtful decisions, not one dramatic final step.</p></div></div><div className="approach-grid">{[['01', 'Attention to detail', 'We take the time to clean the places that are easy to miss.'], ['02', 'Professional methods', 'Purposeful tools and considered techniques, used with care.'], ['03', 'Complete care', 'Exterior, interior and finishing in one calm experience.'], ['04', 'A studio mindset', 'Clean, focused and respectful from arrival to handover.']].map(([number, title, text]) => <div className="approach-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section><section className="section process-section"><div className="container"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> The process</p><h2>Car care,<br /><em>made simple.</em></h2></div><div className="heading-side"><p>No guesswork. Just a straightforward path to a better-looking, better-feeling car.</p><Link className="button button-accent" to="/book">Book a visit <ArrowRight size={16} /></Link></div></div><div className="process-grid">{[['01', 'Choose your service', 'Tell us what your car needs.'], ['02', 'Book your visit', 'Pick a time that suits you.'], ['03', 'We care for your car', 'Our team gets to work.'], ['04', 'Drive away fresh', 'Enjoy the finished result.']].map(([number, title, text]) => <div className="process-step" key={number}><span className="process-n">{number}</span><div className="process-line" /><h3>{title}</h3><p>{text}</p></div>)}</div></div></section></>;
}

export function GalleryPage() {
  return <><PageIntro eyebrow="A glimpse inside" title={<>The work speaks<br /><em>for itself.</em></>} intro="A few moments from the studio. Your car could be next." /><section className="section section-surface"><div className="container"><div className="gallery-grid">{galleryItems.map((item, index) => <div className={`gallery-item gallery-item-${index + 1}`} key={item.title}><img src={item.image} alt={item.title} /><span className="gallery-overlay"><small>{item.category}</small><strong>{item.title}</strong></span></div>)}</div><div className="gallery-notes">{galleryItems.map((item) => <div key={item.category}><p className="card-eyebrow">{item.category}</p><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></div></section><section className="section quote-section"><div className="container quote-inner"><div className="quote-mark">“</div><div className="stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div><blockquote>The kind of care you notice the moment you get back in the car. Everything felt considered, fresh and genuinely premium.</blockquote><div className="quote-person"><strong>Jitenra</strong><span>Interior cleaning</span></div></div></section></>;
}

export function ContactPage() {
  return <><PageIntro eyebrow="Visit the studio" title={<>Let's take care<br />of your <em>car.</em></>} intro="Have a question or know what your car needs? We are happy to help." /><section className="section contact-section"><div className="container contact-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> Come by or reach out</p><h2>Clear answers,<br /><em>easy contact.</em></h2><p className="contact-lede">Share a few details and we will help you choose the right care, understand the timing and plan a visit that works.</p><div className="contact-links"><a href={`tel:${businessConfig.phone.replace(/\s/g, '')}`}><span><Clock3 size={17} /></span><div><small>Call us</small><strong>{businessConfig.phone}</strong></div><ArrowRight size={17} /></a><a href={`https://wa.me/${businessConfig.whatsapp}`} target="_blank" rel="noreferrer"><span><Sparkles size={17} /></span><div><small>WhatsApp</small><strong>Start a conversation</strong></div><ArrowRight size={17} /></a><a href="#studio-map"><span><MapPin size={17} /></span><div><small>Find us</small><strong>Sheoganj, Rajasthan</strong></div><ArrowRight size={17} /></a></div></div><div className="contact-card"><p className="card-eyebrow">Plan your visit</p><h3>Ready when you are.</h3><p>We are open Monday to Saturday, 9:00 AM to 8:00 PM. Booking ahead helps us reserve enough time for the right treatment.</p><Link className="button button-accent" to="/book">Start a booking <ArrowRight size={16} /></Link></div></div></section><section className="section process-section" id="studio-map"><div className="container"><div className="contact-location"><div><p className="eyebrow"><span className="eyebrow-line" /> Studio details</p><h2>Find your way<br />to <em>better care.</em></h2></div><div className="location-detail"><MapPin size={22} /><div><strong>{businessConfig.businessName}</strong><p>{businessConfig.address}</p><a className="text-link" href={businessConfig.mapsUrl} target="_blank" rel="noreferrer">Open in Maps <ArrowRight size={16} /></a></div></div></div></div></section></>;
}

export function BookingPage() {
  const [requested, setRequested] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const data = new FormData(event.currentTarget);
    const booking = {
      customer_name: String(data.get('name') || ''),
      mobile: String(data.get('mobile') || ''),
      service_id: String(data.get('service') || ''),
      booking_date: String(data.get('date') || ''),
      start_time: String(data.get('time') || ''),
      vehicle_type: String(data.get('vehicle') || ''),
      notes: String(data.get('notes') || ''),
    };
    try {
      const response = await fetch(import.meta.env.VITE_BOOKING_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(booking),
      });
      const responseText = await response.text();
      let result: { success?: boolean; error?: string; booking_id?: string };
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(`Booking service returned an invalid response (${response.status}). Please check the Apps Script deployment.`);
      }
      if (!response.ok || result.success === false) throw new Error(result.error || 'Unable to submit booking');
      const message = [`New booking request - ${businessConfig.businessName}`, '', `Booking ID: ${result.booking_id || 'Pending'}`, `Name: ${booking.customer_name}`, `Mobile: ${booking.mobile}`, `Service: ${booking.service_id}`, `Date: ${booking.booking_date}`, `Preferred time: ${booking.start_time || 'Flexible'}`, `Vehicle: ${booking.vehicle_type || 'Not specified'}`, `Notes: ${booking.notes || 'None'}`, '', 'Please confirm availability.'].join('\n');
      window.open(`https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      setRequested(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return <><PageIntro eyebrow="Book a service" title={<>Let's make time<br />for <em>your car.</em></>} intro="Share a few details and we will confirm the best available appointment." /><section className="section section-surface"><div className="container booking-layout"><div className="contact-card booking-page-card">{requested ? <div className="booking-success"><CircleCheck size={42} /><p className="eyebrow">WhatsApp draft ready</p><h2>We will be in<br /><em>touch shortly.</em></h2><p>Your booking details were opened in WhatsApp. Please send the message so the studio can confirm availability.</p><Link className="button button-accent" to="/">Back to the studio <ArrowRight size={16} /></Link></div> : <form onSubmit={submitBooking}><p className="card-eyebrow">Booking request</p><h2>Tell us about your visit.</h2><div className="form-row"><label>Full name<input required name="name" type="text" placeholder="Your name" /></label><label>Mobile number<input required name="mobile" type="tel" placeholder="Your mobile number" /></label></div><div className="form-row"><label>Service<select required name="service" defaultValue=""><option value="" disabled>Choose a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label>Preferred date<input required name="date" type="date" /></label></div><div className="form-row"><label>Vehicle type<select name="vehicle" defaultValue=""><option value="">Choose vehicle type</option><option>Hatchback</option><option>Sedan</option><option>SUV</option><option>Luxury / premium</option></select></label><label>Preferred time<select name="time" defaultValue=""><option value="">Choose a time window</option><option>09:00 AM - 12:00 PM</option><option>12:00 PM - 03:00 PM</option><option>03:00 PM - 06:00 PM</option><option>06:00 PM - 08:00 PM</option></select></label></div><label>Anything we should know?<textarea name="notes" rows={4} placeholder="Optional notes about your car" /></label><button className="button button-accent" type="submit" disabled={submitting}>{submitting ? 'Checking availability...' : 'Continue to WhatsApp'} {!submitting && <ArrowRight size={16} />}</button>{submitError && <p className="form-error" role="alert">{submitError}</p>}<p className="form-disclaimer"><Check size={14} /> Your request opens a pre-filled WhatsApp message for {businessConfig.phone}.</p></form>}</div><aside className="booking-aside"><p className="eyebrow"><span className="eyebrow-line" /> Before you arrive</p><h2>A smoother visit<br /><em>starts here.</em></h2><div className="booking-aside-list"><div><Clock3 size={19} /><p><strong>Allow the right time</strong><span>We will confirm an accurate service duration with your slot.</span></p></div><div><Zap size={19} /><p><strong>Keep your phone close</strong><span>We use WhatsApp or a call to confirm the request.</span></p></div><div><ShieldCheck size={19} /><p><strong>Tell us the real condition</strong><span>Notes and photos help us prepare the right products and tools.</span></p></div></div><Link className="text-link" to="/services">Review services first <ArrowRight size={16} /></Link></aside></div></section></>;
}
