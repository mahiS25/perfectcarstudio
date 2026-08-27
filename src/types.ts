export type CategorySlug = 'idli-vada' | 'dosa' | 'uttapam' | 'chaat' | 'beverages';

export type SpiceLevel = 'mild' | 'medium' | 'spicy';

export type Availability = 'available' | 'sold-out' | 'soon';

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  price: number;
  image: string;
  vegetarian: boolean;
  bestseller?: boolean;
  popular?: boolean;
  isNew?: boolean;
  spicy?: boolean;
  spiceLevel?: SpiceLevel;
  available: Availability;
  serves?: string;
  includes?: string[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  specialInstructions?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
  tagline: string;
}
