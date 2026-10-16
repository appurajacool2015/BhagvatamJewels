/**
 * Bhagvatam Store Configuration & Integrations
 * 
 * Data Integrity & Safety Rule:
 * We do not assume placeholder numbers like 919876543210 are verified.
 * WhatsApp enquiry actions remain safely disabled until a confirmed business
 * number is explicitly configured.
 */

export const STORE_CONFIG = {
  // Set to a verified Indian mobile number with country code (e.g. '919812345678')
  whatsAppNumber: '',
  // Must be set to true only after a valid business WhatsApp number is verified
  isWhatsAppVerified: false,
  
  businessName: 'Bhagvatam Jewels',
  supportHours: '10:00 AM – 7:00 PM IST',
  freeShippingThreshold: 499
};

/**
 * Validate that a given phone number has valid length and numerical digits.
 */
export function validateWhatsAppNumber(number) {
  if (!number || typeof number !== 'string') return false;
  const clean = number.replace(/\D/g, '');
  return clean.length >= 10 && clean.length <= 15;
}

/**
 * Generate a safe WhatsApp availability enquiry URL for a single product.
 * Returns null if WhatsApp is unverified, keeping the integration safely disabled.
 */
export function getWhatsAppEnquiryUrl(product) {
  if (
    !STORE_CONFIG.isWhatsAppVerified ||
    !STORE_CONFIG.whatsAppNumber ||
    !validateWhatsAppNumber(STORE_CONFIG.whatsAppNumber)
  ) {
    return null;
  }

  const message = `Hi ${STORE_CONFIG.businessName}, I would like to check availability for "${product.title}" (Product ID: ${product.id}, Price: ₹${product.price}) for delivery.`;
  return `https://wa.me/${STORE_CONFIG.whatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a safe WhatsApp enquiry URL for cart delivery timelines.
 * Returns null if WhatsApp is unverified, keeping the integration safely disabled.
 */
export function getWhatsAppCartEnquiryUrl(cart, finalTotal) {
  if (
    !STORE_CONFIG.isWhatsAppVerified ||
    !STORE_CONFIG.whatsAppNumber ||
    !validateWhatsAppNumber(STORE_CONFIG.whatsAppNumber)
  ) {
    return null;
  }

  const message = `Hi ${STORE_CONFIG.businessName}, I have ${cart.length} item(s) in my cart totaling ₹${finalTotal}. Could you confirm delivery timeline for my pincode?`;
  return `https://wa.me/${STORE_CONFIG.whatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
