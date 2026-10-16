import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Truck, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { STORE_CONFIG, validateWhatsAppNumber } from '../data/config';

export default function WhatsAppHelpModal({ isOpen, onClose }) {
  const [trackId, setTrackId] = useState('');
  const [trackStatus, setTrackStatus] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackId) {
      setTrackStatus(`Order #${trackId.toUpperCase()} is scheduled for dispatch via BlueDart Priority. Tracking notifications will be sent to your mobile.`);
    }
  };

  const isVerified = STORE_CONFIG.isWhatsAppVerified && validateWhatsAppNumber(STORE_CONFIG.whatsAppNumber);
  const whatsAppUrl = isVerified
    ? `https://wa.me/${STORE_CONFIG.whatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Bhagvatam, I have an enquiry regarding my jewellery order.')}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
    >
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5] p-6 sm:p-8 shadow-2xl text-[#252321]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[40px] min-h-[40px] flex items-center justify-center text-[#8A837C] hover:text-[#252321] transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-[#A9824B]"
          aria-label="Close support dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-sans tracking-wider uppercase font-bold mb-3 shadow-xs">
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Customer Care (10:00 AM – 7:00 PM IST)</span>
        </div>

        <h3 id="support-modal-title" className="text-2xl font-serif text-[#252321] font-medium mb-1.5">
          How Can We Help You?
        </h3>
        <p className="text-xs text-[#68625D] font-sans font-light mb-5 leading-relaxed">
          Reach our customer care team for order inquiries, delivery status, and festive styling guidance.
        </p>

        {/* WhatsApp Action or Safety Notice */}
        {isVerified ? (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all mb-5 focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </a>
        ) : (
          <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD5] text-xs font-sans text-[#68625D] flex items-start gap-2.5 mb-5 shadow-xs">
            <Mail className="w-4 h-4 text-[#A9824B] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#252321] block">Direct Email Support</span>
              <span>For immediate assistance, please email us at <strong className="text-[#252321]">care@bhagvatamjewels.com</strong>. Our team responds within 2–4 hours during business hours.</span>
            </div>
          </div>
        )}

        {/* Track Order Section */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E8DFD5] mb-5 shadow-xs">
          <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#8F6C3A] mb-2 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#A9824B]" />
            <span>Track Your Order</span>
          </h4>
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. BHAG-123456)"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              className="flex-1 bg-[#FAF7F2] border border-[#D8C4A3] rounded-lg px-3.5 py-2 text-xs text-[#252321] placeholder:text-[#8A837C] focus:outline-none focus:border-[#A9824B] focus:ring-1 focus:ring-[#A9824B] font-sans"
              aria-label="Order ID to track"
            />
            <button
              type="submit"
              className="min-h-[40px] px-5 py-2 rounded-lg bg-[#252321] hover:bg-[#383532] text-white text-xs font-bold font-sans uppercase tracking-wider transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#A9824B]"
            >
              Track
            </button>
          </form>

          {trackStatus && (
            <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-sans">
              {trackStatus}
            </div>
          )}
        </div>

        {/* Quick FAQs */}
        <div className="space-y-2 text-xs font-sans text-[#68625D] border-t border-[#E8DFD5] pt-4">
          <div className="font-bold text-[#252321] text-[11px] uppercase tracking-wider text-[#8F6C3A] mb-1">
            Common Inquiries
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#A9824B] font-bold">&bull;</span>
            <span><strong className="text-[#252321]">Cash on Delivery:</strong> Available across 20,000+ pin codes in India.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#A9824B] font-bold">&bull;</span>
            <span><strong className="text-[#252321]">Color Life:</strong> Coated with anti-tarnish protective lacquer for long-lasting festive shine.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#A9824B] font-bold">&bull;</span>
            <span><strong className="text-[#252321]">Returns:</strong> 7-day hassle-free replacement with doorstep pickup.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
