import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Bell,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck,
  Menu,
  X,
  Phone,
  SlidersHorizontal
} from 'lucide-react';
import { Logo } from './Logo';
import { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
  cartCount: number;
  wishlistCount: number;
  unreadNotifsCount: number;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenNotifs: () => void;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  cartCount,
  wishlistCount,
  unreadNotifsCount,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onOpenCart,
  onOpenWishlist,
  onOpenNotifs,
  onOpenSearch,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0a0b0e]/95 border-b border-[#222533] transition-colors">
      {/* Top Announcement Bar - exactly as in user photo */}
      <div className="bg-[#0e1017] border-b border-[#1c1f2b] text-[11px] sm:text-xs text-zinc-300 py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block animate-pulse">🚚</span>
            <span className="font-medium text-zinc-200">
              {config.announcementText || `Free Shipping on Orders Above ₹${config.freeShippingThreshold}`}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-zinc-400 font-serif italic text-xs">
            <span>Timeless Style. Lasting Legacy.</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline text-zinc-400">Follow Us</span>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-[#d4af37] transition-colors p-1"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={config.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-[#d4af37] transition-colors p-1"
              title="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={config.xUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-[#d4af37] transition-colors p-1"
              title="X (Twitter)"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with secret admin trigger */}
          <div className="flex items-center gap-3">
            <Logo
              onClick={onOpenAdminLogin}
              showTagline={false}
            />
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdminDashboard}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/25 transition"
                title="Open Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="font-semibold">Admin Mode</span>
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className="text-sm font-medium text-zinc-200 hover:text-[#d4af37] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-sm font-medium text-zinc-200 hover:text-[#d4af37] transition-colors"
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('new-arrivals')}
              className="text-sm font-medium text-zinc-200 hover:text-[#d4af37] transition-colors"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="text-sm font-medium text-zinc-200 hover:text-[#d4af37] transition-colors"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-sm font-medium text-zinc-200 hover:text-[#d4af37] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-sm font-medium text-zinc-200 hover:text-[#d4af37] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/50 rounded-full transition-all"
              title="Search collection"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button
              onClick={onOpenNotifs}
              className="relative p-2 text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/50 rounded-full transition-all"
              title="Order Updates & Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-black bg-[#d4af37] rounded-full animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/50 rounded-full transition-all"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-black bg-[#d4af37] rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#171923] hover:bg-[#202331] text-zinc-100 border border-[#2a2e40] px-3.5 py-2 rounded-full transition-all duration-200 group"
              title="View Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold text-zinc-200">Cart</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-black bg-[#d4af37] rounded-full">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1017] border-b border-[#252838] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 text-zinc-200 font-medium hover:text-[#d4af37]"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className="block w-full text-left py-2 text-zinc-200 font-medium hover:text-[#d4af37]"
          >
            Shop
          </button>
          <button
            onClick={() => handleNavClick('new-arrivals')}
            className="block w-full text-left py-2 text-zinc-200 font-medium hover:text-[#d4af37]"
          >
            New Arrivals
          </button>
          <button
            onClick={() => handleNavClick('collections')}
            className="block w-full text-left py-2 text-zinc-200 font-medium hover:text-[#d4af37]"
          >
            Collections
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 text-zinc-200 font-medium hover:text-[#d4af37]"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 text-zinc-200 font-medium hover:text-[#d4af37]"
          >
            Contact
          </button>
          {isAdminLoggedIn && (
            <button
              onClick={() => {
                onOpenAdminDashboard();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full py-2.5 px-3 rounded-lg bg-[#d4af37]/20 text-[#d4af37] font-semibold text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Open Admin Management Portal
            </button>
          )}
        </div>
      )}
    </header>
  );
};
