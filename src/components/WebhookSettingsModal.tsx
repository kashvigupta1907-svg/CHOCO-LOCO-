import React, { useState } from 'react';
import { X, Sliders, Check, Send, AlertCircle, Copy, Info } from 'lucide-react';
import { DEFAULT_WEBHOOK_URL, BAKERY_CONTACT } from '../data/knowledgeBase';

interface WebhookSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
  webhookLogs: { timestamp: string; payload: any; status: string }[];
}

export const WebhookSettingsModal: React.FC<WebhookSettingsModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  onSaveWebhookUrl,
  webhookLogs,
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>(webhookUrl || DEFAULT_WEBHOOK_URL);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [testSent, setTestSent] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWebhookUrl(currentUrl.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleTestPing = () => {
    setTestSent(true);
    const testPayload = {
      order_id: `CHOCO-TEST-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      customer_name: 'Kashvi Gupta',
      items: [{ name: 'Belgian Chocolate Truffle', weight: '1kg', qty: 1, price: 1600 }],
      total_amount: 1600,
      upi_id_used: BAKERY_CONTACT.upiId,
      whatsapp_recipient: `+${BAKERY_CONTACT.whatsapp}`,
    };

    try {
      fetch(currentUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
        mode: 'no-cors',
      });
    } catch (e) {
      // Quiet
    }

    setTimeout(() => setTestSent(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#2A1810] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                n8n Webhook &amp; Automation Settings
              </h3>
              <p className="text-[11px] text-amber-200/80">
                Configure silent background order synchronization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1.5 rounded-lg"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Plain English explanation for non-coders */}
          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/70 text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-xs text-[#8B4513]">
              <Info className="w-4 h-4 text-amber-700" />
              <span>What is this for? (Simple non-coder explanation)</span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-700">
              When a buyer clicks "Confirm Order on WhatsApp", this website silently sends a digital copy of the order to your <strong>n8n automation webhook</strong> in the background. Your customer never sees any loading delay, and you can connect n8n to Google Sheets, Notion, or your printer!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                Your n8n Webhook URL:
              </label>
              <input
                type="url"
                required
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                placeholder="https://your-n8n-instance.com/webhook/cake-order"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Paste your production or test Webhook URL from n8n here.
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#2A1810] hover:bg-[#3D2314] text-white font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Webhook URL</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleTestPing}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{testSent ? 'Ping Dispatched!' : 'Send Test Ping'}</span>
              </button>
            </div>
          </form>

          {/* Recent Webhook Dispatch Logs */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700 text-xs uppercase tracking-wider">
                Recent Dispatched Order Payloads ({webhookLogs.length})
              </span>
            </div>

            {webhookLogs.length === 0 ? (
              <p className="text-[11px] text-stone-400 italic">
                No orders dispatched yet during this browser session. Place a test order to see the quiet JSON delivery!
              </p>
            ) : (
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {webhookLogs.slice(-3).reverse().map((log, i) => (
                  <div key={i} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-[11px] font-mono">
                    <div className="flex justify-between text-stone-500 text-[10px] mb-1">
                      <span>{log.timestamp}</span>
                      <span className="text-emerald-700 font-bold">{log.status}</span>
                    </div>
                    <pre className="text-stone-800 text-[10px] whitespace-pre-wrap overflow-x-auto max-h-20">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
