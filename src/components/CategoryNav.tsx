import React from 'react';
import { CATEGORIES } from '../data/initialData';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-left mb-8">
        <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wider uppercase">
          SHOP BY CATEGORY
        </h2>
        <p className="text-sm text-zinc-400 mt-1 font-sans">
          Find your perfect style
        </p>
      </div>

      {/* Categories grid/carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className={`group flex flex-col items-center rounded-2xl p-2.5 transition-all duration-300 border text-center ${
                isSelected
                  ? 'bg-[#1e202c] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-[#12141c] border-zinc-800/80 hover:border-zinc-600 hover:bg-[#181a24]'
              }`}
            >
              {/* Image Circle/Square */}
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-2.5 bg-zinc-900 border border-zinc-800/80 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#d4af37]/20 border-2 border-[#d4af37] rounded-xl pointer-events-none" />
                )}
              </div>

              {/* Label button */}
              <span
                className={`text-xs font-semibold tracking-wide transition-colors truncate w-full ${
                  isSelected
                    ? 'text-[#d4af37]'
                    : 'text-zinc-300 group-hover:text-white'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
