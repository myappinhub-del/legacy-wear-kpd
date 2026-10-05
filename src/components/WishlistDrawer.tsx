import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/helpers';

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlist: Product[];
  onClose: () => void;
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  wishlist,
  onClose,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f1118] border-l border-[#242738] shadow-2xl flex flex-col justify-between text-left">
          
          {/* Header */}
          <div className="p-5 border-b border-[#202330] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <h3 className="font-cinzel text-lg font-bold text-white">Your Wishlist</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-bold">
                {wishlist.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-3">
                <Heart className="w-12 h-12 text-zinc-700" />
                <p className="text-base font-semibold text-white">Your wishlist is empty</p>
                <p className="text-xs text-zinc-500">
                  Tap the heart icon on any product to save it here for later.
                </p>
              </div>
            ) : (
              wishlist.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-2xl bg-[#141620] border border-[#242839] flex gap-3.5 items-center justify-between"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-16 h-20 rounded-xl object-cover bg-black border border-zinc-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                    <p className="text-xs font-bold text-[#d4af37] mt-1">{formatINR(prod.price)}</p>
                    <span className="text-[10px] text-zinc-400">{prod.category}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onMoveToCart(prod)}
                      className="p-2 rounded-lg bg-[#d4af37] text-black hover:opacity-90 transition"
                      title="Move to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(prod.id)}
                      className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-rose-400 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom */}
          <div className="p-4 border-t border-[#202330] bg-[#0c0d12]">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase transition"
            >
              Back to Catalog
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
