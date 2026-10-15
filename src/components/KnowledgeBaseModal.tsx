import React, { useState } from 'react';
import { X, FileDown, Search, CheckCircle2, ShieldCheck, HelpCircle, Bot, Code2, QrCode, Phone, Mail, MessageCircle } from 'lucide-react';
import { BAKERY_CONTACT } from '../data/knowledgeBase';
import { generateKnowledgeBasePDF } from '../utils/pdfGenerator';
import { PRODUCTS } from '../data/products';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'payment' | 'delivery' | 'ai' | 'webhook'>('catalog');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      generateKnowledgeBasePDF();
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header Banner - Plum / Maroon from the document */}
        <div className="bg-[#3C1626] text-white p-6 sm:p-7 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-400/20 text-rose-200 text-[11px] font-bold tracking-wider uppercase mb-2">
                Official Document
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wide">
                CHOCOLOCO
              </h2>
              <p className="text-xs sm:text-sm text-rose-100/80 mt-0.5">
                Gourmet Artisanal Bakery &amp; Dessert Knowledge Base
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>{isDownloading ? 'Generating...' : 'Download PDF (3 Pages)'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-rose-200 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Close Knowledge Base"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Direct Contact Bar inside header */}
          <div className="mt-5 pt-4 border-t border-rose-900/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-rose-100/90">
            <div>
              <span className="text-[10px] text-rose-300 uppercase block">Direct Call</span>
              <span className="font-bold text-white">{BAKERY_CONTACT.phoneDisplay}</span>
            </div>
            <div>
              <span className="text-[10px] text-rose-300 uppercase block">WhatsApp Orders</span>
              <span className="font-bold text-white">{BAKERY_CONTACT.whatsappDisplay}</span>
            </div>
            <div>
              <span className="text-[10px] text-rose-300 uppercase block">Kitchen Email</span>
              <span className="font-bold text-white">{BAKERY_CONTACT.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-rose-300 uppercase block">UPI Payment ID</span>
              <span className="font-mono font-bold text-white">{BAKERY_CONTACT.upiId}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#FAF4EE] px-6 py-3 border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'catalog', label: '1 & 2. Catalog & Menu' },
            { id: 'payment', label: '3. Dynamic UPI Protocol' },
            { id: 'delivery', label: '4. Delivery & Storage FAQs' },
            { id: 'ai', label: '5. AI Bot System Prompt' },
            { id: 'webhook', label: '6. Webhook Payload' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#3C1626] text-white shadow-xs'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-8">
          
          {/* TAB 1: CATALOG & ABOUT */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#3C1626] pb-1 border-b-2 border-rose-800 inline-block">
                  1. ABOUT CHOCOLOCO
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  CHOCOLOCO is a premium artisanal bakery specializing in handcrafted cakes, gourmet cupcakes, decadent brownies, and custom celebration tiers. Every creation is baked fresh using imported Belgian chocolate, real dairy butter, organic berries, and zero artificial preservatives.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="p-3.5 bg-[#FAF4EE] rounded-2xl border border-rose-200/60">
                    <h5 className="font-bold text-xs text-[#881B3E]">100% Quality Promise</h5>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Baked fresh on order day using real butter, pure cocoa butter chocolate, and zero synthetic syrups.
                    </p>
                  </div>
                  <div className="p-3.5 bg-[#FAF4EE] rounded-2xl border border-rose-200/60">
                    <h5 className="font-bold text-xs text-[#881B3E]">Dietary Flexibility</h5>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Over 80% of our catalog is available in 100% Eggless options. Gluten-Free and Sugar-Free available on request.
                    </p>
                  </div>
                  <div className="p-3.5 bg-[#FAF4EE] rounded-2xl border border-rose-200/60">
                    <h5 className="font-bold text-xs text-[#881B3E]">Seamless Fulfillment</h5>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Instant UPI dynamic QR generation, background order processing, and direct WhatsApp verification.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3C1626] pb-1 border-b-2 border-rose-800 inline-block mb-3">
                  2. SIGNATURE &amp; CUSTOM CAKES CATALOG
                </h3>
                
                <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#2D0F19] text-white">
                      <tr>
                        <th className="p-3 font-bold">ITEM NAME</th>
                        <th className="p-3 font-bold">DESCRIPTION &amp; FLAVOR PROFILE</th>
                        <th className="p-3 font-bold">SIZES</th>
                        <th className="p-3 font-bold">DIETARY</th>
                        <th className="p-3 font-bold text-right">PRICE (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                      {PRODUCTS.map((prod, idx) => (
                        <tr key={prod.id} className={idx % 2 === 1 ? 'bg-[#FCF8FA]' : ''}>
                          <td className="p-3 font-bold text-stone-900">{prod.name}</td>
                          <td className="p-3 text-stone-600">{prod.description}</td>
                          <td className="p-3 font-medium text-stone-700">
                            {prod.options.map((o) => o.size).join(' / ')}
                          </td>
                          <td className="p-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                prod.dietary === 'EGGLESS'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : prod.dietary.includes('GF')
                                  ? 'bg-sky-100 text-sky-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {prod.dietary}
                            </span>
                          </td>
                          <td className="p-3 text-right font-bold text-[#2A1810]">
                            {prod.options.map((o) => `₹${o.price}`).join(' / ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DYNAMIC UPI PROTOCOL */}
          {activeTab === 'payment' && (
            <div className="space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#3C1626] pb-1 border-b-2 border-rose-800 inline-block">
                3. ORDERING &amp; DYNAMIC UPI PAYMENT GUIDELINES
              </h3>

              <div className="bg-[#FAF4EE] p-5 rounded-3xl border border-[#EADBD0] space-y-4">
                <h4 className="font-bold text-sm text-[#2A1810]">
                  Standard Dynamic Ordering &amp; Automated Payment Protocol:
                </h4>

                <ol className="space-y-3 text-xs text-stone-700 list-decimal pl-4">
                  <li>
                    <strong className="text-stone-900">Cart Summary:</strong> Customer reviews ordered items, custom cake text, and shipping fee on the checkout screen.
                  </li>
                  <li>
                    <strong className="text-stone-900">UPI QR Code Generation:</strong> System computes total amount and generates dynamic UPI URL:
                    <div className="mt-1.5 p-2.5 bg-white rounded-xl border border-stone-200 font-mono text-[11px] text-amber-900 break-all select-all">
                      upi://pay?pa=kashvigupta1919@oksbi&amp;pn=Kashvi%20Gupta&amp;aid=uGICAgNCRrcHDbg&amp;am=TOTALAMOUNT
                    </div>
                  </li>
                  <li>
                    <strong className="text-stone-900">Scan &amp; Pay:</strong> Customer scans using Google Pay, PhonePe, Paytm, or BHIM.
                  </li>
                  <li>
                    <strong className="text-stone-900">WhatsApp Confirmation:</strong> Customer clicks "Confirm Order on WhatsApp", launching pre-filled link:
                    <div className="mt-1.5 p-2.5 bg-white rounded-xl border border-stone-200 font-mono text-[11px] text-emerald-800 break-all select-all">
                      https://wa.me/918126917769?text=Thank%20you%20for%20your%20order...
                    </div>
                  </li>
                  <li>
                    <strong className="text-stone-900">Background Webhook Sync:</strong> System quietly dispatches JSON order summary to backend webhook endpoint without user interruption.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 3: DELIVERY & STORAGE FAQS */}
          {activeTab === 'delivery' && (
            <div className="space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#3C1626] pb-1 border-b-2 border-rose-800 inline-block">
                4. DELIVERY, PICKUP &amp; STORAGE FAQS
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#881B3E]" />
                    <span>Q: What is the delivery radius and same-day ordering deadline?</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    We deliver across the city within an <strong>18km radius</strong> from our central bakery. Same-day orders must be placed <strong>before 2:00 PM</strong> for evening delivery. Custom tier cakes require 24–48 hours lead time.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#881B3E]" />
                    <span>Q: How should I store CHOCOLOCO cakes and desserts?</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Cream cheese and whipped cream cakes must be refrigerated upon arrival and consumed within 48 hours. Serve butter-based cakes at room temperature (remove from fridge 20 mins prior to cutting).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI SYSTEM PROMPT */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#3C1626] pb-1 border-b-2 border-rose-800 inline-block">
                5. AI CHATBOT INTEGRATION &amp; CONTEXT RULES
              </h3>
              <p className="text-xs text-stone-600">
                The CHOCOLOCO AI Chatbot acts as a virtual bakery assistant. It reads from this exact Knowledge Base to assist customers with cake selections, dietary filtering, price quotes, and payment flow guidance.
              </p>

              <div className="p-4 rounded-2xl bg-[#1E1920] text-emerald-300 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                <div className="text-[10px] text-stone-400 mb-2 uppercase tracking-wider">SYSTEM PROMPT CONFIGURATION</div>
                <pre className="whitespace-pre-wrap">{`YOU ARE "CHOCO BOT", THE VIRTUAL BAKERY CONCIERGE FOR CHOCOLOCO. CONTACT DETAILS TO PROVIDE ON REQUEST:
- Phone: +91 7568345560
- Email: kajligupta1919@gmail.com
- WhatsApp: +91 8126917769
- UPI ID: kashvigupta1919@oksbi

BEHAVIOR RULES:
1. Always maintain a warm, welcoming, and mouth-watering tone.
2. Recommend cakes based on user criteria:
   - For Eggless: Recommend Belgian Chocolate Truffle, Mango Passionfruit Crunch, Hazelnut Nutella Drip, or Classic Vanilla Berry.
   - For Rich/Decadent: Recommend Biscoff Speculoos Cheesecake or Belgian Chocolate Truffle.
3. Compute pricing estimates accurately from the product table (e.g., 1kg Belgian Truffle = ₹1,600).
4. Explain the 2-step checkout clearly:
   a) Pay via UPI QR code using ID: kashvigupta1919@oksbi
   b) Click "Confirm Order on WhatsApp" to send details to +91 8126917769.
5. Never invent products not present in this Knowledge Base. For custom designs, instruct the customer to contact WhatsApp (+91 8126917769) directly.`}</pre>
              </div>
            </div>
          )}

          {/* TAB 5: WEBHOOK PAYLOAD */}
          {activeTab === 'webhook' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#3C1626] pb-1 border-b-2 border-rose-800 inline-block">
                6. AUTOMATED WEBHOOK PAYLOAD REFERENCE
              </h3>
              <p className="text-xs text-stone-600">
                Dispatched automatically to your n8n webhook workflow whenever a customer confirms on WhatsApp:
              </p>

              <div className="p-4 rounded-2xl bg-[#1E1920] text-amber-200 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                <div className="text-[10px] text-stone-400 mb-2 uppercase tracking-wider">Sample Background Order JSON Payload:</div>
                <pre className="whitespace-pre-wrap">{`{
  "order_id": "CHOCO-9842",
  "timestamp": "2026-10-15T10:30:00Z",
  "customer_name": "Kashvi Gupta",
  "items": [
    {
      "name": "Belgian Chocolate Truffle",
      "weight": "1kg",
      "qty": 1,
      "price": 1600
    },
    {
      "name": "Triple Chocolate Cupcake (Box of 6)",
      "qty": 1,
      "price": 540
    }
  ],
  "total_amount": 2140,
  "upi_id_used": "kashvigupta1919@oksbi",
  "whatsapp_recipient": "+918126917769"
}`}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <span>Official Document — Contact: {BAKERY_CONTACT.phoneDisplay}</span>
          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2 bg-[#3C1626] hover:bg-[#521E34] text-white rounded-xl font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-rose-300" />
            <span>Download Knowledge Base (PDF)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
