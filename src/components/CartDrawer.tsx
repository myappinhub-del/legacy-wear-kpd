import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem, SiteConfig } from '../types';
import { formatINR } from '../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  config: SiteConfig;
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  config,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= config.freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : 99;
  const freeShippingProgress = Math.min(
    100,
    (subtotal / config.freeShippingThreshold) * 100
  );
  const amountToFreeShipping = Math.max(0, config.freeShippingThreshold - subtotal);
  const discountAmount = promoDiscount > 0 ? Math.round((subtotal * promoDiscount) / 100) : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'LEGACY10') {
      setPromoDiscount(10);
      setAppliedPromo('LEGACY10 (10% OFF)');
      setPromoError('');
    } else if (code === 'FESTIVE15') {
      setPromoDiscount(15);
      setAppliedPromo('FESTIVE15 (15% OFF)');
      setPromoError('');
    } else if (code === 'KAREMPUDI') {
      setPromoDiscount(20);
      setAppliedPromo('KAREMPUDI (20% OFF)');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try LEGACY10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f1118] border-l border-[#242738] shadow-2xl flex flex-col justify-between text-left">
          
          {/* Header */}
          <div className="p-5 border-b border-[#202330] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h3 className="font-cinzel text-lg font-bold text-white">Your Shopping Bag</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-bold">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-[#151722] px-5 py-3 border-b border-[#242838] text-xs">
            <div className="flex items-center justify-between text-zinc-300 mb-1.5 font-medium">
              {isFreeShipping ? (
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked FREE Nationwide Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#d4af37]">{formatINR(amountToFreeShipping)}</strong> more for FREE Shipping!
                </span>
              )}
              <span className="text-zinc-500 font-mono">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] to-amber-300 transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-800/80">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">Your bag is empty</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Explore Legacy Wear's new premium collections to add items.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider hover:opacity-90"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="pt-4 flex gap-3.5 items-start">
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 rounded-xl object-cover bg-black border border-zinc-800 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-white truncate pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        className="text-zinc-500 hover:text-rose-400 p-1 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Size: <span className="font-semibold text-zinc-200">{item.size}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-white">
                        {formatINR(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-700/80 rounded-lg bg-zinc-900 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-white font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 bg-[#0a0b0e] border-t border-[#202330] space-y-4">
              {/* Promo code */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. LEGACY10)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#141620] border border-zinc-800 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase transition"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="text-[11px] text-emerald-400 font-medium flex items-center justify-between">
                  <span>Coupon {appliedPromo} applied!</span>
                  <button
                    onClick={() => {
                      setPromoDiscount(0);
                      setAppliedPromo('');
                    }}
                    className="text-zinc-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <div className="text-[11px] text-rose-400">{promoError}</div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : formatINR(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount</span>
                  <span className="text-[#d4af37] text-base">{formatINR(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(discountAmount, appliedPromo);
                }}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b89528] text-black hover:opacity-95 shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant UPI • QR Pay • Direct WhatsApp Dispatch</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
