import React from 'react';
import { DISCOVERY_CATEGORIES, OUTFIT_COLORS } from '../data/jewelry';
import { Sparkles, Palette, Filter, Check, X, Eye, Flame } from 'lucide-react';

export default function SmartDiscoveryBar({
  selectedCategory,
  setSelectedCategory,
  selectedSubType,
  setSelectedSubType,
  selectedOutfit,
  setSelectedOutfit,
  priceFilter,
  setPriceFilter,
  inStockOnly,
  setInStockOnly,
  matchingCount,
  onResetFilters
}) {
  const currentCategoryObj = DISCOVERY_CATEGORIES.find(c => c.id === selectedCategory) || DISCOVERY_CATEGORIES[0];
  const hasActiveFilters = selectedCategory !== 'All' || selectedSubType !== 'All' || selectedOutfit !== 'All' || priceFilter !== 'All' || inStockOnly;

  return (
    <div className="bg-white rounded-2xl border border-[#E8DFD5] p-5 sm:p-7 mb-8 shadow-sm relative overflow-hidden">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DFD5] mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#A9824B]" />
          <h3 className="text-sm sm:text-base font-serif text-[#252321] font-medium tracking-wide">
            Smart Discovery & Outfit Match
          </h3>
          <span className="text-[10px] bg-[#EFE8DC] border border-[#D8C4A3] text-[#8F6C3A] px-2.5 py-0.5 rounded-full font-sans font-medium">
            Curated Styles
          </span>
        </div>

        {/* Counter & Clear Button */}
        <div className="flex items-center gap-3 text-xs font-sans">
          <span className="text-[#68625D]">
            Showing <strong className="text-[#252321] font-bold">{matchingCount}</strong> curated pieces
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="min-h-[40px] px-3.5 py-1.5 text-xs text-red-700 hover:text-red-900 flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-red-400"
              aria-label="Reset all styling filters"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* DIMENSION 1: Primary Category & Sub-Type Pills */}
      <div className="space-y-3 mb-6">
        <div className="text-[11px] uppercase tracking-wider text-[#8F6C3A] font-sans font-bold flex items-center gap-1.5">
          <span>1. Shop by Jewellery Type:</span>
        </div>

        {/* Level 1: Main Category Buttons - Min 44px Height */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {DISCOVERY_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubType('All');
                }}
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans tracking-wide transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                  isActive
                    ? 'bg-[#252321] text-white font-semibold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#E8DFD5] text-[#4D4945] hover:text-[#252321] hover:border-[#D8C4A3]'
                }`}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Level 2: Sub-Type Pills (Drill-down) */}
        {currentCategoryObj.subTypes.length > 1 && (
          <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1 text-xs font-sans">
            <span className="text-[11px] text-[#8A837C] uppercase tracking-widest shrink-0 font-medium">
              Sub-types:
            </span>
            <div className="flex gap-2 shrink-0">
              {currentCategoryObj.subTypes.map((sub, idx) => {
                const subValue = idx === 0 ? 'All' : sub;
                const isSubActive = selectedSubType === subValue;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubType(subValue)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                      isSubActive
                        ? 'bg-[#A9824B]/15 border border-[#A9824B] text-[#8F6C3A] font-bold'
                        : 'bg-[#FAF7F2] border border-[#E8DFD5] text-[#68625D] hover:text-[#252321]'
                    }`}
                    aria-pressed={isSubActive}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* DIMENSION 2: Outfit / Dress Color Match Palette */}
      <div className="space-y-2.5 mb-6 pt-4 border-t border-[#E8DFD5]">
        <div className="flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-wider text-[#8F6C3A] font-sans font-bold flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#A9824B]" />
            <span>2. Match with Your Outfit / Dress Color:</span>
          </div>
          <span className="text-[11px] text-[#8A837C] font-light hidden sm:inline">
            Filters pieces styled on models with this dress color
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {OUTFIT_COLORS.map((color) => {
            const isColorActive = selectedOutfit === color.id;
            return (
              <button
                key={color.id}
                onClick={() => setSelectedOutfit(color.id)}
                className={`min-h-[48px] p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                  isColorActive
                    ? 'border-[#A9824B] bg-[#A9824B]/10 shadow-sm ring-1 ring-[#A9824B]'
                    : 'border-[#E8DFD5] bg-[#FAF7F2] hover:border-[#D8C4A3]'
                }`}
                aria-pressed={isColorActive}
              >
                <span
                  className="w-4 h-4 rounded-full shrink-0 shadow-inner border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="min-w-0">
                  <div className={`text-xs font-sans truncate ${isColorActive ? 'font-bold text-[#252321]' : 'text-[#383532]'}`}>
                    {color.label}
                  </div>
                  {color.desc && (
                    <div className="text-[10px] text-[#8A837C] truncate">{color.desc}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DIMENSION 3: Quick Budget & Stock Availability */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8DFD5] text-xs font-sans">
        
        {/* Quick Price Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#8A837C] font-medium">Budget:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'All', label: 'All Prices' },
              { id: 'under499', label: 'Under ₹499' },
              { id: '500to999', label: '₹500 – ₹999' },
              { id: 'above1000', label: '₹1000+' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceFilter(p.id)}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                  priceFilter === p.id
                    ? 'bg-[#252321] text-white font-medium'
                    : 'bg-[#FAF7F2] border border-[#E8DFD5] text-[#4D4945] hover:text-[#252321]'
                }`}
                aria-pressed={priceFilter === p.id}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Out of Stock Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#8A837C] font-medium">
            Out of Stock:
          </span>
          <div className="inline-flex rounded-xl bg-[#FAF7F2] p-1 border border-[#E8DFD5]">
            <button
              onClick={() => setInStockOnly(false)}
              className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-sans transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                !inStockOnly ? 'bg-[#252321] text-white font-medium shadow-sm' : 'text-[#68625D] hover:text-[#252321]'
              }`}
            >
              Show
            </button>
            <button
              onClick={() => setInStockOnly(true)}
              className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-sans transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                inStockOnly ? 'bg-[#252321] text-white font-medium shadow-sm' : 'text-[#68625D] hover:text-[#252321]'
              }`}
            >
              Hide
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
