import React, { useState } from 'react';
import { CONFIGURATOR_DATA } from '../data/jewelry';
import { Sparkles, ShieldCheck, Ruler, Eye, Check, RefreshCw, Lock, Award, Heart } from 'lucide-react';

export default function RingConfigurator({ onAddToCart, currency, onOpenConcierge }) {
  const [selectedMetal, setSelectedMetal] = useState(CONFIGURATOR_DATA.metals[0]);
  const [selectedShape, setSelectedShape] = useState(CONFIGURATOR_DATA.shapes[0]);
  const [selectedCarat, setSelectedCarat] = useState(CONFIGURATOR_DATA.carats[1]); // 1.50ct default
  const [selectedBand, setSelectedBand] = useState(CONFIGURATOR_DATA.bands[0]);
  const [viewAngle, setViewAngle] = useState('overhead'); // 'overhead' | 'profile'
  const [isSparkling, setIsSparkling] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [ringSize, setRingSize] = useState('6.0');

  // Calculate dynamic price
  const basePrice = selectedCarat.basePrice;
  const metalMultiplier = selectedMetal.priceMultiplier;
  const bandAdd = selectedBand.priceAdd;
  const totalPriceUSD = Math.round((basePrice * metalMultiplier) + bandAdd);
  const convertedPrice = Math.round(totalPriceUSD * currency.rate);

  const handleSparkle = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 2000);
  };

  const handleAddCustomToBag = () => {
    const customItem = {
      id: `bespoke-${Date.now()}`,
      title: `Bespoke ${selectedCarat.label} ${selectedShape.name} Ring`,
      collection: 'Bespoke Studio Commission',
      price: totalPriceUSD,
      metal: selectedMetal.name,
      carat: selectedCarat.label,
      diamondCut: selectedShape.name,
      band: selectedBand.name,
      ringSize: ringSize,
      engraving: engravingText || 'None',
      badge: 'Bespoke Atelier Creation',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      isCustom: true
    };
    onAddToCart(customItem);
  };

  // Dynamic visual sizing scale for diamond
  const diamondScale = 0.85 + (selectedCarat.weight - 1.0) * 0.18;

  return (
    <section id="configurator" className="py-20 sm:py-28 relative overflow-hidden bg-obsidian-950">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedMetal.glowColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/30 bg-obsidian-900/80 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-gold-300">
              The Bespoke Commission Studio
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-alabaster-50 tracking-tight mb-4">
            Craft Your Generational Solitaire
          </h2>
          <p className="text-alabaster-300 text-sm sm:text-base font-light leading-relaxed">
            Select your metal alloy, diamond architecture, and carat proportion in real time. 
            Each commission is handcrafted by master goldsmiths and certified by the GIA & IGI.
          </p>
        </div>

        {/* Configurator Workspace (Two Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Live Jewelry Interactive Visualizer */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full relative aspect-square max-w-[540px] rounded-2xl vault-glass-elevated p-8 sm:p-12 flex flex-col items-center justify-center overflow-hidden border border-gold-400/25">
              
              {/* Subtle radial spotlight */}
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${selectedMetal.glowColor} 0%, transparent 65%)`
                }}
              />

              {/* View Angle Switcher */}
              <div className="absolute top-6 left-6 z-20 flex items-center bg-obsidian-900/90 border border-gold-400/20 rounded-full p-1 text-[11px] tracking-wider uppercase font-sans">
                <button
                  onClick={() => setViewAngle('overhead')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    viewAngle === 'overhead' ? 'bg-gold-400/20 text-gold-300 font-medium' : 'text-alabaster-400 hover:text-alabaster-100'
                  }`}
                >
                  Overhead
                </button>
                <button
                  onClick={() => setViewAngle('profile')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    viewAngle === 'profile' ? 'bg-gold-400/20 text-gold-300 font-medium' : 'text-alabaster-400 hover:text-alabaster-100'
                  }`}
                >
                  Side Profile
                </button>
              </div>

              {/* Sparkle Simulation Button */}
              <button
                onClick={handleSparkle}
                className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900/90 border border-gold-400/30 text-gold-300 hover:bg-gold-400/20 text-[11px] tracking-widest uppercase transition-all shadow-gold-sm"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isSparkling ? 'animate-spin text-gold-200' : ''}`} />
                <span>Simulate Light</span>
              </button>

              {/* Visual Ring Render Stage (Procedural SVG Diamond & Metal) */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center transition-all duration-500">
                
                {/* Overhead Ring Visualizer */}
                {viewAngle === 'overhead' ? (
                  <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        {selectedMetal.id === 'yellow-gold' && (
                          <>
                            <stop offset="0%" stopColor="#FFF2BF" />
                            <stop offset="40%" stopColor="#D4AF37" />
                            <stop offset="70%" stopColor="#B38918" />
                            <stop offset="100%" stopColor="#8A680C" />
                          </>
                        )}
                        {selectedMetal.id === 'rose-gold' && (
                          <>
                            <stop offset="0%" stopColor="#FFD1C4" />
                            <stop offset="40%" stopColor="#E29578" />
                            <stop offset="70%" stopColor="#BA664A" />
                            <stop offset="100%" stopColor="#8A4027" />
                          </>
                        )}
                        {selectedMetal.id === 'platinum' && (
                          <>
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="40%" stopColor="#E5E7EB" />
                            <stop offset="70%" stopColor="#9CA3AF" />
                            <stop offset="100%" stopColor="#4B5563" />
                          </>
                        )}
                        {selectedMetal.id === 'white-gold' && (
                          <>
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="40%" stopColor="#E2E8F0" />
                            <stop offset="70%" stopColor="#94A3B8" />
                            <stop offset="100%" stopColor="#475569" />
                          </>
                        )}
                      </linearGradient>

                      {/* Diamond Facet Gradient */}
                      <radialGradient id="diamondShimmer" cx="45%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="25%" stopColor="#F0F8FF" />
                        <stop offset="60%" stopColor="#E0F2FE" />
                        <stop offset="85%" stopColor="#BAE6FD" />
                        <stop offset="100%" stopColor="#7DD3FC" />
                      </radialGradient>

                      <radialGradient id="sparkleCore" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                        <stop offset="60%" stopColor="rgba(244, 229, 189, 0.4)" />
                        <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
                      </radialGradient>
                    </defs>

                    {/* Outer Ring Band (Torus) */}
                    <circle 
                      cx="150" 
                      cy="150" 
                      r="105" 
                      fill="none" 
                      stroke="url(#metalGrad)" 
                      strokeWidth="14" 
                      className="transition-colors duration-500"
                    />

                    {/* Band Highlights for 3D Tubular Depth */}
                    <circle 
                      cx="150" 
                      cy="150" 
                      r="109" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.4)" 
                      strokeWidth="1.5" 
                    />
                    <circle 
                      cx="150" 
                      cy="150" 
                      r="101" 
                      fill="none" 
                      stroke="rgba(0,0,0,0.5)" 
                      strokeWidth="1.5" 
                    />

                    {/* Pavé Diamond Band Effect if selected */}
                    {selectedBand.id === 'french-pave' && (
                      <g className="animate-pulse">
                        {[40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260].map((angle, i) => {
                          const rad = (angle * Math.PI) / 180;
                          const px = 150 + 105 * Math.cos(rad);
                          const py = 150 + 105 * Math.sin(rad);
                          return (
                            <circle key={i} cx={px} cy={py} r="2.8" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.5" />
                          );
                        })}
                      </g>
                    )}

                    {/* Center Basket Prongs (4 Prongs) */}
                    <g transform={`translate(150, 150) scale(${diamondScale}) translate(-150, -150)`}>
                      <circle cx="120" cy="120" r="6" fill="url(#metalGrad)" stroke="#111" strokeWidth="1" />
                      <circle cx="180" cy="120" r="6" fill="url(#metalGrad)" stroke="#111" strokeWidth="1" />
                      <circle cx="120" cy="180" r="6" fill="url(#metalGrad)" stroke="#111" strokeWidth="1" />
                      <circle cx="180" cy="180" r="6" fill="url(#metalGrad)" stroke="#111" strokeWidth="1" />

                      {/* Diamond Shape Rendering */}
                      {selectedShape.id === 'round' && (
                        <g>
                          <circle cx="150" cy="150" r="42" fill="url(#diamondShimmer)" stroke="#FFFFFF" strokeWidth="1.5" />
                          {/* Facet Geometry */}
                          <polygon points="150,112 176,128 176,172 150,188 124,172 124,128" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
                          <polygon points="150,128 165,138 165,162 150,172 135,162 135,138" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
                          {/* Radiating facet lines */}
                          <line x1="150" y1="108" x2="150" y2="128" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                          <line x1="192" y1="150" x2="165" y2="150" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                          <line x1="150" y1="192" x2="150" y2="172" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                          <line x1="108" y1="150" x2="135" y2="150" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                        </g>
                      )}

                      {selectedShape.id === 'emerald' && (
                        <g>
                          <rect x="118" y="105" width="64" height="90" rx="6" fill="url(#diamondShimmer)" stroke="#FFFFFF" strokeWidth="1.5" />
                          <rect x="126" y="115" width="48" height="70" rx="4" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
                          <rect x="134" y="125" width="32" height="50" rx="2" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
                          <line x1="118" y1="105" x2="134" y2="125" stroke="rgba(255,255,255,0.6)" />
                          <line x1="182" y1="105" x2="166" y2="125" stroke="rgba(255,255,255,0.6)" />
                          <line x1="118" y1="195" x2="134" y2="175" stroke="rgba(255,255,255,0.6)" />
                          <line x1="182" y1="195" x2="166" y2="175" stroke="rgba(255,255,255,0.6)" />
                        </g>
                      )}

                      {selectedShape.id === 'oval' && (
                        <g>
                          <ellipse cx="150" cy="150" rx="36" ry="52" fill="url(#diamondShimmer)" stroke="#FFFFFF" strokeWidth="1.5" />
                          <ellipse cx="150" cy="150" rx="24" ry="36" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                          <line x1="150" y1="98" x2="150" y2="114" stroke="rgba(255,255,255,0.6)" />
                          <line x1="150" y1="202" x2="150" y2="186" stroke="rgba(255,255,255,0.6)" />
                          <line x1="114" y1="150" x2="126" y2="150" stroke="rgba(255,255,255,0.6)" />
                          <line x1="186" y1="150" x2="174" y2="150" stroke="rgba(255,255,255,0.6)" />
                        </g>
                      )}

                      {selectedShape.id === 'cushion' && (
                        <g>
                          <rect x="115" y="115" width="70" height="70" rx="20" fill="url(#diamondShimmer)" stroke="#FFFFFF" strokeWidth="1.5" />
                          <rect x="127" y="127" width="46" height="46" rx="12" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                          <circle cx="150" cy="150" r="14" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.7)" />
                        </g>
                      )}

                      {/* Sparkle Glint Flares when activated */}
                      {isSparkling && (
                        <g className="animate-spin" style={{ transformOrigin: '150px 150px', animationDuration: '4s' }}>
                          <polygon points="150,70 153,145 220,150 153,155 150,230 147,155 80,150 147,145" fill="url(#sparkleCore)" opacity="0.9" />
                          <polygon points="150,100 152,148 190,150 152,152 150,200 148,152 110,150 148,148" fill="#FFFFFF" opacity="0.75" />
                        </g>
                      )}
                    </g>
                  </svg>
                ) : (
                  /* Profile View Rendering */
                  <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
                    <circle cx="150" cy="190" r="80" fill="none" stroke="url(#metalGrad)" strokeWidth="14" />
                    {/* Cathedral Arch Basket */}
                    <path d="M 120 120 Q 150 145 180 120 L 165 90 L 135 90 Z" fill="url(#metalGrad)" stroke="#111" strokeWidth="1" />
                    {/* Elevated Diamond in Profile */}
                    <g transform={`translate(150, 80) scale(${diamondScale}) translate(-150, -80)`}>
                      <polygon points="120,80 180,80 195,68 105,68" fill="url(#diamondShimmer)" stroke="#FFFFFF" strokeWidth="1.5" />
                      <polygon points="120,80 180,80 150,115" fill="url(#diamondShimmer)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" opacity="0.9" />
                      <line x1="120" y1="80" x2="150" y2="115" stroke="rgba(255,255,255,0.8)" />
                      <line x1="180" y1="80" x2="150" y2="115" stroke="rgba(255,255,255,0.8)" />
                    </g>
                  </svg>
                )}
              </div>

              {/* Bottom Specs Bar */}
              <div className="w-full mt-6 pt-4 border-t border-gold-400/20 flex items-center justify-between text-xs tracking-wider font-sans text-alabaster-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>Colorless Grade D / VVS1</span>
                </span>
                <span className="flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 text-gold-400" />
                  <span>{selectedCarat.mmDiameter} Table</span>
                </span>
                <span className="text-gold-300 font-medium">GIA Laser Inscribed</span>
              </div>
            </div>

            {/* Live Pricing & Delivery Guarantee Box */}
            <div className="w-full max-w-[540px] mt-6 vault-glass p-5 rounded-xl border border-gold-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-alabaster-400 block font-sans">
                  Total Atelier Commission Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-serif font-light text-alabaster-50">
                    {currency.symbol}{convertedPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-gold-300 font-sans tracking-wide">
                    {currency.code}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddCustomToBag}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-obsidian-950 font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:shadow-gold-glow hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Add Creation to Bag</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Bespoke Customization Controls */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Step 1: Metal Alloy */}
            <div className="vault-glass p-6 rounded-xl border border-gold-400/15">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-sans tracking-[0.2em] uppercase text-gold-300 flex items-center gap-2">
                  <span>1. Select Precious Metal</span>
                </label>
                <span className="text-xs text-alabaster-200 font-serif font-medium">{selectedMetal.shortName}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {CONFIGURATOR_DATA.metals.map((metal) => {
                  const isSelected = selectedMetal.id === metal.id;
                  return (
                    <button
                      key={metal.id}
                      onClick={() => setSelectedMetal(metal)}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-gold-400 bg-gold-400/10 shadow-gold-sm'
                          : 'border-white/10 bg-obsidian-850 hover:border-gold-400/40'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-white/20 shrink-0 shadow-inner"
                        style={{ background: metal.gradient }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-sans text-alabaster-100 truncate">{metal.shortName}</div>
                        <div className="text-[10px] text-alabaster-400 font-sans">{metal.code}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-alabaster-400 font-light leading-relaxed">
                {selectedMetal.description}
              </p>
            </div>

            {/* Step 2: Diamond Shape Architecture */}
            <div className="vault-glass p-6 rounded-xl border border-gold-400/15">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-sans tracking-[0.2em] uppercase text-gold-300">
                  2. Diamond Architecture
                </label>
                <span className="text-xs text-alabaster-200 font-serif font-medium">{selectedShape.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {CONFIGURATOR_DATA.shapes.map((shape) => {
                  const isSelected = selectedShape.id === shape.id;
                  return (
                    <button
                      key={shape.id}
                      onClick={() => setSelectedShape(shape)}
                      className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-gold-400 bg-gold-400/10 shadow-gold-sm'
                          : 'border-white/10 bg-obsidian-850 hover:border-gold-400/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-sans font-medium text-alabaster-100">{shape.name}</span>
                        <span className="text-xs text-gold-400 font-mono">{shape.symbol}</span>
                      </div>
                      <div className="text-[10px] text-alabaster-400 font-sans">{shape.facets} Cut Facets</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-alabaster-400 font-light">
                {selectedShape.description}
              </p>
            </div>

            {/* Step 3: Carat Weight */}
            <div className="vault-glass p-6 rounded-xl border border-gold-400/15">
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-sans tracking-[0.2em] uppercase text-gold-300">
                  3. Carat Proportion
                </label>
                <span className="text-xs text-gold-300 font-serif font-bold text-sm">
                  {selectedCarat.label} ({selectedCarat.mmDiameter})
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                {CONFIGURATOR_DATA.carats.map((c) => {
                  const isSelected = selectedCarat.weight === c.weight;
                  return (
                    <button
                      key={c.weight}
                      onClick={() => setSelectedCarat(c)}
                      className={`flex-1 py-2.5 px-2 rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'border-gold-400 bg-gold-400 text-obsidian-950 font-bold shadow-gold-sm'
                          : 'border-white/10 bg-obsidian-850 text-alabaster-300 hover:border-gold-400/40'
                      }`}
                    >
                      <div className="text-xs font-sans">{c.weight.toFixed(2)}</div>
                      <div className={`text-[9px] ${isSelected ? 'text-obsidian-900' : 'text-alabaster-400'}`}>ct</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Band Style & Custom Engraving */}
            <div className="vault-glass p-6 rounded-xl border border-gold-400/15 space-y-4">
              <div>
                <label className="text-xs font-sans tracking-[0.2em] uppercase text-gold-300 block mb-2">
                  4. Setting Band Architecture
                </label>
                <div className="space-y-2">
                  {CONFIGURATOR_DATA.bands.map((band) => (
                    <label
                      key={band.id}
                      onClick={() => setSelectedBand(band)}
                      className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedBand.id === band.id
                          ? 'border-gold-400 bg-gold-400/10'
                          : 'border-white/10 bg-obsidian-850 hover:border-gold-400/40'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-sans font-medium text-alabaster-100">{band.name}</div>
                        <div className="text-[10px] text-alabaster-400 font-light mt-0.5">{band.description}</div>
                      </div>
                      <span className="text-xs font-serif text-gold-300 shrink-0 ml-3">
                        {band.priceAdd === 0 ? 'Included' : `+${currency.symbol}${Math.round(band.priceAdd * currency.rate)}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Complimentary Laser Engraving & Ring Size */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-alabaster-300 font-sans block mb-1">
                    Ring Size (US)
                  </label>
                  <select
                    value={ringSize}
                    onChange={(e) => setRingSize(e.target.value)}
                    className="w-full bg-obsidian-850 border border-gold-400/20 rounded px-3 py-2 text-xs text-alabaster-100 focus:outline-none focus:border-gold-400"
                  >
                    {['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map(size => (
                      <option key={size} value={size}>US {size} (Standard)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-alabaster-300 font-sans block mb-1">
                    Free Custom Engraving
                  </label>
                  <input
                    type="text"
                    maxLength={24}
                    placeholder="e.g. Forever Yours"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    className="w-full bg-obsidian-850 border border-gold-400/20 rounded px-3 py-2 text-xs text-alabaster-100 focus:outline-none focus:border-gold-400 placeholder:text-alabaster-400/40"
                  />
                </div>
              </div>
            </div>

            {/* VIP Consultation Trigger */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-gold-400/20 bg-gradient-to-r from-obsidian-850 to-obsidian-800">
              <div>
                <h5 className="text-xs font-sans uppercase tracking-wider text-alabaster-100">Need Guidance from a Master Gemologist?</h5>
                <p className="text-[11px] text-alabaster-400 font-light">Complimentary 1-on-1 virtual design consultation</p>
              </div>
              <button
                onClick={onOpenConcierge}
                className="px-4 py-2 rounded-full border border-gold-400/40 text-gold-300 hover:bg-gold-400/10 text-xs tracking-wider uppercase font-sans shrink-0 ml-4 transition-all"
              >
                Book Session
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
