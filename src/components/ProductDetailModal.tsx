import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/helpers';

interface ProductDetailModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onBuyNow: (product: Product, size: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const allImages = [product.image, ...(product.additionalImages || [])];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleInstantBuy = () => {
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#11131b] border border-[#262a3b] rounded-3xl shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700/60 hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Left: Gallery */}
          <div className="flex flex-col space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black border border-zinc-800">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.isBestSeller && (
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] rounded-md">
                  Best Seller
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                      selectedImage === img
                        ? 'border-[#d4af37]'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Buying options */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                  {product.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-1">
                  {product.name}
                </h2>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <div className="flex items-center text-[#d4af37]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 font-bold text-white">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">{product.reviewCount} customer reviews</span>
                <span className="text-zinc-500">•</span>
                <span className="text-emerald-400 font-medium">Verified Legacy Quality</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-zinc-800/80">
                <span className="text-3xl font-extrabold text-white">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-zinc-500 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800 rounded">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="text-xs">
                {product.inStock ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock (Ready to Dispatch from Karempudi Store)
                  </span>
                ) : (
                  <span className="text-rose-500 font-semibold">Currently Out of Stock</span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications: Fabric & Fit */}
              {(product.fabric || product.fit) && (
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#171924] border border-[#292c3d] text-xs">
                  {product.fabric && (
                    <div>
                      <span className="text-zinc-400 block text-[11px]">Material & GSM</span>
                      <span className="font-semibold text-zinc-200">{product.fabric}</span>
                    </div>
                  )}
                  {product.fit && (
                    <div>
                      <span className="text-zinc-400 block text-[11px]">Silhoutte</span>
                      <span className="font-semibold text-zinc-200">{product.fit}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-zinc-200 uppercase tracking-wider">
                      Select Size:
                    </span>
                    <span className="text-[#d4af37] cursor-pointer hover:underline">
                      Standard Indian Size Chart
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[46px] py-2 px-3 text-xs font-bold rounded-lg border transition ${
                          selectedSize === sz
                            ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-md'
                            : 'bg-zinc-800 text-zinc-200 border-zinc-700 hover:border-zinc-500'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-zinc-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount || 10, quantity + 1))}
                    className="px-3 py-1 text-zinc-300 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions: Add to Cart, Buy Now, Wishlist */}
            <div className="space-y-3 pt-4 border-t border-zinc-800/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  disabled={!product.inStock}
                  onClick={handleAdd}
                  className={`py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>

                <button
                  disabled={!product.inStock}
                  onClick={handleInstantBuy}
                  className="py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#eab308] text-black hover:opacity-95 shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now with UPI</span>
                </button>
              </div>

              {/* Wishlist toggle */}
              <button
                onClick={() => onToggleWishlist(product)}
                className="w-full py-2.5 text-xs font-medium text-zinc-400 hover:text-white flex items-center justify-center gap-2 border border-zinc-800 rounded-xl hover:border-zinc-700 transition"
              >
                <Heart
                  className="w-4 h-4"
                  fill={isWishlisted ? 'red' : 'none'}
                  color={isWishlisted ? 'red' : 'currentColor'}
                />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-400 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#d4af37]" />
                  <span>Fast AP & All India Dispatch</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>100% Original Legacy Wear</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-[#d4af37]" />
                  <span>7-Day Easy Exchange</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
