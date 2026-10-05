import React from 'react';
import {
  MessageSquare,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ArrowRight
} from 'lucide-react';
import { SiteConfig } from '../types';

interface ConnectSectionProps {
  config: SiteConfig;
}

export const ConnectSection: React.FC<ConnectSectionProps> = ({ config }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Legacy Wear! I would like to inquire about your latest clothing collection.'
  )}`;

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Card 1: Connect With Us social links */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0f1118] border border-[#202330] p-6 text-left flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-white font-cinzel tracking-wider">
              Connect With Us
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Stay updated with our latest collections, offers and more!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#d4af37] text-xs font-semibold transition"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram</span>
            </a>

            <a
              href={config.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#d4af37] text-xs font-semibold transition"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-400" />
              <span>Facebook</span>
            </a>

            <a
              href={config.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#d4af37] text-xs font-semibold transition"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>YouTube</span>
            </a>

            <a
              href={config.xUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#d4af37] text-xs font-semibold transition"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-400" />
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>

        {/* Card 2: Chat on WhatsApp */}
        <div className="lg:col-span-3 rounded-2xl bg-gradient-to-br from-[#0c2e22] via-[#092219] to-[#061811] border border-emerald-900/60 p-6 text-left flex flex-col justify-between shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-base font-bold text-white font-cinzel">
                Chat on WhatsApp
              </h4>
              <p className="text-xs text-emerald-200/80 mt-1">
                Get quick support, place orders or ask anything!
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageSquare className="w-5 h-5 fill-emerald-500" />
            </div>
          </div>

          <div className="mt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition shadow"
            >
              <span>Chat Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 3: Follow on Instagram */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#4c1d2e] via-[#33111f] to-[#1e0711] border border-pink-900/50 p-6 text-left flex flex-col justify-between shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-base font-bold text-white font-cinzel">
                Follow on Instagram
              </h4>
              <p className="text-xs text-pink-200/80 mt-1">
                Daily outfits, reels & style inspiration.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
              <Instagram className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-6">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider transition shadow"
            >
              <span>Follow Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
