import React, { useState } from 'react';
import { X, MessageCircle, Phone, Truck, ShieldCheck, Check } from 'lucide-react';

export default function WhatsAppHelpModal({ isOpen, onClose }) {
  const [trackId, setTrackId] = useState('');
  const [trackStatus, setTrackStatus] = useState(null);

  if (!isOpen) return null;

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackId) {
      setTrackStatus(`Order #${trackId.toUpperCase()} is Dispatched via Bluedart. Expected delivery in 2-3 business days.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg vault-glass-elevated rounded-2xl border border-gold-400/30 p-6 sm:p-8 shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-alabaster-400 hover:text-gold-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-sans tracking-wider uppercase font-bold mb-3">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Customer Care (10 AM – 7 PM IST)</span>
        </div>

        <h3 className="text-2xl font-serif text-alabaster-50 mb-1.5">
          How Can We Help You?
        </h3>
        <p className="text-xs text-alabaster-300 font-light mb-6">
          Connect directly with our support team in Mumbai for styling guidance, orders, or tracking.
        </p>

        {/* Direct WhatsApp Action */}
        <a
          href="https://wa.me/919876543210?text=Hi%20Bhagvatam,%20I%20have%20a%20question%20about%20your%20jewellery"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all mb-5"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat on WhatsApp (+91 98765 43210)</span>
        </a>

        {/* Track Order Section */}
        <div className="p-4 rounded-xl bg-obsidian-850 border border-white/5 mb-5">
          <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-gold-300 mb-2 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            <span>Track Your Order</span>
          </h4>
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. BHAG-123456)"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              className="flex-1 bg-obsidian-900 border border-gold-400/20 rounded-lg px-3 py-2 text-xs text-alabaster-100 focus:outline-none focus:border-gold-400"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gold-400 text-obsidian-950 text-xs font-bold font-sans uppercase"
            >
              Track
            </button>
          </form>

          {trackStatus && (
            <div className="mt-3 p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-sans">
              {trackStatus}
            </div>
          )}
        </div>

        {/* Quick FAQs */}
        <div className="space-y-2 text-xs font-sans text-alabaster-300 border-t border-white/10 pt-4">
          <div className="font-bold text-alabaster-100 text-[11px] uppercase tracking-wider text-gold-400 mb-1">
            Frequently Asked Questions
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold-400 font-bold">&bull;</span>
            <span><strong>Cash on Delivery:</strong> Available across 20,000+ pin codes in India.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold-400 font-bold">&bull;</span>
            <span><strong>Color Life:</strong> Coated with anti-tarnish protective lacquer for long-lasting festive shine.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold-400 font-bold">&bull;</span>
            <span><strong>Returns:</strong> 7-day hassle-free replacement with doorstep pickup.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
