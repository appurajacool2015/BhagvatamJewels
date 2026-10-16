import React, { useState } from 'react';
import { Sparkles, Truck, ShieldCheck, Mail, MessageCircle, Check } from 'lucide-react';

export default function Footer({ onOpenSupport }) {
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (phone) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#252321] text-[#FAF7F2] border-t border-[#3D3A37] pt-14 pb-10 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top VIP Announcement Strip */}
        <div className="bg-[#1A1817] p-6 sm:p-8 rounded-2xl border border-[#3D3A37] mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-widest text-[#D8C4A3] font-bold block mb-1">
              Festive Jewellery Circle
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mb-1">
              Early Previews & Festive Drop Announcements
            </h3>
            <p className="text-xs text-[#D8C4A3] font-light leading-relaxed">
              Receive updates on seasonal collections, styling notes, and under ₹499 daily wear curations.
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
                  className="flex-1 bg-[#252321] border border-[#4D4945] rounded-full px-4 py-2.5 text-xs text-white placeholder:text-[#8A837C] focus:outline-none focus:border-[#A9824B]"
                  aria-label="Mobile number for collection updates"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#A9824B] hover:bg-[#8F6C3A] text-white text-xs font-bold tracking-wider uppercase transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-[#D8C4A3]"
                >
                  Join Circle
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-sans p-3 rounded-full bg-emerald-950/40 border border-emerald-700/50">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing! We will send you collection alerts.</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <span className="text-2xl font-display tracking-[0.22em] text-[#FAF7F2] uppercase block">
              Bhagvatam
            </span>
            <p className="text-xs text-[#D8C4A3] font-light leading-relaxed">
              India’s curated destination for high-finish artificial, Kundan, and daily wear imitation jewellery. Precious festive grace designed for every celebration.
            </p>
            <div className="text-[11px] text-[#A9824B] font-medium">
              &bull; 100% Anti-Tarnish Finish &bull; Cash on Delivery
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
              Popular Collections
            </h4>
            <ul className="space-y-1.5 text-xs text-[#D8C4A3]">
              <li><a href="#collections" className="hover:text-white transition-colors">Kundan Bridal Chokers</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Mayura & Temple Jhumkas</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Boho Oxidised Silver</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Waterproof Daily Wear (18k Plated)</a></li>
              <li><a href="#set-builder" className="hover:text-white transition-colors">Festive 3-Piece Combos (Save 25%)</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
              Customer Care
            </h4>
            <div className="space-y-1.5 text-xs text-[#D8C4A3]">
              <div>Support Hours: 10:00 AM – 7:00 PM IST (Mon–Sat)</div>
              <div>Email: care@bhagvatamjewels.com</div>
              <div>Dispatch: BlueDart & Delhivery Priority</div>
              <div>Policy: 7-Day Doorstep Replacement</div>
              <div>Cash on Delivery available all India</div>
            </div>
          </div>

          {/* Col 4: Trust & Payment Icons */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
              Payment Methods
            </h4>
            <p className="text-xs text-[#D8C4A3] font-light">
              Supported payment options across India with zero extra transaction fees.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-sans">
              <span className="px-2.5 py-1 rounded-md bg-[#1A1817] border border-[#3D3A37] text-emerald-400 font-semibold">💵 Cash on Delivery</span>
              <span className="px-2 py-1 rounded-md bg-[#1A1817] border border-[#3D3A37] text-[#D8C4A3]">⚡ Google Pay</span>
              <span className="px-2 py-1 rounded-md bg-[#1A1817] border border-[#3D3A37] text-[#D8C4A3]">⚡ PhonePe</span>
              <span className="px-2 py-1 rounded-md bg-[#1A1817] border border-[#3D3A37] text-[#D8C4A3]">⚡ Paytm / UPI</span>
              <span className="px-2 py-1 rounded-md bg-[#1A1817] border border-[#3D3A37] text-[#D8C4A3]">Cards & Net Banking</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-[#3D3A37] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A89F95] font-sans gap-3">
          <div>
            © {new Date().getFullYear()} BHAGVATAM FINE JEWELS. All Rights Reserved.
          </div>
          <div className="flex space-x-5 text-[#D8C4A3]">
            <span>Privacy Policy</span>
            <span>Shipping Terms</span>
            <span>Replacement Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
