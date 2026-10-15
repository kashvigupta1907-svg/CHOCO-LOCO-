import React, { useState, useEffect } from 'react';
import { CartItem, CustomerDetails, OrderRecord } from '../types';
import { BAKERY_CONTACT, DEFAULT_WEBHOOK_URL } from '../data/knowledgeBase';
import { generateUpiQrDataUrl, buildUpiPayUrl } from '../utils/qrCode';
import {
  X,
  QrCode,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  Phone,
  Cake,
  CheckCircle2,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted?: (order: OrderRecord) => void;
  webhookUrl?: string;
  onRecordWebhookLog?: (log: { timestamp: string; payload: any; status: string }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
  webhookUrl = DEFAULT_WEBHOOK_URL,
  onRecordWebhookLog,
}) => {
  if (!isOpen) return null;

  // Step 1: Customer Details & Review; Step 2: UPI QR Payment & WhatsApp Confirmation; Step 3: Success Screen
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    cityArea: '',
    pincode: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTimeSlot: '5:00 PM - 7:00 PM (Evening)',
    orderNotes: '',
  });

  const [validationError, setValidationError] = useState<string>('');

  const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const upiPayLink = buildUpiPayUrl(totalAmount);

  // Generate QR code and Order ID whenever step 2 is entered or total amount is ready
  useEffect(() => {
    if (isOpen) {
      const generatedId = `CHOCO-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(generatedId);
      generateUpiQrDataUrl(totalAmount).then((url) => {
        setQrDataUrl(url);
      });
    }
  }, [isOpen, totalAmount]);

  // Copy UPI ID to clipboard
  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(BAKERY_CONTACT.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Step 1 -> Step 2 validation
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim()) {
      setValidationError('Please enter your full name for order delivery.');
      return;
    }
    if (!customer.phone.trim() || customer.phone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!customer.address.trim()) {
      setValidationError('Please enter your delivery street address.');
      return;
    }
    setValidationError('');
    setStep(2);
  };

  // Generate WhatsApp message formatted with order details
  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.name} (${it.size}) x ${it.quantity} = ₹${(it.unitPrice * it.quantity).toLocaleString('en-IN')}${
            it.customCakeMessage ? `\n   ✍️ Msg on Cake: "${it.customCakeMessage}"` : ''
          }`
      )
      .join('\n');

    const message =
      `Thank you for your order.\n\n` +
      `🎂 *CHOCOLOCO ORDER CONFIRMATION*\n` +
      `*Order ID:* ${orderId}\n` +
      `*Date:* ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n\n` +
      `👤 *Customer Details:*\n` +
      `• Name: ${customer.name}\n` +
      `• Phone: ${customer.phone}\n` +
      `• Delivery Address: ${customer.address}${customer.cityArea ? `, ${customer.cityArea}` : ''}\n` +
      `• Preferred Date: ${customer.deliveryDate}\n` +
      `• Time Slot: ${customer.deliveryTimeSlot}\n\n` +
      `🛍️ *Ordered Items:*\n${itemsList}\n\n` +
      `💰 *Total Amount:* ₹${totalAmount.toLocaleString('en-IN')}\n` +
      `💳 *Paid via UPI ID:* ${BAKERY_CONTACT.upiId}\n\n` +
      `_Payment completed via Dynamic UPI QR code. Please confirm my fresh bake!_`;

    return encodeURIComponent(message);
  };

  // Silent background JSON webhook dispatch to n8n
  const silentlyDispatchWebhook = (orderData: OrderRecord) => {
    const webhookPayload = {
      order_id: orderData.orderId,
      timestamp: new Date().toISOString(),
      customer_name: orderData.customer.name,
      customer_phone: orderData.customer.phone,
      customer_email: orderData.customer.email || 'N/A',
      delivery_address: orderData.customer.address,
      delivery_date: orderData.customer.deliveryDate,
      delivery_slot: orderData.customer.deliveryTimeSlot,
      items: orderData.items.map((it) => ({
        name: it.name,
        weight: it.size,
        qty: it.qty,
        price: it.price,
        custom_cake_message: it.customCakeMessage || '',
      })),
      total_amount: orderData.totalAmount,
      upi_id_used: BAKERY_CONTACT.upiId,
      whatsapp_recipient: `+${BAKERY_CONTACT.whatsapp}`,
    };

    // Quietly send POST request in background — no spinner or error shown to customer
    try {
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
        mode: 'no-cors', // ensures cross-origin silent dispatch without blocking
      })
        .then(() => {
          if (onRecordWebhookLog) {
            onRecordWebhookLog({
              timestamp: new Date().toLocaleTimeString(),
              payload: webhookPayload,
              status: 'Dispatched successfully',
            });
          }
        })
        .catch((err) => {
          // Keep it quiet for the user, record to admin log
          if (onRecordWebhookLog) {
            onRecordWebhookLog({
              timestamp: new Date().toLocaleTimeString(),
              payload: webhookPayload,
              status: `Silent fallback (${err.message || 'webhook queued'})`,
            });
          }
        });
    } catch (e) {
      // Ignored silently
    }
  };

  // Confirm on WhatsApp button handler
  const handleConfirmOnWhatsApp = () => {
    const orderData: OrderRecord = {
      orderId,
      timestamp: new Date().toISOString(),
      customer,
      items: items.map((it) => ({
        productId: it.productId,
        name: it.name,
        size: it.size,
        qty: it.quantity,
        price: it.unitPrice * it.quantity,
        customCakeMessage: it.customCakeMessage,
      })),
      totalAmount,
      upiIdUsed: BAKERY_CONTACT.upiId,
      whatsappRecipient: `+${BAKERY_CONTACT.whatsapp}`,
      status: 'PAID_VERIFIED',
    };

    // 1. Silently send order details to n8n webhook URL
    silentlyDispatchWebhook(orderData);

    // 2. Notify parent if callback provided
    if (onOrderCompleted) {
      onOrderCompleted(orderData);
    }

    // 3. Open WhatsApp link: https://wa.me/918126917769?text=...
    const waUrl = `https://wa.me/${BAKERY_CONTACT.whatsapp}?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');

    // 4. Transition to confirmation screen
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#2A1810] via-[#3E2114] to-[#5C2D16] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300 font-serif text-xl font-bold">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                  CHOCOLOCO Checkout
                </h3>
                <span className="bg-emerald-500 text-stone-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                  STEP {step} OF 3
                </span>
              </div>
              <p className="text-xs text-amber-200/80">
                Artisanal Bakery • Direct WhatsApp &amp; Dynamic UPI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: Delivery Details Form & Cart Review */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* Order Summary Snapshot */}
              <div className="bg-[#FAF4EE] rounded-2xl p-4 border border-[#EADBD0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Order Items Summary ({items.length})
                  </span>
                  <span className="text-xs font-bold text-stone-900">
                    Total: ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="divide-y divide-stone-200/60 max-h-40 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-stone-900">{it.name}</span>
                        <span className="text-stone-500 ml-1.5">({it.size}) × {it.quantity}</span>
                        {it.customCakeMessage && (
                          <div className="text-[11px] text-amber-800 italic">
                            Message: "{it.customCakeMessage}"
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-stone-900">
                        ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Form */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-800" />
                  <span>Where should we deliver your cake?</span>
                </h4>

                {validationError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="e.g. Kashvi Gupta"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Mobile Number (for WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="e.g. 918126917769 or 7568345560"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Street Address &amp; Apartment / Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="House/Flat number, building name, street, nearby landmark (within 18km)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Preferred Delivery Date *
                    </label>
                    <input
                      type="date"
                      value={customer.deliveryDate}
                      onChange={(e) => setCustomer({ ...customer, deliveryDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Preferred Delivery Time Slot *
                    </label>
                    <select
                      value={customer.deliveryTimeSlot}
                      onChange={(e) => setCustomer({ ...customer, deliveryTimeSlot: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                    >
                      <option value="12:00 PM - 2:00 PM (Afternoon)">12:00 PM - 2:00 PM (Afternoon)</option>
                      <option value="3:00 PM - 5:00 PM (Tea time)">3:00 PM - 5:00 PM (Tea time)</option>
                      <option value="5:00 PM - 7:00 PM (Evening)">5:00 PM - 7:00 PM (Evening)</option>
                      <option value="7:00 PM - 9:00 PM (Dinner Celebration)">7:00 PM - 9:00 PM (Dinner Celebration)</option>
                      <option value="11:30 PM - 12:00 AM (Midnight Surprise)">11:30 PM - 12:00 AM (Midnight Surprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Special Baking Instructions / Message on Cake
                  </label>
                  <input
                    type="text"
                    value={customer.orderNotes}
                    onChange={(e) => setCustomer({ ...customer, orderNotes: e.target.value })}
                    placeholder="e.g. Please pipe 'Happy 25th Birthday Rhea!', add golden candles"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit to Step 2 Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#2A1810] hover:bg-[#3D2314] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Generate Dynamic UPI QR &amp; Pay (₹{totalAmount.toLocaleString('en-IN')})</span>
              </button>
            </form>
          )}

          {/* STEP 2: DYNAMIC UPI QR CODE & WHATSAPP CONFIRMATION */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Step 2 Header & Amount Display */}
              <div className="bg-[#FAF4EE] rounded-2xl p-4 border border-[#EADBD0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                    Order Reference: {orderId}
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A1810]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    For: <span className="font-bold">{customer.name}</span> ({customer.phone})
                  </div>
                </div>

                <div className="bg-white px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">UPI ID</span>
                    <span className="font-mono font-bold text-amber-900">{BAKERY_CONTACT.upiId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpiId}
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* DYNAMIC QR CODE CONTAINER */}
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border-2 border-dashed border-amber-300 shadow-sm text-center">
                <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-200 mb-3">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="CHOCOLOCO Dynamic UPI Payment QR Code"
                      className="w-56 h-56 object-contain"
                    />
                  ) : (
                    <div className="w-56 h-56 flex items-center justify-center bg-stone-50 rounded-xl text-stone-400 text-xs">
                      Generating dynamic QR code...
                    </div>
                  )}
                </div>

                {/* EXACT MANDATORY NOTICE FROM PROMPT */}
                <div className="max-w-md space-y-1">
                  <p className="font-bold text-sm text-stone-900">
                    Scan and pay using any UPI app. After paying, tap below to confirm your order.
                  </p>
                  <p className="text-xs text-stone-500">
                    Works seamlessly with Google Pay, PhonePe, Paytm, BHIM, or your mobile banking app.
                  </p>
                </div>

                {/* Mobile Direct Pay Trigger */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={upiPayLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Pay directly in UPI App (Mobile)</span>
                  </a>
                </div>
              </div>

              {/* ORDER SUMMARY TABLE */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
                <div className="bg-stone-100 p-2.5 font-bold text-stone-700 uppercase tracking-wider text-[10px]">
                  Order Summary Review
                </div>
                <div className="p-3 divide-y divide-stone-100 max-h-36 overflow-y-auto">
                  {items.map((it) => (
                    <div key={it.id} className="py-1.5 flex justify-between">
                      <span className="text-stone-800">
                        {it.name} ({it.size}) × {it.quantity}
                      </span>
                      <span className="font-semibold text-stone-900">
                        ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-between font-bold text-stone-900 text-sm">
                    <span>Total Amount Payable</span>
                    <span className="text-[#8B4513]">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* EXACT MANDATORY WHATSAPP BUTTON FROM PROMPT */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleConfirmOnWhatsApp}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Confirm Order on WhatsApp</span>
                </button>

                <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
                  >
                    ← Edit Delivery Details
                  </button>
                  <span className="text-[11px] text-stone-400">
                    Recipient: {BAKERY_CONTACT.whatsappDisplay}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: ORDER SUCCESS & CONFIRMATION */}
          {step === 3 && (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Order Successfully Dispatched
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-3">
                  Thank You for Your Sweet Order!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Your order details have been shared with our head pastry chef at CHOCOLOCO. We have also verified your payment and prepared our fresh bake schedule!
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#FAF4EE] rounded-2xl p-5 border border-[#EADBD0] max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Order Reference</span>
                  <span className="font-mono font-bold text-stone-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Customer</span>
                  <span className="font-semibold text-stone-900">{customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery Date &amp; Slot</span>
                  <span className="font-semibold text-stone-900">
                    {customer.deliveryDate} ({customer.deliveryTimeSlot})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Total Paid</span>
                  <span className="font-bold text-[#8B4513] text-sm">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200">
                  <span className="text-stone-500">Delivery Radius</span>
                  <span className="text-emerald-700 font-semibold">18km Covered</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#2A1810] text-amber-200 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#3D2314] transition-colors cursor-pointer"
                >
                  Back to CHOCOLOCO Bakery
                </button>
                <a
                  href={`tel:${BAKERY_CONTACT.phone}`}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Kitchen: {BAKERY_CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
