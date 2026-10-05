export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  sizes: string[];
  colors?: string[];
  description: string;
  fabric?: string;
  fit?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: CustomerDetails;
  items: {
    product: Product;
    size: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'UPI' | 'QR_CODE' | 'CARD' | 'COD';
  paymentStatus: 'Paid' | 'Pending Verification' | 'COD Verified';
  utrReference?: string;
  paymentScreenshot?: string;
  orderStatus: 'Order Placed' | 'Confirmed' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingNotes?: string;
  updatedAt: string;
}

export type ThemeType = 'gold_luxury' | 'obsidian_silver' | 'royal_ruby' | 'emerald_prestige' | 'clean_minimal';

export interface SiteConfig {
  storeName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  plusCode: string;
  timing: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  xUrl: string;
  upiId: string;
  upiPayeeName: string;
  upiQrCodeImage?: string;
  freeShippingThreshold: number;
  announcementText: string;
  heroHeading: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  activeTheme: ThemeType;
}

export interface StoreReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  reviewsCount?: string;
  photosCount?: string;
  source: 'Google Maps' | 'Verified Buyer';
  avatar?: string;
}

export interface PushNotificationMessage {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  orderId?: string;
  read: boolean;
}
