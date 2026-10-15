import React, { useState } from 'react';
import { SET_BUILDER_DATA } from '../data/jewelry';
import { Sparkles, ShoppingBag, Check, ShieldCheck, ArrowRight, Tag } from 'lucide-react';

export default function StyleSetBuilder({ onAddToCart }) {
  const [selectedNecklace, setSelectedNecklace] = useState(SET_BUILDER_DATA.necklaces[0]);
  const [selectedEarring, setSelectedEarring] = useState(SET_BUILDER_DATA.earrings[0]);
  const [selectedRing, setSelectedRing] = useState(SET_BUILDER_DATA.rings[0]);

  // Combo calculation
  const totalIndividualPrice = selectedNecklace.price + selectedEarring.price + selectedRing.price;
  const totalMrp = selectedNecklace.mrp + selectedEarring.mrp + selectedRing.mrp;
  const comboDiscount = Math.round(totalIndividualPrice * 0.25); // 25% combo discount
  const finalBundlePrice = totalIndividualPrice - comboDiscount;

  const handleAddBundleToCart = () => {
    const bundleItem = {
      id: `combo-${Date.now()}`,
      title: `3-Piece Festive Set: ${selectedNecklace.name} + ${selectedEarring.name} + ${selectedRing.name}`,
      category: 'Combo Sets',
      price: finalBundlePrice,
      mrp: totalMrp,
      badge: 'Festive 3-Piece Set (25% OFF)',
      material: '18k Micro Gold Plated Brass',
      productImage: selectedNecklace.img,
      modelImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      description: `Complete handcrafted festive combination: 1x ${selectedNecklace.name}, 1x ${selectedEarring.name}, and 1x ${selectedRing.name}. Comes in a luxury gift box.`,
      features: ['Anti-Tarnish Polish', 'Free Cash on Delivery', '25% Combo Saving', 'Gift Packaging']
    };
    onAddToCart(bundleItem);
  };

  return (
    <section id="set-builder" className="py-20 sm:py-28 relative bg-obsidian-950 overflow-hidden border-t border-gold-400/15">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-gold-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-obsidian-900 mb-3 shadow-gold-sm">
            <Tag className="w-3.5 h-3.5 text-gold-300" />
            <span className="text-[10px] tracking-widest uppercase font-sans text-gold-300 font-bold">
              Combo Offer &bull; Flat 25% Extra Discount
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-alabaster-50 tracking-tight mb-3">
            Festive Mix & Match Set Studio
          </h2>
          <p className="text-alabaster-300 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Pair your favorite Choker, matching Jhumkas, and Statement Ring to create a complete festive look for under ₹999.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3 Customization Columns */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Chokers */}
            <div className="vault-glass p-5 rounded-xl border border-gold-400/15">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-sans font-bold tracking-wider uppercase text-gold-300">
                  Step 1: Choose Your Choker / Necklace
                </span>
                <span className="text-xs text-alabaster-200 font-sans">₹{selectedNecklace.price}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SET_BUILDER_DATA.necklaces.map((item) => {
                  const isSelected = selectedNecklace.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedNecklace(item)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center sm:flex-col gap-3 text-left sm:text-center ${
                        isSelected
                          ? 'border-gold-400 bg-gold-400/10 shadow-gold-sm'
                          : 'border-white/10 bg-obsidian-850 hover:border-gold-400/40'
                      }`}
                    >
                      <img src={item.img} alt={item.name} className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0" />
                      <div>
                        <div className="text-xs font-sans text-alabaster-100 font-medium line-clamp-1">{item.name}</div>
                        <div className="text-xs text-gold-300 font-bold mt-0.5">₹{item.price} <span className="line-through text-alabaster-500 font-normal text-[10px]">₹{item.mrp}</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Jhumkas */}
            <div className="vault-glass p-5 rounded-xl border border-gold-400/15">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-sans font-bold tracking-wider uppercase text-gold-300">
                  Step 2: Choose Matching Jhumkas / Earrings
                </span>
                <span className="text-xs text-alabaster-200 font-sans">₹{selectedEarring.price}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SET_BUILDER_DATA.earrings.map((item) => {
                  const isSelected = selectedEarring.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedEarring(item)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center sm:flex-col gap-3 text-left sm:text-center ${
                        isSelected
                          ? 'border-gold-400 bg-gold-400/10 shadow-gold-sm'
                          : 'border-white/10 bg-obsidian-850 hover:border-gold-400/40'
                      }`}
                    >
                      <img src={item.img} alt={item.name} className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0" />
                      <div>
                        <div className="text-xs font-sans text-alabaster-100 font-medium line-clamp-1">{item.name}</div>
                        <div className="text-xs text-gold-300 font-bold mt-0.5">₹{item.price} <span className="line-through text-alabaster-500 font-normal text-[10px]">₹{item.mrp}</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Rings / Kadas */}
            <div className="vault-glass p-5 rounded-xl border border-gold-400/15">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-sans font-bold tracking-wider uppercase text-gold-300">
                  Step 3: Choose Ring or Bangles
                </span>
                <span className="text-xs text-alabaster-200 font-sans">₹{selectedRing.price}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SET_BUILDER_DATA.rings.map((item) => {
                  const isSelected = selectedRing.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedRing(item)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center sm:flex-col gap-3 text-left sm:text-center ${
                        isSelected
                          ? 'border-gold-400 bg-gold-400/10 shadow-gold-sm'
                          : 'border-white/10 bg-obsidian-850 hover:border-gold-400/40'
                      }`}
                    >
                      <img src={item.img} alt={item.name} className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0" />
                      <div>
                        <div className="text-xs font-sans text-alabaster-100 font-medium line-clamp-1">{item.name}</div>
                        <div className="text-xs text-gold-300 font-bold mt-0.5">₹{item.price} <span className="line-through text-alabaster-500 font-normal text-[10px]">₹{item.mrp}</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Live Combo Deal Summary Card */}
          <div className="lg:col-span-4 vault-glass-elevated rounded-2xl p-6 border border-gold-400/30 sticky top-28">
            <div className="inline-block px-3 py-1 rounded bg-gold-400/10 border border-gold-400/30 text-gold-300 text-[10px] uppercase font-sans tracking-widest font-bold mb-4">
              Your Complete 3-Piece Look
            </div>

            {/* Model Wearing Preview */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-obsidian-950 mb-4 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                alt="Model wearing festive set"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-serif text-gold-200">
                Styled Look: Royal Festive Grace
              </div>
            </div>

            {/* Selected Items Breakdown */}
            <div className="space-y-2 text-xs font-sans text-alabaster-300 pb-4 border-b border-white/10">
              <div className="flex justify-between">
                <span className="truncate pr-2">1. {selectedNecklace.name}</span>
                <span className="text-alabaster-100 font-medium">₹{selectedNecklace.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="truncate pr-2">2. {selectedEarring.name}</span>
                <span className="text-alabaster-100 font-medium">₹{selectedEarring.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="truncate pr-2">3. {selectedRing.name}</span>
                <span className="text-alabaster-100 font-medium">₹{selectedRing.price}</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="py-4 space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-alabaster-400">
                <span>Total MRP:</span>
                <span className="line-through">₹{totalMrp}</span>
              </div>
              <div className="flex justify-between text-alabaster-400">
                <span>Individual Price:</span>
                <span>₹{totalIndividualPrice}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>25% Combo Deal Discount:</span>
                <span>-₹{comboDiscount}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-alabaster-100 font-bold">Bundle Price:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gold-300 font-sans">₹{finalBundlePrice}</span>
                  <div className="text-[10px] text-emerald-400 font-medium">You Save ₹{totalMrp - finalBundlePrice} Overall!</div>
                </div>
              </div>
            </div>

            {/* Buy Combo Button */}
            <button
              onClick={handleAddBundleToCart}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-obsidian-950 font-sans font-bold text-xs tracking-wider uppercase hover:shadow-gold-glow transition-all shadow-xl"
            >
              Buy 3-Piece Combo (₹{finalBundlePrice})
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-alabaster-400 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Includes Free Cash on Delivery & Free Gift Box</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
