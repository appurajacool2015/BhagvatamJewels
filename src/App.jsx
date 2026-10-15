import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import StyleSetBuilder from './components/StyleSetBuilder';
import QualityPromise from './components/QualityPromise';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppHelpModal from './components/WhatsAppHelpModal';
import AdminProductManager from './components/AdminProductManager';
import { DEFAULT_PRODUCTS } from './data/jewelry';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Initialize dynamic products from localStorage if available
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('bhagvatam_products');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved products', e);
    }
    return DEFAULT_PRODUCTS;
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Update products and persist to localStorage
  const handleUpdateProducts = (updated) => {
    setProducts(updated);
    try {
      localStorage.setItem('bhagvatam_products', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
    showToast('Store inventory & prices updated successfully!');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all products back to the initial catalog?')) {
      setProducts(DEFAULT_PRODUCTS);
      try {
        localStorage.removeItem('bhagvatam_products');
      } catch (e) {}
      showToast('Catalog restored to default.');
    }
  };

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    showToast(`Added "${item.title}" to Cart!`);
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (jewelId) => {
    setWishlist((prev) => {
      const exists = prev.includes(jewelId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== jewelId);
      } else {
        showToast('Saved to Wishlist ❤️');
        return [...prev, jewelId];
      }
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#F7F2E9] text-[#252321] flex flex-col font-sans selection:bg-[#D8C4A3]/40 selection:text-[#252321]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#252321] border border-[#D8C4A3]/50 text-[#F7F2E9] text-xs font-sans tracking-wide shadow-2xl backdrop-blur-xl animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#C4A16C] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Aligned 2-Tier Navbar (like Kushal's & Rubans) */}
      <Navbar
        cartCount={cart.length}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenSupport={() => setSupportOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content Experience */}
      <main className="flex-1">
        <Hero />
        <FeaturedCollections
          products={products}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
        />
        <StyleSetBuilder onAddToCart={handleAddToCart} />
        <QualityPromise />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* WhatsApp Help & Order Tracking Modal */}
      <WhatsAppHelpModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />

      {/* Merchant Inventory & Price Studio Modal */}
      <AdminProductManager
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
        onResetDefaults={handleResetDefaults}
      />

    </div>
  );
}
