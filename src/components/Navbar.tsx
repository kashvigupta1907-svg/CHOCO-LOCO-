import React from 'react';
import { ShoppingBag, MessageSquare, FileDown, Phone, Sparkles, Heart } from 'lucide-react';
import { BAKERY_CONTACT } from '../data/knowledgeBase';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenKnowledgeBase: () => void;
  onDownloadPdf: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenChat,
  onOpenKnowledgeBase,
  onDownloadPdf,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F0E6DE] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#2A1810] text-[#F5EBE1] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Baked fresh on order day using 100% Belgian chocolate • 80%+ Eggless options</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={`https://wa.me/${BAKERY_CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>WhatsApp:</span>
              <span className="font-semibold">{BAKERY_CONTACT.whatsappDisplay}</span>
            </a>
            <span className="hidden sm:inline text-stone-500">|</span>
            <a
              href={`tel:${BAKERY_CONTACT.phone}`}
              className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{BAKERY_CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3D2314] via-[#5C2D16] to-[#8B4513] flex items-center justify-center text-amber-200 shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl font-bold tracking-tight">C</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-[#2A1810]">
                  CHOCOLOCO
                </span>
                <span className="bg-amber-100 text-[#8B4513] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  Artisanal
                </span>
              </div>
              <p className="text-[11px] text-stone-500 tracking-wider font-medium uppercase -mt-0.5">
                Gourmet Bakery &amp; Desserts
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button
              onClick={() => onNavigateSection('catalog')}
              className="hover:text-[#8B4513] transition-colors cursor-pointer py-1"
            >
              Signature Cakes
            </button>
            <button
              onClick={() => onNavigateSection('catalog')}
              className="hover:text-[#8B4513] transition-colors cursor-pointer py-1"
            >
              Cheesecakes &amp; Jars
            </button>
            <button
              onClick={() => onNavigateSection('custom-cake')}
              className="hover:text-[#8B4513] transition-colors cursor-pointer py-1 flex items-center gap-1 text-[#8B4513] font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Cake</span>
            </button>
            <button
              onClick={onOpenKnowledgeBase}
              className="hover:text-[#8B4513] transition-colors cursor-pointer py-1"
            >
              Knowledge Base
            </button>
            <button
              onClick={() => onNavigateSection('faq')}
              className="hover:text-[#8B4513] transition-colors cursor-pointer py-1"
            >
              Delivery &amp; FAQs
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Official PDF Button */}
            <button
              onClick={onDownloadPdf}
              title="Download Official 3-Page Knowledge Base PDF"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#68233C] bg-[#FDF2F4] hover:bg-[#FCE7EB] border border-[#F5C2CD] rounded-xl transition-all shadow-xs"
            >
              <FileDown className="w-3.5 h-3.5 text-[#881B3E]" />
              <span>Download PDF</span>
            </button>

            {/* Choco Bot AI Concierge Button */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#FAF4EE] hover:bg-[#F3E7DC] text-[#4A2612] border border-[#E8D4C4] rounded-xl transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#C06020]" />
              <span className="hidden sm:inline font-semibold">Choco Bot AI</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#2A1810] hover:bg-[#3D2314] text-white px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <>
                  <span className="bg-amber-400 text-stone-950 font-bold text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                  <span className="hidden md:inline font-semibold text-amber-200">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
