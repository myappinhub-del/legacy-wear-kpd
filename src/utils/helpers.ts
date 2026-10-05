import { Order, PushNotificationMessage } from '../types';

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const generateOrderId = (): string => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `LW-${randomNum}`;
};

export const generateUpiDeepLink = (
  upiId: string,
  payeeName: string,
  amount: number,
  orderId: string
): string => {
  const cleanUpi = upiId.trim();
  const cleanName = encodeURIComponent(payeeName.trim());
  const note = encodeURIComponent(`Legacy Wear Order ${orderId}`);
  return `upi://pay?pa=${cleanUpi}&pn=${cleanName}&am=${amount.toFixed(2)}&cu=INR&tn=${note}`;
};

export const getUpiQrCodeUrl = (upiDeepLink: string): string => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    upiDeepLink
  )}`;
};

export const createWhatsAppOrderMessage = (order: Order, storePhone: string): string => {
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}* (${item.size}) × ${item.quantity} = ${formatINR(
          item.price * item.quantity
        )}`
    )
    .join('\n');

  const message = `✨ *LEGACY WEAR - ORDER SUMMARY* ✨
━━━━━━━━━━━━━━━━━━━━
📦 *Order ID:* #${order.id}
📅 *Date:* ${order.date}
👤 *Customer:* ${order.customer.name}
📞 *Phone:* ${order.customer.phone}
📍 *Delivery Address:* 
${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}
━━━━━━━━━━━━━━━━━━━━
🛍️ *ITEMS ORDERED:*
${itemsText}

💰 *Subtotal:* ${formatINR(order.subtotal)}
🏷️ *Discount:* ${order.discount > 0 ? '-' + formatINR(order.discount) : '₹0'}
🚚 *Delivery:* ${order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}
⭐ *TOTAL AMOUNT:* *${formatINR(order.total)}*
━━━━━━━━━━━━━━━━━━━━
💳 *Payment Method:* ${order.paymentMethod}
🛡️ *Status:* ${order.orderStatus}
${order.utrReference ? `🔖 *UTR/Ref:* ${order.utrReference}` : ''}
━━━━━━━━━━━━━━━━━━━━
Thank you for choosing Legacy Wear! Wear Your Legacy.`;

  return message;
};

export const getWhatsAppCustomerUrl = (order: Order, storePhone: string): string => {
  const rawPhone = order.customer.phone.replace(/[^0-9]/g, '');
  const customerPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
  const message = createWhatsAppOrderMessage(order, storePhone);
  return `https://wa.me/${customerPhone}?text=${encodeURIComponent(message)}`;
};

export const sendPushNotification = async (
  title: string,
  body: string,
  orderId?: string
): Promise<PushNotificationMessage> => {
  const notificationItem: PushNotificationMessage = {
    id: 'notif-' + Date.now(),
    title,
    body,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    orderId,
    read: false
  };

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    } catch {
      // Ignore if iframe restricts system notifications
    }
  }

  return notificationItem;
};
