import React, { useState } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/helpers';

interface SearchModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  products,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0f1118] border border-[#262a3d] rounded-3xl p-5 shadow-2xl text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
          <Search className="w-5 h-5 text-[#d4af37]" />
          <input
            type="text"
            placeholder="Search hoodies, t-shirts, shirts, jeans..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
          {results.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 text-xs">
              No matching products found for "{query}".
            </div>
          ) : (
            results.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="p-2.5 rounded-xl hover:bg-[#181a26] border border-transparent hover:border-zinc-800 cursor-pointer flex items-center justify-between gap-4 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    alt=""
                    className="w-12 h-14 rounded-lg object-cover bg-black shrink-0"
                  />
                  <div className="truncate">
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                      {p.name}
                    </h4>
                    <span className="text-[11px] text-[#d4af37] font-bold">
                      {formatINR(p.price)}
                    </span>
                    <span className="text-[10px] text-zinc-400 ml-2">({p.category})</span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
