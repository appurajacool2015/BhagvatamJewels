import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Sparkles,
  Star,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import JewelryImage from './JewelryImage';

export default function ProductDetailPage({
  product,
  products = [],
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
  wishlist = []
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  // Build product image list (modelImage, productImage, and fallbacks)
  const images = [
    product.modelImage,
    product.productImage
  ].filter(Boolean);

  // If only 1 image exists, duplicate so slider has interactive state or display single
  const galleryImages = images.length > 0 ? images : [product.modelImage || product.productImage];

  // Filter similar products (prioritizing same category, then other catalog pieces)
  const sameCategory = (products || []).filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const otherPopular = (products || []).filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  const similarProducts = [...sameCategory, ...otherPopular].slice(0, 4);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bhagvatam: ${product.title}`,
          text: `Check out ${product.title} for only ₹${product.price} at Bhagvatam Jewels!`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: Copy current URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        // clipboard permission denied
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] pb-24 text-[#252321]">

      {/* 1. Sticky Navigation Header */}
      <div className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="min-h-[44px] min-w-[44px] -ml-2 px-2 flex items-center gap-1.5 text-xs font-sans font-medium text-[#252321] hover:text-[#8F6C3A] transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B] rounded-lg"
          aria-label="Back to collection"
        >
          <ArrowLeft className="w-5 h-5 text-[#252321]" />
          <span>Back</span>
        </button>

        <span className="text-xs font-display tracking-widest uppercase font-semibold text-[#8F6C3A]">
          {product.category}
        </span>

        <button
          onClick={handleShare}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#57534E] hover:text-[#252321] transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B] rounded-full"
          aria-label="Share product"
        >
          {copied ? (
            <span className="text-[10px] font-sans font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Copied!
            </span>
          ) : (
            <Share2 className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="max-w-3xl mx-auto">

        {/* 2. Photo Gallery Carousel (Matches PRAO Image 3) */}
        <div className="relative aspect-[4/5] bg-[#EFE8DC] overflow-hidden select-none">
          <img
            src={galleryImages[currentImageIndex]}
            alt={`${product.title} - view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover object-top transition-opacity duration-300"
          />

          {/* Previous / Next Arrow Controls */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-md text-[#252321] focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-md text-[#252321] focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Wishlist Floating Button */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md border border-[#E8DFD5] text-[#57534E] hover:text-[#A9824B] transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B]"
            aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#A9824B] text-[#A9824B]' : ''}`} />
          </button>

          {/* Pagination Dots (Matches Screenshot 3) */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`transition-all rounded-full ${
                  i === currentImageIndex
                    ? 'w-5 h-2 bg-[#252321] shadow-xs'
                    : 'w-2 h-2 bg-[#252321]/30 hover:bg-[#252321]/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 3. Product Info Card */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E8DFD5] space-y-4 shadow-xs">

          {/* Deal Pill */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-rose-600 text-white">
              Limited time deal
            </span>
            {product.badge && (
              <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-medium uppercase tracking-wider bg-[#FAF7F2] border border-[#E8DFD5] text-[#8F6C3A]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-serif text-[#252321] leading-snug font-medium">
            {product.title}
          </h1>

          {/* Price Breakdown (Matches Screenshot 3) */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-bold font-sans text-[#252321]">
                ₹{product.price}
              </span>
              {product.mrp && (
                <span className="text-sm line-through text-[#8A837C] font-sans">
                  ₹{product.mrp}
                </span>
              )}
              {product.mrp && (
                <span className="px-2 py-0.5 rounded text-xs font-sans font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  SAVE {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                </span>
              )}
            </div>
            <p className="text-[11px] font-sans text-[#78716C]">
              Inclusive of all taxes &bull; Free Delivery on orders over ₹499
            </p>
          </div>

          {/* Service Signals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#E8DFD5] text-xs font-sans text-[#4D4945]">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5]">
              <Truck className="w-4 h-4 text-[#A9824B] shrink-0" />
              <span>Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5]">
              <ShieldCheck className="w-4 h-4 text-[#A9824B] shrink-0" />
              <span>Anti-Tarnish Polish</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5]">
              <RefreshCw className="w-4 h-4 text-[#A9824B] shrink-0" />
              <span>7-Day Replacement</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5]">
              <Sparkles className="w-4 h-4 text-[#A9824B] shrink-0" />
              <span>Quality Checked</span>
            </div>
          </div>

        </div>

        {/* 4. Product Description & Specifications */}
        <div className="p-4 sm:p-6 mt-3 bg-white border-y border-[#E8DFD5] space-y-4">
          <h2 className="text-sm font-sans uppercase font-bold tracking-wider text-[#8F6C3A]">
            Product Details & Styling
          </h2>
          <p className="text-xs sm:text-sm text-[#4D4945] leading-relaxed font-light">
            {product.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-[#E8DFD5]/80 text-xs font-sans">
            {product.material && (
              <div className="flex justify-between py-1 border-b border-[#E8DFD5]/40">
                <span className="text-[#78716C]">Material & Plating:</span>
                <span className="text-[#252321] font-medium text-right">{product.material}</span>
              </div>
            )}
            {product.stones && (
              <div className="flex justify-between py-1 border-b border-[#E8DFD5]/40">
                <span className="text-[#78716C]">Stones & Embellishments:</span>
                <span className="text-[#252321] font-medium text-right">{product.stones}</span>
              </div>
            )}
            {product.closure && (
              <div className="flex justify-between py-1 border-b border-[#E8DFD5]/40">
                <span className="text-[#78716C]">Closure / Fitting:</span>
                <span className="text-[#252321] font-medium text-right">{product.closure}</span>
              </div>
            )}
            {product.occasion && (
              <div className="flex justify-between py-1">
                <span className="text-[#78716C]">Occasion:</span>
                <span className="text-[#252321] font-medium text-right">{product.occasion}</span>
              </div>
            )}
          </div>
        </div>

        {/* 5. Similar Products Section (Matches prao.com/products/6565mr) */}
        {similarProducts.length > 0 && (
          <div className="p-4 sm:p-6 mt-3 bg-white border-y border-[#E8DFD5] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD5]">
              <div>
                <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#8F6C3A] block">
                  You May Also Like
                </span>
                <h2 className="text-lg sm:text-2xl font-serif text-[#252321] font-medium tracking-tight">
                  Similar Products ✨
                </h2>
              </div>
              <span className="text-xs font-sans text-[#78716C]">
                {product.category}
              </span>
            </div>

            {/* 2-Column Responsive Mobile Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-2">
              {similarProducts.map((item) => {
                const itemWishlisted = (wishlist || []).includes(item.id);
                const discountPercent = item.mrp ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;

                return (
                  <div
                    key={item.id}
                    className="group prao-card rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between border border-[#E8DFD5] bg-[#FAF7F2]/60 hover:bg-white transition-all shadow-xs"
                  >
                    <div>
                      {/* Image Container with Studio Background */}
                      <div
                        className="relative aspect-[4/5] overflow-hidden bg-[#FAF7F2] cursor-pointer"
                        onClick={() => {
                          if (onSelectProduct) {
                            onSelectProduct(item);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                      >
                        <JewelryImage
                          src={item.modelImage || item.productImage}
                          alt={item.title}
                          aspectRatio="aspect-[4/5]"
                          loading="lazy"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-sans tracking-wider uppercase bg-white/95 text-[#252321] border border-[#E8DFD5] font-medium shadow-xs">
                            {item.badge || 'Curated'}
                          </span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(item.id);
                          }}
                          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs border border-[#E8DFD5] text-[#57534E] hover:text-[#A9824B] z-10 focus-visible:ring-2 focus-visible:ring-[#A9824B]"
                          aria-label={`Save ${item.title} to wishlist`}
                        >
                          <Heart className={`w-4 h-4 ${itemWishlisted ? 'fill-[#A9824B] text-[#A9824B]' : ''}`} />
                        </button>
                      </div>

                      {/* Card Info */}
                      <div className="p-2.5 sm:p-4">
                        <span className="text-[10px] text-[#8A837C] font-sans uppercase tracking-wider block mb-1 truncate">
                          {item.subCategory || item.category}
                        </span>
                        <h3
                          onClick={() => {
                            if (onSelectProduct) {
                              onSelectProduct(item);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className="text-xs sm:text-base font-serif text-[#252321] group-hover:text-[#8F6C3A] transition-colors mb-1 cursor-pointer line-clamp-1 leading-snug font-medium"
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="p-2.5 sm:p-4 pt-0 flex flex-col gap-2 mt-auto">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-lg font-bold font-sans text-[#252321]">
                          ₹{item.price}
                        </span>
                        {item.mrp && (
                          <span className="text-[10px] sm:text-xs line-through text-[#8A837C] font-sans">
                            ₹{item.mrp}
                          </span>
                        )}
                        {discountPercent > 0 && (
                          <span className="text-[9px] font-sans font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            SAVE {discountPercent}%
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => onAddToCart(item)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-full bg-[#252321] hover:bg-[#383532] active:scale-95 text-[#F7F2E9] font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-[#A9824B] flex items-center justify-center gap-1.5"
                        aria-label={`Add ${item.title} to cart`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D8C4A3]" />
                        <span>Add to cart</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 5. Sticky Bottom "ADD TO CART" Bar (Matches PRAO Image 3) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFD5] p-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="hidden sm:block">
            <div className="text-xs font-sans text-[#78716C]">Total Price:</div>
            <div className="text-lg font-bold font-sans text-[#252321]">₹{product.price}</div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 min-h-[48px] py-3.5 px-6 rounded-full bg-[#252321] hover:bg-[#3D3A37] active:scale-[0.98] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md transition-all focus-visible:ring-2 focus-visible:ring-[#A9824B] flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8C4A3]" />
            <span>ADD TO CART &bull; ₹{product.price}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
