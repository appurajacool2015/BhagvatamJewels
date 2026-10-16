import React, { useState, useEffect } from 'react';
import SmartDiscoveryBar from './SmartDiscoveryBar';
import FilterDrawer from './FilterDrawer';
import { STORE_CONFIG, getWhatsAppEnquiryUrl } from '../data/config';
import {
  Sparkles,
  Heart,
  Eye,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Star,
  BellRing,
  Flame,
  SlidersHorizontal,
  X,
  MessageCircle
} from 'lucide-react';

export default function FeaturedCollections({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  selectedCategory,
  setSelectedCategory,
  searchQuery
}) {
  const [selectedSubType, setSelectedSubType] = useState('All');
  const [selectedOutfit, setSelectedOutfit] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [modalImageTab, setModalImageTab] = useState('model'); // 'model' | 'product'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && quickViewItem) {
        setQuickViewItem(null);
      }
    };
    if (quickViewItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [quickViewItem]);

  // Filter products across all 6 dimensions
  const filteredJewels = products.filter((jewel) => {
    // 1. Category
    if (selectedCategory !== 'All' && selectedCategory !== 'Under ₹499') {
      if (jewel.category !== selectedCategory) return false;
    }

    // 2. Sub-Type
    if (selectedSubType !== 'All') {
      if (jewel.subCategory !== selectedSubType) return false;
    }

    // 3. Outfit Color Match
    if (selectedOutfit !== 'All') {
      if (!jewel.outfitMatch || !jewel.outfitMatch.includes(selectedOutfit)) {
        return false;
      }
    }

    // 4. Occasion
    if (selectedOccasion !== 'All') {
      if (!jewel.occasion || !jewel.occasion.toLowerCase().includes(selectedOccasion.toLowerCase())) {
        return false;
      }
    }

    // 5. Price Filter
    if (selectedCategory === 'Under ₹499' || priceFilter === 'under499') {
      if (jewel.price > 499) return false;
    } else if (priceFilter === '500to999') {
      if (jewel.price < 500 || jewel.price > 999) return false;
    } else if (priceFilter === '1000to1999' || priceFilter === 'above1000') {
      if (jewel.price < 1000 || jewel.price > 1999) return false;
    } else if (priceFilter === 'above2000') {
      if (jewel.price < 2000) return false;
    }

    // 6. In-Stock Only
    const isAvailable = jewel.inStock && (jewel.stockQuantity === undefined || jewel.stockQuantity > 0);
    if (inStockOnly && !isAvailable) {
      return false;
    }

    // 7. Search Query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = (
        jewel.title.toLowerCase().includes(q) ||
        jewel.category.toLowerCase().includes(q) ||
        (jewel.subCategory && jewel.subCategory.toLowerCase().includes(q)) ||
        (jewel.material && jewel.material.toLowerCase().includes(q)) ||
        (jewel.stones && jewel.stones.toLowerCase().includes(q))
      );
      if (!matchSearch) return false;
    }

    return true;
  });

  // Apply PRAO-style sorting
  const sortedJewels = [...filteredJewels].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // 'featured'
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSubType('All');
    setSelectedOutfit('All');
    setSelectedOccasion('All');
    setPriceFilter('All');
    setInStockOnly(false);
  };

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedSubType !== 'All',
    selectedOutfit !== 'All',
    selectedOccasion !== 'All',
    priceFilter !== 'All',
    inStockOnly
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0;

  const handleOpenQuickView = (jewel) => {
    setQuickViewItem(jewel);
    setModalImageTab('model');
  };

  return (
    <section id="collections" className="py-12 sm:py-20 relative bg-[#F7F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Collection Heading & Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#E8DFD5]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D8C4A3] bg-white mb-2 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#A9824B]" />
              <span className="text-[10px] tracking-widest uppercase font-sans text-[#8F6C3A] font-semibold">
                Bhagvatam Curation
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#252321] tracking-tight">
              Curated Jewellery Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#68625D] font-light mt-1">
              Thoughtfully curated everyday, festive, and bridal jewellery with durable anti-tarnish finish.
            </p>
          </div>

          {/* Action Buttons: Filter Drawer Trigger + Sort By Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
            {/* Filter Drawer Trigger Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="min-h-[42px] px-3.5 sm:px-4 py-2 rounded-xl border border-[#D8C4A3] bg-white text-xs font-sans text-[#252321] hover:bg-[#FAF7F2] active:scale-[0.98] flex items-center gap-2 shadow-xs transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B]"
              aria-label={`Open filter drawer (${activeFiltersCount} active)`}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#A9824B]" />
              <span className="font-medium">Filter</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#252321] text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-select" className="text-xs font-sans text-[#68625D] hidden md:inline">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl border border-[#D8C4A3] bg-white text-xs font-sans text-[#252321] focus:outline-none focus:border-[#A9824B] focus:ring-1 focus:ring-[#A9824B] shadow-xs"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Removable Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-xl bg-white border border-[#E8DFD5] shadow-xs">
            <span className="text-xs font-sans text-[#78716C] mr-1">Active:</span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#D8C4A3] text-xs font-sans text-[#252321]">
                <span>Type: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="hover:text-red-600 focus-visible:ring-1 focus-visible:ring-[#A9824B] rounded p-0.5"
                  aria-label={`Remove ${selectedCategory} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedSubType !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#D8C4A3] text-xs font-sans text-[#252321]">
                <span>Style: {selectedSubType}</span>
                <button
                  onClick={() => setSelectedSubType('All')}
                  className="hover:text-red-600 focus-visible:ring-1 focus-visible:ring-[#A9824B] rounded p-0.5"
                  aria-label={`Remove ${selectedSubType} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedOutfit !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#D8C4A3] text-xs font-sans text-[#252321]">
                <span>Color: {selectedOutfit}</span>
                <button
                  onClick={() => setSelectedOutfit('All')}
                  className="hover:text-red-600 focus-visible:ring-1 focus-visible:ring-[#A9824B] rounded p-0.5"
                  aria-label={`Remove ${selectedOutfit} color filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedOccasion !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#D8C4A3] text-xs font-sans text-[#252321]">
                <span>Occasion: {selectedOccasion}</span>
                <button
                  onClick={() => setSelectedOccasion('All')}
                  className="hover:text-red-600 focus-visible:ring-1 focus-visible:ring-[#A9824B] rounded p-0.5"
                  aria-label={`Remove ${selectedOccasion} occasion filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {priceFilter !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#D8C4A3] text-xs font-sans text-[#252321]">
                <span>Price: {priceFilter === 'under499' ? 'Under ₹499' : priceFilter === '500to999' ? '₹500-₹999' : priceFilter === '1000to1999' ? '₹1,000-₹1,999' : '₹2,000+'}</span>
                <button
                  onClick={() => setPriceFilter('All')}
                  className="hover:text-red-600 focus-visible:ring-1 focus-visible:ring-[#A9824B] rounded p-0.5"
                  aria-label="Remove price filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-sans text-emerald-900">
                <span>Listed: In Stock</span>
                <button
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-red-600 focus-visible:ring-1 focus-visible:ring-[#A9824B] rounded p-0.5"
                  aria-label="Remove in stock only filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs font-sans text-[#8F6C3A] hover:text-[#252321] underline ml-auto py-1 px-2 focus-visible:ring-1 focus-visible:ring-[#A9824B] rounded"
            >
              Reset All
            </button>
          </div>
        )}

        {/* 3-Dimensional Smart Discovery Bar for quick on-page browsing */}
        <SmartDiscoveryBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubType={selectedSubType}
          setSelectedSubType={setSelectedSubType}
          selectedOutfit={selectedOutfit}
          setSelectedOutfit={setSelectedOutfit}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          matchingCount={sortedJewels.length}
          onResetFilters={handleResetFilters}
        />

        {/* Full Filter Drawer Component */}
        <FilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubType={selectedSubType}
          setSelectedSubType={setSelectedSubType}
          selectedOutfit={selectedOutfit}
          setSelectedOutfit={setSelectedOutfit}
          selectedOccasion={selectedOccasion}
          setSelectedOccasion={setSelectedOccasion}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          totalMatching={sortedJewels.length}
        />

        {/* Empty State */}
        {sortedJewels.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DFD5] p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <Sparkles className="w-8 h-8 text-[#A9824B] mx-auto" />
            <h3 className="text-lg font-serif text-[#252321]">No matching jewellery found</h3>
            <p className="text-xs text-[#68625D] leading-relaxed">
              No pieces match your exact combination of category and dress color. Try selecting another outfit color or resetting filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-[#252321] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-[#383532] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Jewels Grid: 2 Columns on Mobile, 3 on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {sortedJewels.map((jewel) => {
            const isWishlisted = wishlist.includes(jewel.id);
            const isAvailable = jewel.inStock && (jewel.stockQuantity === undefined || jewel.stockQuantity > 0);

            return (
              <div
                key={jewel.id}
                className="group prao-card prao-card-hover rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Container: Clean Studio Ivory Background */}
                  <div 
                    className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-[#FDFBF7] cursor-pointer" 
                    onClick={() => handleOpenQuickView(jewel)}
                  >
                    {/* Primary Image: Model Wearing the Jewelry */}
                    <img
                      src={jewel.modelImage}
                      alt={`${jewel.title} styled on model`}
                      className={`w-full h-full object-cover object-top transition-opacity duration-500 group-hover:opacity-0 ${
                        !isAvailable ? 'grayscale-[60%] opacity-60' : ''
                      }`}
                      loading="lazy"
                    />

                    {/* Secondary Image: Macro Product Close-up on hover */}
                    <img
                      src={jewel.productImage || jewel.modelImage}
                      alt={jewel.title}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                        !isAvailable ? 'grayscale-[60%] opacity-60' : ''
                      }`}
                      loading="lazy"
                    />

                    {/* Truthful Merchandising Badges */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
                      {isAvailable ? (
                        <>
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-sans tracking-wider uppercase bg-white/95 text-[#252321] border border-[#E8DFD5] font-medium shadow-xs">
                            {jewel.badge || 'Curated'}
                          </span>
                          {jewel.discount && (
                            <span className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold w-fit">
                              {jewel.discount}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-sans tracking-widest uppercase bg-[#252321] text-white font-bold shadow-sm">
                          SOLD OUT
                        </span>
                      )}
                    </div>

                    {/* Worn by Model Hint */}
                    <div className="hidden sm:flex absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-[#252321] font-sans border border-[#E8DFD5] items-center gap-1 shadow-xs">
                      <Eye className="w-3 h-3 text-[#A9824B]" />
                      <span>{isAvailable ? 'Click to Inspect' : 'Out of Stock'}</span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(jewel.id);
                      }}
                      className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-white/95 border border-[#E8DFD5] text-[#4D4945] hover:text-[#A9824B] transition-colors z-10 shadow-xs focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                      aria-label={isWishlisted ? `Remove ${jewel.title} from Wishlist` : `Save ${jewel.title} to Wishlist`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#A9824B] text-[#A9824B]' : ''}`} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-4">
                    {/* Category & Subtype */}
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#8A837C] font-sans mb-1 uppercase tracking-wider">
                      <span className="truncate">{jewel.subCategory || jewel.category}</span>
                      <div className="flex items-center gap-1 text-[#A9824B] shrink-0 font-sans font-medium">
                        <Star className="w-3 h-3 fill-[#A9824B]" />
                        <span className="font-bold text-[#252321]">{jewel.rating || 4.8}</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => handleOpenQuickView(jewel)}
                      className="text-xs sm:text-base font-serif text-[#252321] group-hover:text-[#8F6C3A] transition-colors mb-1 cursor-pointer line-clamp-2 sm:line-clamp-1 leading-snug font-medium"
                    >
                      {jewel.title}
                    </h3>

                    {/* Outfit Match Tags */}
                    {jewel.outfitMatch && jewel.outfitMatch.length > 0 && (
                      <div className="flex items-center gap-1 mb-2 text-[9px] sm:text-[10px] font-sans text-[#68625D]">
                        <span className="text-[#8A837C] hidden sm:inline">Matches:</span>
                        <div className="flex flex-wrap gap-1">
                          {jewel.outfitMatch.slice(0, 2).map((c) => (
                            <span key={c} className="bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E8DFD5] text-[#383532]">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Price & Accessible Touch-Compliant CTA */}
                <div className="p-3 sm:p-4 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-auto">
                  <div>
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-base sm:text-lg font-bold font-sans text-[#252321]">
                        ₹{jewel.price}
                      </span>
                      {jewel.mrp && (
                        <span className="text-[10px] sm:text-xs line-through text-[#8A837C] font-sans">
                          ₹{jewel.mrp}
                        </span>
                      )}
                    </div>
                    {jewel.mrp && (
                      <span className="text-[9px] sm:text-[10px] text-emerald-700 font-medium font-sans block">
                        Save ₹{jewel.mrp - jewel.price}
                      </span>
                    )}
                  </div>

                  <div className="w-full sm:w-auto">
                    {isAvailable ? (
                      <button
                        onClick={() => onAddToCart(jewel)}
                        className="w-full sm:w-auto min-h-[42px] px-3.5 sm:px-4 py-2 rounded-full bg-[#252321] hover:bg-[#383532] active:scale-95 text-[#F7F2E9] font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-[#A9824B] flex items-center justify-center gap-1.5"
                        aria-label={`Buy ${jewel.title}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 sm:hidden text-[#D8C4A3]" />
                        <span>Quick Add</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`We will notify you on WhatsApp as soon as "${jewel.title}" is back in stock!`)}
                        className="w-full sm:w-auto min-h-[42px] px-3 py-2 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] text-[#68625D] hover:text-[#252321] text-[11px] font-sans flex items-center justify-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                        aria-label={`Notify me when ${jewel.title} is back in stock`}
                      >
                        <BellRing className="w-3 h-3 text-[#A9824B]" />
                        <span>Notify Me</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quick View Inspection Modal (Shows Lady Wearing It + Macro Shot) */}
      {quickViewItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-quickview-title"
        >
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-2xl max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setQuickViewItem(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#FAF7F2] border border-[#E8DFD5] text-[#252321] hover:bg-[#EFE8DC] transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B]"
              aria-label="Close product inspection modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Left Column: Model Wearing vs Product Shot Image Switcher */}
              <div className="relative bg-[#FAF7F2] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DFD5]">
                
                {/* Active Image */}
                <div className="relative aspect-square sm:aspect-auto sm:h-[460px] overflow-hidden">
                  <img
                    src={modalImageTab === 'model' ? quickViewItem.modelImage : (quickViewItem.productImage || quickViewItem.modelImage)}
                    alt={`${quickViewItem.title} ${modalImageTab === 'model' ? 'worn by model' : 'product view'}`}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8DFD5] text-[10px] font-sans tracking-wider uppercase text-[#252321] font-medium shadow-sm">
                    {modalImageTab === 'model' ? '✨ Model Wearing View' : '🔍 Macro Jewellery View'}
                  </div>
                </div>

                {/* Image Toggle Tabs (Model vs Product) */}
                <div className="p-3 bg-[#FAF7F2] border-t border-[#E8DFD5] flex gap-2">
                  <button
                    onClick={() => setModalImageTab('model')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-sans font-medium min-h-[44px] transition-all ${
                      modalImageTab === 'model'
                        ? 'bg-[#252321] text-white font-bold shadow-sm'
                        : 'bg-white border border-[#E8DFD5] text-[#68625D] hover:text-[#252321]'
                    }`}
                  >
                    1. View on Model
                  </button>
                  <button
                    onClick={() => setModalImageTab('product')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-sans font-medium min-h-[44px] transition-all ${
                      modalImageTab === 'product'
                        ? 'bg-[#252321] text-white font-bold shadow-sm'
                        : 'bg-white border border-[#E8DFD5] text-[#68625D] hover:text-[#252321]'
                    }`}
                  >
                    2. Product Close-Up
                  </button>
                </div>
              </div>

              {/* Right Column: Details, Price & Buy Buttons */}
              <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-sans tracking-wider uppercase bg-[#FAF7F2] text-[#A9824B] border border-[#D8C4A3] font-semibold">
                      {quickViewItem.badge || 'Trending'}
                    </span>
                    {quickViewItem.inStock ? (
                      <span className="px-2.5 py-0.5 rounded text-[9px] font-sans tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                        Listed Item (Supplier Checked on Order)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded text-[9px] font-sans tracking-wider uppercase bg-red-50 text-red-800 border border-red-200 font-bold">
                        SOLD OUT
                      </span>
                    )}
                  </div>

                  <h3 id="modal-quickview-title" className="text-xl sm:text-2xl font-serif text-[#252321] mb-2 font-medium">
                    {quickViewItem.title}
                  </h3>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl sm:text-3xl font-bold font-sans text-[#252321]">
                      ₹{quickViewItem.price}
                    </span>
                    {quickViewItem.mrp && (
                      <span className="text-sm sm:text-base line-through text-[#8C827A] font-sans">
                        ₹{quickViewItem.mrp}
                      </span>
                    )}
                    <span className="text-xs text-emerald-700 font-sans font-medium">
                      Inclusive of all taxes
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed mb-5">
                    {quickViewItem.description}
                  </p>

                  {/* Key Specs for Indian Customers */}
                  <div className="space-y-2 text-xs font-sans text-[#252321] border-y border-[#E8DFD5] py-4 mb-5">
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Category & Type:</span>
                      <span className="font-medium text-[#252321]">{quickViewItem.category} &bull; {quickViewItem.subCategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Material & Polish:</span>
                      <span className="font-medium text-[#252321]">{quickViewItem.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Outfit Matching:</span>
                      <span className="font-medium text-emerald-700">
                        {quickViewItem.outfitMatch ? quickViewItem.outfitMatch.join(', ') : 'All Outfits'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Shipping & COD:</span>
                      <span className="font-medium text-emerald-700">Free Delivery Above ₹499 &bull; Cash on Delivery</span>
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  {quickViewItem.features && (
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {quickViewItem.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#57534E] font-sans">
                          <Check className="w-3.5 h-3.5 text-[#A9824B] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons: Min 48px Touch Targets for Mobile */}
                <div className="space-y-2.5 pt-2">
                  {quickViewItem.inStock ? (
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                      <button
                        onClick={() => {
                          onAddToCart(quickViewItem);
                          setQuickViewItem(null);
                        }}
                        className="flex-1 min-h-[48px] py-3.5 px-6 rounded-full bg-[#252321] text-white font-sans font-bold text-xs tracking-wider uppercase hover:bg-[#3D3A37] active:scale-[0.98] transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                        aria-label={`Buy ${quickViewItem.title} now with Cash on Delivery`}
                      >
                        Buy Now (Cash on Delivery)
                      </button>
                      <button
                        onClick={() => {
                          onAddToCart(quickViewItem);
                          setQuickViewItem(null);
                        }}
                        className="min-h-[48px] px-6 py-3.5 rounded-full bg-white border border-[#D8C4A3] hover:bg-[#FAF7F2] active:scale-[0.98] text-[#252321] font-sans font-medium text-xs tracking-wider uppercase transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                        aria-label={`Add ${quickViewItem.title} to bag`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        alert(`We will notify you on WhatsApp as soon as "${quickViewItem.title}" is back in stock!`);
                        setQuickViewItem(null);
                      }}
                      className="w-full min-h-[48px] py-3.5 rounded-full bg-[#FAF7F2] border border-[#D8C4A3] text-[#252321] font-sans font-bold text-xs tracking-wider uppercase hover:bg-[#EFE8DC] active:scale-[0.98] transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                      aria-label={`Notify me when ${quickViewItem.title} is back in stock`}
                    >
                      <BellRing className="w-4 h-4 text-[#A9824B]" />
                      <span>Notify Me When Back in Stock</span>
                    </button>
                  )}

                  {/* Discreet WhatsApp Availability Enquiry Action */}
                  <div className="pt-2">
                    {quickViewItem && getWhatsAppEnquiryUrl(quickViewItem) ? (
                      <a
                        href={getWhatsAppEnquiryUrl(quickViewItem)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[44px] py-2.5 px-4 rounded-full border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-sans font-medium flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                        aria-label={`Enquire on WhatsApp about ${quickViewItem.title}`}
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-700" />
                        <span>Enquire Availability via WhatsApp</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full min-h-[42px] py-2 px-3 rounded-full bg-[#F5EFE6] border border-[#E8DFD5] text-[11px] text-[#8C827A] font-sans flex items-center justify-center gap-1.5 cursor-not-allowed"
                        title="WhatsApp enquiry is disabled until a verified business number is configured in settings."
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#8C827A]" />
                        <span>WhatsApp Enquiry (Business Number Verification Pending)</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-[#78716C] pt-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#A9824B]" />
                      Anti-Tarnish
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#A9824B]" />
                      Dispatched in 24 Hrs
                    </span>
                    <span>&bull;</span>
                    <span>7-Day Replacement</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
