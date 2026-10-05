import React, { useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_CONFIG,
  INITIAL_REVIEWS,
  INITIAL_ORDERS
} from './data/initialData';
import { Product, CartItem, Order, SiteConfig, StoreReview, PushNotificationMessage } from './types';
import { THEMES } from './utils/theme';
import { sendPushNotification } from './utils/helpers';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { FeaturedBanner } from './components/FeaturedBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ConnectSection } from './components/ConnectSection';
import { StoreLocationReviews } from './components/StoreLocationReviews';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PushNotificationDrawer } from './components/PushNotificationDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  // Persistent States
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lw_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lw_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('lw_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [reviews, setReviews] = useState<StoreReview[]>(() => {
    const saved = localStorage.getItem('lw_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lw_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lw_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<PushNotificationMessage[]>(() => {
    const saved = localStorage.getItem('lw_notifs');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'init-notif',
            title: 'Welcome to Legacy Wear!',
            body: 'Explore our latest Winter & Heavyweight collections with free shipping above ₹999.',
            timestamp: '10:00 AM',
            read: false
          }
        ];
  });

  // UI Interactive States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Filtering
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lw_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lw_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lw_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('lw_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('lw_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lw_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lw_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Apply Theme CSS dynamic variables
  useEffect(() => {
    const currentTheme = THEMES[config.activeTheme] || THEMES.gold_luxury;
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', currentTheme.primary);
    root.style.setProperty('--brand-primary-hover', currentTheme.primaryHover);
    root.style.setProperty('--brand-accent', currentTheme.accent);
    root.style.setProperty('--brand-bg', currentTheme.bg);
    root.style.setProperty('--brand-card', currentTheme.card);
    root.style.setProperty('--brand-border', currentTheme.border);
    root.style.setProperty('--brand-text', currentTheme.text);
    root.style.setProperty('--brand-muted', currentTheme.muted);
    document.body.style.backgroundColor = currentTheme.bg;
  }, [config.activeTheme]);

  // Request Browser Notification Permission
  const handleRequestBrowserPermission = async () => {
    if ('Notification' in window) {
      const res = await Notification.requestPermission();
      if (res === 'granted') {
        const notif = await sendPushNotification(
          'Legacy Wear Alerts Enabled',
          'You will now receive instant push updates when orders are verified & shipped!'
        );
        setNotifications((prev) => [notif, ...prev]);
      }
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, size, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId && i.size === size) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'M', 1);
    handleToggleWishlist(product);
  };

  // Instant Buy Now
  const handleBuyNow = (product: Product, size: string, quantity: number) => {
    handleAddToCart(product, size, quantity);
    setSelectedProductForDetail(null);
    setIsCheckoutOpen(true);
  };

  // When order is placed by customer
  const handleOrderPlaced = async (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart

    // Push notification to user
    const notif = await sendPushNotification(
      `Order Confirmed #${newOrder.id}`,
      `Thank you ${newOrder.customer.name}! Total: ₹${newOrder.total}. Preparing at Karempudi store.`,
      newOrder.id
    );
    setNotifications((prev) => [notif, ...prev]);
  };

  // When admin updates order status in dashboard
  const handleOrderStatusNotification = async (order: Order, newStatus: string) => {
    const notif = await sendPushNotification(
      `Order #${order.id} Update: ${newStatus}`,
      `Your Legacy Wear order has moved to "${newStatus}". View tracking details via WhatsApp.`,
      order.id
    );
    setNotifications((prev) => [notif, ...prev]);
  };

  // Reviews
  const handleAddReview = (newRev: StoreReview) => {
    setReviews((prev) => [newRev, ...prev]);
  };

  // Navigation scroll
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'shop' || sectionId === 'new-arrivals') {
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
      if (sectionId === 'new-arrivals') {
        setSelectedCategory('all');
      }
    } else if (sectionId === 'collections') {
      document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'contact') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  // Filtered Products for Catalog
  const displayedProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0b0e] text-[#f3f4f6]">
      {/* Floating Admin Pill if logged in */}
      {isAdminLoggedIn && (
        <div className="fixed bottom-6 right-6 z-40 animate-pulse-glow">
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f1d279] to-[#c5a059] text-black font-extrabold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Admin Management Portal</span>
          </button>
        </div>
      )}

      {/* Header with Secret Admin Logo Trigger */}
      <Header
        config={config}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        unreadNotifsCount={unreadNotifsCount}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenNotifs={() => {
          setIsNotifsOpen(true);
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section matching user photo */}
        <Hero
          config={config}
          onShopClick={() => handleNavigateSection('shop')}
          onExploreCollections={() => handleNavigateSection('collections')}
        />

        {/* Categories Section */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
        />

        {/* Featured Collection Banner matching photo */}
        <div id="collections">
          <FeaturedBanner
            onViewCollection={() => handleNavigateSection('shop')}
          />
        </div>

        {/* Best Sellers & Product Catalog matching photo */}
        <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wider uppercase">
                  BEST SELLERS
                </h2>
                {selectedCategory !== 'all' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                    Category: {selectedCategory}
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-400 mt-1 font-sans">
                Customer favorites, always in style
              </p>
            </div>

            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(prod, size) => handleAddToCart(prod, size, 1)}
                onOpenQuickView={(prod) => setSelectedProductForDetail(prod)}
              />
            ))}
          </div>
        </section>

        {/* Connect With Us Section matching photo */}
        <ConnectSection config={config} />

        {/* Physical Store Location & Google Reviews (Challa Venkata Ramaiah, Mohammad Shavali) */}
        <StoreLocationReviews
          config={config}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      </main>

      {/* Footer matching user photo */}
      <Footer
        config={config}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* MODALS & DRAWERS */}
      
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isWishlisted={
          selectedProductForDetail
            ? wishlist.some((w) => w.id === selectedProductForDetail.id)
            : false
        }
        onClose={() => setSelectedProductForDetail(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        config={config}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={(discount, promo) => {
          setCheckoutDiscount(discount);
          setCheckoutPromoCode(promo);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        wishlist={wishlist}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* Checkout Modal with Secure UPI & Payment Gateway */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart}
        config={config}
        discount={checkoutDiscount}
        promoCodeName={checkoutPromoCode}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Secret Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsAdminLoginOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* Full Admin Management Portal */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={() => {
          setIsAdminLoggedIn(false);
          setIsAdminDashboardOpen(false);
        }}
        products={products}
        orders={orders}
        config={config}
        onUpdateProducts={(prods) => setProducts(prods)}
        onUpdateOrders={(ords) => setOrders(ords)}
        onUpdateConfig={(cfg) => setConfig(cfg)}
        onSendOrderStatusNotification={handleOrderStatusNotification}
      />

      {/* Push Notifications Drawer */}
      <PushNotificationDrawer
        isOpen={isNotifsOpen}
        notifications={notifications}
        onClose={() => setIsNotifsOpen(false)}
        onClearAll={() => setNotifications([])}
        onRequestBrowserPermission={handleRequestBrowserPermission}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        products={products}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProductForDetail(prod)}
      />
    </div>
  );
}
