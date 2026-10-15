import React, { useState } from 'react';
import { X, Trash2, Truck, ShieldCheck, Tag, ArrowRight, Check } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onRemoveFromCart, onClearCart }) {
  const [couponCode, setCouponCode] = useState('BHAGVATAM10');
  const [discountApplied, setDiscountApplied] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'upi'

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.10) : 0;
  const shippingFee = subtotal >= 499 ? 0 : 70;
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleCheckout = () => {
    setOrderComplete(true);
  };

  const handleFinish = () => {
    setOrderComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E8DFD5] shadow-2xl flex flex-col justify-between text-[#252321]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8DFD5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span id="cart-drawer-title" className="text-sm font-sans tracking-wide uppercase text-[#252321] font-bold">
                Your Shopping Cart ({cart.length})
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#68625D] hover:text-[#252321] hover:bg-[#FAF7F2] transition-colors focus-visible:ring-2 focus-visible:ring-[#A9824B]"
              aria-label="Close shopping cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Bar */}
          <div className="bg-[#F0EBE1] px-5 py-2.5 border-b border-[#E8DFD5] text-xs font-sans">
            {subtotal >= 499 ? (
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>🎉 Yay! You have unlocked FREE Delivery across India!</span>
              </div>
            ) : (
              <div className="text-[#57534E]">
                Add <span className="text-[#252321] font-bold">₹{499 - subtotal}</span> more to get <span className="text-emerald-800 font-bold">FREE Delivery</span>!
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <Truck className="w-10 h-10 text-[#A9824B]/50 mx-auto" />
                <p className="text-base font-serif text-[#252321] font-medium">Your shopping cart is empty.</p>
                <p className="text-xs text-[#78716C] font-light">
                  Explore our festive chokers, jhumkas, and combos starting at ₹299.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 min-h-[44px] px-6 py-2.5 rounded-full bg-[#252321] text-white font-bold text-xs tracking-wider uppercase font-sans hover:bg-[#3D3A37] transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="p-3.5 rounded-xl bg-white border border-[#E8DFD5] shadow-sm flex gap-3.5 relative group"
                >
                  <img
                    src={item.productImage || item.modelImage}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] shrink-0"
                  />

                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="text-xs sm:text-sm font-sans font-medium text-[#252321] line-clamp-1">{item.title}</h4>
                    <div className="text-[11px] text-[#A9824B] font-sans mt-0.5 font-medium">{item.material}</div>
                    
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-bold font-sans text-[#252321]">
                        ₹{item.price}
                      </span>
                      {item.mrp && (
                        <span className="text-xs line-through text-[#8C827A] font-sans">
                          ₹{item.mrp}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromCart(index)}
                    className="absolute top-2.5 right-2.5 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#8C827A] hover:text-red-600 hover:bg-[#FAF7F2] transition-colors focus-visible:ring-2 focus-visible:ring-red-400"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {/* Indian Trust Checklist */}
            {cart.length > 0 && (
              <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD5] space-y-1.5 text-xs font-sans text-[#57534E] shadow-sm">
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>100% Quality Inspected Before Dispatch</span>
                </div>
                <div>&bull; Free Doorstep Cash on Delivery (COD)</div>
                <div>&bull; 7-Day Hassle-Free Replacement Guarantee</div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E8DFD5] bg-white space-y-3.5 shadow-md">
              
              {/* Promo Code Applied */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#D8C4A3] text-xs font-sans">
                <div className="flex items-center gap-2 text-[#252321]">
                  <Tag className="w-4 h-4 text-[#A9824B]" />
                  <span className="font-bold">BHAGVATAM10</span>
                  <span className="text-[10px] text-emerald-700 font-medium">(10% Instant Festive OFF)</span>
                </div>
                <span className="text-[#A9824B] font-bold">-₹{discountAmount}</span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-sans text-[#57534E]">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="text-[#252321] font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Special Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>{shippingFee === 0 ? <span className="text-emerald-800 font-medium">FREE</span> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#E8DFD5] text-sm font-bold text-[#252321]">
                  <span>Grand Total</span>
                  <span className="text-2xl text-[#252321] font-sans">₹{finalTotal}</span>
                </div>
              </div>

              {/* Payment Method Selector: Min 44px Touch Targets */}
              <div className="grid grid-cols-2 gap-2 text-xs font-sans pt-1">
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`min-h-[46px] py-2.5 px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                    paymentMethod === 'cod'
                      ? 'border-[#252321] bg-[#252321] text-white font-bold shadow-sm'
                      : 'border-[#E8DFD5] bg-[#FAF7F2] text-[#57534E] hover:text-[#252321]'
                  }`}
                  aria-pressed={paymentMethod === 'cod'}
                >
                  <span>💵 Cash on Delivery</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`min-h-[46px] py-2.5 px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#A9824B] ${
                    paymentMethod === 'upi'
                      ? 'border-[#252321] bg-[#252321] text-white font-bold shadow-sm'
                      : 'border-[#E8DFD5] bg-[#FAF7F2] text-[#57534E] hover:text-[#252321]'
                  }`}
                  aria-pressed={paymentMethod === 'upi'}
                >
                  <span>⚡ UPI / Cards</span>
                </button>
              </div>

              {/* Checkout CTA: Min 50px Touch Target */}
              <button
                onClick={handleCheckout}
                className="w-full min-h-[50px] py-3.5 px-6 rounded-full bg-[#252321] text-white font-sans font-bold text-xs tracking-wider uppercase hover:bg-[#3D3A37] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md focus-visible:ring-2 focus-visible:ring-[#A9824B]"
              >
                <span>Confirm Order ({paymentMethod === 'cod' ? 'Cash on Delivery' : 'Pay Online'})</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Success Modal */}
      {orderComplete && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD5] text-center space-y-4 shadow-2xl text-[#252321]">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700 shadow-sm">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif text-[#252321] font-medium">
              Order Confirmed!
            </h3>

            <p className="text-xs sm:text-sm font-sans text-[#57534E] font-light leading-relaxed">
              Thank you for shopping at Bhagvatam! Your order has been placed successfully via <span className="text-[#252321] font-bold">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI/Online'}</span>.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] font-mono text-xs text-[#252321] space-y-1">
              <div>Order ID: #BHAG-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div className="text-[11px] text-[#78716C] font-sans">SMS & WhatsApp tracking will be sent shortly.</div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full min-h-[48px] py-3 rounded-full bg-[#252321] active:scale-[0.98] text-white text-xs font-sans tracking-wider uppercase font-bold hover:bg-[#3D3A37] focus-visible:ring-2 focus-visible:ring-[#A9824B]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
