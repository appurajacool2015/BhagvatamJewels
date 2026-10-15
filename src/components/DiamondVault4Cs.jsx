import React, { useState } from 'react';
import { FOUR_CS_DATA } from '../data/jewelry';
import { ShieldCheck, Award, Sparkles, CheckCircle2, QrCode, FileText, ChevronRight } from 'lucide-react';

export default function DiamondVault4Cs() {
  const [activeTab, setActiveTab] = useState(FOUR_CS_DATA[0].id);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const currentC = FOUR_CS_DATA.find(c => c.id === activeTab) || FOUR_CS_DATA[0];

  return (
    <section id="vault" className="py-24 sm:py-32 relative bg-obsidian-950 border-t border-gold-400/15 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-obsidian-900/80 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-300" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-gold-300">
              The Science of Gemology
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-alabaster-50 tracking-tight mb-4">
            The 4Cs Diamond Master Vault
          </h2>
          <p className="text-alabaster-300 text-sm sm:text-base font-light leading-relaxed">
            Understanding why Bhagvatam diamonds belong to the elite top 1% globally. 
            Absolute transparency, optical perfection, and double laboratory certification.
          </p>
        </div>

        {/* 4Cs Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-obsidian-900 border border-gold-400/25 shadow-xl">
            {FOUR_CS_DATA.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-sans tracking-widest uppercase transition-all duration-300 ${
                  activeTab === c.id
                    ? 'bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-obsidian-950 font-bold shadow-gold-sm'
                    : 'text-alabaster-300 hover:text-gold-200'
                }`}
              >
                {c.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic 4C Display Stage */}
        <div className="vault-glass-elevated rounded-2xl p-8 sm:p-12 border border-gold-400/25 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 rounded text-[11px] font-sans tracking-widest uppercase bg-gold-400/10 border border-gold-400/30 text-gold-300">
                {currentC.tag}
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif text-alabaster-50">
                {currentC.title}
              </h3>

              <div className="text-lg font-serif italic text-gold-200">
                Bhagvatam Benchmark: {currentC.highlight}
              </div>

              <p className="text-sm font-sans text-alabaster-200 font-light leading-relaxed">
                {currentC.summary}
              </p>

              <p className="text-xs font-sans text-alabaster-400 font-light leading-relaxed bg-obsidian-900/60 p-4 rounded-xl border border-white/5">
                {currentC.details}
              </p>

              {/* Quality Tier Visualizer */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-alabaster-400 block mb-2 font-sans">
                  Industry Grading Scale vs. Bhagvatam Selection
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {currentC.scale.map((tier, idx) => {
                    const isBhagvatamTier = idx === currentC.scale.length - 1;
                    return (
                      <div
                        key={tier}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          isBhagvatamTier
                            ? 'bg-gold-400/20 border-gold-400 text-gold-200 font-medium shadow-gold-sm'
                            : 'bg-obsidian-850/60 border-white/5 text-alabaster-400/70 text-[11px]'
                        }`}
                      >
                        <span className="text-xs block truncate">{tier}</span>
                        {isBhagvatamTier && (
                          <span className="text-[9px] uppercase tracking-wider text-gold-400 block mt-1">Our Standard</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Certificate Verification Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full bg-obsidian-900 rounded-xl p-6 border border-gold-400/30 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-400" />
                    <div>
                      <h4 className="text-xs font-sans uppercase tracking-widest text-alabaster-100 font-medium">Authenticity Dossier</h4>
                      <span className="text-[10px] text-alabaster-400">GIA & IGI Verified</span>
                    </div>
                  </div>
                  <QrCode className="w-6 h-6 text-gold-300" />
                </div>

                <div className="space-y-2.5 text-xs font-mono text-alabaster-300 mb-6 bg-obsidian-950 p-4 rounded-lg border border-white/5">
                  <div className="flex justify-between">
                    <span className="text-alabaster-500">Report No:</span>
                    <span className="text-gold-300">GIA-248910482</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-alabaster-500">Inscription:</span>
                    <span>BHAGVATAM-7729</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-alabaster-500">Cut / Polish:</span>
                    <span className="text-emerald-400">Ideal / Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-alabaster-500">Fluorescence:</span>
                    <span>None (Pure Clarity)</span>
                  </div>
                </div>

                <button
                  onClick={() => setCertModalOpen(true)}
                  className="w-full py-3 rounded-lg border border-gold-400/40 text-gold-300 hover:bg-gold-400/10 text-xs tracking-widest uppercase font-sans flex items-center justify-center gap-2 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inspect Digital Certificate</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Certificate Detailed Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-xl">
          <div className="relative w-full max-w-xl bg-obsidian-900 border border-gold-400/40 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-gold-400/20 mb-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-gold-400" />
                <h3 className="text-lg font-serif text-alabaster-50">Gemological Dossier Verification</h3>
              </div>
              <button
                onClick={() => setCertModalOpen(false)}
                className="text-alabaster-400 hover:text-gold-300 text-sm font-sans"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans text-alabaster-200">
              <p className="leading-relaxed">
                Every stone selected by Bhagvatam is laser-inscribed with a microscopic serial number along the girdle visible under 10x magnification.
              </p>
              
              <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-400/20 space-y-2 font-mono">
                <div className="flex justify-between text-gold-300 font-bold">
                  <span>SPECIFICATION</span>
                  <span>VERIFIED RECORD</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-1">
                  <span>Optical Symmetry</span>
                  <span>Hearts & Arrows (8-Point)</span>
                </div>
                <div className="flex justify-between">
                  <span>Laser Inscription</span>
                  <span>GIA • 248910482</span>
                </div>
                <div className="flex justify-between">
                  <span>Conflict-Free Kimberly Accord</span>
                  <span className="text-emerald-400">100% Compliant</span>
                </div>
                <div className="flex justify-between">
                  <span>Atelier Hallmark</span>
                  <span>Bhagvatam Royal Seal (AU 750)</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setCertModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-gold-400 text-obsidian-950 text-xs font-sans tracking-widest uppercase font-semibold"
                >
                  Acknowledge & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
