import React from 'react';
import { Phone, Mail, MessageCircle, QrCode, FileDown, Sliders, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { BAKERY_CONTACT } from '../data/knowledgeBase';

interface FooterProps {
  onOpenKnowledgeBase: () => void;
  onDownloadPdf: () => void;
  onOpenWebhookSettings: () => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenKnowledgeBase,
  onDownloadPdf,
  onOpenWebhookSettings,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-[#1C120C] text-[#F3EBE1] border-t border-[#3D2517] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5C2D16] to-[#8B4513] flex items-center justify-center text-amber-200 font-serif text-xl font-bold shadow-md">
                C
              </div>
              <span className="font-serif text-2xl font-extrabold tracking-wider text-white">
                CHOCOLOCO
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Artisanal gourmet bakery crafted with 55% imported Belgian Callebaut chocolate, European butter, and organic fruit compotes. Hand-baked fresh on delivery day.
            </p>

            <div className="pt-2 text-xs text-amber-300/90 flex flex-col gap-1.5">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                18km Delivery Radius from Central Kitchen
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Same-Day Delivery before 2:00 PM Cutoff
              </span>
            </div>
          </div>

          {/* Direct Kitchen Contact */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider text-amber-300">
              Kitchen Direct Contacts
            </h4>
            <div className="space-y-2.5 text-stone-300">
              <a
                href={`tel:${BAKERY_CONTACT.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: {BAKERY_CONTACT.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${BAKERY_CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {BAKERY_CONTACT.whatsappDisplay}</span>
              </a>

              <a
                href={`mailto:${BAKERY_CONTACT.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>Email: {BAKERY_CONTACT.email}</span>
              </a>

              <div className="flex items-center gap-2 pt-1 text-stone-400">
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>UPI ID: <strong className="text-white font-mono">{BAKERY_CONTACT.upiId}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider text-amber-300">
              Explore Menu
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Signature Cakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Cheesecakes &amp; Tarts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('custom-cake')}
                  className="hover:text-amber-200 transition-colors cursor-pointer text-amber-300"
                >
                  Custom Cake Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Storage &amp; FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge Base & Automation Tools */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider text-amber-300">
              Official Resources
            </h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={onDownloadPdf}
                className="w-full py-2.5 px-3 bg-[#3C1626] hover:bg-[#521E34] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-rose-900/60"
              >
                <FileDown className="w-3.5 h-3.5 text-rose-300" />
                <span>Download Knowledge Base (PDF)</span>
              </button>

              <button
                type="button"
                onClick={onOpenKnowledgeBase}
                className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-stone-300 rounded-xl transition-colors cursor-pointer text-left block"
              >
                View Online Knowledge Base
              </button>

              <button
                type="button"
                onClick={onOpenWebhookSettings}
                className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-stone-300 rounded-xl transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>n8n Webhook Settings</span>
                <Sliders className="w-3.5 h-3.5 text-stone-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} CHOCOLOCO Artisanal Bakery. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Belgian Cocoa Butter</span>
            <span>•</span>
            <span>Direct WhatsApp &amp; Dynamic UPI</span>
            <span>•</span>
            <span>Zero Preservatives</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
