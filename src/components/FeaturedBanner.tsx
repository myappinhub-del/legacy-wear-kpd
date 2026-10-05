import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedBannerProps {
  onViewCollection: () => void;
}

export const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ onViewCollection }) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d0e14] via-[#151722] to-[#0c0d12] border border-[#262938] shadow-2xl">
        {/* Ambient gold glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#fef08a] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              FEATURED COLLECTION
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-wide leading-tight uppercase">
              Classic Looks
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fef08a] via-[#d4af37] to-[#eab308]">
                Modern Vibes
              </span>
            </h3>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-md leading-relaxed">
              Explore our latest collection of premium clothing, crafted for your everyday style. From heavy-knit hoodies to tailored twill shirts.
            </p>

            <div className="mt-8">
              <button
                onClick={onViewCollection}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89528] text-black hover:opacity-95 shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                <span>VIEW COLLECTION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Rack Mockup Image with Script Badge */}
          <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[360px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
              alt="Legacy Wear Classic Collection"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e14] via-transparent to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-transparent to-transparent lg:hidden block" />

            {/* Script Text Overlay: "Quality Style Legacy" */}
            <div className="absolute bottom-6 right-6 z-20 pointer-events-none select-none text-right">
              <div
                className="font-script text-3xl sm:text-4xl md:text-5xl text-white font-normal drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: "'Alex Brush', cursive" }}
              >
                Quality
                <br />
                <span className="text-[#fef08a] pl-2">Style</span>
                <br />
                <span className="text-[#d4af37] pl-4">Legacy</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
