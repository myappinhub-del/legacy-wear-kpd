import { Product, SiteConfig, StoreReview, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'LV Premium Hoodie',
    price: 1499,
    originalPrice: 2499,
    discountPercent: 40,
    rating: 4.8,
    reviewCount: 120,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Hoodies',
    isBestSeller: true,
    inStock: true,
    stockCount: 18,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Jet Black', 'Heather Grey', 'Obsidian Navy'],
    description: 'Crafted with ultra-soft 380 GSM fleece cotton, the LV Premium Hoodie delivers heavyweight luxury comfort, ribbed hems, and signature gold metallic embroidered crest.',
    fabric: '100% Super-Combed French Terry Cotton (380 GSM)',
    fit: 'Signature Relaxed Dropped Shoulder'
  },
  {
    id: 'prod-2',
    name: 'Legacy Oversized T-Shirt',
    price: 899,
    originalPrice: 1499,
    discountPercent: 40,
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'T-Shirts',
    isNew: true,
    inStock: true,
    stockCount: 35,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Off-White Pristine', 'Carbon Black', 'Dusty Olive'],
    description: 'Modern streetwear silhouette engineered with 240 GSM pre-shrunk cotton. Features ribbed crew collar, clean minimal crest print, and breathable drape.',
    fabric: '100% Bio-Washed Combed Cotton (240 GSM)',
    fit: 'Oversized Boxy Fit'
  },
  {
    id: 'prod-3',
    name: 'Classic Shirt',
    price: 1299,
    originalPrice: 1999,
    discountPercent: 35,
    rating: 4.6,
    reviewCount: 75,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Shirts',
    inStock: true,
    stockCount: 14,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Forest Olive', 'Charcoal Slate', 'Khaki Sand'],
    description: 'A versatile wardrobe essential tailored from premium textured cotton twill with dual breast pockets and reinforced contrast buttons for both casual and semi-formal wear.',
    fabric: 'Premium Mercerized Cotton Twill',
    fit: 'Tailored Regular Fit'
  },
  {
    id: 'prod-4',
    name: 'Relaxed Fit Jeans',
    price: 1699,
    originalPrice: 2499,
    discountPercent: 32,
    rating: 4.5,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Jeans',
    inStock: true,
    stockCount: 22,
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Vintage Indigo', 'Faded Stone Wash', 'Midnight Black'],
    description: 'Authentic 13.5 oz ring-spun denim with gentle stone-wash whiskering. Relaxed cut through the thigh with a subtle taper down to the ankle.',
    fabric: '99% Organic Cotton, 1% Elastane',
    fit: 'Relaxed Straight Taper'
  },
  {
    id: 'prod-5',
    name: 'Legacy Urban Bomber Jacket',
    price: 2499,
    originalPrice: 3999,
    discountPercent: 37,
    rating: 4.9,
    reviewCount: 44,
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80',
    category: 'Jackets',
    isBestSeller: true,
    inStock: true,
    stockCount: 9,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Jet Black', 'Deep Olive'],
    description: 'Weather-resistant flight bomber jacket with tonal nylon exterior, padded diamond quilted lining, antique brass heavy-duty zipper, and ribbed trim.',
    fabric: 'Nylon Shell with Polyester Quilted Insulation',
    fit: 'Classic Bomber Athletic Fit'
  },
  {
    id: 'prod-6',
    name: 'Legacy Minimalist Hoodie - Sandstone',
    price: 1399,
    originalPrice: 2199,
    discountPercent: 36,
    rating: 4.7,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    category: 'Hoodies',
    isNew: true,
    inStock: true,
    stockCount: 16,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sandstone Beige', 'Almond Latte'],
    description: 'Minimal aesthetic luxury hoodie in warm sandstone tone with tonal embroidery and kangaroo pouch pocket.',
    fabric: '360 GSM Brushed Fleece Cotton',
    fit: 'Oversized Street Fit'
  },
  {
    id: 'prod-7',
    name: 'LW Signature Embroidered Cap',
    price: 599,
    originalPrice: 999,
    discountPercent: 40,
    rating: 4.8,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    inStock: true,
    stockCount: 40,
    sizes: ['One Size (Adjustable)'],
    colors: ['Midnight Black & Gold', 'Vintage Khaki'],
    description: 'Structured 6-panel crown with curved brim and premium metallic brass clasp closure. High-density raised 3D LW embroidery.',
    fabric: '100% Chino Cotton Twill',
    fit: 'Adjustable Strap-back'
  },
  {
    id: 'prod-8',
    name: 'Heavyweight Legacy Black Tee',
    price: 799,
    originalPrice: 1299,
    discountPercent: 38,
    rating: 4.8,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    category: 'T-Shirts',
    inStock: true,
    stockCount: 28,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Pitch Black'],
    description: 'Heavyweight daily driver tee that maintains structure and rich color wash after wash. Seamless dual-needle stitching.',
    fabric: '240 GSM Ring-Spun Cotton',
    fit: 'Drop Shoulder Relaxed'
  }
];

