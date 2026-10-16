import React from 'react';
import { Sparkles, Truck, ShieldCheck, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 lg:py-14 bg-[#F7F2E9] border-b border-[#E8DFD5]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Hero: High conversion with lifestyle visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative & CTA */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Curated Capsule Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D8C4A3] bg-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#A9824B]" />
              <span className="text-[11px] font-sans tracking-widest uppercase text-[#383532] font-semibold">
                Festive & Wedding Edit &bull; Direct-To-Consumer Value
              </span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#252321] tracking-tight leading-[1.12]">
              Royal Festive Jewellery That Looks Precious,{' '}
              <span className="italic font-normal text-[#8F6C3A] block sm:inline">
                Priced for Every Celebration.
              </span>
            </h1>

            {/* Narrative Subtitle */}
            <p className="max-w-xl text-sm sm:text-base text-[#4D4945] font-light leading-relaxed">
              Thoughtfully curated Kundan chokers, temple jhumkas, oxidised silver, and waterproof anti-tarnish daily wear. 
              Authentic bridal and contemporary finish starting at just <span className="text-[#252321] font-bold">₹299</span>.
            </p>

            {/* Action Button: Single Primary Shopping CTA */}
            <div className="pt-2">
              <a
                href="#collections"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#252321] hover:bg-[#383532] text-[#F7F2E9] font-sans font-semibold text-xs tracking-wider uppercase shadow-md transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B]"
              >
                <span>Shop Festive Collection (From ₹299)</span>
                <ArrowRight className="w-4 h-4 text-[#D8C4A3]" />
              </a>
            </div>

            {/* Genuine Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E8DFD5]">
              <div className="flex items-center gap-2 text-xs font-sans text-[#4D4945]">
                <Truck className="w-4 h-4 text-[#A9824B] shrink-0" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans text-[#4D4945]">
                <ShieldCheck className="w-4 h-4 text-[#A9824B] shrink-0" />
                <span>Anti-Tarnish Polish</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans text-[#4D4945]">
                <RefreshCw className="w-4 h-4 text-[#A9824B] shrink-0" />
                <span>7-Day Replacement</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans text-[#4D4945]">
                <CheckCircle2 className="w-4 h-4 text-[#A9824B] shrink-0" />
                <span>Quality Inspected</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Lifestyle Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2D6C5] shadow-lg bg-white p-2">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#EFE8DC]">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                  alt="Model wearing Bhagvatam Royal Rajasthani Kundan Choker Set"
                  width="600"
                  height="750"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  decoding="sync"
                  fetchpriority="high"
                />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E8DFD5] shadow-md flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-sans tracking-wider text-[#8F6C3A] font-bold">
                      Festive Spotlight
                    </div>
                    <div className="text-xs font-serif font-medium text-[#252321] line-clamp-1">
                      Royal Rajasthani Kundan Choker
                    </div>
                  </div>
                  <span className="text-sm font-bold font-sans text-[#A9824B]">
                    ₹899
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
