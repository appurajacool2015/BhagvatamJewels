import React, { useState, useEffect, useRef } from 'react';
import { HERO_BANNER_SLIDES } from '../data/jewelry';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function Hero({ onSelectCategory }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);

  const totalSlides = HERO_BANNER_SLIDES.length;

  // Auto-rotation every 4.5 seconds (pauses on hover or touch)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (diffX > 45) {
      handleNext();
    } else if (diffX < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  const activeSlide = HERO_BANNER_SLIDES[currentSlideIndex];

  const handleSlideClick = () => {
    if (onSelectCategory && activeSlide?.targetCategory) {
      onSelectCategory(activeSlide.targetCategory);
    }
  };

  return (
    <section
      className="relative bg-[#F7F2E9] border-b border-[#E8DFD5] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Main Rotating Banner Frame */}
      <div
        className="relative w-full max-w-4xl mx-auto cursor-pointer overflow-hidden group"
        onClick={handleSlideClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Featured Collection Carousel"
      >
        {/* Aspect Ratio Container (Portrait / High-Fashion 4:5 on mobile, 16:9 on desktop) */}
        <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden bg-[#EFE8DC]">
          {HERO_BANNER_SLIDES.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-top"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* In-Image Tag / Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-[#E8DFD5] shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#A9824B]" />
                  <span className="text-[10px] sm:text-xs font-sans uppercase font-bold tracking-wider text-[#252321]">
                    {slide.badge}
                  </span>
                </div>

                {/* In-Image Caption on Desktop/Tablet */}
                <div className="absolute bottom-5 left-5 right-5 z-20 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#D8C4A3] font-semibold block">
                      Tap To View Collection
                    </span>
                    <h2 className="text-xl sm:text-3xl font-serif font-medium text-white drop-shadow-sm">
                      {slide.title}
                    </h2>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#252321] text-xs font-sans font-bold shadow-md hover:bg-[#FAF7F2] transition-colors">
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A9824B]" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows (Visible on hover/tablet) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#252321] items-center justify-center shadow-md backdrop-blur-xs transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-[#A9824B]"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#252321] items-center justify-center shadow-md backdrop-blur-xs transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-[#A9824B]"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 z-30 flex justify-center items-center gap-1.5">
            {HERO_BANNER_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIndex(idx);
                }}
                className={`transition-all rounded-full ${
                  idx === currentSlideIndex
                    ? 'w-6 h-1.5 bg-white shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/90'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Bold Text Banner Strip (Exact Match to Sample PRAO Screen 1) */}
      <div
        onClick={handleSlideClick}
        className="max-w-4xl mx-auto px-4 py-4 sm:py-5 text-center cursor-pointer hover:bg-[#F2ECE0] transition-colors"
      >
        <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#252321] tracking-tight flex items-center justify-center gap-1.5">
          <span>{activeSlide?.tagline || 'Everything For Just ₹299 - ₹899'}</span>
        </h2>
        <p className="text-xs sm:text-sm font-sans font-medium text-[#78716C] mt-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#A9824B]" />
          <span>Top Quality Anti-Tarnish Jewellery ✨ Direct-To-Consumer Value</span>
        </p>
      </div>

      {/* Quick Category Shortcut Pills */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {HERO_BANNER_SLIDES.map((slide) => {
            const isCurrent = slide.targetCategory === activeSlide.targetCategory;
            return (
              <button
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCategory(slide.targetCategory);
                }}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#252321] text-white font-semibold shadow-xs'
                    : 'bg-white border border-[#E8DFD5] text-[#57534E] hover:text-[#252321]'
                }`}
              >
                <span>{slide.targetCategory}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
