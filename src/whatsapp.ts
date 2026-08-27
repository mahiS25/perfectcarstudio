import type { CartItem } from './types';
import { businessConfig } from './config';

export interface OrderDetails {
  customerName: string;
  mobile: string;
  orderType: string;
  specialInstructions: string;
  address?: string;
}

export function buildOrderMessage(
  items: CartItem[],
  details: OrderDetails,
  subtotal: number,
  packagingCharge: number,
  deliveryCharge: number
): string {
  const lines: string[] = [];

  lines.push(`New Order - ${businessConfig.businessName}`);
  lines.push('');
  lines.push(`Customer: ${details.customerName}`);

  if (details.mobile) {
    lines.push(`Mobile: ${details.mobile}`);
  }

  lines.push('');
  lines.push('Items');
  lines.push('');

  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    lines.push(`${index + 1}. ${item.name} × ${item.quantity} — ₹${lineTotal}`);
  });

  lines.push('');
  lines.push(`Order Type: ${details.orderType}`);

  if (details.address) {
    lines.push(`Address: ${details.address}`);
  }

  if (details.specialInstructions && details.specialInstructions.trim()) {
    lines.push('');
    lines.push('Special Instructions:');
    lines.push(details.specialInstructions.trim());
  }

  const total = subtotal + packagingCharge + deliveryCharge;
  lines.push('');
  lines.push(`Total: ₹${total}`);
  lines.push('');
  lines.push('Please confirm availability and order timing.');

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildSupportUrl(): string {
  return `https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(businessConfig.supportMessage)}`;
}
