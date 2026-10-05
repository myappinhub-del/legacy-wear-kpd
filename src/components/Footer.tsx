import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Code
} from 'lucide-react';
import { Logo } from './Logo';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
  onOpenAdminLogin: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenAdminLogin,
  onNavigateSection
}) => {
  return (
    <footer className="bg-[#090a0d] border-t border-[#1c1e2b] text-zinc-400 text-xs text-left pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Col 1: Brand Logo & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <Logo
              onClick={onOpenAdminLogin}
              showTagline={false}
              size="lg"
            />
            <p className="font-serif italic text-sm text-[#d4af37]">
              {config.tagline || 'Timeless Style. Lasting Legacy.'}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Discover high-density streetwear, crafted hoodies, tailored twill shirts, and luxury casuals. Engineered for everyday comfort and lasting character.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-[#d4af37] transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('shop')}
                  className="hover:text-[#d4af37] transition"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('new-arrivals')}
                  className="hover:text-[#d4af37] transition"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('collections')}
                  className="hover:text-[#d4af37] transition"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-[#d4af37] transition"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contact')}
                  className="hover:text-[#d4af37] transition"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Customer Support</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => alert('FAQs: Orders dispatch within 24 hours from Karempudi. Express delivery across Andhra Pradesh & all India.')}
                  className="hover:text-[#d4af37] transition"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Shipping Policy: Free standard shipping on orders above ₹999.')}
                  className="hover:text-[#d4af37] transition"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Return & Exchange: 7-day hassle free exchange on unworn items with tags intact.')}
                  className="hover:text-[#d4af37] transition"
                >
                  Return & Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Privacy Policy: Customer information is kept confidential.')}
                  className="hover:text-[#d4af37] transition"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Terms & Conditions: Genuine 100% combed cotton apparel.')}
                  className="hover:text-[#d4af37] transition"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us & Payment Badges */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact Us</h4>
            <div className="space-y-2.5">
              <a
                href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 text-zinc-300 hover:text-[#d4af37] transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>{config.phone}</span>
              </a>

              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 text-zinc-300 hover:text-[#d4af37] transition"
              >
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="truncate">{config.email}</span>
              </a>

              <div className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <p>{config.address}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">India</p>
                </div>
              </div>
            </div>

            {/* Payment Gateway Logos matching mockup */}
            <div className="pt-3">
              <span className="text-[11px] text-zinc-500 block mb-1.5 font-medium">We Accept</span>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-zinc-800 text-white border border-zinc-700">
                  UPI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-950 text-blue-300 border border-blue-800">
                  VISA
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-950 text-red-300 border border-red-800">
                  Mastercard
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  RuPay
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching user picture */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span>Developed by</span>
            <Code className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-zinc-200 font-semibold">Shaik Abdul Shameem Althaf</span>
            <span className="text-zinc-600">/</span>
            <span>Website Developer</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Follow • Connect • Shop</span>
            <div className="flex items-center gap-2">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-[#d4af37] transition"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={config.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-[#d4af37] transition"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={config.xUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-[#d4af37] transition"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-emerald-400 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
