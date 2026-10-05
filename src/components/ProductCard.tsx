import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenQuickView
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.sizes.length > 1 && !showSizeSelector) {
      setShowSizeSelector(true);
      return;
    }
    executeAddToCart();
  };

  const executeAddToCart = () => {
    onAddToCart(product, selectedSize);
    setShowSizeSelector(false);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => onOpenQuickView(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#12141d] border border-[#212433] hover:border-[#d4af37]/60 p-3.5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      {/* Top Media & Badges */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 mb-3 border border-zinc-900">
        {/* Badges on Top Left */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-black bg-[#d4af37] rounded-md shadow-md">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white bg-emerald-600 rounded-md shadow-md">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button on Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-500/20 text-red-500 border border-red-500/40'
              : 'bg-black/50 text-zinc-300 hover:text-white border border-white/10 hover:bg-black/80'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className="w-4 h-4"
            fill={isWishlisted ? 'currentColor' : 'none'}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            Quick View
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-1 text-left">
        <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-[#d4af37] transition-colors truncate">
          {product.name}
        </h3>

        {/* Pricing line: Price + Original Price + Discount */}
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-base font-bold text-white tracking-tight">
            {formatINR(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-zinc-500 line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="text-[11px] font-semibold text-emerald-400">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Rating Line */}
        <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
          <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
          <span className="font-semibold text-zinc-200">{product.rating.toFixed(1)}</span>
          <span className="text-[11px] text-zinc-500">({product.reviewCount})</span>
        </div>

        {/* Stock Alert */}
        {!product.inStock ? (
          <div className="mt-2 text-xs font-semibold text-rose-500">
            Out of Stock
          </div>
        ) : product.stockCount <= 5 ? (
          <div className="mt-2 text-[11px] font-medium text-amber-400">
            Only {product.stockCount} left in stock!
          </div>
        ) : null}

        {/* Size Selection Drawer if active */}
        {showSizeSelector && product.inStock && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-3 p-2 rounded-xl bg-[#191b26] border border-[#2e3247] space-y-2 animate-fadeIn"
          >
            <div className="flex items-center justify-between text-[11px] text-zinc-300">
              <span>Select Size:</span>
              <button
                onClick={() => setShowSizeSelector(false)}
                className="text-zinc-500 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-all ${
                    selectedSize === sz
                      ? 'bg-[#d4af37] text-black border-[#d4af37]'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
            <button
              onClick={executeAddToCart}
              className="w-full mt-1 py-1.5 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90"
            >
              Confirm & Add ({selectedSize})
            </button>
          </div>
        )}

        {/* Add to Cart button matching user picture */}
        {!showSizeSelector && (
          <div className="mt-4 pt-1">
            <button
              disabled={!product.inStock}
              onClick={handleAddClick}
              className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 ${
                !product.inStock
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-800'
                  : addedAnimation
                  ? 'bg-emerald-600 text-white border border-emerald-500'
                  : 'bg-[#181a24] text-zinc-200 border border-[#2b2f42] hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] active:scale-95'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
