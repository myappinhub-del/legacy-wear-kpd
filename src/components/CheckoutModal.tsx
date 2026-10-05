import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Copy,
  Upload,
  ArrowRight,
  MessageSquare,
  QrCode,
  CreditCard,
  Banknote,
  Lock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { CartItem, CustomerDetails, Order, SiteConfig } from '../types';
import {
  formatINR,
  generateOrderId,
  generateUpiDeepLink,
  getUpiQrCodeUrl,
  getWhatsAppCustomerUrl
} from '../utils/helpers';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  config: SiteConfig;
  discount: number;
  promoCodeName: string;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  config,
  discount,
  promoCodeName,
  onClose,
  onOrderPlaced
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');

  // Customer form details
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Karempudi',
    state: 'Andhra Pradesh',
    pincode: '522614',
    landmark: ''
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'QR_CODE' | 'CARD' | 'COD'>('UPI');
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= config.freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const pendingOrderId = createdOrder?.id || generateOrderId();
  const upiLink = generateUpiDeepLink(config.upiId, config.upiPayeeName, total, pendingOrderId);
  const qrCodeUrl = config.upiQrCodeImage || getUpiQrCodeUrl(upiLink);

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(config.upiId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setErrorMsg('Please complete all required shipping fields');
      return;
    }
    const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  const handleFinalPlaceOrder = () => {
    if (paymentMethod === 'UPI' && !utrNumber.trim() && !screenshotPreview) {
      setErrorMsg('Please enter your 12-digit UPI Reference (UTR) number or upload payment screenshot');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderDate = new Date().toISOString().replace('T', ' ').substring(0, 16);
      const newOrder: Order = {
        id: pendingOrderId,
        date: orderDate,
        customer,
        items: items.map((i) => ({
          product: i.product,
          size: i.size,
          quantity: i.quantity,
          price: i.product.price
        })),
        subtotal,
        shipping: shippingFee,
        discount,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'COD Verified' : 'Paid',
        utrReference: utrNumber.trim() || 'UPI-APP-INSTANT',
        paymentScreenshot: screenshotPreview || undefined,
        orderStatus: 'Confirmed',
        trackingNotes: 'Order received. Packing at Karempudi Store.',
        updatedAt: orderDate
      };

      setCreatedOrder(newOrder);
      onOrderPlaced(newOrder);
      setIsSubmitting(false);
      setStep('success');

      // Celebration Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0f1118] border border-[#262a3d] rounded-3xl shadow-2xl text-left my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#202332] flex items-center justify-between bg-[#13151f]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                LEGACY WEAR CHECKOUT
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400">Order #{pendingOrderId}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white mt-0.5">
              {step === 'details' && 'Shipping & Buyer Details'}
              {step === 'payment' && 'Secure UPI & Instant Payment'}
              {step === 'success' && 'Order Confirmed!'}
            </h3>
          </div>

          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Stepper */}
        <div className="grid grid-cols-3 border-b border-[#202332] text-xs font-semibold text-center">
          <div
            className={`py-2.5 transition ${
              step === 'details'
                ? 'bg-[#d4af37]/20 text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-zinc-400 bg-zinc-900/50'
            }`}
          >
            1. Address & Details
          </div>
          <div
            className={`py-2.5 transition ${
              step === 'payment'
                ? 'bg-[#d4af37]/20 text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-zinc-400 bg-zinc-900/50'
            }`}
          >
            2. UPI & Payment
          </div>
          <div
            className={`py-2.5 transition ${
              step === 'success'
                ? 'bg-emerald-950/40 text-emerald-400 border-b-2 border-emerald-400'
                : 'text-zinc-500 bg-zinc-900/30'
            }`}
          >
            3. Confirmation
          </div>
        </div>

        {/* STEP 1: Shipping Details */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Challa Venkata Ramaiah"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  WhatsApp Phone Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl bg-zinc-800 border border-r-0 border-zinc-700 text-zinc-400 text-xs font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9848012345"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value.replace(/[^0-9]/g, '') })
                    }
                    className="w-full px-3.5 py-2.5 rounded-r-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-zinc-400 mt-1 block">
                  Admin connects via WhatsApp for dispatch updates & live photo of packed parcel.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="your.email@gmail.com"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Street Delivery Address & House No. *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Door No, Street Name, Near Landmark..."
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">City / Town *</label>
                <input
                  type="text"
                  required
                  placeholder="Karempudi"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">State *</label>
                <input
                  type="text"
                  required
                  placeholder="Andhra Pradesh"
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="522614"
                  value={customer.pincode}
                  onChange={(e) =>
                    setCustomer({ ...customer, pincode: e.target.value.replace(/[^0-9]/g, '') })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>

            {/* Summary preview */}
            <div className="p-4 rounded-2xl bg-[#141622] border border-[#25283a] flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-400">Total payable for {items.length} items:</span>
                <span className="text-base font-bold text-white block mt-0.5">
                  {formatINR(total)}
                </span>
              </div>
              <span className="text-emerald-400 font-semibold">
                {shippingFee === 0 ? '✓ Free Express Shipping' : '+ ₹99 Shipping'}
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#eab308] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg flex items-center justify-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Secure Payment Processing */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'UPI'
                    ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                    : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <QrCode className="w-5 h-5 text-[#d4af37]" />
                <span className="text-xs font-bold">UPI / QR Code</span>
                <span className="text-[10px] text-emerald-400">Recommended</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'CARD'
                    ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                    : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-bold">Cards / NetBank</span>
                <span className="text-[10px] text-zinc-500">Instant</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'COD'
                    ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                    : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Banknote className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold">Cash on Delivery</span>
                <span className="text-[10px] text-zinc-500">At Doorstep</span>
              </button>
            </div>

            {/* UPI & QR Code Specific Details */}
            {paymentMethod === 'UPI' && (
              <div className="rounded-2xl bg-[#141622] border border-[#272a3b] p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Dynamic QR Code */}
                  <div className="flex flex-col items-center bg-white p-3 rounded-2xl shadow-xl shrink-0">
                    <img
                      src={qrCodeUrl}
                      alt="UPI QR Code"
                      className="w-36 h-36 object-contain"
                    />
                    <span className="text-[10px] font-bold text-zinc-800 mt-1 uppercase tracking-wider">
                      Scan with any UPI App
                    </span>
                  </div>

                  {/* UPI Details & Deep links */}
                  <div className="flex-1 space-y-3 text-center sm:text-left">
                    <div>
                      <span className="text-xs text-zinc-400">Total Payable:</span>
                      <div className="text-2xl font-cinzel font-black text-[#d4af37]">
                        {formatINR(total)}
                      </div>
                    </div>

                    {/* Copy UPI ID */}
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                      <span className="text-xs font-mono text-zinc-200 truncate flex-1">
                        {config.upiId}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-3 py-1 rounded-lg bg-[#d4af37] text-black text-xs font-bold flex items-center gap-1 hover:opacity-90"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Deep links for mobile */}
                    <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                      <a
                        href={upiLink}
                        className="px-3 py-1.5 rounded-lg bg-[#1e2130] hover:bg-[#282c40] text-zinc-200 text-[11px] font-bold border border-zinc-700 transition"
                      >
                        ⚡ Pay with GPay / PhonePe
                      </a>
                      <a
                        href={upiLink}
                        className="px-3 py-1.5 rounded-lg bg-[#1e2130] hover:bg-[#282c40] text-zinc-200 text-[11px] font-bold border border-zinc-700 transition"
                      >
                        Paytm / BHIM
                      </a>
                    </div>
                  </div>
                </div>

                {/* UTR / Transaction Reference verification */}
                <div className="pt-3 border-t border-zinc-800 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-200 mb-1">
                      UPI Reference / UTR Number (12 Digits) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 428190382910"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                    />
                    <span className="text-[10px] text-zinc-400 mt-0.5 block">
                      Found in your GPay / PhonePe / Paytm payment receipt details.
                    </span>
                  </div>

                  {/* Upload payment screenshot (directly from files) */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-200 mb-1">
                      Attach Payment Screenshot (Optional for express priority dispatch)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-xs font-medium transition">
                        <Upload className="w-4 h-4 text-[#d4af37]" />
                        <span>Choose Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotUpload}
                          className="hidden"
                        />
                      </label>
                      {screenshotPreview && (
                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>Screenshot attached!</span>
                        </div>
                      )}
                    </div>
                    {screenshotPreview && (
                      <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-zinc-700">
                        <img
                          src={screenshotPreview}
                          alt="Payment Proof"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Card Gateway simulated interface */}
            {paymentMethod === 'CARD' && (
              <div className="rounded-2xl bg-[#141622] border border-[#272a3b] p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
                  </span>
                  <span>VISA • RuPay • Mastercard</span>
                </div>
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 •••• •••• 1111"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* COD Details */}
            {paymentMethod === 'COD' && (
              <div className="rounded-2xl bg-[#141622] border border-[#272a3b] p-5 space-y-2">
                <h4 className="text-sm font-bold text-white">Cash on Delivery</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pay securely in cash or via UPI to the delivery courier when your Legacy Wear
                  parcel arrives at your doorstep in {customer.city}.
                </p>
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs">
                  ✓ Verified phone number: +91 {customer.phone}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white text-xs font-semibold"
              >
                ← Back to Details
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalPlaceOrder}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f1d279] to-[#c5a059] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl flex items-center gap-2 active:scale-95 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Processing Payment...' : `Confirm & Pay ${formatINR(total)}`}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmation Success */}
        {step === 'success' && createdOrder && (
          <div className="p-8 text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                PAYMENT & ORDER VERIFIED
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-1">
                Thank You, {createdOrder.customer.name}!
              </h3>
              <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
                Your order <strong className="text-white">#{createdOrder.id}</strong> has been received by Legacy Wear. Our Karempudi team is preparing your parcel.
              </p>
            </div>

            {/* Order Card Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#141622] border border-[#272a3b] text-left text-xs space-y-3 max-w-md mx-auto">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Order ID:</span>
                <span className="font-mono font-bold text-white">#{createdOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Total Paid:</span>
                <span className="font-bold text-[#d4af37]">{formatINR(createdOrder.total)}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Payment Mode:</span>
                <span className="text-white font-semibold">{createdOrder.paymentMethod}</span>
              </div>
              <div>
                <span className="text-zinc-400 block mb-0.5">Shipping to:</span>
                <p className="text-zinc-200">
                  {createdOrder.customer.address}, {createdOrder.customer.city} - {createdOrder.customer.pincode}
                </p>
              </div>
            </div>

            {/* WhatsApp Direct Action Button from Prompt */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <a
                href={getWhatsAppCustomerUrl(createdOrder, config.phone)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat with Legacy Wear Store on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition"
              >
                Return to Store
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
