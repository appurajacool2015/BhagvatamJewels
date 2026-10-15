import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, Truck, CheckCircle2 } from 'lucide-react';
import { QUALITY_PROMISES, REVIEWS } from '../data/jewelry';

export default function QualityPromise() {
  return (
    <section id="quality" className="py-20 sm:py-28 relative bg-obsidian-950 border-t border-gold-400/15 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-obsidian-900 mb-3 shadow-gold-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-300" />
            <span className="text-[10px] tracking-widest uppercase font-sans text-gold-300 font-bold">
              Why 50,000+ Women Trust Bhagvatam
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-alabaster-50 tracking-tight mb-3">
            Our Quality & Anti-Tarnish Promise
          </h2>
          <p className="text-alabaster-300 text-xs sm:text-sm font-light leading-relaxed">
            We know buying artificial jewellery online comes with doubts about fading and skin reactions. 
            Here is why our pieces stay brilliant wear after wear.
          </p>
        </div>

        {/* 4 Pillars of Confidence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {QUALITY_PROMISES.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl vault-glass border border-gold-400/20 vault-glass-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300 mb-4 shadow-sm">
                  {idx === 0 && <Sparkles className="w-6 h-6 text-gold-400" />}
                  {idx === 1 && <ShieldCheck className="w-6 h-6 text-gold-400" />}
                  {idx === 2 && <Truck className="w-6 h-6 text-gold-400" />}
                  {idx === 3 && <RefreshCw className="w-6 h-6 text-gold-400" />}
                </div>

                <div className="text-[10px] uppercase tracking-wider text-gold-400 font-sans font-bold mb-1">
                  {item.subtitle}
                </div>
                <h3 className="text-lg font-serif text-alabaster-50 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-alabaster-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-emerald-400 font-sans font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified by Bhagvatam Labs</span>
              </div>
            </div>
          ))}
        </div>

        {/* Real Customer Experiences */}
        <div className="border-t border-white/10 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-sans tracking-widest uppercase text-gold-300 font-bold block mb-1">
              Customer Love
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-alabaster-50">
              Trusted by Festive Shoppers Across India
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="vault-glass p-6 rounded-2xl border border-gold-400/15 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-gold-400 mb-3">
                    {[...Array(rev.stars)].map((_, s) => (
                      <span key={s} className="text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-alabaster-200 leading-relaxed mb-4">
                    “{rev.review}”
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-sans">
                  <div>
                    <span className="font-bold text-alabaster-100 block">{rev.name}</span>
                    <span className="text-[11px] text-alabaster-400">{rev.city}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gold-400/10 text-gold-300 border border-gold-400/20">
                    Verified Purchase
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
