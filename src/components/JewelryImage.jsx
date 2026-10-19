import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Premium jewellery image component with instant graceful fallback.
 * Prevents layout shifts (CLS) and guarantees broken image icons never appear.
 */
export default function JewelryImage({
  src,
  alt = 'Bhagvatam Jewellery Piece',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  width,
  height,
  fallbackLabel = 'Bhagvatam Curation'
}) {
  const [hasError, setHasError] = useState(!src);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectRatio} bg-[#EFE8DC] border border-[#E2D6C5] flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        role="img"
        aria-label={`${alt} (image preview unavailable)`}
      >
        <div className="w-10 h-10 rounded-full bg-white/80 border border-[#D8C4A3] flex items-center justify-center text-[#A9824B] mb-2 shadow-xs">
          <Sparkles className="w-5 h-5 text-[#A9824B]" />
        </div>
        <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[#8F6C3A] font-semibold">
          Bhagvatam
        </span>
        <span className="text-[9px] font-sans text-[#68625D] mt-0.5 line-clamp-1 max-w-[120px]">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#EFE8DC]`}>
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#EFE8DC] via-[#FAF7F2] to-[#EFE8DC] bg-[length:200%_100%] animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}