export const CATEGORIES = [
  { id: 'all', name: "All Collections", icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300&q=80' },
  { id: "Men's Wear", name: "Men's Wear", icon: 'User', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=300&q=80' },
  { id: "Women's Wear", name: "Women's Wear", icon: 'Heart', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80' },
  { id: "T-Shirts", name: "T-Shirts", icon: 'Shirt', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80' },
  { id: "Hoodies", name: "Hoodies", icon: 'Sparkle', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80' },
  { id: "Shirts", name: "Shirts", icon: 'Layers', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80' },
  { id: "Jeans", name: "Jeans", icon: 'Scissors', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80' },
  { id: "Jackets", name: "Jackets", icon: 'Shield', image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=300&q=80' },
  { id: "Accessories", name: "Accessories", icon: 'Watch', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80' }
];

export const INITIAL_CONFIG: SiteConfig = {
  storeName: 'Legacy Wear',
  tagline: 'Timeless Style. Lasting Legacy.',
  phone: '+91 8179176914',
  whatsappNumber: '918179176914',
  email: 'legacywear@gmail.com',
  address: 'Vinukonda, Karempudi, Andhra Pradesh 522614',
  plusCode: 'CPGC+HQ Karempudi, Andhra Pradesh',
  timing: 'Closed · Opens 9 am Tue',
  instagramUrl: 'https://www.instagram.com/legacy_wear_01?stkn=MW81bXQ3Nmk5bXY3dg==',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  xUrl: 'https://x.com',
  upiId: '8179176914@ybl',
  upiPayeeName: 'Legacy Wear Store',
  freeShippingThreshold: 999,
  announcementText: '🚚 Free Shipping on Orders Above ₹999 | Timeless Style. Lasting Legacy.',
  heroHeading: 'LEGACY WEAR',
  heroSubtitle: 'Timeless Style. Lasting Legacy.',
  heroDescription: 'Premium quality clothing for the modern generation. Style that speaks, comfort that stays.',
  heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
  activeTheme: 'gold_luxury'
};

export const INITIAL_REVIEWS: StoreReview[] = [
  {
    id: 'rev-1',
    author: 'Challa Venkata ramaiah',
    rating: 5.0,
    date: '2 months ago',
    comment: 'Good quality clothes! Cloth material is super premium and colors don\'t fade even after multiple washes.',
    reviewsCount: '1 review',
    source: 'Google Maps'
  },
  {
    id: 'rev-2',
    author: 'Mohammad Shavali',
    rating: 5.0,
    date: '2 months ago',
    comment: 'Budget friendly with latest modern styles. Very humble store staff in Karempudi.',
    reviewsCount: '1 review',
    photosCount: '2 photos',
    source: 'Google Maps'
  },
  {
    id: 'rev-3',
    author: 'Venkatesh Rao K.',
    rating: 5.0,
    date: '3 weeks ago',
    comment: 'Ordered LV Premium Hoodie and an oversized tee online. Received delivery in 2 days. The packaging and finishing are unmatched in AP!',
    reviewsCount: '3 reviews',
    source: 'Verified Buyer'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'LW-84910',
    date: '2026-10-04 14:32',
    customer: {
      name: 'Challa Venkata Ramaiah',
      phone: '9848022334',
      email: 'venkata.challa@gmail.com',
      address: 'Main Bazaar Road, Near Gandhi Statue',
      city: 'Karempudi',
      state: 'Andhra Pradesh',
      pincode: '522614'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        size: 'L',
        quantity: 1,
        price: 1499
      },
      {
        product: INITIAL_PRODUCTS[1],
        size: 'XL',
        quantity: 1,
        price: 899
      }
    ],
    subtotal: 2398,
    shipping: 0,
    discount: 0,
    total: 2398,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    utrReference: 'UPI/428190382910/SBI',
    orderStatus: 'Confirmed',
    trackingNotes: 'Packed and verified. Ready for courier pickup.',
    updatedAt: '2026-10-04 15:10'
  },
  {
    id: 'LW-84911',
    date: '2026-10-05 09:15',
    customer: {
      name: 'Mohammad Shavali',
      phone: '8978112245',
      email: 'shavali.m@outlook.com',
      address: 'Near Old Bus Stand, Vinukonda Road',
      city: 'Vinukonda',
      state: 'Andhra Pradesh',
      pincode: '522647'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        size: 'XL',
        quantity: 1,
        price: 1299
      },
      {
        product: INITIAL_PRODUCTS[3],
        size: '34',
        quantity: 1,
        price: 1699
      }
    ],
    subtotal: 2998,
    shipping: 0,
    discount: 200,
    total: 2798,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    utrReference: '428819203948',
    orderStatus: 'Dispatched',
    trackingNotes: 'Dispatched via DTDC Express (AWB: DTDC-LW-9921)',
    updatedAt: '2026-10-05 10:00'
  },
  {
    id: 'LW-84912',
    date: '2026-10-05 10:45',
    customer: {
      name: 'Nagaraju Reddy',
      phone: '9440188271',
      email: 'nagaraju.r@gmail.com',
      address: 'Plot 42, Brundavan Gardens',
      city: 'Guntur',
      state: 'Andhra Pradesh',
      pincode: '522006'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        size: 'L',
        quantity: 1,
        price: 2499
      }
    ],
    subtotal: 2499,
    shipping: 0,
    discount: 0,
    total: 2499,
    paymentMethod: 'UPI',
    paymentStatus: 'Pending Verification',
    utrReference: 'UPI-REF-918237',
    orderStatus: 'Order Placed',
    trackingNotes: 'Awaiting admin transaction confirmation',
    updatedAt: '2026-10-05 10:45'
  }
];
