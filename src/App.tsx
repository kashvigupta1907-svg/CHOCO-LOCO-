import React, { useState, useEffect } from 'react';
import { Product, ProductOption, CartItem, OrderRecord } from './types';
import { PRODUCTS } from './data/products';
import { BAKERY_CONTACT, DEFAULT_WEBHOOK_URL } from './data/knowledgeBase';
import { generateKnowledgeBasePDF } from './utils/pdfGenerator';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { KnowledgeBaseModal } from './components/KnowledgeBaseModal';
import { AIChatbot } from './components/AIChatbot';
import { ReviewsAndStory } from './components/ReviewsAndStory';
import { Footer } from './components/Footer';
import { WebhookSettingsModal } from './components/WebhookSettingsModal';
import { CheckCircle2, FileDown, Sparkles } from 'lucide-react';

export default function App() {
  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chocoloco_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isWebhookSettingsOpen, setIsWebhookSettingsOpen] = useState<boolean>(false);

  // Webhook settings & logs
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('chocoloco_webhook_url') || DEFAULT_WEBHOOK_URL;
    } catch {
      return DEFAULT_WEBHOOK_URL;
    }
  });

  const [webhookLogs, setWebhookLogs] = useState<{ timestamp: string; payload: any; status: string }[]>([]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chocoloco_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn(e);
    }
  }, [cartItems]);

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartTotal = cartItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  // Add product to cart
  const handleAddToCart = (product: Product, option: ProductOption, quantity: number, customMessage?: string) => {
    const itemId = `${product.id}-${option.size}${customMessage ? `-${customMessage.slice(0, 8)}` : ''}`;

    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === itemId);
      if (existing) {
        return prev.map((it) =>
          it.id === itemId ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        size: option.size,
        unitPrice: option.price,
        quantity,
        image: product.image,
        dietary: product.dietary,
        customCakeMessage: customMessage,
      };
      return [...prev, newItem];
    });

    showToast(`Added ${quantity}x ${product.name} (${option.size}) to cart!`);
  };

  // Quick Buy: adds item and directly launches checkout
  const handleQuickBuy = (product: Product, option: ProductOption, quantity: number) => {
    handleAddToCart(product, option, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from cart
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
    showToast('Item removed from cart.');
  };

  // Download official Knowledge Base PDF
  const handleDownloadPdf = () => {
    showToast('Generating official 3-page Knowledge Base PDF...');
    try {
      generateKnowledgeBasePDF();
      showToast('PDF downloaded successfully! Check your downloads.');
    } catch (err) {
      console.error(err);
      showToast('Failed to download PDF. Please try again.');
    }
  };

  // Save n8n webhook URL
  const handleSaveWebhookUrl = (url: string) => {
    setWebhookUrl(url);
    try {
      localStorage.setItem('chocoloco_webhook_url', url);
    } catch {}
    showToast('n8n Webhook URL updated.');
  };

  // Record webhook dispatch log
  const handleRecordWebhookLog = (log: { timestamp: string; payload: any; status: string }) => {
    setWebhookLogs((prev) => [...prev, log]);
  };

  // Handle Order Completed
  const handleOrderCompleted = (order: OrderRecord) => {
    // Optionally clear cart after confirming order
    setCartItems([]);
    showToast(`Order ${order.orderId} placed & ready for WhatsApp!`);
  };

  // Smooth scroll
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1F1610] selection:bg-amber-200 selection:text-amber-950 font-sans">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#2A1810] text-amber-200 px-4 py-3 rounded-2xl shadow-2xl border border-amber-900/60 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Top Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
        onDownloadPdf={handleDownloadPdf}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={() => handleNavigateSection('catalog')}
          onOpenCustomCake={() => handleNavigateSection('custom-cake')}
          onDownloadPdf={handleDownloadPdf}
          onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
        />

        {/* Product Catalog Grid with Category & Dietary Filters */}
        <ProductCatalog
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickBuy={handleQuickBuy}
          onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
        />

        {/* Custom Celebration Cake Studio */}
        <CustomCakeBuilder
          onAddCustomCakeToCart={(prod, opt, msg) => {
            handleAddToCart(prod, opt, 1, msg);
          }}
          onOpenQuickCheckoutWithCustomCake={(prod, opt, msg) => {
            handleAddToCart(prod, opt, 1, msg);
            setIsCheckoutOpen(true);
          }}
        />

        {/* Reviews, Story & FAQs */}
        <ReviewsAndStory />
      </main>

      {/* Footer */}
      <Footer
        onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
        onDownloadPdf={handleDownloadPdf}
        onOpenWebhookSettings={() => setIsWebhookSettingsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreCatalog={() => handleNavigateSection('catalog')}
      />

      {/* Dynamic UPI & WhatsApp Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleOrderCompleted}
        webhookUrl={webhookUrl}
        onRecordWebhookLog={handleRecordWebhookLog}
      />

      {/* Knowledge Base Modal with Interactive Tabs & PDF Download */}
      <KnowledgeBaseModal
        isOpen={isKnowledgeBaseOpen}
        onClose={() => setIsKnowledgeBaseOpen(false)}
      />

      {/* Choco Bot AI Virtual Bakery Concierge */}
      <AIChatbot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onDownloadPdf={handleDownloadPdf}
        onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
        onExploreCatalog={() => handleNavigateSection('catalog')}
      />

      {/* n8n Webhook Settings Modal */}
      <WebhookSettingsModal
        isOpen={isWebhookSettingsOpen}
        onClose={() => setIsWebhookSettingsOpen(false)}
        webhookUrl={webhookUrl}
        onSaveWebhookUrl={handleSaveWebhookUrl}
        webhookLogs={webhookLogs}
      />

    </div>
  );
}
