import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, Truck, CheckCircle2, HeartHandshake, Droplets, Sun, Archive } from 'lucide-react';
import { QUALITY_PROMISES } from '../data/jewelry';

export default function QualityPromise() {
  const careTips = [
    {
      icon: Droplets,
      title: 'Keep Away from Moisture',
      desc: 'Apply perfumes, lotions, and hairsprays before wearing your jewellery to preserve the golden luster.'
    },
    {
      icon: Archive,
      title: 'Store in Separate Pouches',
      desc: 'Keep each piece in its individual airtight zip pouch to prevent friction and surface scratches.'
    },
    {
      icon: Sun,
      title: 'Wipe Clean After Wear',
      desc: 'Gently wipe with a soft, dry cotton cloth after celebrations to remove sweat and dust before storing.'
    }
  ];

  return (
    <section id="quality" className="py-16 sm:py-24 relative bg-[#FAF7F2] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D8C4A3] bg-white mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A9824B]" />
            <span className="text-[10px] tracking-widest uppercase font-sans text-[#8F6C3A] font-bold">
              Our Craftsmanship & Quality Commitment
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#252321] tracking-tight mb-3">
            Jewellery Crafted for Celebrations & Daily Wear
          </h2>
          <p className="text-[#68625D] text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto font-sans">
            Every Bhagvatam design balances artisanal Indian jewelry traditions with modern skin-safe alloys and protective anti-tarnish polishes.
          </p>
        </div>

        {/* 4 Pillars of Confidence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16">
          {QUALITY_PROMISES.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs flex flex-col justify-between hover:border-[#A9824B]/40 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#A9824B] mb-4 shadow-xs">
                  {idx === 0 && <Sparkles className="w-5 h-5 text-[#A9824B]" />}
                  {idx === 1 && <ShieldCheck className="w-5 h-5 text-[#A9824B]" />}
                  {idx === 2 && <Truck className="w-5 h-5 text-[#A9824B]" />}
                  {idx === 3 && <RefreshCw className="w-5 h-5 text-[#A9824B]" />}
                </div>

                <div className="text-[10px] uppercase tracking-wider text-[#8F6C3A] font-sans font-bold mb-1">
                  {item.subtitle}
                </div>
                <h3 className="text-base sm:text-lg font-serif text-[#252321] mb-2 font-medium">
                  {item.title}
                </h3>
                <p className="text-xs text-[#68625D] font-light leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E8DFD5] flex items-center gap-1.5 text-[10px] text-emerald-800 font-sans font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Quality Inspected Prior to Dispatch</span>
              </div>
            </div>
          ))}
        </div>

        {/* Jewellery Care Guide (Replaces fabricated customer reviews) */}
        <div className="border-t border-[#E8DFD5] pt-12 sm:pt-14">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#8F6C3A] font-bold block mb-1">
              Care & Longevity
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#252321] font-medium">
              How to Keep Your Jewellery Radiant
            </h3>
            <p className="text-xs text-[#68625D] font-sans mt-1">
              Simple everyday habits to protect finish and prolong stone brilliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {careTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] shadow-xs text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#A9824B] mb-3">
                    <Icon className="w-4 h-4 text-[#A9824B]" />
                  </div>
                  <h4 className="text-sm font-serif text-[#252321] font-medium mb-1">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-[#68625D] font-sans font-light leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
