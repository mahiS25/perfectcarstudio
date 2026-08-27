export const businessConfig = {
  businessName: 'Perfect Car Studio',
  tagline: 'Premium washing, interior care and detailing',
  // International format, digits only. Replace with the real number.
  whatsapp: '919799075458',
  phone: '+91 97990 75458',
  email: 'hello@perfectcarstudio.in',
  address: 'Perfect Car Studio, near RIICO Industrial Area, RIICO Industrial Area, Sheoganj, Rajasthan 307027',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Perfect+Car+Studio+near+RIICO+Industrial+Area+Sheoganj+Rajasthan+307027',
  instagram: '',
  facebook: '',
  openingHours: [
    { days: 'Monday – Saturday', hours: '9:00 AM – 8:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  // Toggle order types available to customers
  orderTypes: {
    pickup: true,
    delivery: false,
  },
  // Optional charges — leave 0 to hide
  packagingCharge: 0,
  deliveryCharge: 0,
  defaultOrderType: 'Pickup' as 'Pickup' | 'Delivery',
  // Prefilled message for the floating support WhatsApp button
  supportMessage: 'Hello Perfect Car Studio, I would like to know more about your car care services.',
};

export type BusinessConfig = typeof businessConfig;
