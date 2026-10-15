import React from 'react';
import { Sparkles, QrCode, ShieldCheck, HeartHandshake, ArrowRight, Download, Send, Clock, MapPin } from 'lucide-react';
import { BAKERY_CONTACT } from '../data/knowledgeBase';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenCustomCake: () => void;
  onDownloadPdf: () => void;
  onOpenKnowledgeBase: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenCustomCake,
  onDownloadPdf,
  onOpenKnowledgeBase,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EE] to-[#F5ECE1]">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-200/30 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-rose-200/25 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE3D5] text-[#4A2612] text-xs font-semibold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Official Artisanal Bakery &amp; Dessert Kitchen</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#24130A] tracking-tight leading-[1.12]">
              Handcrafted Cakes Layered with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B341E] via-[#9E471E] to-[#B45309]">Pure Belgian Chocolate</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Every creation at <strong className="text-stone-900 font-semibold">CHOCOLOCO</strong> is baked fresh on order day using 55% imported dark Callebaut chocolate, European dairy butter, and zero synthetic syrups. Over 80% eggless options for your memorable moments.
            </p>

            {/* 3 Value Pillars from Knowledge Base */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#EADBD0] shadow-xs hover:border-amber-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">100% Quality Promise</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                  Real butter, pure cocoa butter chocolate, zero synthetic syrups.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#EADBD0] shadow-xs hover:border-emerald-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 mb-2">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">80%+ Eggless Options</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                  Dietary flexibility with Gluten-Free and Sugar-Free on request.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#EADBD0] shadow-xs hover:border-rose-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-800 mb-2">
                  <QrCode className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">Dynamic UPI &amp; WhatsApp</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                  Instant QR for total bill + fast WhatsApp order verification.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                onClick={onExploreCatalog}
                className="flex items-center gap-2 bg-[#2A1810] hover:bg-[#3D2314] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Explore Signature Cakes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCustomCake}
                className="flex items-center gap-2 bg-[#FAF4EE] hover:bg-[#F3E7DC] text-[#4A2612] border border-[#D9C4B2] px-5 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Custom Celebration Cake</span>
              </button>

              <button
                onClick={onDownloadPdf}
                className="flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
                title="Download complete official 3-page Knowledge Base PDF"
              >
                <Download className="w-4 h-4 text-[#881B3E]" />
                <span>Download Menu (PDF)</span>
              </button>
            </div>

            {/* Quick Delivery & Timing Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-500 pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>18km delivery radius</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Order before 2:00 PM for same-day evening delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Featured Dessert Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Dessert Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                    alt="CHOCOLOCO Belgian Chocolate Truffle Cake"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    <span className="bg-[#1A5319] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                      100% EGGLESS
                    </span>
                    <span className="bg-[#2A1810]/85 backdrop-blur-md text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      #1 BESTSELLER
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                      Belgian Chocolate Truffle
                    </h3>
                    <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                      Silky 55% Callebaut dark chocolate ganache layered between cocoa sponge.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-amber-200 uppercase tracking-wider block">From</span>
                        <span className="text-xl font-extrabold text-white">₹850</span>
                        <span className="text-xs text-stone-300 ml-1">/ 500g</span>
                      </div>
                      <button
                        onClick={onExploreCatalog}
                        className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UPI Verification Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-xl flex items-center gap-3 max-w-[260px]">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-900 shrink-0">
                  <QrCode className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-900">Instant Dynamic UPI</div>
                  <div className="text-[10px] text-stone-500">ID: {BAKERY_CONTACT.upiId}</div>
                  <div className="text-[9px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    WhatsApp verified
                  </div>
                </div>
              </div>

              {/* Floating Chef Recommendation badge */}
              <div className="hidden sm:flex absolute -top-5 -right-5 bg-[#2A1810] text-amber-200 p-3 rounded-2xl shadow-xl border border-amber-900/40 items-center gap-2.5">
                <span className="text-xl">🎂</span>
                <div>
                  <div className="text-xs font-bold text-white">Fresh Oven Bake</div>
                  <div className="text-[10px] text-amber-300/80">Never frozen or pre-stored</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
