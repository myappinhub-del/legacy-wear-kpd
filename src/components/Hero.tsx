import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Truck, Lock } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
  onShopClick: () => void;
  onExploreCollections: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  onShopClick,
  onExploreCollections
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0d12] via-[#0f1118] to-[#090a0d] border-b border-[#1f2230]">
      {/* Subtle ambient luxury gold glow in background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left z-10">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#fef08a] w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase">
                PREMIUM CLOTHING BRAND
              </span>
            </div>

            {/* Giant Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cinzel font-black tracking-wider text-white uppercase drop-shadow-md">
                {config.heroHeading || 'LEGACY WEAR'}
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-playfair italic text-[#d4af37] font-semibold">
                {config.heroSubtitle || 'Timeless Style. Lasting Legacy.'}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
              {config.heroDescription ||
                'Premium quality clothing for the modern generation. Style that speaks, comfort that stays.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide bg-gradient-to-r from-[#d4af37] via-[#f1d279] to-[#c5a059] text-black hover:opacity-95 shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreCollections}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-zinc-200 border border-zinc-700 hover:border-[#d4af37] hover:text-[#d4af37] bg-zinc-900/60 transition-all duration-200"
              >
                Explore Collections
              </button>
            </div>

            {/* 4 Trust Badges - precisely as in user mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[#d4af37]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-zinc-200">Premium</div>
                  <div className="text-[11px] text-zinc-400">Quality</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[#d4af37]">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-zinc-200">Trendy</div>
                  <div className="text-[11px] text-zinc-400">Designs</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[#d4af37]">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-zinc-200">Fast</div>
                  <div className="text-[11px] text-zinc-400">Delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[#d4af37]">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-zinc-200">Secure</div>
                  <div className="text-[11px] text-zinc-400">Payments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card with Script Overlay */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient luxury frame ring */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 group">
              <img
                src={
                  config.heroImage ||
                  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
                }
                alt="Legacy Wear Model"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient dark overlays for cinematic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Script Typography Overlay exactly as in image: "Wear Your Legacy" */}
              <div className="absolute top-8 right-6 z-20 pointer-events-none select-none text-right">
                <div
                  className="font-script text-4xl sm:text-5xl md:text-6xl text-white font-normal drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] transform -rotate-6"
                  style={{ fontFamily: "'Alex Brush', cursive" }}
                >
                  Wear Your
                  <br />
                  <span className="text-[#fef08a] pl-4">Legacy</span>
                </div>
              </div>

              {/* Bottom Badge details */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between backdrop-blur-md bg-black/60 border border-white/10 rounded-2xl p-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center">
                    <span className="font-cinzel text-xs font-black text-[#d4af37]">LW</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Autumn / Winter Edition</p>
                    <p className="text-[11px] text-zinc-300">Exclusive 380 GSM Heavyweight</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold text-black bg-[#d4af37] rounded-full uppercase tracking-wider">
                  HOT
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
