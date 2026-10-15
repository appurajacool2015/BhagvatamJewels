import React from 'react';
import { Sparkles, Shield, Package, Lock, Award, HeartHandshake } from 'lucide-react';
import { TESTIMONIALS } from '../data/jewelry';

export default function CraftsmanshipStory() {
  return (
    <section id="heritage" className="py-24 sm:py-32 relative bg-obsidian-900 border-t border-gold-400/15 overflow-hidden">
      
      {/* Background radial atmosphere */}
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-obsidian-850">
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-gold-300">
                The Bhagvatam Lineage
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-alabaster-50 tracking-tight leading-[1.15]">
              Sacred Proportions & Generational Metallurgy
            </h2>

            <p className="text-sm sm:text-base font-sans text-alabaster-200 font-light leading-relaxed">
              Founded on the belief that fine jewelry is more than an accessory—it is an energetic heirloom that outlasts generations. 
              The name <span className="text-gold-200 font-serif italic">Bhagvatam</span> pays homage to the divine eternal spirit, uniting ancient Vedic temple geometry with the rigorous micro-prong tolerances of Parisian haute joaillerie.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-sans text-alabaster-100 font-medium">Solid 18k & 950 Platinum</h4>
                  <p className="text-[11px] text-alabaster-400 font-light mt-0.5">Zero nickel, 100% recycled precious alloys.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-sans text-alabaster-100 font-medium">Ethical Kimberly Process</h4>
                  <p className="text-[11px] text-alabaster-400 font-light mt-0.5">Strictly conflict-free mine-to-finger tracking.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Atelier Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden vault-glass-elevated border border-gold-400/25 p-2">
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85"
                alt="Master Goldsmith at Work"
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent rounded-xl pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-obsidian-900/90 backdrop-blur-md border border-gold-400/20">
                <div className="text-xs font-serif text-gold-200 italic mb-1">“A diamond is a thousand-year whisper of the earth.”</div>
                <div className="text-[10px] font-sans tracking-widest uppercase text-alabaster-400">Head Master Jeweler • Bhagvatam Atelier</div>
              </div>
            </div>
          </div>

        </div>

        {/* The Sensory Unboxing Vault Experience */}
        <div className="vault-glass-elevated rounded-3xl p-8 sm:p-14 border border-gold-400/30 mb-28 relative overflow-hidden">
          <div className="max-w-3xl mb-12">
            <div className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-300 mb-2">
              The Presentation Ceremony
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif text-alabaster-50 mb-3">
              The Discreet Luxury Unboxing Experience
            </h3>
            <p className="text-xs sm:text-sm font-sans text-alabaster-300 font-light leading-relaxed">
              Every acquisition arrives disguised in an unmarked armored outer carton for absolute doorstep confidentiality. 
              Inside awaits a handcrafted presentation crafted to elevate the proposal or gifting moment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-obsidian-850/80 border border-white/5 space-y-3">
              <Package className="w-6 h-6 text-gold-400" />
              <h4 className="text-xs font-sans uppercase tracking-widest text-alabaster-100 font-medium">Obsidian Velvet Case</h4>
              <p className="text-[11px] text-alabaster-400 font-light leading-relaxed">
                Hand-lacquered midnight wooden box lined with French micro-velvet to protect prongs and luster.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-850/80 border border-white/5 space-y-3">
              <Sparkles className="w-6 h-6 text-gold-400" />
              <h4 className="text-xs font-sans uppercase tracking-widest text-alabaster-100 font-medium">24k Gold Wax Seal</h4>
              <p className="text-[11px] text-alabaster-400 font-light leading-relaxed">
                Individually sealed with the Bhagvatam family crest guaranteeing the box was untouched since inspection.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-850/80 border border-white/5 space-y-3">
              <Shield className="w-6 h-6 text-gold-400" />
              <h4 className="text-xs font-sans uppercase tracking-widest text-alabaster-100 font-medium">GIA Dossier Folder</h4>
              <p className="text-[11px] text-alabaster-400 font-light leading-relaxed">
                Embossed linen dossier holding your laboratory certificate, lifetime warranty, and valuation insurance card.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-850/80 border border-white/5 space-y-3">
              <Lock className="w-6 h-6 text-gold-400" />
              <h4 className="text-xs font-sans uppercase tracking-widest text-alabaster-100 font-medium">Discreet Insured Courier</h4>
              <p className="text-[11px] text-alabaster-400 font-light leading-relaxed">
                Shipped via armored expedited transit with adult signature confirmation and zero external brand labeling.
              </p>
            </div>
          </div>
        </div>

        {/* Collector Reviews */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold-300 mb-2">
              Privileged Patronage
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif text-alabaster-50">
              Words From Our Collectors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="vault-glass p-8 rounded-2xl border border-gold-400/15 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-gold-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-serif italic text-alabaster-200 leading-relaxed mb-6">
                    “{t.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-sans font-medium text-alabaster-100">{t.author}</div>
                  <div className="text-[10px] text-gold-300/80 font-sans">{t.location}</div>
                  <div className="text-[9px] text-alabaster-400/60 font-sans uppercase tracking-wider mt-1">Acquired: {t.verifiedPiece}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
