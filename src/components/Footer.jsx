import React, { useState } from 'react';
import { Sparkles, Truck, ShieldCheck, Mail, MessageCircle, Check } from 'lucide-react';

export default function Footer() {
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (phone) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-obsidian-950 text-alabaster-200 border-t border-gold-400/20 pt-16 pb-12 font-sans relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top VIP WhatsApp Club Banner */}
        <div className="vault-glass p-6 sm:p-10 rounded-2xl border border-gold-400/20 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-widest text-gold-300 font-bold block mb-1">
              Festive WhatsApp Club
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-alabaster-50 mb-1">
              Get Secret Flash Sale Deals & Early Access to Under ₹499 Drops
            </h3>
            <p className="text-xs text-alabaster-300 font-light">
              Join 50,000+ Indian women who receive weekly new arrival previews on WhatsApp.
            </p>
          </div>

          <div className="lg:col-span-5">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit Mobile No."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-obsidian-900 border border-gold-400/30 rounded-full px-4 py-2.5 text-xs text-alabaster-100 focus:outline-none focus:border-gold-400 placeholder:text-alabaster-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 text-xs font-bold tracking-wider uppercase hover:shadow-gold-glow transition-all shrink-0"
                >
                  Join Club
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-sans p-3 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're subscribed! Check WhatsApp for your 10% coupon code.</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <span className="text-2xl font-display tracking-[0.25em] gold-text-shimmer uppercase block">
              Bhagvatam
            </span>
            <p className="text-xs text-alabaster-400 font-light leading-relaxed">
              India’s destination for high-finish artificial, Kundan, and daily wear imitation jewellery. Looking royal doesn’t have to cost a fortune.
            </p>
            <div className="text-[11px] text-gold-400/90 font-medium">
              &bull; 100% Anti-Tarnish Finish &bull; Cash on Delivery
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Popular Collections
            </h4>
            <ul className="space-y-1.5 text-xs text-alabaster-400">
              <li><a href="#collections" className="hover:text-gold-300 transition-colors">Kundan Bridal Chokers</a></li>
              <li><a href="#collections" className="hover:text-gold-300 transition-colors">Mayura & Temple Jhumkas</a></li>
              <li><a href="#collections" className="hover:text-gold-300 transition-colors">Boho Oxidised Silver</a></li>
              <li><a href="#collections" className="hover:text-gold-300 transition-colors">Waterproof Daily Wear (18k Plated)</a></li>
              <li><a href="#set-builder" className="hover:text-gold-300 transition-colors">Festive 3-Piece Combos (Save 25%)</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Help & Support
            </h4>
            <div className="space-y-1.5 text-xs text-alabaster-400">
              <div>WhatsApp Support: +91 98765 43210</div>
              <div>Support Hours: 10:00 AM – 7:00 PM IST</div>
              <div>Email: help@bhagvatamjewels.com</div>
              <div>Dispatched via: BlueDart & Delhivery</div>
              <div>7-Day Return / Exchange Policy</div>
            </div>
          </div>

          {/* Col 4: Trust & Payment Icons */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Safe & Secure Payments
            </h4>
            <p className="text-xs text-alabaster-400 font-light">
              We support all popular Indian payment options with zero extra fees.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-sans">
              <span className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/10 text-emerald-400 font-bold">💵 Cash on Delivery (COD)</span>
              <span className="px-2 py-1 rounded bg-obsidian-850 border border-white/10 text-gold-300">⚡ Google Pay</span>
              <span className="px-2 py-1 rounded bg-obsidian-850 border border-white/10 text-gold-300">⚡ PhonePe</span>
              <span className="px-2 py-1 rounded bg-obsidian-850 border border-white/10 text-gold-300">⚡ Paytm / UPI</span>
              <span className="px-2 py-1 rounded bg-obsidian-850 border border-white/10 text-alabaster-300">Visa / Mastercard</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-alabaster-500 font-sans gap-3">
          <div>
            © {new Date().getFullYear()} BHAGVATAM LIFESTYLE JEWELS INDIA PVT. LTD. All Rights Reserved.
          </div>
          <div className="flex space-x-5 text-alabaster-400">
            <a href="#" className="hover:text-gold-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-300 transition-colors">Shipping & COD Terms</a>
            <a href="#" className="hover:text-gold-300 transition-colors">Return / Exchange Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
