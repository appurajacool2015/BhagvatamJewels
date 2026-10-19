import React, { useState } from 'react';
import { SET_BUILDER_DATA } from '../data/jewelry';
import { Sparkles, ShoppingBag, Check, ShieldCheck, ArrowRight, Tag, AlertCircle } from 'lucide-react';
import JewelryImage from './JewelryImage';

export default function StyleSetBuilder({ onAddToCart }) {
  const [selectedNecklace, setSelectedNecklace] = useState(SET_BUILDER_DATA.necklaces[0]);
  const [selectedEarring, setSelectedEarring] = useState(SET_BUILDER_DATA.earrings[0]);
  const [selectedRing, setSelectedRing] = useState(SET_BUILDER_DATA.rings[0]);

  // Genuine combo calculation without artificial clamping
  const totalIndividualPrice = selectedNecklace.price + selectedEarring.price + selectedRing.price;
  const totalMrp = selectedNecklace.mrp + selectedEarring.mrp + selectedRing.mrp;
  const comboDiscount = Math.round(totalIndividualPrice * 0.25); // 25% combo discount
  const finalBundlePrice = totalIndividualPrice - comboDiscount;
  const isOverBudget = finalBundlePrice > 999;

  const handleAddBundleToCart = () => {
    if (isOverBudget) return;
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
    <section id="set-builder" className="py-16 sm:py-24 relative bg-[#F7F2E9] overflow-hidden border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D8C4A3] bg-white mb-3 shadow-xs">
            <Tag className="w-3.5 h-3.5 text-[#A9824B]" />
            <span className="text-[10px] tracking-widest uppercase font-sans text-[#8F6C3A] font-bold">
              Combo Offer &bull; Flat 25% Extra Discount
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#252321] tracking-tight mb-3">
            Festive Mix & Match Set Studio
          </h2>
          <p className="text-[#68625D] text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed font-sans">
            Pair your favorite Choker, matching Jhumkas, and Statement Ring to create a complete festive look for under ₹999.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3 Customization Columns */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Chokers */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-sans font-bold tracking-wider uppercase text-[#8F6C3A]">
                  Step 1: Choose Your Choker / Necklace
                </span>
                <span className="text-xs text-[#252321] font-sans font-semibold">₹{selectedNecklace.price}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SET_BUILDER_DATA.necklaces.map((item) => {
                  const isSelected = selectedNecklace.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedNecklace(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedNecklace(item); }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center sm:flex-col gap-3 text-left sm:text-center focus-visible:ring-2 focus-visible:ring-[#A9824B] focus-visible:outline-none ${
                        isSelected
                          ? 'border-[#A9824B] bg-[#FAF7F2] ring-2 ring-[#A9824B]/30 shadow-sm'
                          : 'border-[#E8DFD5] bg-[#FAF7F2]/60 hover:bg-white hover:border-[#A9824B]/50'
                      }`}
                    >
                      <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden border border-[#E8DFD5]">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="text-xs font-sans text-[#252321] font-medium line-clamp-1">{item.name}</div>
                        <div className="text-xs text-[#8F6C3A] font-bold mt-0.5">
                          ₹{item.price}{' '}
                          <span className="line-through text-[#8A837C] font-normal text-[10px]">₹{item.mrp}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Jhumkas */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-sans font-bold tracking-wider uppercase text-[#8F6C3A]">
                  Step 2: Choose Matching Jhumkas / Earrings
                </span>
                <span className="text-xs text-[#252321] font-sans font-semibold">₹{selectedEarring.price}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SET_BUILDER_DATA.earrings.map((item) => {
                  const isSelected = selectedEarring.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedEarring(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedEarring(item); }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center sm:flex-col gap-3 text-left sm:text-center focus-visible:ring-2 focus-visible:ring-[#A9824B] focus-visible:outline-none ${
                        isSelected
                          ? 'border-[#A9824B] bg-[#FAF7F2] ring-2 ring-[#A9824B]/30 shadow-sm'
                          : 'border-[#E8DFD5] bg-[#FAF7F2]/60 hover:bg-white hover:border-[#A9824B]/50'
                      }`}
                    >
                      <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden border border-[#E8DFD5]">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="text-xs font-sans text-[#252321] font-medium line-clamp-1">{item.name}</div>
                        <div className="text-xs text-[#8F6C3A] font-bold mt-0.5">
                          ₹{item.price}{' '}
                          <span className="line-through text-[#8A837C] font-normal text-[10px]">₹{item.mrp}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Rings / Kadas */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-sans font-bold tracking-wider uppercase text-[#8F6C3A]">
                  Step 3: Choose Ring or Bangles
                </span>
                <span className="text-xs text-[#252321] font-sans font-semibold">₹{selectedRing.price}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SET_BUILDER_DATA.rings.map((item) => {
                  const isSelected = selectedRing.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedRing(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedRing(item); }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center sm:flex-col gap-3 text-left sm:text-center focus-visible:ring-2 focus-visible:ring-[#A9824B] focus-visible:outline-none ${
                        isSelected
                          ? 'border-[#A9824B] bg-[#FAF7F2] ring-2 ring-[#A9824B]/30 shadow-sm'
                          : 'border-[#E8DFD5] bg-[#FAF7F2]/60 hover:bg-white hover:border-[#A9824B]/50'
                      }`}
                    >
                      <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden border border-[#E8DFD5]">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="text-xs font-sans text-[#252321] font-medium line-clamp-1">{item.name}</div>
                        <div className="text-xs text-[#8F6C3A] font-bold mt-0.5">
                          ₹{item.price}{' '}
                          <span className="line-through text-[#8A837C] font-normal text-[10px]">₹{item.mrp}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Live Combo Deal Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-md sticky top-24 text-[#252321]">
            <div className="inline-block px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#D8C4A3] text-[#8F6C3A] text-[10px] uppercase font-sans tracking-widest font-bold mb-4">
              Your Complete 3-Piece Look
            </div>

            {/* Model Wearing Preview */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE8DC] mb-4 border border-[#E8DFD5]">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                alt="Model wearing curated festive jewellery set"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-serif text-white font-medium">
                Curated Look: Royal Festive Grace
              </div>
            </div>

            {/* Selected Items Breakdown */}
            <div className="space-y-2 text-xs font-sans text-[#4D4945] pb-4 border-b border-[#E8DFD5]">
              <div className="flex justify-between">
                <span className="truncate pr-2">1. {selectedNecklace.name}</span>
                <span className="text-[#252321] font-medium shrink-0">₹{selectedNecklace.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="truncate pr-2">2. {selectedEarring.name}</span>
                <span className="text-[#252321] font-medium shrink-0">₹{selectedEarring.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="truncate pr-2">3. {selectedRing.name}</span>
                <span className="text-[#252321] font-medium shrink-0">₹{selectedRing.price}</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="py-4 space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-[#8A837C]">
                <span>Total MRP:</span>
                <span className="line-through">₹{totalMrp}</span>
              </div>
              <div className="flex justify-between text-[#4D4945]">
                <span>Individual Price:</span>
                <span>₹{totalIndividualPrice}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>25% Combo Deal Discount:</span>
                <span>-₹{comboDiscount}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#E8DFD5]">
                <span className="text-xs uppercase tracking-wider text-[#252321] font-bold">Bundle Price:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#8F6C3A] font-serif">₹{finalBundlePrice}</span>
                  <div className="text-[10px] text-emerald-800 font-medium">You Save ₹{totalMrp - finalBundlePrice} Overall!</div>
                </div>
              </div>
            </div>

            {/* Over-Budget Rejection Warning */}
            {isOverBudget && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-sans mb-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>This set totals ₹{finalBundlePrice}, which exceeds our ₹999 festive ceiling. Please pick an alternative piece or smaller accessory to qualify for the combo deal.</span>
              </div>
            )}

            {/* Buy Combo Button */}
            <button
              onClick={handleAddBundleToCart}
              disabled={isOverBudget}
              aria-disabled={isOverBudget}
              className={`w-full min-h-[48px] py-3.5 px-4 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] focus-visible:outline-none ${
                isOverBudget
                  ? 'bg-[#E8DFD5] text-[#8A837C] cursor-not-allowed shadow-none'
                  : 'bg-[#252321] hover:bg-[#3D3A37] text-white shadow-md active:scale-[0.98]'
              }`}
            >
              {isOverBudget
                ? 'Exceeds ₹999 Limit — Select Alternative'
                : `Add 3-Piece Festive Set to Bag (₹${finalBundlePrice})`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#68625D] mt-3 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A9824B]" />
              <span>Includes Free Cash on Delivery & Free Gift Box</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
