import React, { useEffect } from 'react';
import { X, RotateCcw, Check, SlidersHorizontal, Sparkles } from 'lucide-react';
import { OUTFIT_COLORS } from '../data/jewelry';

export const OCCASIONS = [
  'All',
  'Bridal & Wedding',
  'Festive & Sangeet',
  'Daily & Office',
  'Party & Cocktail'
];

export const PRICE_RANGES = [
  { id: 'All', label: 'All Prices' },
  { id: 'under499', label: 'Under ₹499', max: 499 },
  { id: '500to999', label: '₹500 – ₹999', min: 500, max: 999 },
  { id: '1000to1999', label: '₹1,000 – ₹1,999', min: 1000, max: 1999 },
  { id: 'above2000', label: '₹2,000 & Above', min: 2000 }
];

export const CATEGORIES_FILTER = [
  { id: 'All', label: 'All Jewellery' },
  { id: 'Necklaces', label: 'Necklaces & Chokers' },
  { id: 'Earrings', label: 'Earrings & Jhumkas' },
  { id: 'Bangles & Kadas', label: 'Bangles & Bracelets' },
  { id: 'Rings & Accessories', label: 'Rings & Accessories' }
];

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedSubType,
  setSelectedSubType,
  selectedOutfit,
  setSelectedOutfit,
  selectedOccasion,
  setSelectedOccasion,
  priceFilter,
  setPriceFilter,
  inStockOnly,
  setInStockOnly,
  totalMatching,
  onResetFilters
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSubType !== 'All' ||
    selectedOutfit !== 'All' ||
    selectedOccasion !== 'All' ||
    priceFilter !== 'All' ||
    inStockOnly;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E8DFD5] shadow-2xl flex flex-col justify-between text-[#252321]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8DFD5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#A9824B]" />
              <h3 id="filter-drawer-title" className="text-base font-serif text-[#252321] font-medium tracking-wide">
                Filter Jewellery
              </h3>
              <span className="text-xs font-sans text-[#68625D]">
                ({totalMatching} pieces)
              </span>
            </div>

            <div className="flex items-center gap-1">
              {hasActiveFilters && (
                <button
                  onClick={onResetFilters}
                  className="min-h-[44px] px-3 py-2 text-xs font-sans text-[#8F6C3A] hover:text-[#252321] flex items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B] rounded-lg"
                  aria-label="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#68625D] hover:text-[#252321] hover:bg-[#FAF7F2] transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                aria-label="Close filters drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* 1. Jewellery Category */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#8F6C3A] block mb-2.5">
                1. Jewellery Type
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES_FILTER.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedSubType('All');
                      }}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-sans transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                        isSelected
                          ? 'bg-[#252321] text-white font-semibold shadow-xs'
                          : 'bg-white border border-[#E8DFD5] text-[#57534E] hover:text-[#252321] hover:border-[#D8C4A3]'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Budget / Price Range */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#8F6C3A] block mb-2.5">
                2. Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRICE_RANGES.map((range) => {
                  const isSelected = priceFilter === range.id;
                  return (
                    <button
                      key={range.id}
                      onClick={() => setPriceFilter(range.id)}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-sans text-left transition-all flex items-center justify-between focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                        isSelected
                          ? 'bg-[#252321] text-white font-semibold shadow-xs'
                          : 'bg-white border border-[#E8DFD5] text-[#57534E] hover:text-[#252321] hover:border-[#D8C4A3]'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span>{range.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Outfit Color Match */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#8F6C3A] block mb-2.5">
                3. Outfit / Dress Color
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {OUTFIT_COLORS.map((col) => {
                  const isSelected = selectedOutfit === col.id;
                  return (
                    <button
                      key={col.id}
                      onClick={() => setSelectedOutfit(col.id)}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-sans flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                        isSelected
                          ? 'bg-[#252321] text-white font-semibold shadow-xs'
                          : 'bg-white border border-[#E8DFD5] text-[#57534E] hover:text-[#252321] hover:border-[#D8C4A3]'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: col.hex }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{col.label.replace(/^[^\s]+\s*/, '')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Occasion */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#8F6C3A] block mb-2.5">
                4. Occasion
              </label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => {
                  const isSelected = selectedOccasion === occ;
                  return (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-sans transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                        isSelected
                          ? 'bg-[#252321] text-white font-semibold shadow-xs'
                          : 'bg-white border border-[#E8DFD5] text-[#57534E] hover:text-[#252321] hover:border-[#D8C4A3]'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {occ === 'All' ? 'All Occasions' : occ}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Confirmed Availability */}
            <div className="pt-2 border-t border-[#E8DFD5]">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#8F6C3A] block mb-2.5">
                5. Availability
              </label>
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border flex items-center justify-between text-xs font-sans transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                  inStockOnly
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                    : 'border-[#E8DFD5] bg-white text-[#57534E] hover:border-[#D8C4A3]'
                }`}
                aria-pressed={inStockOnly}
              >
                <div className="flex flex-col text-left">
                  <span>Listed as In Stock</span>
                  <span className="text-[10px] text-[#78716C] font-normal">
                    Supplier availability verified manually upon enquiry
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border ${
                    inStockOnly
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-[#D8C4A3] bg-white'
                  }`}
                >
                  {inStockOnly && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            </div>

          </div>

          {/* Sticky Footer */}
          <div className="p-4 sm:p-5 border-t border-[#E8DFD5] bg-white flex items-center gap-3 shadow-md">
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="min-h-[48px] px-4 py-3 rounded-full border border-[#E8DFD5] bg-[#FAF7F2] text-[#57534E] hover:text-[#252321] hover:bg-[#EFE8DC] text-xs font-sans uppercase tracking-wider font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B]"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 min-h-[48px] py-3.5 px-6 rounded-full bg-[#252321] text-white font-sans font-bold text-xs tracking-wider uppercase hover:bg-[#3D3A37] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md focus-visible:ring-2 focus-visible:ring-[#A9824B]"
            >
              <span>View {totalMatching} Pieces</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
