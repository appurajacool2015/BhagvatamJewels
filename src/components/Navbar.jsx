import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Sparkles, MessageCircle, Menu, X, Search, SlidersHorizontal, Settings } from 'lucide-react';

export default function Navbar({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSupport,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenAdmin,
  onNavigateHome
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories = [
    { label: 'All Jewels', value: 'All' },
    { label: 'Necklaces & Sets', value: 'Necklaces' },
    { label: 'Earrings & Jhumkas', value: 'Earrings' },
    { label: 'Bangles & Kadas', value: 'Bangles & Kadas' },
    { label: 'Laddu Gopal Jewels', value: 'Laddu Gopal Jewels' },
    { label: 'Rings & Accessories', value: 'Rings & Accessories' },
    { label: 'Under ₹499', value: 'Under ₹499', isHot: true },
    { label: 'Festive Combos (Save 25%)', href: '#set-builder', isSpecial: true },
  ];

  return (
    <>
      {/* 1. Clean Compact Announcement Strip */}
      <div className="bg-[#EFE8DC] border-b border-[#E2D6C5] py-2 px-4 text-center text-xs tracking-wider text-[#383532] font-sans flex items-center justify-center gap-3">
        <span className="font-medium text-[11px] sm:text-xs tracking-wide">
          ✨ FREE ALL-INDIA DELIVERY ON ORDERS OVER ₹499 &bull; CASH ON DELIVERY (COD) &bull; 7-DAY EASY REPLACEMENT
        </span>
      </div>

      {/* 2. Main Header Bar (Ivory Canvas with Stable Obsidian & Gold Branding) */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2] border-b border-[#E8DFD5] shadow-xs py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Logo (Left) | Search Bar (Center) | Actions (Right) */}
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            
            {/* LEFT: Brand Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer select-none shrink-0" 
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                setSelectedCategory('All');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-medium tracking-[0.22em] text-[#252321] uppercase leading-none">
                  Bhagvatam
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-sans text-[#8A837C] mt-1 font-light">
                  Fine Fashion & Festive Jewels
                </span>
              </div>
            </div>

            {/* CENTER: Live Product Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-2 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search Kundan chokers, jhumkas, daily chains, rings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[42px] bg-white border border-[#D8C4A3] rounded-full pl-10 pr-9 py-2 text-xs text-[#252321] placeholder:text-[#8A837C] focus:outline-none focus:border-[#A9824B] focus:ring-1 focus:ring-[#A9824B] transition-all font-sans shadow-sm"
                  aria-label="Search catalog"
                />
                <Search className="w-4 h-4 text-[#8A837C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="w-8 h-8 flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 text-[#8A837C] hover:text-[#252321] text-xs focus-visible:ring-2 focus-visible:ring-[#A9824B] rounded-full"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: Actions (Merchant Admin, WhatsApp, Wishlist, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              
              {/* Merchant / Stock & Price Manager Button */}
              <button
                onClick={onOpenAdmin}
                className="hidden xl:flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-full border border-[#D8C4A3] bg-white hover:bg-[#EFE8DC] text-[#383532] text-[11px] font-sans font-medium tracking-wide transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                title="Manage Live Prices, Stocks & Products"
                aria-label="Open Stock & Price Manager"
              >
                <Settings className="w-3.5 h-3.5 text-[#A9824B]" />
                <span>Stock & Price Studio</span>
              </button>

              {/* WhatsApp Help */}
              <button
                onClick={onOpenSupport}
                className="hidden sm:flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-sans transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm"
                aria-label="Open WhatsApp Customer Support"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-medium">Help</span>
              </button>

              {/* Wishlist Button */}
              <button 
                onClick={() => alert('Wishlist items saved! Click on any product to view details.')}
                className="relative w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#383532] hover:text-[#A9824B] transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                title="Wishlist"
                aria-label={`Wishlist containing ${wishlistCount} items`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#A9824B] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="relative min-w-[44px] min-h-[44px] px-3.5 py-2 rounded-full bg-[#252321] hover:bg-[#383532] text-[#F7F2E9] transition-all flex items-center justify-center gap-2 shadow-sm group focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                aria-label={`Shopping Cart with ${cartCount} items, total ₹${cartTotal}`}
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-105 transition-transform text-[#D8C4A3]" />
                <span className="hidden sm:inline text-xs font-sans font-semibold text-[#F7F2E9] pr-0.5">
                  {cartTotal > 0 ? `₹${cartTotal}` : 'Cart'}
                </span>
                {cartCount > 0 && (
                  <span className="bg-[#A9824B] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#252321] hover:text-[#A9824B] transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-2.5 relative">
            <input
              type="text"
              placeholder="Search Kundan, jhumkas, rings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] bg-white border border-[#D8C4A3] rounded-full pl-10 pr-9 py-2 text-xs text-[#252321] placeholder:text-[#8A837C] focus:outline-none focus:border-[#A9824B] focus:ring-1 focus:ring-[#A9824B] font-sans shadow-sm"
              aria-label="Search catalog on mobile"
            />
            <Search className="w-4 h-4 text-[#8A837C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="w-9 h-9 flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 text-[#8A837C] hover:text-[#252321] text-xs focus-visible:ring-2 focus-visible:ring-[#A9824B] rounded-full"
                aria-label="Clear mobile search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bottom Row: Clean Horizontal Category Ribbon */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 pt-3 mt-2 border-t border-[#E8DFD5] text-xs tracking-wider uppercase font-sans text-[#4D4945]">
            {navCategories.map((cat, idx) => {
              if (cat.href) {
                return (
                  <a
                    key={idx}
                    href={cat.href}
                    className="hover:text-[#A9824B] transition-colors py-1 flex items-center gap-1.5 text-[#8F6C3A] font-semibold"
                  >
                    <span>{cat.label}</span>
                  </a>
                );
              }
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    const el = document.getElementById('collections');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`hover:text-[#252321] transition-colors py-1 relative flex items-center gap-1 font-medium ${
                    isActive ? 'text-[#252321] font-bold' : 'text-[#4D4945]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.isHot && (
                    <span className="bg-[#A9824B]/15 text-[#8F6C3A] text-[8px] px-1.5 py-0.5 rounded font-bold border border-[#A9824B]/30">
                      HOT
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#A9824B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F2E9] border-b border-[#E2D6C5] px-6 py-5 space-y-3 shadow-xl">
            <div className="text-[10px] uppercase font-sans tracking-widest text-[#8F6C3A] font-bold mb-2">
              Explore Collections
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#252321]">
              {navCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (cat.href) {
                      window.location.href = cat.href;
                    } else {
                      setSelectedCategory(cat.value);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className={`min-h-[44px] text-left p-3 rounded-xl border border-[#E8DFD5] bg-white hover:text-[#A9824B] transition-all flex items-center justify-between focus-visible:ring-2 focus-visible:ring-[#A9824B] shadow-sm ${
                    selectedCategory === cat.value ? 'border-[#A9824B] bg-[#EFE8DC] font-bold text-[#252321]' : ''
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  {cat.isHot && (
                    <span className="bg-[#A9824B]/15 text-[#8F6C3A] text-[8px] px-1 py-0.5 rounded font-bold border border-[#A9824B]/30 shrink-0">
                      HOT
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E8DFD5] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D8C4A3] bg-white hover:bg-[#EFE8DC] text-[#252321] text-xs font-sans font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B] shadow-sm"
              >
                <Settings className="w-4 h-4 text-[#A9824B]" />
                <span>Open Stock & Price Studio</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupport();
                }}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-sans transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Customer Care & Order Tracking</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
