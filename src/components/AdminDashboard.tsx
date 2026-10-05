import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Palette,
  MessageSquare,
  Upload,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Copy,
  DollarSign,
  Users,
  Search,
  RefreshCw,
  LogOut,
  ExternalLink,
  Sparkles,
  Camera,
  Check,
  AlertCircle,
  Inbox,
  PackageCheck,
  Layers,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Product, Order, SiteConfig, ThemeType } from '../types';
import { formatINR, getWhatsAppCustomerUrl } from '../utils/helpers';
import { THEMES } from '../utils/theme';
import { CATEGORIES } from '../data/initialData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  products: Product[];
  orders: Order[];
  config: SiteConfig;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onUpdateConfig: (config: SiteConfig) => void;
  onSendOrderStatusNotification: (order: Order, newStatus: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onLogout,
  products,
  orders,
  config,
  onUpdateProducts,
  onUpdateOrders,
  onUpdateConfig,
  onSendOrderStatusNotification
}) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'orders' | 'inventory' | 'theme'>('sales');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStageFilter, setOrderStageFilter] = useState<'ALL' | Order['orderStatus']>('ALL');
  const [orderViewMode, setOrderViewMode] = useState<'pipeline_grouped' | 'tab_filtered'>('pipeline_grouped');
  const [productSearchQuery, setProductSearchQuery] = useState('');

  // Editing product modal / state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNewProduct, setIsCreatingNewProduct] = useState(false);

  // Form states for new/editing product
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState(999);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(1499);
  const [prodCategory, setProdCategory] = useState("Men's Wear");
  const [prodImage, setProdImage] = useState('');
  const [prodStock, setProdStock] = useState(25);
  const [prodInStock, setProdInStock] = useState(true);
  const [prodDesc, setProdDesc] = useState('');
  const [prodSizes, setProdSizes] = useState('S, M, L, XL');
  const [prodIsBestSeller, setProdIsBestSeller] = useState(false);
  const [prodIsNew, setProdIsNew] = useState(false);

  // Config editing state
  const [siteConfigState, setSiteConfigState] = useState<SiteConfig>(config);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Real-time sales analytics
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Order Placed' || o.orderStatus === 'Confirmed').length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const totalItemsSold = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0), 0);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const q = orderSearchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.phone.includes(q) ||
      o.customer.city.toLowerCase().includes(q)
    );
  });

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const q = productSearchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  // Handle Order Status Change
  const handleOrderStatusChange = (orderId: string, newStatus: Order['orderStatus']) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        const orderUpdated: Order = {
          ...o,
          orderStatus: newStatus,
          updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        onSendOrderStatusNotification(orderUpdated, newStatus);
        return orderUpdated;
      }
      return o;
    });
    onUpdateOrders(updated);
  };

  // Direct image file upload for product
  const handleProductImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Direct image file upload for hero
  const handleHeroImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteConfigState((prev) => ({
          ...prev,
          heroImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Direct QR Code file upload
  const handleQrImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteConfigState((prev) => ({
          ...prev,
          upiQrCodeImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdPrice(999);
    setProdOriginalPrice(1499);
    setProdCategory('Hoodies');
    setProdImage('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80');
    setProdStock(20);
    setProdInStock(true);
    setProdDesc('Crafted with premium heavyweight cotton fabric.');
    setProdSizes('S, M, L, XL, XXL');
    setProdIsBestSeller(false);
    setProdIsNew(true);
    setIsCreatingNewProduct(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdPrice(prod.price);
    setProdOriginalPrice(prod.originalPrice);
    setProdCategory(prod.category);
    setProdImage(prod.image);
    setProdStock(prod.stockCount);
    setProdInStock(prod.inStock);
    setProdDesc(prod.description);
    setProdSizes(prod.sizes.join(', '));
    setProdIsBestSeller(!!prod.isBestSeller);
    setProdIsNew(!!prod.isNew);
    setIsCreatingNewProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discountCalc =
      prodOriginalPrice > prodPrice
        ? Math.round(((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100)
        : 0;

    const sizesArr = prodSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      // update
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: prodName,
              price: Number(prodPrice),
              originalPrice: Number(prodOriginalPrice),
              discountPercent: discountCalc,
              category: prodCategory,
              image: prodImage,
              stockCount: Number(prodStock),
              inStock: prodInStock,
              description: prodDesc,
              sizes: sizesArr.length > 0 ? sizesArr : ['M', 'L'],
              isBestSeller: prodIsBestSeller,
              isNew: prodIsNew
            }
          : p
      );
      onUpdateProducts(updated);
    } else {
      // create new
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        name: prodName,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        discountPercent: discountCalc,
        rating: 5.0,
        reviewCount: 1,
        category: prodCategory,
        image:
          prodImage ||
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        stockCount: Number(prodStock),
        inStock: prodInStock,
        description: prodDesc,
        sizes: sizesArr.length > 0 ? sizesArr : ['S', 'M', 'L', 'XL'],
        isBestSeller: prodIsBestSeller,
        isNew: prodIsNew
      };
      onUpdateProducts([newProd, ...products]);
    }

    setIsCreatingNewProduct(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product from inventory?')) {
      onUpdateProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(siteConfigState);
    setSaveSuccessMsg('Website configuration, themes, & store info saved successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#08090d] text-white flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Admin Header Bar */}
      <div className="h-16 px-6 bg-[#0f1118] border-b border-[#222536] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] font-bold text-xs font-cinzel">
            LW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-cinzel font-bold text-base tracking-wider text-white">
                Legacy Wear Management Portal
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d4af37] text-black uppercase">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Karempudi & Vinukonda Store Dashboard • Real-time Sync
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="hidden md:flex items-center gap-1 bg-[#161824] p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'sales'
                ? 'bg-[#d4af37] text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Sales Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition relative ${
              activeTab === 'orders'
                ? 'bg-[#d4af37] text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Live Orders</span>
            {pendingOrdersCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-black">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'inventory'
                ? 'bg-[#d4af37] text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'theme'
                ? 'bg-[#d4af37] text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme & Website Editor</span>
          </button>
        </div>

        {/* Top Right Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition"
          >
            View Live Site
          </button>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800 text-rose-300 transition"
            title="Log Out Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Tab Strip */}
      <div className="md:hidden flex border-b border-[#222536] bg-[#0c0d13] overflow-x-auto p-1.5 text-xs">
        <button
          onClick={() => setActiveTab('sales')}
          className={`flex-1 py-1.5 px-2 text-center whitespace-nowrap rounded ${
            activeTab === 'sales' ? 'bg-[#d4af37] text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Reports
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-1.5 px-2 text-center whitespace-nowrap rounded ${
            activeTab === 'orders' ? 'bg-[#d4af37] text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-1.5 px-2 text-center whitespace-nowrap rounded ${
            activeTab === 'inventory' ? 'bg-[#d4af37] text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-1.5 px-2 text-center whitespace-nowrap rounded ${
            activeTab === 'theme' ? 'bg-[#d4af37] text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Theme / Edit
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        {/* ================= TAB 1: SALES REPORTS & ANALYTICS ================= */}
        {activeTab === 'sales' && (
          <div className="max-w-7xl mx-auto space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                  Real-Time Sales & Revenue Analytics
                </h3>
                <p className="text-xs text-zinc-400">
                  Tracking live orders, UPI payments, and customer conversions.
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Feed
              </span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#12141e] border border-[#232738] shadow-lg">
                <div className="flex items-center justify-between text-zinc-400 text-xs">
                  <span>Gross Sales</span>
                  <DollarSign className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-2">
                  {formatINR(totalRevenue)}
                </div>
                <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
                  ↑ +18.4% this week
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#12141e] border border-[#232738] shadow-lg">
                <div className="flex items-center justify-between text-zinc-400 text-xs">
                  <span>Total Orders</span>
                  <ShoppingBag className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-2">
                  {totalOrdersCount}
                </div>
                <span className="text-[11px] text-zinc-400 mt-1 block">
                  {pendingOrdersCount} awaiting dispatch
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#12141e] border border-[#232738] shadow-lg">
                <div className="flex items-center justify-between text-zinc-400 text-xs">
                  <span>Average Order Value</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-[#d4af37] mt-2">
                  {formatINR(averageOrderValue)}
                </div>
                <span className="text-[11px] text-zinc-400 mt-1 block">Per customer cart</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#12141e] border border-[#232738] shadow-lg">
                <div className="flex items-center justify-between text-zinc-400 text-xs">
                  <span>Items Dispatched</span>
                  <Package className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-2">
                  {totalItemsSold} Units
                </div>
                <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
                  High Demand in Guntur & AP
                </span>
              </div>
            </div>

            {/* Sales Chart / Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 rounded-3xl bg-[#12141e] border border-[#232738] space-y-4">
                <h4 className="text-sm font-bold text-white font-cinzel">
                  Weekly Sales Volume & Performance
                </h4>

                {/* Simulated Visual Bar Graph */}
                <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2 border-b border-zinc-800">
                  {[
                    { day: 'Mon', amount: 3290, pct: 45 },
                    { day: 'Tue', amount: 5490, pct: 65 },
                    { day: 'Wed', amount: 4890, pct: 58 },
                    { day: 'Thu', amount: 6200, pct: 75 },
                    { day: 'Fri', amount: 7900, pct: 90 },
                    { day: 'Sat', amount: 9400, pct: 100 },
                    { day: 'Sun', amount: 8200, pct: 88 }
                  ].map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full bg-[#181a26] rounded-t-lg relative flex items-end justify-center h-36">
                        <div
                          className="w-full bg-gradient-to-t from-[#b89528] to-[#d4af37] rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                          style={{ height: `${d.pct}%` }}
                        />
                        <span className="absolute -top-7 opacity-0 group-hover:opacity-100 text-[10px] font-mono text-[#d4af37] bg-black px-1.5 py-0.5 rounded shadow pointer-events-none transition">
                          {formatINR(d.amount)}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400">{d.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
                  <span>Peak Ordering Time: 7:00 PM – 10:30 PM IST</span>
                  <span className="text-[#d4af37] font-semibold">UPI Payment Success: 99.4%</span>
                </div>
              </div>

              {/* Top Selling Products */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-[#12141e] border border-[#232738] space-y-4">
                <h4 className="text-sm font-bold text-white font-cinzel">Top Selling Styles</h4>
                <div className="space-y-3">
                  {products.slice(0, 4).map((p, idx) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-zinc-500 w-4">#{idx + 1}</span>
                      <img
                        src={p.image}
                        alt=""
                        className="w-10 h-12 rounded-lg object-cover bg-black"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                        <p className="text-[11px] text-[#d4af37]">{formatINR(p.price)}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {p.stockCount} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ORDERS & WHATSAPP DISPATCH ================= */}
        {activeTab === 'orders' && (() => {
          const ORDER_STAGES: {
            status: Order['orderStatus'];
            label: string;
            step: number;
            description: string;
            badgeClass: string;
            borderClass: string;
            accentClass: string;
            bgClass: string;
            nextStatus?: Order['orderStatus'];
            nextActionLabel?: string;
          }[] = [
            {
              status: 'Order Placed',
              label: 'Order Placed',
              step: 1,
              description: 'New orders directly from checkout. Awaiting verification.',
              badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
              borderClass: 'border-amber-600/40 hover:border-amber-500',
              accentClass: 'text-amber-400',
              bgClass: 'bg-amber-500/5',
              nextStatus: 'Confirmed',
              nextActionLabel: 'Verify & Confirm'
            },
            {
              status: 'Confirmed',
              label: 'Confirmed',
              step: 2,
              description: 'Payment verified. Items being packed at Karempudi store.',
              badgeClass: 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/50',
              borderClass: 'border-[#d4af37]/40 hover:border-[#d4af37]',
              accentClass: 'text-[#d4af37]',
              bgClass: 'bg-[#d4af37]/5',
              nextStatus: 'Dispatched',
              nextActionLabel: 'Dispatch Courier'
            },
            {
              status: 'Dispatched',
              label: 'Dispatched',
              step: 3,
              description: 'Handed over to courier partner. On the road with tracking ID.',
              badgeClass: 'bg-sky-950/80 text-sky-300 border-sky-800',
              borderClass: 'border-sky-600/40 hover:border-sky-500',
              accentClass: 'text-sky-400',
              bgClass: 'bg-sky-500/5',
              nextStatus: 'Out for Delivery',
              nextActionLabel: 'Out for Delivery'
            },
            {
              status: 'Out for Delivery',
              label: 'Out for Delivery',
              step: 4,
              description: 'Courier agent is out for final doorstep delivery to customer.',
              badgeClass: 'bg-purple-950/80 text-purple-300 border-purple-800',
              borderClass: 'border-purple-600/40 hover:border-purple-500',
              accentClass: 'text-purple-400',
              bgClass: 'bg-purple-500/5',
              nextStatus: 'Delivered',
              nextActionLabel: 'Mark Delivered'
            },
            {
              status: 'Delivered',
              label: 'Delivered',
              step: 5,
              description: 'Successfully received by buyer. Order fulfilled.',
              badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
              borderClass: 'border-emerald-600/40 hover:border-emerald-500',
              accentClass: 'text-emerald-400',
              bgClass: 'bg-emerald-500/5'
            },
            {
              status: 'Cancelled',
              label: 'Cancelled',
              step: 6,
              description: 'Order cancelled by customer or rejected. No parcel sent.',
              badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-800',
              borderClass: 'border-rose-600/40 hover:border-rose-500',
              accentClass: 'text-rose-400',
              bgClass: 'bg-rose-500/5'
            }
          ];

          // Compute metrics per stage
          const stageMetrics = ORDER_STAGES.map((stg) => {
            const stageOrders = orders.filter((o) => o.orderStatus === stg.status);
            const count = stageOrders.length;
            const totalVal = stageOrders.reduce((sum, o) => sum + o.total, 0);
            return {
              ...stg,
              count,
              totalVal,
              orders: stageOrders
            };
          });

          // Helper to render an individual order card
          const renderOrderCard = (order: Order, stageDef?: typeof ORDER_STAGES[0]) => {
            const whatsappLink = getWhatsAppCustomerUrl(order, config.phone);
            const currentStage = stageDef || ORDER_STAGES.find((s) => s.status === order.orderStatus);

            return (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-3xl bg-[#12141e] border border-[#232738] space-y-4 shadow-xl hover:border-zinc-700 transition"
              >
                {/* Top Bar of Order */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-cinzel text-base font-bold text-white">
                      #{order.id}
                    </span>
                    <span className="text-xs text-zinc-400">{order.date}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        currentStage?.badgeClass || 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      Stage {currentStage?.step}: {order.orderStatus}
                    </span>
                  </div>

                  {/* Status Dropdown Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">Change Status:</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleOrderStatusChange(
                          order.id,
                          e.target.value as Order['orderStatus']
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Order Placed">1. Order Placed</option>
                      <option value="Confirmed">2. Confirmed</option>
                      <option value="Dispatched">3. Dispatched</option>
                      <option value="Out for Delivery">4. Out for Delivery</option>
                      <option value="Delivered">5. Delivered</option>
                      <option value="Cancelled">6. Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Middle: Customer Details, Items, and Payment Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                  {/* Customer Information */}
                  <div className="md:col-span-4 p-4 rounded-2xl bg-[#171926] border border-[#272b3d] space-y-2">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block">
                      Customer & Delivery Details
                    </span>
                    <p className="text-sm font-bold text-white">{order.customer.name}</p>
                    <div className="text-zinc-300">
                      <strong>Phone:</strong> +91 {order.customer.phone}
                    </div>
                    {order.customer.email && (
                      <div className="text-zinc-400">
                        <strong>Email:</strong> {order.customer.email}
                      </div>
                    )}
                    <div className="text-zinc-300 pt-1 border-t border-zinc-800">
                      <strong className="block text-zinc-400 text-[11px]">Address:</strong>
                      <p className="mt-0.5 leading-relaxed">
                        {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                      </p>
                    </div>
                  </div>

                  {/* Ordered Items */}
                  <div className="md:col-span-5 space-y-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Items Ordered ({order.items.length})
                    </span>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800"
                        >
                          <img
                            src={item.product.image}
                            alt=""
                            className="w-10 h-12 rounded object-cover bg-black"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white truncate">{item.product.name}</p>
                            <p className="text-zinc-400 text-[11px]">
                              Size: <strong className="text-white">{item.size}</strong> • Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="font-bold text-white">
                            {formatINR(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment & Action */}
                  <div className="md:col-span-3 p-4 rounded-2xl bg-[#171926] border border-[#272b3d] flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                        Payment & Verification
                      </span>
                      <div className="text-lg font-cinzel font-bold text-white mt-1">
                        {formatINR(order.total)}
                      </div>
                      <div className="text-zinc-400 text-[11px] mt-1">
                        Method: <strong className="text-white">{order.paymentMethod}</strong>
                      </div>
                      {order.utrReference && (
                        <div className="text-zinc-400 text-[11px]">
                          UTR: <span className="font-mono text-[#d4af37]">{order.utrReference}</span>
                        </div>
                      )}
                      {order.paymentScreenshot && (
                        <a
                          href={order.paymentScreenshot}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-2 text-xs text-sky-400 hover:underline"
                        >
                          View Payment Screenshot Proof
                        </a>
                      )}
                    </div>

                    {/* Stage Quick Advance Button */}
                    <div className="space-y-2 pt-1 border-t border-zinc-800">
                      {currentStage?.nextStatus && (
                        <button
                          onClick={() => handleOrderStatusChange(order.id, currentStage.nextStatus!)}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#eab308] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow flex items-center justify-center gap-1.5 transition active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{currentStage.nextActionLabel || `Move to ${currentStage.nextStatus}`}</span>
                        </button>
                      )}

                      {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && (
                        <button
                          onClick={() => {
                            if (confirm(`Cancel order #${order.id}?`)) {
                              handleOrderStatusChange(order.id, 'Cancelled');
                            }
                          }}
                          className="w-full py-1 text-[11px] text-zinc-400 hover:text-rose-400 transition"
                        >
                          ✕ Cancel Order
                        </button>
                      )}

                      {/* Direct WhatsApp Action Button */}
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-black" />
                        <span>Send WhatsApp Update</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          };

          return (
            <div className="max-w-7xl mx-auto space-y-6 text-left">
              {/* Header with Title and Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                    Live Order Pipeline & Stages
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Track orders step-by-step from <strong>Order Placed</strong> to <strong>Cancelled</strong> for rapid analysis and dispatch.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Search ID, customer, phone..."
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#141622] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-[#141622] p-1 rounded-xl border border-zinc-800 shrink-0">
                    <button
                      onClick={() => setOrderViewMode('pipeline_grouped')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        orderViewMode === 'pipeline_grouped'
                          ? 'bg-[#d4af37] text-black shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Grouped stage sections"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Divided Pipeline</span>
                    </button>
                    <button
                      onClick={() => setOrderViewMode('tab_filtered')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        orderViewMode === 'tab_filtered'
                          ? 'bg-[#d4af37] text-black shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Single stage focus view"
                    >
                      <Filter className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Stage Tabs</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 6-Stage Interactive Visual Pipeline Funnel Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {stageMetrics.map((stage) => {
                  const isSelected = orderStageFilter === stage.status;

                  return (
                    <button
                      key={stage.status}
                      onClick={() => {
                        setOrderStageFilter(isSelected ? 'ALL' : stage.status);
                        if (orderViewMode === 'tab_filtered' && isSelected) {
                          setOrderStageFilter('ALL');
                        }
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? `bg-[#1a1d2c] ${stage.borderClass} border-2 shadow-[0_0_15px_rgba(212,175,55,0.25)]`
                          : 'bg-[#12141e] border-zinc-800/80 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                          Stage {stage.step}
                        </span>
                        <span
                          className={`min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full flex items-center justify-center border ${
                            stage.count > 0 ? stage.badgeClass : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                          }`}
                        >
                          {stage.count}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white truncate">{stage.label}</h4>
                        <div className="text-xs font-bold text-[#d4af37] mt-0.5">
                          {formatINR(stage.totalVal)}
                        </div>
                      </div>

                      {/* Active indicator dot */}
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#d4af37] border-2 border-black" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Tab Pills in Tab Filtered Mode */}
              {orderViewMode === 'tab_filtered' && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <button
                    onClick={() => setOrderStageFilter('ALL')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition border ${
                      orderStageFilter === 'ALL'
                        ? 'bg-[#d4af37] text-black border-[#d4af37]'
                        : 'bg-[#141622] text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    All Orders ({orders.length})
                  </button>
                  {ORDER_STAGES.map((s) => (
                    <button
                      key={s.status}
                      onClick={() => setOrderStageFilter(s.status)}
                      className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition border flex items-center gap-1.5 ${
                        orderStageFilter === s.status
                          ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold'
                          : 'bg-[#141622] text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      <span>Stage {s.step}: {s.label}</span>
                      <span className="text-[10px] px-1 rounded bg-black/40">
                        {orders.filter((o) => o.orderStatus === s.status).length}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* ================= VIEW 1: DIVIDED PIPELINE STAGES (GROUPED BY STATUS) ================= */}
              {orderViewMode === 'pipeline_grouped' && (
                <div className="space-y-8">
                  {ORDER_STAGES.filter((stg) =>
                    orderStageFilter === 'ALL' ? true : stg.status === orderStageFilter
                  ).map((stage) => {
                    const stageOrders = filteredOrders.filter(
                      (o) => o.orderStatus === stage.status
                    );

                    return (
                      <div
                        key={stage.status}
                        className="rounded-3xl bg-[#0f111a] border border-[#222638] overflow-hidden shadow-xl"
                      >
                        {/* Stage Section Header Banner */}
                        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#151724] via-[#12141e] to-[#0f111a] border-b border-[#222638] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-xs font-mono text-[#d4af37]">
                              0{stage.step}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-base font-cinzel font-bold text-white">
                                  {stage.label}
                                </h4>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${stage.badgeClass}`}
                                >
                                  {stageOrders.length} {stageOrders.length === 1 ? 'Order' : 'Orders'}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 mt-0.5">
                                {stage.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[11px] text-zinc-400 block">Stage Revenue</span>
                            <span className="text-base font-cinzel font-bold text-[#d4af37]">
                              {formatINR(stageOrders.reduce((sum, o) => sum + o.total, 0))}
                            </span>
                          </div>
                        </div>

                        {/* Stage Orders Container */}
                        <div className="p-4 sm:p-6 space-y-4">
                          {stageOrders.length === 0 ? (
                            <div className="py-8 px-4 rounded-2xl bg-zinc-900/30 border border-dashed border-zinc-800 text-center text-xs text-zinc-500">
                              No orders currently in <strong>{stage.label}</strong> stage.
                            </div>
                          ) : (
                            stageOrders.map((order) => renderOrderCard(order, stage))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ================= VIEW 2: TAB FILTERED VIEW ================= */}
              {orderViewMode === 'tab_filtered' && (
                <div className="space-y-4">
                  {(() => {
                    const activeOrders = filteredOrders.filter((o) =>
                      orderStageFilter === 'ALL' ? true : o.orderStatus === orderStageFilter
                    );

                    if (activeOrders.length === 0) {
                      return (
                        <div className="p-12 text-center text-zinc-400 rounded-3xl bg-[#12141e] border border-[#232738]">
                          No orders match the selected stage filter ({orderStageFilter}).
                        </div>
                      );
                    }

                    return activeOrders.map((order) => renderOrderCard(order));
                  })()}
                </div>
              )}
            </div>
          );
        })()}

        {/* ================= TAB 3: INVENTORY MANAGEMENT ================= */}
        {activeTab === 'inventory' && (
          <div className="max-w-7xl mx-auto space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                  Inventory & Product Management
                </h3>
                <p className="text-xs text-zinc-400">
                  Update product prices, availability, add photos directly from your files, and create new apparel lines.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#141622] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  onClick={openNewProductModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#eab308] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
            </div>

            {/* Products Table/Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl bg-[#12141e] border border-[#232738] p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black border border-zinc-800">
                    <img src={prod.image} alt="" className="w-full h-full object-cover" />
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        prod.inStock
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {prod.inStock ? `${prod.stockCount} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest">
                      {prod.category}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate">{prod.name}</h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-bold text-white">
                        {formatINR(prod.price)}
                      </span>
                      {prod.originalPrice > prod.price && (
                        <span className="text-xs text-zinc-500 line-through">
                          {formatINR(prod.originalPrice)}
                        </span>
                      )}
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        {prod.discountPercent}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                    <button
                      onClick={() => openEditProductModal(prod)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800 text-rose-300 transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: THEME & WEBSITE CUSTOMIZER ================= */}
        {activeTab === 'theme' && (
          <div className="max-w-5xl mx-auto space-y-6 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                Website Theme & Storefront Customizer
              </h3>
              <p className="text-xs text-zinc-400">
                Change site colors and themes, upload hero photos directly from files, update UPI payment details, and configure store contact info.
              </p>
            </div>

            {saveSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveSiteConfig} className="space-y-6">
              
              {/* Theme Picker */}
              <div className="p-6 rounded-3xl bg-[#12141e] border border-[#232738] space-y-4">
                <h4 className="text-sm font-bold text-white font-cinzel flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#d4af37]" />
                  <span>Choose Store Theme & Visual Identity</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(Object.keys(THEMES) as ThemeType[]).map((thmKey) => {
                    const thm = THEMES[thmKey];
                    const isSelected = siteConfigState.activeTheme === thmKey;

                    return (
                      <button
                        type="button"
                        key={thmKey}
                        onClick={() =>
                          setSiteConfigState({ ...siteConfigState, activeTheme: thmKey })
                        }
                        className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? 'bg-[#1b1e2c] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                            : 'bg-[#151722] border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{thm.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#d4af37]" />}
                        </div>
                        <span className="text-[11px] text-zinc-400">{thm.badge}</span>
                        <div className="flex items-center gap-2 pt-1">
                          <span
                            className="w-5 h-5 rounded-full border border-black/40"
                            style={{ backgroundColor: thm.primary }}
                          />
                          <span
                            className="w-5 h-5 rounded-full border border-black/40"
                            style={{ backgroundColor: thm.accent }}
                          />
                          <span
                            className="w-5 h-5 rounded-full border border-zinc-700"
                            style={{ backgroundColor: thm.bg }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hero Banner Editor & Direct File Upload */}
              <div className="p-6 rounded-3xl bg-[#12141e] border border-[#232738] space-y-4">
                <h4 className="text-sm font-bold text-white font-cinzel flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#d4af37]" />
                  <span>Hero Section Headlines & Model Photo</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Main Brand Headline
                    </label>
                    <input
                      type="text"
                      value={siteConfigState.heroHeading}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, heroHeading: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Hero Subtitle / Slogan
                    </label>
                    <input
                      type="text"
                      value={siteConfigState.heroSubtitle}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, heroSubtitle: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Hero Description
                  </label>
                  <textarea
                    rows={2}
                    value={siteConfigState.heroDescription}
                    onChange={(e) =>
                      setSiteConfigState({ ...siteConfigState, heroDescription: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                {/* Hero Image direct file upload */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Hero Photo (Direct Upload from Device or Image URL)
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 text-xs font-semibold transition">
                      <Upload className="w-4 h-4 text-[#d4af37]" />
                      <span>Upload Photo from Files</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-zinc-500 text-xs">or paste URL:</span>
                    <input
                      type="text"
                      value={siteConfigState.heroImage}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, heroImage: e.target.value })
                      }
                      placeholder="https://..."
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  {siteConfigState.heroImage && (
                    <div className="mt-3 w-32 h-40 rounded-xl overflow-hidden border border-zinc-700">
                      <img
                        src={siteConfigState.heroImage}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* UPI & Payment Settings */}
              <div className="p-6 rounded-3xl bg-[#12141e] border border-[#232738] space-y-4">
                <h4 className="text-sm font-bold text-white font-cinzel">
                  Integrated UPI Payment Gateway Settings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Store UPI ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={siteConfigState.upiId}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, upiId: e.target.value })
                      }
                      placeholder="8179176914@ybl"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                    />
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      Money from customer checkout goes directly to this UPI account.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Payee Display Name
                    </label>
                    <input
                      type="text"
                      value={siteConfigState.upiPayeeName}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, upiPayeeName: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Upload Custom QR */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Upload Custom UPI QR Code Image (Optional)
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-medium hover:border-zinc-500">
                    <Upload className="w-4 h-4 text-[#d4af37]" />
                    <span>Upload QR Image from Files</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQrImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Location, WhatsApp & Social Links */}
              <div className="p-6 rounded-3xl bg-[#12141e] border border-[#232738] space-y-4">
                <h4 className="text-sm font-bold text-white font-cinzel">
                  Store Contact, Location & Social Links
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Store Address (Google Maps location)
                    </label>
                    <input
                      type="text"
                      value={siteConfigState.address}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, address: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Plus Code / Pin
                    </label>
                    <input
                      type="text"
                      value={siteConfigState.plusCode}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, plusCode: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      WhatsApp Business Phone (e.g. 918179176914)
                    </label>
                    <input
                      type="text"
                      value={siteConfigState.whatsappNumber}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, whatsappNumber: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="text"
                      value={siteConfigState.instagramUrl}
                      onChange={(e) =>
                        setSiteConfigState({ ...siteConfigState, instagramUrl: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={siteConfigState.announcementText}
                    onChange={(e) =>
                      setSiteConfigState({ ...siteConfigState, announcementText: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs"
                  />
                </div>
              </div>

              {/* Save changes button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#eab308] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save All Website Customizations</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      {isCreatingNewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#12141e] border border-[#272b3d] rounded-3xl p-6 sm:p-8 text-left shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="font-cinzel text-lg font-bold text-white">
                {editingProduct ? 'Edit Inventory Item' : 'Add New Apparel to Inventory'}
              </h4>
              <button
                onClick={() => setIsCreatingNewProduct(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LV Heavyweight Winter Hoodie"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={prodSizes}
                    onChange={(e) => setProdSizes(e.target.value)}
                    placeholder="S, M, L, XL, XXL"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Direct image upload for product from files */}
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Product Image (Upload directly from files or enter URL) *
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 text-xs font-semibold">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageFileUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    placeholder="or paste image URL"
                    className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none"
                  />
                </div>
                {prodImage && (
                  <div className="mt-2 w-20 h-24 rounded-lg overflow-hidden border border-zinc-700">
                    <img src={prodImage} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodInStock}
                    onChange={(e) => setProdInStock(e.target.checked)}
                    className="accent-[#d4af37]"
                  />
                  <span>Mark In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsBestSeller}
                    onChange={(e) => setProdIsBestSeller(e.target.checked)}
                    className="accent-[#d4af37]"
                  />
                  <span>Show 'Best Seller' Tag</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsNew}
                    onChange={(e) => setProdIsNew(e.target.checked)}
                    className="accent-[#d4af37]"
                  />
                  <span>Show 'New' Tag</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsCreatingNewProduct(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#d4af37] text-black font-bold uppercase tracking-wider"
                >
                  Save to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
