import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import ProductDetailPage from './components/ProductDetailPage';
import StyleSetBuilder from './components/StyleSetBuilder';
import QualityPromise from './components/QualityPromise';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppHelpModal from './components/WhatsAppHelpModal';
import AdminProductManager from './components/AdminProductManager';
import { DEFAULT_PRODUCTS } from './data/jewelry';
import { Sparkles, Home, ShoppingBag, MessageCircle, Grid } from 'lucide-react';

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

  // 3-Tier Multi-View Mobile Flow: 'home' | 'collection' | 'pdp'
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Browser History & Hardware Back Button Integration
  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state;
      if (state?.view === 'pdp' && state?.productId) {
        const prod = products.find((p) => p.id === state.productId);
        if (prod) {
          setSelectedProduct(prod);
          setCurrentView('pdp');
        }
      } else if (state?.view === 'collection') {
        setSelectedCategory(state.category || 'All');
        setSelectedProduct(null);
        setCurrentView('collection');
      } else {
        setCurrentView('home');
        setSelectedProduct(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  // Navigation handlers
  const handleNavigateToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({ view: 'home' }, '', window.location.pathname);
    } catch (e) {}
  };

  const handleNavigateToCategory = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setCurrentView('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({ view: 'collection', category }, '', `?category=${encodeURIComponent(category)}`);
    } catch (e) {}
  };

  const handleNavigateToProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({ view: 'pdp', productId: product.id }, '', `?product=${encodeURIComponent(product.id)}`);
    } catch (e) {}
  };

  const handleBackFromProduct = () => {
    if (selectedCategory && selectedCategory !== 'All') {
      setCurrentView('collection');
    } else {
      setCurrentView('home');
    }
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#F7F2E9] text-[#252321] flex flex-col font-sans selection:bg-[#D8C4A3]/40 selection:text-[#252321] pb-16 sm:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#252321] border border-[#D8C4A3]/50 text-[#F7F2E9] text-xs font-sans tracking-wide shadow-2xl backdrop-blur-xl animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#C4A16C] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global 2-Tier Navbar */}
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
        setSelectedCategory={handleNavigateToCategory}
        onNavigateHome={handleNavigateToHome}
      />

      {/* Main Content Area based on currentView */}
      <main className="flex-1">
        {currentView === 'pdp' && selectedProduct ? (
          /* SCREEN 3: Dedicated Product Detail Page (Matches Screenshot 3) */
          <ProductDetailPage
            product={selectedProduct}
            products={products}
            onBack={handleBackFromProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.includes(selectedProduct?.id)}
            onSelectProduct={handleNavigateToProduct}
            wishlist={wishlist}
          />
        ) : currentView === 'collection' ? (
          /* SCREEN 2: Dedicated Collection Listing Page (Matches Screenshot 2) */
          <FeaturedCollections
            products={products}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSelectProduct={handleNavigateToProduct}
            isStandalonePage={true}
            onBackToHome={handleNavigateToHome}
          />
        ) : (
          /* SCREEN 1: Homepage with Auto-Rotating Hero Carousel (Matches Screenshot 1) */
          <>
            <Hero onSelectCategory={handleNavigateToCategory} />
            <FeaturedCollections
              products={products}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleNavigateToCategory}
              searchQuery={searchQuery}
              onSelectProduct={handleNavigateToProduct}
              isStandalonePage={false}
              onBackToHome={handleNavigateToHome}
            />
            <StyleSetBuilder onAddToCart={handleAddToCart} />
            <QualityPromise />
          </>
        )}
      </main>

      {/* Footer (Rendered on Home & Collection Pages) */}
      {currentView !== 'pdp' && <Footer />}

      {/* Mobile Bottom Quick-Access Bar (Matches PRAO Mobile Experience) */}
      <nav
        aria-label="Mobile Navigation"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFD5] py-2 px-3 flex items-center justify-around shadow-lg"
      >
        <button
          onClick={handleNavigateToHome}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-0.5 text-[10px] font-sans ${
            currentView === 'home' ? 'text-[#8F6C3A] font-bold' : 'text-[#68625D]'
          }`}
          aria-label="Go to homepage"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavigateToCategory('All')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-0.5 text-[10px] font-sans ${
            currentView === 'collection' ? 'text-[#8F6C3A] font-bold' : 'text-[#68625D]'
          }`}
          aria-label="Browse collections"
        >
          <Sparkles className="w-5 h-5" />
          <span>Sale</span>
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="min-h-[44px] min-w-[44px] relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-sans text-[#68625D]"
          aria-label={`Open shopping cart with ${cart.length} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#252321] text-white text-[9px] font-bold flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
          <span>Bag</span>
        </button>

        <button
          onClick={() => setSupportOpen(true)}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-0.5 text-[10px] font-sans text-[#68625D]"
          aria-label="Open WhatsApp support"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <span>Help</span>
        </button>
      </nav>

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
